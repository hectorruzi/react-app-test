import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainDashboard from './components/main-dashboard/MainDashboard'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MainDashboard />, document.getElementById('root'));
registerServiceWorker();
