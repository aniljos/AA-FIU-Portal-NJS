import { Component, createRef } from "react";
import { trackPromise } from "react-promise-tracker";
import { getConsentInfo } from "../../services/service";
import { Autocomplete, Box, Button, Card, CardContent, CardMedia, Container, Grid, Modal, TextField, Tooltip, Typography } from "@mui/material";
import { DateTimePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from '../../../styles/Home.module.css';
import moment from "moment";
import { popUp } from "../../helper";
import { ReactUtilityTable } from "react-utility-table";
import { LoadingSpinnerComponent } from "../../loadingSpinner"


const style = {
    position: 'absolute',
    top: '53%',
    left: '58%',
    transform: 'translate(-50%, -50%)',
    width: "75%",
    backgroundColor: "#fff",
    p: 4,
};


export class DataFetch extends Component {

    constructor(props) {

        super(props)

        this.state = {

            menu: false,
            startDate: null,
            endDate: null,
            purpose: "",
            dbData: [],
            institutionLabel: [],
            searchInstitution: "",
            status: "",
            cardLabel: null,
            cardImage: null,
            cardValue: null,
            cardColor: null,
            tableData: [],
            openModal: false,
            consentId: "",
            dataFetchCount: "",
            subscriberName: "",
            fiType: "",
            modalStatus: "",
            modalPurpose: "",
            modalCount: 0,
            consentUse: "",
            createDate: null,
            startModalDate: null,
            endModalDate: null,
            dateTime: null,
            loading: true,
        }

        this.firstCall = this.firstCall.bind(this);
        this.start_Date = createRef(null)
        this.end_Date = createRef(null);
    }


    componentDidMount() {

        this.firstCall()
    }


    firstCall = async () => {

        try {

            var oneMonthLess = new Date();
            oneMonthLess.setMonth(oneMonthLess.getMonth() - 1);

            await trackPromise(getConsentInfo().then((resp) => {

                if (resp) {

                    console.log(resp, 'resp')

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
                    this.settingTableData(resp, true)
                }

                this.setState({
                    menu: true,
                    endDate: new Date(),
                    startDate: oneMonthLess
                })
            }))
        } catch (error) {

            console.log(error, 'error')
            popUp({ message: "Something went wrong", icons: "error", title: "Error" })
        }
    }


    //common card function and sending flag true or false to differentiate whether it is onload or onclick

    cardData(resp, flag) {

        let active = 0;
        let revoked = 0;
        let expired = 0;
        let paused = 0;
        let rejected = 0;

        var dynamicObj = {};
        var dynamicLabel = {};
        var dynamicImage = {};
        var dynamicColor = {};

        if (flag) {

            for (let i = 0; i <= resp.length - 1; i++) {

                for (let j = 0; j <= resp[i]['consents'].length - 1; j++) {

                    switch (resp[i].consents[j]['status']) {

                        case "Active":
                            active++;
                            break;
                        case "Revoked":
                            revoked++;
                            break;
                        case "Expired":
                            expired++;
                            break;
                        case "Paused":
                            paused++;
                            break;
                        case "Rejected":
                            rejected++;
                            break;
                    }
                }
            }
        }
        else {

            let firstDate = moment(this.state.startDate).format("YYYY-MM-DD");
            let secondDate = moment(this.state.endDate).format("YYYY-MM-DD");
            let emptyDateSearch = [];

            for (let h = 0; h < resp.length; h++) {

                for (let i = 0; i < resp[h].consents.length; i++) {

                    let respStartDate = moment(resp[h].consents[i].startDate).format("YYYY-MM-DD");
                    let respEndDate = moment(resp[h].consents[i].endDate).format("YYYY-MM-DD")

                    if (moment(firstDate).isBefore(respStartDate) && moment(secondDate).isAfter(respEndDate)) {

                        emptyDateSearch.push(resp[h].consents[i])
                    }
                }
            }

            for (let z = 0; z < emptyDateSearch.length; z++) {

                switch (emptyDateSearch[z].status) {

                    case "Active":
                        active++;
                        break;
                    case "Revoked":
                        revoked++;
                        break;
                    case "Expired":
                        expired++;
                        break;
                    case "Paused":
                        paused++;
                        break;
                    case "Rejected":
                        rejected++;
                        break;
                }
            }
        }

        dynamicObj = {
            "0": active,
            "1": revoked,
            "2": expired,
            "3": paused,
            "4": rejected
        }

        dynamicLabel = {
            "0": "Active Consents",
            "1": "Revoked Consents",
            "2": "Expired Consents",
            "3": "Paused Consents",
            "4": "Rejected Consents"
        }

        dynamicColor = {
            "0": "#C7FFD3",
            "1": "#BAD7FF",
            "2": "#FFCCCC",
            "3": "#F0D1FF",
            "4": "#FFF1BE"
        }

        dynamicImage = {
            "0": "/images/Accept.png",
            "1": "/images/Revoked.png",
            "2": "/images/Expired.png",
            "3": "/images/Paused.png",
            "4": "/images/Rejected.png"
        }

        this.setState({
            cardLabel: { ...dynamicLabel },
            cardImage: { ...dynamicImage },
            cardValue: { ...dynamicObj },
            cardColor: { ...dynamicColor },
            loading: false
        })
    }


    //common table function to show data in table and sending flag to differentiate whether it is onload or onclick

    settingTableData(resp, flag) {

        var showTableData = [];

        if (flag) {

            for (let k = 0; k < resp.length; k++) {

                for (let m = 0; m < resp[k]['consents'].length; m++) {

                    //creating a json object

                    let bsd = {
                        "consentId": resp[k].consents[m].consentId,
                        "subscriberName": resp[k].consents[m].subscriberName,
                        "startDate": moment(resp[k].consents[m].startDate).format("MM-DD-YYYY"),
                        "purpose": resp[k].consents[m].purpose,
                        "status": resp[k].consents[m].status,
                        "endDate": moment(resp[k].consents[m].endDate).format("MM-DD-YYYY"),
                        "createdDate": moment(resp[k].consents[m].createdDate).format("MM-DD-YYYY"),
                        "dataFetchCount": resp[k].consents[m].dataFetchCount,
                        "count": resp[k].consents[m].consentUse.count,
                        "lastUseDateTime": (resp[k].consents[m].consentUse.lastUseDateTime),
                        "fiType": resp[k].consents[m].fiType.toString() || ""
                    }
                    showTableData.push(bsd);
                }
            }
        }
        else {

            let firstDate = moment(this.state.startDate).format("YYYY-MM-DD");
            let secondDate = moment(this.state.endDate).format("YYYY-MM-DD");
            let emptyDateSearch = [];

            for (let i = 0; i < resp.length; i++) {

                for (let j = 0; j < resp[i].consents.length; j++) {

                    let respStartDate = moment(resp[i].consents[j].startDate).format("YYYY-MM-DD");
                    let respEndDate = moment(resp[i].consents[j].endDate).format("YYYY-MM-DD");

                    if (moment(firstDate).isBefore(respStartDate) && moment(secondDate).isAfter(respEndDate)) {

                        emptyDateSearch.push(resp[i].consents[j]);
                    }
                }
            }

            for (let z = 0; z < emptyDateSearch.length; z++) {

                let bsd = {
                    "consentId": emptyDateSearch[z].consentId,
                    "subscriberName": emptyDateSearch[z].subscriberName,
                    "startDate": moment(emptyDateSearch[z].startDate).format("MM-DD-YYYY"),
                    "purpose": emptyDateSearch[z].purpose,
                    "status": emptyDateSearch[z].status,
                    "endDate": moment(emptyDateSearch[z].endDate).format("MM-DD-YYYY"),
                    "createdDate": moment(emptyDateSearch[z].createdDate).format("MM-DD-YYYY"),
                    "dataFetchCount": emptyDateSearch[z].dataFetchCount,
                    "count": emptyDateSearch[z].consentUse.count,
                    "lastUseDateTime": emptyDateSearch[z].consentUse.lastUseDateTime,
                    "fiType": emptyDateSearch[z].fiType.toString() || ""
                }
                showTableData.push(bsd);
            }

            if (showTableData.length === 0) {

                this.firstCall();
            }
        }

        this.setState({
            tableData: showTableData,
            loading: false,
        })
    }


    onSubmit = async () => {

        let firstDate = moment(this.state.startDate).format("YYYY-MM-DD");
        let secondDate = moment(this.state.endDate).format("YYYY-MM-DD");

        if (moment(firstDate).isAfter(secondDate)) {

            popUp({ message: "End Date cannot be greater than Start Date.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    this.end_Date.current.focus()
                }
            })
            return
        }

        try {

            this.setState({
                loading: true
            })

            await trackPromise(getConsentInfo().then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        console.log(resp, 'rsp')

                        this.setState({
                            dbData: resp
                        })

                        if (firstDate !== null || secondDate !== null) {

                            this.cardData(resp, false)
                            this.settingTableData(resp, false)
                        }
                    }
                }
            }))

            this.setState({
                loading: false
            })
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" });
        }
    }


    async updateAutoComplete() {

        let active = 0;
        let revoked = 0;
        let expired = 0;
        let paused = 0;
        let rejected = 0;

        var dynamicObj = {};
        var dynamicLabel = {};
        var dynamicImage = {};
        var dynamicColor = {};
        var showTableData = [];

        try {

            this.setState({
                loading: true
            })

            await trackPromise(getConsentInfo().then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        this.setState({
                            dbData: resp
                        })

                        //getting data based on status

                        if (this.state.status.length !== 0 && this.state.purpose.length === 0 && this.state.searchInstitution.length === 0) {

                            let tempArray = []

                            for (let i = 0; i < this.state.status.length; i++) {

                                for (let j = 0; j < resp.length; j++) {

                                    for (let k = 0; k < resp[j].consents.length; k++) {

                                        if (this.state.status[i].title === resp[j].consents[k].status) {

                                            tempArray.push(resp[j].consents[k]);
                                        }
                                    }
                                }
                            }

                            for (let x = 0; x < tempArray.length; x++) {

                                switch (tempArray[x].status) {

                                    case 'Active':
                                        active++;
                                        break;
                                    case "Revoked":
                                        revoked++;
                                        break;
                                    case "Expired":
                                        expired++;
                                        break;
                                    case "Paused":
                                        paused++;
                                        break;
                                    case "Rejected":
                                        rejected++;
                                        break;
                                }

                                let bsd = {
                                    "consentId": tempArray[x].consentId,
                                    "subscriberName": tempArray[x].subscriberName,
                                    "startDate": moment(tempArray[x].startDate).format("MM-DD-YYYY"),
                                    "purpose": tempArray[x].purpose,
                                    "status": tempArray[x].status,
                                    "endDate": moment(tempArray[x].endDate).format("MM-DD-YYYY"),
                                    "createdDate": moment(tempArray[x].createdDate).format("MM-DD-YYYY"),
                                    "dataFetchCount": tempArray[x].dataFetchCount,
                                    "count": tempArray[x].consentUse.count,
                                    "lastUseDateTime": tempArray[x].consentUse.lastUseDateTime,
                                    "fiType": tempArray[x].fiType.toString() || ""
                                }
                                showTableData.push(bsd);
                            }
                        }

                        //getting data based on purpose

                        if (this.state.purpose.length !== 0 && this.state.status.length === 0 && this.state.searchInstitution.length === 0) {

                            let tempArray = [];

                            for (let i = 0; i < this.state.purpose.length; i++) {

                                for (let j = 0; j < resp.length; j++) {

                                    for (let k = 0; k < resp[j].consents.length; k++) {

                                        if (this.state.purpose[i].title === resp[j].consents[k].purpose) {

                                            tempArray.push(resp[j].consents[k]);
                                        }
                                    }
                                }
                            }

                            for (let x = 0; x < tempArray.length; x++) {

                                switch (tempArray[x].status) {

                                    case 'Active':
                                        active++;
                                        break;
                                    case "Revoked":
                                        revoked++;
                                        break;
                                    case "Expired":
                                        expired++;
                                        break;
                                    case "Paused":
                                        paused++;
                                        break;
                                    case "Rejected":
                                        rejected++;
                                        break;
                                }

                                let bsd = {
                                    "consentId": tempArray[x].consentId,
                                    "subscriberName": tempArray[x].subscriberName,
                                    "startDate": moment(tempArray[x].startDate).format("MM-DD-YYYY"),
                                    "purpose": tempArray[x].purpose,
                                    "status": tempArray[x].status,
                                    "endDate": moment(tempArray[x].endDate).format("MM-DD-YYYY"),
                                    "createdDate": moment(tempArray[x].createdDate).format("MM-DD-YYYY"),
                                    "dataFetchCount": tempArray[x].dataFetchCount,
                                    "count": tempArray[x].consentUse.count,
                                    "lastUseDateTime": tempArray[x].consentUse.lastUseDateTime,
                                    "fiType": tempArray[x].fiType.toString() || ""
                                }
                                showTableData.push(bsd);
                            }
                        }

                        //getting data based on institution

                        if (this.state.searchInstitution.length !== 0 && this.state.status.length === 0 && this.state.purpose.length === 0) {

                            const instituteResp = resp.filter((el) => {

                                for (let i = 0; i < this.state.searchInstitution.length; i++) {

                                    if (this.state.searchInstitution[i].institution === el.institution.name) {

                                        let tempArray = [];
                                        tempArray.push(el);

                                        for (let i = 0; i <= tempArray.length - 1; i++) {

                                            for (let j = 0; j <= tempArray[i]['consents'].length - 1; j++) {

                                                switch (tempArray[i].consents[j]['status']) {

                                                    case "Active":
                                                        active++;
                                                        break;
                                                    case "Revoked":
                                                        revoked++;
                                                        break;
                                                    case "Expired":
                                                        expired++;
                                                        break;
                                                    case "Paused":
                                                        paused++;
                                                        break;
                                                    case "Rejected":
                                                        rejected++;
                                                        break;
                                                }

                                                let bsd = {
                                                    "consentId": tempArray[i].consents[j].consentId,
                                                    "subscriberName": tempArray[i].consents[j].subscriberName,
                                                    "startDate": moment(tempArray[i].consents[j].startDate).format("MM-DD-YYYY"),
                                                    "purpose": tempArray[i].consents[j].purpose,
                                                    "status": tempArray[i].consents[j].status,
                                                    "endDate": moment(tempArray[i].consents[j].endDate).format("MM-DD-YYYY"),
                                                    "createdDate": moment(tempArray[i].consents[j].createdDate).format("MM-DD-YYYY"),
                                                    "dataFetchCount": tempArray[i].consents[j].dataFetchCount,
                                                    "count": tempArray[i].consents[j].consentUse.count,
                                                    "lastUseDateTime": tempArray[i].consents[j].consentUse.lastUseDateTime,
                                                    "fiType": tempArray[i].consents[j].fiType.toString() || ""
                                                }
                                                showTableData.push(bsd);
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        //getting data based on status and purpose

                        if (this.state.purpose.length !== 0 && this.state.status.length !== 0 && this.state.searchInstitution.length === 0) {

                            let tempArray = [];

                            for (let i = 0; i < this.state.purpose.length; i++) {

                                for (let m = 0; m < this.state.status.length; m++) {

                                    for (let j = 0; j < resp.length; j++) {

                                        for (let k = 0; k < resp[j].consents.length; k++) {

                                            if (this.state.purpose[i].title === resp[j].consents[k].purpose && this.state.status[m].title === resp[j].consents[k].status) {

                                                tempArray.push(resp[j].consents[k]);
                                            }
                                        }
                                    }
                                }
                            }

                            for (let x = 0; x < tempArray.length; x++) {

                                switch (tempArray[x].status) {
                                    case "Active":
                                        active++;
                                        break;
                                    case "Revoked":
                                        revoked++;
                                        break;
                                    case "Expired":
                                        expired++;
                                        break;
                                    case "Paused":
                                        paused++;
                                        break;
                                    case "Rejected":
                                        rejected++;
                                        break;
                                }

                                let bsd = {
                                    "consentId": tempArray[x].consentId,
                                    "subscriberName": tempArray[x].subscriberName,
                                    "startDate": moment(tempArray[x].startDate).format("MM-DD-YYYY"),
                                    "purpose": tempArray[x].purpose,
                                    "status": tempArray[x].status,
                                    "endDate": moment(tempArray[x].endDate).format("MM-DD-YYYY"),
                                    "createdDate": moment(tempArray[x].createdDate).format("MM-DD-YYYY"),
                                    "dataFetchCount": tempArray[x].dataFetchCount,
                                    "count": tempArray[x].consentUse.count,
                                    "lastUseDateTime": tempArray[x].consentUse.lastUseDateTime,
                                    "fiType": tempArray[x].fiType.toString() || "",
                                }
                                showTableData.push(bsd);
                            }
                        }

                        //getting data based on institution and status

                        if (this.state.searchInstitution.length !== 0 && this.state.status.length !== 0 && this.state.purpose.length === 0) {

                            let tempArray = [];

                            const instituteResp = this.state.searchInstitution.filter((el) => {

                                for (let h = 0; h < resp.length; h++) {

                                    for (let i = 0; i < resp[h].consents.length; i++) {

                                        for (let j = 0; j < this.state.status.length; j++) {

                                            if (el.institution === resp[h].institution.name) {

                                                if (this.state.status[j].title === resp[h].consents[i].status) {

                                                    tempArray.push(resp[h].consents[i]);

                                                    switch (resp[h].consents[i].status) {

                                                        case "Active":
                                                            active++;
                                                            break;
                                                        case "Revoked":
                                                            revoked++;
                                                            break;
                                                        case "Expired":
                                                            expired++;
                                                            break;
                                                        case "Paused":
                                                            paused++;
                                                            break;
                                                        case "Rejected":
                                                            rejected++;
                                                            break;
                                                    }

                                                    let bsd = {
                                                        "consentId": resp[h].consents[i].consentId,
                                                        "subscriberName": resp[h].consents[i].subscriberName,
                                                        "startDate": moment(resp[h].consents[i].startDate).format("MM-DD-YYYY"),
                                                        "purpose": resp[h].consents[i].purpose,
                                                        "status": resp[h].consents[i].status,
                                                        "endDate": moment(resp[h].consents[i].endDate).format("MM-DD-YYYY"),
                                                        "createdDate": moment(resp[h].consents[i].createdDate).format("MM-DD-YYYY"),
                                                        "dataFetchCount": resp[h].consents[i].dataFetchCount,
                                                        "count": resp[h].consents[i].consentUse.count,
                                                        "lastUseDateTime": resp[h].consents[i].consentUse.lastUseDateTime,
                                                        "fiType": resp[h].consents[i].fiType.toString() || "",
                                                    }
                                                    showTableData.push(bsd);
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        //getting data when every field is blank.

                        if (this.state.searchInstitution.length === 0 && this.state.purpose.length === 0 && this.state.status.length === 0) {

                            this.firstCall();
                        }

                        //getting data based on institution and purpose

                        if (this.state.searchInstitution.length !== 0 && this.state.status.length === 0 && this.state.purpose.length !== 0) {

                            let tempArray = [];

                            const instituteResp = this.state.searchInstitution.filter((el) => {

                                for (let h = 0; h < resp.length; h++) {

                                    for (let i = 0; i < resp[h].consents.length; i++) {

                                        for (let j = 0; j < this.state.purpose.length; j++) {

                                            if (el.institution === resp[h].institution.name) {

                                                if (this.state.purpose[j].title === resp[h].consents[i].purpose) {

                                                    tempArray.push(resp[h].consents[i]);

                                                    switch (resp[h].consents[i].status) {

                                                        case "Active":
                                                            active++;
                                                            break;
                                                        case "Revoked":
                                                            revoked++;
                                                            break;
                                                        case "Expired":
                                                            expired++;
                                                            break;
                                                        case "Paused":
                                                            paused++;
                                                            break;
                                                        case "Rejected":
                                                            rejected++;
                                                            break;
                                                    }

                                                    let bsd = {
                                                        "consentId": resp[h].consents[i].consentId,
                                                        "subscriberName": resp[h].consents[i].subscriberName,
                                                        "startDate": moment(resp[h].consents[i].startDate).format("MM-DD-YYYY"),
                                                        "purpose": resp[h].consents[i].purpose,
                                                        "status": resp[h].consents[i].status,
                                                        "endDate": moment(resp[h].consents[i].endDate).format("MM-DD-YYYY"),
                                                        "createdDate": moment(resp[h].consents[i].createdDate).format("MM-DD-YYYY"),
                                                        "dataFetchCount": resp[h].consents[i].dataFetchCount,
                                                        "count": resp[h].consents[i].consentUse.count,
                                                        "lastUseDateTime": resp[h].consents[i].consentUse.lastUseDateTime,
                                                        "fiType": resp[h].consents[i].fiType.toString() || ""
                                                    }
                                                    showTableData.push(bsd);
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        //getting data based on institution,purpose and status

                        if (this.state.searchInstitution.length !== 0 && this.state.purpose.length !== 0 && this.state.status.length !== 0) {

                            let tempArray = [];

                            const instituteResp = this.state.searchInstitution.filter((el) => {

                                for (let h = 0; h < resp.length; h++) {

                                    for (let i = 0; i < resp[h].consents.length; i++) {

                                        for (let j = 0; j < this.state.status.length; j++) {

                                            for (let k = 0; k < this.state.purpose.length; k++) {

                                                if (el.institution === resp[h].institution.name) {

                                                    if (this.state.status[j].title === resp[h].consents[i].status) {

                                                        if (this.state.purpose[k].title === resp[h].consents[i].purpose) {

                                                            tempArray.push(resp[h].consents[i]);

                                                            switch (resp[h].consents[i].status) {

                                                                case "Active":
                                                                    active++;
                                                                    break;
                                                                case "Revoked":
                                                                    revoked++;
                                                                    break;
                                                                case "Expired":
                                                                    expired++;
                                                                    break;
                                                                case "Paused":
                                                                    paused++;
                                                                    break;
                                                                case "Rejected":
                                                                    rejected++;
                                                                    break;
                                                            }

                                                            let bsd = {
                                                                "consentId": resp[h].consents[i].consentId,
                                                                "subscriberName": resp[h].consents[i].subscriberName,
                                                                "startDate": moment(resp[h].consents[i].startDate).format("MM-DD-YYYY"),
                                                                "purpose": resp[h].consents[i].purpose,
                                                                "status": resp[h].consents[i].status,
                                                                "endDate": moment(resp[h].consents[i].endDate).format("MM-DD-YYYY"),
                                                                "createdDate": moment(resp[h].consents[i].createdDate).format("MM-DD-YYYY"),
                                                                "dataFetchCount": resp[h].consents[i].dataFetchCount,
                                                                "count": resp[h].consents[i].consentUse.count,
                                                                "lastUseDateTime": resp[h].consents[i].consentUse.lastUseDateTime,
                                                                "fiType": resp[h].consents[i].fiType.toString() || ""
                                                            }
                                                            showTableData.push(bsd);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            })
                        }

                        dynamicObj = {
                            "0": active,
                            "1": revoked,
                            "2": expired,
                            "3": paused,
                            "4": rejected
                        }

                        dynamicLabel = {
                            "0": "Active Consents",
                            "1": "Revoked Consents",
                            "2": "Expired Consents",
                            "3": "Paused Consents",
                            "4": "Rejected Consents"
                        }

                        dynamicColor = {
                            "0": "#C7FFD3",
                            "1": "#BAD7FF",
                            "2": "#FFCCCC",
                            "3": "#F0D1FF",
                            "4": "#FFF1BE"
                        }

                        dynamicImage = {
                            "0": "/images/Accept.png",
                            "1": "/images/Revoked.png",
                            "2": "/images/Expired.png",
                            "3": "/images/Paused.png",
                            "4": "/images/Rejected.png"
                        }

                        this.setState({
                            cardLabel: { ...dynamicLabel },
                            cardImage: { ...dynamicImage },
                            cardValue: { ...dynamicObj },
                            cardColor: { ...dynamicColor },
                            tableData: showTableData,
                            loading: false
                        })
                    }
                }
            }))
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" })
        }
    }


    openModalFunction(rowData) {

        this.setState({
            openModal: true,
            consentId: rowData.consentId,
            dataFetchCount: rowData.dataFetchCount,
            subscriberName: rowData.subscriberName,
            fiType: rowData.fiType,
            modalStatus: rowData.status,
            createDate: rowData.createdDate,
            endModalDate: rowData.endDate,
            startModalDate: rowData.startDate,
            modalPurpose: rowData.purpose,
            dateTime: moment(rowData.lastUseDateTime).format('YYYY-MM-DD HH:mm:ss'),
            modalCount: rowData.count,
        })
    }


    closeModalFunction() {

        this.setState({
            openModal: false
        })
    }


    render() {

        return (


            <div>

                {this.state.loading === true ?

                    <LoadingSpinnerComponent />

                    : null}

                <Grid container item lg={12} md={12} sm={12} xs={12} className={styles.searchDataMenu}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <Grid container lg={4} md={5} sm={12} xs={12} className={styles.haMenuGrid}>

                            <DesktopDatePicker
                                label="Start Date"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.startDate}
                                onChange={(e) => this.setState({ startDate: e })}
                                ref={this.start_Date}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </Grid>

                        <Grid container lg={4} md={5} sm={12} xs={12} className={styles.haMenuGrid}>

                            <DesktopDatePicker
                                label="End Date"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.endDate}
                                inputRef={this.end_Date}
                                minDate={this.state.startDate}
                                onChange={(e) => this.setState({ endDate: e })}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </Grid>

                    </LocalizationProvider>

                    <Grid container lg={2} md={2} sm={12} xs={12} className={styles.haMenu}>

                        <Button variant="contained" type='submit' onClick={this.onSubmit}>
                            Search
                        </Button>

                    </Grid>

                </Grid>

                <Grid container item xs={12} lg={12} md={12} sm={12} className={styles.searchDataMenu}>

                    <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

                        <Autocomplete
                            disablePortal
                            id='tags-standard'
                            multiple={true}
                            options={fivePurpose}
                            getOptionLabel={option => option.title}
                            sx={{ width: 330 }}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                            onChange={(e, newValue) => this.setState({ purpose: newValue }, this.updateAutoComplete)}
                        />

                    </Grid>

                    <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

                        <Autocomplete
                            disablePortal
                            id='tags-standard'
                            multiple={true}
                            options={this.state.institutionLabel}
                            getOptionLabel={option => option.institution}
                            sx={{ width: 330 }}
                            onChange={(e, newValue) => this.setState({ searchInstitution: newValue }, this.updateAutoComplete)}
                            renderInput={(params) => <TextField {...params} label="Institution" />}
                        />

                    </Grid>

                    <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

                        <Autocomplete
                            disablePortal
                            id='tags-standard'
                            multiple={true}
                            options={fiveStatus}
                            sx={{ width: 330 }}
                            getOptionLabel={option => option.title}
                            onChange={(e, newValue) => this.setState({ status: newValue }, this.updateAutoComplete)}
                            renderInput={(params) => <TextField {...params} label="Status" />}
                        />

                    </Grid>

                </Grid>

                {this.state.menu &&

                    <Grid container item lg={12} md={12} sm={12} xs={12} className={styles.gridCardStyle}>

                        {this.state.dbData.map((item, index) => (

                            <Grid container lg={2} md={4} sm={12} xs={12} key={index}>

                                <Card className={styles.cardContentStyle} style={{ backgroundColor: this.state.cardColor[index] }}>

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

                <Container maxWidth='md'>

                    {this.state.tableData.length !== 0 ?

                        <ReactUtilityTable

                            title=''

                            options={{
                                headerStyle: {
                                    backgroundColor: "#16335B",
                                    color: "#B6B6B6"
                                },
                                filtering: true,
                                paging: true,
                                pageSize: 100
                            }}

                            columns={[
                                {
                                    title: "Consent Id", field: "consentId", render: rowData => {
                                        return (

                                            <Tooltip title="Click here to view the consent.">

                                                <span>
                                                    {rowData.consentId}
                                                </span>

                                            </Tooltip>

                                        )
                                    }
                                },
                                {
                                    title: "Consented By", field: "subscriberName", render: rowData => {
                                        return (

                                            <Tooltip title="Click here to view the consent.">

                                                <span>
                                                    {rowData.subscriberName}
                                                </span>

                                            </Tooltip>

                                        )
                                    }
                                },
                                {
                                    title: "Start Date", field: "startDate", filtering: false, cellStyle: { width: "14%" }, render: rowData => {
                                        return (

                                            <Tooltip title="Click here to view the consent.">

                                                <span>
                                                    {rowData.startDate}
                                                </span>

                                            </Tooltip>

                                        )
                                    }
                                },
                                {
                                    title: "End Date", field: "endDate", filtering: false, cellStyle: { width: "14%" }, render: rowData => {
                                        return (

                                            <Tooltip title="Click here to view the consent.">

                                                <span>
                                                    {rowData.endDate}
                                                </span>

                                            </Tooltip>

                                        )
                                    }
                                },
                                {
                                    title: "Purpose", field: "purpose", filtering: false, render: rowData => {
                                        return (

                                            <Tooltip title="Click here to view the consent.">

                                                <span>
                                                    {rowData.purpose}
                                                </span>

                                            </Tooltip>

                                        )
                                    }
                                },
                                {
                                    title: 'Status', field: "status", filtering: false, render: rowData => {
                                        return (

                                            <>
                                                {
                                                    rowData.status === "Active" ?

                                                        <div style={{ color: "#2B821B" }}>
                                                            <Tooltip title="Click here to view the consent.">

                                                                <span>
                                                                    {rowData.status}
                                                                </span>

                                                            </Tooltip>
                                                        </div>

                                                        :

                                                        rowData.status === "Expired" ?

                                                            <div style={{ color: "#F60A0A" }}>
                                                                <Tooltip title="Click here to view the consent.">

                                                                    <span>
                                                                        {rowData.status}
                                                                    </span>

                                                                </Tooltip>
                                                            </div>

                                                            :

                                                            rowData.status === "Paused" ?

                                                                <div style={{ color: "#4473B2" }}>
                                                                    <Tooltip title="Click here to view the consent.">

                                                                        <span>
                                                                            {rowData.status}
                                                                        </span>

                                                                    </Tooltip>
                                                                </div>

                                                                :

                                                                rowData.status === "Rejected" ?

                                                                    <div style={{ color: "#FFA723" }}>
                                                                        <Tooltip title="Click here to view the consent.">

                                                                            <span>
                                                                                {rowData.status}
                                                                            </span>

                                                                        </Tooltip>
                                                                    </div>

                                                                    :

                                                                    rowData.status === "Revoked" ?

                                                                        <div style={{ color: "#6200AE" }}>
                                                                            <Tooltip title="Click here to view the consent.">

                                                                                <span>
                                                                                    {rowData.status}
                                                                                </span>

                                                                            </Tooltip>
                                                                        </div>

                                                                        :

                                                                        <span>
                                                                            {rowData.status}
                                                                        </span>
                                                }
                                            </>

                                        )
                                    }
                                },
                            ]}

                            data={this.state.tableData}

                            onRowClick={(evt, rowData) => this.openModalFunction(rowData)}

                        />

                        :

                        console.log("No data in table")

                    }

                </Container>

                {/* openmodal functionality */}

                {this.state.openModal ?

                    <div>

                        <Modal open={this.state.openModal} onClose={() => this.closeModalFunction()} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">

                            <Box sx={style}>

                                <Grid container item xs={12} lg={12} md={12} sm={12}>

                                    <Typography id="modal-modal-title" variant="h6" component="header" className={styles.modalTitle}>
                                        View Consents
                                    </Typography>

                                </Grid>

                                <Grid container lg={12} md={12} sm={12} xs={12}>

                                    <Grid container flexDirection="row" item xs={12} lg={12} md={12} sm={12} className={styles.textfieldFirstClass}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Consent-Id
                                                </Typography>

                                            </Grid>

                                            <Grid lg={7} md={7} sm={12} xs={12}>

                                                <TextField className={styles.textFieldmargin} disabled type='text' variant="outlined" margin="normal" fullWidth value={this.state.consentId} />

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Data Fetch Count
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <TextField disabled className={styles.textFieldmargin} type='text' variant="outlined" margin="normal" value={this.state.dataFetchCount} fullWidth />

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container flexDirection="row" className={styles.textclasscss} item lg={12} md={12} xs={12} sm={12}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Subscriber Name
                                                </Typography>

                                            </Grid>

                                            <Grid lg={7} md={7} sm={12} xs={12}>

                                                <TextField type='text' className={styles.textFieldmargin} variant="outlined" margin="normal" disabled value={this.state.subscriberName} fullWidth />

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Status
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <TextField type='text' className={styles.textFieldmargin} variant="outlined" disabled value={this.state.modalStatus} margin="normal" fullWidth />

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container flexDirection="row" className={styles.textclasscss} item lg={12} md={12} xs={12} sm={12}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Created Date
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                    <DesktopDatePicker
                                                        label=''
                                                        value={this.state.createDate}
                                                        disabled
                                                        onChange={(e) => this.setState({ createDate: e })}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />

                                                </LocalizationProvider>

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Purpose
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <TextField disabled className={styles.textFieldmargin} value={this.state.modalPurpose} type='text' variant="outlined" margin="normal" fullWidth />

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container flexDirection="row" className={styles.textclasscss} item lg={12} md={12} xs={12} sm={12}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Start Date
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                    <DesktopDatePicker
                                                        label=""
                                                        value={this.state.startModalDate}
                                                        disabled
                                                        onChange={(e) => this.setState({ startModalDate: e })}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />

                                                </LocalizationProvider>

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Consent Use
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <TextField disabled className={styles.textFieldmargin} value={this.state.consentUse} type='text' variant="outlined" margin="normal" fullWidth />

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container flexDirection="row" className={styles.textclasscss} item lg={12} md={12} xs={12} sm={12}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    End Date
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                    <DesktopDatePicker
                                                        label=""
                                                        value={this.state.endModalDate}
                                                        disabled
                                                        onChange={(e) => this.setState({ endModalDate: e })}
                                                        renderInput={(params) => <TextField {...params} />}
                                                    />

                                                </LocalizationProvider>

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Count
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <TextField disabled className={styles.textFieldmargin} value={this.state.modalCount} type='text' variant="outlined" margin="normal" fullWidth />

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                    <Grid container flexDirection="row" className={styles.textclasscss} item lg={12} md={12} xs={12} sm={12}>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Financial Instrument Type
                                                </Typography>

                                            </Grid>

                                            <Grid lg={7} md={7} sm={12} xs={12}>

                                                <TextField disabled className={styles.textFieldmargin} value={this.state.fiType} type='text' variant="outlined" margin="normal" fullWidth />

                                            </Grid>

                                        </Grid>

                                        <Grid container flexDirection="row" lg={6} md={6} sm={12} xs={12}>

                                            <Grid lg={4} md={4} xs={12} sm={12}>

                                                <Typography id="spring-modal-description">
                                                    Last Use Date-Time
                                                </Typography>

                                            </Grid>

                                            <Grid lg={8} md={8} sm={12} xs={12}>

                                                <LocalizationProvider dateAdapter={AdapterDateFns}>

                                                    <DateTimePicker
                                                        label=''
                                                        disabled
                                                        value={this.state.dateTime}
                                                        renderInput={(props) => <TextField {...props} />}
                                                        onChange={(e) => this.setState({ dateTime: e })}
                                                    />

                                                </LocalizationProvider>

                                            </Grid>

                                        </Grid>

                                    </Grid>

                                </Grid>

                                <Grid item xs={12} lg={12} md={12} sm={12} style={{ textAlign: "center" }}>

                                    <Button variant="contained" onClick={() => this.closeModalFunction()}>
                                        Close
                                    </Button>

                                </Grid>

                            </Box>

                        </Modal>

                    </div>

                    :

                    null}

            </div>

        )
    }
}

export default DataFetch


const fivePurpose = [
    { title: 'Wealth management service' },
    { title: "Customer spending patterns, budget or other reportings" },
    { title: "Aggregated statement" },
    { title: "Explicit consent for monitoring of the accounts" },
    { title: "Explicit one-time consent for the accounts" }
];

const fiveStatus = [
    { title: "Active" },
    { title: "Paused" },
    { title: "Rejected" },
    { title: "Expired" },
    { title: "Revoked" }
]