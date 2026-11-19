# PMS UI and Performance Audit

- Generated: 2026-11-19T16:31:31.419Z
- Base URL: http://127.0.0.1:4173/PRSPRO2/
- Mode: authenticated-read-only
- Overall: **needs-attention**

## Summary

| Metric | Result |
|---|---:|
| requestedRoutes | 20 |
| loadedRoutes | 20 |
| permissionDeniedRoutes | 0 |
| failedRoutes | 0 |
| mobileRoutesWithHorizontalOverflow | 0 |
| visibleFormsInventoried | 12 |
| dynamicFormsInventoried | 11 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 180 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 322 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2940 | 5598 | 0 | 4 | 2 | no |
| projects | loaded | 4925 | 7581 | 0 | 1 | 2 | no |
| project-detail | loaded | 4383 | 7040 | 0 | 2 | 0 | no |
| print-design | loaded | 4383 | 7040 | 1 | 17 | 7 | no |
| print-output | loaded | 4390 | 7046 | 0 | 2 | 6 | no |
| events | loaded | 3368 | 6023 | 0 | 5 | 2 | no |
| workflows | loaded | 4938 | 7596 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4374 | 7030 | 0 | 9 | 1 | no |
| event-types | loaded | 4368 | 7029 | 0 | 85 | 1 | no |
| information-types | loaded | 4394 | 7051 | 0 | 1 | 1 | no |
| procurement | loaded | 3875 | 29330 | 0 | 9 | 0 | no |
| attachments | loaded | 4385 | 7042 | 0 | 1 | 1 | no |
| reports | loaded | 2870 | 5530 | 0 | 8 | 12 | no |
| users | loaded | 4368 | 7028 | 0 | 1 | 1 | no |
| departments | loaded | 3365 | 6023 | 0 | 8 | 1 | no |
| roles | loaded | 4876 | 7530 | 0 | 21 | 1 | no |
| permissions | loaded | 2864 | 5522 | 0 | 0 | 1 | no |
| audit | loaded | 4380 | 7038 | 0 | 1 | 1 | no |
| settings | loaded | 4387 | 7041 | 0 | 1 | 3 | no |
| admin | loaded | 4380 | 7037 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-19T16:34:19.222Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5352 ms | 3647 ms | /د/س/ت/ر/س/ی/ /1/9/8/3/ /// /ر/و/ت/ر/ /1/6/6/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/5/m/s/×/1/,/ /g/e/t/A/l/l/:/5/3/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/8/m/s/×/1/ |
| /procurement/orders | 3837 ms | 2164 ms | /د/س/ت/ر/س/ی/ /1/2/8/6/ /// /ر/و/ت/ر/ /8/7/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/3/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/ |
| /procurement/needs | 4282 ms | 2205 ms | /د/س/ت/ر/س/ی/ /1/4/8/3/ /// /ر/و/ت/ر/ /7/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/0/m/s/×/1/ |
| /procurement/dashboard | 4156 ms | 2486 ms | /د/س/ت/ر/س/ی/ /1/7/0/4/ /// /ر/و/ت/ر/ /7/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/2/m/s/×/1/ |
| /procurement/workspace | 5098 ms | 3648 ms | /د/س/ت/ر/س/ی/ /2/7/6/0/ /// /ر/و/ت/ر/ /8/8/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/6/2/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
