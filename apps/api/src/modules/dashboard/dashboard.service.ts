import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

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
  sitesByHabitat: { habitat: string; count: number }[];
  sitesByCountry: { country: string; count: number }[];
  surveysPerYear: { year: number; count: number }[];
}

@Injectable()
export class DashboardService {
  constructor(private readonly db: DataSource) {}

  async overview(): Promise<OverviewStats> {
    const [totals] = await this.db.query(`
      SELECT
        (SELECT count(*) FROM projects WHERE deleted_at IS NULL)::int AS projects,
        (SELECT count(*) FROM sites WHERE deleted_at IS NULL)::int AS sites,
        (SELECT count(DISTINCT country) FROM sites WHERE deleted_at IS NULL)::int AS countries,
        (SELECT count(*) FROM survey_events WHERE deleted_at IS NULL)::int AS "surveyEvents",
        (SELECT count(*) FROM observations)::int AS observations,
        (SELECT extract(year FROM min(surveyed_on))::int FROM survey_events WHERE deleted_at IS NULL) AS "firstSurveyYear",
        (SELECT extract(year FROM max(surveyed_on))::int FROM survey_events WHERE deleted_at IS NULL) AS "latestSurveyYear"
    `);

    const [sitesByHabitat, sitesByCountry, surveysPerYear] = await Promise.all([
      this.db.query(`
        SELECT habitat::text AS habitat, count(*)::int AS count
        FROM sites WHERE deleted_at IS NULL GROUP BY habitat ORDER BY count DESC`),
      this.db.query(`
        SELECT country, count(*)::int AS count
        FROM sites WHERE deleted_at IS NULL GROUP BY country ORDER BY count DESC`),
      this.db.query(`
        SELECT extract(year FROM surveyed_on)::int AS year, count(*)::int AS count
        FROM survey_events WHERE deleted_at IS NULL GROUP BY 1 ORDER BY 1`),
    ]);

    return { totals, sitesByHabitat, sitesByCountry, surveysPerYear };
  }
}
