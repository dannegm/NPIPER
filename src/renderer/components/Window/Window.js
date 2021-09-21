import React, { createContext, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';

import useKeyPress from '../../hooks/useKeyPress';

import CommandBar from '../CommandBar';

import {
    WindowWrapper,
    TitleBar,
    TitleButtons,
    CloseButton,
    MinimizeButton,
    MaximizeButton,
    TitleMiddleComponents,
    TitleAsideComponents,
    WindowContainer,
} from './Window.styled';

const { ipcRenderer } = window.require('electron');

const WindowContext = createContext();

export const useWindow = () => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error(`Can't use "useWindow" without a WindowProvider!`);
    }
    return context;
};

const Window = ({ children }) => {
    const altPressed = useKeyPress((ev) => ev.altKey);

    const close = useCallback(() => {
        ipcRenderer.send('window@close');
    }, []);

    const minimize = useCallback(() => {
        ipcRenderer.send('window@minimize');
    }, []);

    const maximize = useCallback(() => {
        ipcRenderer.send('window@maximize');
    }, []);

    const fullscreen = useCallback(() => {
        ipcRenderer.send('window@fullScreen');
    }, []);

    const handleMaximizeClick = () => {
        if (altPressed) {
            fullscreen();
        } else {
            maximize();
        }
    };

    return (
        <WindowContext.Provider value={{ close, minimize, maximize, fullscreen }}>
            <WindowWrapper>
                <TitleBar>
                    <TitleButtons>
                        <CloseButton onClick={close} />
                        <MinimizeButton onClick={minimize} />
                        <MaximizeButton onClick={handleMaximizeClick} />
                    </TitleButtons>
                    <TitleMiddleComponents>
                        <CommandBar />
                    </TitleMiddleComponents>
                    <TitleAsideComponents>{/* Aside Componentes Here... */}</TitleAsideComponents>
                </TitleBar>
                <WindowContainer>{children}</WindowContainer>
            </WindowWrapper>
        </WindowContext.Provider>
    );
};

Window.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Window;
