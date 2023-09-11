INSERT INTO USERS VALUES(1,'newuser1','user1', 'JANINA1', 'uradhu1r1@gmail.com','P',
'01010111111', NULL, NULL, 'C://USRRES1.JPG', 'C://K1.JPG');
INSERT INTO USERS VALUES(3,'newuser3','user2', 'JANINA2', 'uradhu2r@gmail.com','P',
'01010101011', NULL, NULL, 'C://USRRES2.JPG', 'C://K2.JPG');

INSERT INTO USERS VALUES(USER_ID_SEQ.NEXTVAL, ( '@' || DBMS_RANDOM.STRING('U',3) || USER_ID_SEQ.NEXTVAL), ('USER' || USER_ID_SEQ.NEXTVAL), ORA_HASH('PASSWORD' || USER_ID_SEQ.NEXTVAL), ('UR' || USER_ID_SEQ.NEXTVAL || '@GMAIL.COM'), 'C', '01010101011', NULL, NULL, SYSDATE, 'A', ('profilephoto' || USER_ID_SEQ.NEXTVAL || '.JPG'), NULL);

SELECT * FROM USERS;
SELECT * FROM USERS WHERE USER_ID = 1

INSERT INTO MESSAGES VALUES (3,1,'yee1661eee', NULL, SYSDATE);

SELECT * FROM MESSAGES order BY TIME;

DELETE FROM USERS WHERE USER_ID = 12;

UPDATE MESSAGES 

SELECT USER_ID FROM USERS WHERE USER_NAME = '@VOE1'

select *
FROM USERS, MESSAGES
ORDER BY TIME;


select * from FOODIE_PAGE

SELECT * FROM CUSTOMER
SELECT * FROM RESTAURANT


CREATE SEQUENCE USER_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE CUSTOMER_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE RESTAURANT_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE POST_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE PAGE_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE COMMENT_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;


CREATE SEQUENCE MENU_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE ORDER_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE RESERVE_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE NOTIFICATION_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;

CREATE SEQUENCE ACTIVITY_ID_SEQ 
INCREMENT BY 1 
START WITH 1000001
MAXVALUE 99999999999999
NOCYCLE ;



drop sequence USER_ID_SEQ;
drop sequence CUSTOMER_ID_SEQ;
drop sequence RESTAURANT_ID_SEQ;
drop sequence PAGE_ID_SEQ;
drop sequence POST_ID_SEQ;
drop sequence COMMENT_ID_SEQ;
drop sequence ORDER_ID_SEQ;
drop sequence MENU_ID_SEQ;
drop sequence RESERVE_ID_SEQ;
drop sequence NOTIFICATION_ID_SEQ;
drop sequence ACTIVITY_ID_SEQ;

select * from customer

SELECT NAME, PASSWORD, ORA_HASH(NAME || PASSWORD) AS hash_value
FROM USERS;

update USERS 
SET PASSWORD = '909'
WHERE PASSWORD = 'PASSWORD15';

INSERT INTO CUSTOMER VALUES(CUSTOMER_ID_SEQ.NEXTVAL , 107, '02-JAN-2022', 0)

DELETE FROM USERS WHERE USER_NAME ='@NewUser1'



BEGIN 
	FOR I IN 1..100
	LOOP 
INSERT INTO USERS VALUES(USER_ID_SEQ.NEXTVAL, ( '@' || DBMS_RANDOM.STRING('U',3) || USER_ID_SEQ.NEXTVAL), ('USER' || USER_ID_SEQ.NEXTVAL), ORA_HASH('PASSWORD' || USER_ID_SEQ.NEXTVAL), ('UR' || USER_ID_SEQ.NEXTVAL || '@GMAIL.COM'), 'C', '01010101011', NULL, NULL, SYSDATE, 'A', ('C://USERPHOTO' || USER_ID_SEQ.NEXTVAL || '.JPG'), NULL);
END LOOP ;
END ;
/

BEGIN 
	FOR I IN 1..100
	LOOP 
	INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, 1, 0, 0, 0, '', 'MY FIRST POST', SYSDATE, 'N');
	
