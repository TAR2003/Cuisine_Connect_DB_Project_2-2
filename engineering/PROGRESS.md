# Progress

| Date | Ticket | Status | Notes |
|---|---|---|---|
| 2026-11-10 | — | Approved | Schema rebuild, password reset, and account disable are accepted. |
| 2026-11-10 | ENG-001 | DONE | Environment config, pool, single entry point. Unit tests passed. Oracle was not contacted. `npm install` did not finish in this environment, so the process-level boot was syntax-checked and the missing-env failure is covered by `loadConfig`. |

| 2026-11-10 | ENG-002 | DONE | httpOnly session, `/api/login`, `/api/logout`, `/api/me`, Vite proxy, relative API URLs. 10 unit tests passed. Oracle round-trip was not run. |
| 2026-11-10 | ENG-003 | DONE | Ownership checks, admin role via `/api/me`, account disable, password column omitted from the user list and profile query. |

| 2026-11-10 | ENG-004 | DONE | bcryptjs cost 12. `CHECK_PASS` and `ORA_HASH` are off the server. Password column widen script is in `database/rebuild/password_column.sql`. |

Current ticket: ENG-005. Next: ENG-005.
