# PMS UI and Performance Audit

- Generated: 2026-11-25T11:53:27.270Z
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
| networkRequestsMeasured | 283 |
| procurementApiRequestsMeasured | 6 |
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
| dashboard | loaded | 4538 | 7199 | 0 | 4 | 2 | no |
| projects | loaded | 6465 | 9121 | 0 | 1 | 2 | no |
| project-detail | loaded | 4424 | 7083 | 0 | 2 | 0 | no |
| print-design | loaded | 4924 | 7584 | 1 | 17 | 7 | no |
| print-output | loaded | 4936 | 7594 | 0 | 2 | 6 | no |
| events | loaded | 4917 | 7575 | 0 | 5 | 2 | no |
| workflows | loaded | 4952 | 7608 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4425 | 7083 | 0 | 1 | 1 | no |
| event-types | loaded | 6947 | 9613 | 0 | 85 | 1 | no |
| information-types | loaded | 4938 | 7597 | 0 | 1 | 1 | no |
| procurement | loaded | 3915 | 37146 | 0 | 9 | 0 | no |
| attachments | loaded | 3909 | 6567 | 0 | 1 | 1 | no |
| reports | loaded | 3906 | 6568 | 0 | 8 | 12 | no |
| users | loaded | 4445 | 7101 | 0 | 1 | 1 | no |
| departments | loaded | 7927 | 10585 | 0 | 8 | 1 | no |
| roles | loaded | 3907 | 6564 | 0 | 1 | 1 | no |
| permissions | loaded | 3412 | 6070 | 0 | 0 | 1 | no |
| audit | loaded | 3912 | 6568 | 0 | 1 | 1 | no |
| settings | loaded | 5923 | 8579 | 0 | 1 | 3 | no |
| admin | loaded | 4423 | 7080 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T11:56:47.868Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 8879 ms | 7012 ms | /د/س/ت/ر/س/ی/ /5/0/3/6/ /// /ر/و/ت/ر/ /1/9/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/4/2/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/4/5/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/4/5/3/m/s/×/1/ |
| /procurement/orders | 5618 ms | 3627 ms | /د/س/ت/ر/س/ی/ /2/4/2/9/ /// /ر/و/ت/ر/ /1/1/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/8/0/m/s/×/1/,/ /g/e/t/A/l/l/:/6/8/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/6/0/m/s/×/1/ |
| /procurement/needs | 5173 ms | 3724 ms | /د/س/ت/ر/س/ی/ /2/6/4/5/ /// /ر/و/ت/ر/ /1/0/7/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/8/3/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/7/1/6/m/s/×/1/ |
| /procurement/dashboard | 3786 ms | 1972 ms | /د/س/ت/ر/س/ی/ /1/5/7/0/ /// /ر/و/ت/ر/ /4/0/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/1/m/s/×/1/ |
| /procurement/workspace | 5299 ms | 3592 ms | /د/س/ت/ر/س/ی/ /2/8/7/9/ /// /ر/و/ت/ر/ /7/1/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/4/2/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/7/4/m/s/×/1/,/ /g/e/t/A/l/l/:/8/1/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
