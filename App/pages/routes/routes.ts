import Dashboard from "../component/Dashboard"
import DataFetch from "../component/dataFetch"
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataArrayIcon from "@mui/icons-material/DataArray";


interface AppRoute {
    title: string,
    route?: string,
    component?: any,
    icon: any,
    isMain: boolean,
    children?: Array<AppRoute>
}


export const routes: Array<AppRoute> = [
    {
        title: "Dashboard",
        route: "/Dashboard",
        component: Dashboard,
        icon: DashboardIcon,
        isMain: true
    },
    {
        title: "Consent Analysis",
        route: "/dataFetch",
        component: DataFetch,
        icon: DataArrayIcon,
        isMain: true
    },
]