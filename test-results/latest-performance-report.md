# PMS UI and Performance Audit

- Generated: 2026-11-25T09:13:38.212Z
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
| networkRequestsMeasured | 361 |
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
| dashboard | loaded | 3947 | 6607 | 0 | 4 | 2 | no |
| projects | loaded | 3404 | 6062 | 0 | 1 | 2 | no |
| project-detail | loaded | 5404 | 8062 | 0 | 2 | 0 | no |
| print-design | loaded | 3390 | 6051 | 1 | 17 | 7 | no |
| print-output | loaded | 4397 | 7051 | 0 | 2 | 6 | no |
| events | loaded | 3414 | 6069 | 0 | 5 | 2 | no |
| workflows | loaded | 4409 | 7066 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3902 | 6560 | 0 | 1 | 1 | no |
| event-types | loaded | 4387 | 7050 | 0 | 85 | 1 | no |
| information-types | loaded | 4386 | 7041 | 0 | 1 | 1 | no |
| procurement | loaded | 3380 | 26313 | 0 | 9 | 0 | no |
| attachments | loaded | 2909 | 5567 | 0 | 1 | 1 | no |
| reports | loaded | 3379 | 6039 | 0 | 8 | 12 | no |
| users | loaded | 2375 | 5031 | 0 | 1 | 1 | no |
| departments | loaded | 2880 | 5535 | 0 | 8 | 1 | no |
| roles | loaded | 3883 | 6540 | 0 | 1 | 1 | no |
| permissions | loaded | 4887 | 7544 | 0 | 0 | 1 | no |
| audit | loaded | 4395 | 7053 | 0 | 1 | 1 | no |
| settings | loaded | 4900 | 7556 | 0 | 1 | 3 | no |
| admin | loaded | 2890 | 5546 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-25T09:16:24.032Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6106 ms | 4544 ms | /د/س/ت/ر/س/ی/ /2/0/0/3/ /// /ر/و/ت/ر/ /2/5/4/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/6/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/3/6/m/s/×/1/ |
| /procurement/orders | 3588 ms | 2112 ms | /د/س/ت/ر/س/ی/ /1/5/9/5/ /// /ر/و/ت/ر/ /5/1/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/4/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/0/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/3/7/0/m/s/×/1/ |
| /procurement/needs | 3449 ms | 2144 ms | /د/س/ت/ر/س/ی/ /1/6/3/7/ /// /ر/و/ت/ر/ /5/0/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/6/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/6/2/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/3/m/s/×/1/ |
| /procurement/dashboard | 3139 ms | 1510 ms | /د/س/ت/ر/س/ی/ /1/0/8/3/ /// /ر/و/ت/ر/ /4/2/7/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/3/8/7/m/s/×/1/,/ /g/e/t/A/l/l/:/2/5/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/1/7/m/s/×/1/ |
| /procurement/workspace | 3958 ms | 2277 ms | /د/س/ت/ر/س/ی/ /1/5/5/5/ /// /ر/و/ت/ر/ /7/2/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/1/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/3/8/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
