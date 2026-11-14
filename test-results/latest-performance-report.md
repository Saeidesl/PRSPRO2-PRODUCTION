# PMS UI and Performance Audit

- Generated: 2026-11-14T18:41:21.573Z
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
| visibleButtonsInventoried | 206 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 342 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2999 | 5658 | 0 | 4 | 2 | no |
| projects | loaded | 3963 | 6618 | 0 | 1 | 2 | no |
| project-detail | loaded | 4930 | 7589 | 0 | 2 | 0 | no |
| print-design | loaded | 4928 | 7588 | 1 | 17 | 7 | no |
| print-output | loaded | 4425 | 7084 | 0 | 2 | 6 | no |
| events | loaded | 3937 | 6596 | 0 | 5 | 2 | no |
| workflows | loaded | 3951 | 6609 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4425 | 7081 | 0 | 9 | 1 | no |
| event-types | loaded | 3905 | 6572 | 0 | 85 | 1 | no |
| information-types | loaded | 3925 | 6582 | 0 | 1 | 1 | no |
| procurement | loaded | 4914 | 27228 | 0 | 9 | 0 | no |
| attachments | loaded | 3416 | 6074 | 0 | 1 | 1 | no |
| reports | loaded | 4409 | 7071 | 0 | 8 | 12 | no |
| users | loaded | 3944 | 6603 | 0 | 27 | 1 | no |
| departments | loaded | 3432 | 6086 | 0 | 8 | 1 | no |
| roles | loaded | 4415 | 7077 | 0 | 21 | 1 | no |
| permissions | loaded | 3905 | 6562 | 0 | 0 | 1 | no |
| audit | loaded | 3408 | 6066 | 0 | 1 | 1 | no |
| settings | loaded | 4412 | 7069 | 0 | 1 | 3 | no |
| admin | loaded | 3948 | 6606 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-14T18:44:07.459Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3467 ms | 2268 ms | /د/س/ت/ر/س/ی/ /1/5/2/4/ /// /ر/و/ت/ر/ /7/4/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/6/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/9/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/5/m/s/×/1/ |
| /procurement/orders | 4044 ms | 2376 ms | /د/س/ت/ر/س/ی/ /1/6/3/6/ /// /ر/و/ت/ر/ /7/3/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/6/m/s/×/1/ |
| /procurement/needs | 3930 ms | 2514 ms | /د/س/ت/ر/س/ی/ /1/5/5/2/ /// /ر/و/ت/ر/ /9/6/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/8/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/0/m/s/×/1/ |
| /procurement/dashboard | 3250 ms | 1941 ms | /د/س/ت/ر/س/ی/ /1/3/9/4/ /// /ر/و/ت/ر/ /5/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/9/m/s/×/1/ |
| /procurement/workspace | 4933 ms | 3253 ms | /د/س/ت/ر/س/ی/ /2/5/7/9/ /// /ر/و/ت/ر/ /6/7/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
