# Repository Audit — Cuisine Connect

| | |
|---|---|
| Audit date | 2026-11-10 |
| HEAD | `89c499fc7ff53982770a2e14ea1053f848388291` (`Update README.md`) |
| Branch | `main`, tracking `origin/main`, working tree clean |
| Method | Static reading of schema, SQL, backend, and frontend. The application was not executed. |
| Scope | Phase 0 and Phase 1 only. No application source was modified. No tickets were created. |

This audit separates **confirmed** findings (visible in the current files) from **hypotheses** (likely, but not proven by running the system).

---

## 1. Executive summary

Cuisine Connect is a second-year database course project that grew into a full-stack social and food-ordering application. The valuable part is the domain model: customers, restaurants, and foodie pages share one user table, and posts, reactions, reviews, follows, messages, orders, reservations, and an admin activity log are expressed as real relational tables, sequences, triggers, and PL/SQL routines. An Entity Relationship Diagram is committed with the schema.

The application around that schema is a single Express process (`backend/server.js`, about 4,100 lines, 92 `POST` routes) and a SvelteKit interface whose API access is concentrated in `frontend/src/functions.js` (about 2,050 lines, 89 calls to `http://localhost:3001`). There is a second, older `server.js` at the repository root (about 1,970 lines, 35 routes). There is no test suite, no CI, no `.gitignore`, and no environment-based configuration.

The system is not production-ready. Authentication is a client-side cookie that the browser sets after a password check. The API does not verify who is calling. An administrator session is the literal username `admin` and password `admin`, checked only in the login page. Database credentials are committed. Passwords are stored with Oracle `ORA_HASH`, which is not a password hash. Several write endpoints will change or delete any user's data if the caller supplies an id.

The README describes connection pooling, parameterized queries "throughout", role-based access control, file-upload controls, responsive UI, caching, and API documentation. Those claims do not match the implementation. Most SQL does use bind variables. That is a real strength and should be preserved.

**What to preserve:** the Oracle domain model, the ERD, bind variables, role-specific product behavior (customer / restaurant / page / admin views), and the existing feature surface (feed, friends, follows, pages, posts, reviews, menu, cart-as-order, reservations, messages, notifications).

**What a professionally engineered version of this software should be:** the same product, with a trustworthy schema, server-side sessions and authorization, secrets outside Git, one backend entry point split into modules, uploads outside the source tree, an API that returns named fields and real errors, and a small automated test suite that can rebuild the schema. It should not become a microservice platform. That would add operational cost without fixing the defects that matter.

Phase 2 (a full architecture proposal and roadmap) has not been written. It waits for an explicit decision on direction.

---

## 2. Phase 0 — repository safety

Confirmed:

- Repository root: `Cuisine_Connect_DB_Project_2-2`.
- Remote: `https://github.com/TAR2003/Cuisine_Connect_DB_Project_2-2.git`.
- Branch `main` is even with `origin/main`.
- `git status` reported a clean working tree. No user modifications needed preserving.
- Recent history is documentation and an ERD upload (`B1_05_ERD_Cuisine_Connect.pdf`). Earlier history is a series of "Add files via upload" commits and one "Delete src directory" commit.
- No `.env` files are tracked.
- Secrets are still present in tracked source and in `README.md` (see Security). This report names the files and the control weakness. It does not repeat the password values.
- No production deployment configuration exists in the repository. Nothing was deployed.

---

## 3. Technology stack

Confirmed from manifests and imports, not from filenames alone.

