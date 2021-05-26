require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const app = express();
const jsonMiddleware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/api/memories', (req, res, next) => {
  const { location, date, favoriteMoments } = req.body;
  if (!location || !date) {
    throw new ClientError(400, 'location and date are required fields');
  }
  const sql = `
    insert into "memories" ("location", "date", "favoriteMoments")
    values ($1, $2, $3)
    returning *
  `;
  const params = [location, date, favoriteMoments];
  db.query(sql, params)
    .then(result => {
      const [memory] = result.rows;
      res.status(201).json(memory);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