END LOOP ;
END ;
/

INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, 1, 0, 0, 0, '', 'MY FIRST POST', SYSDATE, 'N');

SELECT MAX(POST_ID) FROM POSTS

SELECT * FROM POSTS

select * from COMMENTS where USER_ID = 1191
INSERT INTO COMMENTS VALUES(COMMENT_ID_SEQ.NEXTVAL, 1, 1, 'MY FIRST COMMENT', SYSDATE)


SELECT * FROM POSTS P JOIN USERS U ON (U.USER_ID = P.USER_ID) ORDER BY TIME DESC

SELECT * FROM REACTS

INSERT INTO REACTS VALUES(1,1,'L')

DELETE FROM REACTS WHERE POST_ID = 1


INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, 1, 0, 0, 0, '', 'MY FIRST share POST', SYSDATE, 'S');

SELECT * from SHARE_POST

INSERT INTO SHARE_POST VALUES(

update posts set react_count = react_count + 1 where react_count < 0

DELETE FROM USERS WHERE USER_ID > 123
DELETE FROM POSTS WHERE POST_ID > 120

UPDATE USERS SET COVER_PICTURE = '/src/public/images/null.png'  where PROFILE_PICTURE = '/src/public/images/null.png';

UPDATE POSTS set content = '/' || content where CONTENT LIKE 'src%';


SELECT * FROM FRIEND_REQUEST
select * from users
SELECT * FROM CUSTOMER
SELECT * FROM MENU
SELECT * FROM REVIEW_POST
SELECT * FROM RESTAURANT
INSERT INTO FRIEND_REQUEST VALUES(1,4,'P')
INSERT INTO FRIEND_REQUEST VALUES(7,8,'A')
UPDATE FRIEND_REQUEST SET STATUS = 'A'

SELECT 
FROM (CUSTOMER C LEFT JOIN USERS U ON (U.USER_ID = C.USER_ID) T, FRIEND_REQUEST F
WHERE T.USER_ID = F.C1_ID AND T

UPDATE CUSTOMER SET FRIENDS = FRIENDS + 1 WHERE USER_ID = 12

INSERT INTO CUSTOMER VALUES(CUSTOMER_ID_SEQ.NEXTVAL, 109, SYSDATE, 0)

DELETE FROM FRIEND_REQUEST WHERE (((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 17) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 112) = C2_ID) OR ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 17) = C2_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 112) = C1_ID)) AND STATUS = 'A'

SELECT * FROM MESSAGES;
INSERT INTO MESSAGES VALUES(1,109,'Assdasd',NULL, SYSDATE)
INSERT INTO MESSAGES VALUES(109,3,'A',NULL, SYSDATE)
INSERT INTO MESSAGES VALUES(2,109,'A',NULL, SYSDATE)
INSERT INTO MESSAGES VALUES(4,109,'At',NULL, SYSDATE)

SELECT CASE WHEN USER1_ID = 1 THEN USER2_ID ELSE USER1_ID END AS correspondent,
       MAX(TIME) AS max_time
FROM MESSAGES
WHERE USER1_ID = 1 OR USER2_ID = 1
GROUP BY CASE WHEN USER1_ID = 1 THEN USER2_ID ELSE USER1_ID END
ORDER BY max_time DESC;

SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = F.C1_ID) 
FROM FRIEND_REQUEST F
WHERE F.C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 109);

SELECT CASE WHEN C1_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 113) THEN (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C2_ID) ELSE (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C1_ID) END AS USRID
FROM FRIEND_REQUEST
WHERE ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 113) = C1_ID OR
(SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 113) = C2_ID) AND STATUS = 'A'

SELECT * FROM FRIEND_REQUEST
select * from users
SELECT * FROM CUSTOMER
SELECT * FROM REVIEW_POST

UPDATE FRIEND_REQUEST SET STATUS = 'A'

SELECT * FROM MESSAGES WHERE (USER1_ID = 1 AND USER2_ID = 2) OR (USER2_ID = 1 AND USER1_ID = 2) ORDER BY TIME

