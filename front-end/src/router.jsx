import { createBrowserRouter } from "react-router-dom"
import App from  "./App"
import { Home } from "./pages/Home"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"

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
                element: <SettingsPage/>
            }
        ]
    }
])

export default router;