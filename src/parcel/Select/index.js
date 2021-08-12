import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { forwardRef, useState } from 'react';

import './styles.scss';

const STATUS = {
  ERROR: 'error',
  NONE: 'none',
  VALID: 'valid',
};

/**
 * Select component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {string} [description = ''] Copy to show with the html select field. Will show when
 * not empty.
 * @param {string} [hint = ''] Copy for the html select field placeholder.
 * @param {string} [initialValue = ''] Initial copy for the html select field value.
 * @param {func} [onChange] Callback that sends the current select value.
 * @param {Array} [options] Array of Objects that contains the options
 * e.g.: [{ label: 'Option 3', value:3 }, { label: 'Option 2', value:2 }]
 * @param {object} [validation] Indicates the validation status and any associated message.
 * @param {string} [validation.message = ''] Copy to show when the component is validated.
 * @param {enum} [validation.status = 'none'] Enum that indicates the component validation state.
 */
const Select = forwardRef(({
  className,
  description,
  hint,
  initialValue,
  onChange,
  options,
  validation,
}, ref) => {
  const [currentValue, setCurrentValue] = useState(initialValue);
  const isError = validation.status === STATUS.ERROR;
  const isValid = validation.status === STATUS.VALID;
  const cn = classnames(
    'select',
    className,
    {
      isError,
      isValid,
    },
  );

  const handleChange = ({ target: { value: targetValue } }) => {
    setCurrentValue(targetValue);
    onChange(targetValue);
  };

  return (
    <div className={cn}>
      <select
        className='formControl'
        onChange={handleChange}
        ref={ref}
        value={currentValue}
      >
        {!!hint && (<option value='' disabled hidden>{hint}</option>)}
        {options.length && options.map(({ value, label }) => (
          <option value={value} key={value}>{label}</option>
        ))}
      </select>

      {validation.message && (<div className='hint--validation'>{validation.message}</div>)}
      {description && (<div className='hint--description'>{description}</div>)}
    </div>
  );
});

Select.displayName = 'Select';

Select.defaultProps = {
  className: '',
  description: '',
  hint: '',
  initialValue: '',
  validation: {
    message: '',
    status: 'none',
  },
};

Select.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  hint: PropTypes.string,
  initialValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  validation: PropTypes.shape({
    message: PropTypes.string,
    status: PropTypes.oneOf(['error', 'none', 'valid']),
  }),
};

Select.STATUS = STATUS;

export default Select;
