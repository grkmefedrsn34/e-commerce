import { useEffect, useState } from "react";
import { Link } from "react-router"; // react-router-dom'dan doğru Link import edildi
import request from "../../api/Request";
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Cart } from "../../Model/ICart";
import { AddCircleOutline, Delete, RemoveCircleOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { currencyTRY } from "../../utils/formatCurrency";

export default function ShoppingCartPage() {
  const [localCart, setLocalCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState({ loading: false, id: "" });

  function handleAddItem(ProductID: number, id: string) {
    setStatus({ loading: true, id: id });
    request.Cart.addItem(ProductID)
      .then((updatedCart) => setLocalCart(updatedCart))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, id: "" })); // loading false yapıldı
  }

  function handleDeleteItem(ProductID: number, id: string, Quantity = 1) {
    setStatus({ loading: true, id: id });
    request.Cart.deleteItem(ProductID, Quantity)
      .then((updatedCart) => setLocalCart(updatedCart))
      .catch((error) => console.error(error))
      .finally(() => setStatus({ loading: false, id: "" })); // loading false yapıldı
  }

  useEffect(() => {
    request.Cart.get()
      .then((cart) => setLocalCart(cart))
      .catch((error) => console.error(error));
  }, []);

  if (!localCart || localCart.CartItems.length === 0)
    return <Alert severity="warning">Sepetinizde Ürün Yok</Alert>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
          <TableHead>
            <TableRow>
              <TableCell>Ürün</TableCell>
              <TableCell>İsim</TableCell>
              <TableCell align="right">Fiyat</TableCell>
              <TableCell align="right">Adet</TableCell>
              <TableCell align="right">Toplam</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {localCart.CartItems.map((item) => (
              <TableRow
                key={item.ProductID.toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <img
                    src={`http://localhost:5286/api/images${item.imageUrl}`}
                    style={{ height: 60 }}
                    alt={item.name}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">{currencyTRY.format(item.price)}</TableCell>
                <TableCell align="right">
                  <LoadingButton
                    loading={status.loading && status.id === "add" + item.ProductID}
                    onClick={() => handleAddItem(item.ProductID, "add" + item.ProductID)}
                    size="small"
                  >
                    <AddCircleOutline />
                  </LoadingButton>
                  {item.Quantity}
                  <LoadingButton
                    loading={status.loading && status.id === "del" + item.ProductID}
                    onClick={() => handleDeleteItem(item.ProductID, "del" + item.ProductID)}
                    size="small"
                  >
                    <RemoveCircleOutline />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">
                  {currencyTRY.format(item.price * item.Quantity)}
                </TableCell>
                <TableCell align="right">
                  <LoadingButton
                    color="error"
                    onClick={() => handleDeleteItem(item.ProductID, "del_all" + item.ProductID, item.Quantity)}
                    loading={status.loading && status.id === "del_all" + item.ProductID}
                    size="small"
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
        >
          Checkout
        </Button>
      </Box>
    </>
  );
}
