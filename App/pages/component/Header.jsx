import { Grid, InputAdornment, TextField } from "@mui/material"
import styles from '../../styles/Home.module.css';
import SearchIcon from "@mui/icons-material/Search";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import Link from "next/link";


function Header() {

    const [search, setSearch] = useState("");

    return (


        <Grid container item lg={12} sm={12} md={12} xs={12}>

            <Grid container lg={6} md={6} sm={12} xs={12} className={styles.menuColor}>

                <Grid item lg={4} md={4} sm={12} xs={12} className={styles.headerIcon}>

                    <img src="/images/finacusLogo.png" alt="Finacus Logo" className={styles.finLogo} />

                </Grid>

            </Grid>

            <Grid container lg={6} md={6} sm={12} xs={12} className={styles.headerMenu}>

                <TextField
                    color="primary"
                    margin="normal"
                    type="search"
                    placeholder="SEARCH"
                    value={search}
                    className={styles.textFieldClass}
                    onChange={(e) => setSearch(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                />

                <NotificationsIcon className={styles.iconCursor} />

                <Link href="/">
                    <PowerSettingsNewIcon className={styles.iconLogout} />
                </Link>

            </Grid>

        </Grid>


    )

}



export default Header