# PMS UI and Performance Audit

- Generated: 2026-11-19T19:21:44.992Z
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
| visibleButtonsInventoried | 178 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 341 |
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
| dashboard | loaded | 3914 | 6574 | 0 | 4 | 2 | no |
| projects | loaded | 3889 | 6546 | 0 | 1 | 2 | no |
| project-detail | loaded | 2870 | 5526 | 0 | 2 | 0 | no |
| print-design | loaded | 3871 | 6532 | 1 | 17 | 7 | no |
| print-output | loaded | 3887 | 6545 | 0 | 2 | 6 | no |
| events | loaded | 4387 | 7045 | 0 | 5 | 2 | no |
| workflows | loaded | 4917 | 7574 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4376 | 7033 | 0 | 1 | 1 | no |
| event-types | loaded | 4370 | 7033 | 0 | 85 | 1 | no |
| information-types | loaded | 3373 | 6028 | 0 | 1 | 1 | no |
| procurement | loaded | 4376 | 27246 | 0 | 9 | 0 | no |
| attachments | loaded | 3908 | 6571 | 0 | 1 | 1 | no |
| reports | loaded | 4382 | 7042 | 0 | 8 | 12 | no |
| users | loaded | 3874 | 6530 | 0 | 27 | 1 | no |
| departments | loaded | 3373 | 6031 | 0 | 8 | 1 | no |
| roles | loaded | 3369 | 6026 | 0 | 1 | 1 | no |
| permissions | loaded | 4371 | 7028 | 0 | 0 | 1 | no |
| audit | loaded | 4368 | 7026 | 0 | 1 | 1 | no |
| settings | loaded | 3895 | 6552 | 0 | 1 | 3 | no |
| admin | loaded | 4375 | 7032 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-19T19:24:26.341Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4437 ms | 2921 ms | /د/س/ت/ر/س/ی/ /1/8/4/2/ /// /ر/و/ت/ر/ /1/0/7/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/6/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/2/6/m/s/×/1/ |
| /procurement/orders | 4392 ms | 2780 ms | /د/س/ت/ر/س/ی/ /2/1/2/4/ /// /ر/و/ت/ر/ /6/5/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/2/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/3/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/1/5/m/s/×/1/ |
| /procurement/needs | 3423 ms | 1968 ms | /د/س/ت/ر/س/ی/ /1/4/5/9/ /// /ر/و/ت/ر/ /5/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/1/m/s/×/1/ |
| /procurement/dashboard | 3427 ms | 1750 ms | /د/س/ت/ر/س/ی/ /1/0/9/9/ /// /ر/و/ت/ر/ /6/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/9/m/s/×/1/ |
| /procurement/workspace | 4492 ms | 3041 ms | /د/س/ت/ر/س/ی/ /1/7/0/5/ /// /ر/و/ت/ر/ /1/3/3/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/7/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/2/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
