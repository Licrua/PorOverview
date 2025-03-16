"use client";

import { ICurrency } from "@/types";
import React, { FormHTMLAttributes, useState } from "react";

import styles from "./Form.module.scss";
import Button from "../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    addAsset,
    changeFormHidden,
    selectCurrencies,
    selectIsFormHidden,
} from "@/lib/features/portfolio/portfolioSlise";
import Input from "../UI/Input/Input";
import CurrencyList from "../CurrencyList/CurrencyList";

interface IForm extends FormHTMLAttributes<HTMLFormElement> {}

export default function Form(attributes: IForm) {
    const dispatch = useAppDispatch();
    const currencies = useAppSelector(selectCurrencies);
    const [search, setSearch] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState<ICurrency | null>(
        null
    );
    const [valueCurrent, setValueCurrent] = useState<number>(1);

    const onSubmit = () => {
        if (currentCurrency) {
            dispatch(
                addAsset({
                    ...currentCurrency,
                    name: currentCurrency.symbol.slice(0, -4),
                    quantity: valueCurrent,
                })
            );
            dispatch(changeFormHidden(false));
        }
    };
    return (
        <div className={`${styles["asset-form"]} ${attributes.className}`}>
            <Input
                type="text"
                placeholder="Поиск валюты"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className={`${styles["currency-list"]}`}>
                <CurrencyList
                    currencies={currencies.filter((cur) =>
                        cur.symbol
                            .slice(0, -4)
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    )}
                    setCurrentCurrency={(currency) =>
                        setCurrentCurrency(currency)
                    }
                />
            </div>
            {currentCurrency && (
                <form className={styles["asset-form__basket"]}>
                    <label>
                        {currentCurrency.symbol.slice(0, -4)}{" "}
                        {(+currentCurrency.lastPrice).toFixed(5)}$
                    </label>

                    <Input
                        type="number"
                        value={valueCurrent}
                        onChange={(e) =>
                            +e.target.value > 0 &&
                            setValueCurrent(+e.target.value)
                        }
                    />
                    <div className={styles["asset-form__buttons"]}>
                        <Button type="button" onClick={onSubmit}>
                            Добавить
                        </Button>
                        <Button
                            type="button"
                            onClick={() => dispatch(changeFormHidden(false))}
                        >
                            Отмена
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
