# PMS UI and Performance Audit

- Generated: 2026-11-12T09:13:23.323Z
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
| visibleButtonsInventoried | 180 |
| visibleInputsAndControlsInventoried | 48 |
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
| dashboard | loaded | 4449 | 7107 | 0 | 4 | 2 | no |
| projects | loaded | 3902 | 6560 | 0 | 1 | 2 | no |
| project-detail | loaded | 3902 | 6559 | 0 | 2 | 0 | no |
| print-design | loaded | 4398 | 7059 | 1 | 17 | 7 | no |
| print-output | loaded | 3897 | 6553 | 0 | 2 | 6 | no |
| events | loaded | 3433 | 6090 | 0 | 7 | 2 | no |
| workflows | loaded | 4929 | 7587 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3892 | 6550 | 0 | 1 | 1 | no |
| event-types | loaded | 4397 | 7060 | 0 | 85 | 1 | no |
| information-types | loaded | 4924 | 7582 | 0 | 1 | 1 | no |
| procurement | loaded | 3380 | 28796 | 0 | 9 | 0 | no |
| attachments | loaded | 3893 | 6549 | 0 | 1 | 2 | no |
| reports | loaded | 3380 | 6043 | 0 | 8 | 12 | no |
| users | loaded | 3887 | 6545 | 0 | 27 | 1 | no |
| departments | loaded | 3915 | 6571 | 0 | 8 | 1 | no |
| roles | loaded | 4893 | 7550 | 0 | 1 | 1 | no |
| permissions | loaded | 3910 | 6567 | 0 | 0 | 1 | no |
| audit | loaded | 3384 | 6041 | 0 | 1 | 1 | no |
| settings | loaded | 3889 | 6545 | 0 | 1 | 3 | no |
| admin | loaded | 3888 | 6546 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T09:16:07.358Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5871 ms | 3425 ms | /د/س/ت/ر/س/ی/ /1/8/1/9/ /// /ر/و/ت/ر/ /1/6/0/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/8/m/s/×/1/ |
| /procurement/orders | 4627 ms | 2582 ms | /د/س/ت/ر/س/ی/ /1/9/7/5/ /// /ر/و/ت/ر/ /6/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/8/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/4/5/6/m/s/×/2/,/ /g/e/t/H/e/a/d/e/r/s/:/4/5/5/m/s/×/1/ |
| /procurement/needs | 3294 ms | 1764 ms | /د/س/ت/ر/س/ی/ /1/2/4/8/ /// /ر/و/ت/ر/ /5/1/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/3/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/6/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/8/3/m/s/×/1/ |
| /procurement/dashboard | 3872 ms | 2264 ms | /د/س/ت/ر/س/ی/ /1/5/3/1/ /// /ر/و/ت/ر/ /7/3/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/3/4/2/m/s/×/1/ |
| /procurement/workspace | 3763 ms | 2045 ms | /د/س/ت/ر/س/ی/ /1/4/6/3/ /// /ر/و/ت/ر/ /5/8/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/0/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/3/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
