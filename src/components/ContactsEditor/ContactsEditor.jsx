import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contacts/operations';
import css from './ContactsEditor.module.css';

export const ContactsEditor = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value.trim();
    const number = form.elements.number.value.trim();

    if (name && number) {
      dispatch(addContact({ name, number }));
      form.reset();
    } else {
      alert('Both name and number are required!');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input
        name="name"
        className={css.input}
        placeholder="Enter contact name"
      />
      <input
        name="number"
        className={css.input}
        placeholder="Enter phone number"
      />
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
};
