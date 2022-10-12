// import { Autocomplete, Button, Grid, TextField } from "@mui/material";
// import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { Component, createRef } from "react";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import styles from '../../../styles/Home.module.css';
// import { trackPromise } from "react-promise-tracker";
// import { getConsentInfo } from "../../services/service";
// import LoadingSpinnerComponent from "../../loadingSpinner"



// export class DataFetch extends Component {

//     constructor(props) {

//         super(props)

//         this.state = {
//             menu: false,
//             startDate: null,
//             endDate: null,
//             institutionLabel: [],
//             dbData: [],
//             cardLabel: null,
//             cardImage: null,
//             cardColor: null,
//             cardValue: null,
//             loading: true,
//             tableData: [],
//             searchInstitution: "",
//             purpose: ""
//         }
//         this.start_Date = createRef(null)
//     }

//     componentDidMount() {

//         this.firstCall()
//      }

//     firstCall = async () => {

//         try {

//             var oneMonthLess = new Date();
//             oneMonthLess.setMonth(oneMonthLess.getMonth() - 1);

//             await trackPromise(getConsentInfo().then((resp => {

//                 if (resp) {

//                     if (resp.length !== 0) {

//                         this.setState({
//                             dbData: resp
//                         })

//                         console.log(resp, 'initial')

//                         const authorz = resp.map(item => {
//                             return {
//                                 institution: item.institution.name
//                             }
//                         })

//                         this.setState({
//                             institutionLabel: authorz
//                         })

//                         this.cardData(resp, true)
//                         this.settingTableData(resp, true)
//                     }
//                 }

//                 this.setState({
//                     menu: true,
//                     endDate: new Date(),
//                     startDate: oneMonthLess
//                 })

//             })))

//         } catch (error) {

//             console.log(error, 'error')
//         }
//     }


//     //common card function and sending flag true or false to differentiate whether it is onload or onclick

//     cardData(resp, flag) {

//         let active = 0;
//         let revoked = 0;
//         let expired = 0;
//         let paused = 0;
//         let rejected = 0;

//         var dynamicObj = {};
//         var dynamicLabel = {};
//         var dynamicImage = {};
//         var dynamicColor = {};

//         if (flag) {

//             for (let i = 0; i <= resp.length - 1; i++) {

//                 for (let j = 0; j <= resp[i]['consents'].length - 1; j++) {

//                     switch (resp[i].consents[j]['status']) {

//                         case "Active":
//                             active++;
//                             break;
//                         case "Revoked":
//                             revoked++;
//                             break;
//                         case "Expired":
//                             expired++;
//                             break;
//                         case "Paused":
//                             paused++;
//                             break;
//                         case "Rejected":
//                             rejected++;
//                             break;
//                     }
//                 }
//             }
//         }
//         else {

//             let firstDate = moment(this.state.startDate).format("YYYY-MM-DD");
//             let secondDate = moment(this.state.endDate).format("YYYY-MM-DD");
//             let emptyDateSearch = [];

//             for (let h = 0; h < resp.length; h++) {

//                 for (let i = 0; i < resp[h].consents.length; i++) {

//                     let respStartDate = moment(resp[h].consents[i].startDate).format("YYYY-MM-DD");
//                     let respEndDate = moment(resp[h].consents[i].endDate).format("YYYY-MM-DD")

//                     if (moment(firstDate).isBefore(respStartDate) && moment(secondDate).isAfter(respEndDate)) {

//                         emptyDateSearch.push(resp[h].consents[i])
//                     }
//                 }
//             }

//             for (let z = 0; z < emptyDateSearch.length; z++) {

//                 switch (emptyDateSearch[z].status) {

//                     case "Active":
//                         active++;
//                         break;
//                     case "Revoked":
//                         revoked++;
//                         break;
//                     case "Expired":
//                         expired++;
//                         break;
//                     case "Paused":
//                         paused++;
//                         break;
//                     case "Rejected":
//                         rejected++;
//                         break;
//                 }
//             }
//         }

//         dynamicObj = {
//             "0": active,
//             "1": revoked,
//             "2": expired,
//             "3": paused,
//             "4": rejected
//         }

//         dynamicLabel = {
//             "0": "Active Consents",
//             "1": "Revoked Consents",
//             "2": "Expired Consents",
//             "3": "Paused Consents",
//             "4": "Rejected Consents"
//         }

//         dynamicImage = {
//             "0": "/images/Accept.png",
//             "1": "/images/Revoked.png",
//             "2": "/images/Expired.png",
//             "3": "/images/Paused.png",
//             "4": "/images/Rejected.png"
//         }

//         dynamicColor = {
//             "0": "#C7FFD3",
//             "1": "#BAD7FF",
//             "2": "#FFCCCC",
//             "3": "#F0D1FF",
//             "4": "#FFF1BE"
//         }

//         this.setState({
//             cardLabel: { ...dynamicLabel },
//             cardImage: { ...dynamicImage },
//             cardValue: { ...dynamicObj },
//             cardColor: { ...dynamicColor },
//             loading: false
//         })
//     }

//     //common table function to show data in table and sending flag to differentiate whether it is onload or onclick

//     settingTableData(resp, flag) {

//         var showTableData = [];

//         if (flag) {

//             for (let k = 0; k < resp.length; k++) {

//                 for (let m = 0; m < resp[k]['consents'].length; m++) {

//                     //creating a json object

