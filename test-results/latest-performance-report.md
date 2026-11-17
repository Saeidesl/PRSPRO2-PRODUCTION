# PMS UI and Performance Audit

- Generated: 2026-11-17T18:05:53.399Z
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
| visibleButtonsInventoried | 313 |
| visibleInputsAndControlsInventoried | 47 |
| networkRequestsMeasured | 330 |
| procurementApiRequestsMeasured | 7 |
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
| dashboard | loaded | 3492 | 6151 | 0 | 4 | 2 | no |
| projects | loaded | 3932 | 6589 | 0 | 1 | 2 | no |
| project-detail | loaded | 6944 | 9602 | 0 | 2 | 0 | no |
| print-design | loaded | 3421 | 6082 | 1 | 17 | 7 | no |
| print-output | loaded | 3925 | 6582 | 0 | 2 | 6 | no |
| events | loaded | 4936 | 7594 | 0 | 5 | 2 | no |
| workflows | loaded | 6964 | 9622 | 0 | 1 | 2 | no |
| project-statuses | loaded | 5932 | 8587 | 0 | 1 | 1 | no |
| event-types | loaded | 4479 | 7144 | 0 | 85 | 1 | no |
| information-types | loaded | 4934 | 7608 | 0 | 136 | 1 | no |
| procurement | loaded | 3948 | 37962 | 0 | 9 | 0 | no |
| attachments | loaded | 4928 | 7585 | 0 | 1 | 1 | no |
| reports | loaded | 2933 | 5598 | 0 | 8 | 12 | no |
| users | loaded | 6428 | 9087 | 0 | 27 | 1 | no |
| departments | loaded | 2918 | 5573 | 0 | 8 | 1 | no |
| roles | loaded | 5423 | 8082 | 0 | 1 | 1 | no |
| permissions | loaded | 3920 | 6575 | 0 | 0 | 1 | no |
| audit | loaded | 3947 | 6606 | 0 | 1 | 1 | no |
| settings | loaded | 2928 | 5587 | 0 | 1 | 3 | no |
| admin | loaded | 5433 | 8090 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-17T18:09:07.567Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 12195 ms | 4313 ms | /د/س/ت/ر/س/ی/ /1/8/5/4/ /// /ر/و/ت/ر/ /2/4/5/9/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/7/9/9/m/s/×/1/,/ /g/e/t/A/l/l/:/6/7/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/6/3/7/m/s/×/1/ |
| /procurement/orders | 3949 ms | 1851 ms | /د/س/ت/ر/س/ی/ /1/2/7/8/ /// /ر/و/ت/ر/ /5/7/2/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/4/6/5/m/s/×/1/,/ /g/e/t/A/l/l/:/2/8/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/4/9/m/s/×/1/ |
| /procurement/needs | 4242 ms | 2331 ms | /د/س/ت/ر/س/ی/ /1/2/6/9/ /// /ر/و/ت/ر/ /1/0/6/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/5/1/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/5/8/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/2/8/1/m/s/×/1/ |
| /procurement/dashboard | 5999 ms | 2941 ms | /د/س/ت/ر/س/ی/ /1/9/8/0/ /// /ر/و/ت/ر/ /9/6/0/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/6/7/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/4/9/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/2/0/m/s/×/1/ |
| /procurement/workspace | 4939 ms | 3394 ms | /د/س/ت/ر/س/ی/ /2/0/5/9/ /// /ر/و/ت/ر/ /1/3/3/5/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/4/6/m/s/×/1/,/ /g/e/t/A/l/l/:/4/7/0/m/s/×/1/,/ /g/e/t/A/l/l/:/4/3/4/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
