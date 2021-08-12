import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';

import './styles.scss';

const STATUS = {
  ERROR: 'error',
  NONE: 'none',
  VALID: 'valid',
};

const TYPES = {
  EMAIL: 'email',
  PASSWORD: 'password',
  TEXT: 'text',
};

/**
 * Text Input component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {string} [description = ''] Copy to show with the html input field. Will show when
 * not empty.
 * @param {string} [hint = ''] Copy for the html input field placeholder.
 * @param {string} [initialValue = ''] Initial copy for the html input field value.
 * @param {func} [onChange = () => {}] Callback that receives the current input value.
 * @param {func} [onKeyPress = () => {}] Callback that receives the native keypress event.
 * @param {enum} [type = 'text'] Indicates the explicit type for the html input field.
 * @param {object} [validation] Indicates the validation status and any associated message.
 * @param {string} [validation.message = ''] Copy to show when the component is validated.
 * @param {enum} [validation.status = 'none'] Enum that indicates the component validation state.
 */
const TextInput = forwardRef(({
  className,
  description,
  hint,
  initialValue,
  onChange,
  onKeyPress,
  type,
  validation,
}, ref) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const isError = validation.status === STATUS.ERROR;
  const isValid = validation.status === STATUS.VALID;
  const cn = classnames('input--text', className, { isError, isValid });

  const handleChange = ({ target: { value: targetValue } }) => {
    setCurrentValue(targetValue);
    onChange(targetValue);
  };

  const handleKeyPress = (evt) => {
    onKeyPress(evt);
  };

  return (
    <div className={cn}>
      <input
        aria-label={type}
        className='formControl'
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        placeholder={hint}
        ref={ref}
        type={type}
        value={currentValue}
      />
      {validation.message && (<div className='hint--validation'>{validation.message}</div>)}
      {description && (<div className='hint--description'>{description}</div>)}
    </div>
  );
});

TextInput.displayName = 'TextInput';

TextInput.defaultProps = {
  className: '',
  description: '',
  hint: '',
  initialValue: '',
  onChange: () => {},
  onKeyPress: () => {},
  type: TYPES.TEXT,
  validation: {
    message: '',
    status: 'none',
  },
};

TextInput.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  type: PropTypes.oneOf(Object.values(TYPES)),
  validation: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.oneOf(['error', 'none', 'valid']),
  }),
};

TextInput.STATUS = STATUS;
TextInput.TYPES = TYPES;

export default TextInput;
