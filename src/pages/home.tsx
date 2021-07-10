import * as React from 'react';
import { Page } from '../components/page';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

export const Home = () => {

    return (
        <Page>
            <section className="welcome-section">
                <div className="container px-4 px-lg5">
                    <div className="p-5 mb-4 bg-light rounded-3">
                        <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold">Welcome to the crypto dashboard</h1>
                        <p className="col-md-8 fs-4">The next page will show you the values in real time of the cryptocurrencies that you choose.</p>
                        <Link to="/dashboard" className="btn btn-primary btn-lg welcome-btn">Navigate to the dashboard</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="contact-section">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-5 gx-lg-5">
                        <ContactCard name="Address" info="Ceresbyen 65, 6. 3. 8000. Aarhus, Denmark " icon="map-marked-alt" />
                        <ContactCard name="Email" info={<a href="mailto:cnc@claudianou.com">cnc@claudianou.com</a>} icon="envelope" />
                        <ContactCard name="Phone" info="+45 52608781" icon="mobile-alt" />
                    </div>

                    <div className="social d-flex justify-content-center">
                        <ContactIcon icon={faGithub} link="https://github.com/claudia9" />
                        <ContactIcon icon={faFacebook} link="https://www.facebook.com/claudianou/" />
                        <ContactIcon icon={faLinkedin} link="https://www.linkedin.com/in/claudianou/" />

                    </div>
                </div>
            </section>
        </Page>
    );
}

type ContactCardProps = {
    name: string,
    info: string | JSX.Element,
    icon: IconProp
}

const ContactCard = ({ name, info, icon }: ContactCardProps) => {
    return (
        <div className="col-md-4 mb-3 mb-md-0">
            <div className="card py-4 h-80">
                <div className="card-body text-center">
                    <FontAwesomeIcon icon={icon} className="orange" />
                    <h5 className="text-uppercase m-0">{name}</h5>
                    <hr className="my-4 mx-auto" />
                    <div className="small text-black-50">{info}</div>
                </div>
            </div>
        </div>
    )
}

type ContactIconProps = {
    icon: IconProp,
    link: string
}

const ContactIcon = ({ icon, link }: ContactIconProps) => {
    return (
        <a className="mx-4" href={link}><FontAwesomeIcon icon={icon} className="fa-2x" /></a>
    )
}
