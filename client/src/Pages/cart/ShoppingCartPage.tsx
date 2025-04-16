import { useEffect, useState } from "react";
import request from "../../api/Request";
import {
  Alert,
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
import { useDispatch } from "react-redux";

export default function ShoppingCartPage() {
  const [localCart, setLocalCart] = useState<Cart | null>(null);
  const dispatch = useDispatch();
  const [status,SetStatus] = useState({loading:false , id:""});

  function handleAddItem(ProductID: number, id:string) {
    SetStatus({loading:true,id:id});
    request.Cart.addItem(ProductID)
      .then((updatedCart) => setLocalCart(updatedCart))
      .catch((error) => console.error(error))
      .finally(() => SetStatus({loading:true,id:id}));
  }

  function handleDeleteItem(ProductID: number, id:string ,Quantity = 1) {
    SetStatus({loading:true,id:id});
    request.Cart.deleteItem(ProductID, Quantity)
      .then((updatedCart) => setLocalCart(updatedCart))
      .catch((error) => console.error(error))
      .finally(() => SetStatus({loading:true,id:id}));
  }

  useEffect(() => {
    request.Cart.get()
      .then((cart) => setLocalCart(cart))
      .catch((error) => console.error(error));
  }, []);

  if (!localCart || localCart.CartItems.length === 0) return <Alert severity="warning">Sepetinizde Ürün Yok</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="shopping cart table">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {localCart?.CartItems.map((item) => (
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
              <TableCell align="right">{currencyTRY.format(item.price)} </TableCell>
              <TableCell align="right">
                <LoadingButton loading={status.loading && status.id ==="add"+item.ProductID} onClick={() => handleAddItem(item.ProductID,"add"+item.ProductID)}>
                  <AddCircleOutline />
                </LoadingButton>
                {item.Quantity}
                <LoadingButton loading={status.loading && status.id ==="del"+item.ProductID} onClick={() => handleDeleteItem(item.ProductID,"del"+item.ProductID)}>
                  <RemoveCircleOutline />
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{item.price * item.Quantity}</TableCell>
              <TableCell align="right">
                <LoadingButton
                  color="error"
                  onClick={() => handleDeleteItem(item.ProductID, "del_all"+item.ProductID,item.Quantity)}
                  loading={status.loading && status.id ==="del_all"+item.ProductID}
                >
                  <Delete />
                </LoadingButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
