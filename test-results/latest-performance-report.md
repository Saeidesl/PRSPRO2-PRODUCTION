# PMS UI and Performance Audit

- Generated: 2026-11-09T10:28:01.766Z
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
| visibleButtonsInventoried | 463 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 396 |
| procurementApiRequestsMeasured | 10 |
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
| dashboard | loaded | 3491 | 6152 | 0 | 4 | 2 | no |
| projects | loaded | 3465 | 6123 | 0 | 1 | 2 | no |
| project-detail | loaded | 5433 | 8088 | 0 | 2 | 0 | no |
| print-design | loaded | 4422 | 7081 | 1 | 15 | 6 | no |
| print-output | loaded | 3422 | 6081 | 0 | 2 | 6 | no |
| events | loaded | 2922 | 5579 | 0 | 7 | 2 | no |
| workflows | loaded | 3992 | 6650 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3414 | 6069 | 0 | 1 | 1 | no |
| event-types | loaded | 3412 | 6074 | 0 | 58 | 1 | no |
| information-types | loaded | 3935 | 6608 | 0 | 136 | 1 | no |
| procurement | loaded | 2912 | 23963 | 0 | 9 | 0 | no |
| attachments | loaded | 4924 | 7581 | 0 | 1 | 2 | no |
| reports | loaded | 3406 | 6065 | 0 | 8 | 12 | no |
| users | loaded | 2405 | 5062 | 0 | 27 | 1 | no |
| departments | loaded | 2452 | 5108 | 0 | 8 | 1 | no |
| roles | loaded | 2405 | 5063 | 0 | 21 | 1 | no |
| permissions | loaded | 2930 | 5586 | 0 | 0 | 1 | no |
| audit | loaded | 2920 | 5577 | 0 | 1 | 1 | no |
| settings | loaded | 3504 | 6160 | 0 | 1 | 3 | no |
| admin | loaded | 2914 | 5586 | 0 | 160 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T10:30:25.737Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4677 ms | 2625 ms | /د/س/ت/ر/س/ی/ /1/2/9/2/ /// /ر/و/ت/ر/ /1/3/3/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/1/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/8/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/3/9/0/m/s/×/1/ |
| /procurement/orders | 2602 ms | 1565 ms | /د/س/ت/ر/س/ی/ /1/1/3/2/ /// /ر/و/ت/ر/ /4/3/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/3/3/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/4/m/s/×/1/ |
| /procurement/needs | 2681 ms | 1456 ms | /د/س/ت/ر/س/ی/ /9/4/0/ /// /ر/و/ت/ر/ /5/1/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/2/m/s/×/1/ |
| /procurement/dashboard | 4033 ms | 2537 ms | /د/س/ت/ر/س/ی/ /1/9/7/3/ /// /ر/و/ت/ر/ /5/6/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/4/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/7/5/m/s/×/1/ |
| /procurement/workspace | 3574 ms | 2397 ms | /د/س/ت/ر/س/ی/ /1/5/6/6/ /// /ر/و/ت/ر/ /8/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
