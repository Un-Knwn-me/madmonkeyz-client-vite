import { Box, CircularProgress } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '60vh', }}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;