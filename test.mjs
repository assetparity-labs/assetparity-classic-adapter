import test from 'node:test';import assert from 'node:assert/strict';import {units,parseAmount,formatAmount,classicCategory,normalizeClassic} from './index.mjs';
for(const [a,b]of [['0','0'],['0.0000001','1'],['1.2345678','12345678'],['922337203685.4775807','9223372036854775807']])test('parse '+a,()=>assert.equal(parseAmount(a),b));
for(const a of ['1.00000001','1e2','-1','01',' 1','922337203685.4775808'])test('reject '+a,()=>assert.throws(()=>parseAmount(a)));
test('format exact fractional amount',()=>assert.equal(formatAmount('12345678'),'1.2345678'));
test('unknown errors remain unknown',()=>assert.equal(classicCategory('payment_mystery'),'UNKNOWN'));
test('negative balances rejected',()=>assert.throws(()=>units('-1')));
