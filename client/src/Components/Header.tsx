import { ShoppingCart } from "@mui/icons-material";
import { AppBar,Badge,Box,Button,IconButton,List,Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router";
import { useAppSelector } from "../hooks/hook";
const links = [
  {title:"Home",to:"/"},
  {title:"About",to:"/about"},
  {title:"Contact",to:"/contact"},
  {title:"Catolog",to:"/catolog"},
]

const authLinks =[
  {title:"Login",to:"/login"},
  {title:"Register",to:"/register"},
]

const styles = {
  color:"inherit",
  TextDecoration:"none",
  "&:hover":{
    color:"#fff",
  },
  "&.active":{
    color:"warning.main"
  }
}

function Header(){
  const {cart} = useAppSelector(state => state.cart) ;
  const count = cart?.CartItems.reduce((total,item)=>total+item.Quantity,0)
    return(
      <AppBar position="static" sx={{mb:4}}>
        <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
          <Box sx={{display:"flex",alignItems:"center"}}>
            <Typography variant="h6">E-Commerce</Typography>
            <List sx={{display:"Flex"}}>
              {links.map(link => <Button  key={link.to} component={NavLink} to={link.to} sx={styles}>{link.title}</Button>)}
            </List>
          </Box>
          <Box sx={{display:"flex",alignItems:"center"}}>
            <IconButton size="large" edge="start" color="inherit" component={Link} to="/cart">
                <Badge badgeContent={count} color="secondary">
                  <ShoppingCart/>
                </Badge>
            </IconButton>
            <List sx={{display:"Flex"}}>
              {authLinks.map(link => <Button  key={link.to} component={NavLink} to={link.to} sx={styles}>{link.title}</Button>)}
            </List>
          </Box>
        </Toolbar>
      </AppBar>
    );
}

export default Header ;
  