import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "./AssetsList.module.scss";
import {
    removeAsset,
    selectAssets,
    selectTotalAmount,
} from "@/lib/features/portfolio/portfolioSlise";

export default function AssetsList() {
    const dispatch = useAppDispatch();
    const assets = useAppSelector(selectAssets);
    const totalAmount = useAppSelector(selectTotalAmount);
    return (
        <div className={styles["assets-list"]}>
            <div className={styles["assets-list__item"]}>
                <p>Актив</p>
                <p>Количество</p>
                <p>Цена</p>
                <p>Общая стоимость</p>
                <p>Изм. за 24 ч.</p>
                <p>% портфеля</p>
            </div>
            {assets.map((asset) => (
                <div
                    key={asset.id}
                    className={styles["assets-list__item"]}
                    onClick={() => dispatch(removeAsset(asset.id))}
                >
                    <p>{asset.name}</p>
                    <p>{asset.quantity}</p>
                    <p>{(+asset.lastPrice).toFixed(5)}$</p>
                    <p>{+asset.lastPrice * asset.quantity}$</p>
                    <p
                        className={
                            +asset.priceChangePercent < 0
                                ? "negative"
                                : "positive"
                        }
                    >
                        {asset.priceChangePercent}%
                    </p>
                    <p>
                        {(
                            ((+asset.lastPrice * asset.quantity) /
                                totalAmount) *
                            100
                        ).toFixed(3)}
                        %
                    </p>
                </div>
            ))}
        </div>
    );
}
