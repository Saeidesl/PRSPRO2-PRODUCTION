# PMS UI and Performance Audit

- Generated: 2026-11-13T09:33:03.203Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 336 |
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
| dashboard | loaded | 5052 | 7712 | 0 | 4 | 2 | no |
| projects | loaded | 3925 | 6583 | 0 | 1 | 2 | no |
| project-detail | loaded | 3920 | 6577 | 0 | 2 | 0 | no |
| print-design | loaded | 4420 | 7079 | 1 | 17 | 7 | no |
| print-output | loaded | 5433 | 8091 | 0 | 2 | 6 | no |
| events | loaded | 3921 | 6579 | 0 | 5 | 2 | no |
| workflows | loaded | 3940 | 6597 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3938 | 6595 | 0 | 1 | 1 | no |
| event-types | loaded | 5418 | 8083 | 0 | 85 | 1 | no |
| information-types | loaded | 4423 | 7082 | 0 | 1 | 1 | no |
| procurement | loaded | 3409 | 29479 | 0 | 9 | 0 | no |
| attachments | loaded | 4443 | 7101 | 0 | 1 | 1 | no |
| reports | loaded | 5476 | 8140 | 0 | 8 | 12 | no |
| users | loaded | 4921 | 7587 | 0 | 27 | 1 | no |
| departments | loaded | 4441 | 7098 | 0 | 8 | 1 | no |
| roles | loaded | 6925 | 9580 | 0 | 1 | 1 | no |
| permissions | loaded | 3436 | 6092 | 0 | 0 | 1 | no |
| audit | loaded | 3412 | 6067 | 0 | 1 | 1 | no |
| settings | loaded | 5931 | 8586 | 0 | 1 | 3 | no |
| admin | loaded | 3916 | 6574 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T09:35:48.979Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5143 ms | 3495 ms | /د/س/ت/ر/س/ی/ /1/9/3/4/ /// /ر/و/ت/ر/ /1/5/6/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/6/7/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/4/8/m/s/×/1/ |
| /procurement/orders | 4081 ms | 2920 ms | /د/س/ت/ر/س/ی/ /1/7/0/2/ /// /ر/و/ت/ر/ /1/2/1/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/6/4/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/7/m/s/×/1/ |
| /procurement/needs | 4784 ms | 3561 ms | /د/س/ت/ر/س/ی/ /2/2/2/2/ /// /ر/و/ت/ر/ /1/3/3/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/7/4/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/7/0/m/s/×/1/ |
| /procurement/dashboard | 4706 ms | 3185 ms | /د/س/ت/ر/س/ی/ /2/2/1/4/ /// /ر/و/ت/ر/ /9/7/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/0/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/9/1/0/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/9/0/6/m/s/×/1/ |
| /procurement/workspace | 3377 ms | 1838 ms | /د/س/ت/ر/س/ی/ /1/3/1/2/ /// /ر/و/ت/ر/ /5/2/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/7/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
