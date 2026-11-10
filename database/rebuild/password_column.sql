-- Widen the password column so a bcrypt hash fits with room for a later algorithm.
-- The full rebuild in ENG-005 creates USERS.PASSWORD as VARCHAR2(255) directly.
-- This statement is for an existing disposable schema.

ALTER TABLE USERS MODIFY PASSWORD VARCHAR2(255);
