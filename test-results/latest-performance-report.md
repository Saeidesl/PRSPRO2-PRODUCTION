# PMS UI and Performance Audit

- Generated: 2026-11-10T20:44:42.489Z
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
| visibleButtonsInventoried | 204 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 353 |
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
| dashboard | loaded | 4476 | 7136 | 0 | 4 | 2 | no |
| projects | loaded | 5427 | 8085 | 0 | 1 | 2 | no |
| project-detail | loaded | 2912 | 5568 | 0 | 2 | 0 | no |
| print-design | loaded | 4414 | 7074 | 1 | 17 | 7 | no |
| print-output | loaded | 4415 | 7073 | 0 | 2 | 6 | no |
| events | loaded | 3434 | 6093 | 0 | 7 | 2 | no |
| workflows | loaded | 3475 | 6130 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3415 | 6073 | 0 | 1 | 1 | no |
| event-types | loaded | 5915 | 8579 | 0 | 85 | 1 | no |
| information-types | loaded | 3909 | 6567 | 0 | 1 | 1 | no |
| procurement | loaded | 4408 | 31096 | 0 | 9 | 0 | no |
| attachments | loaded | 3917 | 6574 | 0 | 31 | 2 | no |
| reports | loaded | 3918 | 6581 | 0 | 8 | 12 | no |
| users | loaded | 2901 | 5557 | 0 | 1 | 1 | no |
| departments | loaded | 3400 | 6056 | 0 | 8 | 1 | no |
| roles | loaded | 3903 | 6561 | 0 | 21 | 1 | no |
| permissions | loaded | 4434 | 7090 | 0 | 0 | 1 | no |
| audit | loaded | 3906 | 6564 | 0 | 1 | 1 | no |
| settings | loaded | 3410 | 6068 | 0 | 1 | 3 | no |
| admin | loaded | 2906 | 5562 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T20:47:25.065Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5881 ms | 3492 ms | /د/س/ت/ر/س/ی/ /2/0/9/6/ /// /ر/و/ت/ر/ /1/3/9/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/4/m/s/×/1/ |
| /procurement/orders | 4697 ms | 2654 ms | /د/س/ت/ر/س/ی/ /1/8/2/3/ /// /ر/و/ت/ر/ /8/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/1/m/s/×/1/ |
| /procurement/needs | 3836 ms | 2026 ms | /د/س/ت/ر/س/ی/ /1/2/4/7/ /// /ر/و/ت/ر/ /7/7/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/8/m/s/×/1/ |
| /procurement/dashboard | 4392 ms | 2174 ms | /د/س/ت/ر/س/ی/ /1/6/3/7/ /// /ر/و/ت/ر/ /5/3/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/0/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/9/m/s/×/1/ |
| /procurement/workspace | 3897 ms | 1982 ms | /د/س/ت/ر/س/ی/ /1/2/2/5/ /// /ر/و/ت/ر/ /7/5/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
