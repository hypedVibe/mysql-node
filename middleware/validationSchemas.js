exports.post_profile = {
  required: [
    'firstName',
    'lastName',
    'email'
  ],
  notAllowed: [
    'rate'
  ]
};

exports.put_profile = {
  notAllowed: [
    'rate'
  ]
};

exports.post_food = {
  required: [
    'name',
    'description',
    'expirationTime',
    'userId'
  ],
  notAllowed: [
    'isExpired'
  ]
};

exports.put_food = {
  required: [
    'id',
    'userId'
  ],
  notAllowed: [
    'isExpired'
  ]
};

exports.get_food = {
  required: [
    'userId'
  ]
};

exports.delete_food = {
  require: [
    'userId'
  ]
};