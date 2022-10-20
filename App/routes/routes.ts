import Dashboard from "../pages/mainPages/Dashboard";
import DataFetch from "../pages/mainPages/Datafetch";
import InstituteManagement from "../pages/mainPages/InstituteManagement";
import SessionAudit from "../pages/mainPages/SessionAudit";
import DataFetchAnalytics from "../pages/mainPages/DatafetchAnalytics";
import ManageAppSettings from "../pages/mainPages/ManageApp";
import Logs from "../pages/mainPages/Logs";
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
        route: "/Dashboard",
        component: Dashboard,
        icon: DashboardIcon,
        isMain: true
    },
    {
        title: "Consent Analysis",
        route: "/Datafetch",
        component: DataFetch,
        icon: DataArrayIcon,
        isMain: true
    },
    {
        title: "Data Fetch",
        route: "/DatafetchAnalytics",
        component: DataFetchAnalytics,
        icon: EnhancedEncryptionRoundedIcon,
        isMain: true
    },
    {
        title: "Institute Management",
        route: "/InstituteManagement",
        component: InstituteManagement,
        icon: ShareIcon,
        isMain: true
    },
    {
        title: "Session Audit",
        route: "/SessionAudit",
        component: SessionAudit,
        icon: BarChartIcon,
        isMain: true
    },
    {
        title: "Manage App Settings",
        route: "/ManageApp",
        component: ManageAppSettings,
        icon: SettingsIcon,
        isMain: true
    },
    {
        title: "Logs",
        route: "/Logs",
        component: Logs,
        icon: AddCircleRounded,
        isMain: true
    },
]