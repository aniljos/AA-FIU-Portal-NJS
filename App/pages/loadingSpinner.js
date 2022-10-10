import { Backdrop, makeStyles } from "@mui/material";
import { usePromiseTracker } from "react-promise-tracker";
import { BeatLoader } from "react-spinners";




const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff"
    },
}))


export const LoadingSpinnerComponent = (props) => {

    const { promiseInProgress } = usePromiseTracker();
    const classes = useStyles();

    return (

        <div>

            <Backdrop className={classes.backdrop} open={promiseInProgress}>

                <BeatLoader size={30} color='orange' />

            </Backdrop>

        </div>

    )

}