| Layer | What is actually used |
|---|---|
| Database | Oracle, accessed with `oracledb` `^6.0.3`. README states 19c and `localhost/ORCLPDB`. The server connects with a hardcoded user `CuisineConnect`. Version 19c was not verified against a running instance. |
| Schema | 20 tables in `create table.sql`. README says 19. |
| PL/SQL | `functions.sql`, `functins and procedures and trigers.sql`, plus sequences mixed into `ebnquery.sql`. |
| Backend | Node.js, Express `^4.18.2`, CORS `^2.8.5`, Multer `^1.4.5-lts.1`. No `engines` field and no `start` script. |
| Frontend | SvelteKit `^1.20.4`, Svelte `^4.0.5`, Vite `^4.4.2`, adapter-auto. Dependencies: `js-cookie`, `leaflet`, `intersection-observer`. |
| Maps | Leaflet script and CSS loaded from `unpkg.com` in `frontend/src/app.html` (Leaflet 1.7.1). Registration search calls the public Nominatim API directly from the browser (`frontend/src/routes/createaccount/Map.svelte`). |
| Auth | `CHECK_PASS` plus cookies written by the browser. No server session, no JWT, no auth middleware. |
| Build / format | Frontend scripts: `dev`, `build`, `preview`, `check`, Prettier `lint` / `format`. No Prettier config file. Backend has no scripts. |
| Tests | None. No Jest, Vitest, Playwright, Cypress, or SQL test harness. |
| CI/CD | No `.github` workflows, Dockerfile, or compose file. |
| Runtime requirement | A local Oracle instance with the schema, sequences, functions, and triggers installed, plus two Node processes. Frontend calls `http://localhost:3001` by absolute URL. |

Dependencies that do not match how Node works:

- `backend/package.json` depends on the npm packages `fs` and `path`. Both names are Node built-ins. The published `fs` package is a security placeholder, not a filesystem library. `require('fs')` and `require('path')` still bind the built-ins.
- `image-type` is listed and referenced by `getFileExtension` in `backend/server.js`, but it is never imported. That function is also never called.

`node_modules` is not committed. There is no `.gitignore`, so a local install would flood `git status`.

---

## 4. Repository structure

```
Cuisine_Connect_DB_Project_2-2/
├── README.md                         # aspirational; diverges from the code
├── B1_05_ERD_Cuisine_Connect.pdf
├── create table.sql                  # 20 tables, no sequences, no indexes
├── functions.sql                     # CHECK_PASS and id lookups, plus ad-hoc test blocks
├── functins and procedures and trigers.sql
├── ebnquery.sql                      # scratchpad: sequences, drops, sample DML, experiments
├── add.sql                           # timeline query drafts, not a clean seed script
├── drop tables - Copy.sql
├── server.js                         # older partial API, same credentials
├── index.html                        # leftover page; references missing src/index.js
├── backend/server.js                 # the real API, one file
├── backend/package.json
└── frontend/                         # SvelteKit app
    ├── src/functions.js              # almost every HTTP call
    ├── src/lib/index.js              # empty placeholder
    ├── src/routes/                   # pages; many are thin lists
    ├── src/public/images/            # uploaded and sample images inside source
    └── static/                       # actual SvelteKit static directory
```

About 125 tracked files. A large share of bytes is binary images under `frontend/src/public/images/` (individual files up to about 3 MB). SvelteKit serves `frontend/static`, not `src/public`. Upload handlers copy files into `../frontend/src/public/images/`.

Module boundaries are weak:

- HTTP routes, SQL, file IO, and startup live in one backend file.
- The frontend API client repeats the same `fetch` boilerplate once per operation.
- Pages reach into database row arrays by numeric index (`userinfo[11]` is the profile picture in `frontend/src/routes/user/+layout.svelte`).
- `frontend/src/lib` is unused.
- There is no `hooks.server.js`. SvelteKit is a client of the Express API, not the place where data access happens.

---

## 5. Current architecture

### 5.1 Request flow

1. The browser loads a SvelteKit route.
2. Login or registration calls Express, then `js-cookie` stores `username`, `userid`, and `usertype`.
3. Later pages read those cookies and post them in JSON bodies to `localhost:3001`.
4. Each backend function opens its own `oracledb.getConnection(dbConfig)`, runs one statement with `autoCommit: true`, closes the connection, and returns `rows`.
5. On failure the function logs to the console and returns `undefined`. Most routes still respond `200` with that value.
6. The UI renders positional arrays. Oracle `outFormat` is never set, so rows are arrays, not named objects.

There is no connection pool. The README's pooling claim is not implemented.

`app.listen` runs at the top of `backend/server.js` before routes are registered. Under load, early requests can arrive before the route table exists. This is a startup race, not a functional bug for local manual use.

### 5.2 Domain model

Twenty tables, grouped by role in the product:

