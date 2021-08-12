import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import './styles.scss';

/**
 * List component
 * @param {string} [className = ''] Additional classes provided here will be added to the top level
 * of the component.
 * @param {object[]} items The items to list.
 * @param {string} items.labelPrimary The primary label for the list item.
 * @param {string} [items.labelSecondary] The secondary label for the list item.
 * @param {string} [itemSelected = null] Initial selected item when the component first mounts.
 * @param {func} [onItemSelected = () => {}] Callback that receives the selected index and item.
 * @param {enum} [size = 'default'] The size of the list component to render.
 */
const List = ({
  className,
  items,
  itemSelected,
  onItemSelected,
  size,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(itemSelected);

  const onItemClick = (listItemIndex) => {
    if (!items[listItemIndex].disabled) {
      setSelectedIndex(listItemIndex);
    }
    onItemSelected({ index: listItemIndex, item: items[listItemIndex] });
  };

  const listItems = items.map(({ labelPrimary, labelSecondary, disabled }, index) => {
    const cn = classnames('item', { disabled, selected: index === selectedIndex });
    const handleClick = onItemClick.bind(this, index);
    return (
      <li
        className={cn}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        onClick={handleClick}
        onKeyDown={handleClick}
        role='presentation'
      >
        {labelPrimary && (<span className='label--primary'>{labelPrimary}</span>)}
        {labelSecondary && (<span className='label--secondary'>{labelSecondary}</span>)}
      </li>
    );
  });

  const cn = classnames('list', className, { small: (size === 'small') });

  return (
    <ul className={cn}>
      {listItems}
    </ul>
  );
};

List.defaultProps = {
  className: null,
  items: { labelPrimary: 'List items missing' },
  itemSelected: null,
  onItemSelected: () => {},
  size: 'default',
};

List.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
  itemSelected: PropTypes.number,
  onItemSelected: PropTypes.func,
  size: PropTypes.oneOf(['default', 'small']),
};

List.SIZES = {
  DEFAULT: 'default',
  SMALL: 'small',
};

export default List;
