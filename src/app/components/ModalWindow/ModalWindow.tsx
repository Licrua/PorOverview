"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./ModalWindow.module.scss";
import {
    changeFormHidden,
    selectCurrencies,
    selectIsFormHidden,
} from "@/lib/features/portfolio/portfolioSlise";
import Form from "../Form/Form";

export default function ModalWindow() {
    const isFormHidden = useAppSelector(selectIsFormHidden);
    const dispatch = useAppDispatch();
    return (
        <div
            className={
                !isFormHidden
                    ? `${styles["modal-window"]} ${styles["modal-window_hide"]}`
                    : `${styles["modal-window"]}`
            }
        >
            <div
                className={styles["modal-window__overlay"]}
                onClick={() => dispatch(changeFormHidden(false))}
            ></div>
            {isFormHidden && <Form className={styles["modal-window__form"]} />}
        </div>
    );
}
