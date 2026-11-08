# PMS UI and Performance Audit

- Generated: 2026-11-08T16:49:32.822Z
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
| visibleButtonsInventoried | 277 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 351 |
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
| dashboard | loaded | 4009 | 6671 | 0 | 4 | 2 | no |
| projects | loaded | 3443 | 6102 | 0 | 1 | 2 | no |
| project-detail | loaded | 4939 | 7595 | 0 | 2 | 0 | no |
| print-design | loaded | 3428 | 6089 | 1 | 15 | 6 | no |
| print-output | loaded | 3922 | 6580 | 0 | 2 | 6 | no |
| events | loaded | 4459 | 7118 | 0 | 7 | 2 | no |
| workflows | loaded | 3491 | 6151 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3427 | 6084 | 0 | 1 | 1 | no |
| event-types | loaded | 3959 | 6621 | 0 | 58 | 1 | no |
| information-types | loaded | 2943 | 5600 | 0 | 1 | 1 | no |
| procurement | loaded | 3448 | 25044 | 0 | 9 | 0 | no |
| attachments | loaded | 3934 | 6592 | 0 | 1 | 2 | no |
| reports | loaded | 4449 | 7113 | 0 | 8 | 12 | no |
| users | loaded | 4448 | 7106 | 0 | 1 | 1 | no |
| departments | loaded | 3929 | 6586 | 0 | 8 | 1 | no |
| roles | loaded | 6457 | 9116 | 0 | 21 | 1 | no |
| permissions | loaded | 3452 | 6112 | 0 | 0 | 1 | no |
| audit | loaded | 3927 | 6585 | 0 | 1 | 1 | no |
| settings | loaded | 3433 | 6090 | 0 | 1 | 3 | no |
| admin | loaded | 3919 | 6590 | 0 | 135 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T16:52:10.157Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3817 ms | 2441 ms | /د/س/ت/ر/س/ی/ /1/3/3/7/ /// /ر/و/ت/ر/ /1/1/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/6/m/s/×/1/ |
| /procurement/orders | 3288 ms | 1894 ms | /د/س/ت/ر/س/ی/ /1/3/3/3/ /// /ر/و/ت/ر/ /5/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/3/m/s/×/1/ |
| /procurement/needs | 3429 ms | 2151 ms | /د/س/ت/ر/س/ی/ /1/1/7/2/ /// /ر/و/ت/ر/ /9/7/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/3/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/0/m/s/×/1/ |
| /procurement/dashboard | 3043 ms | 1782 ms | /د/س/ت/ر/س/ی/ /1/2/4/9/ /// /ر/و/ت/ر/ /5/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/9/m/s/×/1/ |
| /procurement/workspace | 3523 ms | 1901 ms | /د/س/ت/ر/س/ی/ /1/2/7/0/ /// /ر/و/ت/ر/ /6/3/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
