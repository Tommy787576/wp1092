import { Router } from 'express';
import { getTaipeiVer1, getTaipeiVer2, getNewTaipeiVer1 } from '../../functions/fetchData';

const router = Router();

router.get('/getStationsInfo', async (req, res) => {
    try {
        const infos = req.query.infos;
        const version = req.query.ver;
        const infosParse = [];
        let ver2Head = "";
        let data;

        infos.forEach(info => infosParse.push(JSON.parse(info)));

        if (version === "TaipeiVer1")
            data = await getTaipeiVer1();
        else if (version === "TaipeiVer2") {
            ver2Head = "YouBike2.0_";
            data = await getTaipeiVer2();
        }
        else if (version === "NewTaipeiVer1")
            data = await getNewTaipeiVer1();

        const result = data.filter(element => {
            const test = infosParse.filter(info =>
                info.district === element.sarea && `${ver2Head}${info.station}` === element.sna
            )
            return test.length > 0;
        })

        console.log("getStationInfo router success");
        res.status(200).send(result);
    }
    catch (err) {
        console.log("getStationsInfo router error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;