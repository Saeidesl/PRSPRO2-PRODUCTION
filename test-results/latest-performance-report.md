# PMS UI and Performance Audit

- Generated: 2026-11-17T19:39:46.277Z
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
| visibleFormsInventoried | 10 |
| dynamicFormsInventoried | 9 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 331 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 325 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 3901 | 6559 | 0 | 4 | 2 | no |
| projects | loaded | 3389 | 6043 | 0 | 1 | 2 | no |
| project-detail | loaded | 8083 | 10739 | 0 | 0 | 0 | no |
| print-design | loaded | 2383 | 5044 | 1 | 17 | 7 | no |
| print-output | loaded | 3385 | 6042 | 0 | 2 | 6 | no |
| events | loaded | 3398 | 6056 | 0 | 5 | 2 | no |
| workflows | loaded | 3383 | 6038 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2377 | 5034 | 0 | 1 | 1 | no |
| event-types | loaded | 3374 | 6037 | 0 | 85 | 1 | no |
| information-types | loaded | 3914 | 6580 | 0 | 136 | 1 | no |
| procurement | loaded | 4885 | 27680 | 0 | 9 | 0 | no |
| attachments | loaded | 3896 | 6554 | 0 | 1 | 1 | no |
| reports | loaded | 3379 | 6040 | 0 | 8 | 12 | no |
| users | loaded | 3888 | 6546 | 0 | 27 | 1 | no |
| departments | loaded | 3886 | 6543 | 0 | 8 | 1 | no |
| roles | loaded | 2880 | 5536 | 0 | 21 | 1 | no |
| permissions | loaded | 3400 | 6055 | 0 | 0 | 1 | no |
| audit | loaded | 3390 | 6048 | 0 | 1 | 1 | no |
| settings | loaded | 3890 | 6545 | 0 | 1 | 3 | no |
| admin | loaded | 4399 | 7057 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T19:42:20.420Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3864 ms | 2024 ms | /د/س/ت/ر/س/ی/ /1/1/7/7/ /// /ر/و/ت/ر/ /8/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/3/6/m/s/×/2/ |
| /procurement/orders | 3883 ms | 2313 ms | /د/س/ت/ر/س/ی/ /1/2/7/3/ /// /ر/و/ت/ر/ /1/0/4/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/9/3/m/s/×/1/ |
| /procurement/needs | 4116 ms | 2469 ms | /د/س/ت/ر/س/ی/ /1/6/0/7/ /// /ر/و/ت/ر/ /8/6/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/7/m/s/×/1/ |
| /procurement/dashboard | 2565 ms | 1440 ms | /د/س/ت/ر/س/ی/ /1/0/1/9/ /// /ر/و/ت/ر/ /4/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/0/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/6/m/s/×/1/ |
| /procurement/workspace | 3897 ms | 2199 ms | /د/س/ت/ر/س/ی/ /1/6/7/8/ /// /ر/و/ت/ر/ /5/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
