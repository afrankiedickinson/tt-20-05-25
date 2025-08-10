import { expect, describe, test } from "vitest";
import { ParticipantsService } from "./participants.service";

import { faker } from "@faker-js/faker";
import { STUDY_TYPES } from "src/generate/studies";
import { Region, StudyType } from "./participants.type";
import { REGIONS } from "src/generate/regions";

const createFakeParticipant = ({
  studyType,
  region,
  createdDate,
  age,
}: {
  studyType: StudyType;
  region: Region;
  createdDate?: Date;
  age?: number;
}) => ({
  participantId: faker.string.uuid(),
  fullName: faker.person.fullName(),
  studyTypes: [studyType],
  demographics: {
    age: age ?? faker.number.int({ min: 18, max: 75 }),
    region,
  },
  createdDate: createdDate ?? faker.date.past({ years: 2 }),
  active: true,
});

const firstPageOfParticipants = Array.from({ length: 10 }, () =>
  createFakeParticipant({
    studyType: faker.helpers.arrayElement(STUDY_TYPES),
    region: faker.helpers.arrayElement(REGIONS),
  }),
);

const secondPageOfParticipants = Array.from({ length: 10 }, () =>
  createFakeParticipant({
    studyType: faker.helpers.arrayElement(STUDY_TYPES),
    region: faker.helpers.arrayElement(REGIONS),
  }),
);

const thirdPageOfParticipants = Array.from({ length: 10 }, () =>
  createFakeParticipant({
    studyType: faker.helpers.arrayElement(STUDY_TYPES),
    region: faker.helpers.arrayElement(REGIONS),
  }),
);

