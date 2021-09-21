import React, { useEffect, useState } from 'react';

import { useCommands } from '../../providers/CommandsProvider/CommandsProvider.hook';

import {
    CommandBarWrapper,
    CommandBarContainer,
    CommandBarInput,
    CommandBarShortcuts,
    CommandBarKey,
} from './CommandBar.styled';

// ⌘⇧⌥^

const mockCommandList = [
    {
        name: 'Format document',
        id: 'format',
        handler: () => console.log('Format'),
    },
];

const CommandBar = () => {
    const [focused, setFocused] = useState(false);
    const { commandList, setCommandList } = useCommands();

    useEffect(() => {
        setCommandList(mockCommandList);
    }, []);

    return (
        <CommandBarWrapper>
            <CommandBarContainer focused={focused}>
                <CommandBarInput
                    placeholder='Type a command...'
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                />
                <CommandBarShortcuts>
                    <CommandBarKey title='Command (⌘)'>⌘</CommandBarKey>
                    <CommandBarKey title='Shift (⇧)'>⇧</CommandBarKey>
                    <CommandBarKey title='Letter P'>P</CommandBarKey>
                </CommandBarShortcuts>
            </CommandBarContainer>
        </CommandBarWrapper>
    );
};

export default CommandBar;
