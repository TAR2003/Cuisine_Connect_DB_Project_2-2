
CREATE OR REPLACE FUNCTION CHECK_PASS(U VARCHAR2, E VARCHAR2) RETURN VARCHAR2 IS
  CNG VARCHAR2(128); -- Adjust the length as needed
  STO VARCHAR2(128); -- Adjust the length as needed
  RT VARCHAR2(1);    -- Only need 1 character for the return value
BEGIN 	
  SELECT "PASSWORD" INTO CNG FROM USERS WHERE USER_NAME = U;
  SELECT ORA_HASH(E) INTO STO FROM DUAL;
	
  
  IF CNG = STO THEN
    RT := '1';
  ELSE
    RT := '0';
  END IF;
  
  RETURN RT;
END;
/



CREATE TRIGGER "CUISINECONNECT"."INCREASE_REACT_COUNT" AFTER INSERT ON "CUISINECONNECT"."REACTS" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
POSTID NUMBER;
BEGIN 
POSTID := :NEW.POST_ID;
UPDATE POSTS SET REACT_COUNT = REACT_COUNT + 1 WHERE POST_ID = POSTID;
END ;
/


CREATE TRIGGER "CUISINECONNECT"."INCREASE_COMMENT_COUNT" AFTER INSERT ON "CUISINECONNECT"."COMMENTS" REFERENCING OLD AS "OLD" NEW AS "NEW" FOR EACH ROW 
DECLARE 
POSTID NUMBER;
BEGIN 
POSTID := :NEW.POST_ID;
UPDATE POSTS SET COMMENT_COUNT = COMMENT_COUNT + 1 WHERE POST_ID = POSTID;
END ;
/

CREATE TRIGGER NEW_USER 
AFTER INSERT 
ON USERS
for each row
DECLARE
N NUMBER;
BEGIN  
	N := :NEW.USER_ID;
	INSERT INTO ADMIN_LOG VALUES (ACTIVITY_ID_SEQ.NEXTVAL, 'Created an account', SYSDATE, N , null, NULL);
END ;
/

CREATE TRIGGER ADD_POST 
AFTER INSERT 
ON POSTS
FOR EACH ROW
DECLARE
U NUMBER;
BEGIN 
U := :NEW.USER_ID;
INSERT INTO ADMIN_LOG VALUES (ACTIVITY_ID_SEQ.NEXTVAL, 'Added a new post', SYSDATE, U , null, NULL);
end ;
/

CREATE TRIGGER ADD_ORDER 
AFTER INSERT 
ON FOODORDER
FOR EACH ROW
DECLARE
U NUMBER;
BEGIN 
U := :NEW.CUSTOMER_ID;
INSERT INTO ADMIN_LOG VALUES (ACTIVITY_ID_SEQ.NEXTVAL, 'Ordered a menu', SYSDATE, (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = U) , null, NULL);
end ;
/

CREATE TRIGGER ADD_MENU
AFTER INSERT 
ON MENU
FOR EACH ROW
DECLARE
U NUMBER;
BEGIN 
U := :NEW.RESTAURANT_ID;
INSERT INTO ADMIN_LOG VALUES (ACTIVITY_ID_SEQ.NEXTVAL, 'Added a menu', SYSDATE, (SELECT USER_ID FROM RESTAURANT WHERE RESTAURANT_ID = U) , null, NULL);
end ;
/



CREATE OR REPLACE
FUNCTION DELETE_POST(POSTID NUMBER) RETURN NUMBER IS
N NUMBER;
BEGIN 
INSERT INTO ADMIN_LOG VALUES (ACTIVITY_ID_SEQ.NEXTVAL,'DELETING POST' , SYSDATE,  (SELECT USER_ID FROM POSTS WHERE POSTID = POST_ID),'Function: DELETE_POST', NULL);
DELETE FROM POSTS WHERE POST_ID IN (SELECT POST_ID FROM SHARE_POST WHERE ORIGIN_ID = POSTID);
DELETE FROM POSTS WHERE POST_ID = POSTID;
N := 0;
RETURN N;
END ;
/




CREATE OR REPLACE PROCEDURE DELETE_LATE_RESERVATIONS
IS 
BEGIN 
	DELETE FROM RESERVATIONS WHERE TIME < SYSDATE;
END ;
/



CREATE OR REPLACE TRIGGER REACT_NOTIFICATION
AFTER INSERT ON REACTS
FOR EACH ROW
DECLARE
  P NUMBER;
  U NUMBER;
  V NUMBER;
  C NUMBER;
