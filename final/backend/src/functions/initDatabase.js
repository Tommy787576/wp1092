import { getTaipeiVer1, getTaipeiVer2, getNewTaipeiVer1 } from './fetchData';
import District from '../models/District';
import Station from '../models/Station';
import VerAllStations from '../models/VerAllStations';

const initDatabase = async () => {
    try {
        await District.deleteMany({});
        await Station.deleteMany({});
        await VerAllStations.deleteMany({});

        await setDatabase('TaipeiVer1');
        await setDatabase('TaipeiVer2');
        await setDatabase('NewTaipeiVer1');

        console.log('Initialize database success!');
    }
    catch (err) {
        console.log('Initialize database fail!');
    }
}

const setDatabase = async (version) => {
    let data;
    let districts = [];
    let stations = {};
    let allStations = [];
    let id = '';

    if (version === "TaipeiVer1") {
        data = await getTaipeiVer1();
        id = '1.0';
    }
    else if (version === "TaipeiVer2") {
        data = await getTaipeiVer2();
        id = '2.0';
    }
    else if (version === "NewTaipeiVer1") {
        data = await getNewTaipeiVer1();
        id = '1.0';
    }

    return new Promise(async (resolve, reject) => {
        try {
            data.forEach(async (element) => {

                let { sarea, sna, lat, lng } = element;

                if (version === "TaipeiVer2")
                    sna = sna.substring(11);

                allStations.push(sna);
                if (!districts.includes(sarea))
                    districts.push(sarea);

                if (!(sarea in stations))
                    stations[sarea] = [sna];
                else
                    stations[sarea].push(sna);
            })

            try {
                const districtsDB = new District({ version, districts });
                const verAllStations = new VerAllStations({ version: id, stations: allStations });

                await districtsDB.save();

                const doc = await VerAllStations.findOne({ version: id });
                if (doc === null)
                    await verAllStations.save();
                else {
                    doc.stations = [...doc.stations, ...allStations];
                    await doc.save();
                }

                for (let i in stations) {
                    const districtVer = i + id;
                    const stationsDB = new Station({
                        districtVer,
                        stations: stations[i]
                    });
                    await stationsDB.save();
                }
            }
            catch (err) {
                throw new Error("Instances creation error");
            };

            resolve("success");
        }
        catch (err) {
            reject("setDatabase error");
        }
    });
}

export default initDatabase;