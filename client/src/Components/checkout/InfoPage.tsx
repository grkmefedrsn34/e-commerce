import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "../../Store/store";
import { currencyTRY } from "../../utils/formatCurrency";

export default function InfoPage()
{
    const {cart} = useAppSelector(state => state.cart);
    const subTotal = cart?.CartItems.reduce((toplam,item)=>toplam+(item.Quantity*item.price),0) ?? 0;
    return(
        <>
            <Typography variant="subtitle2" sx={{color:"text.secondary"}}>Toplam</Typography>
            <Typography variant="h5" gutterBottom>
                {currencyTRY.format(subTotal)}
            </Typography>
            <List>
                {cart?.CartItems.map((item)=>(
                    <ListItem key={item.ProductID} sx={{py:1,px:0}}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={`http://localhost:5286/images/${item.imageUrl}`}></Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{mr:2}} primary={item.name} secondary={`x${item.Quantity}`}></ListItemText>
                        <Typography variant="body1">
                            {currencyTRY.format(item.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    )
}