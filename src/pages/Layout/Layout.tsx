import { PropsWithChildren, Fragment } from "react";
import { styled } from "@mui/material";
import Header from "./Header";

const Main = styled("main")(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.mode === "dark" ? "#333" : "#fff",
  minHeight: "calc(100vh - 64px)",
  width: "100vw",
}));

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Fragment>
      <Header />
      <Main>{children}</Main>
    </Fragment>
  );
};

export default Layout;
