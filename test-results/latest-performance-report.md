# PMS UI and Performance Audit

- Generated: 2026-11-12T08:40:42.591Z
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
| visibleButtonsInventoried | 174 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 331 |
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
| dashboard | loaded | 4447 | 7109 | 0 | 4 | 2 | no |
| projects | loaded | 3427 | 6085 | 0 | 1 | 2 | no |
| project-detail | loaded | 3922 | 6579 | 0 | 2 | 0 | no |
| print-design | loaded | 3929 | 6589 | 1 | 17 | 7 | no |
| print-output | loaded | 2922 | 5580 | 0 | 2 | 6 | no |
| events | loaded | 3922 | 6581 | 0 | 7 | 2 | no |
| workflows | loaded | 2448 | 5106 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2938 | 5592 | 0 | 1 | 1 | no |
| event-types | loaded | 4419 | 7084 | 0 | 85 | 1 | no |
| information-types | loaded | 4919 | 7577 | 0 | 1 | 1 | no |
| procurement | loaded | 2932 | 29729 | 0 | 9 | 0 | no |
| attachments | loaded | 3419 | 6077 | 0 | 1 | 2 | no |
| reports | loaded | 4439 | 7102 | 0 | 8 | 12 | no |
| users | loaded | 4414 | 7071 | 0 | 1 | 1 | no |
| departments | loaded | 4451 | 7107 | 0 | 8 | 1 | no |
| roles | loaded | 5453 | 8113 | 0 | 21 | 1 | no |
| permissions | loaded | 3438 | 6097 | 0 | 0 | 1 | no |
| audit | loaded | 5423 | 8080 | 0 | 1 | 1 | no |
| settings | loaded | 4926 | 7584 | 0 | 1 | 3 | no |
| admin | loaded | 4422 | 7081 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T08:43:21.734Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4049 ms | 2701 ms | /د/س/ت/ر/س/ی/ /1/1/9/1/ /// /ر/و/ت/ر/ /1/5/1/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/2/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/8/m/s/×/1/ |
| /procurement/orders | 5857 ms | 4189 ms | /د/س/ت/ر/س/ی/ /3/0/7/8/ /// /ر/و/ت/ر/ /1/1/1/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/8/5/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/1/4/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/6/m/s/×/1/ |
| /procurement/needs | 3495 ms | 2261 ms | /د/س/ت/ر/س/ی/ /1/5/8/0/ /// /ر/و/ت/ر/ /6/8/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/3/m/s/×/1/ |
| /procurement/dashboard | 4509 ms | 2647 ms | /د/س/ت/ر/س/ی/ /1/9/9/2/ /// /ر/و/ت/ر/ /6/5/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/8/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/9/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/5/m/s/×/1/ |
| /procurement/workspace | 4910 ms | 3186 ms | /د/س/ت/ر/س/ی/ /1/6/8/3/ /// /ر/و/ت/ر/ /1/5/0/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/5/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
