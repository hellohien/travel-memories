require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
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

app.post('/api/memories/:action', (req, res, next) => {
  const action = req.params.action;
  if (action === 'signIn') {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
      select "userId",
            "hashedPassword"
      from "users"
      where "username" = $1
    `;
    const params = [username];
    db.query(sql, params)
      .then(result => {
        const [user] = result.rows;
        if (!user) {
          throw new ClientError(401, 'invalid login');
        }
        const { userId, hashedPassword } = user;
        return argon2
          .verify(hashedPassword, password)
          .then(isMatching => {
            if (!isMatching) {
              throw new ClientError(401, 'invalid login');
            }
            const payload = { userId, username };
            const token = jwt.sign(payload, process.env.TOKEN_SECRET);
            res.json({ token, user: payload });
          });
      });
  } else if (action === 'signUp') {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    argon2
      .hash(password)
      .then(hashedPassword => {
        const sql = `
          insert into "users" ("username", "hashedPassword")
          values ($1, $2)
          returning *
        `;
        const params = [username, hashedPassword];
        if (!username || !password) {
          throw new ClientError(400, 'username and password are required fields');
        }
        return db.query(sql, params);
      })
      .then(result => {
        const [user] = result.rows;
        res.status(201).json(user);
      })
      .catch(err => next(err));
  }
});

app.post('/api/memories', (req, res, next) => {
  const { placeVisited, date, favoriteMoments, lat, long } = req.body;
  if (!placeVisited || !date) {
    throw new ClientError(400, 'location and date are required fields');
  }
  const sql = `
    insert into "memories" ("placeVisited", "date", "favoriteMoments", "lat", "long")
    values ($1, $2, $3, $4, $5)
    returning *
  `;
  const params = [placeVisited, date, favoriteMoments, lat, long];
  db.query(sql, params)
    .then(result => {
      const [memory] = result.rows;
      res.status(201).json(memory);
    })
    .catch(err => next(err));
});

app.get('/api/memories', (req, res, next) => {
  const sql = `
    select *
    from "memories"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/memories/:memoryId', (req, res, next) => {
  const memoryId = parseInt(req.params.memoryId, 10);
  if (!Number.isInteger(memoryId) || memoryId < 1) {
    throw new ClientError(400, 'memoryId must be a positive integer');
  }
  const sql = `
    delete from "memories"
    where "memoryId" = $1
    returning *
  `;
  const params = [memoryId];
  db.query(sql, params)
    .then(result => {
      const [memory] = result.rows;
      res.json(memory);
    })
    .catch(err => (err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
