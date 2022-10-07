import { Button, Grid, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import styles from '../styles/Home.module.css'



export default function Login() {

    return (

        <div className={styles.login}>

            <Grid container className={styles.wrapperLogin}>

                <Grid item lg={6} md={6} sm={12} xs={12} className={styles.loginPage}>

                    <div className={styles.loginForm}>

                        <div className={styles.finLogo}>

                            <a>
                            <img src="/images/finacusLogo.png" alt="Finacus Logo" />
                            {/* <Image
                                src="/images/finacusLogo.png"
                                alt="Finacus Logo"
                                height="100"
                                width="200"
                            /> */}
                            </a>

                        </div>

                        <TextField
                            margin='normal'
                            fullWidth
                            name="Username"
                            type="text"
                            label="Username"
                            required
                            autoFocus
                        />

                        <TextField
                            margin='normal'
                            fullWidth
                            name="Password"
                            type="password"
                            label="Password"
                            required
                        />

                        <Typography className={styles.forgotPassword}>
                            Forgot Password?
                        </Typography>

                        <div className={styles.loginBtnWrapper}>

                            <Button type="submit" variant="contained" color='warning' margin="normal">
                                Login
                            </Button>

                        </div>

                    </div>

                </Grid>

            </Grid>

        </div>

    )

}