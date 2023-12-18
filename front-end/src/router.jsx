import { createBrowserRouter } from "react-router-dom"
import App from  "./App"
import { Home } from "./pages/Home"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import UpdateEmailItem from "./components/UpdateEmailItem"
import PremiumPage from "./pages/PremiumPage"
import UpdatePasswordItem from "./components/UpdatePasswordItem"

const router = createBrowserRouter([
    {
        path:"/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "join/",
                element: <SignUpPage/>
            },
            {
                path: "login/",
                element: <LoginPage />
            },
            {
                path: "settings/",
                element: <SettingsPage/>,
            },
            {
                path:"settings/update-email/",
                element: <UpdateEmailItem/>
            },
            {
                path:'settings/get-premium',
                element: <PremiumPage/>
            },
            {
                path:'settings/update-password',
                element: <UpdatePasswordItem/>
            }
        ]
    }
])

export default router;