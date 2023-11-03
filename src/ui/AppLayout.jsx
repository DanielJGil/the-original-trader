import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { HiOutlineCog6Tooth, HiOutlineHome } from "react-icons/hi2";
import { BsGraphUpArrow } from "react-icons/bs";

import { Outlet, NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import Logout from "../features/authentication/Logout";

const RouterLink = styled(NavLink)(({ theme }) => ({
  color: "black",

  "&.active": {
    color: "#4338ca",
  },
}));

const drawerWidth = 260;

function AppLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        <ListItem key={"Home"}>
          <ListItemButton
            className="flex gap-3 items-center justify-center"
            sx={{
              borderRadius: "10px",
              padding: "1rem",
              display: "flex",
            }}
            component={RouterLink}
            to="/dashboard"
          >
            <HiOutlineHome size={25} style={{ marginLeft: "1rem" }} />
            <span className=" font-semibold">Dashboard</span>
          </ListItemButton>
        </ListItem>

        <ListItem key={"Trades"}>
          <ListItemButton
            className="flex gap-3 items-center justify-center"
            sx={{ borderRadius: "10px", padding: "1rem" }}
            component={RouterLink}
            to="/trades"
          >
            <BsGraphUpArrow size={21} style={{ marginLeft: "1rem" }} />
            <span className=" font-semibold">Trades</span>
          </ListItemButton>
        </ListItem>

        <ListItem key={"Settings"}>
          <ListItemButton
            className="flex gap-3 items-center justify-center"
            sx={{ borderRadius: "10px", padding: "1rem" }}
            component={RouterLink}
            to="/settings"
          >
            <HiOutlineCog6Tooth size={25} style={{ marginLeft: "1rem" }} />
            <span className=" font-semibold">Settings</span>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        className="border-b-[1px]"
        elevation={0}
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#fff",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "flex-end" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 4,
              display: { sm: "block", md: "none" },
              color: "#000",
              paddingRight: { sm: 1.6 },
              paddingLeft: { sm: 1.6 },
              paddingTop: { sm: 0.8 },
              paddingBottom: { sm: 1 },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Logout />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <div className="max-w-[70rem] m-[0_auto]">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}

export default AppLayout;
