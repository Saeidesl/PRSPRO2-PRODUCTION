# PMS UI and Performance Audit

- Generated: 2026-11-09T18:04:29.122Z
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
| visibleButtonsInventoried | 335 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 368 |
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
| dashboard | loaded | 3917 | 6575 | 0 | 4 | 2 | no |
| projects | loaded | 3869 | 6523 | 0 | 1 | 2 | no |
| project-detail | loaded | 4366 | 7022 | 0 | 2 | 0 | no |
| print-design | loaded | 8067 | 10725 | 1 | 17 | 7 | no |
| print-output | loaded | 3871 | 6528 | 0 | 2 | 6 | no |
| events | loaded | 4364 | 7018 | 0 | 7 | 2 | no |
| workflows | loaded | 3376 | 6031 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3358 | 6012 | 0 | 1 | 1 | no |
| event-types | loaded | 2851 | 5513 | 0 | 85 | 1 | no |
| information-types | loaded | 3360 | 6016 | 0 | 1 | 1 | no |
| procurement | loaded | 4859 | 26697 | 0 | 9 | 0 | no |
| attachments | loaded | 2864 | 5518 | 0 | 1 | 2 | no |
| reports | loaded | 4865 | 7524 | 0 | 8 | 12 | no |
| users | loaded | 2863 | 5520 | 0 | 1 | 1 | no |
| departments | loaded | 2856 | 5514 | 0 | 8 | 1 | no |
| roles | loaded | 3363 | 6020 | 0 | 1 | 1 | no |
| permissions | loaded | 4369 | 7024 | 0 | 0 | 1 | no |
| audit | loaded | 2875 | 5531 | 0 | 1 | 1 | no |
| settings | loaded | 3864 | 6518 | 0 | 1 | 3 | no |
| admin | loaded | 3868 | 6545 | 0 | 184 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-09T18:07:10.868Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5036 ms | 2886 ms | /د/س/ت/ر/س/ی/ /1/6/8/9/ /// /ر/و/ت/ر/ /1/1/9/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/0/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/4/m/s/×/1/ |
| /procurement/orders | 2990 ms | 1635 ms | /د/س/ت/ر/س/ی/ /1/1/0/2/ /// /ر/و/ت/ر/ /5/3/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/7/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/9/m/s/×/1/ |
| /procurement/needs | 4668 ms | 2715 ms | /د/س/ت/ر/س/ی/ /2/2/2/8/ /// /ر/و/ت/ر/ /4/8/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/5/5/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/9/6/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/8/m/s/×/1/ |
| /procurement/dashboard | 3301 ms | 1819 ms | /د/س/ت/ر/س/ی/ /1/3/0/4/ /// /ر/و/ت/ر/ /5/1/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/1/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/6/5/m/s/×/1/ |
| /procurement/workspace | 3110 ms | 1633 ms | /د/س/ت/ر/س/ی/ /1/2/2/6/ /// /ر/و/ت/ر/ /4/0/6/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/4/0/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/8/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/2/9/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
