# PMS UI and Performance Audit

- Generated: 2026-11-18T18:27:37.275Z
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
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 308 |
| procurementApiRequestsMeasured | 6 |
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
| dashboard | loaded | 4450 | 7112 | 0 | 4 | 2 | no |
| projects | loaded | 3944 | 6602 | 0 | 1 | 2 | no |
| project-detail | loaded | 3465 | 6124 | 0 | 2 | 0 | no |
| print-design | loaded | 4934 | 7597 | 1 | 17 | 7 | no |
| print-output | loaded | 6445 | 9100 | 0 | 2 | 6 | no |
| events | loaded | 4438 | 7098 | 0 | 5 | 2 | no |
| workflows | loaded | 4463 | 7122 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4934 | 7592 | 0 | 1 | 1 | no |
| event-types | loaded | 4962 | 7632 | 0 | 85 | 1 | no |
| information-types | loaded | 3927 | 6587 | 0 | 1 | 1 | no |
| procurement | loaded | 5487 | 31348 | 0 | 9 | 0 | no |
| attachments | loaded | 4421 | 7080 | 0 | 1 | 1 | no |
| reports | loaded | 4443 | 7107 | 0 | 8 | 12 | no |
| users | loaded | 3921 | 6576 | 0 | 1 | 1 | no |
| departments | loaded | 3918 | 6573 | 0 | 8 | 1 | no |
| roles | loaded | 3477 | 6136 | 0 | 1 | 1 | no |
| permissions | loaded | 5442 | 8099 | 0 | 0 | 1 | no |
| audit | loaded | 5433 | 8093 | 0 | 1 | 1 | no |
| settings | loaded | 5429 | 8086 | 0 | 1 | 3 | no |
| admin | loaded | 3421 | 6080 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-18T18:30:26.613Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5106 ms | 3561 ms | /د/س/ت/ر/س/ی/ /1/8/3/4/ /// /ر/و/ت/ر/ /1/7/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/1/7/m/s/×/1/,/ /g/e/t/A/l/l/:/6/5/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/3/3/m/s/×/1/ |
| /procurement/orders | 4767 ms | 2731 ms | /د/س/ت/ر/س/ی/ /2/0/8/8/ /// /ر/و/ت/ر/ /6/4/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/9/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/6/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/3/m/s/×/1/ |
| /procurement/needs | 3776 ms | 2446 ms | /د/س/ت/ر/س/ی/ /1/6/6/4/ /// /ر/و/ت/ر/ /7/8/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/5/m/s/×/1/ |
| /procurement/dashboard | 3346 ms | 1881 ms | /د/س/ت/ر/س/ی/ /1/3/3/3/ /// /ر/و/ت/ر/ /5/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/2/m/s/×/1/ |
| /procurement/workspace | 4869 ms | 3038 ms | /د/س/ت/ر/س/ی/ /2/4/4/5/ /// /ر/و/ت/ر/ /5/9/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/1/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/9/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/9/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
