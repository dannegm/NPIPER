import React from 'react';
import PropTypes from 'prop-types';

import RouteHandler from './state/route/RouteHandler';
import GlobalStyle from './styles/GlobalStyle';
import CommandsProvider from './providers/CommandsProvider';

import Window from './components/Window';

const Providers = ({ children }) => {
    return (
        <>
            <GlobalStyle />
            <CommandsProvider>
                {/* breakline */}
                {children}
            </CommandsProvider>
        </>
    );
};
Providers.propTypes = {
    children: PropTypes.node.isRequired,
};

const App = () => {
    return (
        <Providers>
            <Window>
                <RouteHandler />
            </Window>
        </Providers>
    );
};
export default App;
