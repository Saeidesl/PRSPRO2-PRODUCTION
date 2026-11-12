# PMS UI and Performance Audit

- Generated: 2026-11-12T20:23:45.395Z
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
| visibleInputsAndControlsInventoried | 46 |
| networkRequestsMeasured | 312 |
| procurementApiRequestsMeasured | 10 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 3905 | 6564 | 0 | 4 | 2 | no |
| projects | loaded | 4873 | 7532 | 0 | 1 | 2 | no |
| project-detail | loaded | 2909 | 5568 | 0 | 2 | 0 | no |
| print-design | loaded | 3890 | 6552 | 1 | 17 | 7 | no |
| print-output | loaded | 3895 | 6554 | 0 | 2 | 6 | no |
| events | loaded | 5925 | 8581 | 0 | 8 | 2 | no |
| workflows | loaded | 3904 | 6561 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5876 | 8531 | 0 | 1 | 1 | no |
| event-types | loaded | 3359 | 6020 | 0 | 85 | 1 | no |
| information-types | loaded | 4383 | 7039 | 0 | 1 | 1 | no |
| procurement | loaded | 5386 | 29629 | 0 | 9 | 0 | no |
| attachments | loaded | 4886 | 7543 | 0 | 1 | 1 | no |
| reports | loaded | 4365 | 7024 | 0 | 8 | 12 | no |
| users | loaded | 3862 | 6520 | 0 | 27 | 1 | no |
| departments | loaded | 4371 | 7029 | 0 | 8 | 1 | no |
| roles | loaded | 3865 | 6521 | 0 | 1 | 1 | no |
| permissions | loaded | 4884 | 7541 | 0 | 0 | 1 | no |
| audit | loaded | 8074 | 10730 | 0 | 0 | 0 | no |
| settings | loaded | 4398 | 7055 | 0 | 1 | 3 | no |
| admin | loaded | 3378 | 6035 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T20:26:39.156Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4471 ms | 2877 ms | /د/س/ت/ر/س/ی/ /1/4/3/8/ /// /ر/و/ت/ر/ /1/4/3/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/3/m/s/×/1/,/ /g/e/t/A/l/l/:/5/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/6/m/s/×/1/ |
| /procurement/orders | 3736 ms | 1685 ms | /د/س/ت/ر/س/ی/ /1/1/5/9/ /// /ر/و/ت/ر/ /5/2/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/3/m/s/×/1/ |
| /procurement/needs | 4536 ms | 2906 ms | /د/س/ت/ر/س/ی/ /1/6/9/9/ /// /ر/و/ت/ر/ /1/2/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/1/m/s/×/1/ |
| /procurement/dashboard | 3970 ms | 2670 ms | /د/س/ت/ر/س/ی/ /2/2/2/6/ /// /ر/و/ت/ر/ /4/4/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/1/m/s/×/1/ |
| /procurement/workspace | 4061 ms | 2347 ms | /د/س/ت/ر/س/ی/ /1/1/8/4/ /// /ر/و/ت/ر/ /1/1/6/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/9/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
