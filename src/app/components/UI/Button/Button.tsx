import styles from "./Button.module.scss";
import { ButtonHTMLAttributes } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button(attributes: IButton) {
    return (
        <button className={styles["custom-button"]} {...attributes}>
            {attributes.children}
        </button>
    );
}
