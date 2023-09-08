const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const oracledb = require('oracledb');
const { log } = require('console');

let picname = '';


//const upload = multer({ storage: storage });

let a = 120;
app.use(cors());

app.use(express.json()); // Parse JSON requests

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const dbConfig = {
  user: 'CuisineConnect',
  password: '12345',
  connectString: 'localhost/ORCLPDB'
};

const upload = multer({ dest: 'uploads/' });

app.post('/save-data', upload.fields([{ name: 'profilePicture' }, { name: 'coverPhoto' }]), async (req, res) => {
  const obj = req.body;

  console.log(obj);
  const profilePicture = req.files['profilePicture'][0];
  const coverPhoto = req.files['coverPhoto'][0];
  const profileextension = path.extname(profilePicture.originalname);
  const coverextension = path.extname(coverPhoto.originalname);
  console.log(obj);
  let id = await insertUsers(obj.username, obj.password, obj.name, obj.mobileno, obj.email, obj.type, obj.x, obj.y, profileextension, coverextension);
  if (obj.type == 'C') await insertCustomer(id, obj.date);
  else if (obj.type == 'R') await insertRestaurant(id, obj.date);
  else await insertPage(id, obj.date);
  // Define paths for saving images
  const profilePicturePath = path.join('../frontend/src/public/images/' + 'profilephoto' + id + profileextension);
  const coverPhotoPath = path.join('../frontend/src/public/images/' + 'coverphoto' + id + coverextension);
  try {
    // Copy profile picture to destination and delete temporary file
    fs.copyFile(profilePicture.path, profilePicturePath, (copyProfileError) => {
      if (copyProfileError) {
        console.error('Error copying profile image:', copyProfileError);
        res.status(500).send('Error saving images');
        return;
      }
      fs.unlinkSync(profilePicture.path); // Delete the temporary file
    });
    // Copy cover photo to destination and delete temporary file
    fs.copyFile(coverPhoto.path, coverPhotoPath, (copyCoverError) => {
      if (copyCoverError) {
        console.error('Error copying cover image:', copyCoverError);
        res.status(500).send('Error saving images');
        return;
      }
      fs.unlinkSync(coverPhoto.path); // Delete the temporary file
    });
    res.status(200).send('Data uploaded and images saved with new names');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving images');
  }
});


app.post('/addpostwithpicture', upload.fields([{ name: 'postphoto' }]), async (req, res) => {
  const obj = req.body;
  console.log(obj);
  const postPicture = req.files['postphoto'][0];
  const postextension = path.extname(postPicture.originalname);
  console.log(obj);
  let id = await addnewpost(obj.userid, postextension, obj.caption);

  const postPicturePath = path.join('../frontend/src/public/images/' + 'postphoto' + id + postextension);
  try {
    // Copy profile picture to destination and delete temporary file
    fs.copyFile(postPicture.path, postPicturePath, (copyProfileError) => {
      if (copyProfileError) {
        console.error('Error copying profile image:', copyProfileError);
        res.status(500).send('Error saving images');
        return;
      }
      fs.unlinkSync(postPicture.path); // Delete the temporary file
    });

    res.status(200).send('Data uploaded and images saved with new names');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving images');
  }
});

app.post('/addreviewpostwithpicture', upload.fields([{ name: 'postphoto' }]), async (req, res) => {
  const obj = req.body;
  console.log(obj);
  const postPicture = req.files['postphoto'][0];
  const postextension = path.extname(postPicture.originalname);
  console.log(obj);
  let id = await addnewreviewpost(obj.userid, postextension, obj.caption, obj.menuid, obj.rating);

  const postPicturePath = path.join('../frontend/src/public/images/' + 'postphoto' + id + postextension);
  await updatemenurating(obj.menuid);
  try {
    // Copy profile picture to destination and delete temporary file
    fs.copyFile(postPicture.path, postPicturePath, (copyProfileError) => {
      if (copyProfileError) {
        console.error('Error copying profile image:', copyProfileError);
        res.status(500).send('Error saving images');
        return;
      }
      fs.unlinkSync(postPicture.path); // Delete the temporary file
    });

    res.status(200).send('Data uploaded and images saved with new names');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error saving images');
  }
});

app.post('/upload', upload.single('image'), (req, res) => {

  console.log('postetr the image');
  picname = 'newIMGifle';
  res.status(200).send('Image uploaded successfully');
});



app.post('/api/user', async (req, res) => {
  const s = req.body;
  console.log('received data in api user ' + (s.id + 210));
  const data = await run(s.id);
  console.log(data.length + " in the post ");
  res.json(data);
});

app.post('/api/username', async (req, res) => {
  const s = req.body;
  if (s.title == ('checkusername')) {
    const u = s.username;

    const counts = await checkUniqueUsername(u);
    let data;
    if (counts > 0) {
      data = 'true';
    }
    else data = 'false';
    res.json(data);
  }

  else if (s.title == ('getauthentication')) {
    const u = s.username;
    const p = s.password;
    await adminlog(u, 'Log in attempt', 'Function: CHECK_PASS');
    const data = await checkAuthentication(u, p);
    res.json(data);
  }
  else if (s.title == 'usertype') {
    const u = s.username;
    const data = await getUserType(u);
    res.json(data);
  }
  else if (s.title == 'getid') {
    const u = s.username;
    const data = await getID(u);
    res.json(data);
  }
  else if (s.title == 'getuserinfo') {
    const u = s.username;
    const data = await getUserinfo(u);
    res.json(data);
  }
  else if (s.title == 'getuserinfoid') {
    const u = s.userid;
    const data = await getUserinfoid(u);
    res.json(data);
  }

});

app.post('/api/postinfo', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const data = await getPostinfo(postid);
  res.json(data);
});

app.post('/api/profilephoto', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getprofilepicture(userid);
  res.json(data);
});

app.post('/api/getcomment', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const data = await getcomments(postid);
  res.json(data);
});


app.post('/api/addcomment', async (req, res) => {
  const s = req.body;
  await addcomments(s.postid, s.userid, s.caption);
  const data = '';
  res.json(data);
});

