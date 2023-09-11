
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


CREATE OR REPLACE FUNCTION GET_CUSTOMER(U NUMBER) RETURN VARCHAR2 IS
  ID NUMBER;    -- Only need 1 character for the return value
BEGIN 	
  SELECT CUSTOMER_ID INTO ID FROM CUSTOMER WHERE USER_ID = U;
		RETURN ID;
END;
/

CREATE OR REPLACE FUNCTION GET_RESTAURANT(U NUMBER) RETURN VARCHAR2 IS
  ID NUMBER;    -- Only need 1 character for the return value
BEGIN 	
  SELECT RESTAURANT_ID INTO ID FROM RESTAURANT WHERE USER_ID = U;
		RETURN ID;
END;
/

CREATE OR REPLACE FUNCTION GET_PAGE(U NUMBER) RETURN VARCHAR2 IS
  ID NUMBER;    -- Only need 1 character for the return value
BEGIN 	
  SELECT PAGE_ID INTO ID FROM FOODIE_PAGE WHERE USER_ID = U;
		RETURN ID;
END;
/


DECLARE
A NUMBER;
BEGIN 
	SELECT CHECK_PASS('WIX201', 'PASSWORD201') INTO A FROM DUAL;
	DBMS_OUTPUT.PUT_LINE(A);
EXCEPTION 	
	WHEN VALUE_ERROR THEN 
		DBMS_OUTPUT.PUT_LINE('ETAI HOYECHE');
	WHEN OTHERS THEN 
		DBMS_OUTPUT.PUT_LINE('KI HGOYECHE JANI NBA');
END ;
/

DECLARE 
BEGIN 	
	DBMS_OUTPUT.PUT_LINE(GET_CUSTOMER(116));
END ;
/
	
	