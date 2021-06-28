import React from 'react';
import Footer from './components/Footer';

const Layout = (props) => {
    return (
        <>
            {props.children}
            <Footer />
        </>
    );
}

export default Layout;