-- FIRST
CREATE TABLE USERS (
USER_ID NUMBER,
USER_NAME VARCHAR2(100),
NAME VARCHAR2(50),
PASSWORD VARCHAR2(100),
EMAIL VARCHAR2(100),
USER_TYPE CHAR(1) CHECK (USER_TYPE IN ('P', 'R' , 'C')) ,
MOBILE_NO VARCHAR2(11),
LOCATION_X NUMBER,
LOCATION_Y NUMBER,
LAST_UPDATE DATE,
ACTIVE_STATUS CHAR(1) CHECK (ACTIVE_STATUS IN ('A', 'D')),
PROFILE_PICTURE VARCHAR2(400) DEFAULT NULL,
COVER_PICTURE VARCHAR2(400) DEFAULT NULL,
PRIMARY KEY (USER_ID)
) ;

--SECOND 


CREATE TABLE CUSTOMER (
CUSTOMER_ID NUMBER,
USER_ID NUMBER,
DATE_OF_BIRTH DATE,
FRIENDS NUMBER DEFAULT 0,
PRIMARY KEY (CUSTOMER_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID)
	ON DELETE CASCADE

);


--THIRD 


CREATE TABLE RESTAURANT (
RESTAURANT_ID NUMBER,
USER_ID NUMBER,
DATE_OF_OPENING DATE,
AVERAGE_RATING FLOAT CHECK (AVERAGE_RATING <= 10),
PRIMARY KEY (RESTAURANT_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID)
	ON DELETE CASCADE

);


--FOURTH 

CREATE TABLE MENU (
MENU_ID NUMBER,
RESTAURANT_ID NUMBER,
FOOD_NAME VARCHAR2(100),
PRICE NUMBER(15,2),
AVERAGE_RATING FLOAT CHECK (AVERAGE_RATING <= 10),
PRIMARY KEY (MENU_ID, RESTAURANT_ID),
FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT (RESTAURANT_ID)
	ON DELETE CASCADE


) ;



-- FIFITH 


CREATE TABLE FRIEND_REQUEST (
C1_ID NUMBER,
C2_ID NUMBER,
STATUS CHAR(1) CHECK (STATUS IN ('P','A')),
PRIMARY KEY(C1_ID, C2_ID),
FOREIGN KEY (C1_ID) REFERENCES CUSTOMER (CUSTOMER_ID)
	ON DELETE CASCADE,
FOREIGN KEY (C2_ID) REFERENCES CUSTOMER (CUSTOMER_ID)
	ON DELETE CASCADE

) ;


-- SIXTH 


