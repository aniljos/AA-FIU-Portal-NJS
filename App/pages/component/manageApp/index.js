import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react"
import { trackPromise } from "react-promise-tracker";
import styles from "../../../styles/Home.module.css";
import { popUp } from "../../helper";
import { LoadingSpinnerComponent } from "../../loadingSpinner";
import { getServiceMethod } from "../../services/axiosService";




function ManageAppSettings() {

    //state
    const [loading, setLoading] = useState(true);
    const [jws, setJws] = useState("");
    const [certificateFileName, setCertificateFileName] = useState("");
    const [allowedHost, setAllowedHost] = useState("");
    const [certificateFileNamePrimary, setCertificateFileNamePrimary] = useState("");
    const [subscriber, setSubscriber] = useState("");
    const [certificateFileNamePass, setCertificateFileNamePass] = useState("");
    const [dateFormat, setDateFormat] = useState("");
    const [licenseKey, setLicenseKey] = useState("");
    const [databaseName, setDatabaseName] = useState("");
    const [licenseExpiryDate, setLicenseExpiryDate] = useState(null);
    const [currentApiVersion, setCurrentApiVersion] = useState("");
    const [licenseTo, setLicenseTo] = useState("");
    const [baseApplicationPath, setBaseApplicationPath] = useState("");
    const [assesmentType, setAssesmentType] = useState("");
    const [certificateFilePath, setCertificateFilePath] = useState("");
    const [shamatiCentral, setShamatiCentral] = useState("");
    const [buttonChange, setButtonChange] = useState(false);
    //disable
    const [jwsDisable, setJwsDisable] = useState(true);
    const [certificateFileNameDisable, setCertificateFileNameDisable] = useState(true);
    const [allowedHostDisable, setAllowedHostDisable] = useState(true);
    const [certificateFileNamePrimaryDisable, setCertificateFileNamePrimaryDisable] = useState(true);
    const [subscriberDisable, setSubscriberDisable] = useState(true);
    const [certificateFileNamePassDisable, setCertificateFileNamePassDisable] = useState(true);
    const [dateFormatDisable, setDateFormatDisable] = useState(true);
    const [licenseKeyDisable, setLicenseKeyDisable] = useState(true);
    const [databaseNameDisable, setDatabaseNameDisable] = useState(true);
    const [licenseExpiryDateDisable, setLicenseExpiryDateDisable] = useState(true);
    const [currentApiVersionDisable, setCurrentApiVersionDisable] = useState(true);
    const [licenseToDisable, setLicenseToDisable] = useState(true);
    const [baseApplicationPathDisable, setBaseApplicationPathDisable] = useState(true);
    const [assesmentTypeDisable, setAssesmentTypeDisable] = useState(true);
    const [certificateFilePathDisable, setCertificateFilePathDisable] = useState(true);
    const [shamatiCentralDisable, setShamatiCentralDisable] = useState(true);


    useEffect(() => {

        firstCall()
    }, [])


    async function firstCall() {

        try {

            await trackPromise(getServiceMethod("settings").then((resp) => {

                if (resp) {

                    console.log(resp, 'resp');
                    setLoading(false);
                    setJws(resp.jwsRequired);
                    setCertificateFileName(resp.certificateFileName);
                    setAllowedHost(resp.allowedHosts);
                    setCertificateFileNamePrimary(resp.certificateFileNamePK);
                    setSubscriber(resp.subscriberSuffix);
                    setCertificateFileNamePass(resp.certificateFileNamePassPhrase);
                    setDateFormat(resp.dateFormat);
                    setLicenseKey(resp.licenceKey);
                    setDatabaseName(resp.databaseName);
                    setLicenseExpiryDate(resp.licenceExpiry);
                    setCurrentApiVersion(resp.currentAPIVersion);
                    setLicenseTo(resp.licenceTo);
                    setBaseApplicationPath(resp.baseApplicationPath);
                    setAssesmentType(resp.assessmentType);
                    setCertificateFilePath(resp.certificateFilePath);
                    setShamatiCentral(resp.sahamatiCantralRegistryKey)
                }
            }))
        } catch (error) {

            console.log(error, 'error')
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" });
        }
    }


    function fieldEditing() {

        setButtonChange(true);
        setJwsDisable(false);
        setCertificateFileNameDisable(false);
        setAllowedHostDisable(false);
        setCertificateFileNamePrimaryDisable(false);
        setSubscriberDisable(false);
        setCertificateFileNamePassDisable(false);
        setDateFormatDisable(false);
        setLicenseKeyDisable(false);
        setDatabaseNameDisable(false);
        setLicenseExpiryDateDisable(false);
        setCurrentApiVersionDisable(false);
        setLicenseToDisable(false);
        setBaseApplicationPathDisable(false);
        setAssesmentTypeDisable(false);
        setCertificateFilePathDisable(false);
        setShamatiCentralDisable(false);
    }


    return (


        <div className={styles.formClass}>

            {loading === true ?

                <LoadingSpinnerComponent />

                : null}

            <Card variant="outlined" className={styles.classesCard}>

                <CardContent className={styles.cardClass}>

                    <Grid container item xs={12} lg={12} md={12} sm={12}>

                        <Typography id="modal-modal-title" variant="h5" component="h2" className={styles.titleClasses}>
                            View and Update App Settings
                        </Typography>

                    </Grid>

                    <Grid xs={12} md={12} sm={12} lg={12} flexDirection="row" item container>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textfieldFirstClass}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        JWS Required
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' disabled={jwsDisable} onChange={(e) => setJws(e.target.value)} required value={jws} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Certificate File Name
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} margin='normal' variant="outlined" type='password' disabled={certificateFileNameDisable} required fullWidth value={certificateFileName} onChange={(e) => setCertificateFileName(e.target.value)} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Allowed Hosts
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' disabled={allowedHostDisable} onChange={(e) => setAllowedHost(e.target.value)} required value={allowedHost} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Certificate File Name(Primary Key)
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} margin='normal' variant="outlined" type='password' disabled={certificateFileNamePrimaryDisable} required fullWidth value={certificateFileNamePrimary} onChange={(e) => setCertificateFileNamePrimary(e.target.value)} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Subscriber Suffix
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} margin='normal' variant="outlined" onChange={(e) => setSubscriber(e.target.value)} disabled={subscriberDisable} type='text' required fullWidth value={subscriber} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Certificate File Name(Pass Phrase)
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' disabled={certificateFileNamePassDisable} onChange={(e) => setCertificateFileNamePass(e.target.value)} margin="normal" type='password' required fullWidth value={certificateFileNamePass} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Date Format
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' onChange={(e) => setDateFormat(e.target.value)} margin="normal" required type='text' fullWidth disabled={dateFormatDisable} value={dateFormat} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        License Key
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' onChange={(e) => setLicenseKey(e.target.value)} disabled={licenseKeyDisable} margin="normal" required type='password' fullWidth value={licenseKey} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Database Name
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' onChange={(e) => setDatabaseName(e.target.value)} margin="normal" required type='text' fullWidth disabled={databaseNameDisable} value={databaseName} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        License Expiry Date
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                                        <DesktopDatePicker
                                            label=''
                                            inputFormat="dd/MM/yyyy"
                                            disabled={licenseExpiryDateDisable}
                                            value={licenseExpiryDate}
                                            onChange={(e) => setLicenseExpiryDate(e)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Current API Version
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setCurrentApiVersion(e.target.value)} required type='text' fullWidth disabled={currentApiVersionDisable} value={currentApiVersion} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        License To
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setLicenseTo(e.target.value)} required type='text' fullWidth disabled={licenseToDisable} value={licenseTo} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Base Application Path
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setBaseApplicationPath(e.target.value)} required type='text' fullWidth disabled={baseApplicationPathDisable} value={baseApplicationPath} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Assessment Type
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setAssesmentType(e.target.value)} required type='text' fullWidth disabled={assesmentTypeDisable} value={assesmentType} />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Certificate File Path
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setCertificateFilePath(e.target.value)} required type='text' fullWidth disabled={certificateFilePathDisable} value={certificateFilePath} />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection='row' lg={6} sm={12} md={6} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Shamati Central Registry Public Key
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} variant='outlined' margin="normal" onChange={(e) => setShamatiCentral(e.target.value)} required type='text' fullWidth disabled={shamatiCentralDisable} value={shamatiCentral} />

                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>

                </CardContent>

                <CardActions className={styles.cardButtonStyle}>

                    <Button type='reset' variant='contained' color="primary">
                        Close
                    </Button>

                    {buttonChange ?

                        <Button type='submit' color='primary' variant='outlined'>
                            Save Changes
                        </Button>

                        :

                        <Button color='primary' variant='outlined' onClick={() => fieldEditing()} type='submit'>
                            Edit
                        </Button>

                    }

                </CardActions>

            </Card>

        </div>


    )


}


export default ManageAppSettings