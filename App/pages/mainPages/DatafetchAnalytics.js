import { Autocomplete, Box, Card, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import { Component } from "react";
import { trackPromise } from "react-promise-tracker";
import { getServiceMethod } from "../services/axiosService";
import styles from "../../styles/Home.module.css"
import moment from "moment";
import { popUp } from "../helper/popUp";
import { LoadingSpinnerComponent } from "../helper/loadingSpinner";
import { ReactUtilityTable } from "react-utility-table";


export class DataFetchAnalytics extends Component {

    constructor(props) {

        super(props)

        this.state = {

            dbData: [],
            institutionLabel: "",
            menu: false,
            loading: true,
            searchInstitution: "",
            statusComplete: "",
            dynamicArray: [],
            over: false,
            cardValue: null,
            cardLabel: null,
            cardImage: null,
            tableData: [],
        }
    }


    componentDidMount() {

        this.firstCall()
    }


    firstCall = async () => {

        try {

            await trackPromise(getServiceMethod("datafetch").then((resp) => {

                if (resp) {

                    console.log(resp, 'resp');

                    if (resp.length !== 0) {

                        this.setState({
                            dbData: resp
                        })

                        const authorz = resp.map(item => {
                            return {
                                institution: item.institution.name
                            }
                        })

                        this.setState({
                            institutionLabel: authorz
                        })

                        this.cardData(resp, true)
                        this.setTableData(resp, true)
                    }
                }

                this.setState({
                    menu: true,
                    loading: false
                })
            }))
        } catch (error) {

            console.log(error, 'error')
            popUp({ message: "Something went wrong", icons: "error", title: "Error" });
        }
    }


    cardData(resp, flag) {

        let success = 0;
        let failed = 0;

        var dynamicObj = {};
        var dynamicLabel = {};
        var dynamicImage = {};

        if (flag) {

            for (let i = 0; i < resp.length; i++) {

                for (let j = 0; j < resp[i].datafetchs.length; j++) {

                    switch (resp[i].datafetchs[j].status) {

                        case "Success":
                            success++;
                            break;
                        case "Failed":
                            failed++;
                            break
                    }
                }
            }
        }

        dynamicObj = {
            "0": success,
            "1": failed
        }

        // for empty fields

        if (this.state.over) {

            for (var key in dynamicObj) {

                if (dynamicObj.hasOwnProperty(key)) {

                    this.state.dynamicArray.push(dynamicObj[key]);
                }
            }
            this.setState({
                ...this.state.dynamicArray
            })
        }
        else {
            this.state.dynamicArray.push(dynamicObj)
        }

        dynamicLabel = {
            "0": "Success",
            "1": "Failed"
        }

        dynamicImage = {
            "0": "/images/successicon.png",
            "1": "/images/erroricon.png",
        }

        this.setState({
            cardLabel: { ...dynamicLabel },
            cardImage: { ...dynamicImage },
            cardValue: { ...dynamicObj },
            ...this.state.dynamicArray
        })
    }


    setTableData(resp, flag) {

        var showTableData = [];

        if (flag) {

            for (let i = 0; i < resp.length; i++) {

                for (let j = 0; j < resp[i].datafetchs.length; j++) {

                    let bsd = {
                        "consentId": resp[i].datafetchs[j].consentId,
                        "endDate": moment(resp[i].datafetchs[j].endDate).format("MM-DD-YYYY"),
                        "startDate": moment(resp[i].datafetchs[j].startDate).format("MM-DD-YYYY"),
                        "status": resp[i].datafetchs[j].status,
                        "subscriberName": resp[i].datafetchs[j].subscriberName,
                        "requestDate": moment(resp[i].datafetchs[j].requestDate).format("MM-DD-YYYY"),
                    }
                    showTableData.push(bsd)
                }
            }
        }
        this.setState({
            tableData: showTableData
        })
    }


    async updateData() {

        let success = 0;
        let failed = 0;

        var dynamicObj = {};
        var dynamicLabel = {};
        var dynamicImage = {};
        var showTableData = [];

        try {

            this.setState({
                loading: true
            })

            await trackPromise(getServiceMethod("datafetch").then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        this.setState({
                            dbData: resp
                        })

                        if (this.state.searchInstitution.length !== 0 && this.state.statusComplete.length === 0) {

                            const instituteResp = resp.filter((el) => {

                                for (let i = 0; i < this.state.searchInstitution.length; i++) {

                                    if (this.state.searchInstitution[i].institution === el.institution.name) {

                                        let tempArray = [];
                                        tempArray.push(el);

                                        for (let j = 0; j < tempArray.length; j++) {

                                            for (let k = 0; k < tempArray[j].datafetchs.length; k++) {

                                                switch (tempArray[j].datafetchs[k].status) {

                                                    case "Success":
                                                        success++;
                                                        break;
                                                    case "Failed":
                                                        failed++;
                                                        break;
                                                }

                                                let bsd = {
                                                    "consentId": tempArray[j].datafetchs[k].consentId,
                                                    "endDate": tempArray[j].datafetchs[k].endDate,
                                                    "requestDate": tempArray[j].datafetchs[k].requestDate,
                                                    "startDate": tempArray[j].datafetchs[k].startDate,
                                                    "status": tempArray[j].datafetchs[k].status,
                                                    "subscriberName": tempArray[j].datafetchs[k].subscriberName,
                                                }
                                                showTableData.push(bsd);
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        if (this.state.searchInstitution.length === 0 && this.state.statusComplete.length !== 0) {

                            let tempArray = [];

                            for (let i = 0; i < this.state.statusComplete.length; i++) {

                                for (let j = 0; j < resp.length; j++) {

                                    for (let k = 0; k < resp[j].datafetchs.length; k++) {

                                        if (this.state.statusComplete[i].title === resp[j].datafetchs[k].status) {

                                            tempArray.push(resp[j].datafetchs[k]);
                                        }
                                    }
                                }
                            }

                            for (let x = 0; x < tempArray.length; x++) {

                                switch (tempArray[x].status) {

                                    case "Success":
                                        success++;
                                        break;
                                    case "Failed":
                                        failed++;
                                        break;
                                }

                                let bsd = {
                                    "consentId": tempArray[x].consentId,
                                    "endDate": tempArray[x].endDate,
                                    "requestDate": tempArray[x].requestDate,
                                    "startDate": tempArray[x].startDate,
                                    "status": tempArray[x].status,
                                    "subscriberName": tempArray[x].subscriberName
                                }
                                showTableData.push(bsd);
                            }
                        }

                        if (this.state.searchInstitution.length !== 0 && this.state.statusComplete.length !== 0) {

                            let tempArray = [];

                            const instituteResp = this.state.searchInstitution.filter((el) => {

                                for (let h = 0; h < resp.length; h++) {

                                    for (let i = 0; i < resp[h].datafetchs.length; i++) {

                                        for (let j = 0; j < this.state.statusComplete.length; j++) {

                                            if (el.institution === resp[h].institution.name) {

                                                if (this.state.statusComplete[j].title === resp[h].datafetchs[i].status) {

                                                    tempArray.push(resp[h].datafetchs[i])

                                                    switch (resp[h].datafetchs[i].status) {

                                                        case "Success":
                                                            success++;
                                                            break;
                                                        case "Failed":
                                                            failed++;
                                                            break;
                                                    }

                                                    let bsd = {
                                                        "consentId": resp[h].datafetchs[i].consentId,
                                                        "endDate": resp[h].datafetchs[i].endDate,
                                                        "requestDate": resp[h].datafetchs[i].requestDate,
                                                        "startDate": resp[h].datafetchs[i].startDate,
                                                        "status": resp[h].datafetchs[i].status,
                                                        "subscriberName": resp[h].datafetchs[i].subscriberName
                                                    }
                                                    showTableData.push(bsd);
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        if (this.state.searchInstitution.length === 0 && this.state.statusComplete.length === 0) {

                            this.setState({
                                over: true,
                                dynamicArray: []
                            })
                            this.firstCall()
                        }

                        dynamicObj = {
                            "0": success,
                            "1": failed
                        }

                        dynamicLabel = {
                            "0": "Success",
                            "1": "Failed"
                        }

                        dynamicImage = {
                            "0": "/images/successicon.png",
                            "1": "/images/erroricon.png",
                        }

                        this.setState({
                            cardLabel: { ...dynamicLabel },
                            cardImage: { ...dynamicImage },
                            cardValue: { ...dynamicObj },
                            tableData: showTableData,
                            loading: false
                        })
                    }
                }
            }))
        } catch (error) {

            console.log(error, 'error')
            popUp({ message: "Something went wrong", icons: "error", title: "Error" })
        }
    }


    render() {

        return (


            <div>

                {this.state.loading === true ?

                    <LoadingSpinnerComponent />

                    : null}

                <Grid container item lg={12} md={12} sm={12} xs={12} className={styles.searchDataMenu}>

                    <Grid lg={4} item md={6} sm={12} xs={12}>

                        <Autocomplete
                            id="tags-standard"
                            disablePortal
                            multiple={true}
                            options={this.state.institutionLabel}
                            getOptionLabel={option => option.institution}
                            sx={{ width: 330 }}
                            onChange={(e, newValue) => this.setState({ searchInstitution: newValue }, this.updateData)}
                            renderInput={(params) => <TextField {...params} label="Institution" />}
                        />

                    </Grid>

                    <Grid lg={4} item md={6} sm={12} xs={12}>

                        <Autocomplete
                            id="tags-standard"
                            disablePortal
                            multiple={true}
                            options={twoStatus}
                            getOptionLabel={option => option.title}
                            sx={{ width: 330 }}
                            onChange={(e, newValue) => this.setState({ statusComplete: newValue }, this.updateData)}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                        />

                    </Grid>

                </Grid>

                {this.state.menu &&

                    <Grid container item xs={12} lg={12} md={12} sm={12} className={styles.dataFetchCardStyle}>

                        {this.state.dynamicArray.map((item, index) => (

                            <Grid container lg={2} md={2} sm={12} xs={12} key={index}>

                                <Card className={styles.cardContentStyle}>

                                    <Box className={styles.cardBox}>

                                        <CardContent>

                                            <Typography component="div" variant="h4" className={styles.cardWidgetNumber}>
                                                {this.state.cardValue[index]}
                                            </Typography>

                                            <Typography variant="h5" className={styles.cardWidgetLabel}>
                                                {this.state.cardLabel[index]}
                                            </Typography>

                                        </CardContent>

                                    </Box>

                                    <CardMedia component="img" image={this.state.cardImage[index]} alt="Status" className={styles.cardImageStyle} />

                                </Card>

                            </Grid>

                        ))}

                    </Grid>

                }

                <Container maxWidth="md">

                    {this.state.tableData.length !== 0 ?

                        <ReactUtilityTable

                            title=""

                            options={{
                                headerStyle: {
                                    backgroundColor: "#16335B",
                                    color: "#B6B6B6"
                                },
                                pageSize: 100,
                                paging: true
                            }}

                            columns={[

                                { title: "Consent Id", field: 'consentId' },
                                { title: "Subscriber Name", field: 'subscriberName' },
                                { title: "Start Date", field: 'startDate' },
                                { title: "End Date", field: 'endDate' },
                                { title: "Request Date", field: 'requestDate' },
                                { title: "Status", field: 'status' },

                            ]}

                            data={this.state.tableData}

                        />

                        :

                        console.log("no data found in table")

                    }

                </Container>

            </div>


        )
    }
}


export default DataFetchAnalytics


const twoStatus = [
    { title: "Success" },
    { title: "Failed" }
]