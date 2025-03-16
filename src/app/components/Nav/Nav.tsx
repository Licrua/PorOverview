"use client";

import React from "react";
import Button from "../UI/Button/Button";
import styles from "./Nav.module.scss";
import { useAppDispatch } from "@/lib/hooks";
import { changeFormHidden } from "@/lib/features/portfolio/portfolioSlise";

export default function Nav() {
    const dispatch = useAppDispatch();

    return (
        <nav className={styles.nav}>
            <h1 className={styles.logo}>Portfolio Overview</h1>
            <Button
                onClick={() => {
                    dispatch(changeFormHidden(true));
                }}
            >
                добавить
            </Button>
        </nav>
    );
}
