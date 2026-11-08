# PMS UI and Performance Audit

- Generated: 2026-11-08T13:40:23.024Z
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
| visibleButtonsInventoried | 378 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 356 |
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
| dashboard | loaded | 3909 | 6569 | 0 | 4 | 2 | no |
| projects | loaded | 3905 | 6563 | 0 | 1 | 2 | no |
| project-detail | loaded | 2887 | 5545 | 0 | 2 | 0 | no |
| print-design | loaded | 5403 | 8063 | 1 | 14 | 6 | no |
| print-output | loaded | 2886 | 5544 | 0 | 2 | 6 | no |
| events | loaded | 3388 | 6047 | 0 | 7 | 2 | no |
| workflows | loaded | 3977 | 6635 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3393 | 6050 | 0 | 1 | 1 | no |
| event-types | loaded | 2901 | 5563 | 0 | 58 | 1 | no |
| information-types | loaded | 3388 | 6060 | 0 | 136 | 1 | no |
| procurement | loaded | 3388 | 26963 | 0 | 9 | 0 | no |
| attachments | loaded | 4383 | 7040 | 0 | 1 | 2 | no |
| reports | loaded | 4886 | 7547 | 0 | 8 | 12 | no |
| users | loaded | 3388 | 6046 | 0 | 1 | 1 | no |
| departments | loaded | 4395 | 7053 | 0 | 8 | 1 | no |
| roles | loaded | 3380 | 6037 | 0 | 1 | 1 | no |
| permissions | loaded | 3386 | 6041 | 0 | 0 | 1 | no |
| audit | loaded | 2908 | 5566 | 0 | 1 | 1 | no |
| settings | loaded | 3394 | 6051 | 0 | 1 | 3 | no |
| admin | loaded | 3402 | 6065 | 0 | 122 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T13:42:58.194Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4858 ms | 3471 ms | /د/س/ت/ر/س/ی/ /2/0/9/4/ /// /ر/و/ت/ر/ /1/3/7/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/4/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/7/m/s/×/1/ |
| /procurement/orders | 3088 ms | 1939 ms | /د/س/ت/ر/س/ی/ /1/4/1/0/ /// /ر/و/ت/ر/ /5/2/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/6/m/s/×/1/ |
| /procurement/needs | 4871 ms | 3123 ms | /د/س/ت/ر/س/ی/ /2/1/3/0/ /// /ر/و/ت/ر/ /9/9/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/4/5/m/s/×/1/ |
| /procurement/dashboard | 2817 ms | 1525 ms | /د/س/ت/ر/س/ی/ /1/0/4/6/ /// /ر/و/ت/ر/ /4/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/0/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/0/6/m/s/×/2/ |
| /procurement/workspace | 5074 ms | 2016 ms | /د/س/ت/ر/س/ی/ /1/4/4/3/ /// /ر/و/ت/ر/ /5/7/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
