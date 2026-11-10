-- Session table for httpOnly login.
-- ENG-005 folds this into the ordered rebuild. The server also creates the table
-- at startup when it is missing (Oracle name-exists error -955 is ignored).

BEGIN
  EXECUTE IMMEDIATE '
    CREATE TABLE SESSIONS (
      SESSION_ID VARCHAR2(64) PRIMARY KEY,
      USER_ID NUMBER NOT NULL,
      CREATED_AT DATE NOT NULL,
      EXPIRES_AT DATE NOT NULL,
      CONSTRAINT SESSIONS_USER_FK FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE
    )';
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE != -955 THEN
      RAISE;
    END IF;
END;
/
