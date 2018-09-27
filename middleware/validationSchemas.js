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