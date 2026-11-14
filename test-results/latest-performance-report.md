# PMS UI and Performance Audit

- Generated: 2026-11-14T19:12:14.833Z
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
| visibleButtonsInventoried | 152 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 319 |
| procurementApiRequestsMeasured | 8 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 5 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 12 |
| failedSafeButtonChecks | 2 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 4917 | 7577 | 0 | 4 | 2 | no |
| projects | loaded | 5381 | 8039 | 0 | 1 | 2 | no |
| project-detail | loaded | 3370 | 6027 | 0 | 2 | 0 | no |
| print-design | loaded | 3378 | 6038 | 1 | 17 | 7 | no |
| print-output | loaded | 3371 | 6026 | 0 | 2 | 6 | no |
| events | loaded | 4373 | 7028 | 0 | 5 | 2 | no |
| workflows | loaded | 3890 | 6545 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2862 | 5520 | 0 | 1 | 1 | no |
| event-types | loaded | 3863 | 6526 | 0 | 85 | 1 | no |
| information-types | loaded | 2864 | 5520 | 0 | 1 | 1 | no |
| procurement | loaded | 2862 | 29262 | 0 | 9 | 0 | no |
| attachments | loaded | 5378 | 8035 | 0 | 1 | 1 | no |
| reports | loaded | 3363 | 6023 | 0 | 8 | 12 | no |
| users | loaded | 4897 | 7553 | 0 | 1 | 1 | no |
| departments | loaded | 3869 | 6527 | 0 | 8 | 1 | no |
| roles | loaded | 4371 | 7028 | 0 | 1 | 1 | no |
| permissions | loaded | 3364 | 6022 | 0 | 0 | 1 | no |
| audit | loaded | 3369 | 6024 | 0 | 1 | 1 | no |
| settings | loaded | 4371 | 7028 | 0 | 1 | 3 | no |
| admin | loaded | 4372 | 7030 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-14T19:15:01.819Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6645 ms | 4005 ms | /د/س/ت/ر/س/ی/ /2/2/6/3/ /// /ر/و/ت/ر/ /1/7/4/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/2/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/5/1/m/s/×/1/,/ /g/e/t/A/l/l/:/4/4/9/m/s/×/1/ |
| /procurement/orders | 3636 ms | 2351 ms | /د/س/ت/ر/س/ی/ /1/3/8/1/ /// /ر/و/ت/ر/ /9/7/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/2/4/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/6/m/s/×/1/,/ /g/e/t/A/l/l/:/2/9/1/m/s/×/1/ |
| /procurement/needs | 3616 ms | 2053 ms | /د/س/ت/ر/س/ی/ /1/2/0/7/ /// /ر/و/ت/ر/ /8/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/3/4/m/s/×/1/,/ /g/e/t/A/l/l/:/3/7/8/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/7/m/s/×/1/ |
| /procurement/dashboard | 3813 ms | 2218 ms | /د/س/ت/ر/س/ی/ /1/5/9/2/ /// /ر/و/ت/ر/ /6/2/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/1/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/5/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/5/m/s/×/1/ |
| /procurement/workspace | 4733 ms | 3268 ms | /د/س/ت/ر/س/ی/ /2/3/6/4/ /// /ر/و/ت/ر/ /9/0/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/3/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/0/7/m/s/×/1/,/ /g/e/t/A/l/l/:/4/7/3/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
