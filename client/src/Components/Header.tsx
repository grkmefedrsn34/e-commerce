import { ShoppingCart } from "@mui/icons-material";
import { AppBar,Badge,Box,Button,IconButton,List,Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
const links = [
  {title:"Home",to:"/"},
  {title:"About",to:"/about"},
  {title:"Contact",to:"/contact"},
  {title:"Catolog",to:"/catolog"},
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
            <IconButton size="large" edge="start" color="inherit">
                <Badge badgeContent="2" color="secondary">
                  <ShoppingCart/>
                </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    );
}

export default Header ;
  