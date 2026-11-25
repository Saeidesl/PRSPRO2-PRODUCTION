# PMS UI and Performance Audit

- Generated: 2026-11-25T09:26:19.853Z
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
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 318 |
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
| dashboard | loaded | 4493 | 7152 | 0 | 4 | 2 | no |
| projects | loaded | 4930 | 7587 | 0 | 1 | 2 | no |
| project-detail | loaded | 2928 | 5586 | 0 | 2 | 0 | no |
| print-design | loaded | 3924 | 6586 | 1 | 17 | 7 | no |
| print-output | loaded | 4937 | 7595 | 0 | 2 | 6 | no |
| events | loaded | 3420 | 6076 | 0 | 5 | 2 | no |
| workflows | loaded | 3491 | 6146 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3418 | 6075 | 0 | 1 | 1 | no |
| event-types | loaded | 5421 | 8085 | 0 | 85 | 1 | no |
| information-types | loaded | 7927 | 10585 | 0 | 1 | 1 | no |
| procurement | loaded | 5419 | 28294 | 0 | 9 | 0 | no |
| attachments | loaded | 5437 | 8093 | 0 | 1 | 1 | no |
| reports | loaded | 2904 | 5566 | 0 | 8 | 12 | no |
| users | loaded | 3410 | 6067 | 0 | 1 | 1 | no |
| departments | loaded | 3919 | 6576 | 0 | 8 | 1 | no |
| roles | loaded | 5951 | 8608 | 0 | 1 | 1 | no |
| permissions | loaded | 3446 | 6103 | 0 | 0 | 1 | no |
| audit | loaded | 4414 | 7072 | 0 | 1 | 1 | no |
| settings | loaded | 4426 | 7081 | 0 | 1 | 3 | no |
| admin | loaded | 3414 | 6071 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T09:29:10.851Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3855 ms | 2705 ms | /د/س/ت/ر/س/ی/ /1/8/9/9/ /// /ر/و/ت/ر/ /8/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/4/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/1/5/m/s/×/2/ |
| /procurement/orders | 5310 ms | 3104 ms | /د/س/ت/ر/س/ی/ /2/2/3/6/ /// /ر/و/ت/ر/ /8/6/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/8/0/m/s/×/2/ |
| /procurement/needs | 3663 ms | 1962 ms | /د/س/ت/ر/س/ی/ /1/6/3/4/ /// /ر/و/ت/ر/ /3/2/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/3/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/8/0/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/7/8/m/s/×/1/ |
| /procurement/dashboard | 4606 ms | 3090 ms | /د/س/ت/ر/س/ی/ /2/2/0/6/ /// /ر/و/ت/ر/ /8/8/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/9/7/m/s/×/1/ |
| /procurement/workspace | 2737 ms | 1507 ms | /د/س/ت/ر/س/ی/ /1/0/1/7/ /// /ر/و/ت/ر/ /4/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/9/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
