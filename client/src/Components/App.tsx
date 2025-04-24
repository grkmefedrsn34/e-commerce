import { useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getCart} from "../Pages/cart/CartSlice";
import { getUser} from "../Pages/account/accountSlice";
import Header from "./Header";
import { useAppDispatch } from "../Store/store";


function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = async () =>{
    // getCart
    //getUser
      await dispatch(getUser())
      await dispatch(getCart());
  }

  useEffect(() => {
    initApp().then(()=> setLoading);
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
