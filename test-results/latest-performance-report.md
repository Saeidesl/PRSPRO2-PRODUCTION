# PMS UI and Performance Audit

- Generated: 2026-11-12T15:29:36.174Z
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
| visibleButtonsInventoried | 154 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 320 |
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
| dashboard | loaded | 4492 | 7153 | 0 | 4 | 2 | no |
| projects | loaded | 3971 | 6630 | 0 | 1 | 2 | no |
| project-detail | loaded | 3943 | 6600 | 0 | 2 | 0 | no |
| print-design | loaded | 3434 | 6096 | 1 | 17 | 7 | no |
| print-output | loaded | 4940 | 7598 | 0 | 2 | 6 | no |
| events | loaded | 4456 | 7113 | 0 | 7 | 2 | no |
| workflows | loaded | 3952 | 6610 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4453 | 7109 | 0 | 1 | 1 | no |
| event-types | loaded | 3917 | 6582 | 0 | 85 | 1 | no |
| information-types | loaded | 3437 | 6096 | 0 | 1 | 1 | no |
| procurement | loaded | 5924 | 30145 | 0 | 9 | 0 | no |
| attachments | loaded | 3419 | 6078 | 0 | 1 | 1 | no |
| reports | loaded | 5949 | 8609 | 0 | 8 | 12 | no |
| users | loaded | 3927 | 6585 | 0 | 1 | 1 | no |
| departments | loaded | 4461 | 7117 | 0 | 8 | 1 | no |
| roles | loaded | 3410 | 6068 | 0 | 1 | 1 | no |
| permissions | loaded | 4412 | 7068 | 0 | 0 | 1 | no |
| audit | loaded | 5471 | 8128 | 0 | 1 | 1 | no |
| settings | loaded | 4470 | 7125 | 0 | 1 | 3 | no |
| admin | loaded | 4920 | 7578 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T15:32:22.965Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4330 ms | 2745 ms | /د/س/ت/ر/س/ی/ /1/4/4/9/ /// /ر/و/ت/ر/ /1/2/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/7/7/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/7/4/m/s/×/1/ |
| /procurement/orders | 3700 ms | 1613 ms | /د/س/ت/ر/س/ی/ /1/1/0/5/ /// /ر/و/ت/ر/ /5/0/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/6/m/s/×/1/ |
| /procurement/needs | 3592 ms | 1852 ms | /د/س/ت/ر/س/ی/ /1/3/2/8/ /// /ر/و/ت/ر/ /5/2/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/8/m/s/×/1/ |
| /procurement/dashboard | 3407 ms | 2278 ms | /د/س/ت/ر/س/ی/ /1/6/2/4/ /// /ر/و/ت/ر/ /6/5/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/2/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/1/2/m/s/×/1/ |
| /procurement/workspace | 5203 ms | 3403 ms | /د/س/ت/ر/س/ی/ /2/5/5/3/ /// /ر/و/ت/ر/ /8/4/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/0/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
