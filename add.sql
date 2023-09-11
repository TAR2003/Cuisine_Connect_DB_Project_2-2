SELECT POST_ID FROM (
SELECT	POST_ID, TIME
 FROM POSTS P 
 WHERE USER_ID IN ( SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C:userid_ID) FROM FRIEND_REQUEST WHERE C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'A') 
UNION 
SELECT POST_ID , TIME
FROM POSTS P 
WHERE USER_ID IN (SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C2_ID) FROM FRIEND_REQUEST WHERE C:userid_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid))
UNION 
SELECT POST_ID , TIME 
FROM POSTS
WHERE USER_ID = :userid
UNION
SELECT POST_ID, TIME FROM POSTS WHERE USER_ID = :userid
UNION
SELECT POST_ID , TIME FROM POSTS WHERE USER_ID IN (SELECT R.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID WHERE F.USER_ID = :userid)
UNION
SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE R.RESTAURANT_ID IN (SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid)
UNION
SELECT POST_ID , TIME FROM POSTS WHERE  USER_ID IN (SELECT F.USER_ID FROM PAGE_CONNECTION P LEFT JOIN FOODIE_PAGE F ON (F.PAGE_ID = P.PAGE_ID ) WHERE P.USER_ID = :userid)
) R
ORDER BY R.TIME DESC;
--CUSTOMERTIMELINE 

SELECT POST_ID FROM POSTS WHERE USER_ID = 



SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C:userid_ID) FROM FRIEND_REQUEST WHERE C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'A'

SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C2_ID) FROM FRIEND_REQUEST WHERE C:userid_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid)

SELECT POST_ID, TIME FROM POSTS WHERE USER_ID = :userid;

SELECT POST_ID , TIME FROM POSTS WHERE USER_ID IN (SELECT R.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID WHERE F.USER_ID = :userid);

SELECT * FROM REVIEW_POST

SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE R.RESTAURANT_ID IN (SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid);

SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid;

SELECT * FROM FOLLOW_LIST 

SELECT * FROM FOLLOW_LIST
SELECT * from POSTS
SELECT * FROM FRIEND_REQUEST

SELECT POST_ID , TIME FROM POSTS WHERE  USER_ID = (SELECT F.USER_ID FROM PAGE_CONNECTION P LEFT JOIN FOODIE_PAGE F ON (F.PAGE_ID = P.PAGE_ID ) WHERE P.USER_ID = :userid)

--ALL OWN POSTS, FRIEND POSTS, RESTAURANT POSTS, THE POSTS WHERE RESTAURANT IS REVIEWED, PAGE POSTS  
-- RESTAURANT POSTS, REVIEW POSTS , 
-- PAGE POSTS RESTAURANT POSTS, CONNECTED PAGES POST 





SELECT POST_ID
FROM POSTS P
WHERE USER_ID IN (
    SELECT USER_ID
    FROM CUSTOMER
    WHERE CUSTOMER_ID = (
        SELECT C:userid_ID
        FROM FRIEND_REQUEST
        WHERE C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) 
        AND STATUS = 'A'
    )
)
UNION 
SELECT POST_ID
FROM POSTS P
WHERE USER_ID IN (
    SELECT USER_ID
    FROM CUSTOMER
    WHERE CUSTOMER_ID = (
        SELECT C2_ID
        FROM FRIEND_REQUEST
        WHERE C:userid_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid)
    )
)
ORDER BY P.TIME DESC;





SELECT POST_ID FROM (
SELECT POST_ID, TIME FROM POSTS WHERE USER_ID = :userid
UNION
SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid)
UNION
SELECT POST_ID , TIME FROM POSTS WHERE USER_ID IN (SELECT R.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID WHERE F.USER_ID = :userid)
UNION
SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE R.RESTAURANT_ID IN (SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid)
UNION
SELECT POST_ID , TIME FROM POSTS WHERE  USER_ID IN (SELECT F.USER_ID FROM PAGE_CONNECTION P LEFT JOIN FOODIE_PAGE F ON (F.PAGE_ID = P.PAGE_ID ) WHERE P.USER_ID = :userid)
) R
ORDER BY R.TIME DESC;

--RESTAUARNT TIMELINE

SELECT * FROM RESTAURANT



SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid)



SELECT POST_ID FROM (
SELECT POST_ID, TIME FROM POSTS WHERE USER_ID = :userid
UNION
SELECT POST_ID , TIME FROM POSTS WHERE USER_ID IN (SELECT R.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID WHERE F.USER_ID = :userid)
UNION
SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE R.RESTAURANT_ID IN (SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid)
UNION
SELECT POST_ID , TIME FROM POSTS WHERE  USER_ID IN (SELECT F.USER_ID FROM PAGE_CONNECTION P LEFT JOIN FOODIE_PAGE F ON (F.PAGE_ID = P.PAGE_ID ) WHERE P.USER_ID = :userid)
) R
ORDER BY R.TIME DESC;

-- PAGE TIMELINE

SELECT * FROM NOTIFICATION




SELECT POST_ID FROM (
SELECT	POST_ID, TIME
 FROM POSTS P 
 WHERE USER_ID IN ( SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C:userid_ID) FROM FRIEND_REQUEST WHERE C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'A') 
UNION 
SELECT POST_ID , TIME
FROM POSTS P 
WHERE USER_ID IN (SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C2_ID) FROM FRIEND_REQUEST WHERE C:userid_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid))
UNION 
SELECT POST_ID , TIME 
FROM POSTS
WHERE USER_ID = :userid
UNION
SELECT POST_ID, TIME FROM POSTS WHERE USER_ID = :userid
UNION
SELECT POST_ID , TIME FROM POSTS WHERE USER_ID IN (SELECT R.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID WHERE F.USER_ID = :userid)
UNION
SELECT P.POST_ID , P.TIME FROM POSTS P LEFT JOIN REVIEW_POST R ON (P.POST_ID = R.POST_ID)  WHERE R.RESTAURANT_ID IN (SELECT RESTAURANT_ID FROM FOLLOW_LIST WHERE USER_ID = :userid)
UNION
SELECT POST_ID , TIME FROM POSTS WHERE  USER_ID IN (SELECT F.USER_ID FROM PAGE_CONNECTION P LEFT JOIN FOODIE_PAGE F ON (F.PAGE_ID = P.PAGE_ID ) WHERE P.USER_ID = :userid)
) R
ORDER BY R.TIME DESC





