const Message = {
  sender(parent, args, { db }, info) {
    return db.users.find((user) => {
      return user.name === parent.name;
    });
  },
};

export { Message as default };
