import { apiRequest, postJson } from './lib/index.js';

export function todate(date) {
    let jsDate = new Date(date);

    let year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let day = jsDate.getDate();
    let hours = jsDate.getHours();
    let minutes = jsDate.getMinutes();
    let seconds = jsDate.getSeconds();
    let arr = [day, month, year, hours, minutes, seconds]
    let ans = ['', '', '', '', '', '']
    let i = 0;
    for (let s of arr) {
        if (s < 10) {
            ans[i] = '0' + s;
        }
        else ans[i] = '' + s;
        i++;
    }
    return ans;
}
export function haversine(lat1, lon1, lat2, lon2) {
    // Convert latitude and longitude from degrees to radians
    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    // Haversine formula
    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in kilometers
    const R = 6371.0;

    // Calculate the distance
    const distance = R * c;
    return distance;
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export async function loginRequest(username, password) {
    try {
        const { ok, data } = await apiRequest('/api/login', {
            body: { username: '@' + username, password }
        });
        return ok ? data : null;
    } catch (error) {
        console.error('Error :', error);
        return null;
    }
}

export async function getAuthentication(username, password) {
    let s = {
        title: 'getauthentication',
        username: '@' + username,
        password: password
    };
    try {
        const response = await postJson('/api/username', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function findUserType(username) {
    let s = {
        title: 'usertype',
        username: '@' + username
    };
    try {
        const response = await postJson('/api/username', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getID(u) {
    let s = {
        title: 'getid',
        username: u
    };
    try {
        const response = await postJson('/api/username', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallposts() {
    const s = {
        title: 'getallposts'
    };
    try {
        const response = await postJson('/api/getallposts', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getprofilepicture(userid) {
    let s = {
        title: 'getprofilepicture',
        userid: userid
    };
    try {
        const response = await postJson('/api/profilephoto', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getuserinfoid(u) {
    const s = {
        title: 'getuserinfoid',
        userid: u
    };
    try {
        const response = await postJson('/api/username', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function addcomment(userid, postid, caption) {
    const s = {
        postid: postid,
        userid: userid,
        caption: caption
    };
    try {
        const response = await postJson('/api/addcomment', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getcomments(postid) {
    const s = {
        postid: postid
    };
    try {
        const response = await postJson('/api/getcomment', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getpostinfo(postid) {
    const s = {
        title: 'getpostinfo',
        postid: postid
    };
    try {
        const response = await postJson('/api/postinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}



export async function addshare(userid, postid) {
    const s = {
        userid: userid,
        postid: postid
    };
    try {
        const response = await postJson('/api/addshare', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getshare(postid) {
    const s = {
        postid: postid
    };
    try {
        const response = await postJson('/api/getshare', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function addreact(userid, postid) {
    const s = {
        title: 'getreact',
        postid: postid,
        userid: userid
    };
    try {
        const response = await postJson('/api/addreact', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function removereact(userid, postid) {
    const s = {
        title: 'getreact',
        postid: postid,
        userid: userid
    };
    try {
        const response = await postJson('/api/removereact', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function reactsituation(userid, postid) {
    const s = {
        title: 'getreact',
        postid: postid,
        userid: userid
    };
    try {
        const response = await postJson('/api/reactsituation', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallprofileposts(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getallprofileposts', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }

}

export async function getfriendshipstatus(userid1, userid2) {

    const s = {
        title: 'status',
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/friend', s);

        if (response.ok) {
            const data = await response.json();
            console.log(data + ' got from backend')
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function giverequest(userid1, userid2) {

    const s = {
        title: 'giverequest',
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/friend', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }

}
export async function deleterequest(userid1, userid2) {

    const s = {
        title: 'deleterequest',
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/friend', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function acceptrequest(userid1, userid2) {

    const s = {
        title: 'acceptrequest',
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/friend', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function unfriend(userid1, userid2) {
    const s = {
        title: 'unfriend',
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/friend', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallfriendrequests(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getallfriendrequests', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallfriends(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getallfriends', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getinbox(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getinbox', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getmessages(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/getmessages', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function insertmessage(userid1, userid2, caption) {
    const s = {
        userid1: userid1,
        userid2: userid2,
        caption: caption
    }
    try {
        const response = await postJson('/api/insertmessage', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getreviewpost(postid) {
    const s = {
        postid: postid
    }
    try {
        const response = await postJson('/api/getreviewpost', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getmenublockinfo(menuid) {
    const s = {
        menuid: menuid
    }
    try {
        const response = await postJson('/api/getmenublockinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function getmenureviewposts(menuid) {
    const s = {
        menuid: menuid
    }
    try {
        const response = await postJson('/api/getmenureviewposts', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function getrestaurantreviewposts(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getrestaurantreviewposts', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getmenu(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getmenu', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getfollowstatus(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/getfollowstatus', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function setfollow(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/setfollow', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function unfollow(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/unfollow', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getrestaurantrating(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getrestaurantrating', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getfollowlist(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getfollowlist', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function findusername(u) {
    const s = {
        u: u
    }
    try {
        const response = await postJson('/api/findusername', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function findname(u) {
    const s = {
        u: u
    }
    try {
        const response = await postJson('/api/findname', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function deletepost(postid) {
    const s = {
        postid: postid
    }
    try {
        const response = await postJson('/api/deletepost', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function deletecomment(commentid) {
    const s = {
        commentid: commentid
    }
    try {
        const response = await postJson('/api/deletecomment', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getnearbyrestaurants(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getnearbyrestaurants', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getfollowedrestaurants(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getfollowedrestaurants', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function connectionstatus(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/connectionstatus', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function addconnection(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/addconnection', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function removeconnection(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/removeconnection', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getconnectedpage(userid1) {
    const s = {
        userid1: userid1
    }
    try {
        const response = await postJson('/api/getconnectedpage', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallorders(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getallorders', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getcurrentorders(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getcurrentorders', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getcart(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getcart', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function clearcart(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/clearcart', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function finalizecart(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/finalizecart', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function delivered(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/delivered', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function ontheway(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/ontheway', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function preparing(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/preparing', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function removefromcart(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/removefromcart', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function increaseamount(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/increaseamount', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function decreaseamount(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/decreaseamount', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getorderinfo(orderid) {
    const s = {
        orderid: orderid
    }
    try {
        const response = await postJson('/api/getorderinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function insertorder(userid1, menuid, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2,
        menuid: menuid
    }
    try {
        const response = await postJson('/api/insertorder', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}




export async function pendingorders(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/pendingorders', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}




export async function allrestaurantorders(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/allrestaurantorders', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function reservationstatus(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/reservationstatus', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function removereservation(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/removereservation', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function insertreservation(userid1, userid2, time) {
    const s = {
        userid1: userid1,
        userid2: userid2,
        time: time
    }
    try {
        const response = await postJson('/api/insertreservation', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function alluserreservations(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/alluserreservations', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function allrestaurantreservations(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/allrestaurantreservations', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function deleteaccount(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/deleteaccount', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function rinfo(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/rinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function cinfo(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/cinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function pinfo(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/pinfo', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function seen(nid) {
    const s = {
        nid: nid
    }
    try {
        const response = await postJson('/api/seen', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function getpostnotification(nid) {
    const s = {
        nid: nid
    }
    try {
        const response = await postJson('/api/getpostnotification', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getordernotification(nid) {
    const s = {
        nid: nid
    }
    try {
        const response = await postJson('/api/getordernotification', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getallnotification(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getallnotification', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function calculatemenuprice() {
    const s = {
    }
    try {
        const response = await postJson('/api/calculatemenuprice', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function calculatetotaltransaction() {
    const s = {
    }
    try {
        const response = await postJson('/api/calculatetotaltransaction', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function calculaterestauranttransaction(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/calculaterestauranttransaction', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function calculaterestaurantmenutransaction(userid1, userid2) {
    const s = {
        userid1: userid1,
        userid2: userid2
    }
    try {
        const response = await postJson('/api/calculaterestaurantmenutransaction', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}



export async function getadminlog() {
    const s = {
    }
    try {
        const response = await postJson('/api/getadminlog', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

//

export async function getallusers() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallusers', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getallcustomers() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallcustomers', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getallrestaurants() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallrestaurants', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getallpages() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallpages', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getallmenu() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallmenu', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
export async function getallorders1() {
    const s = {
    }
    try {
        const response = await postJson('/api/getallorders1', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function updatepassword(userid, password, currentPassword) {
    const s = {
        userid: userid,
        password: password,
        currentPassword: currentPassword
    }
    try {
        const response = await postJson('/api/updatepassword', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function updatepost(postid, caption) {
    const s = {
        postid: postid,
        caption: caption
    }
    try {
        const response = await postJson('/api/updatepost', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function getcustomertimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getcustomertimeline', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}

export async function getrestauranttimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getrestauranttimeline', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}


export async function getpagetimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await postJson('/api/getpagetimeline', s);

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}
