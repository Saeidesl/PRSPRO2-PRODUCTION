# PMS UI and Performance Audit

- Generated: 2026-11-13T16:35:48.810Z
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
| networkRequestsMeasured | 314 |
| procurementApiRequestsMeasured | 6 |
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
| dashboard | loaded | 4984 | 7647 | 0 | 4 | 2 | no |
| projects | loaded | 4433 | 7092 | 0 | 1 | 2 | no |
| project-detail | loaded | 3425 | 6084 | 0 | 2 | 0 | no |
| print-design | loaded | 4436 | 7100 | 1 | 17 | 7 | no |
| print-output | loaded | 3928 | 6586 | 0 | 2 | 6 | no |
| events | loaded | 3928 | 6586 | 0 | 5 | 2 | no |
| workflows | loaded | 3939 | 6597 | 0 | 1 | 2 | no |
| project-statuses | loaded | 3946 | 6604 | 0 | 1 | 1 | no |
| event-types | loaded | 3914 | 6581 | 0 | 85 | 1 | no |
| information-types | loaded | 3917 | 6575 | 0 | 1 | 1 | no |
| procurement | loaded | 4914 | 30313 | 0 | 9 | 0 | no |
| attachments | loaded | 6455 | 9111 | 0 | 1 | 1 | no |
| reports | loaded | 6448 | 9109 | 0 | 8 | 12 | no |
| users | loaded | 5414 | 8073 | 0 | 1 | 1 | no |
| departments | loaded | 4944 | 7602 | 0 | 8 | 1 | no |
| roles | loaded | 4446 | 7105 | 0 | 21 | 1 | no |
| permissions | loaded | 3415 | 6074 | 0 | 0 | 1 | no |
| audit | loaded | 3919 | 6576 | 0 | 1 | 1 | no |
| settings | loaded | 3912 | 6570 | 0 | 1 | 3 | no |
| admin | loaded | 4433 | 7090 | 0 | 3 | 2 | no |

## Procurement backend diagnostics

- Measured at: 2026-11-13T16:38:37.832Z
- Captured endpoints: 5

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| /procurement/reports | 5037 ms | 3952 ms | /د/س/ت/ر/س/ی/ /1/6/7/0/ /// /ر/و/ت/ر/ /2/2/8/2/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/1/0/4/5/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/8/9/0/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/7/2/m/s/×/1/ |
| /procurement/orders | 2936 ms | 1988 ms | /د/س/ت/ر/س/ی/ /1/5/0/6/ /// /ر/و/ت/ر/ /4/8/1/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/6/4/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/4/3/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/4/0/5/m/s/×/1/ |
| /procurement/needs | 4086 ms | 2806 ms | /د/س/ت/ر/س/ی/ /1/8/8/6/ /// /ر/و/ت/ر/ /9/1/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/7/2/3/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/6/6/m/s/×/1/,/ /f/i/n/d/B/y/I/d/:/5/0/3/m/s/×/1/ |
| /procurement/dashboard | 4435 ms | 3136 ms | /د/س/ت/ر/س/ی/ /1/7/5/5/ /// /ر/و/ت/ر/ /1/3/8/0/ /// /S/h/e/e/t/s/:/ /g/e/t/A/l/l/:/9/1/6/m/s/×/1/,/ /g/e/t/A/l/l/:/6/4/2/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/5/1/5/m/s/×/1/ |
| /procurement/workspace | 4409 ms | 2996 ms | /د/س/ت/ر/س/ی/ /2/2/8/7/ /// /ر/و/ت/ر/ /7/0/9/ /// /S/h/e/e/t/s/:/ /f/i/n/d/B/y/I/d/:/8/0/0/m/s/×/1/,/ /g/e/t/A/l/l/:/7/3/7/m/s/×/1/,/ /g/e/t/H/e/a/d/e/r/s/:/4/2/9/m/s/×/1/ |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
