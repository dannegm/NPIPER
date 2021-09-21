/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/forbid-prop-types */
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Panel, Icon, IconButton, Tooltip, Whisper, Loader } from 'rsuite';
import AceEditor from 'react-ace';
import prettier from 'prettier';
import parserBabel from 'prettier/parser-babel';
import parserHtml from 'prettier/parser-html';
import Loadable from 'react-loadable';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-dracula';

import {
    CodeEditorWrapper,
    CodeEditorHeaderWrapper,
    CodeEditorTitle,
    CodeEditorTitleFunction,
    CodeEditorTitleName,
    CodeEditorTitleBraces,
    CodeEditorTitleArgs,
    CodeEditorOutput,
    CodeEditorError,
    CodeEditorPre,
    CodeEditorIdeContainer,
    CodeEditorReizer,
} from './CodeEditor.styled';

const { ipcRenderer } = window.require('electron');

const formatOptions = {
    printWidth: 100,
    singleQuote: true,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    jsxSingleQuote: true,
    bracketSpacing: true,
    arrowParens: 'always',
    endOfLine: 'auto',
    parser: 'babel',
    plugins: [parserBabel, parserHtml],
};

const Loading = () => {
    return <Loader content='Loading...' />;
};

const JsonTree = Loadable({
    loader: () => import('react-json-tree'),
    loading: Loading,
});

const useEffectDebounced = (handler, dependency = [], time = 300) => {
    const $timer = useRef(null);

    useEffect(() => {
        if ($timer.current != null) {
            clearTimeout($timer.current);
        }

        $timer.current = setTimeout(() => {
            handler();
        }, time);

        return () => {
            clearTimeout($timer.current);
        };
    }, dependency);
};

const parsePolyfillObject = (obj = {}) => {
    if (typeof obj === 'object' && obj?.properties !== undefined) {
        const props = {};

        Object.entries(obj.properties).forEach(([key, value]) => {
            props[key] = parsePolyfillObject(value);
        });

        return props;
    }

    return obj;
};

const CodeEditor = forwardRef(({ functionName, expanded, input, onExecute }, $code) => {
    const [code, setCode] = useState();
    const [executing, setExecuting] = useState(false);
    const [executedCode, setExecutedCode] = useState({ result: null, message: null });

    const [ideHeight, setIdeHeight] = useState(192);

    const handleChange = (val) => {
        setCode(val);
    };

    const handleFormat = (ev) => {
        ev.stopPropagation();
        const codeFormatted = prettier.format(code, formatOptions);
        setCode(codeFormatted);
    };

    useEffectDebounced(() => {
        ipcRenderer.send('async::code@change', { code });
    }, [code]);

    useEffect(() => {
        ipcRenderer.on('async::code@executed', async (_, { executed }) => {
            const parsedResult = {
                ...executed,
                result: parsePolyfillObject(JSON.parse(executed.result)),
            };
            setExecutedCode(parsedResult);
        });
    }, []);

    useImperativeHandle($code, () => ({
        format: handleFormat,
    }));

    const Header = () => (
        <CodeEditorHeaderWrapper>
            <Whisper placement='bottom' speaker={<Tooltip>Format code (Prettier)</Tooltip>}>
                <IconButton size='xs' icon={<Icon icon='align-left' />} onClick={handleFormat} />
            </Whisper>
            <CodeEditorTitle>
                <CodeEditorTitleFunction>function</CodeEditorTitleFunction>
                <CodeEditorTitleName>{functionName}</CodeEditorTitleName>
                <CodeEditorTitleBraces>(</CodeEditorTitleBraces>
                <CodeEditorTitleArgs>input</CodeEditorTitleArgs>
                <CodeEditorTitleBraces>)</CodeEditorTitleBraces>
            </CodeEditorTitle>

            {executing && <Loader content='Executing...' />}
        </CodeEditorHeaderWrapper>
    );

    const [isResizing, setIsResizing] = useState(false);
    const [mouseStartY, setMouseStartY] = useState(0);

    const handleResizeStart = (ev) => {
        setIsResizing(true);
        setMouseStartY(ev.pageY);
    };

    const handleResizeEnd = () => {
        setIsResizing(false);
        setMouseStartY(0);
    };

    const handleResizeMove = (ev) => {
        if (isResizing) {
            setIdeHeight(ideHeight - (mouseStartY - ev.pageY));
        }
    };

    useEffect(() => {
        window.addEventListener('mouseup', handleResizeEnd);
        window.addEventListener('mousemove', handleResizeMove);
        return () => {
            window.removeEventListener('mouseup', handleResizeEnd);
            window.removeEventListener('mousemove', handleResizeMove);
        };
    }, [isResizing]);

    return (
        <CodeEditorWrapper>
            <Panel
                className='code-editor'
                header={<Header />}
                defaultExpanded={expanded}
                collapsible
                bordered
                bodyFill
            >
                <CodeEditorIdeContainer height={ideHeight}>
                    <AceEditor
                        mode='javascript'
                        theme='dracula'
                        value={code}
                        onChange={handleChange}
                        name={`CODE_OF_${functionName}_FN`}
                        editorProps={{ $blockScrolling: true }}
                        width='100%'
                        height={ideHeight - 1}
                        showPrintMargin={false}
                    />
                </CodeEditorIdeContainer>
                <CodeEditorReizer
                    moving={isResizing}
                    onMouseDown={handleResizeStart}
                    handleMouseMove={handleResizeMove}
                >
                    ···
                </CodeEditorReizer>
                {executedCode.result && (
                    <CodeEditorOutput>
                        <CodeEditorPre>
                            <JsonTree data={executedCode.result} />
                        </CodeEditorPre>
                    </CodeEditorOutput>
                )}

                {executedCode.message && (
                    <CodeEditorError>
                        <CodeEditorPre>{executedCode.message}</CodeEditorPre>
                    </CodeEditorError>
                )}
            </Panel>
        </CodeEditorWrapper>
    );
});

CodeEditor.propTypes = {
    functionName: PropTypes.string.isRequired,
    expanded: PropTypes.bool,
    input: PropTypes.any,
    onExecute: PropTypes.func,
};

CodeEditor.defaultProps = {
    expanded: true,
    input: undefined,
    onExecute: () => null,
};

export default CodeEditor;
