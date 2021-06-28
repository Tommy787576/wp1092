import { Router } from 'express';
import { getTaipeiVer1, getTaipeiVer2, getNewTaipeiVer1 } from '../../functions/fetchData';

const router = Router();

router.get('/fetchData', async (req, res) => {
    try {
        const version = req.query.ver;
        let data = [];

        if (version === "TaipeiVer1")
            data = await getTaipeiVer1();
        else if (version === "TaipeiVer2")
            data = await getTaipeiVer2();
        else if (version === "NewTaipeiVer1")
            data = await getNewTaipeiVer1();

        console.log("fetchData router success");
        res.status(200).send(data);
    }
    catch (err) {
        console.log("fetchData router error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;