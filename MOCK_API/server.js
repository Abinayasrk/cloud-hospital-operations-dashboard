import http from 'node:http';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const data = JSON.parse(
  readFileSync(
    new URL('../DATA/transactions.json', import.meta.url),
    'utf8'
  )
);

const allowed = [
  'transaction_id',
  'date',
  'service',
  'region',
  'channel',
  'status',
  'amount_inr'
];

const send = (res, status, body) => {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  });

  res.end(JSON.stringify(body));
};

export function handle(req, res) {

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method !== 'GET') {
    return send(res, 405, { error: 'Method not allowed' });
  }

  let u;

  try {
    u = new URL(req.url, 'http://localhost');
  } catch {
    return send(res, 400, { error: 'Invalid URL' });
  }

  if (u.pathname === '/api/health') {
    return send(res, 200, { ok: true });
  }

  if (u.pathname === '/api/metrics') {
    return send(res, 200, {
      totalRevenue: data
        .filter(x => x.status === 'Settled')
        .reduce((s, x) => s + Number(x.amount_inr), 0),

      transactions: data.length,

      settled: data.filter(x => x.status === 'Settled').length,

      pending: data.filter(x => x.status === 'Pending').length
    });
  }

  if (u.pathname === '/api/transactions') {

    const q = u.searchParams;

    const page = Number(q.get('page') || 1);
    const limit = Number(q.get('limit') || 20);
    const sort = q.get('sort') || 'date';
    const direction = q.get('direction') || 'desc';

    if (
      !Number.isInteger(page) ||
      page < 1 ||
      !Number.isInteger(limit) ||
      limit < 1 ||
      limit > 100 ||
      !allowed.includes(sort) ||
      !['asc', 'desc'].includes(direction)
    ) {
      return send(res, 400, {
        error: 'Invalid paging or sorting parameters'
      });
    }

    const status = q.get('status') || '';
    const region = q.get('region') || '';
    const search = (q.get('search') || '').trim().toLowerCase();

    if (
      status &&
      !['Settled', 'Pending', 'Refunded', 'Failed'].includes(status)
    ) {
      return send(res, 400, { error: 'Invalid status' });
    }

    if (
      region &&
      !['North', 'South', 'East', 'West'].includes(region)
    ) {
      return send(res, 400, { error: 'Invalid region' });
    }

    const found = data.filter(x =>
      (!status || x.status === status) &&
      (!region || x.region === region) &&
      (
        !search ||
        [
          x.transaction_id,
          x.service,
          x.region,
          x.channel
        ].some(v =>
          String(v).toLowerCase().includes(search)
        )
      )
    );

    found.sort((a, b) => {

      let delta;

      if (sort === 'amount_inr') {
        delta = Number(a.amount_inr) - Number(b.amount_inr);

      } else if (sort === 'date') {
        delta = new Date(a.date).getTime() -
                new Date(b.date).getTime();

      } else {
        delta = String(a[sort]).localeCompare(
          String(b[sort]),
          undefined,
          { numeric: true, sensitivity: 'base' }
        );
      }

      return direction === 'asc' ? delta : -delta;
    });

    return send(res, 200, {
      items: found.slice(
        (page - 1) * limit,
        page * limit
      ),
      total: found.length,
      page,
      limit
    });
  }

  return send(res, 404, { error: 'Not found' });
}

// Windows-compatible server startup
// Windows-compatible server startup

const currentFile = resolve(fileURLToPath(import.meta.url));
const executedFile = process.argv[1]
  ? resolve(process.argv[1])
  : '';

if (executedFile && currentFile === executedFile) {
  const PORT = Number(process.env.PORT || 8787);

  http.createServer((req, res) => {
    try {
      handle(req, res);
    } catch (error) {
      console.error('API server error:', error);

      if (!res.headersSent) {
        send(res, 500, {
          error: 'Internal server error'
        });
      } else {
        res.end();
      }
    }
  }).listen(PORT, '127.0.0.1', () => {
    console.log(
      `Cloud Hospital API running at http://localhost:${PORT}`
    );
  });
}