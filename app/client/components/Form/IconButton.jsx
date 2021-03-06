import PropTypes from 'prop-types';
import React from 'react';
import SvgInline from 'react-svg-inline';
import styled from 'styled-components';

import styles from '#Style';

import { ButtonStyle } from './Button';

const IconButtonStyle = styled(ButtonStyle)`
  min-width: 0;
  height: 37px;
  width: 47px;

  svg {
    fill: ${styles.button.idle};
    transition: ${styles.transition.out};
    margin-left: -1px;
    height: 21px;
    filter: drop-shadow(-2px -2px 5px #{styles.button.idle});
  }

  &.load svg {
    filter: ${styles.svg.glow};
    fill: ${styles.color.active};
    animation: spin 0.5s infinite;
    animation-timing-function: linear;
  }

  &:hover:not(.load) svg {
    filter: ${styles.svg.glow};
    fill: ${styles.color.active};
  }
`;

const IconButton = ({ svg, load, ...rest }) => (
  <>
    <IconButtonStyle className={load ? 'load' : undefined} {...rest}>
      <SvgInline svg={svg} />
    </IconButtonStyle>
  </>
);

IconButton.propTypes = {
  load: PropTypes.bool,
  svg: PropTypes.any.isRequired
};

export default IconButton;
