# PMS UI and Performance Audit

- Generated: 2026-11-07T18:06:39.301Z
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
| visibleButtonsInventoried | 149 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 316 |
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
| dashboard | loaded | 5406 | 8064 | 0 | 4 | 2 | no |
| projects | loaded | 3880 | 6535 | 0 | 1 | 2 | no |
| project-detail | loaded | 4874 | 7529 | 0 | 2 | 0 | no |
| print-design | loaded | 3360 | 6019 | 1 | 14 | 5 | no |
| print-output | loaded | 2877 | 5532 | 0 | 1 | 2 | no |
| events | loaded | 4874 | 7529 | 0 | 7 | 2 | no |
| workflows | loaded | 3880 | 6533 | 0 | 1 | 2 | no |
| project-statuses | loaded | 6882 | 9537 | 0 | 1 | 1 | no |
| event-types | loaded | 4381 | 7042 | 0 | 58 | 1 | no |
| information-types | loaded | 3364 | 6020 | 0 | 1 | 1 | no |
| procurement | loaded | 3854 | 28196 | 0 | 9 | 0 | no |
| attachments | loaded | 3374 | 6031 | 0 | 1 | 2 | no |
| reports | loaded | 3879 | 6539 | 0 | 8 | 12 | no |
| users | loaded | 3865 | 6522 | 0 | 27 | 1 | no |
| departments | loaded | 3371 | 6029 | 0 | 8 | 1 | no |
| roles | loaded | 3393 | 6050 | 0 | 1 | 1 | no |
| permissions | loaded | 3857 | 6513 | 0 | 0 | 1 | no |
| audit | loaded | 3361 | 6014 | 0 | 1 | 1 | no |
| settings | loaded | 2849 | 5503 | 0 | 1 | 3 | no |
| admin | loaded | 4385 | 7041 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T18:09:19.201Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6149 ms | 4374 ms | /د/س/ت/ر/س/ی/ /2/6/3/7/ /// /ر/و/ت/ر/ /1/7/3/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/7/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/9/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/1/3/m/s/×/1/ |
| /procurement/orders | 4162 ms | 2174 ms | /د/س/ت/ر/س/ی/ /1/6/5/2/ /// /ر/و/ت/ر/ /5/2/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/3/4/m/s/×/1/ |
| /procurement/needs | 3556 ms | 2354 ms | /د/س/ت/ر/س/ی/ /1/3/3/4/ /// /ر/و/ت/ر/ /1/0/2/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/0/m/s/×/1/ |
| /procurement/dashboard | 3706 ms | 1944 ms | /د/س/ت/ر/س/ی/ /1/3/4/0/ /// /ر/و/ت/ر/ /6/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/7/m/s/×/1/ |
| /procurement/workspace | 3302 ms | 1766 ms | /د/س/ت/ر/س/ی/ /1/1/5/8/ /// /ر/و/ت/ر/ /6/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
