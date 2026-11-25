# PMS UI and Performance Audit

- Generated: 2026-11-25T20:13:31.456Z
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
| visibleButtonsInventoried | 172 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 357 |
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
| dashboard | loaded | 2990 | 5652 | 0 | 4 | 2 | no |
| projects | loaded | 3447 | 6104 | 0 | 1 | 2 | no |
| project-detail | loaded | 2928 | 5586 | 0 | 2 | 0 | no |
| print-design | loaded | 3922 | 6581 | 1 | 17 | 7 | no |
| print-output | loaded | 3427 | 6085 | 0 | 2 | 6 | no |
| events | loaded | 2926 | 5583 | 0 | 5 | 2 | no |
| workflows | loaded | 5454 | 8113 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3416 | 6074 | 0 | 1 | 1 | no |
| event-types | loaded | 2906 | 5571 | 0 | 85 | 1 | no |
| information-types | loaded | 3418 | 6076 | 0 | 1 | 1 | no |
| procurement | loaded | 3944 | 26313 | 0 | 9 | 0 | no |
| attachments | loaded | 3429 | 6086 | 0 | 1 | 1 | no |
| reports | loaded | 2998 | 5662 | 0 | 8 | 12 | no |
| users | loaded | 4434 | 7092 | 0 | 1 | 1 | no |
| departments | loaded | 4429 | 7087 | 0 | 8 | 1 | no |
| roles | loaded | 2976 | 5634 | 0 | 21 | 1 | no |
| permissions | loaded | 3409 | 6067 | 0 | 0 | 1 | no |
| audit | loaded | 2444 | 5102 | 0 | 1 | 1 | no |
| settings | loaded | 2915 | 5571 | 0 | 1 | 3 | no |
| admin | loaded | 4433 | 7090 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T20:16:02.744Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4673 ms | 2910 ms | /د/س/ت/ر/س/ی/ /1/6/6/1/ /// /ر/و/ت/ر/ /1/2/4/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/8/1/m/s/×/1/,/ /g/e/t/A/l/l/:/7/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/2/m/s/×/1/ |
| /procurement/orders | 2899 ms | 1419 ms | /د/س/ت/ر/س/ی/ /8/7/1/ /// /ر/و/ت/ر/ /5/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/9/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/3/5/m/s/×/1/ |
| /procurement/needs | 3782 ms | 2569 ms | /د/س/ت/ر/س/ی/ /1/6/2/7/ /// /ر/و/ت/ر/ /9/4/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/3/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/3/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/0/8/m/s/×/1/ |
| /procurement/dashboard | 4564 ms | 3246 ms | /د/س/ت/ر/س/ی/ /2/8/1/3/ /// /ر/و/ت/ر/ /4/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/6/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/8/6/1/m/s/×/1/,/ /g/e/t/A/l/l/:/6/2/7/m/s/×/1/ |
| /procurement/workspace | 2964 ms | 1499 ms | /د/س/ت/ر/س/ی/ /1/0/7/1/ /// /ر/و/ت/ر/ /4/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
