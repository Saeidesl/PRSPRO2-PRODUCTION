# PMS UI and Performance Audit

- Generated: 2026-11-13T18:30:02.302Z
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
| networkRequestsMeasured | 318 |
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
| dashboard | loaded | 4908 | 7569 | 0 | 4 | 2 | no |
| projects | loaded | 5409 | 8065 | 0 | 1 | 2 | no |
| project-detail | loaded | 4397 | 7055 | 0 | 2 | 0 | no |
| print-design | loaded | 6903 | 9562 | 1 | 17 | 7 | no |
| print-output | loaded | 3903 | 6558 | 0 | 2 | 6 | no |
| events | loaded | 4395 | 7053 | 0 | 5 | 2 | no |
| workflows | loaded | 4406 | 7062 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3891 | 6546 | 0 | 9 | 1 | no |
| event-types | loaded | 4386 | 7051 | 0 | 85 | 1 | no |
| information-types | loaded | 3885 | 6543 | 0 | 1 | 1 | no |
| procurement | loaded | 3883 | 29094 | 0 | 9 | 0 | no |
| attachments | loaded | 4397 | 7053 | 0 | 1 | 1 | no |
| reports | loaded | 4392 | 7053 | 0 | 8 | 12 | no |
| users | loaded | 3904 | 6561 | 0 | 1 | 1 | no |
| departments | loaded | 4382 | 7037 | 0 | 8 | 1 | no |
| roles | loaded | 4385 | 7042 | 0 | 1 | 1 | no |
| permissions | loaded | 4886 | 7544 | 0 | 0 | 1 | no |
| audit | loaded | 3885 | 6542 | 0 | 1 | 1 | no |
| settings | loaded | 3882 | 6538 | 0 | 1 | 3 | no |
| admin | loaded | 5394 | 8052 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T18:32:58.901Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4525 ms | 3309 ms | /د/س/ت/ر/س/ی/ /1/9/8/5/ /// /ر/و/ت/ر/ /1/3/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/7/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/9/3/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/9/2/m/s/×/1/ |
| /procurement/orders | 5190 ms | 3897 ms | /د/س/ت/ر/س/ی/ /2/3/8/2/ /// /ر/و/ت/ر/ /1/5/1/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/3/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/9/9/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/7/5/m/s/×/2/ |
| /procurement/needs | 2515 ms | 1469 ms | /د/س/ت/ر/س/ی/ /1/0/1/9/ /// /ر/و/ت/ر/ /4/5/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/8/m/s/×/1/ |
| /procurement/dashboard | 3539 ms | 2174 ms | /د/س/ت/ر/س/ی/ /1/5/1/3/ /// /ر/و/ت/ر/ /6/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/7/m/s/×/1/ |
| /procurement/workspace | 4964 ms | 3478 ms | /د/س/ت/ر/س/ی/ /2/9/2/8/ /// /ر/و/ت/ر/ /5/5/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/0/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/1/5/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/9/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
