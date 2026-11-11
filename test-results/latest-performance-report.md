# PMS UI and Performance Audit

- Generated: 2026-11-11T08:27:18.366Z
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
| visibleButtonsInventoried | 404 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 333 |
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
| dashboard | loaded | 2980 | 5640 | 0 | 4 | 2 | no |
| projects | loaded | 4950 | 7608 | 0 | 1 | 2 | no |
| project-detail | loaded | 3937 | 6596 | 0 | 2 | 0 | no |
| print-design | loaded | 4937 | 7600 | 1 | 17 | 7 | no |
| print-output | loaded | 4431 | 7086 | 0 | 2 | 6 | no |
| events | loaded | 4950 | 7609 | 0 | 7 | 2 | no |
| workflows | loaded | 4966 | 7625 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2920 | 5576 | 0 | 1 | 1 | no |
| event-types | loaded | 3445 | 6113 | 0 | 85 | 1 | no |
| information-types | loaded | 4936 | 7595 | 0 | 1 | 1 | no |
| procurement | loaded | 4482 | 28478 | 0 | 9 | 0 | no |
| attachments | loaded | 3939 | 6598 | 0 | 1 | 2 | no |
| reports | loaded | 4495 | 7156 | 0 | 8 | 12 | no |
| users | loaded | 4927 | 7583 | 0 | 1 | 1 | no |
| departments | loaded | 3417 | 6077 | 0 | 8 | 1 | no |
| roles | loaded | 2946 | 5604 | 0 | 1 | 1 | no |
| permissions | loaded | 3912 | 6570 | 0 | 0 | 1 | no |
| audit | loaded | 2420 | 5076 | 0 | 1 | 1 | no |
| settings | loaded | 3917 | 6575 | 0 | 1 | 3 | no |
| admin | loaded | 4427 | 7151 | 0 | 253 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T08:29:59.575Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3894 ms | 2126 ms | /د/س/ت/ر/س/ی/ /1/2/8/9/ /// /ر/و/ت/ر/ /8/3/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/3/8/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/0/m/s/×/1/ |
| /procurement/orders | 3972 ms | 2178 ms | /د/س/ت/ر/س/ی/ /1/5/8/7/ /// /ر/و/ت/ر/ /5/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/6/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/6/7/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/6/3/m/s/×/1/ |
| /procurement/needs | 5229 ms | 3285 ms | /د/س/ت/ر/س/ی/ /2/4/5/2/ /// /ر/و/ت/ر/ /8/3/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/2/8/m/s/×/1/,/ /g/e/t/A/l/l/:/7/0/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/0/m/s/×/1/ |
| /procurement/dashboard | 4647 ms | 2454 ms | /د/س/ت/ر/س/ی/ /1/7/1/3/ /// /ر/و/ت/ر/ /7/4/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/0/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/6/m/s/×/1/ |
| /procurement/workspace | 3478 ms | 2150 ms | /د/س/ت/ر/س/ی/ /1/6/4/2/ /// /ر/و/ت/ر/ /5/0/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/8/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/1/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/8/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
