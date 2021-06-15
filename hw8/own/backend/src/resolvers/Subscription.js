const Subscription = {
    comment: {
        async subscribe(parent, { postId }, { db, pubsub }, info) {
            // let post = await db.ChatBoxModel.findOne({ name: postId });

            // if (!post) {
            //     throw new Error('Post not found');
            // }

            return pubsub.asyncIterator(`comment ${postId}`);
        }
    }
}

export default Subscription;