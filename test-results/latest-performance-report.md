# PMS UI and Performance Audit

- Generated: 2026-11-11T19:23:18.765Z
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
| visibleButtonsInventoried | 174 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 340 |
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
| dashboard | loaded | 4934 | 7591 | 0 | 4 | 2 | no |
| projects | loaded | 5397 | 8054 | 0 | 1 | 2 | no |
| project-detail | loaded | 3887 | 6545 | 0 | 2 | 0 | no |
| print-design | loaded | 4384 | 7044 | 1 | 17 | 7 | no |
| print-output | loaded | 4386 | 7042 | 0 | 2 | 6 | no |
| events | loaded | 5412 | 8068 | 0 | 7 | 2 | no |
| workflows | loaded | 3907 | 6562 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4408 | 7065 | 0 | 1 | 1 | no |
| event-types | loaded | 4382 | 7046 | 0 | 85 | 1 | no |
| information-types | loaded | 6892 | 9550 | 0 | 1 | 1 | no |
| procurement | loaded | 3373 | 29813 | 0 | 9 | 0 | no |
| attachments | loaded | 4411 | 7069 | 0 | 1 | 2 | no |
| reports | loaded | 4885 | 7547 | 0 | 8 | 12 | no |
| users | loaded | 4382 | 7038 | 0 | 1 | 1 | no |
| departments | loaded | 3391 | 6047 | 0 | 8 | 1 | no |
| roles | loaded | 3377 | 6033 | 0 | 21 | 1 | no |
| permissions | loaded | 3373 | 6028 | 0 | 0 | 1 | no |
| audit | loaded | 4910 | 7567 | 0 | 1 | 1 | no |
| settings | loaded | 2959 | 5615 | 0 | 1 | 3 | no |
| admin | loaded | 4397 | 7054 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T19:26:08.241Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5059 ms | 3375 ms | /د/س/ت/ر/س/ی/ /1/4/4/9/ /// /ر/و/ت/ر/ /1/9/2/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/9/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/3/m/s/×/1/ |
| /procurement/orders | 5187 ms | 3811 ms | /د/س/ت/ر/س/ی/ /3/2/1/8/ /// /ر/و/ت/ر/ /5/9/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/5/8/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/2/9/2/m/s/×/1/,/ /g/e/t/A/l/l/:/7/7/6/m/s/×/1/ |
| /procurement/needs | 3758 ms | 2384 ms | /د/س/ت/ر/س/ی/ /1/4/8/2/ /// /ر/و/ت/ر/ /9/0/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/5/m/s/×/1/ |
| /procurement/dashboard | 3915 ms | 2683 ms | /د/س/ت/ر/س/ی/ /1/9/9/7/ /// /ر/و/ت/ر/ /6/8/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/5/9/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/8/3/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/8/3/4/m/s/×/1/ |
| /procurement/workspace | 5045 ms | 2948 ms | /د/س/ت/ر/س/ی/ /1/9/6/3/ /// /ر/و/ت/ر/ /9/8/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
