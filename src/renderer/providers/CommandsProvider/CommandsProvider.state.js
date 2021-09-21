export const initialState = {
    commandList: [],
};

export const buildInitialState = (globalCommands) => {
    const mappedGlobalCommands = globalCommands.map((cmd) => ({
        ...cmd,
        timesUsed: 0,
    }));

    return {
        ...initialState,
        commandList: [...mappedGlobalCommands],
    };
};
