import { Box, Container, createTheme, CssBaseline, Divider, List, Paper, styled, ThemeProvider, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Header from './Header';
import MuiAppBar from "@mui/material/AppBar"
import MuiDrawer from "@mui/material/Drawer"
import styles from "../../styles/Home.module.css"
import { Outlet } from "react-router-dom";
import { MainMenuItems } from "../listitem";


const drawerWidth = 240;


const AppBar = styled(MuiAppBar, {

    shouldForwardProp: (prop) => prop !== "open",
})
    (({ theme, open }) => ({

        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));


const Drawer = styled(MuiDrawer, {

    shouldForwardProp: (prop) => prop !== "open",
})
    (({ theme, open }) => ({

        "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: "border-box",
            ...(!open && {
                overflowX: "hidden",
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up("sm")]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }));


const mdTheme = createTheme();


function MainContent(props) {


    const [open, setOpen] = useState(true);

    return (


        <ThemeProvider theme={mdTheme}>

            <Header />

            <Box sx={{ display: "flex" }}>

                <CssBaseline />

                <AppBar
                    style={{ backgroundColor: "white" }}
                    position="fixed"
                    open={open}
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
                />

                <Drawer
                    variant='permanent'
                    open={open}
                    PaperProps={{
                        sx: {
                            backgroundColor: "#07244D",
                            color: "white",
                        },
                    }}
                    elevation={3}
                >

                    <Toolbar
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            px: [1],
                        }}
                    >

                        <Paper className={styles.paperClass}>

                            <img className={styles.vectorLogo} src="/images/Group_Icon.svg" alt='Vector Logo' />

                            <label className={styles.labelclass}>
                                John Doe
                            </label>

                            <label className={styles.labelcodeClass}>
                                Employee Code:858
                            </label>

                        </Paper>

                    </Toolbar>

                    <Divider />

                    <List component="nav">

                        <MainMenuItems drawerOpen={open} />

                    </List>

                </Drawer>

                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "90.2vh",
                        overflow: "auto"
                    }}
                >

                    <Toolbar />

                    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
                        <Outlet />
                        {/* {children} */}
                    </Container>

                </Box>

            </Box>

        </ThemeProvider>

    )
}


export default function Main() {

    return <MainContent />;
}

