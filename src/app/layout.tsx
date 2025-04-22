import "../styles/globals.css";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { Persistor } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";


export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor as Persistor}>
                        <SessionProvider>{children}</SessionProvider>
                    </PersistGate>
                </Provider>
            </body>
        </html>
    );
}
