import { createAppSlice } from "@/lib/createAppSlice";
import { ICurrency } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { access } from "fs";
import { v4 } from "uuid";

export interface PortfolioSliceState {
    assets: ICurrency[];
    totalAmount: number;
    allCurrencies: ICurrency[];
    isFormHidden: boolean;
}

const initialState: PortfolioSliceState = {
    assets: [],
    totalAmount: 0,
    allCurrencies: [],
    isFormHidden: false,
};

export const portfolioSlice = createAppSlice({
    name: "assets",
    initialState,
    reducers: (create) => ({
        updateAssetPrice: create.reducer(
            (state, action: PayloadAction<any>) => {
                state.assets = state.assets.map((asset) =>
                    asset.symbol === action.payload.s
                        ? {
                              ...asset,
                              lastPrice: action.payload.c,
                              priceChangePercent: action.payload.P,
                          }
                        : asset
                );
                state.totalAmount = state.assets.reduce(
                    (acc, val) => acc + +val.lastPrice * val.quantity,
                    0
                );
                localStorage.setItem("assets", JSON.stringify(state.assets));
            }
        ),
        removeAsset: create.reducer((state, action: PayloadAction<string>) => {
            state.assets = state.assets.filter(
                (asset) => asset.id !== action.payload
            );
            state.totalAmount = state.assets.reduce(
                (acc, val) => acc + +val.lastPrice * val.quantity,
                0
            );
            localStorage.setItem("assets", JSON.stringify(state.assets));
        }),
        setAsset: create.reducer(
            (state, action: PayloadAction<ICurrency[]>) => {
                state.assets = state.assets.concat(action.payload);
                state.totalAmount = state.assets.reduce(
                    (acc, val) => acc + +val.lastPrice * val.quantity,
                    0
                );
            }
        ),
        addAsset: create.reducer((state, action: PayloadAction<ICurrency>) => {
            const isAsset = state.assets.filter(
                (asset) => asset.symbol === action.payload.symbol
            );
            if (isAsset.length) {
                state.assets = state.assets.map((asset) =>
                    asset.symbol === action.payload.symbol
                        ? {
                              ...action.payload,
                              quantity:
                                  asset.quantity + action.payload.quantity,
                          }
                        : asset
                );
            } else state.assets.push(action.payload);
            localStorage.setItem("assets", JSON.stringify(state.assets));
            state.totalAmount = state.assets.reduce(
                (acc, val) => acc + +val.lastPrice * val.quantity,
                0
            );
        }),
        changeFormHidden: create.reducer(
            (state, action: PayloadAction<boolean>) => {
                state.isFormHidden = action.payload;
            }
        ),
        getCurrencies: create.asyncThunk(
            async () => {
                const response = await fetch(
                    "https://api.binance.com/api/v3/ticker/24hr"
                );
                return await response.json();
            },
            {
                fulfilled: (state, action) => {
                    state.allCurrencies = action.payload
                        .map((currency: any) => ({ ...currency, id: v4() }))
                        .filter((currency: any) =>
                            currency.symbol.includes("USDT")
                        );
                },
            }
        ),
    }),
    selectors: {
        selectCurrencies: (state) => state.allCurrencies,
        selectIsFormHidden: (state) => state.isFormHidden,
        selectAssets: (state) => state.assets,
        selectTotalAmount: (state) => state.totalAmount,
    },
});

export const {
    getCurrencies,
    changeFormHidden,
    addAsset,
    setAsset,
    removeAsset,
    updateAssetPrice,
} = portfolioSlice.actions;

export const {
    selectCurrencies,
    selectIsFormHidden,
    selectAssets,
    selectTotalAmount,
} = portfolioSlice.selectors;