- Identity: `USERS`, subtype tables `CUSTOMER`, `RESTAURANT`, `FOODIE_PAGE`.
- Social: `FRIEND_REQUEST`, `FOLLOW_LIST`, `PAGE_CONNECTION`, `POSTS`, `SHARE_POST`, `REACTS`, `COMMENTS`, `REVIEW_POST`, `MESSAGES`.
- Commerce: `MENU`, `FOODORDER` (status `'U'` is the shopping cart), `RESERVATIONS`.
- Ops: `NOTIFICATION`, `POST_NOTIFICATION`, `ORDER_NOTIFICATION`, `ADMIN_LOG`.

User type is a check constraint: `'C'`, `'R'`, `'P'`. Active status is `'A'` or `'D'`, but application code does not consult it.

Sequences (`USER_ID_SEQ` and ten others) are created inside `ebnquery.sql`, which also contains `DROP SEQUENCE` and experimental inserts. The README's setup order never tells the reader to run the sequence section. A clean install that follows the README will fail on the first `NEXTVAL`.

### 5.3 What the UI actually covers

Confirmed route tree:

- Public: `/`, `/login`, `/createaccount`, plus a stub `/login/nest`.
- Signed-in shell: `/user` and nested profile, friends, requests, messages, chat, notifications, posts, menu, reviews, nearby restaurants, cart, orders, reservations.
- Admin shell: `/Admin` and list pages for users, customers, restaurants, pages, menus, and orders. The guard is `if (username != 'admin') goto('/')` in `frontend/src/routes/Admin/+layout.svelte`.

Messaging is request/response. Opening a chat loads history once. Typing in the box calls `getmessages` on every `input` event (`frontend/src/routes/user/chat/[msgid]/+page.svelte`). There is no WebSocket and no timer. The README's "real-time messaging" is not implemented. Double-click refreshes the thread.

### 5.4 Architectural inconsistencies

Confirmed:

- Two API entry points (`server.js` and `backend/server.js`) with the same credential block and overlapping routes. The root file stops partway through the feature set. Either file can be started by mistake.
- `index.html` is a third, dead frontend.
- Cart rows, placed orders, and in-progress delivery share `FOODORDER` and a free-form `STATUS VARCHAR2(20)` with no check constraint. Status letters in code are `'U'`, `'O'`, `'P'`, `'I'`, `'D'`, `'R'`. The notification trigger only understands `'I'` and `'O'`.
- Registration inserts `USERS` and the subtype row in separate connections and separate commits (`insertUsers`, then `insertCustomer` / `insertRestaurant` / `insertPage`). A failure between them leaves a user with no role row.
- Friend accept updates the request and both friend counters as separate auto-committed statements.
- New post ids are recovered with `SELECT MAX(POST_ID) FROM POSTS` after insert (`addnewpost`, `addshare`, review posts). Two concurrent inserts can associate the file, the share row, or the review row with the wrong post.
- `DELETE_POST` is a stored function used as a procedure. It always returns `0`.
- `updaterestaurantrating` is declared twice in `backend/server.js` (around lines 2061 and 2715). The second declaration is the one that runs.
- `app.post('/api/getcurrentorders')` and `app.post('/api/getallorders')` are each registered twice. Express keeps the first registration. The copies are dead.
- `run` and `newuser` are scratch functions still shipped in the server. `POST /api/user` calls `run`.
- Timeline SQL is copied from `add.sql` into three backend functions. `add.sql` still contains invalid fragments such as `C:userid_ID`. The live customer timeline fixed that token to `C1_ID`, but one branch filters `STATUS = 'A'` and the other does not (see code quality).

---

## 6. Critical architectural problems

### A1 — CRITICAL — The API trusts the client

Confirmed. No route reads a session, an `Authorization` header, or a server-side user. Examples:

- `POST /api/deleteaccount` deletes `USERS` for whatever `userid` is in the body (`deleteaccount`).
- `POST /api/updatepassword` sets `PASSWORD = ORA_HASH(:password)` for whatever `userid` is in the body. The password-change dialog checks the current password in the browser, then calls this endpoint. The check is not repeated on the server (`passwordchange.svelte`, `updatepassword`).
- `POST /api/delivered`, `/api/ontheway`, `/api/preparing`, cart mutations, `/api/addmenu`, `/api/insertmessage`, `/api/deletepost`, and `/api/updatepost` behave the same way.
- Admin reads (`/api/getallusers`, `/api/getadminlog`, `/api/getallorders1`, transaction totals) are ordinary POST endpoints.

