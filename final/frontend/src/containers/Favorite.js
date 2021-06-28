import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import axios from '../api';
import { Link } from "react-router-dom";

const mapping = { 'TaipeiVer1': '台北1.0', 'TaipeiVer2': '台北2.0', 'NewTaipeiVer1': '新北1.0' };

const Favorite = () => {
    const [favoriteData, setFavoriteData] = useState([]);
    const [favorite, setFavorite] = useState({});
    const [favoriteString, setFavoriteString] = useState({});
    const [version, setVersion] = useState('TaipeiVer1');
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("favoriteStations"));
        temp = temp || {};

        const infos = temp['TaipeiVer1'];
        if (infos !== undefined) {
            if (Object.keys(infos).length !== 0) {
                axios.get('/api/getStationsInfo', {
                    params: {
                        ver: 'TaipeiVer1',
                        infos
                    }
                }).then(({ data }) => {
                    setFavoriteData(data);
                    setFavorite(temp);
                    setFavoriteString(JSON.stringify(temp));
                }).catch(err => {
                    console.log("useEffect getStationsInfo error");
                })
            }
            else
                setFavoriteData([]);
        }
        else
            setFavoriteData([]);
    }, [])

    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem("favoriteStations"));
        temp = temp || {};
        const infos = temp[version];
        if (infos !== undefined) {
            if (Object.keys(infos).length !== 0) {
                axios.get('/api/getStationsInfo', {
                    params: {
                        ver: version,
                        infos
                    }
                }).then(({ data }) => {
                    setFavoriteData(data);
                    setFavorite(temp);
                    setFavoriteString(JSON.stringify(temp));
                    setFlag(true);
                }).catch(err => {
                    console.log("useEffect getStationsInfo error");
                })
            }
            else {
                setFavoriteData([]);
                setFlag(true);
            }
        }
        else {
            setFavoriteData([]);
            setFlag(true);
        }
    }, [favoriteString, version])

    const handleDel = (station, district) => {
        if (version === 'TaipeiVer2')
            station = station.substring(11);
        if (window.confirm(`確定要刪除 ${station} `)) {
            const temp = favorite;
            const idx = temp[version].findIndex((element) => element.district === district && element.station === station);
            if (idx !== -1)
                temp[version].splice(idx, 1);
            setFavorite(temp);
            setFavoriteString(JSON.stringify(temp));
            localStorage.setItem("favoriteStations", JSON.stringify(temp));
        }
    }

    return (
        <Layout>
            <section className="container">
                <ul className="nav nav-tabs my-5">
                    <li className="nav-item">
                        <div className={version === 'TaipeiVer1' ? "nav-link active" : "nav-link"} onClick={() => setVersion('TaipeiVer1')}>台北1.0</div>
                    </li>
                    <li className="nav-item">
                        <div className={version === 'NewTaipeiVer1' ? "nav-link active" : "nav-link"} onClick={() => setVersion('NewTaipeiVer1')}>新北1.0</div>
                    </li>
                    <li className="nav-item">
                        <div className={version === 'TaipeiVer2' ? "nav-link active" : "nav-link"} onClick={() => setVersion('TaipeiVer2')}>台北2.0</div>
                    </li>
                </ul>
                <div id="favorite-stop-display" className="row d-flex justify-content-center my-5">
                    {flag && (favoriteData.length === 0 ? (
                        <h4 style={{ textAlign: "center" }}>
                            您尚未有 {mapping[version]} 常用車站<br />
                            請按 <Link id="myLoc" className="btn btn-primary" to="/favorite-edit">新增常用車站</Link> 新增
                        </h4>) :
                        favoriteData.map(data => {
                            return (
                                <div className="card mx-4 my-3 col-sm-6 col-md-4 bg-light" style={{ maxWidth: '18rem', padding: '0px 0px' }}>
                                    <div className="card-header text-center"><h5>{version === 'TaipeiVer2' ? data.sna.substring(11) : data.sna}</h5></div>
                                    <div className="card-body">
                                        <p className="card-text">可借車數：{data.sbi}</p>
                                        <p className="card-text">可還空位數：{data.bemp}</p>
                                        <p className="card-text">
                                            更新時間：{version === 'TaipeiVer2' ?
                                                data.mday :
                                                `${data.mday.slice(0, 4)}-${data.mday.slice(4, 6)}-${data.mday.slice(6, 8)} ${data.mday.slice(8, 10)}:${data.mday.slice(10, 12)}:${data.mday.slice(12, 14)}`
                                            }
                                        </p>
                                        <p className="card-text">詳細位置：{data.ar}</p>
                                    </div>
                                    <div className="card-footer text-muted text-center">
                                        <button onClick={() => handleDel(data.sna, data.sarea)} className="btn btn-danger">
                                            刪除
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </section>
        </Layout >
    )
}

export default Favorite;