# PMS UI and Performance Audit

- Generated: 2026-11-12T10:37:26.314Z
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
| visibleButtonsInventoried | 154 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 312 |
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
| dashboard | loaded | 4933 | 7593 | 0 | 4 | 2 | no |
| projects | loaded | 3914 | 6573 | 0 | 1 | 2 | no |
| project-detail | loaded | 3409 | 6067 | 0 | 2 | 0 | no |
| print-design | loaded | 3909 | 6572 | 1 | 17 | 7 | no |
| print-output | loaded | 3909 | 6567 | 0 | 2 | 6 | no |
| events | loaded | 4436 | 7095 | 0 | 7 | 2 | no |
| workflows | loaded | 5458 | 8117 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4912 | 7570 | 0 | 1 | 1 | no |
| event-types | loaded | 4405 | 7071 | 0 | 85 | 1 | no |
| information-types | loaded | 4413 | 7071 | 0 | 1 | 1 | no |
| procurement | loaded | 4436 | 32929 | 0 | 9 | 0 | no |
| attachments | loaded | 3933 | 6591 | 0 | 1 | 1 | no |
| reports | loaded | 3419 | 6082 | 0 | 8 | 12 | no |
| users | loaded | 3907 | 6565 | 0 | 1 | 1 | no |
| departments | loaded | 3932 | 6591 | 0 | 8 | 1 | no |
| roles | loaded | 3397 | 6055 | 0 | 1 | 1 | no |
| permissions | loaded | 4458 | 7117 | 0 | 0 | 1 | no |
| audit | loaded | 4403 | 7063 | 0 | 1 | 1 | no |
| settings | loaded | 3406 | 6064 | 0 | 1 | 3 | no |
| admin | loaded | 3405 | 6063 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T10:40:23.513Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4592 ms | 2423 ms | /د/س/ت/ر/س/ی/ /1/2/4/0/ /// /ر/و/ت/ر/ /1/1/8/3/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/3/1/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/2/m/s/×/1/ |
| /procurement/orders | 4620 ms | 2751 ms | /د/س/ت/ر/س/ی/ /2/0/8/7/ /// /ر/و/ت/ر/ /6/6/4/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/6/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/7/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/1/3/m/s/×/1/ |
| /procurement/needs | 4105 ms | 2561 ms | /د/س/ت/ر/س/ی/ /2/0/7/5/ /// /ر/و/ت/ر/ /4/8/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/2/2/m/s/×/1/,/ /g/e/t/A/l/l/:/7/1/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/8/6/m/s/×/1/ |
| /procurement/dashboard | 3484 ms | 2065 ms | /د/س/ت/ر/س/ی/ /1/3/8/8/ /// /ر/و/ت/ر/ /6/7/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/6/m/s/×/1/,/ /g/e/t/A/l/l/:/3/1/1/m/s/×/1/ |
| /procurement/workspace | 7715 ms | 4691 ms | /د/س/ت/ر/س/ی/ /3/6/4/7/ /// /ر/و/ت/ر/ /1/0/4/3/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/6/6/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/8/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/1/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
