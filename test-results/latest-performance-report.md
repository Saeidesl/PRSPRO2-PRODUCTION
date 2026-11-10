# PMS UI and Performance Audit

- Generated: 2026-11-10T17:22:13.197Z
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
| visibleButtonsInventoried | 158 |
| visibleInputsAndControlsInventoried | 35 |
| networkRequestsMeasured | 309 |
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
| dashboard | loaded | 8106 | 10765 | 0 | 4 | 2 | no |
| projects | loaded | 4893 | 7549 | 0 | 1 | 2 | no |
| project-detail | loaded | 4383 | 7039 | 0 | 2 | 0 | no |
| print-design | loaded | 5878 | 8535 | 1 | 17 | 7 | no |
| print-output | loaded | 4392 | 7049 | 0 | 2 | 6 | no |
| events | loaded | 3380 | 6037 | 0 | 7 | 2 | no |
| workflows | loaded | 3881 | 6538 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4874 | 7531 | 0 | 1 | 1 | no |
| event-types | loaded | 4383 | 7045 | 0 | 85 | 1 | no |
| information-types | loaded | 4370 | 7027 | 0 | 1 | 1 | no |
| procurement | loaded | 3868 | 29497 | 0 | 9 | 0 | no |
| attachments | loaded | 3370 | 6028 | 0 | 1 | 2 | no |
| reports | loaded | 8070 | 10724 | 0 | 0 | 0 | no |
| users | loaded | 3364 | 6021 | 0 | 1 | 1 | no |
| departments | loaded | 8061 | 10717 | 0 | 0 | 0 | no |
| roles | loaded | 4870 | 7527 | 0 | 21 | 1 | no |
| permissions | loaded | 5880 | 8535 | 0 | 0 | 1 | no |
| audit | loaded | 5377 | 8034 | 0 | 1 | 1 | no |
| settings | loaded | 3883 | 6541 | 0 | 1 | 3 | no |
| admin | loaded | 4383 | 7040 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T17:25:10.487Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5068 ms | 3693 ms | /د/س/ت/ر/س/ی/ /2/2/8/5/ /// /ر/و/ت/ر/ /1/4/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/2/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/8/7/m/s/×/1/ |
| /procurement/orders | 4295 ms | 2491 ms | /د/س/ت/ر/س/ی/ /1/6/9/4/ /// /ر/و/ت/ر/ /7/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/8/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/7/8/m/s/×/1/ |
| /procurement/needs | 4382 ms | 2671 ms | /د/س/ت/ر/س/ی/ /1/4/4/9/ /// /ر/و/ت/ر/ /1/2/2/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/9/m/s/×/1/ |
| /procurement/dashboard | 2935 ms | 1655 ms | /د/س/ت/ر/س/ی/ /1/1/0/4/ /// /ر/و/ت/ر/ /5/5/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/1/m/s/×/1/ |
| /procurement/workspace | 4469 ms | 2579 ms | /د/س/ت/ر/س/ی/ /1/8/4/3/ /// /ر/و/ت/ر/ /7/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
