import React, { useEffect, useRef, useState } from 'react';
import { Page } from '../components/page';
import { Card } from '../components/card';
import { Dropdown } from '../components/dropdown';
import { ICurrency } from '../models/currency.interface';


export const Dashboard = () => {
    const [allCurrencies, setAllCurrencies] = useState<ICurrency[]>([]);   // All the currencies
    const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>([]);   //Filtered currencies
    const [selectedCurrencies, setSelectedCurrencies] = useState(["ethereum", "bitcoin"]);   //Name of the selected currencies to filter
    //const [pastData, setPastData] = useState({});

    const [updated, setUpdated] = useState<boolean>(false);

    const ws = useRef(null);    // Here so that it doesn't re-renders on every call.
    let first = useRef(false);  //Prevents API call on our first render.
    const url = `https://api.coincap.io/v2/assets`;
    
    useEffect(() => {
        // Connect to websocket AP
        ws.current = new WebSocket(`wss://ws.coincap.io/prices?assets=` + selectedCurrencies.toString());

        // Inside useEffect we need to make API with async function
        const apiCall = async () => {
            let all: ICurrency[] = [];
            await fetch(url)
                .then((res) => res.json())
                .then((data) => all = (data.data.map((c: ICurrency) => ({ id: c.id, symbol: c.symbol, name: c.name, priceUsd: c.priceUsd }))));
                
            setAllCurrencies(all);

            let filtered = all.filter(c => selectedCurrencies.includes(c.id));

            //Sort filtered currency pairs alphabetically
            filtered = filtered.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1
                }
                return 0;
            });

            setFilteredCurrencies(filtered);

            first.current = true;

        };
        //Cal asyncs function
        apiCall();
    }, [])

    useEffect(() => {
        //Prevent this hook from running on initial render
        if (!first.current) {
            return;
        }
        ws.current.onmessage = (msg: any) => {
            //console.log("on message...");
            let data = JSON.parse(msg.data);

            let newList: ICurrency[] = [];
            //console.log(data);
            Object.keys(data).forEach(key => {
                newList = filteredCurrencies.map((c: ICurrency) => {
                    if (c.id === key) {
                        const updatedC = {
                            ...c,
                            priceUsd: data[key]
                        };
                        return updatedC;
                    }
                    return c;
                })

                setFilteredCurrencies(newList);
            });
        }
    }, [selectedCurrencies, updated]);

    function onDelete(id: string) {
        setUpdated(true);
        setSelectedCurrencies(selectedCurrencies.filter(i => i !== id));
        setUpdated(false);
    }

    function onAdd(id: string) {
        setUpdated(true);
        if (selectedCurrencies.includes(id)) { return; }    // Ignore if it already exists
        selectedCurrencies.push(id);
        setSelectedCurrencies(selectedCurrencies);
        setUpdated(false);
    }


    const CardItem: any = ({ id, name, priceUsd }: { id: string, name: string, priceUsd: string }) => {
        var prices = filteredCurrencies.find(d => d.id === id);

        const currentPriceInFloat = parseFloat(prices.priceUsd).toFixed(2);
        //const PreviousPriceInFloat = parseFloat(prices?.priceUsd)?.toPrecision(4);

        return (
            <Card key={id} id={id} name={name} currentPrice={currentPriceInFloat} previousPrice={currentPriceInFloat} onDelete={() => onDelete(id)} />
        )
    }

    return (
        <Page>
            <section className="dashboard-section">
                <h1>Dashboard</h1>
                <p className="lead">Check the prices of different cryptocurrencies in real-time. The cards are being updated every continuously. Click to the button below to add more cards to your dashboard. You also have the possibility to hide the cards that you no longer use. Enjoy! :-)</p>
                <div className="container">
                    <Dropdown items={(allCurrencies.filter(d => !selectedCurrencies.includes(d.id)))} onAdd={(id) => onAdd(id)} />
                    <div className="row">
                        {filteredCurrencies && filteredCurrencies.map((c: ICurrency) => {
                            return (c ? <CardItem key={c.id} {...c} /> : null)
                        })
                    }
                    </div>
                </div>
            </section>
        </Page>
    );
}
