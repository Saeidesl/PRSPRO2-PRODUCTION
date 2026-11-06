# PMS UI and Performance Audit

- Generated: 2026-11-06T20:01:48.106Z
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
| visibleButtonsInventoried | 123 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 305 |
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
| dashboard | loaded | 3895 | 6554 | 0 | 4 | 2 | no |
| projects | loaded | 4869 | 7525 | 0 | 1 | 2 | no |
| project-detail | loaded | 4863 | 7520 | 0 | 2 | 0 | no |
| print-design | loaded | 4367 | 7025 | 1 | 14 | 5 | no |
| print-output | loaded | 3374 | 6031 | 0 | 1 | 2 | no |
| events | loaded | 3862 | 6515 | 0 | 7 | 2 | no |
| workflows | loaded | 3872 | 6526 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4865 | 7521 | 0 | 1 | 1 | no |
| event-types | loaded | 3357 | 6017 | 0 | 58 | 1 | no |
| information-types | loaded | 3373 | 6029 | 0 | 1 | 1 | no |
| procurement | loaded | 3855 | 29179 | 0 | 9 | 0 | no |
| attachments | loaded | 3861 | 6516 | 0 | 1 | 2 | no |
| reports | loaded | 3871 | 6531 | 0 | 8 | 12 | no |
| users | loaded | 3860 | 6516 | 0 | 1 | 1 | no |
| departments | loaded | 3354 | 6011 | 0 | 8 | 1 | no |
| roles | loaded | 4357 | 7013 | 0 | 1 | 1 | no |
| permissions | loaded | 4357 | 7014 | 0 | 0 | 1 | no |
| audit | loaded | 3859 | 6513 | 0 | 1 | 1 | no |
| settings | loaded | 3368 | 6021 | 0 | 1 | 3 | no |
| admin | loaded | 3356 | 6012 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-06T20:04:27.812Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4774 ms | 2967 ms | /د/س/ت/ر/س/ی/ /1/6/1/8/ /// /ر/و/ت/ر/ /1/3/4/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/8/1/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/3/7/8/m/s/×/1/ |
| /procurement/orders | 3530 ms | 1995 ms | /د/س/ت/ر/س/ی/ /1/3/6/0/ /// /ر/و/ت/ر/ /6/3/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/9/m/s/×/1/ |
| /procurement/needs | 5149 ms | 3094 ms | /د/س/ت/ر/س/ی/ /2/2/3/8/ /// /ر/و/ت/ر/ /8/5/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/5/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/9/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/0/9/m/s/×/2/ |
| /procurement/dashboard | 3327 ms | 1268 ms | /د/س/ت/ر/س/ی/ /9/0/5/ /// /ر/و/ت/ر/ /3/6/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/5/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/2/m/s/×/1/ |
| /procurement/workspace | 4076 ms | 2187 ms | /د/س/ت/ر/س/ی/ /1/4/9/1/ /// /ر/و/ت/ر/ /6/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
