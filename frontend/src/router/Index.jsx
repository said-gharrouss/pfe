import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import AdminLogin from "../pages/admin/AdminLogin"
import StudentLogin from "../pages/student/StudentLogin"
import InstrucLogin from "../pages/instructor/InstrucLogin"
import StudentDashboard from "../pages/student/StudentDashboard"
import AdminDashboard from "../pages/admin/AdminDashboard"
import InstrucDashboard from "../pages/instructor/InstrucDashboard"
import UpdateStage from "../pages/student/UpdateStage"

export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
export const ADMIN_DASHBOARD_ROUTE = "/admin/dashboard";
export const INSTRUCTOR_DASHBOARD_ROUTE = "/instructor/dashboard";
export const STUDENT_LOGIN = "/StudentLogin";
export const INSTRUCTOR_LOGIN = "/instructorLogin";
export const ADMIN_LOGIN = "/adminLogin";

const router = createBrowserRouter([
    {
        path : "/",
        element : <Home/>
    },
    {
        path: ADMIN_LOGIN,
        element: <AdminLogin/>,
    },
    {
        path: INSTRUCTOR_LOGIN,
        element: <InstrucLogin/>,
    },
    {
        path: STUDENT_LOGIN,
        element: <StudentLogin/>,
    },
    {
        path : STUDENT_DASHBOARD_ROUTE,
        element : <StudentDashboard/>
    },
    {
        path : STUDENT_DASHBOARD_ROUTE + "/updatestage/:id",
        element : <UpdateStage/>
    },
    {
        path : ADMIN_DASHBOARD_ROUTE,
        element : <AdminDashboard/>
    },
    {
        path : INSTRUCTOR_DASHBOARD_ROUTE,
        element : <InstrucDashboard/>
    },
])

function Index() {
    return (
        <RouterProvider router={router} />
    )
}

export default Index
