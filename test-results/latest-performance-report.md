# PMS UI and Performance Audit

- Generated: 2026-11-07T18:57:53.727Z
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
| visibleButtonsInventoried | 175 |
| visibleInputsAndControlsInventoried | 40 |
| networkRequestsMeasured | 331 |
| procurementApiRequestsMeasured | 9 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 11 |
| failedSafeButtonChecks | 1 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4464 | 7125 | 0 | 4 | 2 | no |
| projects | loaded | 4945 | 7605 | 0 | 1 | 2 | no |
| project-detail | loaded | 2924 | 5580 | 0 | 3 | 0 | no |
| print-design | loaded | 3915 | 6575 | 1 | 14 | 5 | no |
| print-output | loaded | 4919 | 7577 | 0 | 1 | 2 | no |
| events | loaded | 2934 | 5589 | 0 | 7 | 2 | no |
| workflows | loaded | 3429 | 6084 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2919 | 5577 | 0 | 9 | 1 | no |
| event-types | loaded | 2429 | 5090 | 0 | 58 | 1 | no |
| information-types | loaded | 3416 | 6073 | 0 | 1 | 1 | no |
| procurement | loaded | 2405 | 26329 | 0 | 9 | 0 | no |
| attachments | loaded | 3911 | 6567 | 0 | 1 | 2 | no |
| reports | loaded | 3439 | 6099 | 0 | 8 | 12 | no |
| users | loaded | 2909 | 5568 | 0 | 27 | 1 | no |
| departments | loaded | 4479 | 7136 | 0 | 8 | 1 | no |
| roles | loaded | 4941 | 7601 | 0 | 21 | 1 | no |
| permissions | loaded | 2399 | 5055 | 0 | 0 | 1 | no |
| audit | loaded | 3408 | 6068 | 0 | 1 | 1 | no |
| settings | loaded | 4423 | 7079 | 0 | 1 | 3 | no |
| admin | loaded | 8103 | 10759 | 0 | 0 | 0 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T19:00:21.613Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5399 ms | 3502 ms | /د/س/ت/ر/س/ی/ /2/5/7/1/ /// /ر/و/ت/ر/ /9/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/6/6/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/1/3/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/9/3/m/s/×/1/ |
| /procurement/orders | 3331 ms | 1677 ms | /د/س/ت/ر/س/ی/ /1/1/4/4/ /// /ر/و/ت/ر/ /5/3/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/4/m/s/×/1/ |
| /procurement/needs | 5040 ms | 3481 ms | /د/س/ت/ر/س/ی/ /2/0/2/7/ /// /ر/و/ت/ر/ /1/4/5/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/5/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/4/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/4/9/m/s/×/1/ |
| /procurement/dashboard | 3165 ms | 1594 ms | /د/س/ت/ر/س/ی/ /1/0/7/5/ /// /ر/و/ت/ر/ /5/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/9/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/1/5/m/s/×/1/ |
| /procurement/workspace | 3500 ms | 2363 ms | /د/س/ت/ر/س/ی/ /1/5/6/0/ /// /ر/و/ت/ر/ /8/0/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/0/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/0/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
