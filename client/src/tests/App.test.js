import React from 'react';
import ReactDOM from 'react-dom';
import App from './../Components/App';

test('renders without error', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
})