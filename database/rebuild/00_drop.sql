-- Destructive rebuild for an empty or disposable Oracle user.
-- Drops application tables and sequences. Do not run this against data you need to keep.

BEGIN
  FOR t IN (
    SELECT table_name FROM user_tables
    WHERE table_name IN (
      'ORDER_NOTIFICATION','POST_NOTIFICATION','SESSIONS','FOODORDER','RESERVATIONS',
      'REVIEW_POST','REACTS','SHARE_POST','COMMENTS','NOTIFICATION','ADMIN_LOG','POSTS',
      'PAGE_CONNECTION','FOODIE_PAGE','MESSAGES','FOLLOW_LIST','FRIEND_REQUEST','MENU',
      'RESTAURANT','CUSTOMER','USERS'
    )
  ) LOOP
    EXECUTE IMMEDIATE 'DROP TABLE ' || t.table_name || ' CASCADE CONSTRAINTS';
  END LOOP;
  FOR s IN (
    SELECT sequence_name FROM user_sequences
    WHERE sequence_name IN (
      'USER_ID_SEQ','CUSTOMER_ID_SEQ','RESTAURANT_ID_SEQ','POST_ID_SEQ','PAGE_ID_SEQ',
      'COMMENT_ID_SEQ','MENU_ID_SEQ','ORDER_ID_SEQ','RESERVE_ID_SEQ','NOTIFICATION_ID_SEQ',
      'ACTIVITY_ID_SEQ','MESSAGE_ID_SEQ'
    )
  ) LOOP
    EXECUTE IMMEDIATE 'DROP SEQUENCE ' || s.sequence_name;
  END LOOP;
END;
/
