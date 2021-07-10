import * as React from 'react';
import { Footer } from './footer';
import { Header } from './header';

type Props = {
    children: JSX.Element
}

export const Page = ({children} : Props) => {

    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
        </div>
    );
}
