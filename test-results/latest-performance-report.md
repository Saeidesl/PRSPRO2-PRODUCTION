# PMS UI and Performance Audit

- Generated: 2026-11-09T16:09:14.566Z
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
| visibleFormsInventoried | 11 |
| dynamicFormsInventoried | 10 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 321 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 4439 | 7097 | 0 | 4 | 2 | no |
| projects | loaded | 4894 | 7551 | 0 | 1 | 2 | no |
| project-detail | loaded | 3384 | 6042 | 0 | 2 | 0 | no |
| print-design | loaded | 3890 | 6550 | 1 | 15 | 6 | no |
| print-output | loaded | 3886 | 6543 | 0 | 2 | 6 | no |
| events | loaded | 3379 | 6036 | 0 | 7 | 2 | no |
| workflows | loaded | 2869 | 5526 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4871 | 7528 | 0 | 1 | 1 | no |
| event-types | loaded | 3378 | 6041 | 0 | 85 | 1 | no |
| information-types | loaded | 2887 | 5544 | 0 | 1 | 1 | no |
| procurement | loaded | 3870 | 33047 | 0 | 9 | 0 | no |
| attachments | loaded | 3377 | 6034 | 0 | 1 | 2 | no |
| reports | loaded | 2924 | 5585 | 0 | 8 | 12 | no |
| users | loaded | 3909 | 6564 | 0 | 1 | 1 | no |
| departments | loaded | 3908 | 6565 | 0 | 8 | 1 | no |
| roles | loaded | 3374 | 6031 | 0 | 1 | 1 | no |
| permissions | loaded | 3400 | 6054 | 0 | 0 | 1 | no |
| audit | loaded | 3402 | 6059 | 0 | 1 | 1 | no |
| settings | loaded | 4882 | 7536 | 0 | 1 | 3 | no |
| admin | loaded | 4369 | 7025 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T16:11:58.464Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5846 ms | 3642 ms | /د/س/ت/ر/س/ی/ /1/9/1/4/ /// /ر/و/ت/ر/ /1/7/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/5/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/9/m/s/×/1/ |
| /procurement/orders | 3161 ms | 1691 ms | /د/س/ت/ر/س/ی/ /1/2/7/9/ /// /ر/و/ت/ر/ /4/1/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/4/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/3/9/m/s/×/1/ |
| /procurement/needs | 4914 ms | 3055 ms | /د/س/ت/ر/س/ی/ /2/1/4/2/ /// /ر/و/ت/ر/ /9/1/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/1/m/s/×/1/ |
| /procurement/dashboard | 5466 ms | 3588 ms | /د/س/ت/ر/س/ی/ /2/6/3/2/ /// /ر/و/ت/ر/ /9/5/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/8/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/3/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/1/3/m/s/×/1/ |
| /procurement/workspace | 5813 ms | 2501 ms | /د/س/ت/ر/س/ی/ /2/0/2/1/ /// /ر/و/ت/ر/ /4/8/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
