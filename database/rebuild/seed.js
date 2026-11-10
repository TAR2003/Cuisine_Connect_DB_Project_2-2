const path = require('path');
const { hashPassword } = require(path.join(__dirname, '../../backend/src/passwords'));
const { loadEnvFile, loadConfig } = require(path.join(__dirname, '../../backend/src/config'));

loadEnvFile(path.join(__dirname, '../../backend/.env'));

async function main() {
  if (!process.env.ORACLE_USER || !process.env.ORACLE_PASSWORD || !process.env.ORACLE_CONNECT_STRING) {
    console.log('Seed not applied: Oracle environment is not configured.');
    return;
  }
  if (!process.env.SEED_PASSWORD) {
    console.log('Seed not applied: SEED_PASSWORD is not set. No password was written to disk.');
    return;
  }
  const passwordHash = await hashPassword(process.env.SEED_PASSWORD);
  let oracledb;
  try {
    oracledb = require(path.join(__dirname, '../../backend/node_modules/oracledb'));
  } catch (error) {
    console.log('Seed not applied: oracledb is not installed (' + error.message + ').');
    return;
  }
  const config = loadConfig();
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: config.user,
      password: config.password,
      connectString: config.connectString
    });
    await seed(connection, oracledb, passwordHash);
    await connection.commit();
    console.log('Seed applied: admin, customer, restaurant, and one menu.');
  } catch (error) {
    console.log('Seed not applied: ' + error.message);
  } finally {
    if (connection) await connection.close();
  }
}

async function seed(connection, oracledb, passwordHash) {
  const adminId = await insertUser(connection, oracledb, '@admin', 'Admin', passwordHash, 'admin@example.com', 'A');
  const customerId = await insertUser(connection, oracledb, '@customer', 'Customer', passwordHash, 'customer@example.com', 'C');
  const restaurantUserId = await insertUser(connection, oracledb, '@restaurant', 'Restaurant', passwordHash, 'restaurant@example.com', 'R');
  await connection.execute(
    `INSERT INTO CUSTOMER (CUSTOMER_ID, USER_ID, DATE_OF_BIRTH, FRIENDS)
     VALUES (CUSTOMER_ID_SEQ.NEXTVAL, :userId, DATE '2000-01-01', 0)`,
    { userId: customerId }
  );
  await connection.execute(
    `INSERT INTO RESTAURANT (RESTAURANT_ID, USER_ID, DATE_OF_OPENING, AVERAGE_RATING)
     VALUES (RESTAURANT_ID_SEQ.NEXTVAL, :userId, SYSDATE, 0)`,
    { userId: restaurantUserId }
  );
  await connection.execute(
    `INSERT INTO MENU (MENU_ID, RESTAURANT_ID, FOOD_NAME, PRICE, AVERAGE_RATING)
     VALUES (
       MENU_ID_SEQ.NEXTVAL,
       (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userId),
       'House platter',
       12.00,
       0
     )`,
    { userId: restaurantUserId }
  );
  void adminId;
}

async function insertUser(connection, oracledb, username, name, passwordHash, email, type) {
  const result = await connection.execute(
    `INSERT INTO USERS (
       USER_ID, USER_NAME, NAME, PASSWORD, EMAIL, USER_TYPE, MOBILE_NO,
       LOCATION_X, LOCATION_Y, LAST_UPDATE, ACTIVE_STATUS
     ) VALUES (
       USER_ID_SEQ.NEXTVAL, :username, :name, :passwordHash, :email, :type, '01000000000',
       0, 0, SYSDATE, 'A'
     ) RETURNING USER_ID INTO :id`,
    {
      username,
      name,
      passwordHash,
      email,
      type,
      id: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
  );
  return result.outBinds.id[0];
}

main();
