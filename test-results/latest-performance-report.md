# PMS UI and Performance Audit

- Generated: 2026-11-12T20:14:49.784Z
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
| visibleButtonsInventoried | 155 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 313 |
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
| dashboard | loaded | 3936 | 6594 | 0 | 4 | 2 | no |
| projects | loaded | 3391 | 6048 | 0 | 1 | 2 | no |
| project-detail | loaded | 2882 | 5539 | 0 | 2 | 0 | no |
| print-design | loaded | 3883 | 6544 | 1 | 17 | 7 | no |
| print-output | loaded | 4388 | 7044 | 0 | 2 | 6 | no |
| events | loaded | 5412 | 8068 | 0 | 8 | 2 | no |
| workflows | loaded | 4411 | 7069 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5405 | 8062 | 0 | 1 | 1 | no |
| event-types | loaded | 3882 | 6547 | 0 | 85 | 1 | no |
| information-types | loaded | 4397 | 7054 | 0 | 1 | 1 | no |
| procurement | loaded | 3383 | 27896 | 0 | 9 | 0 | no |
| attachments | loaded | 3911 | 6567 | 0 | 1 | 1 | no |
| reports | loaded | 3882 | 6543 | 0 | 8 | 12 | no |
| users | loaded | 4394 | 7051 | 0 | 1 | 1 | no |
| departments | loaded | 7899 | 10556 | 0 | 8 | 1 | no |
| roles | loaded | 3880 | 6537 | 0 | 1 | 1 | no |
| permissions | loaded | 4382 | 7040 | 0 | 0 | 1 | no |
| audit | loaded | 5894 | 8550 | 0 | 1 | 1 | no |
| settings | loaded | 8082 | 10737 | 0 | 1 | 3 | no |
| admin | loaded | 3894 | 6551 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-12T20:17:33.653Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 4473 ms | 3080 ms | /د/س/ت/ر/س/ی/ /1/9/3/6/ /// /ر/و/ت/ر/ /1/1/4/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/9/6/1/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/6/1/8/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/7/m/s/×/1/ |
| /procurement/orders | 4197 ms | 1827 ms | /د/س/ت/ر/س/ی/ /1/3/5/8/ /// /ر/و/ت/ر/ /4/6/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/5/3/0/m/s/×/1/,/ /g/e/t/A/l/l/:/3/0/8/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/3/0/6/m/s/×/2/ |
| /procurement/needs | 3852 ms | 1979 ms | /د/س/ت/ر/س/ی/ /1/4/0/5/ /// /ر/و/ت/ر/ /5/7/4/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/7/7/m/s/×/1/,/ /g/e/t/A/l/l/:/3/5/2/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/7/4/m/s/×/1/ |
| /procurement/dashboard | 4593 ms | 2802 ms | /د/س/ت/ر/س/ی/ /1/4/1/2/ /// /ر/و/ت/ر/ /1/3/9/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/3/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/7/4/3/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/5/6/3/m/s/×/2/ |
| /procurement/workspace | 3927 ms | 1739 ms | /د/س/ت/ر/س/ی/ /1/2/4/0/ /// /ر/و/ت/ر/ /4/9/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/2/4/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/9/m/s/×/1/,/ /g/e/t/A/l/l/:/2/6/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
