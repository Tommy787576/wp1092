import mongo from './mongo';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import dotenv from 'dotenv-defaults';
import initDatabase from './functions/initDatabase';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 8888, () => {
    console.log('Listening on port ' + server.address().port);
});

initDatabase();