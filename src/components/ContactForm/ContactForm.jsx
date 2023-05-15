import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const isContactExsist = addContact({
      id: nanoid(6),
      name: name,
      number: number,
    });

    if (!isContactExsist) {
      reset();
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="" className={css.formLabel}>
        Name
        <input
          value={name}
          onChange={handleChange}
          className={css.formInput}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label htmlFor="" className={css.formLabel}>
        Number
        <input
          value={number}
          onChange={handleChange}
          className={css.formInput}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={css.addContactBtn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  propOnSubmit: PropTypes.func,
};

