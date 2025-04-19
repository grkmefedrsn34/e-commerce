import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../Model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";
import { Link } from "react-router";
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { addItemToCart } from "../cart/CartSlice";

interface Props{
    product: IProduct
}
export default function Product({product}:Props){
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.cart);

    return (
        <Card>
            <CardMedia image={`http://localhost:5286/images/${product.imageUrl}`} sx={{height:160, backgroundSize:"contain"}}/>
            <CardContent>
                <Typography variant="h6" component="h2" gutterBottom color="text.secondary">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="secondary">
                    {(product.price/100).toFixed(2)} $
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton variant="outlined" 
                startIcon={<AddShoppingCart/>} 
                loading={status === "pendingAddItem" + product.id} 
                onClick={()=> dispatch(addItemToCart({ProductID:product.id}))}
                loadingPosition="start">Add to Cart</LoadingButton>
                <Button size="small" startIcon={<Search/>} color="primary" component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    );
}