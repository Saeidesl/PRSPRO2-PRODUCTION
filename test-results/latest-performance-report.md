# PMS UI and Performance Audit

- Generated: 2026-11-09T19:10:44.407Z
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
| visibleButtonsInventoried | 154 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 346 |
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
| dashboard | loaded | 3005 | 5665 | 0 | 4 | 2 | no |
| projects | loaded | 3425 | 6084 | 0 | 1 | 2 | no |
| project-detail | loaded | 4416 | 7074 | 0 | 2 | 0 | no |
| print-design | loaded | 3406 | 6066 | 1 | 17 | 7 | no |
| print-output | loaded | 3911 | 6569 | 0 | 2 | 6 | no |
| events | loaded | 5437 | 8095 | 0 | 7 | 2 | no |
| workflows | loaded | 3915 | 6571 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4913 | 7572 | 0 | 1 | 1 | no |
| event-types | loaded | 4437 | 7104 | 0 | 85 | 1 | no |
| information-types | loaded | 4401 | 7059 | 0 | 1 | 1 | no |
| procurement | loaded | 4907 | 30713 | 0 | 9 | 0 | no |
| attachments | loaded | 3409 | 6068 | 0 | 1 | 2 | no |
| reports | loaded | 4423 | 7084 | 0 | 8 | 12 | no |
| users | loaded | 2902 | 5560 | 0 | 1 | 1 | no |
| departments | loaded | 3899 | 6556 | 0 | 8 | 1 | no |
| roles | loaded | 5909 | 8565 | 0 | 1 | 1 | no |
| permissions | loaded | 3958 | 6615 | 0 | 0 | 1 | no |
| audit | loaded | 2898 | 5556 | 0 | 1 | 1 | no |
| settings | loaded | 4408 | 7066 | 0 | 1 | 3 | no |
| admin | loaded | 3409 | 6067 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T19:13:33.929Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3323 ms | 2023 ms | /د/س/ت/ر/س/ی/ /1/1/5/0/ /// /ر/و/ت/ر/ /8/7/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/4/m/s/×/1/ |
| /procurement/orders | 4590 ms | 2987 ms | /د/س/ت/ر/س/ی/ /2/0/6/6/ /// /ر/و/ت/ر/ /9/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/0/m/s/×/1/ |
| /procurement/needs | 4532 ms | 3093 ms | /د/س/ت/ر/س/ی/ /2/1/1/5/ /// /ر/و/ت/ر/ /9/7/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/6/4/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/5/5/m/s/×/1/ |
| /procurement/dashboard | 4076 ms | 2397 ms | /د/س/ت/ر/س/ی/ /1/5/5/8/ /// /ر/و/ت/ر/ /8/3/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/3/m/s/×/1/ |
| /procurement/workspace | 3805 ms | 2330 ms | /د/س/ت/ر/س/ی/ /1/6/3/5/ /// /ر/و/ت/ر/ /6/9/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/3/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/9/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/2/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