CREATE TABLE FOLLOW_LIST (
USER_ID NUMBER,
RESTAURANT_ID NUMBER,
TIME DATE,
PRIMARY KEY (USER_ID, RESTAURANT_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE,
FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT (RESTAURANT_ID) ON DELETE CASCADE

) ;

-- SEVENTH 


CREATE TABLE MESSAGES (
USER1_ID NUMBER,
USER2_ID NUMBER,
CAPTION VARCHAR2(4000),
CONTENT VARCHAR2(400),
TIME DATE,
PRIMARY KEY (USER1_ID, USER2_ID, TIME),
FOREIGN KEY (USER1_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE,
FOREIGN KEY (USER2_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE


) ;

-- EIGHTTH 

CREATE TABLE FOODIE_PAGE (
USER_ID NUMBER,
PAGE_ID NUMBER,
DATE_OF_CREATION DATE,
PRIMARY KEY (PAGE_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE

) ;


--NINTH 

CREATE TABLE PAGE_CONNECTION (
USER_ID NUMBER,
PAGE_ID NUMBER,
TIME DATE,
PRIMARY KEY (PAGE_ID, USER_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE,
FOREIGN KEY (PAGE_ID) REFERENCES FOODIE_PAGE (PAGE_ID) ON DELETE CASCADE


) ;

--TENTH 

CREATE TABLE POSTS (
POST_ID NUMBER,
USER_ID NUMBER,
REACT_COUNT NUMBER,
COMMENT_COUNT NUMBER,
SHARES_COUNT NUMBER,
CONTENT VARCHAR2(400),
CAPTION VARCHAR2(4000),
TIME DATE,
POST_TYPE VARCHAR2(1) CHECK (POST_TYPE IN ('N','R','S')),
PRIMARY KEY (POST_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE

) ;



--ELEVENTH 

CREATE TABLE COMMENTS (
COMMENT_ID NUMBER,
POST_ID NUMBER,
USER_ID NUMBER,
CAPTION VARCHAR2(4000),
TIME DATE,
PRIMARY KEY (COMMENT_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID) ON DELETE CASCADE,
FOREIGN KEY (POST_ID) REFERENCES POSTS (POST_ID) ON DELETE CASCADE

) ;


--TWELVTH 


CREATE TABLE ADMIN_LOG (
ACTIVITY_ID NUMBER,
ACTIVITY VARCHAR2(4000),
TIME DATE,
USER_ID NUMBER,
FUNCTION_CALL VARCHAR2(4000),
PRICE NUMBER,
PRIMARY KEY(ACTIVITY_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID)
	ON DELETE CASCADE

) ;


-- THIRTEENTH 

CREATE TABLE NOTIFICATION (
NOTIFICATION_ID NUMBER,
USER_ID NUMBER,
TIME DATE,
STATUS CHAR(1) CHECK (STATUS IN ('U','R')),
NOTIFICATION_TYPE VARCHAR2(1) CHECK (NOTIFICATION_TYPE IN ('P','O')),
MESSAGE VARCHAR2(4000), 
PRIMARY KEY(NOTIFICATION_ID),
FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID)
	ON DELETE CASCADE

) ;


--FOURTEENTH 

CREATE TABLE SHARE_POST (
ORIGIN_ID NUMBER,
POST_ID NUMBER,
PRIMARY KEY (POST_ID),
FOREIGN KEY (POST_ID) REFERENCES POSTS (POST_ID) ON DELETE CASCADE,
FOREIGN KEY (ORIGIN_ID) REFERENCES POSTS (POST_ID) ON DELETE CASCADE
);

-- FIFTEENTH 

 CREATE TABLE REACTS(
 POST_ID NUMBER,
 USER_ID NUMBER,
 REACT_TYPE VARCHAR2(5),
 PRIMARY KEY(POST_ID, USER_ID),
 FOREIGN KEY (USER_ID) REFERENCES USERS (USER_ID)
 	ON DELETE CASCADE,
 FOREIGN KEY (POST_ID) REFERENCES POSTS (POST_ID) ON DELETE CASCADE
 
 ) ;


--SIXTEEENTH 


--SEVCENTEENTH 


CREATE TABLE REVIEW_POST (
MENU_ID NUMBER,
POST_ID NUMBER,
RESTAURANT_ID NUMBER,
RATING FLOAT CHECK (RATING <= 10),
PRIMARY KEY (POST_ID),
FOREIGN KEY (POST_ID) REFERENCES POSTS (POST_ID)
	ON DELETE CASCADE,
FOREIGN KEY (MENU_ID, RESTAURANT_ID) REFERENCES MENU (MENU_ID, RESTAURANT_ID) ON DELETE CASCADE


) ;


--NINTEENTH 

CREATE TABLE RESERVATIONS (
CUSTOMER_ID NUMBER,
RESTAURANT_ID NUMBER,
NUMBER_OF_RESERVATIONS NUMBER,
TIME DATE,
PRIMARY KEY (CUSTOMER_ID, RESTAURANT_ID),
FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER (CUSTOMER_ID) ON DELETE CASCADE,
FOREIGN KEY (RESTAURANT_ID) REFERENCES RESTAURANT (RESTAURANT_ID) ON DELETE CASCADE

);

CREATE TABLE FOODORDER (
ORDER_ID NUMBER,
CUSTOMER_ID NUMBER,
MENU_ID NUMBER,
RESTAURANT_ID NUMBER,
TIME DATE,
STATUS VARCHAR2(20),
TOTALPRICE NUMBER,
AMOUNT NUMBER,
PRIMARY KEY (ORDER_ID),
FOREIGN KEY (CUSTOMER_ID) REFERENCES CUSTOMER (CUSTOMER_ID)
	ON DELETE CASCADE,
FOREIGN KEY (MENU_ID, RESTAURANT_ID) REFERENCES MENU (MENU_ID, RESTAURANT_ID) ON DELETE CASCADE

);

CREATE TABLE POST_NOTIFICATION (
	NOTIFICATION_ID NUMBER,
	POST_ID NUMBER,
	PRIMARY KEY (NOTIFICATION_ID),
	FOREIGN KEY (NOTIFICATION_ID) REFERENCES NOTIFICATION (NOTIFICATION_ID) 
	ON DELETE CASCADE,
	FOREIGN KEY (POST_ID) REFERENCES POSTS (POST_ID) ON DELETE CASCADE

);

CREATE TABLE ORDER_NOTIFICATION (
	NOTIFICATION_ID NUMBER,
	ORDER_ID NUMBER,
	PRIMARY KEY (NOTIFICATION_ID),
	FOREIGN KEY (NOTIFICATION_ID) REFERENCES NOTIFICATION (NOTIFICATION_ID) 
	ON DELETE CASCADE,
	FOREIGN KEY (ORDER_ID) REFERENCES FOODORDER (ORDER_ID) ON DELETE CASCADE

);
















