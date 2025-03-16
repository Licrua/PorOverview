import { type ReactNode } from "react";
import type { Metadata } from "next";

import { StoreProvider } from "./StoreProvider";

import "./styles/globals.scss";
import styles from "./styles/layout.module.scss";
import { Montserrat, Overpass } from "next/font/google";
import Nav from "./components/Nav/Nav";

const overpass = Overpass({
    variable: "--font-overpass",
    weight: ["400", "800"],
    preload: true,
    subsets: ["cyrillic", "latin"],
});
const montserrat = Montserrat({
    variable: "--font-montserrat",
    weight: ["400", "600"],
    preload: true,
    subsets: ["cyrillic", "latin"],
});

interface Props {
    readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <StoreProvider>
            <html lang="ru">
                <body className={`${overpass.variable} ${montserrat.variable}`}>
                    <section className={styles.container}>
                        <header className={styles.header}>
                            <Nav />
                        </header>
                        <main className={styles.main}>{children}</main>
                    </section>
                </body>
            </html>
        </StoreProvider>
    );
}
export const metadata: Metadata = {
    title: "Portfolio Overview",
};
