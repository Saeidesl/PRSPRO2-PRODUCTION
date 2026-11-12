# PMS UI and Performance Audit

- Generated: 2026-11-12T20:02:01.396Z
- Base URL: http://127.0.0.1:4173/PRSPRO2/
- Mode: authenticated-read-only
- Overall: **authenticated-audit-complete**

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
| visibleButtonsInventoried | 147 |
| visibleInputsAndControlsInventoried | 35 |
| networkRequestsMeasured | 303 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 0 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 6007 | 8667 | 0 | 4 | 2 | no |
| projects | loaded | 5937 | 8594 | 0 | 1 | 2 | no |
| project-detail | loaded | 3922 | 6579 | 0 | 2 | 0 | no |
| print-design | loaded | 4440 | 7102 | 1 | 17 | 7 | no |
| print-output | loaded | 3417 | 6073 | 0 | 2 | 6 | no |
| events | loaded | 3423 | 6082 | 0 | 8 | 2 | no |
| workflows | loaded | 3966 | 6625 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3928 | 6586 | 0 | 1 | 1 | no |
| event-types | loaded | 5414 | 8081 | 0 | 85 | 1 | no |
| information-types | loaded | 3416 | 6073 | 0 | 1 | 1 | no |
| procurement | loaded | 4954 | 31695 | 0 | 9 | 0 | no |
| attachments | loaded | 3429 | 6086 | 0 | 1 | 1 | no |
| reports | loaded | 8129 | 10784 | 0 | 0 | 0 | no |
| users | loaded | 4921 | 7577 | 0 | 1 | 1 | no |
| departments | loaded | 4421 | 7076 | 0 | 8 | 1 | no |
| roles | loaded | 4917 | 7575 | 0 | 1 | 1 | no |
| permissions | loaded | 3445 | 6103 | 0 | 0 | 1 | no |
| audit | loaded | 2918 | 5576 | 0 | 1 | 1 | no |
| settings | loaded | 4924 | 7581 | 0 | 1 | 3 | no |
| admin | loaded | 4420 | 7078 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T20:05:01.565Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6284 ms | 4584 ms | /د/س/ت/ر/س/ی/ /1/3/7/8/ /// /ر/و/ت/ر/ /3/2/0/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/8/2/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/9/1/m/s/×/1/ |
| /procurement/orders | 5621 ms | 3363 ms | /د/س/ت/ر/س/ی/ /2/4/1/2/ /// /ر/و/ت/ر/ /9/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/4/8/m/s/×/1/,/ /g/e/t/A/l/l/:/6/9/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/6/m/s/×/1/ |
| /procurement/needs | 2700 ms | 1495 ms | /د/س/ت/ر/س/ی/ /1/0/2/5/ /// /ر/و/ت/ر/ /4/7/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/0/9/m/s/×/1/ |
| /procurement/dashboard | 4782 ms | 3232 ms | /د/س/ت/ر/س/ی/ /2/6/7/8/ /// /ر/و/ت/ر/ /5/5/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/9/8/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/7/3/m/s/×/1/ |
| /procurement/workspace | 3367 ms | 2166 ms | /د/س/ت/ر/س/ی/ /1/5/5/7/ /// /ر/و/ت/ر/ /6/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
