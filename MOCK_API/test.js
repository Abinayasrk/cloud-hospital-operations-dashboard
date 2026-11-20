import test from 'node:test';import assert from 'node:assert/strict';import {handle} from './server.js';
function request(path,method='GET'){return new Promise(resolve=>{const headers={};let text='';const res={writeHead(code,h){this.status=code;Object.assign(headers,h)},end(v=''){text=v;resolve({status:this.status,data:JSON.parse(text||'{}')})}};handle({method,url:path},res);});}
test('health endpoint',async()=>assert.equal((await request('/api/health')).data.ok,true));
test('160 transactions in API',async()=>assert.equal((await request('/api/transactions?limit=1')).data.total,160));
test('metrics derived from data',async()=>assert.equal((await request('/api/metrics')).data.transactions,160));
test('case-insensitive search',async()=>assert.deepEqual((await request('/api/transactions?search=CARE%20PLAN')).data.total,(await request('/api/transactions?search=care%20plan')).data.total));
test('reject invalid sort',async()=>assert.equal((await request('/api/transactions?sort=password')).status,400));
test('reject invalid method',async()=>assert.equal((await request('/api/health','POST')).status,405));
