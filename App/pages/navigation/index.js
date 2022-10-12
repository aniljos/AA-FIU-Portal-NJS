import DashboardIcon from "@mui/icons-material/Dashboard";
import DataArrayIcon from "@mui/icons-material/DataArray";



const navigation = () => {

    return [
        {
            title: "Dashboard",
            icon: DashboardIcon,
            path: "/Dashboard"
        },
        {
            title: "Consent Analysis",
            icon: DataArrayIcon,
            path: "/dataFetch"
        }
    ]

}



export default navigation