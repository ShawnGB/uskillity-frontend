import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

import Routes from './routes';

ReactDOM.render(<Routes />, document.getElementById('root'));
registerServiceWorker();
