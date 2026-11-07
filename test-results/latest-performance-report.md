# PMS UI and Performance Audit

- Generated: 2026-11-07T17:25:33.237Z
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
| visibleButtonsInventoried | 143 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 307 |
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
| dashboard | loaded | 4981 | 7642 | 0 | 4 | 2 | no |
| projects | loaded | 3924 | 6581 | 0 | 1 | 2 | no |
| project-detail | loaded | 3431 | 6089 | 0 | 2 | 0 | no |
| print-design | loaded | 3919 | 6580 | 1 | 14 | 5 | no |
| print-output | loaded | 5420 | 8077 | 0 | 1 | 2 | no |
| events | loaded | 3452 | 6110 | 0 | 7 | 2 | no |
| workflows | loaded | 3435 | 6091 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4418 | 7076 | 0 | 1 | 1 | no |
| event-types | loaded | 4507 | 7170 | 0 | 58 | 1 | no |
| information-types | loaded | 3929 | 6587 | 0 | 1 | 1 | no |
| procurement | loaded | 3414 | 27012 | 0 | 9 | 0 | no |
| attachments | loaded | 3418 | 6076 | 0 | 1 | 2 | no |
| reports | loaded | 4946 | 7609 | 0 | 8 | 12 | no |
| users | loaded | 3936 | 6592 | 0 | 1 | 1 | no |
| departments | loaded | 4414 | 7073 | 0 | 8 | 1 | no |
| roles | loaded | 3402 | 6067 | 0 | 21 | 1 | no |
| permissions | loaded | 3912 | 6568 | 0 | 0 | 1 | no |
| audit | loaded | 3401 | 6059 | 0 | 1 | 1 | no |
| settings | loaded | 3919 | 6577 | 0 | 1 | 3 | no |
| admin | loaded | 2912 | 5568 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T17:28:16.309Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5715 ms | 4126 ms | /د/س/ت/ر/س/ی/ /2/2/4/1/ /// /ر/و/ت/ر/ /1/8/8/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/6/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/3/m/s/×/1/ |
| /procurement/orders | 4246 ms | 2648 ms | /د/س/ت/ر/س/ی/ /1/6/2/5/ /// /ر/و/ت/ر/ /1/0/2/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/9/7/m/s/×/1/ |
| /procurement/needs | 2861 ms | 975 ms | /د/س/ت/ر/س/ی/ /7/3/7/ /// /ر/و/ت/ر/ /2/3/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/5/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/5/1/m/s/×/2/ |
| /procurement/dashboard | 4713 ms | 3067 ms | /د/س/ت/ر/س/ی/ /2/1/9/1/ /// /ر/و/ت/ر/ /8/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/2/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/8/4/m/s/×/1/ |
| /procurement/workspace | 3376 ms | 1794 ms | /د/س/ت/ر/س/ی/ /1/1/9/9/ /// /ر/و/ت/ر/ /5/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
