import styles from "./Input.module.scss";
import { InputHTMLAttributes } from "react";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input(attributes: IInput) {
    return (
        <input className={styles["custom-input"]} {...attributes} >
            {attributes.children}
        </input>
    );
}
