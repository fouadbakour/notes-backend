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

  // mongoose query function to count all records
  const countAll = (params) => UserModel.countDocuments(omit(params, 'page', 'perPage'));

  // mongoose query function to find record by document ID
  const findById = (id) => UserModel.findById(id).select('-password');

  // mongoose query function to find record by document ID and remove it
  const deleteById = (id) => UserModel.findByIdAndRemove(id);

  // mongoose query function to add new record
  const add = (userEntity) => {
    const newUser = new UserModel({
      password: userEntity.getPassword(),
      email: userEntity.getEmail(),
      createdAt: new Date(),
    });

    return newUser.save();
  };

  return {
    findByProperty,
    countAll,
    findById,
    add,
    deleteById,
  };
};

module.exports = {
  userDbRepositoryImpl,
};
