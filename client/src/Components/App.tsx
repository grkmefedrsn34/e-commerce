import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import request from "../api/Request";
import { setCart } from "../Pages/cart/CartSlice";
import { useAppDispatch } from "../hooks/hook";
import { setUser } from "../Pages/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("user")!)))
    request.Account.getUser()
      .then(user =>{setUser(user);localStorage.setItem("user",user)})
      .catch(error => console.log(error));


    request.Cart.get()
      .then((cart) => setCart(cart))
      .catch((err) => console.log(err)) // Handle error here as well
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
