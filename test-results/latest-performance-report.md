# PMS UI and Performance Audit

- Generated: 2026-11-10T21:00:33.783Z
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
| networkRequestsMeasured | 376 |
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
| dashboard | loaded | 3944 | 6606 | 0 | 4 | 2 | no |
| projects | loaded | 4430 | 7089 | 0 | 1 | 2 | no |
| project-detail | loaded | 3420 | 6077 | 0 | 2 | 0 | no |
| print-design | loaded | 3919 | 6581 | 1 | 17 | 7 | no |
| print-output | loaded | 4419 | 7078 | 0 | 2 | 6 | no |
| events | loaded | 3420 | 6076 | 0 | 7 | 2 | no |
| workflows | loaded | 3431 | 6089 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4924 | 7582 | 0 | 1 | 1 | no |
| event-types | loaded | 3917 | 6582 | 0 | 85 | 1 | no |
| information-types | loaded | 3922 | 6578 | 0 | 1 | 1 | no |
| procurement | loaded | 4967 | 26145 | 0 | 9 | 0 | no |
| attachments | loaded | 2918 | 5577 | 0 | 1 | 2 | no |
| reports | loaded | 5447 | 8109 | 0 | 8 | 12 | no |
| users | loaded | 3413 | 6067 | 0 | 1 | 1 | no |
| departments | loaded | 3938 | 6595 | 0 | 8 | 1 | no |
| roles | loaded | 3910 | 6567 | 0 | 21 | 1 | no |
| permissions | loaded | 3914 | 6570 | 0 | 0 | 1 | no |
| audit | loaded | 2932 | 5589 | 0 | 1 | 1 | no |
| settings | loaded | 5927 | 8582 | 0 | 1 | 3 | no |
| admin | loaded | 2906 | 5564 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T21:03:09.470Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4259 ms | 2852 ms | /د/س/ت/ر/س/ی/ /1/6/9/9/ /// /ر/و/ت/ر/ /1/1/5/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/2/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/6/3/5/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/6/3/1/m/s/×/1/ |
| /procurement/orders | 3133 ms | 2062 ms | /د/س/ت/ر/س/ی/ /1/4/6/3/ /// /ر/و/ت/ر/ /5/9/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/6/m/s/×/1/ |
| /procurement/needs | 4869 ms | 2997 ms | /د/س/ت/ر/س/ی/ /2/1/0/8/ /// /ر/و/ت/ر/ /8/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/8/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/4/8/m/s/×/1/ |
| /procurement/dashboard | 2278 ms | 1226 ms | /د/س/ت/ر/س/ی/ /8/5/5/ /// /ر/و/ت/ر/ /3/7/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/2/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/1/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/0/m/s/×/1/ |
| /procurement/workspace | 3163 ms | 1597 ms | /د/س/ت/ر/س/ی/ /1/1/2/5/ /// /ر/و/ت/ر/ /4/7/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/6/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/0/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
