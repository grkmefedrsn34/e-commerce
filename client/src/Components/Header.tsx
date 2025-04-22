import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, Button, IconButton, List, Stack, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router"; // düzeltildi
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { logout } from "../Pages/account/accountSlice";

const links = [
  { title: "Home", to: "/" },
  { title: "About", to: "/about" },
  { title: "Contact", to: "/contact" },
  { title: "Catalog", to: "/catalog" }, // yazım hatası düzeltildi
];

const authLinks = [
  { title: "Login", to: "/login" },
  { title: "Register", to: "/register" },
];

const styles = {
  color: "inherit",
  textDecoration: "none", // camelCase düzeltildi
  "&:hover": {
    color: "#fff",
  },
  "&.active": {
    color: "warning.main",
  },
};

function Header() {
  const { cart } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.account); // account slice mevcut olmalı
  const dispatch = useAppDispatch();

  const count = cart?.CartItems.reduce((total, item) => total + item.Quantity, 0) || 0;

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">E-Commerce</Typography>
          <List sx={{ display: "flex" }}>
            {links.map((link) => (
              <Button key={link.to} component={NavLink} to={link.to} sx={styles}>
                {link.title}
              </Button>
            ))}
          </List>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton size="large" edge="start" color="inherit" component={Link} to="/cart">
            <Badge badgeContent={count} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {user ? (
            <Stack direction="row" spacing={1}>
              <Button sx={styles}>{user.name}</Button>
              <Button sx={styles} onClick={() => dispatch(logout())}>
                LogOut
              </Button>
            </Stack>
          ) : (
            <Stack direction="row" spacing={1}>
              {authLinks.map((link) => (
                <Button key={link.to} component={NavLink} to={link.to} sx={styles}>
                  {link.title}
                </Button>
              ))}
            </Stack>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
