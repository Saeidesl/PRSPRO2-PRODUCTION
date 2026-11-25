# PMS UI and Performance Audit

- Generated: 2026-11-25T18:15:59.129Z
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
| networkRequestsMeasured | 374 |
| procurementApiRequestsMeasured | 10 |
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
| dashboard | loaded | 3901 | 6561 | 0 | 4 | 2 | no |
| projects | loaded | 3890 | 6548 | 0 | 1 | 2 | no |
| project-detail | loaded | 4395 | 7053 | 0 | 2 | 0 | no |
| print-design | loaded | 2882 | 5541 | 1 | 17 | 7 | no |
| print-output | loaded | 3392 | 6051 | 0 | 2 | 6 | no |
| events | loaded | 3387 | 6042 | 0 | 5 | 2 | no |
| workflows | loaded | 2390 | 5048 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3380 | 6036 | 0 | 9 | 1 | no |
| event-types | loaded | 3378 | 6040 | 0 | 85 | 1 | no |
| information-types | loaded | 4384 | 7040 | 0 | 1 | 1 | no |
| procurement | loaded | 3876 | 23729 | 0 | 9 | 0 | no |
| attachments | loaded | 3887 | 6546 | 0 | 1 | 1 | no |
| reports | loaded | 5894 | 8554 | 0 | 8 | 12 | no |
| users | loaded | 2403 | 5058 | 0 | 1 | 1 | no |
| departments | loaded | 2876 | 5433 | 0 | 8 | 1 | no |
| roles | loaded | 3379 | 6037 | 0 | 1 | 1 | no |
| permissions | loaded | 4886 | 7544 | 0 | 0 | 1 | no |
| audit | loaded | 3381 | 6037 | 0 | 1 | 1 | no |
| settings | loaded | 3457 | 6111 | 0 | 1 | 3 | no |
| admin | loaded | 2880 | 5536 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T18:18:22.641Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 2384 ms | 1187 ms | /د/س/ت/ر/س/ی/ /6/7/2/ /// /ر/و/ت/ر/ /5/1/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/4/1/m/s/×/1/ |
| /procurement/orders | 3536 ms | 2028 ms | /د/س/ت/ر/س/ی/ /1/6/5/6/ /// /ر/و/ت/ر/ /3/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/8/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/1/m/s/×/1/ |
| /procurement/needs | 2816 ms | 1123 ms | /د/س/ت/ر/س/ی/ /6/0/1/ /// /ر/و/ت/ر/ /5/2/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/3/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/3/0/m/s/×/1/ |
| /procurement/dashboard | 4356 ms | 2771 ms | /د/س/ت/ر/س/ی/ /1/6/3/7/ /// /ر/و/ت/ر/ /1/1/3/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/2/m/s/×/1/ |
| /procurement/workspace | 3885 ms | 1938 ms | /د/س/ت/ر/س/ی/ /1/4/2/9/ /// /ر/و/ت/ر/ /5/0/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/4/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
