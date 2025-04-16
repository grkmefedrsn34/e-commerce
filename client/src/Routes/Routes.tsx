import { createBrowserRouter, Navigate } from "react-router";
import App from "../Components/App";
import HomePage from "../Pages/Home";
import AboutPage from "../Pages/AboutPage";
import ContactPage from "../Pages/ContactPage";
import CatalogPage from "../Pages/catalog/CatalogPage";
import ProductDetails from "../Pages/catalog/ProductDetails";
import Error from "../Pages/Error";
import  ServerError  from "../errors/SeverError";
import NotFound from "../errors/NotFound";
import ShoppingCartPage from "../Pages/cart/ShoppingCartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "catalog", element: <CatalogPage /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "cart", element: <ShoppingCartPage /> },
            { path: "error", element: <Error /> },
            { path: "server-error", element: <ServerError /> },
            { path: "notfound", element: <NotFound /> },
            { path: "*", element: <Navigate to="/notfound" /> }
        ]
    }
]);
