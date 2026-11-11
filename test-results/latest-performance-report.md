# PMS UI and Performance Audit

- Generated: 2026-11-11T20:01:44.206Z
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
| visibleButtonsInventoried | 182 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 341 |
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
| dashboard | loaded | 6458 | 9117 | 0 | 4 | 2 | no |
| projects | loaded | 4393 | 7051 | 0 | 1 | 2 | no |
| project-detail | loaded | 6904 | 9560 | 0 | 2 | 0 | no |
| print-design | loaded | 3387 | 6044 | 1 | 17 | 7 | no |
| print-output | loaded | 2896 | 5553 | 0 | 2 | 6 | no |
| events | loaded | 2885 | 5542 | 0 | 7 | 2 | no |
| workflows | loaded | 3410 | 6067 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3385 | 6041 | 0 | 9 | 1 | no |
| event-types | loaded | 4403 | 7064 | 0 | 85 | 1 | no |
| information-types | loaded | 2884 | 5542 | 0 | 1 | 1 | no |
| procurement | loaded | 4398 | 27694 | 0 | 9 | 0 | no |
| attachments | loaded | 2898 | 5556 | 0 | 1 | 2 | no |
| reports | loaded | 4390 | 7051 | 0 | 8 | 12 | no |
| users | loaded | 3384 | 6038 | 0 | 1 | 1 | no |
| departments | loaded | 4387 | 7046 | 0 | 8 | 1 | no |
| roles | loaded | 3385 | 6041 | 0 | 21 | 1 | no |
| permissions | loaded | 3917 | 6575 | 0 | 0 | 1 | no |
| audit | loaded | 3392 | 6050 | 0 | 1 | 1 | no |
| settings | loaded | 3890 | 6548 | 0 | 1 | 3 | no |
| admin | loaded | 4393 | 7057 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T20:04:23.056Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6299 ms | 3787 ms | /د/س/ت/ر/س/ی/ /2/3/5/9/ /// /ر/و/ت/ر/ /1/4/2/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/7/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/4/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/1/4/m/s/×/1/ |
| /procurement/orders | 3484 ms | 1791 ms | /د/س/ت/ر/س/ی/ /1/3/3/7/ /// /ر/و/ت/ر/ /4/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/5/m/s/×/1/ |
| /procurement/needs | 3239 ms | 1929 ms | /د/س/ت/ر/س/ی/ /1/4/5/8/ /// /ر/و/ت/ر/ /4/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/0/m/s/×/1/ |
| /procurement/dashboard | 4368 ms | 2869 ms | /د/س/ت/ر/س/ی/ /1/9/6/6/ /// /ر/و/ت/ر/ /9/0/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/4/m/s/×/1/ |
| /procurement/workspace | 3202 ms | 1776 ms | /د/س/ت/ر/س/ی/ /1/1/9/5/ /// /ر/و/ت/ر/ /5/8/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/1/0/m/s/×/2/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