The cookie check on `/user` and `/Admin` only hides buttons. It is not an authorization boundary.

### A2 — CRITICAL — Administrator access is a frontend string compare

Confirmed in `frontend/src/routes/login/+page.svelte`: if the typed username and password are both `admin`, the page sets `Cookies.set('username', 'admin')` and navigates to `/Admin`. It does not `return`, so it also continues into the real `CHECK_PASS` call. There is no `USERS` row and no server role for this administrator. Anyone can set that cookie, or skip the UI and call the admin endpoints.

### A3 — HIGH — Identity, profile, and file rows are not one transaction

Confirmed in `/save-data` and `insertUsers`. The user row commits before the subtype row. The insert calls `USER_ID_SEQ.NEXTVAL` three times in one statement. In Oracle, repeated `NEXTVAL` of the same sequence in a single SQL statement returns the same value, so the stored path and the key match. That part is correct. The Node code then names the copied files from a second query (`SELECT USER_ID ... WHERE USER_NAME = :username`). If the insert fails, the handler can still attempt to copy files, and the registration page still writes cookies and navigates to `/user` after the `fetch` `try/catch`, including when the upload failed (`createaccount/+page.svelte`).

### A4 — HIGH — Schema objects required at runtime are not in the schema script

Confirmed. `create table.sql` defines tables only. Sequences live in the scratch file `ebnquery.sql`. Triggers and `DELETE_POST` live in a misspelled file that also redefines `CHECK_PASS`. `functions.sql` defines `CHECK_PASS` again and then runs anonymous blocks. `RESERVE_ID_SEQ` is created and never used; `RESERVATIONS` has no surrogate key.

### A5 — MEDIUM — God modules hide the real boundaries

Confirmed. A change to orders, auth, or posts all edits the same 4,100-line file and the same 2,050-line client. That is the main reason a blind "improve the repository" pass would be unsafe.

---

## 7. Code quality assessment

### Confirmed strengths

- The majority of application SQL uses bind variables, including search (`LIKE UPPER(:u)` with the wildcard appended in JavaScript).
- Foreign keys use `ON DELETE CASCADE` in a consistent direction from `USERS` downward.
- Check constraints exist for user type, active flag, friend-request status, notification status and type, post type, and rating upper bounds.
- Triggers maintain reaction and comment counters, write `ADMIN_LOG` for new users, posts, orders, and menu rows, and build grouped reaction/comment notifications.
- Subtype tables keep customer, restaurant, and page data out of one wide table.
- The customer timeline query is a real piece of relational work: own posts, friends, followed restaurants, reviews of those restaurants, and connected pages.
- Frontend features are decomposed into route folders and small components (`post.svelte`, `menublock.svelte`, `orderblock.svelte`), even though data access is not.

### Confirmed defects

