# PMS UI and Performance Audit

- Generated: 2026-11-12T16:21:29.222Z
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
| visibleButtonsInventoried | 173 |
| visibleInputsAndControlsInventoried | 46 |
| networkRequestsMeasured | 311 |
| procurementApiRequestsMeasured | 6 |
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
| dashboard | loaded | 4919 | 7578 | 0 | 4 | 2 | no |
| projects | loaded | 3384 | 6040 | 0 | 1 | 2 | no |
| project-detail | loaded | 5884 | 8539 | 0 | 2 | 0 | no |
| print-design | loaded | 3884 | 6543 | 1 | 17 | 7 | no |
| print-output | loaded | 4878 | 7539 | 0 | 2 | 6 | no |
| events | loaded | 7458 | 10115 | 0 | 7 | 2 | no |
| workflows | loaded | 4906 | 7563 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4878 | 7535 | 0 | 1 | 1 | no |
| event-types | loaded | 3875 | 6538 | 0 | 85 | 1 | no |
| information-types | loaded | 2876 | 5532 | 0 | 1 | 1 | no |
| procurement | loaded | 7899 | 35762 | 0 | 9 | 0 | no |
| attachments | loaded | 3890 | 6547 | 0 | 1 | 1 | no |
| reports | loaded | 4877 | 7537 | 0 | 8 | 12 | no |
| users | loaded | 8065 | 10721 | 0 | 0 | 0 | no |
| departments | loaded | 3867 | 6523 | 0 | 8 | 1 | no |
| roles | loaded | 4365 | 7022 | 0 | 21 | 1 | no |
| permissions | loaded | 5392 | 8048 | 0 | 0 | 1 | no |
| audit | loaded | 8066 | 10722 | 0 | 1 | 1 | no |
| settings | loaded | 5887 | 8542 | 0 | 1 | 3 | no |
| admin | loaded | 3373 | 6031 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T16:24:32.092Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4202 ms | 2494 ms | /د/س/ت/ر/س/ی/ /1/5/0/3/ /// /ر/و/ت/ر/ /9/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/5/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/5/9/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/5/7/m/s/×/1/ |
| /procurement/orders | 3373 ms | 2023 ms | /د/س/ت/ر/س/ی/ /1/4/4/4/ /// /ر/و/ت/ر/ /5/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/8/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/8/3/m/s/×/1/ |
| /procurement/needs | 4538 ms | 2739 ms | /د/س/ت/ر/س/ی/ /1/6/7/8/ /// /ر/و/ت/ر/ /1/0/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/8/m/s/×/1/ |
| /procurement/dashboard | 6784 ms | 2609 ms | /د/س/ت/ر/س/ی/ /1/8/2/0/ /// /ر/و/ت/ر/ /7/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/9/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/8/m/s/×/1/ |
| /procurement/workspace | 4497 ms | 2565 ms | /د/س/ت/ر/س/ی/ /1/5/6/3/ /// /ر/و/ت/ر/ /1/0/0/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
