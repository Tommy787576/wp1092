import { getTaipeiVer1, getTaipeiVer2, getNewTaipeiVer1 } from './fetchData';

// get close stations
const getCloseStation = async (version, dist, currLat, currLng) => {
    let data;
    let retData = [];

    if (version === "TaipeiVer1")
        data = await getTaipeiVer1();
    else if (version === "TaipeiVer2")
        data = await getTaipeiVer2();
    else if (version === "NewTaipeiVer1")
        data = await getNewTaipeiVer1();

    return new Promise((resolve, reject) => {
        try {
            data.forEach(async (element) => {
                const tempDist = await getDistanceFromLatLonInKm(
                    parseFloat(element.lat),
                    parseFloat(element.lng),
                    parseFloat(currLat),
                    parseFloat(currLng)
                );
                if (tempDist < dist)
                    retData.push(element);
            })
            console.log("getCloseStation success");
            resolve(retData);
        }
        catch (err) {
            reject("getCloseStation error");
        }
    })
}

// calculate distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    return new Promise((resolve, reject) => {
        try {
            const R = 6371;                                 // radius of the earth in km
            const dLat = (lat2 - lat1) * (Math.PI / 180);   // deg2rad below
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const lat1Rad = lat1 * (Math.PI / 180);
            const lat2Rad = lat2 * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const d = R * c; // distance in km
            resolve(d);
        }
        catch (err) {
            reject("getDistanceFromLatLonInKm error");
        }
    })
}

export default getCloseStation;