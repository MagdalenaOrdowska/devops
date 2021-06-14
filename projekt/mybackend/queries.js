const { Pool } = require('pg');

// postgres client
const pgClient = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  port: "5432"
});

pgClient.on('connect', () => {
  console.log('Connected to postgres');
});

pgClient.on('error', () => {
  console.log("Postgres not connected");
});

// redis client
const redis = require('redis');

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: 6379,
  // retry_strategy: () => 1000
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', () => {
  console.log("Redis not connected")
});


// table
function createTableIfNotExists() {
  pgClient.query(`CREATE TABLE IF NOT EXISTS sport (
            ID SERIAL PRIMARY KEY     NOT NULL,
            name           TEXT    NOT NULL,
            type           TEXT     NOT NULL
        );`)
    .catch((err) => {
      console.log(err);
    });
};

// get
const getSport = (request, response) => {
  pgClient.query('SELECT * FROM sport ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
};

// get
const getSportById = (request, response) => {
  const id = parseInt(request.params.id)

  redisClient.exists(id, (err, ok) => {
    if (err) throw err;

    if (ok == 1) {
      redisClient.hgetall(id, function (err, object) {
        if (err) throw err;
        response.status(200).header('cache', 'true').json(object);
      })
      console.log(`from redis with ID = ${id}`);
    } else {
      pgClient.query('SELECT * FROM sport WHERE id = $1', [id], (error, results) => {
        if (error) {
          console.log(error);
        }
        response.status(200).json(results.rows[0])
      })
      console.log(`from postgres with ID = ${id}`);
    }
  });
};

// post
const createSport = (request, response) => {
  const { name, type } = request.body

  pgClient.query('INSERT INTO sport (name, type) VALUES ($1, $2) RETURNING ID', [name, type], (error, result) => {
    if (error) {
      console.log(error);
      // console.log(request.body);
    }
    var id = result.rows[0].id;
    redisClient.hmset(id, 'name', name, 'type', type);
    response.status(201).send(`record added with ID: ${id}`)
  })
};

const deleteSport = (request, response) => {
  const id = parseInt(request.params.id)

  pgClient.query('DELETE FROM sport WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`record deleted with ID: ${id}`)
  })

  redisClient.del(id);
};

const updateSport = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, type } = request.body

  pgClient.query(
    'UPDATE sport SET name = $1, type = $2 WHERE id = $3',
    [name, type, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`record modified with ID: ${id}`)
    })

    redisClient.hmset(id, 'name', name, 'type', type);
};

module.exports = {
  createTableIfNotExists,
  createSport,
  getSport,
  getSportById,
  deleteSport,
  updateSport
}
