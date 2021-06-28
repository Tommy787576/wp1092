import { getTaipeiVer1, getTaipeiVer2, getNewTaipeiVer1 } from './fetchData';

const getStationPos = (station, ver) => {
    let result = {};

    return new Promise(async (resolve, reject) => {
        try {
            if (ver === '1.0') {
                result = await findLatLng('TaipeiVer1', station);

                if (Object.keys(result).length === 0)
                    result = await findLatLng('NewTaipeiVer1', station);

                console.log("getStationPos success");
                resolve(result);
            }
            else if (ver === '2.0') {
                result = await findLatLng('TaipeiVer2', station);

                console.log("getStationPos success");
                resolve(result);
            }
        }
        catch (err) {
            reject("getStationPos error");
        }
    })
}

const findLatLng = (version, station) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = [];
            let result = {};
            let prefix = '';

            if (version === "TaipeiVer1")
                data = await getTaipeiVer1();
            else if (version === "TaipeiVer2") {
                data = await getTaipeiVer2();
                prefix = 'YouBike2.0_';
            }
            else if (version === "NewTaipeiVer1")
                data = await getNewTaipeiVer1();

            for (let i = 0; i < data.length; i++) {
                if (data[i].sna === `${prefix}${station}`) {
                    result = { lat: data[i].lat, lng: data[i].lng, version };
                    break;
                }
            }

            resolve(result);
        }
        catch (err) {
            reject("findLatLng error");
        }
    })
}

export default getStationPos;