//                     let bsd = {
//                         "consentId": resp[k].consents[m].consentId,
//                         "subscriberName": resp[k].consents[m].subscriberName,
//                         "startDate": moment(resp[k].consents[m].startDate).format("MM-DD-YYYY"),
//                         "purpose": resp[k].consents[m].purpose,
//                         "status": resp[k].consents[m].status,
//                         "endDate": moment(resp[k].consents[m].endDate).format("MM-DD-YYYY"),
//                         "createdDate": moment(resp[k].consents[m].createdDate).format("MM-DD-YYYY"),
//                         "dataFetchCount": resp[k].consents[m].dataFetchCount,
//                         "count": resp[k].consents[m].consentUse.count,
//                         "lastUseDateTime": (resp[k].consents[m].consentUse.lastUseDateTime),
//                         "fiType": resp[k].consents[m].fiType.toString() || ""
//                     }
//                     showTableData.push(bsd);
//                 }
//             }
//         }
//         else {

//             let firstDate = moment(this.state.startDate).format("YYYY-MM-DD");
//             let secondDate = moment(this.state.endDate).format("YYYY-MM-DD");
//             let emptyDateSearch = [];

//             for (let i = 0; i < resp.length; i++) {

//                 for (let j = 0; j < resp[i].consents.length; j++) {

//                     let respStartDate = moment(resp[i].consents[j].startDate).format("YYYY-MM-DD");
//                     let respEndDate = moment(resp[i].consents[j].endDate).format("YYYY-MM-DD");

//                     if (moment(firstDate).isBefore(respStartDate) && moment(secondDate).isAfter(respEndDate)) {

//                         emptyDateSearch.push(resp[i].consents[j]);
//                     }
//                 }
//             }

//             for (let z = 0; z < emptyDateSearch.length; z++) {

//                 let bsd = {
//                     "consentId": emptyDateSearch[z].consentId,
//                     "subscriberName": emptyDateSearch[z].subscriberName,
//                     "startDate": moment(emptyDateSearch[z].startDate).format("MM-DD-YYYY"),
//                     "purpose": emptyDateSearch[z].purpose,
//                     "status": emptyDateSearch[z].status,
//                     "endDate": moment(emptyDateSearch[z].endDate).format("MM-DD-YYYY"),
//                     "createdDate": moment(emptyDateSearch[z].createdDate).format("MM-DD-YYYY"),
//                     "dataFetchCount": emptyDateSearch[z].dataFetchCount,
//                     "count": emptyDateSearch[z].consentUse.count,
//                     "lastUseDateTime": emptyDateSearch[z].consentUse.lastUseDateTime,
//                     "fiType": emptyDateSearch[z].fiType.toString() || ""
//                 }
//                 showTableData.push(bsd);
//             }

//             if (showTableData.length === 0) {

//                 this.firstCall();
//             }
//         }
//         this.setState({
//             tableData: showTableData,
//             loading: false
//         })
//     }


//     render() {

//         return (


//             <div>

//                 {/* {this.state.loading === true ?

//                     <LoadingSpinnerComponent />

//                     : null} */}

//                 <Grid container item lg={12} md={12} sm={12} xs={12} className={styles.searchDataMenu}>

//                     <LocalizationProvider dateAdapter={AdapterDateFns}>

//                         <Grid container lg={4} md={5} sm={12} xs={12} className={styles.haMenuGrid}>

//                             <DesktopDatePicker
//                                 label="Start Date"
//                                 inputFormat="dd/MM/yyyy"
//                                 value={this.state.startDate}
//                                 onChange={(e) => this.setState({ startDate: e })}
//                                 ref={this.start_Date}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />

//                         </Grid>

//                         <Grid container lg={4} md={5} sm={12} xs={12} className={styles.haMenuGrid}>

//                             <DesktopDatePicker
//                                 label="End Date"
//                                 inputFormat="dd/MM/yyyy"
//                                 value={this.state.endDate}
//                                 minDate={this.state.startDate}
//                                 onChange={(e) => this.setState({ endDate: e })}
//                                 renderInput={(params) => <TextField {...params} />}
//                             />

//                         </Grid>

//                     </LocalizationProvider>

//                     <Grid container lg={2} md={2} sm={12} xs={12} className={styles.haMenu}>

//                         <Button variant="outlined" type='submit'>
//                             Search
//                         </Button>

//                     </Grid>

//                 </Grid>

//                 <Grid container item xs={12} lg={12} md={12} sm={12} className={styles.searchDataMenu}>

//                     <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

//                         <Autocomplete
//                             disablePortal
//                             id='tags-standard'
//                             multiple={true}
//                             options={this.state.institutionLabel}
//                             getOptionLabel={option => option.institution}
//                             sx={{ width: 330 }}
//                             renderInput={(params) => <TextField {...params} label="Institution" />}
//                             onChange={(e, newValue) => this.setState({ searchInstitution: newValue })}
//                         />

//                     </Grid>

//                     <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

//                         <Autocomplete
//                             disablePortal
//                             id='tags-standard'
//                             multiple={true}
//                             options={fivePurpose}
//                             getOptionLabel={option => option.title}
//                             sx={{ width: 330 }}
//                             renderInput={(params) => <TextField {...params} label="Status" />}
//                             onChange={(e, newValue) => this.setState({ purpose: newValue })}
//                         />

//                     </Grid>

//                 </Grid>

//             </div>


//         )
//     }
// }


// export default DataFetch

// const fivePurpose = [
//     { title: 'Wealth management service' },
//     { title: "Customer spending patterns, budget or other reportings" },
//     { title: "Aggregated statement" },
//     { title: "Explicit consent for monitoring of the accounts" },
//     { title: "Explicit one-time consent for the accounts" }
// ];

// const fiveStatus = [
//     { title: "Active" },
//     { title: "Paused" },
//     { title: "Rejected" },
//     { title: "Expired" },
//     { title: "Revoked" }
// ]


import { Component, createRef } from "react";


export class DataFetch extends Component {


    render() {

        return (

            <div>
                Data Fetch
            </div>

        )

    }


}

export default DataFetch

