import React, { useEffect, useState } from 'react';
import axios from '../api';
import Layout from '../Layout';
import './FavoriteEdit.css';
import { Link } from "react-router-dom";

const FavoriteEdit = () => {
    const [version, setVersion] = useState('TaipeiVer1');
    const [districts, setDistricts] = useState([]);
    const [currDistrict, setCurrDistrict] = useState('');
    const [stations, setStations] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get('/api/getDistricts', {
            params: {
                ver: 'TaipeiVer1',
            }
        }).then(({ data }) => {
            setDistricts(data);
            setCurrDistrict(data[0]);
        }).catch(err => {
            console.log("useEffect getDistricts error");
        })
    }, [])

    useEffect(() => {
        axios.get('/api/getDistricts', {
            params: {
                ver: version,
            }
        }).then(({ data }) => {
            setDistricts(data);
            setCurrDistrict(data[0]);
        }).catch(err => {
            console.log("useEffect getDistricts error");
        })
    }, [version])

    useEffect(() => {
        axios.get('/api/getDistrictStations', {
            params: {
                ver: version,
                district: encodeURI(currDistrict)
            }
        }).then(({ data }) => {
            if (data !== 'not found') {
                setStations(data);
            }
        }).catch(err => {
            console.log("useEffect getDistrictStations error");
        })
    }, [currDistrict])

    const updateSearch = (event) => setSearch(event.target.value);

    const handleSave = (station) => {
        // get favorite stops from localStorage
        const temp = JSON.parse(localStorage.getItem("favoriteStations"));
        let favoriteStations = temp || { "TaipeiVer1": [], "TaipeiVer2": [], "NewTaipeiVer1": [] };
        const result = favoriteStations[version].filter(element =>
            element.district === currDistrict && element.station === station);
        if (result.length > 0)
            alert(` ${station} 已經是常用車站`);
        else {
            favoriteStations[version].push({ district: currDistrict, station });
            localStorage.setItem("favoriteStations", JSON.stringify(favoriteStations));

            alert(` ${station} 加入成功`);
        }
    }

    const filterList = () => {
        let updatedList = stations.filter(station => {
            return station.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        let data = updatedList.map(station => {
            return (<button key={station} className="btn btn-secondary mx-2 my-2" onClick={() => handleSave(station)}>{station}</button>);
        })
        return data
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
                <ul className="d-flex justify-content-center nav nav-pills my-5">
                    {districts.map((district, idx) => {
                        return <div key={district + toString(idx)} className={district === currDistrict ? "nav-link active" : "nav-link"} onClick={() => setCurrDistrict(district)}>{district}</div>
                    })}
                </ul>
                <div className="input-group rounded">
                    <input type="search" className="form-control rounded" onChange={(event) => updateSearch(event)} placeholder={version === 'TaipeiVer2' ? `搜尋${currDistrict}2.0車站` : `搜尋${currDistrict}1.0車站`} />
                    <span className="input-group-text border-0" id="search-addon">
                        <i className="fas fa-search"></i>
                    </span>
                </div>
                <ul className="d-flex justify-content-center nav nav-pills my-4">
                    {filterList()}
                </ul>
            </section>
            <div style={{ textAlign: 'center' }}>
                <Link className="btn btn-primary my-4" to="/favorite">回到常用車站</Link>
            </div>
        </Layout>
    )
}

export default FavoriteEdit;