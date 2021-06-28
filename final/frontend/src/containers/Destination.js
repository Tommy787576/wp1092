import React, { useEffect, useState, useRef } from 'react';
import Layout from '../Layout';
import axios from '../api';
import './Home.css';
import iconBike from "../pictures/iconBike.png";
import iconBikeRed from "../pictures/iconBikeRed.png";
import iconBikeBlue from "../pictures/iconBikeBlue.png";

const Destination = () => {
    const [currMarkers, setCurrMarkers] = useState([]);
    const [currInfo, setCurrInfo] = useState([]);
    const [currStations, setCurrStations] = useState({ stations: [], currPos: { lat: 25.0408578889, lng: 121.567904444 } });
    const [mapIsReady, setMapIsReady] = useState(false);
    const [currVer, setCurrVer] = useState(true);
    const [allStations, setAllStations] = useState([]);
    const [search, setSearch] = useState('');
    const ref = useRef();
    const ref2 = useRef();

    useEffect(() => {
        if (!(typeof window.google === 'object' && typeof window.google.maps === 'object')) {
            const ApiKey = 'AIzaSyDr-1BibW68Ws9CvyatmmS0q06CJ9i2VGM';
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${ApiKey}`;
            script.async = true;
            script.defer = true;
            script.addEventListener('load', () => {
                setMapIsReady(true);
            });

            document.body.appendChild(script);
        }
        else {
            setMapIsReady(true);
        }

        axios.get('/api/getAllStations', {
            params: {
                ver: '1.0',
            }
        }).then(({ data }) => {
            setAllStations(data);
        }).catch(err => {
            console.log("useEffect getAllStations error");
        })
    }, [])

    useEffect(() => {
        if (mapIsReady) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                let markerList = currMarkers;
                let infoList = currInfo;
                let postFix = currVer ? '1.0' : '';

                // clear markers and information windows
                for (let i = 0; i < currMarkers.length; i++) {
                    markerList[i].setMap(null);
                    infoList[i].setMap(null);
                }
                markerList = []
                infoList = []

                // The current location
                const pos = currStations.currPos;

                // The map, centered at the current location
                const map = new window.google.maps.Map(document.getElementById("map"), {
                    center: pos,
                    zoom: 15,
                    mapTypeControl: false,
                    styles: [
                        // turn off business icon on the map
                        {
                            featureType: 'poi.business',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]
                });

                let currPosIdx = -1;

                // create markers for near stations
                currStations.stations.forEach(async (station, idx) => {
                    const tempLat = parseFloat(station.lat);
                    const tempLng = parseFloat(station.lng);
                    const tempSbi = parseInt(station.sbi);
                    const tempBemp = parseInt(station.bemp);
                    let tempIcon;

                    if (tempLat === pos.lat && tempLng === pos.lng)
                        currPosIdx = idx;

                    if (tempSbi === 0 || tempBemp === 0)
                        tempIcon = iconBikeRed;
                    else if (tempSbi <= 5 || tempBemp <= 5)
                        tempIcon = iconBikeBlue;
                    else
                        tempIcon = iconBike;

                    const uBikePos = { lat: tempLat, lng: tempLng };
                    // create the marker on the station location
                    const marker = new window.google.maps.Marker({
                        position: uBikePos,
                        icon: tempIcon,
                        map: map
                    });
                    markerList.push(marker);
                    const infoW = new window.google.maps.InfoWindow({
                        pixelOffset: new window.google.maps.Size(0, -25),
                    });
                    // create the info window of the station location
                    const infoContent = `
                    <h6 style="margin-top: 10px">${station.sna}</h6>
                    <p style="margin: 0px 0px">可借車數：${station.sbi}</p>
                    <p style="margin: 0px 0px">可還空位數：${station.bemp}</p>
                    <a style="margin-bottom: 10px" href="https://www.google.com/maps?ll=${station.lat},${station.lng}
                        &z=17&t=m&hl=zh-TW&gl=TW&mapclient=embed&q=youbike${station.sna}${postFix}" target="_blank">
                        詳細地圖資訊
                    </a>
                `
                    infoW.setPosition(uBikePos);
                    infoW.setContent(infoContent);
                    infoList.push(infoW);
                })
                for (let i = 0; i < markerList.length; i += 1) {
                    markerList[i].addListener("click", () => {
                        infoList[i].open(map);
                    })
                    if (i === currPosIdx)
                        infoList[i].open(map);
                }
                // set
                setCurrMarkers(markerList);
                setCurrInfo(infoList);

                return () => {
                    for (let i = 0; i < markerList.length; i += 1) {
                        markerList[i].removeListener("click", () => {
                            infoList[i].open(map);
                        })
                    }
                }
            })
        }
    }, [currStations, mapIsReady]);

    const handleSearch = async () => {
        const temp = ref.current.value;
        const distance = parseInt(ref2.current.value) / 1000;

        console.log(distance);
        if (allStations.includes(temp)) {
            const { data, lat, lng } = await handleClick(distance, temp);

            if (data.length === 0) {
                if (currVer)
                    alert(`${temp}附近 ${distance * 1000} 公尺內沒有 YouBike1.0 車站`);
                else
                    alert(`${temp}附近 ${distance * 1000} 公尺內沒有 YouBike2.0 車站`);
            }

            setCurrStations({ stations: data, currPos: { lat: parseFloat(lat), lng: parseFloat(lng) } });
        }
        else if (temp !== '')
            alert(`沒有車站名為 ${temp} `);
        else
            alert('請輸入車站名稱');
    }

    const handleClick = async (dist, stationName) => {
        return new Promise((resolve, reject) => {
            const version = currVer ? '1.0' : '2.0';

            axios.get('/api/getCloseStationByPos', {
                params: {
                    ver: version,
                    station: stationName,
                    dist
                }
            }).then(({ data }) => {
                resolve(data);
            }).catch(err => {
                console.log("handleClick error");
                reject([]);
            })
        })
    }


    const changeVer = (ver) => {
        axios.get('/api/getAllStations', {
            params: {
                ver,
            }
        }).then(({ data }) => {
            setAllStations(data);
        }).catch(err => {
            console.log("useEffect getAllStations error");
        })

        if (ver === '1.0')
            setCurrVer(true);
        else if (ver === '2.0')
            setCurrVer(false);

        setCurrStations({ stations: [], currPos: { lat: 25.0408578889, lng: 121.567904444 } });
    }

    const filterList = () => {
        let updatedList = allStations.filter(station => {
            return station.toLowerCase().indexOf(search.toLowerCase()) !== -1
        })
        let data = updatedList.map(station => {
            return (<option value={station} />);
        })
        return data.slice(0, 6);
    }

    return (
        <>
            <Layout>
                <ul className="nav nav-pills my-3 ml-2" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <div className="nav-link active" id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => changeVer('1.0')}>YouBike1.0</div>
                    </li>
                    <li className="nav-item" role="presentation">
                        <div className="nav-link" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => changeVer('2.0')}>YouBike2.0</div>
                    </li>
                </ul>
                <div className="container">
                    <div className="d-flex justify-content-center">
                        <div className="input-group rounded my-2">
                            <span className="input-group-text border-0" id="search-addon">
                                車站名稱
                            </span>
                            <input list="ice-cream-flavors" ref={ref} onChange={(event) => setSearch(event.target.value)} className="form-control rounded" placeholder={currVer ? '搜尋1.0車站' : '搜尋2.0車站'} />
                            <datalist id="ice-cream-flavors">
                                {filterList()}
                            </datalist>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center">
                        <span className="input-group-text border-0 my-3" id="search-addon">
                            方圓公尺
                        </span>
                        <select ref={ref2} style={{ width: "80px" }} className="custom-select my-3">
                            {currVer ? (
                                <>
                                    <option selected>250</option>
                                    <option>500</option>
                                    <option>750</option>
                                    <option>1000</option>
                                </>) : (
                                <>
                                    <option selected>150</option>
                                    <option>250</option>
                                    <option>400</option>
                                    <option>600</option>
                                    <option>1000</option>
                                </>)
                            }

                        </select>
                        <button className="btn btn-secondary ml-3 my-3" onClick={() => handleSearch()}>按此搜尋</button>
                    </div>
                </div>
                <div id="map-div">
                    <div id="map"></div>
                </div>
            </Layout>
        </>
    );
}

export default Destination;