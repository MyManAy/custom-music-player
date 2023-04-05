import { type AppType } from "next/app";
import { SnackbarProvider } from "notistack";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <SnackbarProvider>
      <Component {...pageProps} />;
    </SnackbarProvider>
  );
};

export default MyApp;
