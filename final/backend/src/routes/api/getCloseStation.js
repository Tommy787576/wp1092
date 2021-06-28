import { Router } from 'express';
import getCloseStation from '../../functions/getCloseStation';

const router = Router();

router.get('/getCloseStation', async (req, res) => {
    try {
        const version = req.query.ver;
        const currLat = req.query.lat;
        const currLng = req.query.lng;
        const dist = req.query.dist;

        const data = await getCloseStation(version, dist, currLat, currLng);

        res.status(200).send(data);
    }
    catch (err) {
        console.log("getCloseStation error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;