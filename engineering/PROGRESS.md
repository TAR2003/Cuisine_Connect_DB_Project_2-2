# Progress

| Date | Ticket | Status | Notes |
|---|---|---|---|
| 2026-11-10 | — | Approved | Schema rebuild, password reset, and account disable are accepted. |
| 2026-11-10 | ENG-001 | DONE | Environment config, pool, single entry point. Unit tests passed. Oracle was not contacted. `npm install` did not finish in this environment, so the process-level boot was syntax-checked and the missing-env failure is covered by `loadConfig`. |

| 2026-11-10 | ENG-002 | DONE | httpOnly session, `/api/login`, `/api/logout`, `/api/me`, Vite proxy, relative API URLs. 10 unit tests passed. Oracle round-trip was not run. |
| 2026-11-10 | ENG-003 | DONE | Ownership checks, admin role via `/api/me`, account disable, password column omitted from the user list and profile query. |

| 2026-11-10 | ENG-004 | DONE | bcryptjs cost 12. `CHECK_PASS` and `ORA_HASH` are off the server. Password column widen script is in `database/rebuild/password_column.sql`. |

| 2026-11-10 | ENG-005 | DONE | Ordered rebuild scripts are in `database/rebuild/`. Static test passed. Oracle was not configured in this environment, so the schema was not applied and the seed printed "Seed not applied". |

| 2026-11-10 | ENG-006 | DONE | Registration, friend accept, share, and comment deletion commit once. Post ids come back with RETURNING. Both timeline friend branches require STATUS = 'A'. `MAX(POST_ID)` is gone. |

| 2026-11-10 | ENG-007 | DONE | Uploads stay in backend/uploads with a 5 MB allowlist. Identity routes live in backend/src/routes. The frontend calls one client. Express serves the static build when it exists. npm run check reports 0 errors. Session responses are { ok, data }. Other reads stay positional arrays because their pages still index them that way. Oracle was not started, so login in the browser was not exercised. |

| 2026-11-10 | ENG-008 | DONE | GitHub Actions runs backend unit tests and frontend svelte-check. Oracle is not part of the job. npm audit is recorded and does not fail the job. |

Current ticket: none. The schema was not applied. Oracle was not configured in this environment. |
