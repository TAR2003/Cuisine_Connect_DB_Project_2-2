
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
        const response = await fetch('/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: '@' + username,
                password: password
            })
        });
        const data = await response.json().catch(() => null);
        return response.ok ? data : null;
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
        const response = await fetch('/api/username', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/username', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/username', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallposts', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/profilephoto', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/username', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/addcomment', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getcomment', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/postinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/addshare', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getshare', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/addreact', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/removereact', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/reactsituation', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallprofileposts', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/friend', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/friend', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/friend', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/friend', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/friend', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallfriendrequests', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallfriends', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getinbox', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getmessages', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/insertmessage', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getreviewpost', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getmenublockinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getmenureviewposts', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getrestaurantreviewposts', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getmenu', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getfollowstatus', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/setfollow', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/unfollow', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getrestaurantrating', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getfollowlist', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/findusername', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/findname', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/deletepost', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/deletecomment', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getnearbyrestaurants', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getfollowedrestaurants', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/connectionstatus', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/addconnection', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/removeconnection', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getconnectedpage', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallorders', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getcurrentorders', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getcart', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/clearcart', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/finalizecart', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/delivered', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/ontheway', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/preparing', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/removefromcart', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/increaseamount', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/decreaseamount', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getorderinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/insertorder', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/pendingorders', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/allrestaurantorders', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/reservationstatus', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/removereservation', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/insertreservation', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/alluserreservations', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/allrestaurantreservations', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/deleteaccount', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/rinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/cinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/pinfo', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/seen', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getpostnotification', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getordernotification', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallnotification', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/calculatemenuprice', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/calculatetotaltransaction', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/calculaterestauranttransaction', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/calculaterestaurantmenutransaction', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getadminlog', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallusers', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallcustomers', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallrestaurants', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallpages', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallmenu', {
            method: 'POST',
            credentials: 'include',
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
        const response = await fetch('/api/getallorders1', {
            method: 'POST',
            credentials: 'include',
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

export async function updatepassword(userid, password, currentPassword) {
    const s = {
        userid: userid,
        password: password,
        currentPassword: currentPassword
    }
    try {
        const response = await fetch('/api/updatepassword', {
            method: 'POST',
            credentials: 'include',
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

export async function updatepost(postid, caption) {
    const s = {
        postid: postid,
        caption: caption
    }
    try {
        const response = await fetch('/api/updatepost', {
            method: 'POST',
            credentials: 'include',
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


export async function getcustomertimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await fetch('/api/getcustomertimeline', {
            method: 'POST',
            credentials: 'include',
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

export async function getrestauranttimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await fetch('/api/getrestauranttimeline', {
            method: 'POST',
            credentials: 'include',
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


export async function getpagetimeline(userid) {
    const s = {
        userid: userid
    }
    try {
        const response = await fetch('/api/getpagetimeline', {
            method: 'POST',
            credentials: 'include',
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
