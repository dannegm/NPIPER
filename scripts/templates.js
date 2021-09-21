/* eslint-disable import/no-extraneous-dependencies */
const { startCase, camelCase } = require('lodash');

const PascalCase = (str) => startCase(camelCase(str)).replace(/ /g, '');

const tplComponentIndex = (componentName) => `
export { default } from './${PascalCase(componentName)}';
`;

const tplComponent = (componentName) => `
import React from 'react';
import PropTypes from 'prop-types';

import {  } from './${PascalCase(componentName)}.styled';

const ${PascalCase(componentName)} = ({ ...props }) => {
  return (
    <>
      {/* TODO: Content */}
    </>
  );
};

${PascalCase(componentName)}.propTypes = {
  // TODO: Props Definition
};

${PascalCase(componentName)}.defaultProps = {
  // TODO: Default Props Values
};

export default ${PascalCase(componentName)};
`;

const tplComponentStyled = () => `
import styled, { css } from 'styled-components';
`;

module.exports = {
    PascalCase,
    tplComponentIndex,
    tplComponent,
    tplComponentStyled,
};
