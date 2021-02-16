import React from 'react';
import ReactSelect, { components } from 'react-select';
import PropTypes from 'prop-types';
import { Carret } from '@buffetjs/icons';
import { useTheme } from 'styled-components';

const DropdownIndicator = props => {
  const theme = useTheme();

  return (
    <components.DropdownIndicator {...props}>
      <Carret fill={theme.main.colors.grey} />
    </components.DropdownIndicator>
  );
};

export const Select = ({ children, onChange, selectedValue, ...props }) => {
  const theme = useTheme();
  const childrenArray = React.Children.toArray(children);

  const options = childrenArray.map(child => ({
    value: child.props.value,
    label: child.props.children,
  }));

  const selectedOption = options.find(({ value }) => value === selectedValue);

  return (
    <ReactSelect
      options={options}
      onChange={({ value }) => onChange(value)}
      components={{ DropdownIndicator }}
      styles={{
        indicatorsContainer: provided => ({
          ...provided,
          background: theme.main.colors.brightGrey,
        }),
        dropdownIndicator: provided => ({
          ...provided,
          padding: '0 1.8rem',
          margin: 0,
        }),
        indicatorSeparator: provided => ({
          ...provided,
          display: 'none',
        }),
        control: provided => ({
          ...provided,
          border: `1px solid ${theme.main.colors.border}`,
          cursor: 'pointer',
        }),
      }}
      value={selectedOption}
      {...props}
    />
  );
};

export const Option = () => <></>;

Select.defaultProps = {
  selectedValue: undefined,
};

Select.propTypes = {
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string,
};
