# PMS UI and Performance Audit

- Generated: 2026-11-25T12:54:27.271Z
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
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
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
| dashboard | loaded | 3503 | 6164 | 0 | 4 | 2 | no |
| projects | loaded | 4424 | 7082 | 0 | 1 | 2 | no |
| project-detail | loaded | 4923 | 7581 | 0 | 2 | 0 | no |
| print-design | loaded | 2903 | 5564 | 1 | 17 | 7 | no |
| print-output | loaded | 2926 | 5584 | 0 | 2 | 6 | no |
| events | loaded | 4421 | 7076 | 0 | 5 | 2 | no |
| workflows | loaded | 3455 | 6113 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3908 | 6564 | 0 | 1 | 1 | no |
| event-types | loaded | 3405 | 6072 | 0 | 85 | 1 | no |
| information-types | loaded | 3421 | 6076 | 0 | 1 | 1 | no |
| procurement | loaded | 2900 | 24464 | 0 | 9 | 0 | no |
| attachments | loaded | 3435 | 6093 | 0 | 1 | 1 | no |
| reports | loaded | 4444 | 7107 | 0 | 8 | 12 | no |
| users | loaded | 4927 | 7584 | 0 | 1 | 1 | no |
| departments | loaded | 3429 | 6085 | 0 | 8 | 1 | no |
| roles | loaded | 4920 | 7579 | 0 | 1 | 1 | no |
| permissions | loaded | 3934 | 6590 | 0 | 0 | 1 | no |
| audit | loaded | 4419 | 7076 | 0 | 1 | 1 | no |
| settings | loaded | 5429 | 8086 | 0 | 1 | 3 | no |
| admin | loaded | 3913 | 6570 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T12:57:04.266Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3935 ms | 2265 ms | /د/س/ت/ر/س/ی/ /1/5/5/9/ /// /ر/و/ت/ر/ /7/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/6/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/0/7/m/s/×/2/ |
| /procurement/orders | 3804 ms | 2127 ms | /د/س/ت/ر/س/ی/ /1/6/5/5/ /// /ر/و/ت/ر/ /4/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/0/m/s/×/1/ |
| /procurement/needs | 4893 ms | 2969 ms | /د/س/ت/ر/س/ی/ /1/9/5/6/ /// /ر/و/ت/ر/ /1/0/1/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/3/2/m/s/×/1/,/ /g/e/t/A/l/l/:/6/4/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/5/0/m/s/×/2/ |
| /procurement/dashboard | 3785 ms | 2191 ms | /د/س/ت/ر/س/ی/ /1/5/2/3/ /// /ر/و/ت/ر/ /6/6/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/6/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/9/m/s/×/1/ |
| /procurement/workspace | 2151 ms | 1127 ms | /د/س/ت/ر/س/ی/ /7/7/6/ /// /ر/و/ت/ر/ /3/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/7/9/m/s/×/1/,/ /g/e/t/A/l/l/:/1/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/5/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
