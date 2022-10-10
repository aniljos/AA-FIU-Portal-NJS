import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import React, { Fragment, memo, useState } from "react";
import { routes } from "./routes/routes";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useRouter } from "next/router";
// import { useNavigate } from "react-router-dom";



export const MainMenuItems = memo((props: any) => {

    const [open, setOpen] = useState<Array<boolean>>([]);

    // const navigate = useNavigate();

    const routePage = useRouter();

    function handleClick(item: any) {
        // navigate("/main" + item.route);
        routePage.push("/component/main" + item.route)
    }

    function handleExpand(index: number) {

        const copy = [...open];
        copy[index] = !copy[index]
        setOpen(copy);
    }

    return (

        <React.Fragment>

            {routes
                .filter((item) => item.isMain)
                .map((item, index) => {
                    const Icon = item.icon;

                    if (item.children && item.children.length > 0) {
                        return (
                            <Fragment key={index}>
                                <ListItemButton onClick={() => handleExpand(index)}>
                                    <ListItemIcon style={{ minWidth: '30px' }}>
                                        <Icon />
                                    </ListItemIcon>
                                    {props.drawerOpen ? (<> <ListItemText primary={item.title} />  {open[index] ? <ExpandLess /> : <ExpandMore />}</>) : null}
                                    {/* {open[index] ? <ExpandLess /> : <ExpandMore />} */}
                                </ListItemButton>
                                <Collapse in={open[index]} timeout="auto" unmountOnExit>
                                    {props.drawerOpen ? <List component="div" disablePadding>
                                        {item.children.map((subItem, index) => {

                                            const SubIcon = subItem.icon;

                                            return (
                                                <ListItemButton sx={{ pl: 4 }} key={index} onClick={() => { handleClick(subItem); }}>
                                                    <ListItemIcon style={{ minWidth: '30px' }}>
                                                        <SubIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={subItem.title} />
                                                </ListItemButton>
                                            );
                                        })}
                                    </List> : null}
                                </Collapse>
                            </Fragment>
                        );
                    } else {
                        return (
                            <ListItemButton key={index}
                                onClick={() => {
                                    handleClick(item);
                                }}
                            >
                                <ListItemIcon style={{ minWidth: '30px' }}>
                                    <Icon />
                                </ListItemIcon>
                                {props.drawerOpen ? <ListItemText primary={item.title} /> : null}
                            </ListItemButton>
                        );
                    }
                })}

        </React.Fragment>

    )

})


export const SecondaryMenuItems = memo(() => {

    return (


        <React.Fragment>

            <ListSubheader component="div" inset>
                Saved reports
            </ListSubheader>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Current month" />
            </ListItemButton>
            <ListItemButton>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Last quarter" />
            </ListItemButton>

        </React.Fragment>

    )
})