export interface Paginated<T> {
  data: T[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export type ProjectStatus = 'planned' | 'active' | 'completed' | 'archived';
export type HabitatType =
  | 'coral_reef' | 'seagrass' | 'mangrove' | 'estuary' | 'rocky_shore' | 'open_water' | 'other';

export interface Project {
  id: string;
  name: string;
  code: string;
  description: string | null;
  country: string | null;
  funder: string | null;
  status: ProjectStatus;
  startDate: string | null;
  endDate: string | null;
}

export interface Site {
  id: string;
  projectId: string;
  name: string;
  country: string;
  habitat: HabitatType;
  visibility: 'public' | 'partner' | 'internal';
  location: { type: 'Point'; coordinates: [number, number] };
  protectionStatus: string | null;
}

export interface OverviewStats {
  totals: {
    projects: number;
    sites: number;
    countries: number;
    surveyEvents: number;
    observations: number;
    firstSurveyYear: number | null;
    latestSurveyYear: number | null;
  };
  sitesByHabitat: { habitat: HabitatType; count: number }[];
  sitesByCountry: { country: string; count: number }[];
  surveysPerYear: { year: number; count: number }[];
}
