# PMS UI and Performance Audit

- Generated: 2026-11-11T15:14:59.706Z
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
| visibleButtonsInventoried | 153 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 302 |
| procurementApiRequestsMeasured | 8 |
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
| dashboard | loaded | 4489 | 7151 | 0 | 4 | 2 | no |
| projects | loaded | 4943 | 7602 | 0 | 1 | 2 | no |
| project-detail | loaded | 4436 | 7094 | 0 | 2 | 0 | no |
| print-design | loaded | 4928 | 7590 | 1 | 17 | 7 | no |
| print-output | loaded | 5436 | 8090 | 0 | 2 | 6 | no |
| events | loaded | 5440 | 8098 | 0 | 7 | 2 | no |
| workflows | loaded | 4454 | 7109 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5434 | 8092 | 0 | 1 | 1 | no |
| event-types | loaded | 3448 | 6117 | 0 | 85 | 1 | no |
| information-types | loaded | 4424 | 7082 | 0 | 1 | 1 | no |
| procurement | loaded | 3988 | 35612 | 0 | 9 | 0 | no |
| attachments | loaded | 5934 | 8590 | 0 | 1 | 2 | no |
| reports | loaded | 2996 | 5660 | 0 | 8 | 12 | no |
| users | loaded | 8108 | 10764 | 0 | 0 | 0 | no |
| departments | loaded | 4929 | 7588 | 0 | 8 | 1 | no |
| roles | loaded | 8137 | 10794 | 0 | 1 | 1 | no |
| permissions | loaded | 3951 | 6608 | 0 | 0 | 1 | no |
| audit | loaded | 3923 | 6581 | 0 | 1 | 1 | no |
| settings | loaded | 4982 | 7640 | 0 | 1 | 3 | no |
| admin | loaded | 4934 | 7594 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-11T15:18:01.148Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5023 ms | 2993 ms | /د/س/ت/ر/س/ی/ /1/7/1/8/ /// /ر/و/ت/ر/ /1/2/7/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/8/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/9/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/7/m/s/×/1/ |
| /procurement/orders | 5901 ms | 3560 ms | /د/س/ت/ر/س/ی/ /2/2/1/6/ /// /ر/و/ت/ر/ /1/3/4/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/6/0/m/s/×/1/,/ /g/e/t/A/l/l/:/5/4/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/6/0/m/s/×/1/ |
| /procurement/needs | 3990 ms | 2360 ms | /د/س/ت/ر/س/ی/ /1/4/6/4/ /// /ر/و/ت/ر/ /8/9/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/3/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/2/m/s/×/1/ |
| /procurement/dashboard | 5028 ms | 2959 ms | /د/س/ت/ر/س/ی/ /2/2/5/0/ /// /ر/و/ت/ر/ /7/0/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/1/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/9/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/2/m/s/×/1/ |
| /procurement/workspace | 6691 ms | 4535 ms | /د/س/ت/ر/س/ی/ /2/5/0/0/ /// /ر/و/ت/ر/ /2/0/3/5/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/5/1/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/1/3/4/3/m/s/×/1/,/ /g/e/t/A/l/l/:/5/2/7/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
