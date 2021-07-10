import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";

export const routerLinks = [
    {
        label: "Home",
        href: "/",
        exactUrl: true,
        component: Home
    },
    {
        label: "Dashboard",
        href: "/dashboard",
        exactUrl: false,
        component: Dashboard
    }
]

const getRoutes = () => {
    return routerLinks.map(({ label, href, component }) => {
        return (
            <Route key={label} path={href} exact component={component} />
        )
    })
}

function AppRouter(props:any) {
    return (
        <BrowserRouter>
            {getRoutes()}
        </BrowserRouter>
    );
}

export default AppRouter;