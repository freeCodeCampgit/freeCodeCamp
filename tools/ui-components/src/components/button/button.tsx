import PropTypes from 'prop-types';
import React from 'react';
import { ButtonProps } from '../..//types/button.types';

import './button.css';

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? 'storybook-button--primary'
    : 'storybook-button--secondary';
  return (
    <button
      className={[
        'storybook-button',
        `storybook-button--${size}`,
        mode,
        'fcc-style'
      ].join(' ')}
      style={{ backgroundColor }}
      type='button'
      {...props}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  primary: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};