app.post('/api/getallposts', async (req, res) => {
  const s = req.body;
  const data = await getAllPosts();
  console.log('total posts ' + data.length)
  res.json(data);
});



app.post('/api/addpostwithoutmedia', async (req, res) => {
  const s = req.body;
  await addnewpostwithoutpicture(s.userid, s.caption);
  const data = '';
  res.json(data);
});

app.post('/api/addreviewpostwithoutmedia', async (req, res) => {
  const s = req.body;
  await addnewreviewpostwithoutpicture(s.userid, s.caption, s.rating, s.menuid);
  await updatemenurating(s.menuid);
  const data = '';
  res.json(data);
});

app.post('/api/reactsituation', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const userid = s.userid;
  const r = await reactsituation(postid, userid);
  let data;
  if (r == 1) data = true;
  else data = false;
  res.json(data);
});

app.post('/api/addreact', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const userid = s.userid;
  await addreact(postid, userid);
  let data = '';
  res.json(data);
});

app.post('/api/removereact', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const userid = s.userid;
  await removereact(postid, userid);
  let data = '';
  res.json(data);
});

app.post('/api/addshare', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const userid = s.userid;
  await addshare(postid, userid);
  let data = '';
  res.json(data);
});

app.post('/api/getshare', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const data = await getshare(postid);
  res.json(data);
});

app.post('/api/getallprofileposts', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getAllProfilePosts(userid);
  res.json(data);
});

app.post('/api/friend', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const title = s.title;
  if (title == 'status') {
    const data = await getFriendRequestStatus(userid1, userid2);
    res.json(data);
  }
  else if (title == 'giverequest') {
    await giverequest(userid1, userid2);
    console.log(' found a frined request request');
    const data = '';
    res.json(data);
  }
  else if (title == 'acceptrequest') {
    await acceptRequest(userid1, userid2);
    const data = '';
    res.json(data);
  }
  else if (title == 'deleterequest') {
    await deleterequest(userid1, userid2);
    const data = '';
    res.json(data);
  }
  else if (title == 'unfriend') {
    await unfriend(userid1, userid2);
    const data = '';
    res.json(data);
  }
});

app.post('/api/getallfriendrequests', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const data = await getallfriendrequests(userid1);
  res.json(data);
});

app.post('/api/getallfriends', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const data = await getallfriends(userid1);
  res.json(data);
});

app.post('/api/getinbox', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const data = await getinbox(userid1);
  res.json(data);
});

app.post('/api/getmessages', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const data = await getmessages(userid1, userid2);
  res.json(data);
});

app.post('/api/insertmessage', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const caption = s.caption;
  await insertmessage(userid1, userid2, caption);
  const data = '';
  res.json(data);
});

app.post('/api/getreviewpost', async (req, res) => {
  const s = req.body;
  const postid = s.postid

  const data = await getreviewpost(postid);
  res.json(data);
});

app.post('/api/getmenublockinfo', async (req, res) => {
  const s = req.body;
  const menuid = s.menuid;
  await updatemenurating(s.menuid);
  const data = await getmenublockinfo(menuid);
  res.json(data);
});

app.post('/api/getmenureviewposts', async (req, res) => {
  const s = req.body;
  const menuid = s.menuid;
  const data = await getmenureviewposts(menuid);
  res.json(data);
});

app.post('/api/getrestaurantreviewposts', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getrestaurantreviewposts(userid);
  res.json(data);
});

app.post('/api/getmenu', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getmenu(userid);
  res.json(data);
});

app.post('/api/getfollowstatus', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const data = await getfollowstatus(userid1, userid2);
  res.json(data);
});
app.post('/api/setfollow', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  await setfollow(userid1, userid2);
  const data = '';
  res.json(data);
});
app.post('/api/unfollow', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  await unfollow(userid1, userid2);
  const data = '';
  res.json(data);
});


app.post('/api/getrestaurantrating', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  await updaterestaurantrating(userid1);
  const data = await getrestaurantrating(userid1);
  res.json(data);
});

app.post('/api/getfollowlist', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const data = await getfollowlist(userid1);
  res.json(data);
});

app.post('/api/findusername', async (req, res) => {
  const s = req.body;
  const u = s.u;
  const data = await findusername(u);
  res.json(data);
});

app.post('/api/findname', async (req, res) => {
  const s = req.body;
  const u = s.u;
  const data = await findname(u);
  res.json(data);
});

app.post('/api/deletepost', async (req, res) => {
  const s = req.body;
  const postid = s.postid;
  const data = '';
  await deletepost(postid);
  res.json(data);
});

app.post('/api/deletecomment', async (req, res) => {
  const s = req.body;
  const commentid = s.commentid;
  const data = '';
  await deletecomment(commentid);
  res.json(data);
});

app.post('/api/getnearbyrestaurants', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getnearbyrestaurants(userid);
  res.json(data);
});

app.post('/api/getfollowedrestaurants', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getfollowedrestaurants(userid);
  res.json(data);
});

app.post('/api/connectionstatus', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const data = await connectionstatus(userid1, userid2);
  res.json(data);
});
app.post('/api/addconnection', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const data = '';
  await addconnection(userid1, userid2);
  res.json(data);
});

app.post('/api/removeconnection', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  const data = '';
  await removeconnection(userid1, userid2);
  res.json(data);
});

app.post('/api/getconnectedpage', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const data = await getconnectedpage(userid1);
  res.json(data);
});

app.post('/api/addmenu', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const menuname = s.menuname;
  const price = s.price;
  const data = '';
  await addmenu(userid1, menuname, price);
  res.json(data);
});

app.post('/api/getallorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getallorders(userid);
  res.json(data);
});
app.post('/api/getcurrentorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getcurrentorders(userid);
  res.json(data);
});

app.post('/api/delivered', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await delivered(orderid);
  res.json(data);
});

app.post('/api/ontheway', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await ontheway(orderid);
  res.json(data);
});

app.post('/api/preparing', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await preparing(orderid);
  res.json(data);
});

app.post('/api/removefromcart', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await removefromcart(orderid);
  res.json(data);
});

