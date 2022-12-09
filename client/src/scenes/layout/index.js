import React, { useState } from 'react'
import { Box, useMediaQuery } from "@mui/material"
//outlet represent the childreact components
import { Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import Navbar from "components/Navbar"
import Sidebar from 'components/Sidebar'
import { useGetUserQuery } from 'state/api'
import { useSelector } from 'react-redux'

const Layout = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    console.log("process.env.REACT_APP_BASE_URL", process.env.REACT_APP_BASE_URL)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const userId = useSelector(state => state.global.userId)

    const { data } = useGetUserQuery(userId)
    // console.log("error: " + error)
    // console.log("isLoading:", isLoading)
    // console.log("data", data)

    return (
        <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth="240px"
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
                <Navbar isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} user={data || {}} />
                <Outlet />
            </Box>
        </Box>
    )
}

export default Layout