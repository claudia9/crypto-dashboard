import React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";

export const routerLinks = [
    {
        label: "Home",
        href: "/",
        exact: true,
        component: Home
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        exact: false,
        component: Dashboard
    }
]

const getRoutes = () => {
    return routerLinks.map(({ label, href, exact, component }) => {
        return (
            <Route key={label} path={href} {...exact} component={component} />
        )
    })
}

function AppRouter() {
    return (
        <Router>
            {getRoutes()}
        </Router>
    );
}

export default AppRouter;