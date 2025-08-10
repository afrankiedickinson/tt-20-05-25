const API_BASE_URL = "http://localhost:3001/api/v1";

export interface TestResponse {
  data: {
    currentPage: Participant[];
    previousPage: Participant[];
    nextPage: Participant[];
  };
}

export interface Participant {
  participantId: string;
  fullName: string;
  demographics: {
    age: number;
    region: string;
  };
  createdDate: string;
}

export const getParticipantPages = async (
  params: Record<string, string>,
): Promise<TestResponse> => {
  const definedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => !!value),
  );
  const searchParams = new URLSearchParams(definedParams);
  const response = await fetch(`${API_BASE_URL}/participants?${searchParams}`, {
    method: "GET",
    headers: { Authorization: "Bearer mock-header" },
  });

  return response.json();
};