SELECT * FROM FRIEND_REQUEST
select * from users
SELECT * FROM POSTS
SELECT * FROM CUSTOMER
SELECT * FROM MENU
SELECT * FROM REVIEW_POST
SELECT * FROM RESTAURANT
SELECT * FROM FOODORDER
SELECT * FROM FOLLOW_LIST
SELECT *  FROM COMMENTS
SELECT * FROM REACTS

INSERT INTO MENU VALUES (MENU_ID_SEQ.NEXTVAL, 21, 'RICE BOWL WITH MASHROOM as ', 129.99, 0);

INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, 109, 0,0,0, '/src/public/images/image2.jpg', 'NICE FOOD 2', SYSDATE, 'R')

INSERT INTO FOLLOW_LIST VALUES(1127, 21, SYSDATE)

SELECT AVERAGE_RATING FROM RESTAURANT WHERE USER_ID = 1126

SELECT count(*) FROM FOLLOW_LIST WHERE USER_ID = 101 AND RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1126) 
DELETE FROM FOLLOW_LIST WHERE USER_ID = 101 AND RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1126) 

insert into FOODORDER VALUES (ORDER_ID_SEQ.NEXTVAL, 42, 2, 21, SYSDATE, 'P')

INSERT INTO REVIEW_POST VALUES(2,153,21,0)
select * FROM REVIEW_POST WHERE POST_ID = 153
UPDATE REVIEW_POST SET RATING = 8 WHERE POST_ID=153
SELECT AVG(RATING) FROM REVIEW_POST WHERE MENU_ID = 2
SELECT AVG(RATING) FROM REVIEW_POST WHERE RESTAURANT_ID = 21
SELECT MENU_ID FROM MENU WHERE RESTAURANT_ID = 21

select * FROM ((REVIEW_POST R LEFT JOIN MENU M ON R.MENU_ID = M.MENU_ID) LEFT JOIN RESTAURANT RS ON (M.RESTAURANT_ID = RS.RESTAURANT_ID)) LEFT JOIN USERS U ON (U.USER_ID = RS.USER_ID) WHERE POST_ID = 153

select * FROM (MENU M LEFT JOIN RESTAURANT RS ON (M.RESTAURANT_ID = RS.RESTAURANT_ID)) LEFT JOIN USERS U ON (U.USER_ID = RS.USER_ID) WHERE MENU_ID = 2

UPDATE RESTAURANT SET AVERAGE_RATING = 0
UPDATE RESTAURANT SET AVERAGE_RATING = (SELECT AVG(RATING) FROM REVIEW_POST r left JOIN RESTAURANT RS ON R.RESTAURANT_ID = RS.RESTAURANT_ID WHERE RS.USER_ID = 1126) WHERE USER_ID = 1126

select R.POST_ID from REVIEW_POST R LEFT JOIN RESTAURANT RS ON R.RESTAURANT_ID = RS.RESTAURANT_ID WHERE RS.USER_ID = 1126

SELECT M.MENU_ID FROM MENU M LEFT JOIN RESTAURANT R ON R.RESTAURANT_ID = M.RESTAURANT_ID WHERE R.USER_ID = 1126

SELECT F.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON (F.RESTAURANT_ID = R.RESTAURANT_ID) WHERE R.USER_ID = 1126



SELECT USER_ID, USER_NAME FROM USERS WHERE UPPER(USER_NAME) LIKE UPPER('@VoE%');

select * from users


SELECT * FROM FRIEND_REQUEST

INSERT INTO CUSTOMER VALUES(CUSTOMER_ID_SEQ.NEXTVAL, 23, SYSDATE, 0)

SELECT USER_ID, USER_NAME, NAME, USER_TYPE, PROFILE_PICTURE FROM USERS WHERE UPPER(NAME) LIKE UPPER(:u1) OR UPPER(NAME) LIKE UPPER(:u2);


SELECT * FROM PAGE_CONNECTION
SELECT * FROM FRIEND_REQUEST


create TABLE EX (
ID NUMBER ,
NAME VARCHAR2(2)
)

SELECT * FROM EX
INSERT INTO EX VALUES (1,'AR')
INSERT INTO EX VALUES ('2' , 'A2');

