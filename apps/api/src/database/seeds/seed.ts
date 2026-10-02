import dataSource from '../data-source';

/**
 * SAMPLE DATA ONLY: invented values for local development and UI previews.
 * Never run against a production database.
 */
const projects = [
  { code: 'KE-REEF-01', name: 'Kenya Coral Reef Monitoring', country: 'Kenya', funder: 'Sample Funder A' },
  { code: 'TZ-SEAGRASS-01', name: 'Tanzania Seagrass Assessment', country: 'Tanzania', funder: 'Sample Funder B' },
  { code: 'MG-MANGROVE-01', name: 'Madagascar Mangrove Restoration', country: 'Madagascar', funder: 'Sample Funder C' },
];

const sites = [
  { p: 'KE-REEF-01', name: 'Kisite Reef', country: 'Kenya', habitat: 'coral_reef', lat: -4.7167, lng: 39.3667 },
  { p: 'KE-REEF-01', name: 'Watamu Marine Park', country: 'Kenya', habitat: 'coral_reef', lat: -3.3792, lng: 40.0247 },
  { p: 'KE-REEF-01', name: 'Mida Creek', country: 'Kenya', habitat: 'mangrove', lat: -3.3500, lng: 39.9830 },
  { p: 'TZ-SEAGRASS-01', name: 'Chwaka Bay', country: 'Tanzania', habitat: 'seagrass', lat: -6.1500, lng: 39.4300 },
  { p: 'TZ-SEAGRASS-01', name: 'Mafia Island', country: 'Tanzania', habitat: 'coral_reef', lat: -7.9000, lng: 39.7500 },
  { p: 'MG-MANGROVE-01', name: 'Velondriake', country: 'Madagascar', habitat: 'mangrove', lat: -22.0000, lng: 43.2500 },
  { p: 'MG-MANGROVE-01', name: 'Nosy Be', country: 'Madagascar', habitat: 'coral_reef', lat: -13.3000, lng: 48.2700 },
];

async function main() {
  await dataSource.initialize();
  const q = dataSource.createQueryRunner();
  await q.startTransaction();
  try {
    const projectIds: Record<string, string> = {};
    for (const p of projects) {
      const [row] = await q.query(
        `INSERT INTO projects (code, name, country, funder, start_date)
         VALUES ($1,$2,$3,$4,'2004-01-01')
         ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name RETURNING id`,
        [p.code, p.name, p.country, p.funder],
      );
      projectIds[p.code] = row.id;
    }

    const [protocol] = await q.query(
      `INSERT INTO protocols (name, version, description)
       VALUES ('Benthic cover (line intercept)', 1, 'Percent cover along a transect')
       ON CONFLICT (name, version) DO UPDATE SET description = EXCLUDED.description RETURNING id`,
    );

    let seed = 42;
    const rand = () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);

    for (const s of sites) {
      const [site] = await q.query(
        `INSERT INTO sites (project_id, name, country, habitat, visibility, location)
         VALUES ($1,$2,$3,$4,'public', ST_SetSRID(ST_MakePoint($5,$6),4326)::geography)
         ON CONFLICT (project_id, name) DO UPDATE SET country = EXCLUDED.country RETURNING id`,
        [projectIds[s.p], s.name, s.country, s.habitat, s.lng, s.lat],
      );

      for (let year = 2004; year <= 2024; year++) {
        const [event] = await q.query(
          `INSERT INTO survey_events (site_id, protocol_id, surveyed_on, depth_m, team)
           VALUES ($1,$2,$3,$4,'Sample team') RETURNING id`,
          [site.id, protocol.id, `${year}-0${1 + Math.floor(rand() * 9)}-15`, 5 + Math.floor(rand() * 10)],
        );
        await q.query(
          `INSERT INTO observations (event_id, metric, value, unit)
           VALUES ($1,'hard_coral_cover',$2,'percent')`,
          [event.id, (20 + rand() * 40).toFixed(1)],
        );
      }
    }
    await q.commitTransaction();
    console.log('Sample data loaded.');
  } catch (err) {
    await q.rollbackTransaction();
    throw err;
  } finally {
    await q.release();
    await dataSource.destroy();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
