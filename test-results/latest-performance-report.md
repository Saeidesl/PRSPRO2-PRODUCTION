# PMS UI and Performance Audit

- Generated: 2026-11-09T07:25:18.350Z
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
| visibleButtonsInventoried | 133 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 366 |
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
| dashboard | loaded | 5001 | 7662 | 0 | 4 | 2 | no |
| projects | loaded | 3477 | 6133 | 0 | 1 | 2 | no |
| project-detail | loaded | 3944 | 6600 | 0 | 2 | 0 | no |
| print-design | loaded | 3416 | 6075 | 1 | 15 | 6 | no |
| print-output | loaded | 2923 | 5581 | 0 | 2 | 6 | no |
| events | loaded | 3421 | 6077 | 0 | 7 | 2 | no |
| workflows | loaded | 3946 | 6602 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4422 | 7078 | 0 | 9 | 1 | no |
| event-types | loaded | 3408 | 6072 | 0 | 58 | 1 | no |
| information-types | loaded | 3955 | 6612 | 0 | 1 | 1 | no |
| procurement | loaded | 3417 | 24378 | 0 | 9 | 0 | no |
| attachments | loaded | 3417 | 6072 | 0 | 1 | 2 | no |
| reports | loaded | 3935 | 6596 | 0 | 8 | 12 | no |
| users | loaded | 3914 | 6571 | 0 | 1 | 1 | no |
| departments | loaded | 3409 | 6068 | 0 | 8 | 1 | no |
| roles | loaded | 3447 | 6104 | 0 | 1 | 1 | no |
| permissions | loaded | 4417 | 7074 | 0 | 0 | 1 | no |
| audit | loaded | 2903 | 5560 | 0 | 1 | 1 | no |
| settings | loaded | 3921 | 6577 | 0 | 1 | 3 | no |
| admin | loaded | 3429 | 6088 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T07:27:54.494Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3427 ms | 2312 ms | /د/س/ت/ر/س/ی/ /1/4/1/7/ /// /ر/و/ت/ر/ /8/9/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/7/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/0/m/s/×/1/ |
| /procurement/orders | 3161 ms | 1752 ms | /د/س/ت/ر/س/ی/ /1/2/5/4/ /// /ر/و/ت/ر/ /4/9/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/2/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/3/2/m/s/×/1/ |
| /procurement/needs | 3291 ms | 1882 ms | /د/س/ت/ر/س/ی/ /1/3/0/6/ /// /ر/و/ت/ر/ /5/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/1/m/s/×/1/ |
| /procurement/dashboard | 3498 ms | 2047 ms | /د/س/ت/ر/س/ی/ /1/5/4/8/ /// /ر/و/ت/ر/ /4/9/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/6/9/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/6/8/9/m/s/×/1/ |
| /procurement/workspace | 3588 ms | 2456 ms | /د/س/ت/ر/س/ی/ /1/6/5/3/ /// /ر/و/ت/ر/ /8/0/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
