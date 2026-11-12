# PMS UI and Performance Audit

- Generated: 2026-11-12T14:54:38.281Z
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
| visibleButtonsInventoried | 309 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 315 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 4414 | 7073 | 0 | 4 | 2 | no |
| projects | loaded | 5925 | 8580 | 0 | 1 | 2 | no |
| project-detail | loaded | 3417 | 6075 | 0 | 2 | 0 | no |
| print-design | loaded | 3901 | 6559 | 1 | 17 | 7 | no |
| print-output | loaded | 4390 | 7048 | 0 | 2 | 6 | no |
| events | loaded | 2387 | 5044 | 0 | 7 | 2 | no |
| workflows | loaded | 6934 | 9592 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4883 | 7541 | 0 | 1 | 1 | no |
| event-types | loaded | 5382 | 8051 | 0 | 85 | 1 | no |
| information-types | loaded | 5384 | 8055 | 0 | 136 | 1 | no |
| procurement | loaded | 4384 | 38161 | 0 | 9 | 0 | no |
| attachments | loaded | 5894 | 8549 | 0 | 1 | 1 | no |
| reports | loaded | 4374 | 7035 | 0 | 8 | 12 | no |
| users | loaded | 4385 | 7042 | 0 | 1 | 1 | no |
| departments | loaded | 5406 | 8064 | 0 | 8 | 1 | no |
| roles | loaded | 3374 | 6033 | 0 | 21 | 1 | no |
| permissions | loaded | 4378 | 7035 | 0 | 0 | 1 | no |
| audit | loaded | 5884 | 8539 | 0 | 1 | 1 | no |
| settings | loaded | 4899 | 7552 | 0 | 1 | 3 | no |
| admin | loaded | 3380 | 6037 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T14:57:38.942Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5420 ms | 3532 ms | /د/س/ت/ر/س/ی/ /1/9/0/5/ /// /ر/و/ت/ر/ /1/6/2/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/2/m/s/×/1/ |
| /procurement/orders | 5313 ms | 3416 ms | /د/س/ت/ر/س/ی/ /2/4/3/9/ /// /ر/و/ت/ر/ /9/7/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/6/6/3/m/s/×/1/ |
| /procurement/needs | 5200 ms | 3440 ms | /د/س/ت/ر/س/ی/ /3/0/8/6/ /// /ر/و/ت/ر/ /3/5/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/4/8/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/2/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/6/8/8/m/s/×/1/ |
| /procurement/dashboard | 4400 ms | 2599 ms | /د/س/ت/ر/س/ی/ /1/8/2/8/ /// /ر/و/ت/ر/ /7/7/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/3/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/8/1/m/s/×/1/ |
| /procurement/workspace | 8453 ms | 2204 ms | /د/س/ت/ر/س/ی/ /1/5/9/7/ /// /ر/و/ت/ر/ /6/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/2/5/m/s/×/2/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
