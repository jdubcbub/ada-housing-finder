import { describe, test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import type { Server } from 'node:http';
import type { AddressInfo } from 'node:net';
import app from './app.js';

// Hooks live inside describe() so they also run on Node 18.
describe('listings API', () => {
  let server: Server;
  let base = '';

  before(async () => {
    server = app.listen(0);
    if (!server.listening) await new Promise((resolve) => server.once('listening', resolve));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });

  after(() => {
    // fetch keeps connections alive; close them so the test process can exit.
    server.closeAllConnections();
    server.close();
  });

  test('GET /listings returns every test unit', async () => {
    const res = await fetch(`${base}/listings`);
    assert.equal(res.status, 200);
    const body = await res.json();
    assert.ok(Array.isArray(body) && body.length > 0);
  });

  test('GET /listings filters by neighborhood, ignoring case', async () => {
    const body = await (await fetch(`${base}/listings?neighborhood=capitol%20hill`)).json();
    assert.ok(body.length > 0);
    for (const l of body) assert.equal(l.neighborhood, 'Capitol Hill');
  });

  test('GET /listings corrects "Capital Hill"', async () => {
    const body = await (await fetch(`${base}/listings?neighborhood=Capital%20Hill`)).json();
    assert.ok(body.length > 0);
  });

  test('GET /listings returns an empty list when nothing matches', async () => {
    const body = await (await fetch(`${base}/listings?neighborhood=Nowhere`)).json();
    assert.deepEqual(body, []);
  });

  test('GET /listings/:id returns one unit', async () => {
    const res = await fetch(`${base}/listings/1`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).id, '1');
  });

  test('GET /listings/:id returns 404 for an unknown id', async () => {
    const res = await fetch(`${base}/listings/does-not-exist`);
    assert.equal(res.status, 404);
  });
});
