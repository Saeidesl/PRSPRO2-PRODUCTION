# PMS UI and Performance Audit

- Generated: 2026-11-09T12:27:30.812Z
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
| networkRequestsMeasured | 369 |
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
| dashboard | loaded | 3428 | 6089 | 0 | 4 | 2 | no |
| projects | loaded | 2912 | 5570 | 0 | 1 | 2 | no |
| project-detail | loaded | 4425 | 7085 | 0 | 2 | 0 | no |
| print-design | loaded | 2910 | 5571 | 1 | 15 | 6 | no |
| print-output | loaded | 4423 | 7080 | 0 | 2 | 6 | no |
| events | loaded | 2915 | 5569 | 0 | 7 | 2 | no |
| workflows | loaded | 3421 | 6077 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3410 | 6067 | 0 | 1 | 1 | no |
| event-types | loaded | 4414 | 7077 | 0 | 58 | 1 | no |
| information-types | loaded | 2908 | 5566 | 0 | 1 | 1 | no |
| procurement | loaded | 3456 | 26811 | 0 | 9 | 0 | no |
| attachments | loaded | 3917 | 6575 | 0 | 1 | 2 | no |
| reports | loaded | 3414 | 6077 | 0 | 8 | 12 | no |
| users | loaded | 3915 | 6574 | 0 | 27 | 1 | no |
| departments | loaded | 3410 | 6068 | 0 | 8 | 1 | no |
| roles | loaded | 4439 | 7097 | 0 | 1 | 1 | no |
| permissions | loaded | 4443 | 7098 | 0 | 0 | 1 | no |
| audit | loaded | 3911 | 6568 | 0 | 1 | 1 | no |
| settings | loaded | 3908 | 6566 | 0 | 1 | 3 | no |
| admin | loaded | 4459 | 7117 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T12:30:07.566Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4557 ms | 2906 ms | /د/س/ت/ر/س/ی/ /1/6/5/4/ /// /ر/و/ت/ر/ /1/2/5/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/6/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/4/m/s/×/1/ |
| /procurement/orders | 4869 ms | 2868 ms | /د/س/ت/ر/س/ی/ /1/7/7/6/ /// /ر/و/ت/ر/ /1/0/9/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/7/m/s/×/1/ |
| /procurement/needs | 3023 ms | 1646 ms | /د/س/ت/ر/س/ی/ /1/1/1/8/ /// /ر/و/ت/ر/ /5/2/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/6/m/s/×/1/ |
| /procurement/dashboard | 4456 ms | 2414 ms | /د/س/ت/ر/س/ی/ /1/7/2/2/ /// /ر/و/ت/ر/ /6/9/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/4/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/5/1/m/s/×/1/ |
| /procurement/workspace | 3465 ms | 1672 ms | /د/س/ت/ر/س/ی/ /1/2/1/2/ /// /ر/و/ت/ر/ /4/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/8/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
