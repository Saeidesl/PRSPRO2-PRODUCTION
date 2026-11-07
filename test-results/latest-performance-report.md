# PMS UI and Performance Audit

- Generated: 2026-11-07T18:42:09.257Z
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
| visibleButtonsInventoried | 220 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 327 |
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
| dashboard | loaded | 3894 | 6550 | 0 | 12 | 2 | no |
| projects | loaded | 2863 | 5519 | 0 | 1 | 2 | no |
| project-detail | loaded | 2878 | 5535 | 0 | 3 | 0 | no |
| print-design | loaded | 3363 | 6021 | 1 | 14 | 5 | no |
| print-output | loaded | 3357 | 6013 | 0 | 1 | 2 | no |
| events | loaded | 3359 | 6016 | 0 | 7 | 2 | no |
| workflows | loaded | 2896 | 5550 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3353 | 6008 | 0 | 1 | 1 | no |
| event-types | loaded | 2851 | 5507 | 0 | 58 | 1 | no |
| information-types | loaded | 2852 | 5506 | 0 | 1 | 1 | no |
| procurement | loaded | 3352 | 23763 | 0 | 9 | 0 | no |
| attachments | loaded | 3356 | 6011 | 0 | 1 | 2 | no |
| reports | loaded | 4860 | 7519 | 0 | 8 | 12 | no |
| users | loaded | 3854 | 6510 | 0 | 1 | 1 | no |
| departments | loaded | 2869 | 5524 | 0 | 8 | 1 | no |
| roles | loaded | 2856 | 5512 | 0 | 21 | 1 | no |
| permissions | loaded | 4365 | 7020 | 0 | 0 | 1 | no |
| audit | loaded | 3359 | 6013 | 0 | 1 | 1 | no |
| settings | loaded | 3353 | 6007 | 0 | 1 | 3 | no |
| admin | loaded | 3855 | 6513 | 0 | 71 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T18:44:35.439Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4534 ms | 2305 ms | /د/س/ت/ر/س/ی/ /1/2/4/7/ /// /ر/و/ت/ر/ /1/0/5/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/6/m/s/×/1/ |
| /procurement/orders | 2377 ms | 1377 ms | /د/س/ت/ر/س/ی/ /9/6/8/ /// /ر/و/ت/ر/ /4/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/0/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/2/m/s/×/1/ |
| /procurement/needs | 3192 ms | 1691 ms | /د/س/ت/ر/س/ی/ /1/1/1/1/ /// /ر/و/ت/ر/ /5/8/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/2/9/m/s/×/1/ |
| /procurement/dashboard | 3169 ms | 2140 ms | /د/س/ت/ر/س/ی/ /1/6/5/7/ /// /ر/و/ت/ر/ /4/8/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/8/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/3/1/m/s/×/1/ |
| /procurement/workspace | 3677 ms | 1654 ms | /د/س/ت/ر/س/ی/ /1/2/0/2/ /// /ر/و/ت/ر/ /4/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
