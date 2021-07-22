import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../components/card';

type CardWrapperProps = {
    id: string,
    name: string,
    priceUsd: string,
    onDelete: (id: string) => void
}

const CardWrapper: any = ({ id, name, priceUsd, onDelete }: CardWrapperProps) => {

    const [price, setPrice] = useState(priceUsd);
    const prevPrice = usePrevious(price);

    let ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(`wss://ws.coincap.io/prices?assets=` + id);
        ws.current.onmessage = function (msg: any) {
            let data = JSON.parse(msg.data);
            console.log(data);
            setPrice(data[id]);

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

export default CardWrapper;