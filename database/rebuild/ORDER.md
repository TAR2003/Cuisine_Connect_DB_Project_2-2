# Rebuild order

Run these against an empty or disposable Oracle user, in this order:

1. `00_drop.sql`
2. `01_tables.sql`
3. `02_indexes.sql`
4. `03_sequences.sql`
5. `04_routines.sql`
6. `node seed.js` from this directory, with `backend/.env` containing `SEED_PASSWORD` and the Oracle settings

`sessions.sql` and `password_column.sql` are notes for an existing database. The ordered rebuild already creates `SESSIONS` and a `VARCHAR2(255)` password column. Scratch files in `database/scratch/` are not part of this installer.

The seed stores bcrypt hashes. It does not write the development password into SQL.
