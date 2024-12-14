import { useSelector } from 'react-redux';
import { Contact } from '../../components/Contacts/Contacts';
import { selectAllContacts } from '../../redux/contacts/selectors';
import css from './ContactsList.module.css';


export const ContactList = () => {
  const contacts = useSelector(selectAllContacts);

  if (!Array.isArray(contacts)) {
    return <div>No contacts available</div>; 
  }

  return (
    <ul className={css.list}>
      {contacts.length > 0 ? (
        contacts.map(({ id, name, number }) => (
          <li key={id}>
            <Contact id={id} name={name} number={number} />
          </li>
        ))
      ) : (
        <li>No contacts found</li> 
      )}
    </ul>
  );
};
