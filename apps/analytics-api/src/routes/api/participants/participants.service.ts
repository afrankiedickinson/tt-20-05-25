import { generatedParticipants } from "../../../generate/generateParticipants";
import { Participant, ParticipantsQueryParams } from "./participants.type";

export class ParticipantsService {
  getParticipantPages(params: ParticipantsQueryParams) {
    const filteredPreviousPage = this.applyFilters({
      participants: generatedParticipants,
      params,
    });

    const pages = this.convertToPages({
      params,
      participants: filteredPreviousPage,
    });

    return {
      previousPage: pages.previousPage,
      currentPage: pages.currentPage,
      nextPage: pages.nextPage,
    };
  }

  convertToPages({
    params,
    participants,
  }: {
    params: ParticipantsQueryParams;
    participants: Participant[];
  }): {
    previousPage?: Participant[];
    currentPage: Participant[];
    nextPage?: Participant[];
  } {
    const { currentPageNumber, numberOfRows } = params;

    const currentPageStart = (currentPageNumber - 1) * numberOfRows;

    const currentPageEnd = currentPageStart + numberOfRows;

    const currentPage = participants.slice(currentPageStart, currentPageEnd);

    const previousPageStart = currentPageStart - numberOfRows;
    const previousPageEnd = previousPageStart + numberOfRows;

    const previousPage = participants.slice(previousPageStart, previousPageEnd);

    const nextPageStart = currentPageEnd;

    const nextPageEnd = nextPageStart + numberOfRows;

    const nextPage = participants.slice(nextPageStart, nextPageEnd);

    return {
      previousPage: previousPage.length > 0 ? previousPage : undefined,
      currentPage,
      nextPage: nextPage.length > 0 ? nextPage : undefined,
    };
  }

  applyFilters({
    participants,
    params,
  }: {
    participants: Participant[];
    params: ParticipantsQueryParams;
  }) {
    const filteredPages = [];

    for (const page of participants) {
      if (
        params.region &&
        params.region !== "All Regions" &&
        params.region !== page.demographics.region
      ) {
        continue;
      }

      if (params.studyType && !page.studyTypes.includes(params.studyType)) {
        continue;
      }

      if (params.ageRange === "18-24") {
        if (page.demographics.age < 18 || page.demographics.age > 24) {
          continue;
        }
      } else if (params.ageRange === "25-34") {
        if (page.demographics.age < 25 || page.demographics.age > 34) {
          continue;
        }
      } else if (params.ageRange === "35-44") {
        if (page.demographics.age < 35 || page.demographics.age > 44) {
          continue;
        }
      } else if (params.ageRange === "45-54") {
        if (page.demographics.age < 45 || page.demographics.age > 54) {
          continue;
        }
      } else if (params.ageRange === "54-64") {
        if (page.demographics.age < 54 || page.demographics.age > 64) {
          continue;
        }
      } else if (params.ageRange === "65+") {
        if (page.demographics.age < 65) {
          continue;
        }
      }

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      if (params.dateRange === "last 7 days") {
        if (page.createdDate.getTime() < sevenDaysAgo.getTime()) {
          continue;
        }
      } else if (params.dateRange === "last 14 days") {
        if (page.createdDate.getTime() < fourteenDaysAgo.getTime()) {
          continue;
        }
      } else if (params.dateRange === "last 30 days") {
        if (page.createdDate.getTime() < thirtyDaysAgo.getTime()) {
          continue;
        }
      }

      filteredPages.push(page);
    }

    return filteredPages;
  }
}