| Severity | Finding | Evidence |
|---|---|---|
| HIGH | Errors are swallowed. Callers cannot tell "no row" from "database down". | The repeated `catch (err) { console.error... }` pattern, then `return result` which is still undefined. Routes answer `res.json(data)` anyway. |
| HIGH | Multi-step writes are not transactions. | Friend accept, registration, post-plus-share, review-plus-rating. Each statement uses `autoCommit: true` on its own connection. |
| HIGH | `SELECT MAX(POST_ID)` is used as an identity. | `addnewpost` around line 1393, and the same pattern in share and review inserts. |
| MEDIUM | Customer feed treats one direction of `FRIEND_REQUEST` differently. | `getcustomertimeline`: the `C2_ID` branch requires `STATUS = 'A'`; the `C1_ID` branch does not. Pending outbound requests can appear as friendships in the feed. |
| MEDIUM | Comment deletion decrements the counter using the comment row, then deletes the comment. The order happens to work only because both statements share one connection before close. A failure on the delete still commits the decrement (`autoCommit: true` on the first execute). | `deletecomment` executes the `UPDATE` before the `DELETE`. |
| MEDIUM | Reaction and comment triggers increment on insert and do not decrement on delete. Application code decrements manually, and only on some paths. | `INCREASE_REACT_COUNT`, `INCREASE_COMMENT_COUNT`. `removereact` has its own `UPDATE`. There is no matching delete trigger. |
| MEDIUM | `DELETE_POST` logs with a subquery that reads the post, then deletes it. If the post id does not exist, the function raises `NO_DATA_FOUND` before the delete. Share cleanup depends on deleting share posts before the origin because both FKs are `ON DELETE CASCADE` only for `SHARE_POST`, not for the other `POSTS` row. | `DELETE_POST` in the procedures file. |
| MEDIUM | Positional coupling. | Admin user list reads `l[0]`, `l[1]`, `l[5]`, `l[6]`. Profile photos use index `11`. Adding a column silently breaks the UI. `SELECT *` is the contract. |
| MEDIUM | Registration and login duplicate the `@` prefix in several places and special-case the string `admin` only in the browser. | `createaccount/+page.svelte`, `functions.js` `getAuthentication`. |
| LOW | Dead code and debug leftovers. | `run`, `newuser`, `picname`, `let a = 120`, duplicate routes, duplicate `updaterestaurantrating`, unused `getFileExtension`, root `index.html`, `/login/nest` ("is nesrt page"), red 1px border and a fixed `1900px` by `934px` shell in `+layout.svelte`. |
| LOW | Naming and repo hygiene. | `functins and procedures and trigers.sql`, `drop tables - Copy.sql`, `ebnquery.sql` used as both DDL and a notebook. |
| INFO | Layout is a desktop canvas, not a responsive app. | Fixed pixel widths, 50–80px font sizes on login, `flex-direction: column, row` which is invalid CSS (the comma makes the declaration drop). |

`POST /api/user` builds SQL by concatenation:

```909:910:backend/server.js
    const sqlQuery = 'select * FROM USERS where USER_ID = ' + a;
    result = await connection.execute(sqlQuery);
```

That is the one confirmed injection sink. Other inspected statements pass binds. The README statement that parameterization is universal is false, but it is close.

Hypothesis, not executed: `getFileExtension` throws `ReferenceError` if it is ever called, because `imageType` is not defined. Nothing in the file calls it today.

---

## 8. Security assessment

No intrusive testing was performed. Findings below are from reading the code. The repository is public on GitHub, so committed secrets should be treated as already disclosed.

| Severity | Finding | Evidence |
|---|---|---|
| CRITICAL | Database username and password are hardcoded and documented. | `dbConfig` in `backend/server.js` (lines 27–31) and the same block in root `server.js`. README section "Configure Database Connection" prints the password. |
| CRITICAL | No server-side authentication or authorization. | Section A1. |
| CRITICAL | Hardcoded admin backdoor in the client. | Section A2. |
| HIGH | Password storage is `ORA_HASH`. | `CHECK_PASS` and `INSERT` / `UPDATE` statements. `ORA_HASH` is a fast, unsalted, non-cryptographic bucket function with a 32-bit space. It is not a password hash. Equality against the `VARCHAR2` column depends on implicit conversion. |
| HIGH | Password verifier and password column are returned to clients. | `getUserinfoid` is `SELECT * FROM USERS`. The profile shell calls it for the logged-in user. `getallusers` is also `SELECT *` and is reachable without an admin check. The admin page happens not to render column index 3; the JSON still contains it. |
| HIGH | Password change does not require the old password on the server, and the new password is logged. | `updatepassword` logs `userid` and the plaintext password: `console.log(' here in the unvkton ' + userid + " " + password)`. |
| HIGH | Account deletion, order status changes, and post edits are unauthenticated. | Route handlers listed in A1. |
| HIGH | Uploads have no size limit, no content-type allowlist, and no safe basename. | `multer({ dest: 'uploads/' })` and `path.extname(originalname)`. Files are copied into the frontend source tree using the extension the client supplied. |
| MEDIUM | CORS is `app.use(cors())` with no origin allowlist. Combined with cookie-free bearer-less POSTs, any website can call the API if the server is reachable. | `backend/server.js` line 17. |
| MEDIUM | Login failure and database failure are hard to distinguish, and the login page logs the typed password. | `console.log(username + ' ' + password)` in `login/+page.svelte`. `CHECK_PASS` raises `NO_DATA_FOUND` when the username is missing; the Node `catch` turns that into `undefined`. |
| MEDIUM | `ACTIVE_STATUS` is never checked. A deleted or disabled user is not a concept the API enforces. Deletion is a hard `DELETE FROM USERS`, which cascades into `ADMIN_LOG` and destroys the audit trail. | `deleteaccount`; `ADMIN_LOG` foreign key `ON DELETE CASCADE`. |
| MEDIUM | Sample and scratch SQL contain plaintext passwords and ad-hoc updates. | `ebnquery.sql` inserts such as `'JANINA1'` and an `UPDATE` that sets `PASSWORD = '909'`. These are not the application hash path. Running the scratch file against a real schema is unsafe. |
| LOW | Nominatim is called from the browser with a query string. That is appropriate for a demo. It has no caching, no error surface for the user, and it depends on a third-party availability and usage policy. | `Map.svelte`. |
| INFO | `fs` and `path` npm dependencies are unnecessary. They are not, by themselves, a remote code execution bug. `require('fs')` resolves to Node's built-in. | `backend/package.json`. |

