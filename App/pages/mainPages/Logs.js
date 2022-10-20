import { Autocomplete, Button, Container, Grid, TextField } from "@mui/material";
import moment from "moment";
import { Component, createRef } from "react";
import { trackPromise } from "react-promise-tracker";
import { popUp } from "../helper/popUp";
import { LoadingSpinnerComponent } from "../helper/loadingSpinner";
import { getServiceMethod } from "../services/axiosService";
import styles from '../../styles/Home.module.css';
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReactUtilityTable } from "react-utility-table";



export class Logs extends Component {

    constructor(props) {

        super(props)

        this.state = {
            date: null,
            institutionLabel: [],
            searchInstitution: "",
            searchLevel: "",
            tableData: [],
            loading: true
        }

        this.date_ref = createRef(null);
    }


    componentDidMount() {

        this.firstCall();
    }


    firstCall = async () => {

        try {

            await trackPromise(getServiceMethod("logs").then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        console.log(resp, 'initialresp');

                        this.setState({
                            tableData: resp,
                            loading: false
                        })
                    }
                }
            }))
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" });
        }
    }


    dateSearch = async () => {

        if (this.state.date === null || this.state.date === "" || this.state.date === undefined) {

            popUp({ message: "Please enter the Date.", icons: "error", title: "Error" }).then((event) => {
                if (event.isConfirmed) {
                    this.date_ref.current.focus();
                }
            })
            return
        }

        try {

            this.setState({
                loading: true
            })

            await trackPromise(getServiceMethod("logs").then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        let showTableData = [];

                        for (let i = 0; i < resp.length; i++) {

                            let firstDate = moment(this.state.date).format("YYYY-MM-DD");
                            let secondDate = moment(resp[i].date).format("YYYY-MM-DD");

                            if (firstDate === secondDate) {

                                showTableData.push(resp[i])
                            }
                        }

                        if (showTableData.length !== 0) {

                            this.setState({
                                tableData: showTableData,
                                loading: false
                            })
                        }
                        else {

                            this.setState({
                                tableData: []
                            })

                            popUp({ message: "No record found for the entered date.", icons: "error", title: "Error" }).then((event) => {
                                if (event.isConfirmed) {
                                    this.date_ref.current.focus();
                                }
                            })
                            return
                        }
                    }
                }
            }))
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" });
        }
    }


    updateData = async () => {

        try {

            this.setState({
                loading: true
            })

            await trackPromise(getServiceMethod("logs").then((resp) => {

                if (resp) {

                    if (resp.length !== 0) {

                        let showTableData = [];

                        for (let i = 0; i < resp.length; i++) {

                            if (this.state.searchInstitution.length !== 0 && this.state.searchLevel.length === 0) {

                                for (let j = 0; j < this.state.searchInstitution.length; j++) {

                                    if (this.state.searchInstitution[j].institutionName === resp[i].institutionName) {

                                        showTableData.push(resp[i])
                                    }
                                }
                            }

                            if (this.state.searchInstitution.length === 0 && this.state.searchLevel.length !== 0) {

                                for (let k = 0; k < this.state.searchLevel.length; k++) {

                                    if (this.state.searchLevel[k].title === resp[i].level) {

                                        showTableData.push(resp[i])
                                    }
                                }
                            }

                            if (this.state.searchInstitution.length !== 0 && this.state.searchLevel.length !== 0) {

                                for (let j = 0; j < this.state.searchInstitution.length; j++) {

                                    for (let k = 0; k < this.state.searchLevel.length; k++) {

                                        if (this.state.searchInstitution[j].institutionName === resp[i].institutionName) {

                                            if (this.state.searchLevel[k].title === resp[i].level) {

                                                showTableData.push(resp[i])
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (this.state.searchInstitution.length === 0 && this.state.searchLevel.length === 0) {

                            this.firstCall();
                        }

                        this.setState({
                            tableData: showTableData,
                            loading: false
                        })
                    }
                }
            }))
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong", icons: "error", title: "Error" })
        }
    }


    render() {

        return (


            <div>

                {this.state.loading ?

                    <LoadingSpinnerComponent />

                    : null}

                <Grid container item lg={12} md={12} sm={12} xs={12} className={styles.searchDataMenu}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>

                        <Grid container lg={4} md={5} sm={12} xs={12} className={styles.haMenuGrid}>

                            <DesktopDatePicker
                                label="Date"
                                inputFormat="dd/MM/yyyy"
                                value={this.state.date}
                                onChange={(e) => this.setState({ date: e })}
                                inputRef={this.date_ref}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </Grid>

                    </LocalizationProvider>

                    <Grid container lg={2} md={2} sm={12} xs={12} className={styles.haMenu}>

                        <Button type='submit' variant='outlined' onClick={this.dateSearch}>
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
                            options={Institution}
                            getOptionLabel={option => option.institutionName}
                            sx={{ width: 330 }}
                            onChange={(e, newValue) => this.setState({ searchInstitution: newValue }, this.updateData)}
                            renderInput={(params) => <TextField {...params} label="Institution" />}
                        />

                    </Grid>

                    <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

                        <Autocomplete
                            disablePortal
                            id='tags-standard'
                            multiple={true}
                            options={Level}
                            getOptionLabel={option => option.title}
                            sx={{ width: 330 }}
                            onChange={(e, newValue) => this.setState({ searchLevel: newValue }, this.updateData)}
                            renderInput={(params) => <TextField {...params} label="Level" />}
                        />

                    </Grid>

                </Grid>

                <Container maxWidth='md'>

                    {this.state.tableData.length !== 0 ?

                        <ReactUtilityTable

                            title=""

                            columns={[

                                { title: "Source", field: "source" },
                                { title: "Message", field: "message" },
                                { title: "Date", field: "date", cellStyle: { width: "25%" } },
                                { title: "Level", field: "level" },

                            ]}

                            data={this.state.tableData}

                            options={{
                                headerStyle: {
                                    backgroundColor: "#16335B",
                                    color: "#B6B6B6"
                                },
                                pageSize: 100,
                                paging: true
                            }}
                        />

                        :

                        console.log("nodata in table")

                    }

                </Container>

            </div>


        )
    }
}



export default Logs


const Institution = [
    { id: 1, institutionName: "Infovault" },
    { id: 2, institutionName: "FinVu" },
    { id: 3, institutionName: "CAMSFinServ" },
    { id: 4, institutionName: "Onemoney" },
    { id: 5, institutionName: "CAMS" }
]


const Level = [
    { title: "Info" },
    { title: "Error" },
    { title: "Warning" },
    { title: "Debug" },
]