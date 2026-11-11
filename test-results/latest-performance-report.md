# PMS UI and Performance Audit

- Generated: 2026-11-11T11:28:27.231Z
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
| visibleButtonsInventoried | 177 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 304 |
| procurementApiRequestsMeasured | 7 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 10 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 3490 | 6153 | 0 | 4 | 2 | no |
| projects | loaded | 3983 | 6641 | 0 | 1 | 2 | no |
| project-detail | loaded | 8132 | 10787 | 0 | 0 | 0 | no |
| print-design | loaded | 3928 | 6590 | 1 | 17 | 7 | no |
| print-output | loaded | 3928 | 6583 | 0 | 2 | 6 | no |
| events | loaded | 3931 | 6588 | 0 | 7 | 2 | no |
| workflows | loaded | 3454 | 6112 | 0 | 1 | 2 | no |
| project-statuses | loaded | 8114 | 10770 | 0 | 0 | 0 | no |
| event-types | loaded | 4958 | 7626 | 0 | 85 | 1 | no |
| information-types | loaded | 3424 | 6083 | 0 | 1 | 1 | no |
| procurement | loaded | 3961 | 31046 | 0 | 9 | 0 | no |
| attachments | loaded | 5454 | 8112 | 0 | 1 | 2 | no |
| reports | loaded | 3947 | 6610 | 0 | 8 | 12 | no |
| users | loaded | 4447 | 7108 | 0 | 27 | 1 | no |
| departments | loaded | 3916 | 6574 | 0 | 8 | 1 | no |
| roles | loaded | 2957 | 5614 | 0 | 1 | 1 | no |
| permissions | loaded | 3944 | 6601 | 0 | 0 | 1 | no |
| audit | loaded | 3425 | 6080 | 0 | 1 | 1 | no |
| settings | loaded | 3446 | 6104 | 0 | 1 | 3 | no |
| admin | loaded | 2932 | 5591 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T11:31:21.550Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4602 ms | 3090 ms | /د/س/ت/ر/س/ی/ /1/9/2/1/ /// /ر/و/ت/ر/ /1/1/6/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/9/6/m/s/×/1/ |
| /procurement/orders | 6078 ms | 3284 ms | /د/س/ت/ر/س/ی/ /2/2/0/5/ /// /ر/و/ت/ر/ /1/0/7/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/6/8/m/s/×/1/,/ /g/e/t/A/l/l/:/5/1/3/m/s/×/1/ |
| /procurement/needs | 4045 ms | 2525 ms | /د/س/ت/ر/س/ی/ /1/5/6/1/ /// /ر/و/ت/ر/ /9/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/9/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/5/m/s/×/1/ |
| /procurement/dashboard | 3568 ms | 2372 ms | /د/س/ت/ر/س/ی/ /1/5/5/1/ /// /ر/و/ت/ر/ /8/2/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/5/1/m/s/×/1/ |
| /procurement/workspace | 3788 ms | 2250 ms | /د/س/ت/ر/س/ی/ /1/5/4/7/ /// /ر/و/ت/ر/ /7/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
