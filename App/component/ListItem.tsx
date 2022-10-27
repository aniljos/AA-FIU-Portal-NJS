import { Assignment, BarChart, DataArray, EnhancedEncryption, ExpandLess, ExpandMore, Layers } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { routes } from "../routes/routes";


export const MainMenuItems = React.memo((props: any) => {

    const [open, setOpen] = useState<Array<boolean>>([]);
    const router = useRouter();


    function handleClick(item: any) {

        router.push("/mainPages" + item.route);
    }


    function handleExpand(index: number) {

        const copy = [...open];
        copy[index] = !copy[index]
        setOpen(copy);
    }


    return (

        <React.Fragment>

            {routes.filter((item) => item.isMain).map((item, index) => {

                const Icon = item.icon;

                if (item.children && item.children.length > 0) {

                    return (

                        <Fragment key={index}>

                            <ListItemButton onClick={() => handleExpand(index)}>

                                <ListItemIcon style={{ minWidth: "30px" }}>
                                    <Icon />
                                </ListItemIcon>

                                {props.drawerOpen ? (<><ListItemText primary={item.title} /> {open[index] ? <ExpandLess /> : <ExpandMore />}</>) : null}

                            </ListItemButton>

                            <Collapse in={open[index]} timeout="auto" unmountOnExit>

                                {props.drawerOpen ?

                                    <List component="div" disablePadding>

                                        {item.children.map((subItem, index) => {

                                            const SubIcon = subItem.icon;

                                            return (

                                                <ListItemButton sx={{ p1: 4 }} key={index} onClick={() => { handleClick(subItem) }}>

                                                    <ListItemIcon style={{ minWidth: "30px" }}>
                                                        <SubIcon />
                                                    </ListItemIcon>

                                                    <ListItemText primary={subItem.title} />

                                                </ListItemButton>

                                            )
                                        })}

                                    </List>

                                    : null}

                            </Collapse>

                        </Fragment>

                    )

                }
                else {

                    return (

                        <ListItemButton key={index} onClick={() => { handleClick(item) }}>

                            <ListItemIcon style={{ minWidth: "30px" }}>
                                <Icon />
                            </ListItemIcon>

                            {props.drawerOpen ? <ListItemText primary={item.title} /> : null}

                        </ListItemButton>

                    )
                }
            })}

            {/* <ListItemButton>

                <ListItemIcon>
                    <EnhancedEncryption />
                </ListItemIcon>

                <ListItemText primary="Vaults" />

            </ListItemButton>

            <ListItemButton>

                <ListItemIcon>
                    <DataArray />
                </ListItemIcon>

                <ListItemText primary="Records" />

            </ListItemButton>

            <ListItemButton>

                <ListItemIcon>
                    <BarChart />
                </ListItemIcon>

                <ListItemText primary="Reports" />

            </ListItemButton>

            <ListItemButton>

                <ListItemIcon>
                    <Layers />
                </ListItemIcon>

                <ListItemText primary="Connections" />

            </ListItemButton> */}

        </React.Fragment>

    )
})


export const SecondaryMenuItems = React.memo(() => {

    return (

        <React.Fragment>

            <ListSubheader component="div" inset>
                Saved Reports
            </ListSubheader>

            <ListItemButton>

                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>

                <ListItemText primary="Current month" />

            </ListItemButton>

            <ListItemButton>

                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>

                <ListItemText primary="Last quarter" />

            </ListItemButton>

            {/* <ListItemButton>

                <ListItemIcon>
                    <Assignment />
                </ListItemIcon>

                <ListItemText primary="Year-end sale" />

            </ListItemButton> */}

        </React.Fragment>

    )
})