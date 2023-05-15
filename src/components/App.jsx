import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import css from './App.module.css';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]
  );
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
    return false;
  };

  const [filter, setFilter] = useState('');

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChangeOfFilter = evt => {
    setFilter(evt.target.value);
  };

  const handleFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '480px',
        margin: '20px auto',
        backgroundColor: ' rgb(187, 187, 187)',
        borderRadius: '10px',
        padding: '40px 20px',
      }}
    >
      <h1 className={css.phohebookTitle}>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2 className={css.phohebookTitle}>Contacts</h2>
      <Filter value={filter} handleChange={handleChangeOfFilter} />
      <ContactList
        contacts={handleFilterContacts()}
        deleteContact={handleDeleteContact}
      />
      <Toaster />
    </div>
  );
};
