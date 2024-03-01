import css from './App.module.css';
import initialContacts from '../../data/initialContacts.json';
import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import SearchBox from '../SearchBox/SearchBox';

// localStorage
const getInitialContacts = () => {
  const savedContacts = window.localStorage.getItem('contacts');
 
  return savedContacts !== null ? JSON.parse(savedContacts) : initialContacts;
};

export default function App() {
  //state
  const [contacts, setContacts] = useState(getInitialContacts); // state contact
  const [filter, setFilter] = useState(''); // filter state

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

 
  const addContact = newContact => {
    setContacts(prevContacts => {
      return [...prevContacts, newContact];
    });
  };

  
  const deleteContact = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  
  useEffect(() => {
    try {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    } catch (error) {
      console.error('Error storing contacts or filter in localStorage:', error);
    }
  }, [contacts]);

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact} />
      <SearchBox value={filter} onChange={setFilter} />
      <ContactList contacts={filteredContacts} onDelete={deleteContact} />
    </div>
  );
}