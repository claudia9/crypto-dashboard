export interface ICurrency {
    id: string;
    name: string,
    symbol: string,
    priceUsd: string|number|any
};

export interface IPrice {
    id: string;
    currentPrice: string,
    previousPrice: string
};

