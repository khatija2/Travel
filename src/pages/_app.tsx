import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PageLayout from "~/components/Layout";
import { api } from "../utils/api";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";



const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toaster
       containerStyle={{
        top: 140,
        left: 40
      }}
      toastOptions={{
        style: {
          padding: '20px',
          borderRadius: '10px',
          gap: '6px'
        }}}/>
      <PageLayout>
      <Component {...pageProps} />
      </PageLayout>
   
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
