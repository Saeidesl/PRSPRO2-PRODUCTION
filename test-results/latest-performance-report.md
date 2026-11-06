# PMS UI and Performance Audit

- Generated: 2026-11-06T19:37:29.849Z
- Base URL: https://saeidesl.github.io/PRSPRO2-PRODUCTION/
- Mode: authenticated-read-only
- Overall: **authenticated-audit-complete**

## Summary

| Metric | Result |
|---|---:|
| requestedRoutes | 1 |
| loadedRoutes | 1 |
| permissionDeniedRoutes | 0 |
| failedRoutes | 0 |
| mobileRoutesWithHorizontalOverflow | 0 |
| visibleFormsInventoried | 1 |
| dynamicFormsInventoried | 1 |
| formOpenersChecked | 1 |
| visibleButtonsInventoried | 7 |
| visibleInputsAndControlsInventoried | 2 |
| networkRequestsMeasured | 45 |
| procurementApiRequestsMeasured | 0 |
| procurementApiFailedRequests | 0 |
| procurementDiagnosticEndpointsMeasured | 0 |
| failedNetworkRequests | 0 |
| consoleErrors | 1 |
| pageErrors | 0 |
| safeButtonChecks | 1 |
| failedSafeButtonChecks | 0 |
| formSubmissionsExecuted | 0 |

## Routes

| Route | Status | Ready ms | Settled ms | Forms | Buttons | Controls | Mobile overflow |
|---|---|---:|---:|---:|---:|---:|---|
| events | loaded | 3943 | 6602 | 0 | 7 | 2 | no |

## Event form performance baseline

- Modal readiness: 907 ms
- Project/workflow readiness: 4860 ms
- Form definitions readiness: 9110 ms
- Warm backend form-definition request: 4035 ms
- Warm backend request timed out: no
- Project options: 2
- Eligible event types: 10
- Visible controls after selecting the event type: 2
- No form values were entered and no event was submitted.

| Endpoint | Browser | Backend | Repository / sheet details |
|---|---:|---:|---|
| No admin-only endpoint diagnostics captured | n/a | n/a | n/a |

## Coverage gaps

- None detected by automated inventory.

## Safety

- No form was submitted.
- Potentially destructive or data-changing buttons were not clicked.
- This report is an inventory/performance smoke test, not proof that every business workflow is functionally correct.
