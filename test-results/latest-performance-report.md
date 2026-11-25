# PMS UI and Performance Audit

- Generated: 2026-11-25T08:37:07.924Z
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
| networkRequestsMeasured | 292 |
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
| dashboard | loaded | 6914 | 9573 | 0 | 4 | 2 | no |
| projects | loaded | 3894 | 6551 | 0 | 1 | 2 | no |
| project-detail | loaded | 3887 | 6544 | 0 | 2 | 0 | no |
| print-design | loaded | 3901 | 6560 | 1 | 17 | 7 | no |
| print-output | loaded | 3385 | 6039 | 0 | 2 | 6 | no |
| events | loaded | 3884 | 6542 | 0 | 5 | 2 | no |
| workflows | loaded | 2953 | 5610 | 0 | 1 | 2 | no |
| project-statuses | loaded | 4887 | 7544 | 0 | 1 | 1 | no |
| event-types | loaded | 6388 | 9051 | 0 | 85 | 1 | no |
| information-types | loaded | 8078 | 10735 | 0 | 1 | 1 | no |
| procurement | loaded | 5387 | 34780 | 0 | 9 | 0 | no |
| attachments | loaded | 3383 | 6039 | 0 | 1 | 1 | no |
| reports | loaded | 2873 | 5535 | 0 | 8 | 12 | no |
| users | loaded | 3881 | 6538 | 0 | 1 | 1 | no |
| departments | loaded | 6903 | 9558 | 0 | 8 | 1 | no |
| roles | loaded | 4888 | 7546 | 0 | 1 | 1 | no |
| permissions | loaded | 5410 | 8068 | 0 | 0 | 1 | no |
| audit | loaded | 4387 | 7042 | 0 | 1 | 1 | no |
| settings | loaded | 4405 | 7062 | 0 | 1 | 3 | no |
| admin | loaded | 4388 | 7045 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T08:40:10.634Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4812 ms | 3490 ms | /د/س/ت/ر/س/ی/ /1/9/7/8/ /// /ر/و/ت/ر/ /1/5/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/2/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/5/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/4/3/m/s/×/1/ |
| /procurement/orders | 3755 ms | 1802 ms | /د/س/ت/ر/س/ی/ /9/0/5/ /// /ر/و/ت/ر/ /8/9/7/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/5/7/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/2/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/0/6/m/s/×/1/ |
| /procurement/needs | 3556 ms | 1518 ms | /د/س/ت/ر/س/ی/ /1/0/8/7/ /// /ر/و/ت/ر/ /4/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/4/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/6/1/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/1/9/1/m/s/×/2/ |
| /procurement/dashboard | 5695 ms | 3572 ms | /د/س/ت/ر/س/ی/ /2/4/2/6/ /// /ر/و/ت/ر/ /1/1/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/5/7/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/4/7/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/5/4/4/m/s/×/1/ |
| /procurement/workspace | 5093 ms | 3140 ms | /د/س/ت/ر/س/ی/ /2/1/0/7/ /// /ر/و/ت/ر/ /1/0/3/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/4/4/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/8/5/m/s/×/1/,/ /g/e/t/A/l/l/:/4/2/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
