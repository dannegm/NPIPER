import types from './CommandsProvider.types';

const executeCommand = (state, { id, args }) => {
    const cmd = state.commandList.find((c) => c.id === id);
    const commandList = state.commandList.filter((c) => c.id !== id);
    cmd?.handler?.(args);
    return {
        commandList: [
            ...commandList,
            {
                ...cmd,
                timesUsed: cmd.timesUsed + 1,
            },
        ],
    };
};

export const commandsReducer = (state, action) => {
    switch (action.type) {
        case types.EXECUTE_COMMAND:
            return {
                ...state,
                ...executeCommand(state, action.payload),
            };
        case types.SET_COMMAND_LIST:
            return {
                ...state,
                commandList: action.payload.commandList,
            };
        case types.CLEAR_COMMAND_LIST:
            return {
                ...state,
                commandList: [...action.payload.globalCommands],
            };
        default:
            return state;
    }
};
