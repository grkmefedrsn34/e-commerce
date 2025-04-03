import { Grid } from "@mui/material";
import { IProduct } from "../../Model/IProduct";
import Product from "./Product";

interface Props {
  products: IProduct[];
  addProduct: () => void;
}

function ProductList(props: Props) {
  return (
    <Grid container spacing={2}>
      {props.products.map((p: IProduct) => (
        <Grid item xs={12} md={4} lg={3} key={p.id} component="div">
          <Product product={p} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;
