# PMS UI and Performance Audit

- Generated: 2026-11-09T18:36:27.834Z
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
| visibleButtonsInventoried | 95 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 303 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 3962 | 6624 | 0 | 4 | 2 | no |
| projects | loaded | 4925 | 7583 | 0 | 1 | 2 | no |
| project-detail | loaded | 4922 | 7580 | 0 | 2 | 0 | no |
| print-design | loaded | 7935 | 10597 | 1 | 18 | 7 | no |
| print-output | loaded | 8101 | 10755 | 0 | 0 | 0 | no |
| events | loaded | 8100 | 10758 | 0 | 7 | 2 | no |
| workflows | loaded | 3937 | 6593 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2904 | 5559 | 0 | 1 | 1 | no |
| event-types | loaded | 3407 | 6065 | 0 | 1 | 1 | no |
| information-types | loaded | 3913 | 6572 | 0 | 1 | 1 | no |
| procurement | loaded | 4445 | 28795 | 0 | 9 | 0 | no |
| attachments | loaded | 3930 | 6586 | 0 | 1 | 2 | no |
| reports | loaded | 4412 | 7074 | 0 | 8 | 12 | no |
| users | loaded | 4438 | 7095 | 0 | 27 | 1 | no |
| departments | loaded | 3910 | 6568 | 0 | 8 | 1 | no |
| roles | loaded | 3949 | 6607 | 0 | 1 | 1 | no |
| permissions | loaded | 4911 | 7569 | 0 | 0 | 1 | no |
| audit | loaded | 3406 | 6065 | 0 | 1 | 1 | no |
| settings | loaded | 3414 | 6070 | 0 | 1 | 3 | no |
| admin | loaded | 4921 | 7578 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T18:39:19.135Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3426 ms | 2107 ms | /د/س/ت/ر/س/ی/ /1/1/8/0/ /// /ر/و/ت/ر/ /9/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/3/m/s/×/1/ |
| /procurement/orders | 4830 ms | 1643 ms | /د/س/ت/ر/س/ی/ /1/1/6/8/ /// /ر/و/ت/ر/ /4/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/3/7/m/s/×/2/ |
| /procurement/needs | 4647 ms | 2968 ms | /د/س/ت/ر/س/ی/ /2/0/1/5/ /// /ر/و/ت/ر/ /9/5/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/7/m/s/×/1/ |
| /procurement/dashboard | 3753 ms | 1824 ms | /د/س/ت/ر/س/ی/ /1/2/7/6/ /// /ر/و/ت/ر/ /5/4/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/4/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/3/m/s/×/1/ |
| /procurement/workspace | 4190 ms | 1787 ms | /د/س/ت/ر/س/ی/ /1/1/9/5/ /// /ر/و/ت/ر/ /5/9/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/4/2/m/s/×/2/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
