'use client';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
  type Theme,
  type CSSObject,
  Box,
  Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";

const navItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "/dashboard" },
  { text: "Doctor", icon: <LocalHospitalIcon />, path: "/dashboard/doctor" },
  { text: "Appointments", icon: <EventNoteIcon />, path: "/dashboard/appointments" },
];

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "drawerWidth",
})<{ drawerWidth: number }>(({ theme, open, drawerWidth }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme, drawerWidth),
    "& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
  }),

  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideBarProps {
  open: boolean;
  handleDrawerClose: () => void;
  drawerWidth: number;
}

const SideBar = ({ open, handleDrawerClose, drawerWidth }: SideBarProps) => {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      open={open}
      drawerWidth={drawerWidth}
      sx={{
        "& .MuiDrawer-paper": {
          background: "linear-gradient(180deg, #0D6EFD 0%, #005BFD 100%)",
          color: "white",
          border: "none",
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          py: 3,
          px:2
        }}
      >
       <Link
  href="/"
  style={{
    textDecoration: "none",
    color: "inherit",
    width: "100%",
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      opacity: open ? 1 : 0,
      transition: "0.3s",
      cursor: "pointer",
    }}
  >
    <HealthAndSafetyIcon sx={{ fontSize: 32 }} />
    <Typography
      component="h6"
      variant="h6"
      fontWeight={700}
      fontSize={20}
    >
      VirtuCare
    </Typography>
  </Box>
</Link>

        <IconButton
          onClick={handleDrawerClose}
          sx={{
            position: "absolute",
            right: 8,
            color: "rgba(255,255,255,0.8)",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Box>

      {/* NAV */}
      <List sx={{ px: 1 }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <Link href={item.path} style={{ width: "100%" }}>
                <ListItemButton
                  sx={{
                    borderRadius: "12px",
                    px: 2,
                    py: 1.2,
                    justifyContent: open ? "initial" : "center",
                    backgroundColor: isActive
                      ? "rgba(255,255,255,0.2)"
                      : "transparent",
                    backdropFilter: isActive ? "blur(6px)" : "none",
                    transition: "all 0.25s ease",

                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.15)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.text}
                    sx={{
                      opacity: open ? 1 : 0,
                      "& span": {
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 600 : 400,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default SideBar;