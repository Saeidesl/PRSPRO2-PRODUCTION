# PMS UI and Performance Audit

- Generated: 2026-11-07T17:33:46.560Z
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
| networkRequestsMeasured | 319 |
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
| dashboard | loaded | 3479 | 6139 | 0 | 4 | 2 | no |
| projects | loaded | 4431 | 7088 | 0 | 1 | 2 | no |
| project-detail | loaded | 3432 | 6090 | 0 | 2 | 0 | no |
| print-design | loaded | 4421 | 7082 | 1 | 14 | 5 | no |
| print-output | loaded | 3436 | 6092 | 0 | 1 | 2 | no |
| events | loaded | 3925 | 6584 | 0 | 7 | 2 | no |
| workflows | loaded | 2439 | 5095 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3413 | 6071 | 0 | 1 | 1 | no |
| event-types | loaded | 3419 | 6084 | 0 | 58 | 1 | no |
| information-types | loaded | 2936 | 5595 | 0 | 1 | 1 | no |
| procurement | loaded | 3410 | 28797 | 0 | 9 | 0 | no |
| attachments | loaded | 2920 | 5578 | 0 | 1 | 2 | no |
| reports | loaded | 4452 | 7116 | 0 | 8 | 12 | no |
| users | loaded | 3924 | 6582 | 0 | 1 | 1 | no |
| departments | loaded | 2415 | 5073 | 0 | 8 | 1 | no |
| roles | loaded | 3405 | 6062 | 0 | 21 | 1 | no |
| permissions | loaded | 3409 | 6066 | 0 | 0 | 1 | no |
| audit | loaded | 3910 | 6566 | 0 | 1 | 1 | no |
| settings | loaded | 4494 | 7152 | 0 | 1 | 3 | no |
| admin | loaded | 3412 | 6068 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T17:36:23.519Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5044 ms | 3432 ms | /د/س/ت/ر/س/ی/ /1/6/8/5/ /// /ر/و/ت/ر/ /1/7/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/5/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/9/4/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/4/8/9/m/s/×/1/ |
| /procurement/orders | 4088 ms | 2535 ms | /د/س/ت/ر/س/ی/ /2/1/8/4/ /// /ر/و/ت/ر/ /3/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/3/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/6/0/6/m/s/×/1/ |
| /procurement/needs | 3647 ms | 2327 ms | /د/س/ت/ر/س/ی/ /1/5/6/0/ /// /ر/و/ت/ر/ /7/6/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/2/m/s/×/1/ |
| /procurement/dashboard | 4342 ms | 2925 ms | /د/س/ت/ر/س/ی/ /1/9/5/6/ /// /ر/و/ت/ر/ /9/6/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/9/3/m/s/×/1/ |
| /procurement/workspace | 4777 ms | 2963 ms | /د/س/ت/ر/س/ی/ /1/6/2/0/ /// /ر/و/ت/ر/ /1/3/4/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/6/2/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/7/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
