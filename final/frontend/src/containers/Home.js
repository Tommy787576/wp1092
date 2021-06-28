import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import axios from '../api';
import './Home.css';
import iconPeople from '../pictures/iconPerson.png';
import iconBike from "../pictures/iconBike.png";
import iconBikeRed from "../pictures/iconBikeRed.png";
import iconBikeBlue from "../pictures/iconBikeBlue.png";

const Home = () => {
    const [currMarkers, setCurrMarkers] = useState([]);
    const [currInfo, setCurrInfo] = useState([]);
    const [currStations, setCurrStations] = useState([]);
    const [mapIsReady, setMapIsReady] = useState(false);
    const [currVer, setCurrVer] = useState(true);

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
                const pos = { lat: position.coords.latitude, lng: position.coords.longitude };

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

                // create markers for near stations
                currStations.forEach(async (station) => {
                    const tempLat = parseFloat(station.lat);
                    const tempLng = parseFloat(station.lng);
                    const tempSbi = parseInt(station.sbi);
                    const tempBemp = parseInt(station.bemp);
                    let tempIcon;


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
                // create the marker on the person's location
                const marker = new window.google.maps.Marker({
                    position: pos,
                    icon: iconPeople,
                    map: map
                });
                markerList.push(marker);
                // create the info window of the person's location
                const infoW = new window.google.maps.InfoWindow({
                    pixelOffset: new window.google.maps.Size(0, -35),
                });
                infoW.setPosition(pos);
                infoW.setContent(`<h6 style="margin: 10px 0px">你的位置</h6>`);
                infoList.push(infoW);
                // detect click info window event
                for (let i = 0; i < markerList.length; i += 1) {
                    markerList[i].addListener("click", () => {
                        infoList[i].open(map);
                    })
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

    const handleVer1 = async (dist) => {
        let data = [];

        data = await handleClick(dist, 'TaipeiVer1');
        data = data.concat(await handleClick(dist, 'NewTaipeiVer1'));

        if (data.length === 0)
            alert(`附近 ${dist * 1000} 公尺內沒有 YouBike1.0 車站`)

        setCurrStations(data);
    }

    const handleVer2 = async (dist) => {
        let data = [];

        data = await handleClick(dist, 'TaipeiVer2');

        if (data.length === 0)
            alert(`附近 ${dist * 1000} 公尺內沒有 YouBike2.0 車站`)

        setCurrStations(data);
    }

    const handleClick = async (dist, version) => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
                axios.get('/api/getCloseStation', {
                    params: {
                        ver: version,
                        lat: pos.lat,
                        lng: pos.lng,
                        dist
                    }
                }).then(({ data }) => {
                    resolve(data);
                }).catch(err => {
                    console.log("handleClick error");
                    reject([]);
                })
            })
        })
    }

    const changeVer = (ver) => {
        if (ver === 1)
            setCurrVer(true);
        else if (ver === 2)
            setCurrVer(false);
        setCurrStations([]);
    }

    return (
        <>
            <Layout>
                <ul className="nav nav-pills my-3 ml-2" id="pills-tab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <div className="nav-link active" id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => changeVer(1)}>YouBike1.0</div>
                    </li>
                    <li className="nav-item" role="presentation">
                        <div className="nav-link" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => changeVer(2)}>YouBike2.0</div>
                    </li>
                </ul>
                <div id="map-div">
                    <div id="map"></div>
                </div>
                <section id="search-btn-div" className="my-2">
                    {currVer ? (
                        <>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer1(0.25)}>查詢方圓 250 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer1(0.5)}>查詢方圓 500 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer1(0.75)}>查詢方圓 750 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer1(1)}>查詢方圓 1000 公尺內的車站</button>
                        </>
                    ) : (
                        <>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer2(0.15)}>查詢方圓 150 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer2(0.25)}>查詢方圓 250 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer2(0.4)}>查詢方圓 400 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer2(0.6)}>查詢方圓 600 公尺內的車站</button>
                            <button id="myLoc" className="btn btn-secondary" onClick={() => handleVer2(1)}>查詢方圓 1000 公尺內的車站</button>
                        </>
                    )}
                </section>
            </Layout>
        </>
    );
}

export default Home;