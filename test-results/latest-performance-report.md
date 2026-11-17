# PMS UI and Performance Audit

- Generated: 2026-11-17T17:16:55.032Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 361 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2991 | 5652 | 0 | 4 | 2 | no |
| projects | loaded | 4444 | 7103 | 0 | 1 | 2 | no |
| project-detail | loaded | 5449 | 8107 | 0 | 2 | 0 | no |
| print-design | loaded | 3933 | 6594 | 1 | 17 | 7 | no |
| print-output | loaded | 6462 | 9118 | 0 | 2 | 6 | no |
| events | loaded | 4435 | 7091 | 0 | 5 | 2 | no |
| workflows | loaded | 3459 | 6117 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3934 | 6592 | 0 | 1 | 1 | no |
| event-types | loaded | 3451 | 6117 | 0 | 85 | 1 | no |
| information-types | loaded | 3945 | 6604 | 0 | 1 | 1 | no |
| procurement | loaded | 4447 | 28277 | 0 | 9 | 0 | no |
| attachments | loaded | 3935 | 6592 | 0 | 1 | 1 | no |
| reports | loaded | 4447 | 7109 | 0 | 8 | 12 | no |
| users | loaded | 4425 | 7084 | 0 | 27 | 1 | no |
| departments | loaded | 2403 | 5061 | 0 | 8 | 1 | no |
| roles | loaded | 3429 | 6087 | 0 | 1 | 1 | no |
| permissions | loaded | 3418 | 6074 | 0 | 0 | 1 | no |
| audit | loaded | 3959 | 6618 | 0 | 1 | 1 | no |
| settings | loaded | 4928 | 7580 | 0 | 1 | 3 | no |
| admin | loaded | 2920 | 5578 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T17:19:39.668Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4873 ms | 3288 ms | /د/س/ت/ر/س/ی/ /2/0/0/3/ /// /ر/و/ت/ر/ /1/2/8/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/6/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/1/m/s/×/1/ |
| /procurement/orders | 3128 ms | 1276 ms | /د/س/ت/ر/س/ی/ /8/6/5/ /// /ر/و/ت/ر/ /4/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/8/4/m/s/×/1/ |
| /procurement/needs | 3107 ms | 1502 ms | /د/س/ت/ر/س/ی/ /1/0/1/5/ /// /ر/و/ت/ر/ /4/8/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/4/m/s/×/1/ |
| /procurement/dashboard | 3366 ms | 1721 ms | /د/س/ت/ر/س/ی/ /1/3/2/7/ /// /ر/و/ت/ر/ /3/9/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/6/4/m/s/×/1/ |
| /procurement/workspace | 3364 ms | 1129 ms | /د/س/ت/ر/س/ی/ /7/5/7/ /// /ر/و/ت/ر/ /3/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/6/2/m/s/×/1/,/ /g/e/t/A/l/l/:/1/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/1/6/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
