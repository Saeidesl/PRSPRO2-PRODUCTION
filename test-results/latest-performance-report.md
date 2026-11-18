# PMS UI and Performance Audit

- Generated: 2026-11-18T07:11:16.979Z
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
| visibleFormsInventoried | 11 |
| dynamicFormsInventoried | 10 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 147 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 327 |
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
| dashboard | loaded | 3485 | 6145 | 0 | 4 | 2 | no |
| projects | loaded | 3975 | 6633 | 0 | 1 | 2 | no |
| project-detail | loaded | 3420 | 6078 | 0 | 2 | 0 | no |
| print-design | loaded | 4917 | 7578 | 1 | 17 | 7 | no |
| print-output | loaded | 3918 | 6575 | 0 | 2 | 6 | no |
| events | loaded | 3440 | 6096 | 0 | 5 | 2 | no |
| workflows | loaded | 4458 | 7117 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3914 | 6571 | 0 | 1 | 1 | no |
| event-types | loaded | 3402 | 6069 | 0 | 85 | 1 | no |
| information-types | loaded | 3909 | 6567 | 0 | 1 | 1 | no |
| procurement | loaded | 3918 | 46910 | 0 | 4 | 0 | no |
| attachments | loaded | 4415 | 7072 | 0 | 1 | 1 | no |
| reports | loaded | 3429 | 6090 | 0 | 8 | 12 | no |
| users | loaded | 5448 | 8106 | 0 | 1 | 1 | no |
| departments | loaded | 4910 | 7567 | 0 | 8 | 1 | no |
| roles | loaded | 5410 | 8068 | 0 | 1 | 1 | no |
| permissions | loaded | 7923 | 10580 | 0 | 0 | 1 | no |
| audit | loaded | 5918 | 8574 | 0 | 1 | 1 | no |
| settings | loaded | 3912 | 6570 | 0 | 1 | 3 | no |
| admin | loaded | 5418 | 8076 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-18T07:14:30.101Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4574 ms | 3625 ms | /د/س/ت/ر/س/ی/ /1/7/3/9/ /// /ر/و/ت/ر/ /1/8/8/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/9/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/8/m/s/×/1/ |
| /procurement/orders | 4953 ms | 3015 ms | /د/س/ت/ر/س/ی/ /2/0/1/9/ /// /ر/و/ت/ر/ /9/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/4/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/7/6/m/s/×/1/ |
| /procurement/needs | 4528 ms | 2639 ms | /د/س/ت/ر/س/ی/ /2/0/1/6/ /// /ر/و/ت/ر/ /6/2/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/7/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/9/9/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/9/7/m/s/×/1/ |
| /procurement/dashboard | 18746 ms | 17367 ms | /د/س/ت/ر/س/ی/ /1/6/8/1/1/ /// /ر/و/ت/ر/ /5/5/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/5/9/5/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/5/7/0/4/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/5/7/0/3/m/s/×/1/ |
| /procurement/workspace | 4698 ms | 2980 ms | /د/س/ت/ر/س/ی/ /1/8/4/8/ /// /ر/و/ت/ر/ /1/1/3/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/7/5/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/6/9/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/6/9/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
