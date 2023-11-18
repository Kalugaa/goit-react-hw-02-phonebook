import { nanoid } from 'nanoid';
import AddContactForm from './AddContactForm/AddContactForm';
import Contacts from './Contacts/Contacts';
import ContactsSearch from './ContactsSearch/ContactsSearch';
import ContactList from './ContactList/ContactList';
import Section from './Contacts/Contacts';
const { Component } = require('react');

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;

    const isNameUnique = this.state.contacts.every(
      contact => contact.name.toLowerCase() !== name.toLowerCase()
    );
    if (!isNameUnique) {
      alert("Це ім'я вже присутнє у вашій телефонній книзі!");
      return;
    }
    const number = form.elements.number.value;
    const id = nanoid();
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { name, id, number }],
    }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  filterItems(arr, query) {
    return arr.filter(el => {
      return el.toString().toLowerCase().includes(query.toLowerCase());
    });
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          fontSize: 40,
          color: '#010101',
          paddingLeft: '25px',
        }}
      >
        <AddContactForm submit={this.handleSubmit} />
        <Section title={'Contacts'}>
          <ContactsSearch value={filter} change={this.handleChange} />
          {!filter && (
            <ContactList contacts={contacts} onclick={this.deleteContact} />
          )}
          {filter && (
            <ContactList
              contacts={filteredContacts}
              onclick={this.deleteContact}
            />
          )}
        </Section>
      </div>
    );
  }
}

// {/* <h2
//           style={{
//             margin: '10px 0 10px 0',
//             fontSize: '25px',
//           }}
//         >
//           Contacts
//         </h2>
//         <input
//           name="filter"
//           value={filter}
//           onChange={this.handleChange}
//         ></input>
//         <ul style={{ margin: '0' }}>
//           {filter &&
//             filteredContacts.map(contact => (
//               <li key={contact.id} style={{ fontSize: '25px' }}>
//                 {contact.name} {contact.number}
//               </li>
//             ))}
//         </ul>
//         {!filter && (
//           <ul style={{ margin: '0' }}>
//             {contacts.map(contact => (
//               <li key={contact.id} style={{ fontSize: '25px' }}>
//                 {contact.name} {contact.number}
//               </li>
//             ))}
//           </ul>
//         )} */}
