import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import styles from "../../styles/Home.module.css";
import { useRef, useState } from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { popUp } from "../helper/popUp";
import { trackPromise } from "react-promise-tracker";
import { postServiceMethod } from "../services/axiosService";
import { useRouter } from "next/router";



function InstituteManagement() {

    //state
    const [institutionId, setInstitutionId] = useState("");
    const [institutionIdName, setInstitutionIdName] = useState("");
    const [institutionType, setInstitutionType] = useState("");
    const [institutionName, setInstitutionName] = useState("");
    const [authorizedPerson, setAuthorizedPerson] = useState("");
    const [mobileNo, setMobileNo] = useState(0);
    const [address, setAddress] = useState("");
    const [date, setDate] = useState(null);
    const [serverUrl, setServerUrl] = useState("");
    const [serverIpAddress, setServerIpAddress] = useState("");
    const [authorityDocumentName, setAuthorityDocumentName] = useState("");
    const [authorityDocumentPath, setAuthorityDocumentPath] = useState("");
    //ref
    const institution_id = useRef(null);
    const institution_idName = useRef(null);
    const institution_type = useRef(null);
    const institution_name = useRef(null);
    const authorized_person = useRef(null);
    const mobile_number = useRef(null);
    const set_address = useRef(null);
    const set_date = useRef(null);
    const server_url = useRef(null);
    const server_ipAddress = useRef(null);
    const authority_documentName = useRef(null);
    const authority_documentPath = useRef(null);
    //router
    const router = useRouter()


    function clearScreen() {

        setInstitutionId("");
        setInstitutionIdName("");
        setInstitutionType("");
        setInstitutionName("");
        setAddress("");
        setMobileNo(0);
        setAuthorizedPerson("");
        setDate(null);
        setServerUrl("");
        setServerIpAddress("");
        setAuthorityDocumentName("");
        setAuthorityDocumentPath("");
    }


    async function onSubmit() {

        let todaysDate = new Date();

        if (institutionId === "" || institutionId === null || institutionId === undefined) {

            popUp({ message: "Please enter the Institution Id.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    institution_id.current.focus();
                }
            })
            return
        }

        if (institutionIdName === "" || institutionIdName === null || institutionIdName === undefined) {

            popUp({ message: "Please enter the Name.", icons: "error", title: 'Error' }).then((event) => {
                if (event.isConfirmed) {
                    institution_idName.current.focus();
                }
            })
            return
        }

        if (institutionType === "" || institutionType === null || institutionType === undefined) {

            popUp({ message: "Please enter the Institution Type.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    institution_type.current.focus();
                }
            })
            return
        }

        if (institutionName === "" || institutionName === null || institutionName === undefined) {

            popUp({ message: "Please enter the Institution Name.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    institution_name.current.focus();
                }
            })
            return
        }

        if (authorizedPerson === "" || authorizedPerson === null || authorizedPerson === undefined) {

            popUp({ message: "Please enter the Authorized Person.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    authorized_person.current.focus();
                }
            })
            return
        }

        if (mobileNo === 0 || mobileNo === null || mobileNo === undefined) {

            popUp({ message: "Please enter the Mobile No.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    mobile_number.current.focus();
                }
            })
            return
        }

        if (mobileNo.length < 10) {

            popUp({ message: "Length of the Mobile No. cannot be less than 10 digits.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    mobile_number.current.focus();
                }
            })
            return
        }

        if (mobileNo.length > 10) {

            popUp({ message: "Lenght of the Mobile No. cannot be more than 10 digits.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    mobile_number.current.focus();
                }
            })
            return
        }

        if (address === "" || address === null || address === undefined) {

            popUp({ message: "Please enter the Address.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    set_address.current.focus();
                }
            })
            return
        }

        if (date === "" || date === null || date === undefined) {

            popUp({ message: "Please enter the Date.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    set_date.current.focus();
                }
            })
            return
        }

        if (date < todaysDate) {

            popUp({ message: "Date cannot be less than today's date.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    set_date.current.focus();
                }
            })
            return
        }

        if (serverUrl === "" || serverUrl === null || serverUrl === undefined) {

            popUp({ message: "Please enter the Server Url.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    server_url.current.focus();
                }
            })
            return
        }

        if (serverIpAddress === "" || serverIpAddress === null || serverIpAddress === undefined) {

            popUp({ message: 'Please enter the Server Ip Address.', icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    server_ipAddress.current.focus();
                }
            })
            return
        }

        if (authorityDocumentName === "" || authorityDocumentName === null || authorityDocumentName === undefined) {

            popUp({ message: "Please enter the Authority Document Name.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    authority_documentName.current.focus();
                }
            })
            return
        }

        if (authorityDocumentPath === "" || authorityDocumentPath === null || authorityDocumentPath === undefined) {

            popUp({ message: "Please enter the Authority Document Path.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    authority_documentPath.current.focus();
                }
            })
            return
        }

        else {

            let jsonObject = {
                "institution": {
                    "id": institutionId,
                    "name": institutionIdName
                },
                "instituionType": institutionType,
                "institutionName": institutionName,
                "authorizedPerson": authorizedPerson,
                "mobileNo": mobileNo,
                "address": address,
                "serverURL": serverUrl,
                "serverIPAddress": serverIpAddress,
                "authorityDocumentName": authorityDocumentName,
                "authorityDocumentPath": authorityDocumentPath,
                "authorisationValidTill": date
            }

            try {

                await trackPromise(postServiceMethod("institutions", jsonObject)).then((resp) => {

                    if (resp) {

                        console.log(resp, 'respAdd');

                        popUp({ message: "Institution successfully added.", icons: "success", title: "Success" }).then((event) => {
                            if (event.isConfirmed) {
                                clearScreen();
                                institution_id.current.focus()
                            }
                        })
                    }
                    else {

                        popUp({ message: "No response from the server.", icons: "error", title: "Error" })
                    }
                })
            } catch (error) {

                console.log(error, 'error')
                popUp({ message: "Something went wrong.", icons: "error", title: "Error" })
            }
        }
    }


    function backtoAaBased() {

        router.push("/component/instituteManagement")
    }


    return (


        <div className={styles.formClass}>

            <Card variant="outlined" className={styles.classesCard}>

                <CardContent className={styles.cardClass}>

                    <Grid container item xs={12} lg={12} md={12} sm={12}>

                        <Typography id="modal-modal-title" variant="h5" component="h2" className={styles.titleClasses}>
                            Add New Institution
                        </Typography>

                    </Grid>

                    <Grid container item lg={12} md={12} sm={12} xs={12}>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textfieldFirstClass}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Institution Id
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={institution_id} autoFocus variant="outlined" margin="normal" value={institutionId} onChange={(e) => setInstitutionId(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Name
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={institution_idName} variant="outlined" margin="normal" value={institutionIdName} onChange={(e) => setInstitutionIdName(e.target.value)} required />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Institution Type
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={institution_type} variant="outlined" margin="normal" value={institutionType} onChange={(e) => setInstitutionType(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Institution Name
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={institution_name} variant="outlined" margin="normal" value={institutionName} onChange={(e) => setInstitutionName(e.target.value)} required />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Authorized Person
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={authorized_person} variant="outlined" margin="normal" value={authorizedPerson} onChange={(e) => setAuthorizedPerson(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Mobile No.
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='number' inputRef={mobile_number} variant="outlined" margin="normal" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Address
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={set_address} variant="outlined" margin="normal" value={address} onChange={(e) => setAddress(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Authorization valid till
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                                        <DesktopDatePicker
                                            label=""
                                            inputFormat="dd/MM/yyyy"
                                            minDate={new Date()}
                                            inputRef={set_date}
                                            value={date}
                                            onChange={(e) => setDate(e)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />

                                    </LocalizationProvider>

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Server URL
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={server_url} variant="outlined" margin="normal" value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Server Ip Address
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='number' inputRef={server_ipAddress} variant="outlined" margin="normal" value={serverIpAddress} onChange={(e) => setServerIpAddress(e.target.value)} required />

                                </Grid>

                            </Grid>

                        </Grid>

                        <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textclasscss}>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Authority Document Name
                                    </Typography>

                                </Grid>

                                <Grid lg={7} md={7} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={authority_documentName} variant="outlined" margin="normal" value={authorityDocumentName} onChange={(e) => setAuthorityDocumentName(e.target.value)} required />

                                </Grid>

                            </Grid>

                            <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                <Grid lg={4} md={4} sm={12} xs={12}>

                                    <Typography>
                                        Authority Document Path
                                    </Typography>

                                </Grid>

                                <Grid lg={8} md={8} sm={12} xs={12}>

                                    <TextField className={styles.textFieldmargin} fullWidth type='text' inputRef={authority_documentPath} variant="outlined" margin="normal" value={authorityDocumentPath} onChange={(e) => setAuthorityDocumentPath(e.target.value)} required />

                                </Grid>

                            </Grid>

                        </Grid>

                    </Grid>

                </CardContent>

                <CardActions className={styles.cardButtonStyle}>

                    <Button variant="contained" color='warning' onClick={() => onSubmit()} type='submit'>
                        Add New Institution
                    </Button>

                    <Button variant="outlined" color='primary' onClick={() => clearScreen()} type='reset'>
                        Clear
                    </Button>

                    <Button variant="outlined" color='primary' onClick={() => backtoAaBased()} type='submit'>
                        Back
                    </Button>

                </CardActions>

            </Card>

        </div>


    )
}


export default InstituteManagement