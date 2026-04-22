"use client";

import * as React from "react";
import {
  Box,
  CssBaseline,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SideBar from "@/component/dashboard/Sidebar";
import Topbar from "@/component/dashboard/Topbar";

export const drawerWidth = 250;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Replaces custom useWindowSize

  const [open, setOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex" }} className="bg-gray-50 w-full min-h-screen">
      <CssBaseline />

      <Topbar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        drawerWidth={drawerWidth}
      />

      <SideBar
        open={open}
        handleDrawerClose={handleDrawerClose}
        drawerWidth={drawerWidth}
      />

      <Box
        component="main"
        className="bg-transparent w-full h-full"
        sx={{ flexGrow: 1, px: 3, py: 5, minHeight: "100%" }}
      >
        <DrawerHeader />
        {/* Next.js renders the nested pages inside children, replacing <Outlet /> */}
        {children}
      </Box>
    </Box>
  );
}
