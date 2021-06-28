import mongoose from 'mongoose';

const connectMongo = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('mongo connected!');
    });
}

const mongo = {
    connect: connectMongo,
};

export default mongo;