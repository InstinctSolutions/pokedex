import React from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";

const Loading: React.FC = () => {
  return (
    <Backdrop open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
