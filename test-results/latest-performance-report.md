# PMS UI and Performance Audit

- Generated: 2026-11-09T17:51:30.442Z
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
| visibleButtonsInventoried | 180 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 364 |
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
| dashboard | loaded | 2912 | 5570 | 0 | 4 | 2 | no |
| projects | loaded | 3388 | 6046 | 0 | 1 | 2 | no |
| project-detail | loaded | 2892 | 5548 | 0 | 2 | 0 | no |
| print-design | loaded | 2902 | 5564 | 1 | 17 | 7 | no |
| print-output | loaded | 3384 | 6041 | 0 | 2 | 6 | no |
| events | loaded | 3889 | 6544 | 0 | 7 | 2 | no |
| workflows | loaded | 8097 | 10754 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2873 | 5528 | 0 | 1 | 1 | no |
| event-types | loaded | 2379 | 5042 | 0 | 85 | 1 | no |
| information-types | loaded | 3370 | 6027 | 0 | 1 | 1 | no |
| procurement | loaded | 3871 | 27613 | 0 | 9 | 0 | no |
| attachments | loaded | 4880 | 7536 | 0 | 1 | 2 | no |
| reports | loaded | 4400 | 7060 | 0 | 8 | 12 | no |
| users | loaded | 3875 | 6534 | 0 | 27 | 1 | no |
| departments | loaded | 2867 | 5525 | 0 | 8 | 1 | no |
| roles | loaded | 2887 | 5542 | 0 | 1 | 1 | no |
| permissions | loaded | 3874 | 6531 | 0 | 0 | 1 | no |
| audit | loaded | 4370 | 7027 | 0 | 1 | 1 | no |
| settings | loaded | 3375 | 6030 | 0 | 1 | 3 | no |
| admin | loaded | 3379 | 6045 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T17:54:05.090Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4533 ms | 2726 ms | /د/س/ت/ر/س/ی/ /1/6/6/9/ /// /ر/و/ت/ر/ /1/0/5/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/2/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/2/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/1/m/s/×/1/ |
| /procurement/orders | 3350 ms | 1881 ms | /د/س/ت/ر/س/ی/ /9/4/3/ /// /ر/و/ت/ر/ /9/3/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/1/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/3/m/s/×/1/ |
| /procurement/needs | 3900 ms | 1993 ms | /د/س/ت/ر/س/ی/ /1/4/4/3/ /// /ر/و/ت/ر/ /5/4/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/6/5/m/s/×/1/ |
| /procurement/dashboard | 3750 ms | 2563 ms | /د/س/ت/ر/س/ی/ /1/7/2/9/ /// /ر/و/ت/ر/ /8/3/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/4/m/s/×/1/ |
| /procurement/workspace | 3738 ms | 2056 ms | /د/س/ت/ر/س/ی/ /1/6/5/6/ /// /ر/و/ت/ر/ /3/9/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/0/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
