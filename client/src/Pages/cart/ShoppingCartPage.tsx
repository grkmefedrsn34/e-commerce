import { Alert, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../../Store/store";
import { addItemToCart, deleteItemFromCart } from "./CartSlice";
import CartSummary from "./CartSummary";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartPage() {
    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    if (!cart || cart?.CartItems.length === 0)
        return <Alert severity="warning">Sepetinizde ürün yok</Alert>;

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell align="right">Fiyat</TableCell>
                            <TableCell align="right">Adet</TableCell>
                            <TableCell align="right">Toplam</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart?.CartItems.map((item) => (
                            <TableRow
                                key={item.ProductID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <img src={`http://localhost:5291/images/${item.imageUrl}`} style={{ height: 60 }} />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === "pendingAddItem" + item.ProductID}
                                        onClick={() => dispatch(addItemToCart({ ProductID: item.ProductID }))}>
                                        <AddCircleOutline />
                                    </LoadingButton>
                                    {item.Quantity}
                                    <LoadingButton
                                        loading={status === "pendingDeleteItem" + item.ProductID + "single"}
                                        onClick={() =>
                                            dispatch(deleteItemFromCart({
                                                ProductID: item.ProductID,
                                                Quantity: 1
                                            }))
                                        }>
                                        <RemoveCircleOutline />
                                    </LoadingButton>
                                </TableCell>
                                <TableCell align="right">
                                    {currencyTRY.format(item.price * item.Quantity)} ₺
                                </TableCell>
                                <TableCell align="right">
                                    <LoadingButton color="error"
                                        loading={status === "pendingDeleteItem" + item.ProductID + "all"}
                                        onClick={() =>
                                            dispatch(deleteItemFromCart({
                                                ProductID: item.ProductID,
                                                Quantity: item.Quantity
                                            }))
                                        }>
                                        <Delete />
                                    </LoadingButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <CartSummary />
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
                <Button component={Link} to="/checkout" variant="contained" color="primary">Checkout</Button>
            </Box>
        </>
    );
}
