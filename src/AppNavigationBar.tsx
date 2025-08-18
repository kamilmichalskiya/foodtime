import { RestaurantMenu } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Session } from "@supabase/supabase-js";
import { useState } from "react";
import { supabase } from "./supabaseClient";

const PAGES = ["Kalkulator", "Przepisy", "Zakupy", "Konto"];

interface AppNavigationBarProps {
  session: Session;
  tab: number;
  onTabChange: (index: number) => void;
}

export default function AppNavigationBar({
  session,
  tab,
  onTabChange,
}: AppNavigationBarProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  // Logo rendering for both desktop and mobile
  const Logo = ({ variant }: { variant: "desktop" | "mobile" }) => (
    <>
      <RestaurantMenu
        sx={{
          display: {
            xs: variant === "mobile" ? "flex" : "none",
            md: variant === "desktop" ? "flex" : "none",
          },
          mr: 1,
        }}
      />
      <Typography
        variant={variant === "desktop" ? "h6" : "h5"}
        noWrap
        component="a"
        href="#app-bar"
        sx={{
          mr: 2,
          display: {
            xs: variant === "mobile" ? "flex" : "none",
            md: variant === "desktop" ? "flex" : "none",
          },
          flexGrow: variant === "mobile" ? 1 : undefined,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        FOODTIME
      </Typography>
    </>
  );

  // Navigation menu for mobile
  const renderMobileMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={(e) => setAnchorElNav(e.currentTarget)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        open={Boolean(anchorElNav)}
        onClose={() => setAnchorElNav(null)}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {PAGES.map((page, idx) => (
          <MenuItem
            key={page}
            selected={tab === idx}
            onClick={() => {
              onTabChange(idx);
              setAnchorElNav(null);
            }}
          >
            <Typography sx={{ textAlign: "center" }}>{page}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );

  // Navigation menu for desktop
  const renderDesktopMenu = () => (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {PAGES.map((page, idx) => (
        <Button
          key={page}
          onClick={() => onTabChange(idx)}
          sx={{
            my: 2,
            color: tab === idx ? "#FFD700" : "white",
            display: "block",
            fontWeight: tab === idx ? 700 : 400,
            borderBottom: tab === idx ? "2px solid #FFD700" : "none",
          }}
        >
          {page}
        </Button>
      ))}
    </Box>
  );

  // User menu
  const handleLogout = () => {
    setAnchorElUser(null);
    supabase.auth.signOut();
  };
  const settings = [
    { name: "Profil", func: () => setAnchorElUser(null) },
    { name: "Wyloguj", func: handleLogout },
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo variant="desktop" />
          {renderMobileMenu()}
          <Logo variant="mobile" />
          {renderDesktopMenu()}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={(e) => setAnchorElUser(e.currentTarget)}
                sx={{ p: 0 }}
              >
                <Avatar
                  alt={session.user.email}
                  src={session.user.user_metadata?.picture}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              keepMounted
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((element) => (
                <MenuItem key={element.name} onClick={element.func}>
                  <Typography sx={{ textAlign: "center" }}>
                    {element.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
