import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Route path="/client/" exact component={Join} />
        <Route path="/client/chatroom" component={Chat} />
    </Router>
);

export default App;