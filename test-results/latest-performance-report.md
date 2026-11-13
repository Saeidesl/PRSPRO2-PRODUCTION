# PMS UI and Performance Audit

- Generated: 2026-11-13T17:55:46.152Z
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
| networkRequestsMeasured | 332 |
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
| dashboard | loaded | 3923 | 6583 | 0 | 4 | 2 | no |
| projects | loaded | 3894 | 6552 | 0 | 1 | 2 | no |
| project-detail | loaded | 3892 | 6549 | 0 | 2 | 0 | no |
| print-design | loaded | 3885 | 6545 | 1 | 17 | 7 | no |
| print-output | loaded | 8078 | 10733 | 0 | 2 | 6 | no |
| events | loaded | 3396 | 6053 | 0 | 5 | 2 | no |
| workflows | loaded | 4396 | 7054 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3377 | 6034 | 0 | 1 | 1 | no |
| event-types | loaded | 3875 | 6535 | 0 | 85 | 1 | no |
| information-types | loaded | 3883 | 6540 | 0 | 1 | 1 | no |
| procurement | loaded | 2868 | 26446 | 0 | 9 | 0 | no |
| attachments | loaded | 8073 | 10729 | 0 | 1 | 1 | no |
| reports | loaded | 3364 | 6025 | 0 | 8 | 12 | no |
| users | loaded | 4379 | 7036 | 0 | 27 | 1 | no |
| departments | loaded | 4372 | 7030 | 0 | 8 | 1 | no |
| roles | loaded | 3368 | 6025 | 0 | 1 | 1 | no |
| permissions | loaded | 5375 | 8032 | 0 | 0 | 1 | no |
| audit | loaded | 3373 | 6030 | 0 | 1 | 1 | no |
| settings | loaded | 4892 | 7548 | 0 | 1 | 3 | no |
| admin | loaded | 3874 | 6531 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T17:58:30.276Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4798 ms | 3310 ms | /د/س/ت/ر/س/ی/ /1/7/8/5/ /// /ر/و/ت/ر/ /1/5/2/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/1/m/s/×/1/ |
| /procurement/orders | 4570 ms | 3462 ms | /د/س/ت/ر/س/ی/ /1/9/4/6/ /// /ر/و/ت/ر/ /1/5/1/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/1/m/s/×/1/ |
| /procurement/needs | 3761 ms | 2586 ms | /د/س/ت/ر/س/ی/ /2/1/0/0/ /// /ر/و/ت/ر/ /4/8/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/9/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/4/m/s/×/1/ |
| /procurement/dashboard | 3524 ms | 1993 ms | /د/س/ت/ر/س/ی/ /1/4/2/0/ /// /ر/و/ت/ر/ /5/7/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/7/8/m/s/×/1/ |
| /procurement/workspace | 4042 ms | 2592 ms | /د/س/ت/ر/س/ی/ /1/7/9/6/ /// /ر/و/ت/ر/ /7/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
