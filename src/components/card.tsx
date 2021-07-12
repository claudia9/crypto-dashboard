import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';


type CardProps = {
    id: string,
    name:  string,
    price: number,
    onDelete: (id: string) => void
}

export const Card = ({id, name, price, onDelete} : CardProps) => {
    const [localPrice, setLocalPrice] = useState<number>(0);

    useEffect(() => {
        if (price === localPrice) { // Do nothing
        } else {
            setLocalPrice(price);
        }
      }, [price, localPrice]);

    return (
        <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-orange">
                    <div className="inner">
                        <h3>{name}</h3>
                        <p>{localPrice} USD</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon icon={faBitcoin} />
                    </div>
                    <button className="card-box-footer" onClick={() => onDelete(id)}>Delete <FontAwesomeIcon icon={"trash-alt"}/></button>
                </div>
            </div>
    )
}

export default Card;