import * as React from 'react';
import { Page } from '../components/page';
import { Card } from '../components/card';

export const Dashboard = () => {

    return (
        <Page>
            <h1>Dashboard</h1>
            <p className="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Duis mollis, est non commodo luctus.</p>
            <div className="container">
        <div className="row">
            <Card />

            <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-green">
                    <div className="inner">
                        <h3> ₹185358 </h3>
                        <p> Today’s Collection </p>
                    </div>
                    <div className="icon">
                        <i className="fa fa-money" aria-hidden="true"></i>
                    </div>
                    <a href="/" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-orange">
                    <div className="inner">
                        <h3> 5464 </h3>
                        <p> New Admissions </p>
                    </div>
                    <div className="icon">
                        <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </div>
                    <a href="/" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
            <div className="col-lg-3 col-sm-6">
                <div className="card-box bg-red">
                    <div className="inner">
                        <h3> 723 </h3>
                        <p> Faculty Strength </p>
                    </div>
                    <div className="icon">
                        <i className="fa fa-users"></i>
                    </div>
                    <a href="/" className="card-box-footer">View More <i className="fa fa-arrow-circle-right"></i></a>
                </div>
            </div>
        </div>
    </div>
        </Page>
    );
}
