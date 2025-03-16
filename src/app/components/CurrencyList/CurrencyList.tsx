import { ICurrency } from "@/types";
import styles from "./CurrencyList.module.scss";
import { v4 } from "uuid";

export default function CurrencyList({
    currencies,
    setCurrentCurrency,
}: {
    currencies: ICurrency[];
    setCurrentCurrency: (ICurrency: ICurrency) => void;
}) {
    return (
        <div className={`${styles["currency-list"]}`}>
            {currencies.map((currency) => (
                <div
                    key={v4()}
                    className={styles["currency-list__item"]}
                    onClick={() => setCurrentCurrency(currency)}
                >
                    <div>{currency.symbol.slice(0, -4)}</div>
                    <div>{(+currency.lastPrice).toFixed(5)}$</div>
                    <div
                        className={`${
                            +currency.priceChangePercent < 0
                                ? "negative"
                                : "positive"
                        }`}
                    >
                        {+currency.priceChangePercent}%
                    </div>
                </div>
            ))}
        </div>
    );
}
