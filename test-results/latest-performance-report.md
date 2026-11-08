# PMS UI and Performance Audit

- Generated: 2026-11-08T10:00:18.301Z
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
| visibleButtonsInventoried | 219 |
| visibleInputsAndControlsInventoried | 41 |
| networkRequestsMeasured | 310 |
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
| dashboard | loaded | 3939 | 6599 | 0 | 4 | 2 | no |
| projects | loaded | 4425 | 7082 | 0 | 1 | 2 | no |
| project-detail | loaded | 3407 | 6064 | 0 | 2 | 0 | no |
| print-design | loaded | 3911 | 6568 | 1 | 14 | 5 | no |
| print-output | loaded | 3917 | 6575 | 0 | 1 | 2 | no |
| events | loaded | 3920 | 6577 | 0 | 7 | 2 | no |
| workflows | loaded | 4451 | 7105 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2914 | 5571 | 0 | 1 | 1 | no |
| event-types | loaded | 3415 | 6079 | 0 | 58 | 1 | no |
| information-types | loaded | 4414 | 7071 | 0 | 1 | 1 | no |
| procurement | loaded | 3943 | 27311 | 0 | 9 | 0 | no |
| attachments | loaded | 3431 | 6088 | 0 | 1 | 2 | no |
| reports | loaded | 3418 | 6079 | 0 | 8 | 12 | no |
| users | loaded | 3407 | 6063 | 0 | 1 | 1 | no |
| departments | loaded | 3445 | 6103 | 0 | 8 | 1 | no |
| roles | loaded | 8099 | 10755 | 0 | 0 | 0 | no |
| permissions | loaded | 3420 | 6076 | 0 | 0 | 1 | no |
| audit | loaded | 3407 | 6065 | 0 | 1 | 1 | no |
| settings | loaded | 3914 | 6572 | 0 | 1 | 3 | no |
| admin | loaded | 3906 | 6576 | 0 | 100 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T10:02:53.644Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4690 ms | 3215 ms | /د/س/ت/ر/س/ی/ /1/8/9/6/ /// /ر/و/ت/ر/ /1/3/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/5/m/s/×/1/,/ /g/e/t/A/l/l/:/6/5/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/2/m/s/×/1/ |
| /procurement/orders | 3613 ms | 2477 ms | /د/س/ت/ر/س/ی/ /1/6/1/3/ /// /ر/و/ت/ر/ /8/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/9/2/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/8/7/m/s/×/1/ |
| /procurement/needs | 3280 ms | 1409 ms | /د/س/ت/ر/س/ی/ /9/5/1/ /// /ر/و/ت/ر/ /4/5/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/2/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/8/m/s/×/1/ |
| /procurement/dashboard | 4040 ms | 2959 ms | /د/س/ت/ر/س/ی/ /1/6/4/8/ /// /ر/و/ت/ر/ /1/3/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/5/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/9/9/m/s/×/1/ |
| /procurement/workspace | 5038 ms | 3241 ms | /د/س/ت/ر/س/ی/ /2/2/8/6/ /// /ر/و/ت/ر/ /9/5/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/9/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/8/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/4/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
