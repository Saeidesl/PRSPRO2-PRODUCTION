# PMS UI and Performance Audit

- Generated: 2026-11-07T16:57:36.711Z
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
| visibleButtonsInventoried | 173 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 329 |
| procurementApiRequestsMeasured | 10 |
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
| dashboard | loaded | 3001 | 5660 | 0 | 4 | 2 | no |
| projects | loaded | 2920 | 5576 | 0 | 16 | 2 | no |
| project-detail | loaded | 3422 | 6078 | 0 | 2 | 0 | no |
| print-design | loaded | 2417 | 5077 | 1 | 14 | 5 | no |
| print-output | loaded | 2910 | 5569 | 0 | 1 | 2 | no |
| events | loaded | 2930 | 5587 | 0 | 7 | 2 | no |
| workflows | loaded | 3428 | 6083 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3418 | 6074 | 0 | 1 | 1 | no |
| event-types | loaded | 4939 | 7600 | 0 | 58 | 1 | no |
| information-types | loaded | 4446 | 7101 | 0 | 1 | 1 | no |
| procurement | loaded | 4412 | 27212 | 0 | 9 | 0 | no |
| attachments | loaded | 2941 | 5598 | 0 | 16 | 2 | no |
| reports | loaded | 2902 | 5564 | 0 | 8 | 12 | no |
| users | loaded | 4931 | 7586 | 0 | 1 | 1 | no |
| departments | loaded | 3409 | 6068 | 0 | 8 | 1 | no |
| roles | loaded | 3906 | 6564 | 0 | 21 | 1 | no |
| permissions | loaded | 3904 | 6561 | 0 | 0 | 1 | no |
| audit | loaded | 3407 | 6063 | 0 | 1 | 1 | no |
| settings | loaded | 2509 | 5169 | 0 | 1 | 3 | no |
| admin | loaded | 3929 | 6586 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T17:00:01.486Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3537 ms | 2035 ms | /د/س/ت/ر/س/ی/ /1/0/3/5/ /// /ر/و/ت/ر/ /1/0/0/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/0/m/s/×/1/ |
| /procurement/orders | 4240 ms | 2597 ms | /د/س/ت/ر/س/ی/ /1/7/6/4/ /// /ر/و/ت/ر/ /8/3/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/5/m/s/×/1/ |
| /procurement/needs | 3188 ms | 1583 ms | /د/س/ت/ر/س/ی/ /1/0/8/3/ /// /ر/و/ت/ر/ /5/0/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/3/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/4/m/s/×/1/ |
| /procurement/dashboard | 5114 ms | 3606 ms | /د/س/ت/ر/س/ی/ /2/4/7/8/ /// /ر/و/ت/ر/ /1/1/2/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/5/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/8/3/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/8/9/m/s/×/1/ |
| /procurement/workspace | 4014 ms | 2193 ms | /د/س/ت/ر/س/ی/ /1/2/9/4/ /// /ر/و/ت/ر/ /8/9/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/1/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
