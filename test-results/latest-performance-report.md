# PMS UI and Performance Audit

- Generated: 2026-11-08T10:29:12.202Z
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
| visibleButtonsInventoried | 123 |
| visibleInputsAndControlsInventoried | 43 |
| networkRequestsMeasured | 360 |
| procurementApiRequestsMeasured | 9 |
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
| dashboard | loaded | 4939 | 7600 | 0 | 4 | 2 | no |
| projects | loaded | 3897 | 6555 | 0 | 1 | 2 | no |
| project-detail | loaded | 3397 | 6054 | 0 | 2 | 0 | no |
| print-design | loaded | 2882 | 5539 | 1 | 14 | 6 | no |
| print-output | loaded | 3385 | 6043 | 0 | 1 | 2 | no |
| events | loaded | 3400 | 6056 | 0 | 7 | 2 | no |
| workflows | loaded | 4407 | 7063 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3380 | 6037 | 0 | 1 | 1 | no |
| event-types | loaded | 3880 | 6542 | 0 | 58 | 1 | no |
| information-types | loaded | 3913 | 6569 | 0 | 1 | 1 | no |
| procurement | loaded | 2902 | 26611 | 0 | 9 | 0 | no |
| attachments | loaded | 5425 | 8080 | 0 | 1 | 2 | no |
| reports | loaded | 3890 | 6551 | 0 | 8 | 12 | no |
| users | loaded | 2884 | 5541 | 0 | 1 | 1 | no |
| departments | loaded | 3411 | 6067 | 0 | 8 | 1 | no |
| roles | loaded | 3387 | 6041 | 0 | 1 | 1 | no |
| permissions | loaded | 2881 | 5539 | 0 | 0 | 1 | no |
| audit | loaded | 4415 | 7075 | 0 | 1 | 1 | no |
| settings | loaded | 3390 | 6047 | 0 | 1 | 3 | no |
| admin | loaded | 3388 | 6046 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-08T10:31:47.571Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4090 ms | 2347 ms | /د/س/ت/ر/س/ی/ /1/1/4/0/ /// /ر/و/ت/ر/ /1/2/0/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/3/1/m/s/×/1/ |
| /procurement/orders | 4979 ms | 3189 ms | /د/س/ت/ر/س/ی/ /2/1/1/0/ /// /ر/و/ت/ر/ /1/0/7/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/1/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/0/m/s/×/1/ |
| /procurement/needs | 3900 ms | 2061 ms | /د/س/ت/ر/س/ی/ /1/3/3/2/ /// /ر/و/ت/ر/ /7/2/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/5/m/s/×/1/ |
| /procurement/dashboard | 3666 ms | 1948 ms | /د/س/ت/ر/س/ی/ /1/3/6/9/ /// /ر/و/ت/ر/ /5/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/1/1/m/s/×/2/ |
| /procurement/workspace | 3105 ms | 1469 ms | /د/س/ت/ر/س/ی/ /1/0/0/0/ /// /ر/و/ت/ر/ /4/6/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/4/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/0/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
