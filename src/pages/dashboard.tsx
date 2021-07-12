import React, { useEffect, useState } from 'react';
import { Page } from '../components/page';
import { Card } from '../components/card';
import { Dropdown } from '../components/dropdown';
import { ICurrency } from '../models/currency.interface';
import axios from 'axios';



export const Dashboard = () => {
    const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
    const [currencyList, setCurrencyList] = useState<ICurrency[]>([]);
    const [chosenCurrencies, setChoseCurrencies] = useState<string[]>(['bitcoin', 'ethereum', 'solana', 'cardano', 'xrp']);

    const [updated, setUpdated] = useState<boolean>(false);


    // Posibility to use WebSocket instead of Axios
    /*useEffect(() => {
        const pricesWs = new WebSocket(('wss://ws.coincap.io/prices?assets=' + chosenCurrencies.toString()));
        
        const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
            pricesWs.onmessage = function (msg) {
                console.log("Updating....");
                processWebSocketData(msg.data);
            }
        }, 10000); return () => clearInterval(intervalId);
    });

    async function processWebSocketData(msg: string) {
        var currencies = msg.split(',');
        if (currencies.length > 1) return; //Ignore traces with more than one.

        var updatedList = currencyList;
        currencies.map((c) => {
            const id = c.split(':')[0].replace(/[^a-zA-Z ]/g, "");
            const value = c.split(':')[1].replace(/[^\d+(.\d)]/g, "");
            return updatedList = updatedList.map(item => {
                if (item.id === id) { item.priceUsd = value }
                return item;
            });
        });
        setCurrencyList(updatedList);
    };*/

    useEffect(() => {
        //const intervalId = setInterval(() => {  //assign interval to a variable to clear it.
        //console.log("Updating...");
        setUpdated(false);
        async function retrieveCurrenciesAxios() {
            axios({
                method: "GET",
                url: "https://api.coincap.io/v2/assets",
                responseType: "json"
            })
                .then(response => response.data?.data)
                .then((data: ICurrency[]) => {
                    const list: ICurrency[] = data.map(d => ({
                        id: d.id,
                        name: d.name,
                        priceUsd: parseFloat(d.priceUsd).toFixed(2)
                    }));
                    setAllCurrencies(list.map(d => (d.id)));
                    setCurrencyList(list.filter(c => chosenCurrencies.includes(c.id)));
                    setUpdated(false);
                })
                .catch((error) => {
                    console.log(error);
                    setUpdated(false);
                })
        };
        retrieveCurrenciesAxios();
        //}, 5000)
        //return () => clearInterval(intervalId);
    }, [updated, chosenCurrencies, currencyList]);


    function onDelete(id: string) {
        //console.log("Delete " + id);
        setChoseCurrencies(chosenCurrencies.filter(i => i !== id));
        setUpdated(true);
    }

    function onAdd(id: string) {
        //console.log("Add " + id);
        if (chosenCurrencies.includes(id)) { return; }    // Ignore if it already exists
        chosenCurrencies.push(id);
        setChoseCurrencies(chosenCurrencies);
        setUpdated(true);
    }

    return (
        <Page>
            <section className="dashboard-section">
                <h1>Dashboard</h1>
                <p className="lead">Check the prices of different cryptocurrencies in real-time. The cards are being updated every continuously. Click to the button below to add more cards to your dashboard. You also have the possibility to hide the cards that you no longer use. Enjoy! :-)</p>
                <div className="container">
                    <Dropdown items={allCurrencies.filter(d => !chosenCurrencies.includes(d))} onAdd={(id) => onAdd(id)} />
                    <div className="row">
                        {chosenCurrencies.map((c) => {
                            const currency = currencyList.find(o => o.id === c);
                            return (currency ? <Card key={currency.id} id={currency.id} name={currency.name} price={currency.priceUsd} onDelete={() => onDelete(currency.id)} /> : null)
                        })
                        }
                    </div>
                </div>
            </section>
        </Page>
    );
}
