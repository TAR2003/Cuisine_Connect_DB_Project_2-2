
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


