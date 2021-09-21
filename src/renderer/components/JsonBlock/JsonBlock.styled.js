import styled from 'styled-components';

export const JsonBlockWrapper = styled.div`
    & > .json-block {
        background: #002b36 !important;
        margin-bottom: 20px !important;
        color: #e9ebf0 !important;

        .rs-panel-heading {
            color: #e9ebf0 !important;
            background: #06232c;
        }
    }
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`;
