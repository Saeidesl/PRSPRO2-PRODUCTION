# PMS UI and Performance Audit

- Generated: 2026-11-12T20:30:38.595Z
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
| visibleButtonsInventoried | 181 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 326 |
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
| dashboard | loaded | 3902 | 6562 | 0 | 4 | 2 | no |
| projects | loaded | 4886 | 7542 | 0 | 1 | 2 | no |
| project-detail | loaded | 7892 | 10549 | 0 | 2 | 0 | no |
| print-design | loaded | 3882 | 6542 | 1 | 17 | 7 | no |
| print-output | loaded | 4885 | 7540 | 0 | 2 | 6 | no |
| events | loaded | 3872 | 6529 | 0 | 8 | 2 | no |
| workflows | loaded | 8121 | 10776 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4410 | 7067 | 0 | 1 | 1 | no |
| event-types | loaded | 5376 | 8040 | 0 | 85 | 1 | no |
| information-types | loaded | 3877 | 6534 | 0 | 1 | 1 | no |
| procurement | loaded | 5877 | 32313 | 0 | 9 | 0 | no |
| attachments | loaded | 6885 | 9541 | 0 | 1 | 1 | no |
| reports | loaded | 4396 | 7056 | 0 | 8 | 12 | no |
| users | loaded | 4378 | 7036 | 0 | 27 | 1 | no |
| departments | loaded | 3364 | 6018 | 0 | 8 | 1 | no |
| roles | loaded | 3387 | 6045 | 0 | 1 | 1 | no |
| permissions | loaded | 3363 | 6021 | 0 | 0 | 1 | no |
| audit | loaded | 5884 | 8538 | 0 | 1 | 1 | no |
| settings | loaded | 3881 | 6537 | 0 | 1 | 3 | no |
| admin | loaded | 7420 | 10078 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T20:33:44.504Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4425 ms | 2273 ms | /د/س/ت/ر/س/ی/ /1/3/4/9/ /// /ر/و/ت/ر/ /9/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/8/6/m/s/×/1/ |
| /procurement/orders | 5641 ms | 4037 ms | /د/س/ت/ر/س/ی/ /1/8/9/6/ /// /ر/و/ت/ر/ /2/1/3/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/4/1/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/1/m/s/×/1/ |
| /procurement/needs | 4712 ms | 2440 ms | /د/س/ت/ر/س/ی/ /1/5/7/8/ /// /ر/و/ت/ر/ /8/6/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/4/m/s/×/1/ |
| /procurement/dashboard | 4516 ms | 2463 ms | /د/س/ت/ر/س/ی/ /1/9/8/2/ /// /ر/و/ت/ر/ /4/8/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/7/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/3/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/4/1/m/s/×/1/ |
| /procurement/workspace | 4282 ms | 2006 ms | /د/س/ت/ر/س/ی/ /1/0/3/6/ /// /ر/و/ت/ر/ /9/7/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/6/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
