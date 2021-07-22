import React, { useEffect, useState } from 'react';
import { Page } from '../components/page';
import { Dropdown } from '../components/dropdown';
import { ICurrency } from '../models/currency.interface';
import CardWrapper from '../components/cardwrapper';

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
            
            setAllCurrencies(sortAlphabet(all));
        };

        apiCall();
    }, []);

    function sortAlphabet(items: ICurrency[]) {
        //Sort currency pairs alphabetically
        return items.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1
            }
            return 0;
        });
    }

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

    return (
        <Page>
            <section className="dashboard-section">
                <h1>Dashboard</h1>
                <p className="lead">Check the prices of different cryptocurrencies in real-time. The cards are being updated every continuously. Click to the button below to add more cards to your dashboard. You also have the possibility to hide the cards that you no longer use. Enjoy! :-)</p>
                <div className="container">
                <Dropdown items={(allCurrencies.filter(d => !selectedCurrencies.includes(d.id)))} onAdd={(id) => onAdd(id)} />
                    <div className="row">
                        {filteredCurrencies && filteredCurrencies.map((c: ICurrency) => {
                            return (c ? <CardWrapper key={c.id} {...c} onDelete={(id: string) => onDelete(id)} /> : null)
                        })
                        }
                    </div>
                </div>
            </section>
        </Page>
    );
}