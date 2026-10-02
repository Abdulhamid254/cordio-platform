import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoreSchema1727900000000 implements MigrationInterface {
  name = 'CoreSchema1727900000000';

  public async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE EXTENSION IF NOT EXISTS postgis`);
    await q.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

    await q.query(`CREATE TYPE project_status AS ENUM ('planned','active','completed','archived')`);
    await q.query(`CREATE TYPE data_visibility AS ENUM ('public','partner','internal')`);
    await q.query(`CREATE TYPE habitat_type AS ENUM ('coral_reef','seagrass','mangrove','estuary','rocky_shore','open_water','other')`);

    await q.query(`
      CREATE TABLE import_batches (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        source_file text NOT NULL,
        checksum text,
        notes text,
        imported_at timestamptz NOT NULL DEFAULT now()
      )`);

    await q.query(`
      CREATE TABLE projects (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        code text NOT NULL UNIQUE,
        description text,
        country text,
        funder text,
        status project_status NOT NULL DEFAULT 'active',
        start_date date,
        end_date date,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz,
        CONSTRAINT projects_dates_chk CHECK (end_date IS NULL OR start_date IS NULL OR end_date >= start_date)
      )`);

    await q.query(`
      CREATE TABLE sites (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        project_id uuid NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
        name text NOT NULL,
        country text NOT NULL,
        habitat habitat_type NOT NULL DEFAULT 'coral_reef',
        visibility data_visibility NOT NULL DEFAULT 'internal',
        location geography(Point, 4326) NOT NULL,
        protection_status text,
        source_batch_id uuid REFERENCES import_batches(id),
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz,
        UNIQUE (project_id, name)
      )`);
    await q.query(`CREATE INDEX sites_location_gix ON sites USING GIST (location)`);
    await q.query(`CREATE INDEX sites_project_idx ON sites (project_id)`);

    await q.query(`
      CREATE TABLE taxa (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        scientific_name text NOT NULL UNIQUE,
        common_name text,
        rank text NOT NULL DEFAULT 'species',
        aphia_id integer UNIQUE,
        parent_id uuid REFERENCES taxa(id),
        created_at timestamptz NOT NULL DEFAULT now()
      )`);

    await q.query(`
      CREATE TABLE protocols (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        name text NOT NULL,
        version integer NOT NULL DEFAULT 1,
        description text,
        UNIQUE (name, version)
      )`);

    await q.query(`
      CREATE TABLE survey_events (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        site_id uuid NOT NULL REFERENCES sites(id) ON DELETE RESTRICT,
        protocol_id uuid NOT NULL REFERENCES protocols(id),
        surveyed_on date NOT NULL,
        depth_m numeric(5,1),
        team text,
        notes text,
        source_batch_id uuid REFERENCES import_batches(id),
        original_row_ref text,
        created_at timestamptz NOT NULL DEFAULT now(),
        updated_at timestamptz NOT NULL DEFAULT now(),
        deleted_at timestamptz
      )`);
    await q.query(`CREATE INDEX survey_events_site_date_idx ON survey_events (site_id, surveyed_on)`);

    await q.query(`
      CREATE TABLE observations (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id uuid NOT NULL REFERENCES survey_events(id) ON DELETE CASCADE,
        taxon_id uuid REFERENCES taxa(id),
        metric text NOT NULL,
        value numeric NOT NULL,
        unit text NOT NULL,
        extra jsonb NOT NULL DEFAULT '{}'::jsonb
      )`);
    await q.query(`CREATE INDEX observations_event_idx ON observations (event_id)`);
    await q.query(`CREATE INDEX observations_taxon_idx ON observations (taxon_id)`);
  }

  public async down(q: QueryRunner): Promise<void> {
    for (const t of ['observations', 'survey_events', 'protocols', 'taxa', 'sites', 'projects', 'import_batches']) {
      await q.query(`DROP TABLE IF EXISTS ${t} CASCADE`);
    }
    for (const e of ['habitat_type', 'data_visibility', 'project_status']) {
      await q.query(`DROP TYPE IF EXISTS ${e}`);
    }
  }
}
