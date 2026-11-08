# PMS UI and Performance Audit

- Generated: 2026-11-08T17:32:25.786Z
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
| visibleButtonsInventoried | 151 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 345 |
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
| dashboard | loaded | 3476 | 6137 | 0 | 4 | 2 | no |
| projects | loaded | 3929 | 6588 | 0 | 1 | 2 | no |
| project-detail | loaded | 3921 | 6579 | 0 | 2 | 0 | no |
| print-design | loaded | 3921 | 6581 | 1 | 15 | 6 | no |
| print-output | loaded | 4923 | 7581 | 0 | 2 | 6 | no |
| events | loaded | 3420 | 6079 | 0 | 7 | 2 | no |
| workflows | loaded | 3448 | 6105 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3443 | 6102 | 0 | 1 | 1 | no |
| event-types | loaded | 3903 | 6564 | 0 | 58 | 1 | no |
| information-types | loaded | 3408 | 6066 | 0 | 1 | 1 | no |
| procurement | loaded | 4434 | 27396 | 0 | 9 | 0 | no |
| attachments | loaded | 3410 | 6067 | 0 | 1 | 2 | no |
| reports | loaded | 2938 | 5601 | 0 | 8 | 12 | no |
| users | loaded | 4921 | 7580 | 0 | 27 | 1 | no |
| departments | loaded | 4425 | 7081 | 0 | 8 | 1 | no |
| roles | loaded | 3939 | 6596 | 0 | 1 | 1 | no |
| permissions | loaded | 3400 | 6057 | 0 | 0 | 1 | no |
| audit | loaded | 3909 | 6565 | 0 | 1 | 1 | no |
| settings | loaded | 3409 | 6066 | 0 | 1 | 3 | no |
| admin | loaded | 2406 | 5064 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T17:35:00.478Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4834 ms | 3488 ms | /د/س/ت/ر/س/ی/ /2/2/9/4/ /// /ر/و/ت/ر/ /1/1/9/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/1/8/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/2/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/8/m/s/×/1/ |
| /procurement/orders | 3185 ms | 1757 ms | /د/س/ت/ر/س/ی/ /1/3/1/3/ /// /ر/و/ت/ر/ /4/4/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/3/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/6/m/s/×/1/ |
| /procurement/needs | 3569 ms | 2209 ms | /د/س/ت/ر/س/ی/ /1/6/1/7/ /// /ر/و/ت/ر/ /5/9/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/0/m/s/×/1/ |
| /procurement/dashboard | 3534 ms | 2426 ms | /د/س/ت/ر/س/ی/ /1/8/2/0/ /// /ر/و/ت/ر/ /6/0/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/6/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/0/7/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/0/5/m/s/×/1/ |
| /procurement/workspace | 4368 ms | 2931 ms | /د/س/ت/ر/س/ی/ /2/3/6/7/ /// /ر/و/ت/ر/ /5/6/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/2/2/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/1/0/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/6/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
