# PMS UI and Performance Audit

- Generated: 2026-11-07T20:16:17.219Z
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
| visibleButtonsInventoried | 239 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 338 |
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
| dashboard | loaded | 5413 | 8071 | 0 | 4 | 2 | no |
| projects | loaded | 3875 | 6533 | 0 | 1 | 2 | no |
| project-detail | loaded | 3874 | 6529 | 0 | 2 | 0 | no |
| print-design | loaded | 2867 | 5527 | 1 | 14 | 5 | no |
| print-output | loaded | 4388 | 7044 | 0 | 1 | 2 | no |
| events | loaded | 2868 | 5523 | 0 | 7 | 2 | no |
| workflows | loaded | 3879 | 6534 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2365 | 5020 | 0 | 1 | 1 | no |
| event-types | loaded | 2364 | 5025 | 0 | 58 | 1 | no |
| information-types | loaded | 3374 | 6027 | 0 | 1 | 1 | no |
| procurement | loaded | 3879 | 25114 | 0 | 9 | 0 | no |
| attachments | loaded | 3375 | 6032 | 0 | 1 | 2 | no |
| reports | loaded | 4362 | 7020 | 0 | 8 | 12 | no |
| users | loaded | 3396 | 6053 | 0 | 27 | 1 | no |
| departments | loaded | 4869 | 7527 | 0 | 8 | 1 | no |
| roles | loaded | 3363 | 6018 | 0 | 1 | 1 | no |
| permissions | loaded | 3361 | 6018 | 0 | 0 | 1 | no |
| audit | loaded | 3863 | 6517 | 0 | 1 | 1 | no |
| settings | loaded | 4367 | 7024 | 0 | 1 | 3 | no |
| admin | loaded | 2866 | 5527 | 0 | 93 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-07T20:18:39.822Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 3285 ms | 2351 ms | /د/س/ت/ر/س/ی/ /1/3/8/5/ /// /ر/و/ت/ر/ /9/6/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/7/0/m/s/×/1/ |
| /procurement/orders | 4498 ms | 2871 ms | /د/س/ت/ر/س/ی/ /1/9/7/8/ /// /ر/و/ت/ر/ /8/9/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/1/6/m/s/×/1/ |
| /procurement/needs | 2942 ms | 1943 ms | /د/س/ت/ر/س/ی/ /1/3/9/7/ /// /ر/و/ت/ر/ /5/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/3/m/s/×/1/ |
| /procurement/dashboard | 3224 ms | 1859 ms | /د/س/ت/ر/س/ی/ /1/3/9/7/ /// /ر/و/ت/ر/ /4/6/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/6/m/s/×/1/ |
| /procurement/workspace | 3817 ms | 2353 ms | /د/س/ت/ر/س/ی/ /1/7/2/5/ /// /ر/و/ت/ر/ /6/2/8/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/4/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/1/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