app.post('/api/decreaseamount', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await decreaseamount(orderid);
  res.json(data);
});

app.post('/api/increaseamount', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = '';
  await increaseamount(orderid);
  res.json(data);
});

app.post('/api/clearcart', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = '';
  await clearcart(userid);
  res.json(data);
});

app.post('/api/finalizecart', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = '';
  await finalizecart(userid);
  res.json(data);
});

app.post('/api/insertorder', async (req, res) => {
  const s = req.body;
  const userid1 = s.userid1;
  const menuid = s.menuid;
  const userid2 = s.userid2;
  const data = await insertorder(userid1, menuid, userid2, 1);
  res.json(data);
});

app.post('/api/getorderinfo', async (req, res) => {
  const s = req.body;
  const orderid = s.orderid;
  const data = await getorderinfo(orderid);
  res.json(data);
});

app.post('/api/getcurrentorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getcurrentorders(userid);
  res.json(data);
});

app.post('/api/getallorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getallorders(userid);
  res.json(data);
});

app.post('/api/getcart', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getcart(userid);
  res.json(data);
});

app.post('/api/pendingorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await pendingorders(userid);
  res.json(data);
});


app.post('/api/allrestaurantorders', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await allrestaurantorders(userid);
  res.json(data);
});

app.post('/api/reservationstatus', async (req, res) => {
  const s = req.body;

  await removepastreservations();
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  await alog(userid1, 'Deleting past reservations', 'Procedure: DELETE_LATE_RESERVATIONS');
  const data = await reservationstatus(userid1, userid2);
  res.json(data);
});

app.post('/api/removereservation', async (req, res) => {
  const s = req.body;
  await removepastreservations();
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  await alog(userid1, 'Deleting past reservations', 'Procedure: DELETE_LATE_RESERVATIONS');
  const data = '';
  await removereservation(userid1, userid2);
  res.json(data);
});

app.post('/api/insertreservation', async (req, res) => {
  const s = req.body;
  await removepastreservations();
  const userid1 = s.userid1;
  const userid2 = s.userid2;
  await alog(userid1, 'Deleting past reservations', 'Procedure: DELETE_LATE_RESERVATIONS');
  const time = s.time;
  const data = '';
  await insertreservation(userid1, userid2, time);
  res.json(data);
});


app.post('/api/alluserreservations', async (req, res) => {
  const s = req.body;
  await removepastreservations();
  const userid = s.userid;
  await alog(userid, 'Deleting past reservations', 'Procedure: DELETE_LATE_RESERVATIONS');
  const data = await alluserreservations(userid);
  res.json(data);
});

app.post('/api/allrestaurantreservations', async (req, res) => {
  const s = req.body;
  await removepastreservations();
  const userid = s.userid;
  await alog(userid, 'Deleting past reservations', 'Procedure: DELETE_LATE_RESERVATIONS');
  const data = await allrestaurantreservations(userid);
  res.json(data);
});

app.post('/api/deleteaccount', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = '';
  await deleteaccount(userid);
  res.json(data);
});

app.post('/api/rinfo', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await rinfo(userid)
  res.json(data);
});
app.post('/api/cinfo', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await cinfo(userid)
  res.json(data);
});
app.post('/api/pinfo', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await pinfo(userid)
  res.json(data);
});

app.post('/api/seen', async (req, res) => {
  const s = req.body;
  const nid = s.nid;
  const data = '';
  await seen(nid);
  res.json(data);
});
app.post('/api/getpostnotification', async (req, res) => {
  const s = req.body;
  const nid = s.nid;
  const data = await getpostnotification(nid);
  res.json(data);
});
app.post('/api/getordernotification', async (req, res) => {
  const s = req.body;
  const nid = s.nid;
  const data = await getordernotification(nid);
  res.json(data);
});

app.post('/api/getallnotification', async (req, res) => {
  const s = req.body;
  const userid = s.userid;
  const data = await getallnotification(userid);
  res.json(data);
});

app.post('/api/calculatemenuprice', async (req, res) => {
  const s = req.body;
  const data = await calculatemenuprice();
  res.json(data);
});

app.post('/api/calculatetotaltransaction', async (req, res) => {
  const s = req.body;
  const data = await calculatetotaltransaction();
  res.json(data);
});

app.post('/api/calculaterestauranttransaction', async (req, res) => {
  const s = req.body;
  const u1 = s.userid1;
  const u2 = s.userid2;
  await alog(u1, 'Calculating total transaction of ' + u2, 'Procedure: COUNT_TRANSACTION')
  const data = await calculaterestauranttransaction(u2);
  res.json(data);
});


app.post('/api/calculaterestaurantmenutransaction', async (req, res) => {
  const s = req.body;
  const u1 = s.userid1;
  const u2 = s.userid2;
  await alog(u1, 'Calculating total menu transaction of ' + u2, 'Procedure: COUNT_MENU_TRANSACTION');
  const data = await calculaterestaurantmenutransaction(u2);
  res.json(data);
});

app.post('/api/getadminlog', async (req, res) => {
  const s = req.body;
  const data = await getadminlog();
  res.json(data);
});
////

app.post('/api/getallusers', async (req, res) => {
  const s = req.body;
  const data = await getallusers();
  res.json(data);
});


app.post('/api/getallcustomers', async (req, res) => {
  const s = req.body;
  const data = await getallcustomers();
  res.json(data);
});


app.post('/api/getallrestaurants', async (req, res) => {
  const s = req.body;
  const data = await getallrestaurants();
  res.json(data);
});


app.post('/api/getallpages', async (req, res) => {
  const s = req.body;
  const data = await getallpages();
  res.json(data);
});


app.post('/api/getallmenu', async (req, res) => {
  const s = req.body;
  const data = await getallmenu();
  res.json(data);
});


app.post('/api/getallorders1', async (req, res) => {
  const s = req.body;
  const data = await getallorders1();
  res.json(data);
});












function getFileExtension(imagePath) {
  const buffer = fs.readFileSync(imagePath);
  const type = imageType(buffer);

  if (type) {
    return '.' + type.ext;
  }

  return '';
}