The README's security section ("SQL injection prevention throughout", "frontend and backend validation", "controlled file types") overstates the controls that exist. Frontend `isReady()` checks non-empty fields. It does not check email shape, phone length beyond `length < 1`, password strength, or file type.

---

## 9. Performance and scalability assessment

No load test was run. There is no baseline measurement. The following are structural limits, not invented timings.

Confirmed:

- One new Oracle session per query, including queries that are only reads, with `autoCommit: true` on reads. This will exhaust the database session limit long before CPU does.
- Chat refetch on every keystroke multiplies that cost.
- Nearby restaurants sorts every restaurant user by a correlated `POWER` distance expression with no bounding box and no index. Acceptable for a class dataset. It will not stay acceptable if `USERS` grows.
- Customer timeline is a large `UNION` of nested subqueries, repeated bind of the same user id, and no supporting indexes. `create table.sql` defines primary keys only. Oracle indexes those primary keys. Foreign keys used in the joins (`CUSTOMER.USER_ID`, `POSTS.USER_ID`, `FOODORDER.CUSTOMER_ID`, and others) are not indexed.
- `SELECT *` joins in admin order listing pull every column of users, restaurants, menus, and orders in one statement (`getallorders1`).
- Images up to multiple megabytes are committed and would be copied into `src/` at runtime. There is no resizing.
- The fixed 1900px layout does not fail functionally on a phone; it fails as a layout. Horizontal overflow is the expected result.

Not claimed: caching, lazy-loaded routes beyond what SvelteKit does by default, or "minimal trigger overhead". Several triggers run extra queries per reaction, including a count and a message rewrite.

---

## 10. Testing and reliability assessment

Confirmed:

- There are zero automated tests.
- There is no CI configuration to fail a bad commit.
- Frontend `npm run check` and `npm run build` were not run. `node_modules` is absent, and installing it was out of scope for a read-only audit.
- The API was not started. Doing so requires a local Oracle database that is not part of this workspace. A startup without that database would report connection errors and still listen, because `getConnection` happens per request rather than at boot.
- Scratch SQL files are not deterministic tests. `ebnquery.sql` mixes DDL, DML, and drops.
- Several functions return a constant or ignore the outcome (`DELETE_POST` returns `0`; many handlers respond with `''`). A green manual click-through can hide a failed statement.

Baseline before any future change: **no passing suite exists, because no suite exists.** Do not treat "the page loaded on a developer machine" as a baseline. The first testing milestone should record schema install, login, post, order, and authorization failures as executable checks.

---

## 11. Documentation assessment

`README.md` is long and is the only real document. It correctly names the product, the three user types, the main tables, and the local ports (`3001` and `5173`).

It is not a reliable description of the software:

