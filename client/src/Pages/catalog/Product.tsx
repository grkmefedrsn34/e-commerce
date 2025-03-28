import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { IProduct } from "../../Model/IProduct";
import { AddShoppingCart, Search } from "@mui/icons-material";

interface Props{
    product: IProduct
}
export default function Product({product}:Props){
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
                <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>} color="success">Add to Cart</Button>
                <Button size="small" startIcon={<Search/>} color="primary">View</Button>
            </CardActions>
        </Card>
    );
}