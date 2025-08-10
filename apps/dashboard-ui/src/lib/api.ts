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

const parseParams = (params: Record<string, string>) => {
  const definedParams = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => !!value),
  );
  return definedParams;
};

export const getParticipantPages = async (
  params: Record<string, string>,
): Promise<TestResponse> => {
  const parsedParams = parseParams(params);
  const searchParams = new URLSearchParams(parsedParams);

  const response = await fetch(`${API_BASE_URL}/participants?${searchParams}`, {
    method: "GET",
    headers: { Authorization: "Bearer mock-header" },
  });

  return response.json();
};

export interface SummaryResponse {
  data?: {
    totalParticipants: number;
    activeParticipants: number;
    totalStudies: number;
    activeStudies: number;
    averageEligibilityRate: number;
    completionRate: number;
  };
}

export const getSummary = async (): Promise<SummaryResponse> => {
  const response = await fetch(`${API_BASE_URL}/summary`, {
    method: "GET",
    headers: { Authorization: "Bearer mock-header" },
  });

  return response.json();
};

export interface ComparisonMetrics {
  name: string;
  applications: number;
  completions: number;
}

export interface ComparisonResponse {
  data?: {
    dimension: string;
    metrics: ComparisonMetrics[];
  };
}

export const getComparison = async (): Promise<ComparisonResponse> => {
  const response = await fetch(`${API_BASE_URL}/comparison`, {
    method: "GET",
    headers: { Authorization: "Bearer mock-header" },
  });

  return response.json();
};

export interface DataPoint {
  date: string;
  value: number;
}

export interface Metric {
  name: string;
  data: DataPoint[];
}

export interface Trend {
  timeRange: string;
  interval: "day";
  metrics: Metric[];
}

export interface TrendResult {
  data?: Trend;
}

export interface TrendParams {
  dateRange: string;
}

export const getTrend = async (params: {
  dateRange: string;
}): Promise<TrendResult> => {
  const parsedParams = parseParams(params);
  const searchParams = new URLSearchParams(parsedParams);

  const response = await fetch(`${API_BASE_URL}/trend?${searchParams}`, {
    method: "GET",
    headers: { Authorization: "Bearer mock-header" },
  });

  return response.json();
};
