# PMS UI and Performance Audit

- Generated: 2026-11-11T18:04:36.171Z
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
| visibleButtonsInventoried | 188 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 338 |
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
| dashboard | loaded | 4510 | 7172 | 0 | 4 | 2 | no |
| projects | loaded | 5959 | 8614 | 0 | 1 | 2 | no |
| project-detail | loaded | 3442 | 6101 | 0 | 2 | 0 | no |
| print-design | loaded | 5440 | 8103 | 1 | 17 | 7 | no |
| print-output | loaded | 5434 | 8093 | 0 | 2 | 6 | no |
| events | loaded | 4445 | 7102 | 0 | 7 | 2 | no |
| workflows | loaded | 3961 | 6618 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2916 | 5572 | 0 | 9 | 1 | no |
| event-types | loaded | 3951 | 6622 | 0 | 85 | 1 | no |
| information-types | loaded | 3930 | 6586 | 0 | 1 | 1 | no |
| procurement | loaded | 3982 | 30966 | 0 | 9 | 0 | no |
| attachments | loaded | 4431 | 7091 | 0 | 1 | 2 | no |
| reports | loaded | 5491 | 8158 | 0 | 8 | 12 | no |
| users | loaded | 3428 | 6087 | 0 | 27 | 1 | no |
| departments | loaded | 3431 | 6090 | 0 | 8 | 1 | no |
| roles | loaded | 4424 | 7081 | 0 | 1 | 1 | no |
| permissions | loaded | 5425 | 8085 | 0 | 0 | 1 | no |
| audit | loaded | 3423 | 6083 | 0 | 1 | 1 | no |
| settings | loaded | 5428 | 8086 | 0 | 1 | 3 | no |
| admin | loaded | 3919 | 6575 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T18:07:29.273Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3952 ms | 2045 ms | /د/س/ت/ر/س/ی/ /1/1/6/0/ /// /ر/و/ت/ر/ /8/8/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/9/m/s/×/1/ |
| /procurement/orders | 4525 ms | 2591 ms | /د/س/ت/ر/س/ی/ /1/7/3/6/ /// /ر/و/ت/ر/ /8/5/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/9/m/s/×/1/ |
| /procurement/needs | 5346 ms | 3288 ms | /د/س/ت/ر/س/ی/ /2/6/1/3/ /// /ر/و/ت/ر/ /6/7/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/7/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/3/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/7/m/s/×/1/ |
| /procurement/dashboard | 4868 ms | 2879 ms | /د/س/ت/ر/س/ی/ /2/2/1/0/ /// /ر/و/ت/ر/ /6/6/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/4/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/6/8/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/6/5/m/s/×/1/ |
| /procurement/workspace | 4300 ms | 2158 ms | /د/س/ت/ر/س/ی/ /1/3/6/3/ /// /ر/و/ت/ر/ /7/9/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
