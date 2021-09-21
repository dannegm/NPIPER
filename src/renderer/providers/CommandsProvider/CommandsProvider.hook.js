import { useContext } from 'react';
import { CommandsContext } from './CommandsProvider';

export const useCommands = () => {
    const context = useContext(CommandsContext);
    if (!context) {
        throw new Error(`Can't use "useCommands" without a CommandsProvider!`);
    }
    return context;
};
