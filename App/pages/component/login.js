import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react';
import styles from '../../styles/Home.module.css';



export default function Login() {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const userRef = useRef(null)
    const passRef = useRef(null)

    function onSubmit() {

        router.push("/component/main")
    }

    return (

        <div className={styles.login}>

            <Grid container className={styles.wrapperLogin}>

                <Grid item lg={6} md={6} sm={12} xs={12} className={styles.loginPage}>

                    <div className={styles.loginForm}>

                        <div className={styles.finLogo}>

                            <a>
                                <img src="/images/finacusLogo.png" alt="Finacus Logo" />
                            </a>

                        </div>

                        <TextField
                            margin='normal'
                            fullWidth
                            name="Username"
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            label="Username"
                            ref={userRef}
                            required
                            autoFocus
                        />

                        <TextField
                            margin='normal'
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="Password"
                            type="password"
                            label="Password"
                            required
                            ref={passRef}
                        />


                        <Typography className={styles.forgotPassword}>
                            Forgot Password?
                        </Typography>


                        <div className={styles.loginBtnWrapper}>

                            <Button type="submit" variant="contained" color='warning' onClick={onSubmit} margin="normal">
                                Login
                            </Button>

                        </div>

                    </div>

                </Grid>

            </Grid>

        </div>

    )
}