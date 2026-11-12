# PMS UI and Performance Audit

- Generated: 2026-11-12T21:23:09.086Z
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
| networkRequestsMeasured | 353 |
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
| dashboard | loaded | 2928 | 5587 | 0 | 4 | 2 | no |
| projects | loaded | 4459 | 7117 | 0 | 1 | 2 | no |
| project-detail | loaded | 5911 | 8566 | 0 | 2 | 0 | no |
| print-design | loaded | 2886 | 5547 | 1 | 17 | 7 | no |
| print-output | loaded | 3389 | 6046 | 0 | 2 | 6 | no |
| events | loaded | 4413 | 7069 | 0 | 5 | 2 | no |
| workflows | loaded | 3405 | 6062 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3384 | 6042 | 0 | 1 | 1 | no |
| event-types | loaded | 4902 | 7569 | 0 | 85 | 1 | no |
| information-types | loaded | 3891 | 6549 | 0 | 1 | 1 | no |
| procurement | loaded | 3404 | 27196 | 0 | 9 | 0 | no |
| attachments | loaded | 3393 | 6049 | 0 | 1 | 1 | no |
| reports | loaded | 4388 | 7049 | 0 | 8 | 12 | no |
| users | loaded | 3386 | 6045 | 0 | 27 | 1 | no |
| departments | loaded | 2878 | 5534 | 0 | 8 | 1 | no |
| roles | loaded | 3384 | 6040 | 0 | 1 | 1 | no |
| permissions | loaded | 2876 | 5534 | 0 | 0 | 1 | no |
| audit | loaded | 2882 | 5539 | 0 | 1 | 1 | no |
| settings | loaded | 3388 | 6043 | 0 | 1 | 3 | no |
| admin | loaded | 2410 | 5065 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T21:25:47.960Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5811 ms | 3320 ms | /د/س/ت/ر/س/ی/ /1/4/4/5/ /// /ر/و/ت/ر/ /1/8/7/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/1/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/8/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/0/m/s/×/1/ |
| /procurement/orders | 3684 ms | 2528 ms | /د/س/ت/ر/س/ی/ /1/9/4/2/ /// /ر/و/ت/ر/ /5/8/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/2/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/9/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/3/4/m/s/×/1/ |
| /procurement/needs | 3634 ms | 2450 ms | /د/س/ت/ر/س/ی/ /1/3/5/8/ /// /ر/و/ت/ر/ /1/0/9/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/7/m/s/×/1/ |
| /procurement/dashboard | 3854 ms | 2646 ms | /د/س/ت/ر/س/ی/ /1/2/3/7/ /// /ر/و/ت/ر/ /1/4/0/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/7/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/ |
| /procurement/workspace | 2834 ms | 1859 ms | /د/س/ت/ر/س/ی/ /1/2/8/2/ /// /ر/و/ت/ر/ /5/7/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
