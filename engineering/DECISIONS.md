# Decisions

## ADR-001 — Rebuild the Oracle schema

Date: 2026-11-10. Status: accepted.

The connected schema is course data and may be rebuilt. `database/rebuild/` is destructive and is for an empty or disposable Oracle user. It is not applied from this workspace unless a local connection is actually available.

## ADR-002 — Reset passwords to bcrypt

Date: 2026-11-10. Status: accepted.

Existing `ORA_HASH` passwords may be reset. Login verifies a bcrypt hash in Node. `CHECK_PASS` is not left on the request path.

## ADR-003 — Disable account instead of hard delete

Date: 2026-11-10. Status: accepted.

The user-facing delete sets `ACTIVE_STATUS = 'D'` and revokes sessions. `ADMIN_LOG` is kept. The log foreign key uses `ON DELETE SET NULL` so a later purge cannot erase it by cascade.

## ADR-004 — Approved target

Date: 2026-11-10. Status: accepted.

[ARCHITECTURE_PROPOSAL.md](ARCHITECTURE_PROPOSAL.md) is approved for implementation in ticket order ENG-001 through ENG-008. No microservices, no Oracle replacement, no SvelteKit upgrade, and no visual redesign in this program.
