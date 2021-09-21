import React from 'react';
import styled from 'styled-components';
import useKeyPress from '../../hooks/useKeyPress';

export const WindowWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: rgb(255 255 255 / 95%);
    backdrop-filter: blur(10px);
    overflow: hidden;
`;

export const TitleBar = styled.div`
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    height: 4rem;
    gap: 1rem;
`;

export const TitleButtons = styled.div`
    flex: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    padding: 0 1.25rem;
    gap: 0.5rem;
`;

export const TittleButton = styled.button`
    -webkit-app-region: no-drag;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    line-height: 0;
    transition: all 0.1s;
    outline: 0;

    &:hover {
        & > svg {
            opacity: 1;
        }
    }
`;

export const CloseButtonWrapper = styled(TittleButton)`
    border: 1px solid #e2463f;
    background-color: #ff5f57;

    &:active {
        border-color: #ad3934;
        background-color: #bf4943;
    }

    & > svg {
        width: 6px;
        height: 6px;
        opacity: 0;
    }
`;

export const MinimizeButtonWrapper = styled(TittleButton)`
    border: 1px solid #e1a116;
    background-color: #ffbd2e;

    &:active {
        border-color: #ad7d15;
        background-color: #bf9123;
    }

    & > svg {
        width: 8px;
        height: 8px;
        opacity: 0;
    }
`;

export const MaximizeButtonWrapper = styled(TittleButton)`
    border: 1px solid #12ac28;
    background-color: #28c940;

    &:active {
        border-color: #128622;
        background-color: #1f9a31;
    }

    & > svg {
        opacity: 0;

        &.fullscreen-svg {
            width: 6px;
            height: 6px;
        }

        &.maximize-svg {
            width: 8px;
            height: 8px;
        }
    }
`;

export const TitleMiddleComponents = styled.div`
    flex: 1;
    height: 100%;
`;

export const TitleAsideComponents = styled.div`
    flex: none;
    height: 100%;
    min-width: 92px;
`;

export const WindowContainer = styled.div`
    flex: 1;
    height: calc(100% - 4rem);
    overflow: auto;
`;

// Buttons

export const CloseButton = ({ onClick }) => (
    <CloseButtonWrapper onClick={onClick}>
        <svg x='0px' y='0px' viewBox='0 0 6.4 6.4'>
            <polygon
                fill='#4d0000'
                points='6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2'
            />
        </svg>
    </CloseButtonWrapper>
);

export const MinimizeButton = ({ onClick }) => (
    <MinimizeButtonWrapper onClick={onClick}>
        <svg x='0px' y='0px' viewBox='0 0 8 1.1'>
            <rect fill='#995700' width='8' height='1.1' />
        </svg>
    </MinimizeButtonWrapper>
);

export const MaximizeButton = ({ onClick }) => {
    const altPressed = useKeyPress((ev) => ev.altKey);
    return (
        <MaximizeButtonWrapper onClick={onClick}>
            {altPressed ? (
                <svg className='fullscreen-svg' x='0px' y='0px' viewBox='0 0 6 5.9'>
                    <path fill='#006400' d='M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z' />
                    <path fill='#006400' d='M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z' />
                </svg>
            ) : (
                <svg className='maximize-svg' x='0px' y='0px' viewBox='0 0 7.9 7.9'>
                    <polygon
                        fill='#006400'
                        points='7.9,4.5 7.9,3.4 4.5,3.4 4.5,0 3.4,0 3.4,3.4 0,3.4 0,4.5 3.4,4.5 3.4,7.9 4.5,7.9 4.5,4.5'
                    />
                </svg>
            )}
        </MaximizeButtonWrapper>
    );
};
