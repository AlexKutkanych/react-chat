import React from "react";
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import './styles.scss';

const ModalForm = ({ createRoom, closePopup }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    createRoom(data);
    closePopup();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='modal-form'>
      <div className='modal-form__input-block'>
        <label>Room name:</label>
        <input
          name="name"
          ref={register({ required: true, maxLength: 10 })}
        />
        {errors.name && <p className='modal-form__error'>This field is required</p>}
      </div>
      <div className='modal-form__button-container'>
        <Button type="submit" color="primary" autoFocus>Create Room</Button>
        <Button onClick={closePopup} color="primary" autoFocus>Cancel</Button>
      </div>
    </form>
  );
}

export default ModalForm;

