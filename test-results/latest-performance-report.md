# PMS UI and Performance Audit

- Generated: 2026-11-17T17:43:45.983Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 338 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 5463 | 8121 | 0 | 4 | 2 | no |
| projects | loaded | 3408 | 6066 | 0 | 1 | 2 | no |
| project-detail | loaded | 3403 | 6061 | 0 | 2 | 0 | no |
| print-design | loaded | 4410 | 7070 | 1 | 17 | 7 | no |
| print-output | loaded | 3408 | 6066 | 0 | 2 | 6 | no |
| events | loaded | 3911 | 6566 | 0 | 5 | 2 | no |
| workflows | loaded | 3446 | 6103 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4905 | 7562 | 0 | 1 | 1 | no |
| event-types | loaded | 5941 | 8604 | 0 | 85 | 1 | no |
| information-types | loaded | 3907 | 6565 | 0 | 1 | 1 | no |
| procurement | loaded | 2917 | 28578 | 0 | 9 | 0 | no |
| attachments | loaded | 3401 | 6059 | 0 | 1 | 1 | no |
| reports | loaded | 3393 | 6055 | 0 | 8 | 12 | no |
| users | loaded | 3936 | 6594 | 0 | 27 | 1 | no |
| departments | loaded | 4402 | 7060 | 0 | 8 | 1 | no |
| roles | loaded | 5415 | 8070 | 0 | 1 | 1 | no |
| permissions | loaded | 3900 | 6557 | 0 | 0 | 1 | no |
| audit | loaded | 6912 | 9568 | 0 | 1 | 1 | no |
| settings | loaded | 4409 | 7067 | 0 | 1 | 3 | no |
| admin | loaded | 4410 | 7066 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T17:46:30.015Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4085 ms | 2906 ms | /د/س/ت/ر/س/ی/ /1/3/0/2/ /// /ر/و/ت/ر/ /1/6/0/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/2/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/6/m/s/×/1/ |
| /procurement/orders | 3460 ms | 1690 ms | /د/س/ت/ر/س/ی/ /1/2/5/8/ /// /ر/و/ت/ر/ /4/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/2/0/m/s/×/1/ |
| /procurement/needs | 4841 ms | 3221 ms | /د/س/ت/ر/س/ی/ /1/8/9/7/ /// /ر/و/ت/ر/ /1/3/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/0/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/4/8/m/s/×/1/ |
| /procurement/dashboard | 4202 ms | 2755 ms | /د/س/ت/ر/س/ی/ /1/9/3/4/ /// /ر/و/ت/ر/ /8/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/0/m/s/×/1/ |
| /procurement/workspace | 5092 ms | 3624 ms | /د/س/ت/ر/س/ی/ /2/7/4/3/ /// /ر/و/ت/ر/ /8/8/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/8/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/9/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
