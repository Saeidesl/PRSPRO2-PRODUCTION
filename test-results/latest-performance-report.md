# PMS UI and Performance Audit

- Generated: 2026-11-10T18:23:06.143Z
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
| visibleButtonsInventoried | 174 |
| visibleInputsAndControlsInventoried | 48 |
| networkRequestsMeasured | 370 |
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
| dashboard | loaded | 3915 | 6575 | 0 | 4 | 2 | no |
| projects | loaded | 4895 | 7552 | 0 | 1 | 2 | no |
| project-detail | loaded | 3881 | 6539 | 0 | 2 | 0 | no |
| print-design | loaded | 3372 | 6030 | 1 | 17 | 7 | no |
| print-output | loaded | 3875 | 6530 | 0 | 2 | 6 | no |
| events | loaded | 3894 | 6550 | 0 | 7 | 2 | no |
| workflows | loaded | 3391 | 6048 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2380 | 5039 | 0 | 1 | 1 | no |
| event-types | loaded | 4887 | 7549 | 0 | 85 | 1 | no |
| information-types | loaded | 3384 | 6042 | 0 | 1 | 1 | no |
| procurement | loaded | 3380 | 29117 | 0 | 9 | 0 | no |
| attachments | loaded | 4877 | 7535 | 0 | 1 | 2 | no |
| reports | loaded | 3368 | 6029 | 0 | 8 | 12 | no |
| users | loaded | 3409 | 6066 | 0 | 1 | 1 | no |
| departments | loaded | 3863 | 6518 | 0 | 8 | 1 | no |
| roles | loaded | 4871 | 7526 | 0 | 21 | 1 | no |
| permissions | loaded | 3365 | 6021 | 0 | 0 | 1 | no |
| audit | loaded | 4371 | 7028 | 0 | 1 | 1 | no |
| settings | loaded | 3369 | 6026 | 0 | 1 | 3 | no |
| admin | loaded | 6882 | 9538 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-10T18:25:38.320Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6244 ms | 3677 ms | /د/س/ت/ر/س/ی/ /2/1/8/7/ /// /ر/و/ت/ر/ /1/4/8/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/8/9/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/3/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/2/0/m/s/×/1/ |
| /procurement/orders | 4052 ms | 2456 ms | /د/س/ت/ر/س/ی/ /1/6/7/6/ /// /ر/و/ت/ر/ /7/8/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/3/6/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/5/6/m/s/×/1/ |
| /procurement/needs | 5901 ms | 3856 ms | /د/س/ت/ر/س/ی/ /2/7/4/4/ /// /ر/و/ت/ر/ /1/1/1/1/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/0/6/m/s/×/1/,/ /g/e/t/A/l/l/:/7/6/6/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/1/2/m/s/×/1/ |
| /procurement/dashboard | 2860 ms | 1804 ms | /د/س/ت/ر/س/ی/ /1/1/5/9/ /// /ر/و/ت/ر/ /6/4/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/5/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/3/8/m/s/×/1/ |
| /procurement/workspace | 3197 ms | 1805 ms | /د/س/ت/ر/س/ی/ /1/2/1/5/ /// /ر/و/ت/ر/ /5/9/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/5/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/4/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
