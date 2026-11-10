# PMS UI and Performance Audit

- Generated: 2026-11-10T12:17:43.475Z
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
| visibleButtonsInventoried | 208 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 324 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 3436 | 6095 | 0 | 4 | 2 | no |
| projects | loaded | 4403 | 7061 | 0 | 1 | 2 | no |
| project-detail | loaded | 5402 | 8056 | 0 | 2 | 0 | no |
| print-design | loaded | 3389 | 6048 | 1 | 17 | 6 | no |
| print-output | loaded | 8085 | 10741 | 0 | 2 | 6 | no |
| events | loaded | 4401 | 7059 | 0 | 7 | 2 | no |
| workflows | loaded | 3410 | 6066 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2902 | 5558 | 0 | 9 | 1 | no |
| event-types | loaded | 3885 | 6547 | 0 | 85 | 1 | no |
| information-types | loaded | 3913 | 6570 | 0 | 1 | 1 | no |
| procurement | loaded | 3389 | 30811 | 0 | 9 | 0 | no |
| attachments | loaded | 3884 | 6539 | 0 | 1 | 2 | no |
| reports | loaded | 3386 | 6048 | 0 | 8 | 12 | no |
| users | loaded | 3388 | 6047 | 0 | 27 | 1 | no |
| departments | loaded | 5410 | 8067 | 0 | 8 | 1 | no |
| roles | loaded | 3382 | 6040 | 0 | 21 | 1 | no |
| permissions | loaded | 2911 | 5569 | 0 | 0 | 1 | no |
| audit | loaded | 4386 | 7041 | 0 | 1 | 1 | no |
| settings | loaded | 3389 | 6047 | 0 | 1 | 3 | no |
| admin | loaded | 4389 | 7045 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T12:20:20.614Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3651 ms | 1959 ms | /د/س/ت/ر/س/ی/ /1/1/8/4/ /// /ر/و/ت/ر/ /7/7/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/4/1/m/s/×/1/ |
| /procurement/orders | 2783 ms | 1631 ms | /د/س/ت/ر/س/ی/ /1/1/5/7/ /// /ر/و/ت/ر/ /4/7/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/5/8/m/s/×/1/ |
| /procurement/needs | 4456 ms | 2869 ms | /د/س/ت/ر/س/ی/ /1/7/3/1/ /// /ر/و/ت/ر/ /1/1/3/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/9/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/1/7/m/s/×/1/,/ /g/e/t/A/l/l/:/7/7/0/m/s/×/1/ |
| /procurement/dashboard | 9850 ms | 8389 ms | /د/س/ت/ر/س/ی/ /7/8/6/6/ /// /ر/و/ت/ر/ /5/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/9/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/1/7/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/3/7/m/s/×/1/ |
| /procurement/workspace | 4001 ms | 2511 ms | /د/س/ت/ر/س/ی/ /1/6/4/8/ /// /ر/و/ت/ر/ /8/6/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
