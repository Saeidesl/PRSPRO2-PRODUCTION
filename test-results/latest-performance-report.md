# PMS UI and Performance Audit

- Generated: 2026-11-11T18:29:00.780Z
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
| visibleButtonsInventoried | 154 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 354 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 2929 | 5589 | 0 | 4 | 2 | no |
| projects | loaded | 2885 | 5539 | 0 | 1 | 2 | no |
| project-detail | loaded | 3383 | 6041 | 0 | 2 | 0 | no |
| print-design | loaded | 3385 | 6045 | 1 | 17 | 7 | no |
| print-output | loaded | 2884 | 5538 | 0 | 2 | 6 | no |
| events | loaded | 5901 | 8557 | 0 | 7 | 2 | no |
| workflows | loaded | 4419 | 7074 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3880 | 6536 | 0 | 1 | 1 | no |
| event-types | loaded | 3375 | 6037 | 0 | 85 | 1 | no |
| information-types | loaded | 4888 | 7545 | 0 | 1 | 1 | no |
| procurement | loaded | 4406 | 31763 | 0 | 9 | 0 | no |
| attachments | loaded | 3889 | 6546 | 0 | 1 | 2 | no |
| reports | loaded | 3879 | 6538 | 0 | 8 | 12 | no |
| users | loaded | 2884 | 5541 | 0 | 1 | 1 | no |
| departments | loaded | 4885 | 7543 | 0 | 8 | 1 | no |
| roles | loaded | 3908 | 6565 | 0 | 1 | 1 | no |
| permissions | loaded | 4380 | 7034 | 0 | 0 | 1 | no |
| audit | loaded | 4413 | 7070 | 0 | 1 | 1 | no |
| settings | loaded | 3895 | 6553 | 0 | 1 | 3 | no |
| admin | loaded | 3886 | 6544 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T18:31:35.253Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 7009 ms | 5185 ms | /د/س/ت/ر/س/ی/ /3/5/8/8/ /// /ر/و/ت/ر/ /1/5/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/7/9/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/6/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/9/5/3/m/s/×/1/ |
| /procurement/orders | 3426 ms | 1784 ms | /د/س/ت/ر/س/ی/ /1/1/7/2/ /// /ر/و/ت/ر/ /6/1/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/0/2/m/s/×/1/ |
| /procurement/needs | 5932 ms | 2555 ms | /د/س/ت/ر/س/ی/ /1/7/9/9/ /// /ر/و/ت/ر/ /7/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/8/9/m/s/×/2/ |
| /procurement/dashboard | 3618 ms | 2409 ms | /د/س/ت/ر/س/ی/ /1/9/1/8/ /// /ر/و/ت/ر/ /4/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/1/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/0/2/m/s/×/1/ |
| /procurement/workspace | 3895 ms | 2915 ms | /د/س/ت/ر/س/ی/ /2/4/6/4/ /// /ر/و/ت/ر/ /4/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/3/0/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/6/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/3/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
