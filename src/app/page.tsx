"use client";

import ModalWindow from "./components/ModalWindow/ModalWindow";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    getCurrencies,
    selectAssets,
    setAsset,
    updateAssetPrice,
} from "@/lib/features/portfolio/portfolioSlise";
import { use, useEffect } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import AssetsList from "./components/AssetsList/AssetsList";

export default function IndexPage() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const assetsLocal = localStorage.getItem("assets");
        if (assetsLocal) dispatch(setAsset(JSON.parse(assetsLocal)));
        dispatch(getCurrencies());
    }, []);
    const assets = useAppSelector(selectAssets);

    const { data } = useWebSocket(
        `wss://stream.binance.com:9443/stream?streams=${assets
            .map((cur) => `${cur.symbol.toLowerCase()}@ticker`)
            .join("/")}`
    );

    useEffect(() => {
        data && dispatch(updateAssetPrice(data));
    }, [data]);
    return (
        <>
            <AssetsList />
            <ModalWindow />
        </>
    );
}
