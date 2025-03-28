import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import Contactpage from "../Pages/ContactPage";
import CatalogPage from "../Pages/catalog/CatalogPage";
import ProductDetails from "../Pages/catalog/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element:<App/>,
        children:[
            {path:"/",element:<HomePage/>},
            {path:"about",element:<AboutPage/>},
            {path:"contact",element:<Contactpage/>},
            {path:"catalog",element:<CatalogPage/>},
            {path:"catalog/:id",element:<ProductDetails/>}
        ]
    }
])