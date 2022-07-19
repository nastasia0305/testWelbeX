const { Router } = require('express');

const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'test',
  user: 'test',
  password: '123',
});
client.connect();

const router = Router();

router.get('/', async (req, res) => {
  const result = {
    data: [], limit: 10, offset: 0, total: 0,
  };

  try {
    const {
      where, order, limit, offset,
    } = req.query || {};

    const sql = ['SELECT * FROM test'];

    if (where) {
      const { field, operator, search } = JSON.parse(where);

      let type = 'text';
      if (field === 'amount' || field === 'distance') {
        type = 'int';
      }
      if (field === 'date') {
        type = 'date';
      }
      switch (operator) {
        case 'equal': {
          sql.push(`WHERE ${field} = '${search}'::${type}`);
          break;
        }
        case 'contains': {
          sql.push(`WHERE ${field} LIKE '%${search}%'`);
          break;
        }
        case 'gt': {
          sql.push(`WHERE ${field} > '${search}'::${type}`);
          break;
        }
        case 'lt': {
          sql.push(`WHERE ${field} < '${search}'::${type}`);
          break;
        }

        default: {
          break;
        }
      }
    }

    if (order) {
      const { field, direction } = JSON.parse(order);
      sql.push(`ORDER BY ${field} ${direction || 'ASC'}`);
    }

    if (limit) {
      result.limit = limit;
    }

    sql.push(`LIMIT ${result.limit}`);

    if (offset > 0) {
      result.offset = offset;
      sql.push(`OFFSET ${offset}`);
    }

    const { rows: countRows } = await client.query('SELECT COUNT(*) FROM test');
    const { rows } = await client.query(sql.join(' '));
    result.data = rows;
    result.total = parseInt(countRows[0].count, 10);

    res.json(result);
  } catch (error) {
    res.json(result);
  }
});

module.exports = router;
