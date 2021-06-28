import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <Link className="navbar-brand" to="/"><i className="fas fa-bicycle"></i> 大台北找YouBike</Link>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId"
                    aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">首頁</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/destination">車站搜尋</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorite">常用車站</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/favorite-edit">新增常用車站</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/instruction">使用說明</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;