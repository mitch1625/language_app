import { createBrowserRouter } from "react-router-dom"
import App from  "./App"
import { Home } from "./pages/Home"
import SignUpPage from "./pages/SignUpPage"

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
            }
        ]
    }
])

export default router;