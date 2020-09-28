import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loading: React.FC = () => {
  return (
    <Backdrop open={true} style={{zIndex: 2000}}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
