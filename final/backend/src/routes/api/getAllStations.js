import { Router } from 'express';
import VerAllStations from '../../models/VerAllStations';

const router = Router();

router.get('/getAllStations', async (req, res) => {
    try {
        const version = req.query.ver;
        const { stations } = await VerAllStations.findOne({ version });;

        res.status(200).send(stations);
    }
    catch (err) {
        console.log("getAllStations error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;