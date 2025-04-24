import { TableCell, TableContainer, TableRow } from "@mui/material";
import { currencyTRY } from "../../utils/formatCurrency";
import { useAppSelector } from "../../Store/store";

export default function CartSummary(){
    const {cart} = useAppSelector(state => state.cart);
    const total = cart?.CartItems.reduce((toplam,item)=>toplam+(item.Quantity*item.price),0) ?? 0;
    const tax = total*0.2;
    const totalll = total+tax;
    return (
        <TableContainer>
            <TableRow>
                <TableCell align="right" colSpan={5}>Ara Toplam</TableCell>
                <TableCell align="right">{currencyTRY.format(total)}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Vergi (%20)</TableCell>
                <TableCell align="right">{tax}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell align="right" colSpan={5}>Toplam</TableCell>
                <TableCell align="right">{currencyTRY.format(totalll)}</TableCell>
            </TableRow>
        </TableContainer>
        
    );
}