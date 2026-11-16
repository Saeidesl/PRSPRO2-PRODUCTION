# PMS UI and Performance Audit

- Generated: 2026-11-16T19:07:30.542Z
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
| visibleButtonsInventoried | 198 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 360 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 3993 | 6655 | 0 | 4 | 2 | no |
| projects | loaded | 3429 | 6086 | 0 | 1 | 2 | no |
| project-detail | loaded | 4950 | 7608 | 0 | 2 | 0 | no |
| print-design | loaded | 3927 | 6587 | 1 | 17 | 7 | no |
| print-output | loaded | 2925 | 5582 | 0 | 2 | 6 | no |
| events | loaded | 2421 | 5080 | 0 | 5 | 2 | no |
| workflows | loaded | 3463 | 6121 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4930 | 7585 | 0 | 1 | 1 | no |
| event-types | loaded | 3424 | 6089 | 0 | 85 | 1 | no |
| information-types | loaded | 2919 | 5576 | 0 | 1 | 1 | no |
| procurement | loaded | 3445 | 25663 | 0 | 9 | 0 | no |
| attachments | loaded | 3437 | 6095 | 0 | 1 | 1 | no |
| reports | loaded | 4460 | 7124 | 0 | 8 | 12 | no |
| users | loaded | 3918 | 6577 | 0 | 27 | 1 | no |
| departments | loaded | 4945 | 7601 | 0 | 8 | 1 | no |
| roles | loaded | 2429 | 5087 | 0 | 21 | 1 | no |
| permissions | loaded | 2918 | 5576 | 0 | 0 | 1 | no |
| audit | loaded | 2415 | 5074 | 0 | 1 | 1 | no |
| settings | loaded | 3960 | 6619 | 0 | 1 | 3 | no |
| admin | loaded | 2944 | 5599 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-16T19:10:05.244Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5382 ms | 3713 ms | /د/س/ت/ر/س/ی/ /2/7/2/8/ /// /ر/و/ت/ر/ /9/8/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/7/4/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/2/2/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/2/1/9/m/s/×/1/ |
| /procurement/orders | 3784 ms | 2743 ms | /د/س/ت/ر/س/ی/ /2/2/8/5/ /// /ر/و/ت/ر/ /4/5/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/7/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/7/8/m/s/×/1/ |
| /procurement/needs | 4125 ms | 2839 ms | /د/س/ت/ر/س/ی/ /2/0/4/3/ /// /ر/و/ت/ر/ /7/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/5/3/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/9/m/s/×/1/ |
| /procurement/dashboard | 3562 ms | 1866 ms | /د/س/ت/ر/س/ی/ /1/2/2/2/ /// /ر/و/ت/ر/ /6/4/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/5/m/s/×/1/ |
| /procurement/workspace | 2659 ms | 1746 ms | /د/س/ت/ر/س/ی/ /1/2/0/8/ /// /ر/و/ت/ر/ /5/3/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