async function run(a) {
  let connection;
  let result;
  try {
    console.log('till now');
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'select * FROM USERS where USER_ID = ' + a;
    result = await connection.execute(sqlQuery);
    const sql2 = `select CHECK_PASS('CLA1', 'PASSWORD1') AS RES FROM DUAL`;
    let tyu = await connection.execute(sql2);
    console.log(tyu.rows[0][0] + " thats awhta we gogt");

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
  let r = [1, 2];
  t.forEach(function (item) {
    item.forEach(function (items) {
      if (items != null) console.log(items);
      else console.log('noi data found null => ' + items);
    });
  });
  // t.array.forEach(element => {

  // });
  console.log("we got " + t);
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

async function checkUniqueUsername(username1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT COUNT(*) FROM USERS where USER_NAME = :username';
    const binds = {
      username: username1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}

async function checkAuthentication(username1, password1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT CHECK_PASS(:username, :password) FROM DUAL';
    const binds = {
      username: username1,
      password: password1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}


async function getUserType(username1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT USER_TYPE FROM USERS WHERE USER_NAME = :username`;
    const binds = {
      username: username1,
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}

async function insertUsers(username, password, name, mobileno, email, type, x, y, profile, cover) {

  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO USERS VALUES(USER_ID_SEQ.NEXTVAL, :username , :name , ORA_HASH(:password), :email, :type, :mobileno ,:x, :y, SYSDATE, 'A', '/src/public/images/profilephoto' || USER_ID_SEQ.NEXTVAL || :profile,'/src/public/images/coverphoto' || USER_ID_SEQ.NEXTVAL ||  :cover)`;

    const binds = {
      username: username,
      name: name,
      password: password,
      email: email,
      type: type,
      mobileno: mobileno,
      x: x,
      y: y,
      profile: profile,
      cover: cover
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    let newq = 'SELECT USER_ID FROM USERS WHERE USER_NAME = :username';
    let b2 = {
      username: username
    }
    result = await connection.execute(newq, b2);
    result = result.rows[0][0];
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
  return result;
}


async function insertCustomer(id1, date1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO CUSTOMER VALUES(CUSTOMER_ID_SEQ.NEXTVAL , :id1, TO_DATE( :date1, 'YYYY-MM-DD'), 0)`;
    const binds = {
      id1: id1,
      date1: date1
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function insertRestaurant(id1, date1) {
  let connection;
  let result;
  try {
    console.log(date1);
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO Restaurant VALUES(RESTAURANT_ID_SEQ.NEXTVAL , :id1, TO_DATE( :date1, 'YYYY-MM-DD'), 0)`;
    const binds = {
      id1: id1,
      date1: date1
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    console.log('here');
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

async function insertPage(id1, date1) {
  let connection;
  let result;
  try {
    console.log(date1);
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO FOODIE_PAGE VALUES( :id1, PAGE_ID_SEQ.NEXTVAL , TO_DATE( :date1, 'YYYY-MM-DD'))`;
    const binds = {
      id1: id1,
      date1: date1
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    console.log('here');
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

async function getID(username1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT USER_ID FROM USERS WHERE USER_NAME = :username1';
    const binds = {
      username1: username1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}


async function getPostinfo(postid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT * FROM POSTS WHERE POST_ID =  :postid';
    const binds = {
      postid: postid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0];
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
  return result;
}


async function getUserinfo(username1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT * FROM USERS WHERE USER_NAME = :username1';
    const binds = {
      username1: username1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0];
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
  return result;
}

async function getUserinfoid(id1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT * FROM USERS WHERE USER_ID = :id1';
    const binds = {
      id1: id1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0];
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


  return result;
}

async function getprofilepicture(id1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT PROFILE_PICTURE FROM USERS WHERE USER_ID = :id1';
    const binds = {
      id1: id1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}


async function getcomments(postid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT * FROM COMMENTS WHERE POST_ID = :postid';
    const binds = {
      postid: postid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}


async function addcomments(postid, userid, caption) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'INSERT INTO COMMENTS VALUES(COMMENT_ID_SEQ.NEXTVAL, :postid, :userid, :caption, SYSDATE)';
    const binds = {
      postid: postid,
      userid: userid,
      caption: caption
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function addnewpost(userid, photo, caption) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, :userid , 0, 0, 0,'/src/public/images/postphoto' || POST_ID_SEQ.NEXTVAL || :photo , :caption, SYSDATE, 'N')`;
    const binds = {
      userid: userid,
      photo: photo,
      caption: caption
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    const sql = `SELECT MAX(POST_ID) FROM POSTS`;
    result = await connection.execute(sql);
    result = result.rows[0][0];
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
  return result
}

async function addnewpostwithoutpicture(userid, caption) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, :userid , 0, 0, 0, NULL , :caption, SYSDATE, 'N')`;
    const binds = {
      userid: userid,
      caption: caption
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function getAllPosts() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT POST_ID FROM POSTS ORDER BY TIME DESC';
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result
}


async function removereact(postid, userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM REACTS WHERE POST_ID = :postid AND USER_ID = :userid`;
    const binds = {
      userid: userid,
      postid: postid
    }
    let options = {
      autoCommit: true
    }
    await connection.execute(sqlQuery, binds, options);
    const sql = `UPDATE POSTS SET REACT_COUNT = REACT_COUNT - 1 WHERE POST_ID = :postid`;
    const bind = {
      postid: postid
    }
    await connection.execute(sql, bind, options);
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

async function addreact(postid, userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO REACTS VALUES (:postid, :userid, 'L')`;
    const binds = {
      userid: userid,
      postid: postid
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function reactsituation(postid, userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT COUNT(*) FROM REACTS WHERE POST_ID = :postid AND USER_ID = :userid`;
    const binds = {
      userid: userid,
      postid: postid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}


async function addshare(postid, userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO POSTS VALUES (POST_ID_SEQ.NEXTVAL , :userid, 0,0,0,NULL, NULL, SYSDATE, 'S')`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    await connection.execute(sqlQuery, binds, options);
    const sql = `UPDATE POSTS SET SHARES_COUNT = SHARES_COUNT + 1 WHERE POST_ID = :postid`;
    const bind2 = {
      postid: postid
    }
    await connection.execute(sql, bind2, options);
    const q2 = `SELECT MAX(POST_ID) FROM POSTS`;
    let id1 = await connection.execute(q2);
    const sid1 = id1.rows[0][0];
    const sql3 = `INSERT INTO SHARE_POST VALUES (:postid, :sid1)`;
    const bind3 = {
      sid1: sid1,
      postid: postid,

    }
    await connection.execute(sql3, bind3, options);

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

async function addshare1(postid, userid) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);

    // Insert a new post into POSTS
    const sqlQuery = `INSERT INTO POSTS VALUES (POST_ID_SEQ.NEXTVAL, :userid, 0, 0, 0, NULL, NULL, SYSDATE, 'S')`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    await connection.execute(sqlQuery, binds, options);

    // Get the newly inserted post's ID
    const q2 = `SELECT MAX(POST_ID) FROM POSTS`;
    let id1 = await connection.execute(q2);
    const newPostId = id1.rows[0][0];

    // Update the SHARES_COUNT in POSTS table
    const sql = `UPDATE POSTS SET SHARES_COUNT = SHARES_COUNT + 1 WHERE POST_ID = :newPostId`;
    const bind2 = {
      newPostId: newPostId
    }
    await connection.execute(sql, bind2, options);

    // Insert into SHARE_POST with the new post's ID
    const sql3 = `INSERT INTO SHARE_POST VALUES (:postid, :newPostId)`;
    const bind3 = {
      newPostId: newPostId,
      postid: postid
    }
    await connection.execute(sql3, bind3, options);

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



async function getshare(postid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT ORIGIN_ID FROM SHARE_POST WHERE POST_ID = :postid`;
    const binds = {
      postid: postid
    }
    result = await connection.execute(sqlQuery, binds);

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
  try {
    return result.rows[0][0];
  } catch (err) {
    console.error('Error: ', err);
    return null;
  }
}


async function getAllProfilePosts(userid) {
  let connection;
  let result;
  try {
    console.log('profile posts ' + userid);
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM POSTS WHERE USER_ID = :userid  ORDER BY TIME desc`;
    const binds = {
      userid: userid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
    return result
  }

}


async function giverequest(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO FRIEND_REQUEST VALUES((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1), (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) , 'P')`
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function deleterequest(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM FRIEND_REQUEST WHERE (((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C2_ID) OR ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C2_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C1_ID)) AND STATUS = 'P'`
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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


async function acceptRequest(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE FRIEND_REQUEST SET STATUS = 'A' WHERE (((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C2_ID) OR ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C2_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C1_ID)) AND STATUS = 'P'`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    const sql = `UPDATE CUSTOMER SET FRIENDS = FRIENDS + 1 WHERE USER_ID = :userid1`
    const sql2 = `UPDATE CUSTOMER SET FRIENDS = FRIENDS + 1 WHERE USER_ID = :userid2`
    const b1 = {
      userid1: userid1
    }
    const b2 = {
      userid2: userid2
    }
    await connection.execute(sql, b1, options);
    await connection.execute(sql2, b2, options);
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

async function getFriendRequestStatus(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT C1_ID, C2_ID, STATUS FROM FRIEND_REQUEST WHERE ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C2_ID) OR ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C2_ID)`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    result = await connection.execute(sqlQuery, binds);
    console.log(result.rows)
    if (result.rows.length == 0) return 'no';
    else if (result.rows[0][2] == 'A') return 'yes';
    else {
      const sql = `SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1`;
      const bind = {
        userid1: userid1
      }
      let r2 = await connection.execute(sql, bind);
      if (result.rows[0][0] == r2.rows[0][0]) return 'ownrequest';
      else return 'hisrequest';
    }
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

async function unfriend(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM FRIEND_REQUEST WHERE (((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C1_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C2_ID) OR ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C2_ID AND (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid2) = C1_ID)) AND STATUS = 'A'`
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    const sql = `UPDATE CUSTOMER SET FRIENDS = FRIENDS - 1 WHERE USER_ID = :userid1`
    const sql2 = `UPDATE CUSTOMER SET FRIENDS = FRIENDS - 1 WHERE USER_ID = :userid2`
    const b1 = {
      userid1: userid1
    }
    const b2 = {
      userid2: userid2
    }
    await connection.execute(sql, b1, options);
    await connection.execute(sql2, b2, options);

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

async function getallfriendrequests(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = F.C1_ID) 
      FROM FRIEND_REQUEST F
      WHERE F.C2_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) AND STATUS = 'P'`
    const binds = {
      userid1: userid1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  console.log('frined reqs ' + result.rows + " usreid = " + userid1)
  return result
}

async function getallfriends(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT CASE WHEN C1_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) THEN (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C2_ID) ELSE (SELECT USER_ID FROM CUSTOMER WHERE CUSTOMER_ID = C1_ID) END AS USRID
      FROM FRIEND_REQUEST
      WHERE ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C1_ID OR
      (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) = C2_ID) AND STATUS = 'A'`
    const binds = {
      userid1: userid1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}


async function getinbox(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT CASE WHEN USER1_ID = :userid1 THEN USER2_ID ELSE USER1_ID END AS correspondent,
      MAX(TIME) AS max_time
FROM MESSAGES
WHERE USER1_ID = :userid1 OR USER2_ID = :userid1
GROUP BY CASE WHEN USER1_ID = :userid1 THEN USER2_ID ELSE USER1_ID END
ORDER BY max_time DESC`
    const binds = {
      userid1: userid1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result
}




async function getmessages(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM MESSAGES WHERE (USER1_ID = :userid1 AND USER2_ID = :userid2) OR (USER2_ID = :userid1 AND USER1_ID = :userid2) ORDER BY TIME`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows
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
  return result
}

async function insertmessage(userid1, userid2, caption) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO MESSAGES VALUES(:userid1,:userid2,:caption ,NULL, SYSDATE)`;
    const binds = {
      userid1: userid1,
      userid2: userid2,
      caption: caption
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function getreviewpost(postid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `select * FROM ((REVIEW_POST R LEFT JOIN MENU M ON R.MENU_ID = M.MENU_ID) LEFT JOIN RESTAURANT RS ON (M.RESTAURANT_ID = RS.RESTAURANT_ID)) LEFT JOIN USERS U ON (U.USER_ID = RS.USER_ID) WHERE POST_ID = :postid`
    const binds = {
      postid: postid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}


async function getmenublockinfo(menuid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `select * FROM (MENU M LEFT JOIN RESTAURANT RS ON (M.RESTAURANT_ID = RS.RESTAURANT_ID)) LEFT JOIN USERS U ON (U.USER_ID = RS.USER_ID) WHERE MENU_ID = :menuid`
    const binds = {
      menuid: menuid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}

async function updaterestaurantrating(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE RESTAURANT SET AVERAGE_RATING = (SELECT AVG(RATING) FROM REVIEW_POST r left JOIN RESTAURANT RS ON R.RESTAURANT_ID = RS.RESTAURANT_ID WHERE RS.USER_ID = :userid) WHERE USER_ID = :userid`
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function updatemenurating(menuid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE MENU SET AVERAGE_RATING = (SELECT AVG(RATING) FROM REVIEW_POST WHERE MENU_ID = :menuid) WHERE MENU_ID = :menuid`
    const binds = {
      menuid: menuid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function getmenureviewposts(menuid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `select POST_ID from REVIEW_POST where MENU_ID = :menuid`
    const binds = {
      menuid: menuid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function getrestaurantreviewposts(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `select R.POST_ID from REVIEW_POST R LEFT JOIN RESTAURANT RS ON R.RESTAURANT_ID = RS.RESTAURANT_ID WHERE RS.USER_ID = :userid`
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function getmenu(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT M.MENU_ID FROM MENU M LEFT JOIN RESTAURANT R ON R.RESTAURANT_ID = M.RESTAURANT_ID WHERE R.USER_ID = :userid`
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function unfollow(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM FOLLOW_LIST WHERE USER_ID = :userid1 AND RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2) `
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function setfollow(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO FOLLOW_LIST VALUES(:userid1, (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2), SYSDATE)`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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


async function getfollowstatus(userid1, userid2) {
  let connection;
  let result;
  try {
    console.log(userid1 + " -----  " + userid2)
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT count(*) FROM FOLLOW_LIST WHERE USER_ID = :userid1 AND (RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2)) `
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
    console.log('the resitl ' + result)
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
  return result;
}

async function getrestaurantrating(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT AVERAGE_RATING FROM RESTAURANT WHERE USER_ID = :userid1`
    const binds = {
      userid1: userid1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result
}
async function getfollowlist(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT F.USER_ID FROM FOLLOW_LIST F LEFT JOIN RESTAURANT R ON (F.RESTAURANT_ID = R.RESTAURANT_ID) WHERE R.USER_ID = :userid1`
    const binds = {
      userid1: userid1
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result
}


async function addnewreviewpost(userid, photo, caption, menuid, rating) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, :userid , 0, 0, 0,'/src/public/images/postphoto' || POST_ID_SEQ.NEXTVAL || :photo , :caption, SYSDATE, 'R')`;
    const binds = {
      userid: userid,
      photo: photo,
      caption: caption
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);

    const sql = `SELECT MAX(POST_ID) FROM POSTS`;
    result = await connection.execute(sql);
    let a = result.rows[0][0];
    const s2 = `insert INTO REVIEW_POST VALUES(:menuid, :a, (SELECT RESTAURANT_ID FROM MENU WHERE MENU_ID = :menuid), :rating)`;
    const b2 = {
      menuid: menuid,
      a: a,
      rating: rating
    }
    await connection.execute(s2, b2, options);
    result = result.rows[0][0];
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
  return result
}


async function addnewreviewpostwithoutpicture(userid, caption, rating, menuid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO POSTS VALUES(POST_ID_SEQ.NEXTVAL, :userid , 0, 0, 0, NULL , :caption, SYSDATE, 'R')`;;
    const binds = {
      userid: userid,
      caption: caption
    }
    let options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    const s2 = `INSERT INTO REVIEW_POST VALUES(:menuid, (SELECT MAX(POST_ID) FROM POSTS) , (SELECT RESTAURANT_ID FROM MENU WHERE MENU_ID = :menuid), :rating)`
    const b2 = {
      menuid: menuid,
      rating: rating
    }
    await connection.execute(s2, b2, options)
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


async function findusername(u) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT USER_ID, USER_NAME FROM USERS WHERE UPPER(USER_NAME) LIKE UPPER(:u)`;
    const binds = {
      u: u + '%'
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result
}
async function findusername(u) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT USER_ID, USER_NAME, NAME, USER_TYPE, PROFILE_PICTURE FROM USERS WHERE UPPER(USER_NAME) LIKE UPPER(:u) ORDER BY UPPER(USER_NAME)`;
    const binds = {
      u: u + '%'
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result
}
async function findname(u) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT USER_ID, USER_NAME, NAME, USER_TYPE, PROFILE_PICTURE FROM USERS WHERE UPPER(NAME) LIKE UPPER(:u1) OR UPPER(NAME) LIKE UPPER(:u2) ORDER BY UPPER(NAME)`;
    const binds = {
      u1: u + '%',
      u2: '% ' + u + '%'
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}

async function deletepost(postid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = ` BEGIN
        :result := DELETE_POST(:postid);
      END;
      `;
    const binds = {
      postid: { dir: oracledb.BIND_IN, val: postid },
      result: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const options = {
      autoCommit: true
    }
    await connection.execute(sqlQuery, binds, options);
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

async function deletecomment(commentid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM COMMENTS WHERE COMMENT_ID = :commentid`;
    const binds = {
      commentid: commentid
    };
    const options = {
      autoCommit: true
    };
    const s2 = `UPDATE POSTS SET COMMENT_COUNT = COMMENT_COUNT - 1 WHERE POST_ID = (SELECT POST_ID FROM COMMENTS WHERE COMMENT_ID = :commentid)`;
    await connection.execute(s2, binds, options);
    await connection.execute(sqlQuery, binds, options);

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



async function getnearbyrestaurants(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT USER_ID FROM USERS WHERE USER_TYPE = 'R' 
      ORDER BY (POWER((LOCATION_X - (SELECT LOCATION_X FROM USERS WHERE USER_ID = :userid)),2) + POWER((LOCATION_Y - (SELECT LOCATION_Y FROM USERS WHERE USER_ID = :userid)),2))`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function getfollowedrestaurants(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = 'SELECT U.USER_ID FROM (FOLLOW_LIST F JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID) JOIN USERS U ON(R.USER_ID = U.USER_ID) WHERE F.USER_ID = :userid'
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function addconnection(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO PAGE_CONNECTION VALUES (:userid1, (select PAGE_ID FROM FOODIE_PAGE WHERE USER_ID = :userid2), SYSDATE)`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function removeconnection(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `delete from PAGE_CONNECTION where USER_ID = :userid1 AND PAGE_ID = (SELECT PAGE_ID FROM FOODIE_PAGE WHERE USER_ID = :userid2)`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function connectionstatus(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT COUNT(*) FROM PAGE_CONNECTION P JOIN FOODIE_PAGE F ON (P.PAGE_ID = F.PAGE_ID) JOIN USERS U ON (U.USER_ID = F.USER_ID ) WHERE P.USER_ID = :userid1 AND U.USER_ID = :userid2`
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows[0][0];
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
  return result;
}

async function getconnectedpage(userid1) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT F.USER_ID FROM PAGE_CONNECTION C JOIN FOODIE_PAGE F ON ( C.PAGE_ID = F.PAGE_ID) WHERE C.USER_ID = :userid1 `
    const binds = {
      userid1: userid1
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function addmenu(userid1, menuname, price) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `INSERT INTO MENU VALUES (MENU_ID_SEQ.NEXTVAL, (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID =:userid1), :menuname , :price, 0)`;
    const binds = {
      userid1: userid1,
      menuname: menuname,
      price: price
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function updaterestaurantrating(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE RESTAURANT SET AVERAGE_RATING = (SELECT AVG(RATING) FROM REVIEW_POST WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID=:userid)) WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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


async function getcurrentorders(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT ORDER_ID FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS <> 'D' AND STATUS <> 'R' AND STATUS <> 'U'        
      `;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}


async function getallorders(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT ORDER_ID FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS <> 'U'
      `;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}
async function delivered(orderid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE FOODORDER SET STATUS = 'D' WHERE ORDER_ID = :orderid `
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function ontheway(orderid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE FOODORDER SET STATUS = 'I' WHERE ORDER_ID = :orderid `
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function preparing(orderid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE FOODORDER SET STATUS = 'P' WHERE ORDER_ID = :orderid `
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function removefromcart(orderid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM FOODORDER WHERE ORDER_ID = :orderid and STATUS = 'U'`;
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function clearcart(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `DELETE FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'U' `;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function finalizecart(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `UPDATE FOODORDER SET STATUS = 'O' WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'U' `;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function decreaseamount(orderid) {
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      UPDATE FOODORDER F SET AMOUNT = AMOUNT - 1, TOTALPRICE = TOTALPRICE - (SELECT PRICE FROM MENU WHERE MENU_ID = F.MENU_ID) WHERE F.ORDER_ID = :orderid
      `;
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function increaseamount(orderid) {
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      UPDATE FOODORDER F SET AMOUNT = AMOUNT + 1, TOTALPRICE = TOTALPRICE + (SELECT PRICE FROM MENU WHERE MENU_ID = F.MENU_ID) WHERE F.ORDER_ID = :orderid
      `;
    const binds = {
      orderid: orderid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function insertorder(userid1, menuid, userid2, amount) {
  let connection;
  let result;
  let r = 0;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sql = `select COUNT(*) FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) AND MENU_ID = :menuid AND STATUS = 'U'`;
    const b = {
      userid1: userid1,
      menuid: menuid
    }
    result = await connection.execute(sql, b);
    if (result.rows[0][0] == 0) {
      r = 1;
      const sqlQuery = `
           INSERT INTO FOODORDER VALUES (ORDER_ID_SEQ.NEXTVAL, (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) , :menuid, (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2), SYSDATE, 'U', (SELECT PRICE FROM MENU WHERE MENU_ID = :menuid), :amount)
              `;
      const binds = {
        userid1: userid1,
        userid2: userid2,
        menuid: menuid,
        amount: amount
      }
      const options = {
        autoCommit: true
      }
      result = await connection.execute(sqlQuery, binds, options);
      result = result.rows;
    }
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
  return r;
}

async function getorderinfo(orderid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
SELECT * FROM FOODORDER F LEFT JOIN MENU M ON F.MENU_ID = M.MENU_ID LEFT JOIN
RESTAURANT R ON R.RESTAURANT_ID = M.RESTAURANT_ID LEFT JOIN USERS U ON U.USER_ID = R.USER_ID LEFT JOIN CUSTOMER C ON F.CUSTOMER_ID = C.CUSTOMER_ID
LEFT JOIN USERS U1 ON U1.USER_ID = C.USER_ID  WHERE F.ORDER_ID = :orderid
     `;
    const binds = {
      orderid: orderid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0];
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
  return result;
}


async function getcart(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT ORDER_ID FROM FOODORDER WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid) AND STATUS = 'U'
      ORDER BY TIME DESC`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}


async function pendingorders(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT ORDER_ID FROM FOODORDER WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid) AND STATUS <> 'U' AND STATUS <> 'D' ORDER BY TIME DESC`
    const binds = {
      userid: userid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}

async function allrestaurantorders(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT ORDER_ID FROM FOODORDER WHERE RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid) AND STATUS <> 'U' ORDER BY TIME DESC`;
    const binds = {
      userid: userid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}


async function reservationstatus(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT COUNT(*) FROM RESERVATIONS WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) AND RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2)`
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows[0][0];
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
  return result;
}

async function removereservation(userid1, userid2) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `        
      DELETE FROM RESERVATIONS WHERE CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1) AND RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2)`;
    const binds = {
      userid1: userid1,
      userid2: userid2
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function insertreservation(userid1, userid2, time) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `        
      INSERT INTO RESERVATIONS VALUES ((SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid1),(SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid2), 1, TO_DATE(:time, 'YYYY-MM-DD'))`;
    const binds = {
      userid1: userid1,
      userid2: userid2,
      time: time
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function alluserreservations(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
    SELECT R.*, ( SELECT RS.USER_ID FROM RESTAURANT RS WHERE RS.RESTAURANT_ID = R.RESTAURANT_ID )  FROM RESERVATIONS R WHERE R.CUSTOMER_ID = (SELECT CUSTOMER_ID FROM CUSTOMER WHERE USER_ID = :userid AND TIME > SYSDATE) ORDER BY R.TIME`;
    const binds = {
      userid: userid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}


async function allrestaurantreservations(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
    SELECT R.*, ( SELECT C.USER_ID FROM CUSTOMER C WHERE C.CUSTOMER_ID = R.CUSTOMER_ID )  FROM RESERVATIONS R WHERE R.RESTAURANT_ID = (SELECT RESTAURANT_ID FROM RESTAURANT WHERE USER_ID = :userid AND TIME > SYSDATE) ORDER BY R.TIME`;
    const binds = {
      userid: userid
    }
    result = await connection.execute(sqlQuery, binds);
    result = result.rows;
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
  return result;
}

async function removepastreservations() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      BEGIN DELETE_LATE_RESERVATIONS; END ;`;
    const binds = {

    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function deleteaccount(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      DELETE FROM USERS WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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

async function rinfo(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM RESTAURANT WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function cinfo(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM CUSTOMER WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}


async function pinfo(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM FOODIE_PAGE WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}

async function seen(nid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      UPDATE NOTIFICATION SET STATUS = 'R' WHERE NOTIFICATION_ID = :nid`;
    const binds = {
      nid: nid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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


async function getpostnotification(nid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT POST_ID FROM POST_NOTIFICATION WHERE NOTIFICATION_ID = :nid`;
    const binds = {
      nid: nid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows[0][0];
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
  return result;
}

async function getordernotification(nid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT ORDER_ID FROM ORDER_NOTIFICATION WHERE NOTIFICATION_ID = :nid`;
    const binds = {
      nid: nid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows[0][0];
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
  return result;
}

async function getallnotification(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM NOTIFICATION WHERE USER_ID = :userid`;
    const binds = {
      userid: userid
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    result = result.rows;
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
  return result;
}



async function adminlog(username, act, f) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
    INSERT INTO ADMIN_LOG VALUES(ACTIVITY_ID_SEQ.NEXTVAL, :act, SYSDATE, (SELECT USER_ID FROM USERS WHERE USER_NAME = :username), :f, NULL)
    `;
    const binds = {
      username: username,
      act: act,
      f: f
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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


async function alog(userid, act, f) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
    INSERT INTO ADMIN_LOG VALUES(ACTIVITY_ID_SEQ.NEXTVAL, :act, SYSDATE, :userid, :f, NULL)
    `;
    const binds = {
      userid: userid,
      act: act,
      f: f
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
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

async function calculatemenuprice() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = ` BEGIN
      COUNT_TOTAL_MENU_PRICE(:r);
      END;
      `;
    const binds = {
      r: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    r = result.outBinds.r;
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
  return r;
}
async function calculatetotaltransaction() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = ` BEGIN
      COUNT_TRANSACTION_FOR_ALL(:r);
      END;
      `;
    const binds = {
      r: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    r = result.outBinds.r;
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
  return r;
}
async function calculaterestauranttransaction(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = ` BEGIN
      COUNT_TRANSACTION(:userid, :r);
      END;
      `;
    const binds = {
      userid: userid,
      r: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    r = result.outBinds.r;
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
  return r;
}

async function calculaterestaurantmenutransaction(userid) {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = ` BEGIN
      COUNT_MENU_TRANSACTION(:userid, :r);
      END;
      `;
    const binds = {
      userid: userid,
      r: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
    }
    const options = {
      autoCommit: true
    }
    result = await connection.execute(sqlQuery, binds, options);
    r = result.outBinds.r;
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
  return r;
}

async function getadminlog() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM ADMIN_LOG ORDER BY TIME DESC
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}



async function getallusers() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM USERS ORDER BY USER_ID
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}

async function getallcustomers() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM CUSTOMER C LEFT JOIN USERS U ON U.USER_ID = C.USER_ID ORDER BY C.CUSTOMER_ID
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}

async function getallrestaurants() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM RESTAURANT R LEFT JOIN USERS U ON U.USER_ID = R.USER_ID ORDER BY R.RESTAURANT_ID       
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}

async function getallpages() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM FOODIE_PAGE F LEFT JOIN USERS U ON U.USER_ID = F.USER_ID ORDER BY F.PAGE_ID             
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}



async function getallmenu() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `
      SELECT * FROM MENU M LEFT JOIN RESTAURANT R ON M.RESTAURANT_ID = R.RESTAURANT_ID LEFT JOIN USERS U ON R.USER_ID = U.USER_ID ORDER BY MENU_ID   
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}


async function getallorders1() {
  let connection;
  let result;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const sqlQuery = `SELECT * FROM FOODORDER F LEFT JOIN CUSTOMER C ON F.CUSTOMER_ID = C.CUSTOMER_ID LEFT JOIN USERS U ON U.USER_ID = C.USER_ID LEFT JOIN RESTAURANT R ON F.RESTAURANT_ID = R.RESTAURANT_ID LEFT JOIN USERS U1 ON U1.USER_ID = R.USER_ID LEFT JOIN MENU M ON M.MENU_ID = F.MENU_ID ORDER BY ORDER_ID  
      `;
    result = await connection.execute(sqlQuery);
    result = result.rows;
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
  return result;
}