| README claim | What the code does |
|---|---|
| 19 tables | 20 tables |
| Connection pooling | `getConnection` per call |
| Auto-commit "for data integrity" | Auto-commit prevents multi-statement integrity |
| Parameterized queries throughout | True for almost all statements; false for `run` |
| Role-based access control | UI `if` on a cookie |
| Controlled upload types | No filter |
| Responsive, mobile-first UI | Fixed 1900×934 shell |
| API reference, error-code reference, function reference | Not in the repository |
| Component lazy loading and API caching | Not implemented |
| Prettier configuration | Prettier is a devDependency; no config file |
| `add.sql` is sample data | It is a query notebook |
| Root `server.js` is an alternative entry point | It is a stale subset and will silently lack later features |

`frontend/README.md` is the unmodified `create-svelte` text.

The ERD PDF is present and should stay. Inline comments in SQL are section numbers ("FIFITH", "EIGHTTH") rather than design notes. Skipped numbers (sixteenth through eighteenth) show tables were removed or never written. `MESSAGES.CONTENT` is unused by `insertmessage`, which writes `NULL` into that column and stores the text in `CAPTION`.

---

## 12. Technical debt inventory

Ordered by leverage, not by line count.

1. **Trust boundary.** Server does not know who the caller is.
2. **Secrets in Git.** Database password in two servers and the README. Admin password in the client. Plaintext password logging.
3. **Password function.** `ORA_HASH` cannot be upgraded later without a reset or a dual-read period. Decide this before any production data exists.
4. **Schema source of truth.** Tables, sequences, functions, triggers, and seeds are split across notebook files. Setup order in the README is incomplete.
5. **Missing constraints.** No unique `USER_NAME` or `EMAIL`. No status check on `FOODORDER`. No self-friend or duplicate-direction protection on `FRIEND_REQUEST`. `RESERVATIONS` primary key `(CUSTOMER_ID, RESTAURANT_ID)` allows one reservation per pair, ever, until deleted. `MESSAGES` primary key includes `TIME` at second resolution, so two messages in the same second between the same pair fail or collide. `MENU` is keyed by `(MENU_ID, RESTAURANT_ID)` while `MENU_ID` comes from a global sequence; the composite key does not match how the API looks up menu rows by `MENU_ID` alone.
6. **Cart modeled as an order.** Workable for the course. It makes status codes and "delete from cart" mean "delete an order row".
7. **Monolithic server and client.**
8. **Stale second server, dead routes, dead functions.**
9. **Binary assets and missing `.gitignore`.**
10. **No tests and no CI.**
11. **Positional `SELECT *` contracts.**
12. **Upload path inside `frontend/src`.**
13. **Audit log that deletes itself** when the user is deleted.
14. **Dependency age.** SvelteKit 1 and Vite 4 were current when the project was scaffolded (package metadata matches 2023). They are not the reason the product fails. Upgrading them is optional and should not lead the roadmap.
15. **README drift.** Dangerous because a future change will "implement" features the README already claims exist.

---

## 13. Existing strengths worth preserving

- The product idea is coherent: one account system, three public roles, social graph plus restaurant operations.
- The relational design is the asset. Do not throw it out for an ORM rewrite or a microservice split.
- Bind variables are the default habit. Keep that habit and close the one concatenation exception.
- Triggers for counters, notifications, and admin activity are legitimate database work for this course and still useful in a cleaned-up system.
- Role-specific navigation (friends only for customers, menu creation for restaurants, pending orders vs current orders) matches the domain, even though it is enforced in the wrong layer.
- The timeline query, nearby sort, and review-to-rating update show the author learned the SQL the course asked for. Those queries should be moved into tested views or procedures, not deleted.
- The ERD and the table list, once corrected, are the right documentation seed.
- Feature coverage is wide for a student project: registration with a map, posts with and without images, reactions, comments, shares, reviews, follows, page connections, cart, order status, reservations, inbox, notifications, and an admin browser.

---

## 14. Risks and unknowns

