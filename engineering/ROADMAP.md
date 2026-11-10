# Roadmap

Approved target: privately deployable Cuisine Connect. One Node API, the current SvelteKit UI, the same Oracle product. Implementation order:

| ID | Title | Depends on | Status |
|---|---|---|---|
| ENG-001 | Secrets, pool, and a single entry point | — | DONE |
| ENG-002 | httpOnly session and same-origin API | ENG-001 | DONE |
| ENG-003 | Authorization and account disable | ENG-002 | DONE |
| ENG-004 | bcrypt password storage | ENG-003 | DONE |
| ENG-005 | Ordered schema rebuild | ENG-004 | READY |
| ENG-006 | Transactional writes and returned ids | ENG-005 | BACKLOG |
| ENG-007 | API shape, uploads, modules, README | ENG-006 | BACKLOG |
| ENG-008 | CI for unit tests and svelte-check | ENG-007 | BACKLOG |

A ticket moves to READY only when its dependency is DONE. Work is one ticket at a time.
