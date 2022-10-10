import { Autocomplete, Button, Grid, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { Component, createRef } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import styles from '../../styles/Home.module.css';



export class DataFetch extends Component {

    constructor(props) {

        super(props)

        this.state = {
            menu: false,
            startDate: null,
            endDate: null,
        }
        this.start_Date = createRef(null)
    }

    componentDidMount() { }

    render() {

        return (


            <div>

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
                                minDate={this.state.startDate}
                                onChange={(e) => this.setState({ endDate: e })}
                                renderInput={(params) => <TextField {...params} />}
                            />

                        </Grid>

                    </LocalizationProvider>

                    <Grid container lg={2} md={2} sm={12} xs={12} className={styles.haMenu}>

                        <Button variant="outlined" type='submit'>
                            Search
                        </Button>

                    </Grid>

                </Grid>

                <Grid container item xs={12} lg={12} md={12} sm={12} className={styles.searchDataMenu}>

                    <Grid container lg={4} md={6} xs={12} sm={12} className={styles.haMenuGrid}>

                        {/* <Autocomplete
                            disablePortal
                            id='tags-standard'
                            multiple={true}
                        /> */}

                    </Grid>

                </Grid>

            </div>


        )
    }
}


export default DataFetch