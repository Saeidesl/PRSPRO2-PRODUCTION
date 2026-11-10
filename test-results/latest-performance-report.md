# PMS UI and Performance Audit

- Generated: 2026-11-10T19:39:07.452Z
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
| visibleButtonsInventoried | 174 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 332 |
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
| dashboard | loaded | 4484 | 7145 | 0 | 4 | 2 | no |
| projects | loaded | 3428 | 6085 | 0 | 1 | 2 | no |
| project-detail | loaded | 3945 | 6603 | 0 | 2 | 0 | no |
| print-design | loaded | 4918 | 7579 | 1 | 17 | 7 | no |
| print-output | loaded | 8107 | 10764 | 0 | 2 | 6 | no |
| events | loaded | 3923 | 6579 | 0 | 7 | 2 | no |
| workflows | loaded | 5000 | 7658 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4411 | 7069 | 0 | 1 | 1 | no |
| event-types | loaded | 3924 | 6591 | 0 | 85 | 1 | no |
| information-types | loaded | 4452 | 7110 | 0 | 1 | 1 | no |
| procurement | loaded | 4916 | 32995 | 0 | 9 | 0 | no |
| attachments | loaded | 5425 | 8083 | 0 | 1 | 2 | no |
| reports | loaded | 4436 | 7099 | 0 | 8 | 12 | no |
| users | loaded | 2932 | 5587 | 0 | 1 | 1 | no |
| departments | loaded | 3918 | 6576 | 0 | 8 | 1 | no |
| roles | loaded | 4410 | 7067 | 0 | 21 | 1 | no |
| permissions | loaded | 4404 | 7062 | 0 | 0 | 1 | no |
| audit | loaded | 3410 | 6068 | 0 | 1 | 1 | no |
| settings | loaded | 3412 | 6069 | 0 | 1 | 3 | no |
| admin | loaded | 3415 | 6073 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T19:41:57.919Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5679 ms | 4143 ms | /د/س/ت/ر/س/ی/ /3/1/8/6/ /// /ر/و/ت/ر/ /9/5/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/3/5/4/m/s/×/1/,/ /g/e/t/A/l/l/:/9/1/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/3/6/m/s/×/1/ |
| /procurement/orders | 3403 ms | 1658 ms | /د/س/ت/ر/س/ی/ /1/1/2/6/ /// /ر/و/ت/ر/ /5/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/7/m/s/×/1/ |
| /procurement/needs | 4051 ms | 2564 ms | /د/س/ت/ر/س/ی/ /1/6/9/1/ /// /ر/و/ت/ر/ /8/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/9/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/4/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/3/9/m/s/×/2/ |
| /procurement/dashboard | 4124 ms | 2406 ms | /د/س/ت/ر/س/ی/ /1/9/0/7/ /// /ر/و/ت/ر/ /4/9/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/3/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/8/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/5/1/m/s/×/1/ |
| /procurement/workspace | 6848 ms | 1519 ms | /د/س/ت/ر/س/ی/ /1/0/5/8/ /// /ر/و/ت/ر/ /4/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/9/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
