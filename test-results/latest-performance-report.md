# PMS UI and Performance Audit

- Generated: 2026-11-11T11:47:48.855Z
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
| visibleButtonsInventoried | 315 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 340 |
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
| dashboard | loaded | 3505 | 6166 | 0 | 4 | 2 | no |
| projects | loaded | 4445 | 7101 | 0 | 1 | 2 | no |
| project-detail | loaded | 3427 | 6083 | 0 | 2 | 0 | no |
| print-design | loaded | 2918 | 5580 | 1 | 17 | 7 | no |
| print-output | loaded | 3933 | 6592 | 0 | 2 | 6 | no |
| events | loaded | 3922 | 6580 | 0 | 7 | 2 | no |
| workflows | loaded | 3451 | 6108 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4430 | 7088 | 0 | 1 | 1 | no |
| event-types | loaded | 2938 | 5603 | 0 | 85 | 1 | no |
| information-types | loaded | 4427 | 7101 | 0 | 136 | 1 | no |
| procurement | loaded | 3981 | 33360 | 0 | 9 | 0 | no |
| attachments | loaded | 4425 | 7082 | 0 | 1 | 2 | no |
| reports | loaded | 3954 | 6616 | 0 | 8 | 12 | no |
| users | loaded | 4455 | 7113 | 0 | 27 | 1 | no |
| departments | loaded | 4424 | 7082 | 0 | 8 | 1 | no |
| roles | loaded | 5924 | 8579 | 0 | 1 | 1 | no |
| permissions | loaded | 5422 | 8080 | 0 | 0 | 1 | no |
| audit | loaded | 5418 | 8075 | 0 | 1 | 1 | no |
| settings | loaded | 2912 | 5568 | 0 | 1 | 3 | no |
| admin | loaded | 3419 | 6077 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T11:50:33.892Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6378 ms | 4959 ms | /د/س/ت/ر/س/ی/ /3/1/1/0/ /// /ر/و/ت/ر/ /1/8/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/1/1/4/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/1/3/m/s/×/1/ |
| /procurement/orders | 5331 ms | 2792 ms | /د/س/ت/ر/س/ی/ /1/1/1/9/ /// /ر/و/ت/ر/ /1/6/7/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/6/0/m/s/×/1/,/ /g/e/t/A/l/l/:/6/5/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/1/m/s/×/1/ |
| /procurement/needs | 4146 ms | 2438 ms | /د/س/ت/ر/س/ی/ /1/6/9/9/ /// /ر/و/ت/ر/ /7/3/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/2/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/7/9/m/s/×/1/ |
| /procurement/dashboard | 4445 ms | 2544 ms | /د/س/ت/ر/س/ی/ /1/6/1/5/ /// /ر/و/ت/ر/ /9/2/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/9/m/s/×/1/ |
| /procurement/workspace | 4581 ms | 1707 ms | /د/س/ت/ر/س/ی/ /1/2/3/2/ /// /ر/و/ت/ر/ /4/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
