# Classic payment adapter

The classic side of AssetParity: exact seven-decimal conversion, bounded int64 amounts, payment operation construction and raw Horizon outcome normalization.

## Example

```js
import {parseAmount, formatAmount, payment} from './index.mjs';
parseAmount('1.2345678'); // '12345678' base units
formatAmount('1');       // '0.0000001'
```

`payment()` is an asynchronous operation builder. It dynamically loads Stellar SDK 17.3.0, validates a positive amount, and returns an unsigned payment operation. It never signs or submits. Run `npm ci` before using the builder; pure amount and outcome helpers have no external runtime dependency.

## Amount contract

Use decimal strings, not floating-point numbers. Exponents, negatives, whitespace, leading-zero variants, more than seven fractional digits and amounts above signed int64 are rejected. Zero can be parsed as a balance but cannot be built as a transfer.

## Failure categories

Raw operation errors are retained. Underfunding and a full recipient trustline both map to `BALANCE_CONSTRAINT`; this deliberately does not identify the same root cause. Authorization and missing-trustline failures have separate categories. Unknown errors remain `UNKNOWN`, even when both routes fail.

Run `node --test test.mjs`. The integrated campaign service and pilot are documented in [assetparity-backend](https://github.com/assetparity-labs/assetparity-backend).
