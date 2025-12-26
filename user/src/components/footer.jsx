import React from "react";
import { Typography,Box} from "@mui/material";
const colorPrimary = "#735557"
export default function footer(){
    return(
      <Box sx={{ backgroundColor: colorPrimary, color: "#fff", position:"sticky"}}>
        <Typography sx={{ textAlign: "center" }}>
            &copy; {new Date().getFullYear()} Enforcer. All rights reserved.
          </Typography>
            </Box>
    )
}