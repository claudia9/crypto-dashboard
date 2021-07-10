import * as React from 'react';

type CardProps = {
    children?:  JSX.Element|JSX.Element[]
}

export const Card = ({children} : CardProps) => {
    return (
        <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-blue">
                    <div className="inner">
                        <h3> 13436 </h3>
                        <p> Student Strength </p>
                    </div>
                    <div className="icon">
                        <i className="fa fa-graduation-cap" aria-hidden="true"></i>
                    </div>
                    <a href="/" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
    )
}

export default Card;