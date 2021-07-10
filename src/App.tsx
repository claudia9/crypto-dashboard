import React from 'react';
import './App.scss';
import AppRouter from './AppRouter';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { fas, faMapMarkedAlt, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(fab, fas, faMapMarkedAlt, faMobileAlt, faEnvelope, faFacebookF, faGithub, faLinkedin);

function App() {
  return (
    <AppRouter />
  );
}

export default App;