UPDATE USERS SET MOBILE_NO = 01258
SELECT * FROM USERS
SELECT * FROM PAGE_CONNECTION
SELECT F.USER_ID FROM PAGE_CONNECTION C JOIN FOODIE_PAGE F ON ( C.PAGE_ID = F.PAGE_ID) WHERE C.USER_ID = 109
SELECT * FROM MENU
INSERT INTO MENU VALUES (MENU_ID_SEQ.NEXTVAL, 21, 'FRIED RICE' , 100, 0);

SELECT * FROM FOODORDER
select * from cart

SELECT * FROM FOODORDER F LEFT JOIN MENU M ON F.MENU_ID = M.MENU_ID LEFT JOIN
RESTAURANT R ON R.RESTAURANT_ID = M.RESTAURANT_ID LEFT JOIN USERS U ON U.USER_ID = R.USER_ID LEFT JOIN CUSTOMER C ON F.CUSTOMER_ID = C.CUSTOMER_ID
LEFT JOIN USERS U1 ON U1.USER_ID = C.USER_ID  WHERE F.ORDER_ID = 42 

DELETE FROM USERS WHERE USER_ID = 2
SELECT * FROM USERS JOIN FOOD
SELECT * FROM PAGE_CONNECTION

DELETE FROM RESTAURANT WHERE USER_ID = 11
SELECT * FROM customer NATURAL JOIN USERS

SELECT * FROM REVIEW_POST

SELECT ORDER_ID FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 109) AND STATUS <> 'D' AND STATUS <> 'R'

INSERT INTO FOODORDER VALUES (ORDER_ID_SEQ.NEXTVAL, 42 , 2, 21, SYSDATE, 'I', 120, 2)

SELECT * FROM POSTS
SELECT * FROM MENU 

SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = F.CUSTOMER_ID), F.MENU_ID , (SELECT USER_ID FROM RESTAURANT WHERE RESTAURANT_ID = 61 F.RESTAURANT_ID), TIME, STATUS FROM FOODORDER F WHERE ORDER_ID = 46

SELECT PRICE FROM MENU WHERE MENU_ID = 1

UPDATE FOODORDER F SET AMOUNT = AMOUNT + 1, TOTALPRICE = TOTALPRICE + (SELECT PRICE FROM MENU WHERE MENU_ID = F.MENU_ID) WHERE F.ORDER_ID = 30



SELECT * FROM FOODORDER WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1126) AND STATUS <> 'U' AND STATUS <> 'D'

SELECT * FROM FOODORDER WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1161) AND STATUS <> 'U'
DELETE FROM FOODORDER WHERE STATUS = 'R'

SELECT * FROM FOODORDER

SELECT  * FROM RESERVATIONS

INSERT INTO RESERVATIONS VALUES (42,61, 2, TO_DATE('09-07-2022', 'MM-DD-YYYY'))

SELECT * FROM CUSTOMER

SELECT * FROM RESERVATIONS WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 109) AND TIME > SYSDATE


SELECT * FROM RESERVATIONS WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1161 AND TIME > SYSDATE)


ALTER TABLE CART ADD URADHUR2A VARCHAR2(3) DEFAULT 'XYZ' NOT NULL;

SELECT * FROM users

SELECT R.*, ( SELECT C.USER_ID FROM CUSTOMER C WHERE C.CUSTOMER_ID = R.CUSTOMER_ID )  FROM RESERVATIONS R WHERE R.RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = 1161 AND TIME > SYSDATE)


SELECT R.*, ( SELECT RS.USER_ID FROM RESTAURANT RS WHERE RS.RESTAURANT_ID = R.RESTAURANT_ID )  FROM RESERVATIONS R WHERE R.CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = 1 AND TIME > SYSDATE)


	select * from NOTIFICATION
	SELECT * FROM POST_NOTIFICATION
	SELECT * FROM ORDER_NOTIFICATION
	select * from FOODORDER

SELECT * FROM REACTS

INSERT INTO REACTS VALUES(66,109,'L')

SELECT * FROM POSTS ORDER BY TIME DESC


