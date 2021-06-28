import axios from 'axios';

const TAIPEI_VER1_URL = 'https://tcgbusfs.blob.core.windows.net/blobyoubike/YouBikeTP.json';
const TAIPEI_VER2_URL = 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json';
const NEWTAIPEI_VER1_URL = 'https://data.ntpc.gov.tw/api/datasets/71CD1490-A2DF-4198-BEF1-318479775E8A/json?page=0&size=1000';

export const getTaipeiVer1 = () => {
    return new Promise((resolve, reject) => {
        axios.get(TAIPEI_VER1_URL)
            .then(({ data }) => {
                let arr = [];

                for (let i in data.retVal)
                    arr.push(data.retVal[i]);

                console.log("getTaipeiVer1 success");
                resolve(arr);
            })
            .catch(err => {
                reject("getTaipeiVer1 error");
            })
    })
}

export const getTaipeiVer2 = () => {
    return new Promise((resolve, reject) => {
        axios.get(TAIPEI_VER2_URL)
            .then(({ data }) => {
                console.log("getTaipeiVer2 success");
                resolve(data);
            })
            .catch(err => {
                reject("getTaipeiVer2 error");
            })
    })
}

export const getNewTaipeiVer1 = () => {
    return new Promise((resolve, reject) => {
        axios.get(NEWTAIPEI_VER1_URL, { params: { format: 'json', top: 2000 } })
            .then(({ data }) => {
                console.log("getNewTaipeiVer1 success");
                resolve(data);
            })
            .catch(err => {
                reject("getNewTaipeiVer1 error");
            })
    })
}