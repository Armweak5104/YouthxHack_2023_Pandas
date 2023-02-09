/*
Outlet serves the component passed to it from the router
*/

import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from '../components/NavBar';

const Layout = (props) => {
    return(
        <>
            <NavBar title={props.title} />
            <Outlet />
        </>
    );
};

export default Layout;