describe("ParticipantsService", () => {
  test("when on first page, previousPage is undefined", () => {
    const participantsService = new ParticipantsService();
    const participantPages = participantsService.convertToPages({
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
      },
      participants: [
        ...firstPageOfParticipants,
        ...secondPageOfParticipants,
        ...thirdPageOfParticipants,
      ],
    });

    expect(participantPages).toEqual({
      previousPage: undefined,
      currentPage: firstPageOfParticipants,
      nextPage: secondPageOfParticipants,
    });
  });

  test("return previousPage of participants", () => {
    const participantsService = new ParticipantsService();

    const participantPages = participantsService.convertToPages({
      params: {
        currentPageNumber: 2,
        numberOfRows: 10,
        region: "All Regions",
      },
      participants: [
        ...firstPageOfParticipants,
        ...secondPageOfParticipants,
        ...thirdPageOfParticipants,
      ],
    });

    expect(participantPages).toEqual({
      previousPage: firstPageOfParticipants,
      currentPage: secondPageOfParticipants,
      nextPage: thirdPageOfParticipants,
    });
  });

  test("does not return nextPage if on lastPage", () => {
    const participantsService = new ParticipantsService();

    const participantPages = participantsService.convertToPages({
      params: {
        currentPageNumber: 3,
        numberOfRows: 10,
        region: "All Regions",
      },
      participants: [
        ...firstPageOfParticipants,
        ...secondPageOfParticipants,
        ...thirdPageOfParticipants,
      ],
    });

    expect(participantPages).toEqual({
      previousPage: secondPageOfParticipants,
      currentPage: thirdPageOfParticipants,
      nextPage: undefined,
    });
  });

  test("filter 10 participants to only 3 Clinical Trials", () => {
    const participantsService = new ParticipantsService();

    const firstSevenParticipants = Array.from({ length: 7 }, () =>
      createFakeParticipant({
        studyType: "Longitudinal Studies",
        region: faker.helpers.arrayElement(REGIONS),
      }),
    );

    const lastThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: "Clinical Trials",
        region: faker.helpers.arrayElement(REGIONS),
      }),
    );

    const filteredPage = participantsService.applyFilters({
      participants: [...firstSevenParticipants, ...lastThreeParticipants],
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
        studyType: "Clinical Trials",
      },
    });

    expect(filteredPage).toEqual([...lastThreeParticipants]);
  });

  test("filter 10 to only 3 North America participants", () => {
    const participantsService = new ParticipantsService();

    const firstSevenParticipants = Array.from({ length: 7 }, () =>
      createFakeParticipant({
        studyType: "Longitudinal Studies",
        region: "Australia/Oceania",
      }),
    );

    const lastThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: "Clinical Trials",
        region: "North America",
      }),
    );

    const filteredPage = participantsService.applyFilters({
      participants: [...firstSevenParticipants, ...lastThreeParticipants],
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
        region: "North America",
      },
    });

    expect(filteredPage).toEqual([...lastThreeParticipants]);
  });

  test("filter 10 participants to the 3 aged between 18 and 24", () => {
    const participantsService = new ParticipantsService();

    const firstSevenParticipants = Array.from({ length: 7 }, () =>
      createFakeParticipant({
        studyType: faker.helpers.arrayElement(STUDY_TYPES),
        region: faker.helpers.arrayElement(REGIONS),
        age: faker.number.int({ min: 25, max: 75 }),
      }),
    );

    const lastThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: faker.helpers.arrayElement(STUDY_TYPES),
        region: faker.helpers.arrayElement(REGIONS),
        age: faker.number.int({ min: 18, max: 24 }),
      }),
    );

    const filteredPage = participantsService.applyFilters({
      participants: [...firstSevenParticipants, ...lastThreeParticipants],
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
        ageRange: "18-24",
      },
    });

    expect(filteredPage).toEqual([...lastThreeParticipants]);
  });

  test("filter 10 participants to the 3 created in the last 7 days", () => {
    const participantsService = new ParticipantsService();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() - 7);

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 180);

    const createdDateOver7Days = faker.date.between({
      from: startDate,
      to: endDate,
    });

    const createdDateLessThan7Days = faker.date.between({
      from: endDate,
      to: new Date(),
    });

    const firstSevenParticipants = Array.from({ length: 7 }, () =>
      createFakeParticipant({
        studyType: faker.helpers.arrayElement(STUDY_TYPES),
        region: faker.helpers.arrayElement(REGIONS),
        createdDate: createdDateOver7Days,
      }),
    );

    const lastThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: faker.helpers.arrayElement(STUDY_TYPES),
        region: faker.helpers.arrayElement(REGIONS),
        createdDate: createdDateLessThan7Days,
      }),
    );

    const filteredPage = participantsService.applyFilters({
      participants: [...firstSevenParticipants, ...lastThreeParticipants],
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
        dateRange: "last 7 days",
      },
    });

    expect(filteredPage).toEqual([...lastThreeParticipants]);
  });

  test("combined filters so that 10 participants is filtered to 3", () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    const startDate30DaysAgo = new Date();
    startDate30DaysAgo.setDate(startDate30DaysAgo.getDate() - 30);

    const createdDateOver7Days = faker.date.between({
      from: startDate,
      to: new Date(),
    });

    const createdDateWith30Days = faker.date.between({
      from: startDate30DaysAgo,
      to: startDate,
    });

    const firstThreeParticipnats = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: "Clinical Trials",
        region: "Australia/Oceania",
      }),
    );

    const secondThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: "Clinical Trials",
        region: "North America",
        age: faker.number.int({ min: 25, max: 30 }),
        createdDate: createdDateWith30Days,
      }),
    );

    const thirdThreeParticipants = Array.from({ length: 3 }, () =>
      createFakeParticipant({
        studyType: "Clinical Trials",
        region: "North America",
        age: faker.number.int({ min: 25, max: 34 }),
        createdDate: createdDateOver7Days,
      }),
    );

    const participantService = new ParticipantsService();

    const filteredPage = participantService.applyFilters({
      participants: [
        ...firstThreeParticipnats,
        ...secondThreeParticipants,
        ...thirdThreeParticipants,
      ],
      params: {
        currentPageNumber: 1,
        numberOfRows: 10,
        region: "North America",
        ageRange: "25-34",
        dateRange: "last 7 days",
      },
    });

    expect(filteredPage).toEqual([...thirdThreeParticipants]);
  });
});
