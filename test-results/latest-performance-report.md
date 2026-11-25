# PMS UI and Performance Audit

- Generated: 2026-11-25T18:29:19.614Z
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
| networkRequestsMeasured | 366 |
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
| dashboard | loaded | 3026 | 5687 | 0 | 4 | 2 | no |
| projects | loaded | 2460 | 5117 | 0 | 1 | 2 | no |
| project-detail | loaded | 2487 | 5145 | 0 | 2 | 0 | no |
| print-design | loaded | 3916 | 6575 | 1 | 17 | 7 | no |
| print-output | loaded | 4422 | 7077 | 0 | 2 | 6 | no |
| events | loaded | 2408 | 5065 | 0 | 5 | 2 | no |
| workflows | loaded | 3493 | 6151 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4931 | 7588 | 0 | 1 | 1 | no |
| event-types | loaded | 7482 | 10150 | 0 | 85 | 1 | no |
| information-types | loaded | 3420 | 6079 | 0 | 1 | 1 | no |
| procurement | loaded | 3444 | 25469 | 0 | 9 | 0 | no |
| attachments | loaded | 4429 | 7100 | 0 | 1 | 1 | no |
| reports | loaded | 2932 | 5596 | 0 | 8 | 12 | no |
| users | loaded | 3928 | 6584 | 0 | 1 | 1 | no |
| departments | loaded | 8105 | 10762 | 0 | 8 | 1 | no |
| roles | loaded | 3445 | 6101 | 0 | 1 | 1 | no |
| permissions | loaded | 2910 | 5564 | 0 | 0 | 1 | no |
| audit | loaded | 2923 | 5579 | 0 | 1 | 1 | no |
| settings | loaded | 4448 | 7102 | 0 | 1 | 3 | no |
| admin | loaded | 3454 | 6109 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T18:31:46.236Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4191 ms | 2277 ms | /د/س/ت/ر/س/ی/ /1/3/1/1/ /// /ر/و/ت/ر/ /9/6/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/0/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/4/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/4/4/m/s/×/2/ |
| /procurement/orders | 2765 ms | 1368 ms | /د/س/ت/ر/س/ی/ /9/4/3/ /// /ر/و/ت/ر/ /4/2/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/4/5/m/s/×/1/,/ /g/e/t/A/l/l/:/1/9/7/m/s/×/1/,/ /g/e/t/A/l/l/:/1/8/8/m/s/×/1/ |
| /procurement/needs | 4055 ms | 2391 ms | /د/س/ت/ر/س/ی/ /1/8/2/5/ /// /ر/و/ت/ر/ /5/6/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/0/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/0/m/s/×/1/ |
| /procurement/dashboard | 3705 ms | 2205 ms | /د/س/ت/ر/س/ی/ /1/5/7/5/ /// /ر/و/ت/ر/ /6/2/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/0/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/6/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/0/3/m/s/×/1/ |
| /procurement/workspace | 4532 ms | 1976 ms | /د/س/ت/ر/س/ی/ /1/2/4/0/ /// /ر/و/ت/ر/ /7/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
