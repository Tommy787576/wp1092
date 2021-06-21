const Subscription = {
  chatBox: {
    subscribe(parent, { name }, { db, pubsub }, info) {
      console.log(`Subscribe ${name}`);
      return pubsub.asyncIterator(`chatBox ${name}`);
    },
  },
};

export { Subscription as default };

