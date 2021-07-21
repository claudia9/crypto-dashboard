import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type CardProps = {
    id: string,
    name:  string,
    currentPrice: number,
    previousPrice: number,
    onDelete: (id: string) => void
}

export const Card = ({id, name, currentPrice, previousPrice, onDelete} : CardProps) => {
    const isIncreasing = currentPrice >= previousPrice;
    return (
        <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-orange">
                    <div className="inner">
                        <h3>{name}</h3>
                        <p>{currentPrice.toFixed(2)} USD</p>
                    </div>
                    <div className="icon">
                        <FontAwesomeIcon icon={isIncreasing ? "arrow-up" : "arrow-down"} />
                    </div>
                    <button className="card-box-footer" onClick={() => onDelete(id)}>Delete <FontAwesomeIcon icon={"trash-alt"}/></button>
                </div>
            </div>
    )
}

export default Card;