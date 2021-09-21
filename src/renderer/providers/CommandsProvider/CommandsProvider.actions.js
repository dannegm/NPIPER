/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react';
import types from './CommandsProvider.types';

export const useActions = ({ state, distapch, globalCommands }) => {
    return {
        execute: useCallback(
            (id, ...args) =>
                distapch({
                    type: types.EXECUTE_COMMAND,
                    payload: {
                        id,
                        args,
                    },
                }),
            [state]
        ),
        setCommandList: useCallback(
            (commandList) =>
                distapch({
                    type: types.SET_COMMAND_LIST,
                    payload: {
                        commandList,
                    },
                }),
            [state]
        ),
        clearCommandList: useCallback(
            () =>
                distapch({
                    type: types.CLEAR_COMMAND_LIST,
                    payload: {
                        globalCommands,
                    },
                }),
            [state]
        ),
    };
};
