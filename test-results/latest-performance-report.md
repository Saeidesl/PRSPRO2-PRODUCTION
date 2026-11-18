# PMS UI and Performance Audit

- Generated: 2026-11-18T09:30:01.331Z
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
| visibleButtonsInventoried | 172 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 333 |
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
| dashboard | loaded | 3889 | 6546 | 0 | 4 | 2 | no |
| projects | loaded | 3372 | 6029 | 0 | 1 | 2 | no |
| project-detail | loaded | 2875 | 5529 | 0 | 2 | 0 | no |
| print-design | loaded | 4380 | 7041 | 1 | 17 | 7 | no |
| print-output | loaded | 5897 | 8557 | 0 | 2 | 6 | no |
| events | loaded | 4892 | 7550 | 0 | 5 | 2 | no |
| workflows | loaded | 3898 | 6556 | 0 | 1 | 2 | no |
| project-statuses | loaded | 2884 | 5540 | 0 | 1 | 1 | no |
| event-types | loaded | 4374 | 7037 | 0 | 85 | 1 | no |
| information-types | loaded | 3887 | 6545 | 0 | 1 | 1 | no |
| procurement | loaded | 4397 | 35913 | 0 | 9 | 0 | no |
| attachments | loaded | 4883 | 7540 | 0 | 1 | 1 | no |
| reports | loaded | 3871 | 6532 | 0 | 8 | 12 | no |
| users | loaded | 3874 | 6528 | 0 | 1 | 1 | no |
| departments | loaded | 4376 | 7031 | 0 | 8 | 1 | no |
| roles | loaded | 3877 | 6533 | 0 | 21 | 1 | no |
| permissions | loaded | 4877 | 7534 | 0 | 0 | 1 | no |
| audit | loaded | 2391 | 5048 | 0 | 1 | 1 | no |
| settings | loaded | 2865 | 5521 | 0 | 1 | 3 | no |
| admin | loaded | 2875 | 5533 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-18T09:32:54.001Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 6012 ms | 3746 ms | /د/س/ت/ر/س/ی/ /1/8/9/9/ /// /ر/و/ت/ر/ /1/8/4/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/5/2/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/2/m/s/×/1/,/ /g/e/t/A/l/l/:/4/0/0/m/s/×/1/ |
| /procurement/orders | 5237 ms | 2692 ms | /د/س/ت/ر/س/ی/ /2/0/4/3/ /// /ر/و/ت/ر/ /6/4/8/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/0/5/6/m/s/×/1/,/ /g/e/t/S/h/e/e/t/:/7/9/6/m/s/×/2/,/ /g/e/t/S/p/r/e/a/d/s/h/e/e/t/:/7/8/0/m/s/×/1/ |
| /procurement/needs | 5243 ms | 3609 ms | /د/س/ت/ر/س/ی/ /2/6/7/3/ /// /ر/و/ت/ر/ /9/3/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/1/2/2/0/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/1/0/6/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/0/m/s/×/1/ |
| /procurement/dashboard | 5325 ms | 3431 ms | /د/س/ت/ر/س/ی/ /2/2/1/5/ /// /ر/و/ت/ر/ /1/2/1/6/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/8/3/m/s/×/1/,/ /g/e/t/A/l/l/:/5/0/9/m/s/×/1/,/ /g/e/t/A/l/l/:/4/5/6/m/s/×/1/ |
| /procurement/workspace | 4209 ms | 1821 ms | /د/س/ت/ر/س/ی/ /1/4/0/1/ /// /ر/و/ت/ر/ /4/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/9/7/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/4/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/0/5/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
