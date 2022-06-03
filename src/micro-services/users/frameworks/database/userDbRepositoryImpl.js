const UserModel = require('./userModel');

// move it to a proper place
function omit(obj, ...props) {
  const result = { ...obj };
  props.forEach((prop) => delete result[prop]);
  return result;
}

const userDbRepositoryImpl = () => {
  // mongoose query function to find a record by a givin property
  const findByProperty = (params) => UserModel.find(omit(params, 'page', 'perPage'))
    .skip(params.perPage * params.page - params.perPage)
    .limit(params.perPage);

  // mongoose query function to add new record
  const add = (entity) => {
    const newRecord = new UserModel({
      password: entity.getPassword(),
      email: entity.getEmail(),
      createdAt: new Date(),
    });
    return newRecord.save();
  };

  return {
    findByProperty,
    add,
  };
};

module.exports = {
  userDbRepositoryImpl,
};
