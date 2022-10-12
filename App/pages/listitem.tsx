import React, { Fragment, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { routes } from "./routes/routes";
// import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import Link from "next/link";
import { useRouter } from "next/router";


export const MainMenuItems = React.memo((props: any) => {
    const [open, setOpen] = useState<Array<boolean>>([]);

    // const navigate = useNavigate();

    const router = useRouter()

    function handleClick(item: any) {
        // navigate("/main" + item.route);
        // <Link href={"/main" + item.route} />

        // router.route("/component/main" + item.route)
        router.push('/component' + item.route)
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
                                                <ListItemButton sx={{ pl: 4 }} key={index} onClick={() => { handleClick(subItem); router.push("/component" + item.route) }}>
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
                                    router.push("/component" + item.route)
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

            {/* <ListItemButton>
        <ListItemIcon>
          <EnhancedEncryptionRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Vaults" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DataArrayIcon />
        </ListItemIcon>
        <ListItemText primary="Records" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Connections" />
      </ListItemButton> */}
        </React.Fragment>
    );
});

export const SecondaryMenuItems = React.memo(() => {
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
            {/* <ListItemButton>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
          </ListItemButton> */}
        </React.Fragment>
    );
});
