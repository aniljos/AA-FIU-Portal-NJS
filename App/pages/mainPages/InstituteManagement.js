import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { trackPromise } from "react-promise-tracker";
import { ReactUtilityTable } from "react-utility-table";
import { LoadingSpinnerComponent } from "../../component/helper/loadingSpinner";
import { popUp } from "../../component/helper/popUp";
import { getServiceMethod, putServiceMethod } from "../../component/services/axiosService";
import styles from "../../styles/Home.module.css";


function AaBasedAnalytics() {

    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const router = useRouter();


    useEffect(() => {
        onLoadApi()
    }, [])


    async function onLoadApi() {

        try {

            await trackPromise(getServiceMethod("institutions").then((resp) => {
                if (resp) {

                    console.log(resp, 'res');
                    setLoading(false);
                    setTableData(resp);
                }
            }))
        } catch (error) {

            console.log(error, 'error');
            popUp({ message: "Something went wrong.", icons: "error", title: "Error" });
        }
    }


    function addNewInstitution() {
        router.push("/mainPages/AddInstitution");
    }


    return (


        <div>

            {loading ? <LoadingSpinnerComponent /> : null}

            <Grid container item xs={12} lg={12} md={12} sm={12} className={styles.searchDataMenu}>

                <Grid item lg={12} md={12} sm={12} xs={12}>

                    {tableData.length !== 0 ?

                        <ReactUtilityTable

                            title="AA Based Analytics"

                            options={{
                                headerStyle: {
                                    backgroundColor: "#16335B",
                                    color: "#B6B6B6"
                                },
                                paging: true
                            }}

                            columns={[

                                { title: "Institution Type", field: "instituionType", editable: false },
                                { title: "Institution Name", field: "institutionName", editable: false },
                                { title: "Authorized Person", field: "authorizedPerson" },
                                { title: "Address", field: "address" },
                                { title: "Mobile No.", field: "mobileNo" }

                            ]}

                            data={tableData}

                            editable={{

                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {

                                        setTimeout(async () => {

                                            const dataUpdate = [...tableData];
                                            const index = oldData.tableData.id;
                                            dataUpdate[index] = newData;
                                            try {

                                                await trackPromise(putServiceMethod("institutions", newData).then((resp) => {
                                                    if (resp) {

                                                        console.log("updatedresp", resp);
                                                        setTableData([...dataUpdate]);
                                                    }
                                                }))
                                            } catch (error) {

                                                console.log(error, 'error');
                                                popUp({ message: "Something went wrong", icons: "error", title: "Error" });
                                            }
                                            resolve()
                                        }, 1000)
                                    })
                            }}
                        />

                        :

                        console.log("no data in table")

                    }

                </Grid>

                <Grid item xs={12} lg={12} md={12} sm={12} className={styles.addClassButton}>

                    <Button type="submit" variant="outlined" color="primary" onClick={() => addNewInstitution()}>
                        Add New Institution
                    </Button>

                </Grid>

            </Grid>

        </div>


    )
}


export default AaBasedAnalytics