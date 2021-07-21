import { useEffect, useRef, useState } from 'react';
import { Page } from '../components/page';
import { Card } from '../components/card';
import { Dropdown } from '../components/dropdown';
import { ICurrency } from '../models/currency.interface';


export const Dashboard = () => {
    const [allCurrencies, setAllCurrencies] = useState<ICurrency[]>([]);   // All the currencies
    const [filteredCurrencies, setFilteredCurrencies] = useState<ICurrency[]>([]);   //Filtered currencies
    const [selectedCurrencies, setSelectedCurrencies] = useState([]);   //Name of the selected currencies to filter

    useEffect(() => {
        const url = `https://api.coincap.io/v2/assets`;

        const apiCall = async () => {
            let all: ICurrency[] = [];
            await fetch(url)
                .then((res) => res.json())
                .then((data) => all = (data.data.map((c: ICurrency) => ({ id: c.id, name: c.name, priceUsd: c.priceUsd }))));

            //Sort currency pairs alphabetically
            let sorted = all.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                }
                if (a.id > b.id) {
                    return 1
                }
                return 0;
            });

            setAllCurrencies(sorted);
        };
        //Cal asyncs function
        apiCall();

    }, []);

    function onDelete(id: string) {
        setSelectedCurrencies(prevSelectedCurrencies => prevSelectedCurrencies.filter(i => i !== id));
        setFilteredCurrencies(prevFilteredCurrencies => prevFilteredCurrencies.filter(i => i.id !== id));
    }

    function onAdd(id: string) {
        if (selectedCurrencies.includes(id)) { return; }    // Ignore if it already exists
        selectedCurrencies.push(id);
        setSelectedCurrencies(selectedCurrencies);
        setFilteredCurrencies(allCurrencies.filter(c => selectedCurrencies.includes(c.id)));
    }


    const CardItem: any = ({ id, name, priceUsd }: { id: string, name: string, priceUsd: string }) => {

        const [price, setPrice] = useState(priceUsd);
        const prevPrice = usePrevious(price);

        let ws = useRef(null);

        useEffect(() => {
            ws.current = new WebSocket(`wss://ws.coincap.io/prices?assets=` + id);
            ws.current.onmessage = function (msg: any) {
                let data = JSON.parse(msg.data);

                if (data[id] && data[id] !== prevPrice) {
                    setPrice(data[id]);
                }
            }

            // Close this websocket before next effect runs
            return () => {
                ws.current.close();
            }
        }, [id, prevPrice]);

        const currentPriceInFloat = parseFloat(price);
        const previousPriceInFloat = parseFloat(prevPrice);

        return (
            <Card key={id} id={id} name={name} currentPrice={currentPriceInFloat} previousPrice={previousPriceInFloat} onDelete={() => onDelete(id)} />
        )
    }

    // Returns previous value of state
    function usePrevious(value: any) {
        const ref = useRef();   // Stores current value in ref

        useEffect(() => {
            ref.current = value;
        }, [value]); // Only re-run if value changes

        return ref.current;
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