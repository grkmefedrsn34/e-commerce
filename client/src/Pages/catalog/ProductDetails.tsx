import { CircularProgress,Grid, Divider, Stack, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import CartSummary from "../cart/CartSummary";
import { useEffect } from "react";
import { addItemToCart } from "../cart/CartSlice";
import { fetchProductByID, selectProductByID } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";

export default function ProductDetails(){
    const {cart,status} = useAppSelector(state =>state.cart);
    const dispatch = useAppDispatch();
    const product = useAppSelector(state =>selectProductByID(state,Number(id)));
    const {status:loading} = useAppSelector(state =>state.catalog);

    const{ id } = useParams<{id:string}>();




    const item = cart?.CartItems.find(i => i.ProductID == product?.id);

    useEffect(()=>{
        if(!product && id){
            dispatch(fetchProductByID(parseInt(id)))
        }
    },[id]);

    

    if(loading) return <CircularProgress/>
    if(!product) return <NotFound/>
    return (
        <Grid container spacing={2}>
            <Grid size={{xl:3,lg:4,md:5,sm:6,xs:12}}>
                <img src={`http://localhost:5286/images/${product.imageUrl}`} style={{width:"100%"}}/>
            </Grid>

            <Grid size={{xl:9,lg:8,md:7,sm:6,xs:12}}>
                <Typography variant="h3" component="h2">{product.name}</Typography>
                <Divider sx={{mb:2}}/>
                <Typography variant="h5" component="h2" color="secondary">{(product.price/100).toFixed(2)}$</Typography>
                <TableContainer>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Stock</TableCell>
                            <TableCell>{product.stock}</TableCell>
                        </TableRow>
                        {/*Cart Summary*/}
                        <CartSummary/>
                    </TableBody>
                </TableContainer>
                <Stack direction="row" sx={{mt:3}} alignItems="center" spacing={2}>
                    <LoadingButton variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart/>} loading={status === "pendingAddItem" + product.id} onClick={()=>dispatch(addItemToCart({ProductID:product.id}))}>Sepete Ekle</LoadingButton>
                    {
                        item?.Quantity! > 0 && (
                            <Typography variant="body2"> Sepetinize {item?.Quantity} adet eklendi .</Typography>
                        )
                    }
                </Stack>
            </Grid>
        </Grid>
    );
}