# PMS UI and Performance Audit

- Generated: 2026-11-13T16:01:46.638Z
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
| visibleButtonsInventoried | 160 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 313 |
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
| dashboard | loaded | 3891 | 6549 | 0 | 4 | 2 | no |
| projects | loaded | 3382 | 6040 | 0 | 1 | 2 | no |
| project-detail | loaded | 3866 | 6523 | 0 | 2 | 0 | no |
| print-design | loaded | 2866 | 5525 | 1 | 17 | 7 | no |
| print-output | loaded | 3873 | 6528 | 0 | 2 | 6 | no |
| events | loaded | 3371 | 6028 | 0 | 5 | 2 | no |
| workflows | loaded | 3894 | 6551 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3874 | 6529 | 0 | 9 | 1 | no |
| event-types | loaded | 4872 | 7535 | 0 | 85 | 1 | no |
| information-types | loaded | 3367 | 6024 | 0 | 1 | 1 | no |
| procurement | loaded | 3387 | 32079 | 0 | 9 | 0 | no |
| attachments | loaded | 3372 | 6030 | 0 | 1 | 1 | no |
| reports | loaded | 6379 | 9038 | 0 | 8 | 12 | no |
| users | loaded | 3866 | 6524 | 0 | 1 | 1 | no |
| departments | loaded | 4869 | 7525 | 0 | 8 | 1 | no |
| roles | loaded | 3875 | 6531 | 0 | 1 | 1 | no |
| permissions | loaded | 3865 | 6522 | 0 | 0 | 1 | no |
| audit | loaded | 2865 | 5521 | 0 | 1 | 1 | no |
| settings | loaded | 3875 | 6532 | 0 | 1 | 3 | no |
| admin | loaded | 3879 | 6537 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T16:04:36.944Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 7470 ms | 5439 ms | /د/س/ت/ر/س/ی/ /3/8/2/6/ /// /ر/و/ت/ر/ /1/6/1/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/7/6/6/m/s/×/1/,/ /g/e/t/A/l/l/:/1/1/5/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/1/5/m/s/×/1/ |
| /procurement/orders | 3911 ms | 2596 ms | /د/س/ت/ر/س/ی/ /1/8/3/5/ /// /ر/و/ت/ر/ /7/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/1/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/1/m/s/×/1/ |
| /procurement/needs | 4147 ms | 2346 ms | /د/س/ت/ر/س/ی/ /1/1/2/1/ /// /ر/و/ت/ر/ /1/2/2/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/3/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/3/m/s/×/1/ |
| /procurement/dashboard | 4611 ms | 2722 ms | /د/س/ت/ر/س/ی/ /1/7/5/7/ /// /ر/و/ت/ر/ /9/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/9/m/s/×/1/ |
| /procurement/workspace | 4564 ms | 2869 ms | /د/س/ت/ر/س/ی/ /2/2/7/5/ /// /ر/و/ت/ر/ /5/9/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/0/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/8/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/1/2/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
