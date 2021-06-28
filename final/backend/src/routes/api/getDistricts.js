import { Router } from 'express';
import District from '../../models/District';

const router = Router();

router.get('/getDistricts', async (req, res) => {
    try {
        const version = req.query.ver;
        const existing = await District.findOne({ version });
        if (existing) {
            await District.find({ version }, (err, docs) => {
                if (err)
                    console.log(err);
                else
                    res.status(200).send(docs[0].districts);
            })
        }
        else
            res.status(200).send(`${version} not found`);
    }
    catch (err) {
        console.log("getDistricts error");
        console.log(err);
        res.status(500).send({ error: err });
    }
})

export default router;