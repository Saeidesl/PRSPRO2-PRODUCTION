# PMS UI and Performance Audit

- Generated: 2026-11-07T06:34:37.178Z
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
| visibleButtonsInventoried | 213 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 356 |
| procurementApiRequestsMeasured | 11 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 3 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 2910 | 5570 | 0 | 4 | 2 | no |
| projects | loaded | 3875 | 6530 | 0 | 1 | 2 | no |
| project-detail | loaded | 2373 | 5028 | 0 | 2 | 0 | no |
| print-design | loaded | 2375 | 5035 | 1 | 14 | 5 | no |
| print-output | loaded | 2365 | 5018 | 0 | 1 | 2 | no |
| events | loaded | 3371 | 6026 | 0 | 14 | 2 | no |
| workflows | loaded | 3380 | 6034 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3858 | 6513 | 0 | 9 | 1 | no |
| event-types | loaded | 2862 | 5520 | 0 | 58 | 1 | no |
| information-types | loaded | 2360 | 5017 | 0 | 34 | 1 | no |
| procurement | loaded | 3354 | 19964 | 0 | 9 | 0 | no |
| attachments | loaded | 2860 | 5514 | 0 | 10 | 2 | no |
| reports | loaded | 2355 | 5013 | 0 | 8 | 12 | no |
| users | loaded | 2879 | 5532 | 0 | 1 | 1 | no |
| departments | loaded | 3366 | 6021 | 0 | 8 | 1 | no |
| roles | loaded | 8061 | 10715 | 0 | 1 | 1 | no |
| permissions | loaded | 2866 | 5124 | 0 | 0 | 1 | no |
| audit | loaded | 2380 | 5037 | 0 | 1 | 1 | no |
| settings | loaded | 3869 | 6522 | 0 | 1 | 3 | no |
| admin | loaded | 3367 | 6025 | 0 | 36 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T06:36:44.658Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3359 ms | 2226 ms | /د/س/ت/ر/س/ی/ /1/2/7/5/ /// /ر/و/ت/ر/ /9/5/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/1/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/2/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/2/5/2/m/s/×/2/ |
| /procurement/orders | 3093 ms | 1466 ms | /د/س/ت/ر/س/ی/ /9/6/8/ /// /ر/و/ت/ر/ /4/9/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/2/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/2/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/9/9/m/s/×/1/ |
| /procurement/needs | 2669 ms | 1675 ms | /د/س/ت/ر/س/ی/ /1/0/8/3/ /// /ر/و/ت/ر/ /5/9/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/3/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/5/m/s/×/1/ |
| /procurement/dashboard | 2345 ms | 1344 ms | /د/س/ت/ر/س/ی/ /8/8/1/ /// /ر/و/ت/ر/ /4/6/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/8/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/8/1/m/s/×/1/ |
| /procurement/workspace | 2449 ms | 983 ms | /د/س/ت/ر/س/ی/ /6/3/5/ /// /ر/و/ت/ر/ /3/4/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/3/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/2/6/m/s/×/2/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