BEGIN
DBMS_OUTPUT.PUT_LINE(NOTIFICATION_ID_SEQ.NEXTVAL);
END ;
/

UPDATE FOODORDER SET STATUS = 'I' WHERE ORDER_ID = 63;

INSERT INTO ORDER_NOTIFICATION VALUES (15, 63);

SELECT * FROM ADMIN_LOG

SELECT * FROM USERS ORDER BY USER_ID
SELECT * FROM CUSTOMER C LEFT JOIN USERS U ON U.USER_ID = C.USER_ID ORDER BY C.CUSTOMER_ID

SELECT * FROM RESTAURANT R LEFT JOIN USERS U ON U.USER_ID = R.USER_ID ORDER BY R.RESTAURANT_ID

SELECT * FROM FOODIE_PAGE F LEFT JOIN USERS U ON U.USER_ID = F.USER_ID ORDER BY F.PAGE_ID


SELECT * FROM MENU M LEFT JOIN RESTAURANT R ON M.RESTAURANT_ID = R.RESTAURANT_ID LEFT JOIN USERS U ON R.USER_ID = U.USER_ID ORDER BY MENU_ID

SELECT * FROM FOODORDER F LEFT JOIN CUSTOMER C ON F.CUSTOMER_ID = C.CUSTOMER_ID LEFT JOIN USERS U ON U.USER_ID = C.USER_ID LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID LEFT JOIN USERS U1 ON U1.USER_ID = R.USER_ID LEFT JOIN MENU M ON M.MENU_ID = F.MENU_ID ORDER BY ORDER_ID

select * from users 
SELECT * FROM RESTAURANT
select * from menu
SELECT * FROM POSTS WHERE POST_ID = 991
select * from REVIEW_POST WHERE MENU_ID = 314
SELECT * FROM MESSAGES
SELECT * FROM REACTS
SELECT  * FROM ADMIN_LOG
SELECT  * FROM NOTIFICATION
UPDATE USERS SET PASSWORD = ORA_HASH(PASSWORD)
SELECT * FROM FOODORDER
UPDATE FOODORDER F SET F.TOTALPRICE = F.AMOUNT * (SELECT M.PRICE FROM MENU M WHERE M.MENU_ID = F.MENU_ID)
SELECT * FROM FOLLOW_LIST
SELECT * FROM PAGE_CONNECTION

SELECT * FROM POST_NOTIFICATION
SELECT * FROM SHARE_POST


update USERS SET USER_NAME = '@' || USER_NAME WHERE USER_ID <= 1000

SELECT * FROM FOODORDER

SELECT * from COMMENTS


SELECT * FROM USERS WHERE USER_NAME = '@hok'
UPDATE USERS SET PASSWORD = ORA_HASH('a') WHERE USER_ID = 112

SELECT * from CUSTOMER  WHERE USER_ID > 3000


DELETE FROM FRIEND_REQUEST F1 WHERE 0 < (SELECT COUNT(*) FROM FRIEND_REQUEST F2 WHERE F2.C1_ID = F1.C2_ID AND F2.C2_ID = F1.C1_ID)



SELECT * FROM FRIEND_REQUEST
UPDATE CUSTOMER SET FRIENDS = (SELECT COUNT(*) FROM FRIEND_REQUEST WHERE STATUS = 'A' AND (C1_ID = CUSTOMER_ID OR CUSTOMER_ID = C2_ID))
SELECT FRIENDS FROM CUSTOMER

SELECT * FROM MENU

UPDATE MENU SET FOOD_NAME = REPLACE(FOOD_NAME, 'pork', 'Beef')
SELECT * FROM USERS WHERE UPPER(NAME) LIKE '%TAVERN%'
UPDATE USERS SET NAME = REPLACE(NAME, 'Tavern', 'Cafe')
select * from NOTIFICATION WHERE USER_ID = 112
SELECT * FROM POST_NOTIFICATION WHERE NOTIFICATION_ID = 1008965
DELETE FROM POST_NOTIFICATION WHERE 

update users set COVER_PICTURE = REPLACE(COVER_PICTURE, 'image/', 'images/') 
select * from users 