| Item | Status |
|---|---|
| Whether a local Oracle instance currently matches these scripts | Unknown. Not connected during this audit. |
| Whether `ORA_HASH` values already stored would match `CHECK_PASS` for the seeded users | Unknown. Scratch inserts store plaintext; the app stores `ORA_HASH`. Both may exist in a database that was loaded from `ebnquery.sql`. |
| Whether uploaded images are visible in `npm run dev` | Hypothesis: paths under `frontend/src/public` are not SvelteKit static files, so `<img src="/src/public/images/...">` fails except where a file was also copied to `static/` or the dev server happens to resolve it. Not verified in a browser. |
| SvelteKit production build | Not run. |
| npm audit / dependency CVEs | Not run. Lockfiles exist (`frontend/package-lock.json`, `backend/package-lock.json`) but `npm audit` needs an install. |
| Exact Oracle version | Documented as 19c, not observed. |
| Intended production audience | The README says educational. Recommendations below assume the goal is a maintainable, privately deployable course project, not a public multi-tenant service. If the goal is only to submit the course, several production items can stay deferred. That choice belongs to you. |

---

## 15. Prioritized recommendations

These are recommendations, not an approved plan. No implementation should start from this list until you choose a direction.

### P0 — do before any feature work

1. Stop treating the README as the specification. This audit is the current description.
2. Rotate the database password. Remove it from source and from the README. Read it from the environment. Do not commit the new value.
3. Add a `.gitignore` for `node_modules`, `uploads`, local env files, and editor junk. Decide whether the large sample images stay in Git.
4. Pick one server file. The root `server.js` and root `index.html` are hazards.
5. Add server-side authorization: a real session, every mutating route checks the caller, admin routes check an admin role stored in the database, and `SELECT` lists omit `PASSWORD`.

### P1 — make the system honest and recoverable

6. Replace `ORA_HASH` with a salted password hash. Because this is Oracle-backed, the hash can be computed in Node (`bcrypt` or `scrypt`) and stored as a string. Existing course passwords would need a reset. That is acceptable if there is no real user data.
7. Collapse schema creation into ordered, rerunnable scripts: tables, constraints, sequences, functions, triggers, seed. Take sequences out of the scratch file. Stop using `ebnquery.sql` as an installer.
8. Add the missing unique keys and check constraints. Give messages and reservations stable ids if more than one row per pair must exist.
9. Return named JSON and non-200 responses on database failure. Stop logging passwords.
10. Put uploads in a directory outside `src`, with a size limit and an extension allowlist. Serve that directory explicitly.
11. Introduce a minimum test set: schema applies; signup creates both rows; wrong password fails; one user cannot delete another; a post id is the id Oracle returned, not `MAX`.

### P2 — structure, after the boundary is real

12. Split `backend/server.js` by domain (identity, social, commerce, admin) without changing behavior. One shared connection helper with a pool.
13. Replace `functions.js` with one client that knows the base URL from configuration and does not repeat headers.
14. Map rows to objects once, at the server, and delete numeric indexes from components.
15. Fix the customer-timeline status filter, the comment-count transaction, and the post-id race while tests cover them.
16. Rewrite the README so it matches install steps, ports, and the controls that actually exist.

### Explicitly not recommended yet

- Microservices, a new frontend framework, or a cloud migration. The README lists these as future work. They do not repair authorization, schema drift, or the missing tests.
- Replacing Oracle. The database is the point of the project. Portability can be a later decision.
- A visual redesign before the session model exists. The fixed layout is real debt, and it is not the first failure mode.

### What the professional version looks like

A single Node API and the current SvelteKit UI, talking to the same Oracle schema. Configuration comes from the environment. Sessions are httpOnly cookies issued by the server. Routes enforce customer, restaurant, page, and admin rules. Passwords are salted hashes and never selected. SQL stays bind-variable based, with a few tested procedures for the timeline, ratings, and deletes. Schema files can rebuild a database from empty. Uploaded images live outside the source tree. A CI job installs dependencies, applies the schema to a disposable database or runs the SQL checks that do not need one, and executes API tests. Git history grows one verified change at a time. The educational design — subtypes, triggers, and relational feeds — remains visible, because that is the part worth keeping.

---

## 16. Stop

Phase 1 ends here. No application source was changed by the audit.

Direction chosen after the audit: a privately deployable product on the same Oracle schema and SvelteKit UI. The target state is [ARCHITECTURE_PROPOSAL.md](ARCHITECTURE_PROPOSAL.md), approved on 2026-11-10. The schema may be rebuilt, passwords may be reset, and account deletion becomes a disable. Ticket order is in [ROADMAP.md](ROADMAP.md).
