# PMS UI and Performance Audit

- Generated: 2026-11-12T18:24:48.351Z
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
| visibleButtonsInventoried | 163 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 308 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 4937 | 7597 | 0 | 4 | 2 | no |
| projects | loaded | 4902 | 7559 | 0 | 1 | 2 | no |
| project-detail | loaded | 4395 | 7053 | 0 | 2 | 0 | no |
| print-design | loaded | 3895 | 6556 | 1 | 17 | 7 | no |
| print-output | loaded | 4413 | 7070 | 0 | 2 | 6 | no |
| events | loaded | 5406 | 8063 | 0 | 8 | 2 | no |
| workflows | loaded | 4421 | 7076 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3887 | 6549 | 0 | 9 | 1 | no |
| event-types | loaded | 2876 | 5540 | 0 | 85 | 1 | no |
| information-types | loaded | 3400 | 6058 | 0 | 1 | 1 | no |
| procurement | loaded | 3383 | 28679 | 0 | 9 | 0 | no |
| attachments | loaded | 5898 | 8553 | 0 | 1 | 1 | no |
| reports | loaded | 4894 | 7555 | 0 | 8 | 12 | no |
| users | loaded | 4390 | 7045 | 0 | 1 | 1 | no |
| departments | loaded | 3380 | 6038 | 0 | 8 | 1 | no |
| roles | loaded | 3379 | 6036 | 0 | 1 | 1 | no |
| permissions | loaded | 3914 | 6570 | 0 | 0 | 1 | no |
| audit | loaded | 3886 | 6543 | 0 | 1 | 1 | no |
| settings | loaded | 5396 | 8054 | 0 | 1 | 3 | no |
| admin | loaded | 6893 | 9549 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T18:27:39.137Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4363 ms | 1640 ms | /د/س/ت/ر/س/ی/ /9/7/0/ /// /ر/و/ت/ر/ /6/6/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/5/1/m/s/×/1/ |
| /procurement/orders | 3350 ms | 2081 ms | /د/س/ت/ر/س/ی/ /1/3/4/5/ /// /ر/و/ت/ر/ /7/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/3/m/s/×/1/ |
| /procurement/needs | 4155 ms | 2641 ms | /د/س/ت/ر/س/ی/ /2/0/1/5/ /// /ر/و/ت/ر/ /6/2/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/1/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/1/m/s/×/1/ |
| /procurement/dashboard | 5105 ms | 2933 ms | /د/س/ت/ر/س/ی/ /2/2/0/4/ /// /ر/و/ت/ر/ /7/2/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/1/m/s/×/1/ |
| /procurement/workspace | 4343 ms | 2890 ms | /د/س/ت/ر/س/ی/ /2/0/7/9/ /// /ر/و/ت/ر/ /8/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/4/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/9/9/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/9/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
