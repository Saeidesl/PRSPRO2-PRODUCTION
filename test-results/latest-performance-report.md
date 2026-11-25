# PMS UI and Performance Audit

- Generated: 2026-11-25T19:28:02.581Z
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
| visibleButtonsInventoried | 321 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 380 |
| procurementApiRequestsMeasured | 10 |
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
| dashboard | loaded | 4391 | 7050 | 0 | 4 | 2 | no |
| projects | loaded | 3364 | 6020 | 0 | 1 | 2 | no |
| project-detail | loaded | 4371 | 7028 | 0 | 2 | 0 | no |
| print-design | loaded | 3361 | 6020 | 1 | 17 | 7 | no |
| print-output | loaded | 4370 | 7026 | 0 | 2 | 6 | no |
| events | loaded | 2881 | 5535 | 0 | 5 | 2 | no |
| workflows | loaded | 3380 | 6037 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2873 | 5529 | 0 | 9 | 1 | no |
| event-types | loaded | 3359 | 6021 | 0 | 85 | 1 | no |
| information-types | loaded | 3370 | 6036 | 0 | 142 | 1 | no |
| procurement | loaded | 3371 | 28012 | 0 | 9 | 0 | no |
| attachments | loaded | 2892 | 5549 | 0 | 1 | 1 | no |
| reports | loaded | 3387 | 6047 | 0 | 8 | 12 | no |
| users | loaded | 2861 | 5515 | 0 | 1 | 1 | no |
| departments | loaded | 4358 | 7011 | 0 | 8 | 1 | no |
| roles | loaded | 3868 | 6523 | 0 | 21 | 1 | no |
| permissions | loaded | 2853 | 5506 | 0 | 0 | 1 | no |
| audit | loaded | 4364 | 7020 | 0 | 1 | 1 | no |
| settings | loaded | 2887 | 5545 | 0 | 1 | 3 | no |
| admin | loaded | 2865 | 5523 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T19:30:33.795Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6028 ms | 4161 ms | /د/س/ت/ر/س/ی/ /2/5/8/5/ /// /ر/و/ت/ر/ /1/5/7/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/9/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/4/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/6/m/s/×/1/ |
| /procurement/orders | 4270 ms | 2545 ms | /د/س/ت/ر/س/ی/ /1/5/7/4/ /// /ر/و/ت/ر/ /9/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/4/m/s/×/1/ |
| /procurement/needs | 3528 ms | 2247 ms | /د/س/ت/ر/س/ی/ /1/1/6/4/ /// /ر/و/ت/ر/ /1/0/8/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/7/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/4/0/m/s/×/1/ |
| /procurement/dashboard | 3316 ms | 1589 ms | /د/س/ت/ر/س/ی/ /1/1/7/4/ /// /ر/و/ت/ر/ /4/1/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/8/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/8/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/2/7/8/m/s/×/1/ |
| /procurement/workspace | 4026 ms | 1944 ms | /د/س/ت/ر/س/ی/ /1/4/5/7/ /// /ر/و/ت/ر/ /4/8/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/6/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
