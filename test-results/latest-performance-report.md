# PMS UI and Performance Audit

- Generated: 2026-11-08T18:03:49.045Z
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
| visibleButtonsInventoried | 466 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 412 |
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
| dashboard | loaded | 2951 | 5608 | 0 | 4 | 2 | no |
| projects | loaded | 4396 | 7052 | 0 | 19 | 2 | no |
| project-detail | loaded | 3389 | 6043 | 0 | 2 | 0 | no |
| print-design | loaded | 2870 | 5530 | 1 | 15 | 6 | no |
| print-output | loaded | 3885 | 6543 | 0 | 2 | 6 | no |
| events | loaded | 2882 | 5538 | 0 | 7 | 2 | no |
| workflows | loaded | 2900 | 5556 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5895 | 8550 | 0 | 1 | 1 | no |
| event-types | loaded | 2869 | 5528 | 0 | 58 | 1 | no |
| information-types | loaded | 3379 | 6040 | 0 | 136 | 1 | no |
| procurement | loaded | 2952 | 22409 | 0 | 9 | 0 | no |
| attachments | loaded | 2880 | 5537 | 0 | 1 | 2 | no |
| reports | loaded | 3369 | 6027 | 0 | 8 | 12 | no |
| users | loaded | 2871 | 5527 | 0 | 27 | 1 | no |
| departments | loaded | 2863 | 5518 | 0 | 8 | 1 | no |
| roles | loaded | 4377 | 7033 | 0 | 21 | 1 | no |
| permissions | loaded | 2867 | 5522 | 0 | 0 | 1 | no |
| audit | loaded | 2865 | 5520 | 0 | 1 | 1 | no |
| settings | loaded | 3413 | 6067 | 0 | 1 | 3 | no |
| admin | loaded | 2871 | 5537 | 0 | 145 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T18:06:09.402Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3537 ms | 2435 ms | /د/س/ت/ر/س/ی/ /1/4/1/5/ /// /ر/و/ت/ر/ /1/0/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/7/m/s/×/1/ |
| /procurement/orders | 4112 ms | 2320 ms | /د/س/ت/ر/س/ی/ /1/2/7/4/ /// /ر/و/ت/ر/ /1/0/4/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/7/m/s/×/1/ |
| /procurement/needs | 2947 ms | 1575 ms | /د/س/ت/ر/س/ی/ /1/1/2/1/ /// /ر/و/ت/ر/ /4/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/2/m/s/×/1/ |
| /procurement/dashboard | 3260 ms | 1679 ms | /د/س/ت/ر/س/ی/ /1/0/4/8/ /// /ر/و/ت/ر/ /6/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/3/m/s/×/1/ |
| /procurement/workspace | 2913 ms | 1696 ms | /د/س/ت/ر/س/ی/ /1/1/8/0/ /// /ر/و/ت/ر/ /5/1/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/3/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
