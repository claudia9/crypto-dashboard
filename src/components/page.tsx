import * as React from 'react';
import { Footer } from './footer';
import { Header } from './header';

type Props = {
    children:  JSX.Element|JSX.Element[]
}

export const Page = ({children} : Props) => {

    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
                <div className="flex-fill container">
                    {children}
                </div>
            <Footer/>
        </div>
    );
}
