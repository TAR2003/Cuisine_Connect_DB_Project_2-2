const ADMIN_PATHS = new Set([
  '/api/user',
  '/api/getadminlog',
  '/api/getallusers',
  '/api/getallcustomers',
  '/api/getallrestaurants',
  '/api/getallpages',
  '/api/getallmenu',
  '/api/getallorders1',
  '/api/calculatetotaltransaction',
  '/api/calculatemenuprice'
]);

const SELF_FIELDS = {
  '/api/addcomment': ['userid'],
  '/api/addpostwithoutmedia': ['userid'],
  '/api/addreviewpostwithoutmedia': ['userid'],
  '/addpostwithpicture': ['userid'],
  '/addreviewpostwithpicture': ['userid'],
  '/api/addreact': ['userid'],
  '/api/removereact': ['userid'],
  '/api/addshare': ['userid'],
  '/api/setfollow': ['userid1'],
  '/api/unfollow': ['userid1'],
  '/api/addconnection': ['userid1'],
  '/api/removeconnection': ['userid1'],
  '/api/addmenu': ['userid1'],
  '/api/insertorder': ['userid1'],
  '/api/getcart': ['userid'],
  '/api/clearcart': ['userid'],
  '/api/finalizecart': ['userid'],
  '/api/getcurrentorders': ['userid'],
  '/api/getallorders': ['userid'],
  '/api/pendingorders': ['userid'],
  '/api/allrestaurantorders': ['userid'],
  '/api/alluserreservations': ['userid'],
  '/api/allrestaurantreservations': ['userid'],
  '/api/getinbox': ['userid'],
  '/api/getallfriendrequests': ['userid1'],
  '/api/getallfriends': ['userid1'],
  '/api/getallnotification': ['userid'],
  '/api/getpostnotification': ['userid'],
  '/api/getordernotification': ['userid'],
  '/api/seen': ['userid'],
  '/api/updatepassword': ['userid'],
  '/api/deleteaccount': ['userid'],
  '/api/insertreservation': ['userid1'],
  '/api/removereservation': ['userid1'],
  '/api/calculaterestauranttransaction': ['userid1'],
  '/api/calculaterestaurantmenutransaction': ['userid1']
};

const EITHER_USER = new Set(['/api/friend', '/api/getmessages', '/api/insertmessage']);

const POST_OWNER = new Set(['/api/deletepost', '/api/updatepost']);
const COMMENT_OWNER = new Set(['/api/deletecomment']);
const ORDER_RESTAURANT = new Set(['/api/delivered', '/api/ontheway', '/api/preparing']);
const ORDER_CUSTOMER = new Set(['/api/removefromcart', '/api/decreaseamount', '/api/increaseamount']);
const ORDER_EITHER = new Set(['/api/getorderinfo']);

function active(actor) {
  return Boolean(actor && actor.activeStatus === 'A' && actor.userId != null);
}

function same(actor, value) {
  return active(actor) && Number(actor.userId) === Number(value);
}

function canDisableAccount(actor, targetUserId) {
  return same(actor, targetUserId);
}

function canReadAdmin(actor) {
  return active(actor) && actor.userType === 'A';
}

function canActAs(actor, userId) {
  return same(actor, userId);
}

function canParticipate(actor, parties, role) {
  if (!active(actor) || !parties) return false;
  if (role === 'customer') return Number(actor.userId) === Number(parties.customerUserId);
  if (role === 'restaurant') return Number(actor.userId) === Number(parties.restaurantUserId);
  return canParticipate(actor, parties, 'customer') || canParticipate(actor, parties, 'restaurant');
}

function forbid(message) {
  return { ok: false, status: 403, code: 'FORBIDDEN', message };
}

function decide(path, actor, body) {
  if (!active(actor)) {
    return { ok: false, status: 401, code: 'UNAUTHORIZED', message: 'Sign in required' };
  }
  if (ADMIN_PATHS.has(path)) {
    return canReadAdmin(actor) ? { ok: true } : forbid('Admin role required');
  }
  if (path === '/api/deleteaccount') {
    return canDisableAccount(actor, body && body.userid)
      ? { ok: true }
      : forbid('You can only disable your own account');
  }
  if (SELF_FIELDS[path]) {
    const fields = SELF_FIELDS[path];
    for (const field of fields) {
      if (body && body[field] != null && body[field] !== '' && !canActAs(actor, body[field])) {
        return forbid('Not allowed');
      }
    }
    return { ok: true };
  }
  if (EITHER_USER.has(path)) {
    const ids = [body && body.userid1, body && body.userid2, body && body.userid];
    if (!ids.some((id) => id != null && id !== '' && canActAs(actor, id))) {
      return forbid('Not allowed');
    }
    return { ok: true };
  }
  if (POST_OWNER.has(path)) {
    return { ok: true, resource: 'post', id: body && body.postid, allowAdmin: path === '/api/deletepost' };
  }
  if (COMMENT_OWNER.has(path)) {
    return { ok: true, resource: 'comment', id: body && body.commentid, allowAdmin: true };
  }
  if (ORDER_RESTAURANT.has(path)) return { ok: true, resource: 'order', role: 'restaurant', id: body && body.orderid };
  if (ORDER_CUSTOMER.has(path)) return { ok: true, resource: 'order', role: 'customer', id: body && body.orderid };
  if (ORDER_EITHER.has(path)) return { ok: true, resource: 'order', role: 'either', id: body && body.orderid };
  return { ok: true };
}

module.exports = {
  canDisableAccount,
  canReadAdmin,
  canActAs,
  canParticipate,
  decide
};
