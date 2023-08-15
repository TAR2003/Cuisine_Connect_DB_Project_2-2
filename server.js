const express = require('express');
const cors = require('cors');
const app = express();
const oracledb = require('oracledb');

let a = 120;

const dbConfig = {
  user: 'CuisineConnect',
  password: '12345',
  connectString: 'localhost/ORCLPDB'
};

app.use(cors());

app.use(express.json()); // Parse JSON requests

app.post('/api/user', async (req, res) => {
  const s = req.body;
  console.log('received data in api user ' + (s.id + 210));
  const data = await run(1);
  for (const t of data[0])
    console.log('serially ' + t);
  res.json(data[0][9]);
});

app.get('/api/insert', async (req, res) => {
  const a = req.params.a;
  await newuser();
  const data = 'hello got insert';
  res.json(data);
});



app.post('/api/data', async (req, res) => {
  const s = req.body; // JSON data sent from the frontend
  console.log('Received data:', s);

  // Process the received data as needed
  const data = 'hello world from s class';
  console.log(data + ' ---');
  res.json(data);
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function run(a) {
  let connection;
  let result;
  try {
    console.log('till now');
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'select * FROM USERS where USER_ID = ' + a;
    result = await connection.execute(sqlQuery);

  } catch (err) {
    console.error('Error: ', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection: ', err);
      }
    }
  }
  let t = result.rows;
  console.log("we got " + typeof t);
  if (!t) return ' this is undefined ';
  else return t;
}

async function newuser() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = "INSERT INTO USERS VALUES(USER_ID_SEQ.NEXTVAL , :vusername, :vname, :vpassword, :vemail, :vusertype, :vmobileno, :vx, :vy, :vprofile, :vcover)";
    const binds = {
      vusername: 'newest user ',
      vname: 'myname',
      vpassword: 'janinaekebarei',
      vemail: 'u@gmail.com',
      vusertype: 'C',
      vmobileno: '01234567890',
      vx: 10,
      vy: 10,
      vprofile: null,
      vcover: null,
    }
    a++;
    const options = {
      autoCommit: true,
    }
    await connection.execute(sqlQuery, binds, options);
    console.log('inserted ' + a + 'th element');
    const sql2 = 'SELECT COUNT(*) FROM USERS';
    const binds2 = {

    }
    const answer = await connection.execute(sql2, binds2, options);
    console.log('succesfully fetched ' + answer.rows[0][0]);

  } catch (err) {
    console.error('Error: ', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error closing connection: ', err);
      }
    }
  }

}