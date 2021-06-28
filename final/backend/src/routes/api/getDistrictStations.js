import { Router } from 'express';
import Station from '../../models/Station';

const router = Router();

router.get('/getDistrictStations', async (req, res) => {
    try {
        const version = req.query.ver;
        const district = decodeURI(req.query.district);
        let districtVer = '';

        if (version === "TaipeiVer1")
            districtVer = district + '1.0';
        else if (version === "TaipeiVer2")
            districtVer = district + '2.0';
        else if (version === "NewTaipeiVer1")
            districtVer = district + '1.0';

        const existing = await Station.findOne({ districtVer });
        if (existing) {
            await Station.find({ districtVer }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).send(docs[0].stations);
            })
        }
        else
            res.status(200).send(`not found`);
    }
    catch (err) {
        console.log("getDistrictStations error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;