import { Router } from 'express';
import getStationPos from '../../functions/getStationPos';
import getCloseStation from '../../functions/getCloseStation';

const router = Router();

router.get('/getCloseStationByPos', async (req, res) => {
    try {
        const { ver, station, dist } = req.query;

        const pos = await getStationPos(station, ver);

        const { lat, lng, version } = pos;
        const data = await getCloseStation(version, dist, lat, lng);

        console.log("getCloseStationByPos router success");
        res.status(200).send({ data, lat, lng });
    }
    catch (err) {
        console.log("getCloseStationByPos router error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;