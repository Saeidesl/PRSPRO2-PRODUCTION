# PMS UI and Performance Audit

- Generated: 2026-11-12T21:08:05.023Z
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
| visibleButtonsInventoried | 164 |
| visibleInputsAndControlsInventoried | 46 |
| networkRequestsMeasured | 342 |
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
| dashboard | loaded | 3943 | 6604 | 0 | 4 | 2 | no |
| projects | loaded | 4401 | 7060 | 0 | 1 | 2 | no |
| project-detail | loaded | 7912 | 10571 | 0 | 2 | 0 | no |
| print-design | loaded | 3403 | 6068 | 1 | 17 | 7 | no |
| print-output | loaded | 3405 | 6062 | 0 | 2 | 6 | no |
| events | loaded | 3394 | 6048 | 0 | 5 | 2 | no |
| workflows | loaded | 3924 | 6581 | 0 | 13 | 2 | no |
| project-statuses | loaded | 6904 | 9560 | 0 | 1 | 1 | no |
| event-types | loaded | 4388 | 7051 | 0 | 85 | 1 | no |
| information-types | loaded | 3888 | 6545 | 0 | 1 | 1 | no |
| procurement | loaded | 4392 | 27913 | 0 | 9 | 0 | no |
| attachments | loaded | 3390 | 6047 | 0 | 1 | 1 | no |
| reports | loaded | 3381 | 6042 | 0 | 8 | 12 | no |
| users | loaded | 3384 | 6037 | 0 | 1 | 1 | no |
| departments | loaded | 6905 | 9561 | 0 | 8 | 1 | no |
| roles | loaded | 4387 | 7045 | 0 | 1 | 1 | no |
| permissions | loaded | 8077 | 10732 | 0 | 0 | 0 | no |
| audit | loaded | 4391 | 7048 | 0 | 1 | 1 | no |
| settings | loaded | 4898 | 7555 | 0 | 1 | 3 | no |
| admin | loaded | 3401 | 6058 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T21:10:53.103Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5449 ms | 3707 ms | /د/س/ت/ر/س/ی/ /2/0/7/1/ /// /ر/و/ت/ر/ /1/6/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/8/7/m/s/×/1/,/ /g/e/t/A/l/l/:/6/0/5/m/s/×/1/,/ /g/e/t/A/l/l/:/5/7/4/m/s/×/1/ |
| /procurement/orders | 3258 ms | 1678 ms | /د/س/ت/ر/س/ی/ /1/1/5/6/ /// /ر/و/ت/ر/ /5/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/5/m/s/×/1/ |
| /procurement/needs | 3796 ms | 2272 ms | /د/س/ت/ر/س/ی/ /1/7/9/0/ /// /ر/و/ت/ر/ /4/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/3/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/4/m/s/×/1/ |
| /procurement/dashboard | 3536 ms | 1968 ms | /د/س/ت/ر/س/ی/ /1/3/2/2/ /// /ر/و/ت/ر/ /6/4/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/7/m/s/×/1/ |
| /procurement/workspace | 3002 ms | 1644 ms | /د/س/ت/ر/س/ی/ /1/1/7/6/ /// /ر/و/ت/ر/ /4/6/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
