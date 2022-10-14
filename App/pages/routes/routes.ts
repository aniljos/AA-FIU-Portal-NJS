import Dashboard from "../component/dashboard"
import DataFetch from "../component/dataFetch"
import InstituteManagement from "../component/instituteManagement/index"
import SessionAudit from "../component/sessionAudit"
import DataFetchAnalytics from "../component/fetchs"
import mytest from "../component/mytest"
import ManageAppSettings from "../component/manageApp"
import Logs from "../component/logs"
import { AddCircleRounded } from "@mui/icons-material";
import EnhancedEncryptionRoundedIcon from "@mui/icons-material/EnhancedEncryptionRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DataArrayIcon from "@mui/icons-material/DataArray";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShareIcon from '@mui/icons-material/Share';
import SettingsIcon from '@mui/icons-material/Settings';


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
        route: "/dashboard",
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
    {
        title: "Data Fetch",
        route: "/fetchs",
        component: DataFetchAnalytics,
        icon: EnhancedEncryptionRoundedIcon,
        isMain: true
    },
    {
        title: "Institute Management",
        route: "/instituteManagement",
        component: InstituteManagement,
        icon: ShareIcon,
        isMain: true
    },
    {
        title: "Session Audit",
        route: "/sessionAudit",
        component: SessionAudit,
        icon: BarChartIcon,
        isMain: true
    },
    {
        title: "Manage App Settings",
        route: "/manageApp",
        component: ManageAppSettings,
        icon: SettingsIcon,
        isMain: true
    },
    {
        title: "Logs",
        route: "/logs",
        component: Logs,
        icon: AddCircleRounded,
        isMain: true
    },
    // {
    //     title: "My test",
    //     route: "/mytest",
    //     component: mytest,
    //     icon: AddCircleRounded,
    //     isMain: true
    // },
]