BEGIN
  P := :NEW.POST_ID;
  U := :NEW.USER_ID;

  -- Check if a notification already exists for this post
  SELECT COUNT(*) INTO C FROM POST_NOTIFICATION WHERE POST_ID = P;

  IF C = 0 THEN
    -- No existing notification, create a new one
    V := NOTIFICATION_ID_SEQ.NEXTVAL;
    INSERT INTO NOTIFICATION VALUES (V, (SELECT USER_ID FROM POSTS WHERE POST_ID = P), SYSDATE, 'U', 'P', (SELECT NAME FROM USERS WHERE USER_ID = U) || ' and ' || (SELECT REACT_COUNT FROM POSTS WHERE POST_ID = P) || ' other has reacted to your post');
    INSERT INTO POST_NOTIFICATION VALUES (V, P);
  ELSE
    -- Notification already exists, update it
    SELECT NOTIFICATION_ID INTO V FROM POST_NOTIFICATION WHERE POST_ID = P;
    UPDATE NOTIFICATION SET TIME = SYSDATE, STATUS = 'U', MESSAGE = ((SELECT NAME FROM USERS WHERE USER_ID = U) || ' and ' || (SELECT REACT_COUNT FROM POSTS WHERE POST_ID = P) || ' other has reacted to your post') WHERE NOTIFICATION_ID = V;
  END IF;
END;
/


CREATE OR REPLACE TRIGGER COMMENT_NOTIFICATION
AFTER INSERT ON COMMENTS
FOR EACH ROW
DECLARE
  P NUMBER;
  U NUMBER;
  V NUMBER;
  C NUMBER;
BEGIN
  P := :NEW.POST_ID;
  U := :NEW.USER_ID;

  -- Check if a notification already exists for this post
  SELECT COUNT(*) INTO C FROM POST_NOTIFICATION WHERE POST_ID = P;

  IF C = 0 THEN
    -- No existing notification, create a new one
    V := NOTIFICATION_ID_SEQ.NEXTVAL;
    INSERT INTO NOTIFICATION VALUES (V, (SELECT USER_ID FROM POSTS WHERE POST_ID = P), SYSDATE, 'U', 'P', (SELECT NAME FROM USERS WHERE USER_ID = U) || ' and ' || (SELECT COMMENT_COUNT FROM POSTS WHERE POST_ID = P) || ' other has commented to your post');
    INSERT INTO POST_NOTIFICATION VALUES (V, P);
  ELSE
    -- Notification already exists, update it
    SELECT NOTIFICATION_ID INTO V FROM POST_NOTIFICATION WHERE POST_ID = P;
    UPDATE NOTIFICATION SET TIME = SYSDATE, STATUS = 'U', MESSAGE = ((SELECT NAME FROM USERS WHERE USER_ID = U) || ' and ' || (SELECT COMMENT_COUNT FROM POSTS WHERE POST_ID = P) || ' other has commented to your post') WHERE NOTIFICATION_ID = V;
  END IF;
END;
/



CREATE OR REPLACE TRIGGER NEW_ORDER_NOTIFICATION
AFTER UPDATE ON FOODORDER
FOR EACH ROW
DECLARE
  O VARCHAR2(20);
  R NUMBER;
  V NUMBER;
  C NUMBER;
	RR NUMBER;
	CC NUMBER;
	OID NUMBER;
BEGIN
  O := :NEW.STATUS;
  RR := :NEW.RESTAURANT_ID;
	CC := :NEW.CUSTOMER_ID;
	OID := :NEW.ORDER_ID;
	
	SELECT USER_ID INTO C FROM CUSTOMER WHERE CUSTOMER_ID = CC;
	SELECT USER_ID INTO R FROM RESTAURANT WHERE RESTAURANT_ID = RR;
	IF O = 'I' THEN
	V := NOTIFICATION_ID_SEQ.NEXTVAL;
	INSERT INTO NOTIFICATION VALUES(V, C, SYSDATE, 'U','O', 'Your order is on the way');
	iNSERT INTO ORDER_NOTIFICATION VALUES (V, OID);
	
	ELSIF O = 'O' THEN
	V := NOTIFICATION_ID_SEQ.NEXTVAL;
	INSERT INTO NOTIFICATION VALUES(V, R, SYSDATE, 'U','O', 'A customer ordered a menu');
	iNSERT INTO ORDER_NOTIFICATION VALUES (V, OID);
	END IF ;

END;
/



CREATE OR REPLACE PROCEDURE COUNT_TRANSACTION_FOR_ALL(ANSWER OUT NUMBER) 
IS 
BEGIN 
SELECT SUM(TOTALPRICE) INTO ANSWER FROM FOODORDER;
END ;
/

CREATE OR REPLACE PROCEDURE COUNT_TOTAL_MENU_PRICE(ANSWER OUT NUMBER) 
IS 
BEGIN 
SELECT SUM(PRICE) INTO ANSWER FROM MENU;
END ;
/

CREATE OR REPLACE PROCEDURE COUNT_TRANSACTION(UID IN NUMBER , ANSWER OUT NUMBER) 
IS 
BEGIN 
SELECT SUM(TOTALPRICE) INTO ANSWER FROM FOODORDER WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = UID);
END ;
/


CREATE OR REPLACE PROCEDURE COUNT_MENU_TRANSACTION(UID IN NUMBER , ANSWER OUT NUMBER) 
IS 
BEGIN 
SELECT SUM(PRICE) INTO ANSWER FROM MENU WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = UID);
END ;
/






	
	