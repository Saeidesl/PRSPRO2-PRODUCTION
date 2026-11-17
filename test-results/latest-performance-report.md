# PMS UI and Performance Audit

- Generated: 2026-11-17T19:31:53.893Z
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
| visibleButtonsInventoried | 160 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 357 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 3916 | 6576 | 0 | 4 | 2 | no |
| projects | loaded | 3384 | 6041 | 0 | 1 | 2 | no |
| project-detail | loaded | 3879 | 6537 | 0 | 2 | 0 | no |
| print-design | loaded | 3377 | 6036 | 1 | 17 | 7 | no |
| print-output | loaded | 4385 | 7043 | 0 | 2 | 6 | no |
| events | loaded | 3404 | 6058 | 0 | 5 | 2 | no |
| workflows | loaded | 2917 | 5575 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3875 | 6531 | 0 | 9 | 1 | no |
| event-types | loaded | 3384 | 6047 | 0 | 85 | 1 | no |
| information-types | loaded | 3378 | 6033 | 0 | 1 | 1 | no |
| procurement | loaded | 3911 | 25846 | 0 | 9 | 0 | no |
| attachments | loaded | 3401 | 6059 | 0 | 1 | 1 | no |
| reports | loaded | 4377 | 7039 | 0 | 8 | 12 | no |
| users | loaded | 4889 | 7545 | 0 | 1 | 1 | no |
| departments | loaded | 3906 | 6564 | 0 | 8 | 1 | no |
| roles | loaded | 3888 | 6545 | 0 | 1 | 1 | no |
| permissions | loaded | 3398 | 6053 | 0 | 0 | 1 | no |
| audit | loaded | 2872 | 5529 | 0 | 1 | 1 | no |
| settings | loaded | 2878 | 5534 | 0 | 1 | 3 | no |
| admin | loaded | 4882 | 7540 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T19:34:29.680Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3448 ms | 1793 ms | /د/س/ت/ر/س/ی/ /1/0/1/0/ /// /ر/و/ت/ر/ /7/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/0/6/m/s/×/1/ |
| /procurement/orders | 3674 ms | 1596 ms | /د/س/ت/ر/س/ی/ /1/0/9/0/ /// /ر/و/ت/ر/ /5/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/1/8/m/s/×/2/ |
| /procurement/needs | 3000 ms | 1468 ms | /د/س/ت/ر/س/ی/ /9/6/7/ /// /ر/و/ت/ر/ /5/0/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/4/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/9/m/s/×/1/ |
| /procurement/dashboard | 5024 ms | 3069 ms | /د/س/ت/ر/س/ی/ /1/7/8/2/ /// /ر/و/ت/ر/ /1/2/8/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/0/m/s/×/1/,/ /g/e/t/A/l/l/:/6/0/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/2/m/s/×/1/ |
| /procurement/workspace | 2312 ms | 1162 ms | /د/س/ت/ر/س/ی/ /8/1/5/ /// /ر/و/ت/ر/ /3/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/1/7/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
