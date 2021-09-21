import React from 'react';

import CodeEditor from '../../components/CodeEditor';

import {
    // breakline
    Container,
} from './Piper.styled';

const Piper = () => {
    return (
        <Container>
            <CodeEditor functionName='exampleFunction' />
        </Container>
    );
};

export default Piper;
