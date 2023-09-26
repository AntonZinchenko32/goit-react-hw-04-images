import { useState, useEffect } from 'react';
import { SearchBar, Form, SearchButton, Input } from './Searchbar.styled.jsx';

export const Searchbar =({submit}) => {
  const [value, setValue] = useState('')

  // componentDidUpdate(_, prevState) {
  //   const isValueWasUpdate = prevState.value !== this.state.value;

  //   isValueWasUpdate && this.state.value && this.props.submit(this.state.value);
  // }

  useEffect(() => {
    value && submit(value);
  },[value,submit])

  const handleSubmit = e => {
    e.preventDefault();
    const trimmedInputValue = e.currentTarget.elements.searchInput.value.trim();
    setValue(trimmedInputValue);
  };

  return (
      <SearchBar>
        <Form onSubmit={handleSubmit}>
          <SearchButton type="submit" />
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchInput"
          />
        </Form>
      </SearchBar>
    );
}


