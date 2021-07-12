import React, { useEffect, useState } from 'react';
import { Page } from '../components/page';
import { Card } from '../components/card';
import { Dropdown } from '../components/dropdown';
import { ICurrency, IPrice } from '../models/currency.interface';

// Initializable variables
let retrievedAll = false;
let pricesWs: WebSocket;

export const Dashboard = () => {
    const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
    const [cryptoAssets, setCryptoAssets] = useState<ICurrency[]>([]);
    const [chosenCurrencies, setChoseCurrencies] = useState<string[]>(['bitcoin', 'ethereum', 'solana', 'cardano', 'xrp']);

    const [cryptoPrices, SetCryptoPrices] = useState<IPrice[]>([]);

    const [updated, setUpdated] = useState<boolean>(false);

    function initializeCurrencies() {
        if (retrievedAll) { return; } // No need to return more than once
        fetch(`https://api.coincap.io/v2/assets`, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(results => results.json())
            .then(results => {
                const all: string[] = results?.data.map((res: any) => (res.id));
                const prices: IPrice[] = results?.data.map((res: any) => ({
                    id: res.id,
                    currentPrice: res.priceUsd,
                    previousPrice: res.priceUsd
                }))
                SetCryptoPrices(prices);
                setAllCurrencies(all);
                retrievedAll = true;
            });
    }

    useEffect(() => {
        const retrieveChosenCurrencies = () => {
            fetch(`https://api.coincap.io/v2/assets?ids=${chosenCurrencies.toString()}`, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(results => results.json())
                .then(results => {
                    const { data } = results;
                    setCryptoAssets(data);
                });
        }

        initializeCurrencies();
        retrieveChosenCurrencies();
        setUpdated(false);

    }, [updated, chosenCurrencies]);

    useEffect(() => {
        const updatePrice = (msg: string) => {
            if (msg) {
                let tmpCryptoPrices: IPrice[] = cryptoPrices;
                const list: string[] = Object.keys(msg);
                list.forEach(curre => {
                    const el = tmpCryptoPrices.find(p => p.id === curre);
                    if (el === undefined) { return; }
                    const tmpPrev: string = el.currentPrice;
                    var tmpCurrent: string = msg[curre];
                    tmpCryptoPrices.find(p => p.id === curre).currentPrice = tmpCurrent;
                    tmpCryptoPrices.find(p => p.id === curre).previousPrice = tmpPrev;
                    SetCryptoPrices(tmpCryptoPrices);
                });
            }
        }
        const connectWs = () => {
            pricesWs = new WebSocket(
                `wss://ws.coincap.io/prices?assets=${chosenCurrencies.toString()}`
            );
            pricesWs.onmessage = msg => {
                setInterval(function () {
                    updatePrice(JSON.parse(msg.data));
                }, 2000);//Update every 2 seconds 
            };
            pricesWs.onerror = err => {
                return () => pricesWs.close();
            };
            pricesWs.onclose = () => connectWs();
        }
        connectWs();
        return () => pricesWs.close();
    }, [chosenCurrencies, cryptoPrices]);

    function onDelete(id: string) {
        setChoseCurrencies(chosenCurrencies.filter(i => i !== id));
        setUpdated(true);
    }

    function onAdd(id: string) {
        if (chosenCurrencies.includes(id)) { return; }    // Ignore if it already exists
        chosenCurrencies.push(id);
        setChoseCurrencies(chosenCurrencies);
        setUpdated(true);
    }


    const CardItem: any = ({ id, name, priceUsd }: { id: string, name: string, priceUsd: string }) => {
        var prices = cryptoPrices.find(d => d.id === id);

        const currentPriceInFloat = parseFloat(prices?.currentPrice).toPrecision(4);
        const PreviousPriceInFloat = parseFloat(prices?.previousPrice)?.toPrecision(4);

        return (
            <Card key={id} id={id} name={name} currentPrice={currentPriceInFloat} previousPrice={PreviousPriceInFloat} onDelete={() => onDelete(id)} />
        )
    }

    return (
        <Page>
            <section className="dashboard-section">
                <h1>Dashboard</h1>
                <p className="lead">Check the prices of different cryptocurrencies in real-time. The cards are being updated every continuously. Click to the button below to add more cards to your dashboard. You also have the possibility to hide the cards that you no longer use. Enjoy! :-)</p>
                <div className="container">
                    <Dropdown items={(allCurrencies.filter(d => !chosenCurrencies.includes(d)))} onAdd={(id) => onAdd(id)} />
                    <div className="row">
                        {cryptoAssets && cryptoAssets.map((c: ICurrency) => {
                            return (c ? <CardItem key={c.id} {...c} /> : null)
                        })
                        }
                    </div>
                </div>
            </section>
        </Page>
    );
}
