# PMS UI and Performance Audit

- Generated: 2026-11-25T12:13:26.548Z
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
| visibleFormsInventoried | 13 |
| dynamicFormsInventoried | 12 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 194 |
| visibleInputsAndControlsInventoried | 45 |
| networkRequestsMeasured | 352 |
| procurementApiRequestsMeasured | 10 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 8117 | 10775 | 0 | 0 | 0 | no |
| projects | loaded | 4388 | 7046 | 0 | 1 | 2 | no |
| project-detail | loaded | 3886 | 6541 | 0 | 2 | 0 | no |
| print-design | loaded | 3393 | 6051 | 1 | 17 | 7 | no |
| print-output | loaded | 2379 | 5036 | 0 | 2 | 6 | no |
| events | loaded | 3885 | 6539 | 0 | 5 | 2 | no |
| workflows | loaded | 3426 | 6083 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2884 | 5541 | 0 | 1 | 1 | no |
| event-types | loaded | 6391 | 9054 | 0 | 85 | 1 | no |
| information-types | loaded | 3370 | 6026 | 0 | 1 | 1 | no |
| procurement | loaded | 4374 | 26980 | 0 | 9 | 0 | no |
| attachments | loaded | 4398 | 7056 | 0 | 1 | 1 | no |
| reports | loaded | 4373 | 7034 | 0 | 8 | 12 | no |
| users | loaded | 3380 | 6035 | 0 | 27 | 1 | no |
| departments | loaded | 2894 | 5552 | 0 | 8 | 1 | no |
| roles | loaded | 3901 | 6560 | 0 | 21 | 1 | no |
| permissions | loaded | 2925 | 5579 | 0 | 0 | 1 | no |
| audit | loaded | 5390 | 8045 | 0 | 1 | 1 | no |
| settings | loaded | 3885 | 6542 | 0 | 1 | 3 | no |
| admin | loaded | 2888 | 5541 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T12:16:03.492Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5371 ms | 3691 ms | /د/س/ت/ر/س/ی/ /2/2/8/7/ /// /ر/و/ت/ر/ /1/4/0/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/9/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/5/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/3/m/s/×/1/ |
| /procurement/orders | 3040 ms | 1343 ms | /د/س/ت/ر/س/ی/ /9/5/3/ /// /ر/و/ت/ر/ /3/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/7/6/m/s/×/1/ |
| /procurement/needs | 3671 ms | 1904 ms | /د/س/ت/ر/س/ی/ /1/4/2/9/ /// /ر/و/ت/ر/ /4/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/2/m/s/×/1/ |
| /procurement/dashboard | 3906 ms | 2139 ms | /د/س/ت/ر/س/ی/ /1/6/7/3/ /// /ر/و/ت/ر/ /4/6/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/5/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/5/7/m/s/×/1/ |
| /procurement/workspace | 3155 ms | 2118 ms | /د/س/ت/ر/س/ی/ /1/7/4/5/ /// /ر/و/ت/ر/ /3/7/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/7/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
