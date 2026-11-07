# PMS UI and Performance Audit

- Generated: 2026-11-07T16:43:32.348Z
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
| visibleButtonsInventoried | 177 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 330 |
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
| dashboard | loaded | 4887 | 7544 | 0 | 4 | 2 | no |
| projects | loaded | 3364 | 6019 | 0 | 1 | 2 | no |
| project-detail | loaded | 4361 | 7016 | 0 | 2 | 0 | no |
| print-design | loaded | 2858 | 5516 | 1 | 14 | 5 | no |
| print-output | loaded | 4863 | 7516 | 0 | 1 | 2 | no |
| events | loaded | 6879 | 9534 | 0 | 7 | 2 | no |
| workflows | loaded | 2858 | 5512 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2857 | 5512 | 0 | 9 | 1 | no |
| event-types | loaded | 3350 | 6011 | 0 | 58 | 1 | no |
| information-types | loaded | 3356 | 6010 | 0 | 1 | 1 | no |
| procurement | loaded | 2870 | 27281 | 0 | 9 | 0 | no |
| attachments | loaded | 2855 | 5511 | 0 | 1 | 2 | no |
| reports | loaded | 3859 | 6518 | 0 | 8 | 12 | no |
| users | loaded | 3359 | 6015 | 0 | 27 | 1 | no |
| departments | loaded | 2860 | 5518 | 0 | 8 | 1 | no |
| roles | loaded | 3375 | 6025 | 0 | 21 | 1 | no |
| permissions | loaded | 3361 | 6013 | 0 | 0 | 1 | no |
| audit | loaded | 2863 | 5520 | 0 | 1 | 1 | no |
| settings | loaded | 2882 | 5536 | 0 | 1 | 3 | no |
| admin | loaded | 2858 | 5514 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T16:46:07.844Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4923 ms | 3476 ms | /د/س/ت/ر/س/ی/ /1/7/6/5/ /// /ر/و/ت/ر/ /1/7/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/3/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/7/m/s/×/1/ |
| /procurement/orders | 3634 ms | 1599 ms | /د/س/ت/ر/س/ی/ /9/6/2/ /// /ر/و/ت/ر/ /6/3/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/5/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/3/m/s/×/1/ |
| /procurement/needs | 2976 ms | 1735 ms | /د/س/ت/ر/س/ی/ /1/2/8/8/ /// /ر/و/ت/ر/ /4/4/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/3/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/7/m/s/×/1/ |
| /procurement/dashboard | 3229 ms | 2269 ms | /د/س/ت/ر/س/ی/ /1/7/4/3/ /// /ر/و/ت/ر/ /5/2/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/8/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/8/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/6/m/s/×/1/ |
| /procurement/workspace | 5678 ms | 2775 ms | /د/س/ت/ر/س/ی/ /2/0/9/3/ /// /ر/و/ت/ر/ /6/8/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/1/9/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/0/1/8/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/1/0/1/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
