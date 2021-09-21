import styled, { css } from 'styled-components';

export const CodeEditorWrapper = styled.div`
    & > .code-editor {
        background: #002b36 !important;
        margin-bottom: 20px !important;
        color: #e9ebf0 !important;

        .rs-panel-heading {
            color: #e9ebf0 !important;
            background: #06232c;
        }
    }
`;

export const CodeEditorHeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
`;

export const CodeEditorTitle = styled.div`
    display: flex;
    gap: 8px;
`;

export const CodeEditorTitleFunction = styled.span`
    color: #b8eb80;
`;

export const CodeEditorTitleName = styled.span`
    color: #6adafd;
`;

export const CodeEditorTitleBraces = styled.span`
    color: #ffffff;
`;

export const CodeEditorTitleArgs = styled.span`
    color: #ff6774;
`;

export const CodeEditorOutput = styled.div`
    padding: 1rem;
    line-height: 1;
    background-color: #1f233a;
    color: #fff;

    & ul {
        background: none !important;
    }
`;

export const CodeEditorError = styled.pre`
    padding: 1rem;
    line-height: 1;
    background-color: #b81c07;
    color: #fff;
`;

export const CodeEditorPre = styled.div``;

export const CodeEditorIdeContainer = styled.div`
    height: ${({ height }) => `${height}px`};
    min-height: 120px;
    max-height: 70vh;
    transition: all 0.1s;
`;

export const CodeEditorReizer = styled.div`
    width: 100%;
    background-color: rgb(0 0 0 / 75%);
    color: rgb(255 255 255 / 40%);
    text-align: center;
    font-size: 1rem;
    padding: 0;
    line-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 8px;
    cursor: ns-resize;
    user-select: none;
    transition: all 0.1s;

    ${({ moving }) =>
        moving &&
        css`
            color: rgb(255 255 255 / 85%);
            background-color: rgb(255 255 255 / 25%);
        `}
`;
