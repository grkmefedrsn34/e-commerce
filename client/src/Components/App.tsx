import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import request from "../api/Request";
import { setCart } from "../Pages/cart/CartSlice";

function App() {

  //const dispatch = useAppDispatch();
  const [loading,SetLoading] = useState(true);

  useEffect(()=>{
    request.Cart.get()
    .then(cart => setCart(cart))
    .catch(err => console.log(err))
    .finally(()=>SetLoading(false));
  },[]);

  if(loading) return <CircularProgress/>;
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline/>
      <Header/>
      <Container>
        <Outlet/>
      </Container>
    </>
  )
}

export default App
