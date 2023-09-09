import { useEffect, useState } from "react";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Box, Container } from "@mui/material";
import { Widgets } from "@mui/icons-material";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  title: {
    cursor: "pointer",
  },
}));

export default function Header() {
  const classes = useStyles();
  const { user, logout } = useAuth();
  return (
    <AppBar position="static" variant="outlined">
      <Container maxWidth="lg" component="main">
        <Toolbar>
          <Link href="/" passHref>
            <Typography
              align="left"
              component={"span"}
              variant="h6"
              className={classes.title}
            >
              <FormattedMessage id="app.name" />
            </Typography>
          </Link>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              flexGrow: 1,
            }}
          >
            {user ? <UserMenu user={user} logout={logout} /> : <GuestMenu />}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

function GuestMenu() {
  return (
    <Link href="/event/create" passHref>
      <Button id="menu__btn" color="inherit" variant="outlined">
        <FormattedMessage id={"header.add"} />
      </Button>
    </Link>
  );
}

function UserMenu(user: any) {
  const { logout } = useAuth({
    redirectTo: "/auth/login",
    redirectIfFound: false,
  });
  const router = useRouter();
  const [menu, setMenu] = useState(null);
  const [currentUser, setCurrentUser] = useState(user.user);
  const handleMenu = (event: any) => setMenu(event.currentTarget);
  const handleClose = () => setMenu(null);

  useEffect(() => {
    const currentUser = user.user;
    setCurrentUser(currentUser);
  }, [user]);

  const handleLogout = async () => {
    setMenu(null);
    await logout();
    router.reload();
  };

  return (
    <div className="left">
      <button
        style={{
          border: "none",
          background: "none",
        }}
        id="menu_btn"
        onClick={handleMenu}
      >
        <Widgets />
      </button>
      <Menu
        id="menu-appbar"
        anchorEl={menu}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        keepMounted
        open={Boolean(menu)}
        onClose={handleClose}
      >
        <Link href="/user/profile" passHref>
          <MenuItem>{currentUser?.name}</MenuItem>
        </Link>
        {/*     <Link href="/user/dashboard" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id="header.dashboard" />
          </MenuItem>
        </Link>

           */}

        <Link href="/user/dashboard/tickets" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id="header.reservations" />
          </MenuItem>
        </Link>
        <Link href="/user/dashboard/events" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id="header.events" />
          </MenuItem>
        </Link>
        <Link href="/event/create" passHref>
          <MenuItem style={{ color: "black" }}>
            <FormattedMessage id={"header.add"} />
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>
          <FormattedMessage id="header.logout" />
        </MenuItem>
      </Menu>
    </div>
  );
}
