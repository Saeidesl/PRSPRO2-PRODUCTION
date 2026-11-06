# PMS UI and Performance Audit

- Generated: 2026-11-06T20:18:31.885Z
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
| visibleButtonsInventoried | 145 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 300 |
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
| dashboard | loaded | 4990 | 7651 | 0 | 4 | 2 | no |
| projects | loaded | 3926 | 6583 | 0 | 1 | 2 | no |
| project-detail | loaded | 3941 | 6599 | 0 | 2 | 0 | no |
| print-design | loaded | 3916 | 6577 | 1 | 14 | 5 | no |
| print-output | loaded | 4419 | 7077 | 0 | 1 | 2 | no |
| events | loaded | 3934 | 6591 | 0 | 7 | 2 | no |
| workflows | loaded | 3927 | 6585 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2905 | 5564 | 0 | 1 | 1 | no |
| event-types | loaded | 3908 | 6573 | 0 | 58 | 1 | no |
| information-types | loaded | 3915 | 6574 | 0 | 1 | 1 | no |
| procurement | loaded | 3938 | 31811 | 0 | 9 | 0 | no |
| attachments | loaded | 4942 | 7599 | 0 | 1 | 2 | no |
| reports | loaded | 2411 | 5073 | 0 | 8 | 12 | no |
| users | loaded | 4413 | 7072 | 0 | 23 | 1 | no |
| departments | loaded | 5414 | 8072 | 0 | 8 | 1 | no |
| roles | loaded | 3420 | 6077 | 0 | 1 | 1 | no |
| permissions | loaded | 3941 | 6599 | 0 | 0 | 1 | no |
| audit | loaded | 3411 | 6066 | 0 | 1 | 1 | no |
| settings | loaded | 3949 | 6607 | 0 | 1 | 3 | no |
| admin | loaded | 4932 | 7588 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-06T20:21:13.761Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6012 ms | 4451 ms | /د/س/ت/ر/س/ی/ /2/5/3/3/ /// /ر/و/ت/ر/ /1/9/1/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/6/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/9/2/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/8/1/m/s/×/1/ |
| /procurement/orders | 4879 ms | 3110 ms | /د/س/ت/ر/س/ی/ /2/0/1/3/ /// /ر/و/ت/ر/ /1/0/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/4/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/2/0/m/s/×/1/ |
| /procurement/needs | 5057 ms | 2294 ms | /د/س/ت/ر/س/ی/ /1/5/1/9/ /// /ر/و/ت/ر/ /7/7/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/6/m/s/×/1/ |
| /procurement/dashboard | 3945 ms | 2333 ms | /د/س/ت/ر/س/ی/ /1/6/4/3/ /// /ر/و/ت/ر/ /6/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/1/m/s/×/1/ |
| /procurement/workspace | 4486 ms | 2353 ms | /د/س/ت/ر/س/ی/ /1/7/1/1/ /// /ر/و/ت/ر/ /6/4/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
