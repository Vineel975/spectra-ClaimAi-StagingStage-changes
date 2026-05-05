const initSqlJs = require('sql.js');
const fs = require('fs');

initSqlJs().then(SQL => {
  const db = new SQL.Database(fs.readFileSync('./claim_jobs.db'));
  const results = db.exec('SELECT * FROM claim_jobs ORDER BY created_at DESC');
  if (results.length === 0) { console.log('No records found'); return; }
  const { columns, values } = results[0];
  console.table(values.map(row => Object.fromEntries(columns.map((c, i) => [c, row[i]]))));
});
