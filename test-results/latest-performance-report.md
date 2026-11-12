# PMS UI and Performance Audit

- Generated: 2026-11-12T16:41:07.331Z
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
| visibleFormsInventoried | 10 |
| dynamicFormsInventoried | 9 |
| formOpenersChecked | 13 |
| visibleButtonsInventoried | 51 |
| visibleInputsAndControlsInventoried | 42 |
| networkRequestsMeasured | 188 |
| procurementApiRequestsMeasured | 2 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 0 |
| failedNetworkRequests | 0 |
| consoleErrors | 0 |
| pageErrors | 0 |
| safeButtonChecks | 10 |
| failedSafeButtonChecks | 7 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| dashboard | loaded | 6494 | 9154 | 0 | 4 | 2 | no |
| projects | loaded | 4963 | 7619 | 0 | 1 | 2 | no |
| project-detail | loaded | 8107 | 10764 | 0 | 0 | 0 | no |
| print-design | loaded | 5424 | 8087 | 1 | 17 | 7 | no |
| print-output | loaded | 3923 | 6581 | 0 | 2 | 6 | no |
| events | loaded | 5472 | 8130 | 0 | 7 | 2 | no |
| workflows | loaded | 4415 | 7073 | 0 | 1 | 2 | no |
| project-statuses | loaded | 6432 | 9090 | 0 | 1 | 1 | no |
| event-types | loaded | 8118 | 10774 | 0 | 0 | 0 | no |
| information-types | loaded | 3927 | 6586 | 0 | 1 | 1 | no |
| procurement | loaded | 4921 | 72421 | 0 | 4 | 0 | no |
| attachments | loaded | 3927 | 6585 | 0 | 1 | 1 | no |
| reports | loaded | 3971 | 6635 | 0 | 8 | 12 | no |
| users | loaded | 8099 | 10754 | 0 | 0 | 0 | no |
| departments | loaded | 3909 | 6567 | 0 | 1 | 1 | no |
| roles | loaded | 4917 | 7573 | 0 | 1 | 1 | no |
| permissions | loaded | 8098 | 10754 | 0 | 0 | 0 | no |
| audit | loaded | 4918 | 7577 | 0 | 1 | 1 | no |
| settings | loaded | 3916 | 6578 | 0 | 1 | 3 | no |
| admin | loaded | 8098 | 10754 | 0 | 0 | 0 | no |

## Coverage gaps

- print-design: 1 submit control(s) inventoried but not submitted by the safe audit.
- Procurement diagnostic benchmark did not complete: page.waitForFunction: Timeout 60000ms exceeded.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
