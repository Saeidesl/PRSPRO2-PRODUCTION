# PMS UI and Performance Audit

- Generated: 2026-11-12T10:17:55.656Z
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
| visibleButtonsInventoried | 186 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 361 |
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
| dashboard | loaded | 4443 | 7103 | 0 | 4 | 2 | no |
| projects | loaded | 3402 | 6059 | 0 | 1 | 2 | no |
| project-detail | loaded | 3391 | 6048 | 0 | 2 | 0 | no |
| print-design | loaded | 4391 | 7051 | 1 | 17 | 7 | no |
| print-output | loaded | 2887 | 5541 | 0 | 2 | 6 | no |
| events | loaded | 3403 | 6060 | 0 | 7 | 2 | no |
| workflows | loaded | 3907 | 6563 | 0 | 13 | 2 | no |
| project-statuses | loaded | 3885 | 6541 | 0 | 1 | 1 | no |
| event-types | loaded | 2878 | 5542 | 0 | 85 | 1 | no |
| information-types | loaded | 3386 | 6043 | 0 | 1 | 1 | no |
| procurement | loaded | 3882 | 25712 | 0 | 9 | 0 | no |
| attachments | loaded | 4417 | 7075 | 0 | 1 | 2 | no |
| reports | loaded | 3402 | 6064 | 0 | 8 | 12 | no |
| users | loaded | 3890 | 6545 | 0 | 1 | 1 | no |
| departments | loaded | 4411 | 7067 | 0 | 8 | 1 | no |
| roles | loaded | 4392 | 7049 | 0 | 21 | 1 | no |
| permissions | loaded | 3412 | 6068 | 0 | 0 | 1 | no |
| audit | loaded | 3923 | 6578 | 0 | 1 | 1 | no |
| settings | loaded | 4395 | 7051 | 0 | 1 | 3 | no |
| admin | loaded | 2881 | 5538 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T10:20:27.491Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3494 ms | 2023 ms | /د/س/ت/ر/س/ی/ /1/2/0/0/ /// /ر/و/ت/ر/ /8/2/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/5/0/m/s/×/1/ |
| /procurement/orders | 3799 ms | 1918 ms | /د/س/ت/ر/س/ی/ /1/4/6/3/ /// /ر/و/ت/ر/ /4/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/1/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/1/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/1/3/m/s/×/1/ |
| /procurement/needs | 2524 ms | 1046 ms | /د/س/ت/ر/س/ی/ /7/1/4/ /// /ر/و/ت/ر/ /3/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/5/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/3/9/m/s/×/1/ |
| /procurement/dashboard | 4148 ms | 2222 ms | /د/س/ت/ر/س/ی/ /1/7/0/9/ /// /ر/و/ت/ر/ /5/1/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/9/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/5/6/m/s/×/1/ |
| /procurement/workspace | 3391 ms | 1793 ms | /د/س/ت/ر/س/ی/ /8/8/9/ /// /ر/و/ت/ر/ /9/0/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/0/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
