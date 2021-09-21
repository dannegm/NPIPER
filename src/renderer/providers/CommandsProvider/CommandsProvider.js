import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';

import { CommandShape } from './CommandsProvider.models';
import { buildInitialState } from './CommandsProvider.state';

import { commandsReducer } from './CommandsProvider.reducer';
import { useActions } from './CommandsProvider.actions';

export const CommandsContext = createContext();

const CommandsProvider = ({ globalCommands, children }) => {
    const [state, distapch] = useReducer(commandsReducer, buildInitialState(globalCommands));
    const actions = useActions({ state, distapch, globalCommands });

    return (
        <CommandsContext.Provider
            value={{
                ...actions,
                commandList: state.commandList,
            }}
        >
            {children}
        </CommandsContext.Provider>
    );
};

CommandsProvider.propTypes = {
    children: PropTypes.node.isRequired,
    globalCommands: PropTypes.arrayOf(CommandShape),
};

CommandsProvider.defaultProps = {
    globalCommands: [],
};

export default CommandsProvider;
