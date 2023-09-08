
export function todate(date) {
    let jsDate = new Date(date);

    let year = jsDate.getFullYear();
    let month = jsDate.getMonth() + 1;
    let day = jsDate.getDate();
    let hours = jsDate.getHours();
    let minutes = jsDate.getMinutes();
    let seconds = jsDate.getSeconds();
    return [day, month, year, hours, minutes, seconds];
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



export async function getAuthentication(username, password) {
    let s = {
        title: 'getauthentication',
        username: '@' + username,
        password: password
    };
    try {
        const response = await fetch('http://localhost:3001/api/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/profilephoto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/username', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/addcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getcomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/postinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/addshare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getshare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/addreact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/removereact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/reactsituation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallprofileposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/friend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallfriendrequests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallfriends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getinbox', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getmessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/insertmessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getreviewpost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getmenublockinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getmenureviewposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getrestaurantreviewposts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getmenu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getfollowstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/setfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/unfollow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getrestaurantrating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getfollowlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/findusername', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/findname', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/deletepost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/deletecomment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getnearbyrestaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getfollowedrestaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/connectionstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/addconnection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/removeconnection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getconnectedpage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getcurrentorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/clearcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/finalizecart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/delivered', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/ontheway', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/preparing', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/removefromcart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/increaseamount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/decreaseamount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getorderinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/insertorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/pendingorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/allrestaurantorders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/reservationstatus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/removereservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/insertreservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/alluserreservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/allrestaurantreservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/deleteaccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/rinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/cinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/pinfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/seen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getpostnotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getordernotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallnotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/calculatemenuprice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/calculatetotaltransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/calculaterestauranttransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/calculaterestaurantmenutransaction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getadminlog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallusers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallcustomers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallrestaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallpages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallmenu', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

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
        const response = await fetch('http://localhost:3001/api/getallorders1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(s)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error :', error);
    }
}