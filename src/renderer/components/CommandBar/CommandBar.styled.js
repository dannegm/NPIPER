import styled, { css } from 'styled-components';

export const CommandBarWrapper = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
`;

export const CommandBarContainer = styled.div`
    width: 100%;
    height: 2.4rem;
    display: flex;
    flex-direction: row;
    background-color: #e4e4e4;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    position: absolute;
    z-index: 2;

    ${({ focused }) =>
        focused &&
        css`
            height: 3.2rem;
            background-color: rgb(255 255 255 / 75%);
            backdrop-filter: blur(0.25rem);
            border: 1px solid rgb(0 0 0 / 25%);
            box-shadow: 0px 2px 12px 0px rgb(0 0 0 / 25%);
        `}
`;

export const CommandBarInput = styled.input`
    flex: 1;
    background: none;
    border: 0;
    padding: 0 1rem;
    outline: 0;
    color: #000;
`;

export const CommandBarShortcuts = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    padding-right: 1rem;
`;

export const CommandBarKey = styled.kbd`
    display: block;
    width: 1.4rem;
    padding: 4px 4px;
    font-family: sans-serif;
    font-size: 0.65rem;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    background-color: #eee;
    border: 1px solid #b4b4b4;
    color: #333333;
    border-radius: 0.25rem;
`;
