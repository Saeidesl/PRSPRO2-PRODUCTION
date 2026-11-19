# PMS UI and Performance Audit

- Generated: 2026-11-19T18:01:40.204Z
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
| networkRequestsMeasured | 342 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 3981 | 6641 | 0 | 4 | 2 | no |
| projects | loaded | 3922 | 6580 | 0 | 1 | 2 | no |
| project-detail | loaded | 3423 | 6080 | 0 | 2 | 0 | no |
| print-design | loaded | 4427 | 7087 | 1 | 17 | 7 | no |
| print-output | loaded | 2932 | 5591 | 0 | 2 | 6 | no |
| events | loaded | 3416 | 6073 | 0 | 5 | 2 | no |
| workflows | loaded | 4449 | 7107 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3417 | 6075 | 0 | 1 | 1 | no |
| event-types | loaded | 4936 | 7602 | 0 | 85 | 1 | no |
| information-types | loaded | 3433 | 6092 | 0 | 1 | 1 | no |
| procurement | loaded | 2404 | 27995 | 0 | 9 | 0 | no |
| attachments | loaded | 3413 | 6073 | 0 | 1 | 1 | no |
| reports | loaded | 4936 | 7599 | 0 | 8 | 12 | no |
| users | loaded | 3913 | 6571 | 0 | 1 | 1 | no |
| departments | loaded | 3401 | 6060 | 0 | 8 | 1 | no |
| roles | loaded | 4437 | 7094 | 0 | 1 | 1 | no |
| permissions | loaded | 3930 | 6588 | 0 | 0 | 1 | no |
| audit | loaded | 2914 | 5569 | 0 | 1 | 1 | no |
| settings | loaded | 3414 | 6072 | 0 | 1 | 3 | no |
| admin | loaded | 2414 | 5072 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-19T18:04:26.130Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4831 ms | 3690 ms | /د/س/ت/ر/س/ی/ /2/5/2/6/ /// /ر/و/ت/ر/ /1/1/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/5/5/m/s/×/1/,/ /g/e/t/A/l/l/:/9/2/2/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/7/8/m/s/×/2/ |
| /procurement/orders | 3625 ms | 1626 ms | /د/س/ت/ر/س/ی/ /1/1/9/1/ /// /ر/و/ت/ر/ /4/3/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/3/8/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/8/0/m/s/×/1/ |
| /procurement/needs | 3387 ms | 1793 ms | /د/س/ت/ر/س/ی/ /1/2/8/9/ /// /ر/و/ت/ر/ /5/0/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/1/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/3/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/3/1/m/s/×/1/ |
| /procurement/dashboard | 6437 ms | 2565 ms | /د/س/ت/ر/س/ی/ /1/3/7/0/ /// /ر/و/ت/ر/ /1/1/9/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/8/1/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/1/m/s/×/1/ |
| /procurement/workspace | 3315 ms | 1604 ms | /د/س/ت/ر/س/ی/ /1/1/1/3/ /// /ر/و/ت/ر/ /4/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
