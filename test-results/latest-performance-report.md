# PMS UI and Performance Audit

- Generated: 2026-11-06T20:43:28.594Z
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
| dashboard | loaded | 3441 | 6102 | 0 | 4 | 2 | no |
| projects | loaded | 3432 | 6089 | 0 | 1 | 2 | no |
| project-detail | loaded | 5935 | 8591 | 0 | 2 | 0 | no |
| print-design | loaded | 4427 | 7088 | 1 | 14 | 5 | no |
| print-output | loaded | 4423 | 7081 | 0 | 1 | 2 | no |
| events | loaded | 3421 | 6080 | 0 | 7 | 2 | no |
| workflows | loaded | 3431 | 6091 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4444 | 7102 | 0 | 1 | 1 | no |
| event-types | loaded | 3925 | 6586 | 0 | 58 | 1 | no |
| information-types | loaded | 3914 | 6570 | 0 | 1 | 1 | no |
| procurement | loaded | 3941 | 28310 | 0 | 9 | 0 | no |
| attachments | loaded | 2940 | 5597 | 0 | 1 | 2 | no |
| reports | loaded | 3919 | 6583 | 0 | 8 | 12 | no |
| users | loaded | 4927 | 7586 | 0 | 1 | 1 | no |
| departments | loaded | 4952 | 7607 | 0 | 8 | 1 | no |
| roles | loaded | 2917 | 5580 | 0 | 21 | 1 | no |
| permissions | loaded | 3910 | 6568 | 0 | 0 | 1 | no |
| audit | loaded | 3945 | 6601 | 0 | 1 | 1 | no |
| settings | loaded | 3414 | 6070 | 0 | 1 | 3 | no |
| admin | loaded | 3433 | 6089 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-06T20:46:10.906Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3756 ms | 2292 ms | /د/س/ت/ر/س/ی/ /1/3/0/2/ /// /ر/و/ت/ر/ /9/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/3/m/s/×/1/ |
| /procurement/orders | 4243 ms | 2789 ms | /د/س/ت/ر/س/ی/ /1/7/1/0/ /// /ر/و/ت/ر/ /1/0/7/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/5/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/9/m/s/×/1/ |
| /procurement/needs | 3838 ms | 2316 ms | /د/س/ت/ر/س/ی/ /1/5/2/7/ /// /ر/و/ت/ر/ /7/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/9/m/s/×/1/ |
| /procurement/dashboard | 4865 ms | 3017 ms | /د/س/ت/ر/س/ی/ /1/7/6/2/ /// /ر/و/ت/ر/ /1/2/5/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/3/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/8/m/s/×/1/ |
| /procurement/workspace | 3683 ms | 2128 ms | /د/س/ت/ر/س/ی/ /1/5/1/2/ /// /ر/و/ت/ر/ /6/1/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
