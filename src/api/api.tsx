import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { ICurrency } from '../models/currency.interface';

const client = new W3CWebSocket('wss://ws.coincap.io/prices?assets=ALL');

const Api = () => {

    //let currencies: Array<ICurrency> = useState<(Array<ICurrency>)>([]);

    useEffect(() => {

        client.onopen = () => {
            console.log('WebSocket Client connected');
        }
        client.onmessage = function(event) {
            let message = JSON.parse(event.data.toString());
            let currencies = message;
            console.log(currencies);
        }
        client.onerror = (error) => {
            console.log(error);
        }
    })

    return (
        <div>
            Pratical intro to websockets
        </div>
    );
}

export default Api;

/*const defaultPosts: IPrice[] = [];

const Data = () => {
    const [posts, setPosts]: [IPrice[], (posts: IPrice[]) => void] = React.useState(defaultPosts);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
    const [error, setError]: [string, (error: string) => void] = React.useState("");

    React.useEffect(() => {
        axios
            .get<IPrice[]>("wss://ws.coincap.io/prices?assets=ALL")
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(ex => {
                const error = ex.response.status === 404 ? "Resource Not found" : "An unexpected error has occurred";
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <ul className="posts">
                {posts.map((post) => (
                    <li key={post.id}>
                        <h3>{post.name}</h3>
                        <p>{post.price}</p>
                    </li>
                ))}
            </ul>
            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default Data;*/