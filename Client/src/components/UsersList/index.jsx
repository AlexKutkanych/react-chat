import React from 'react';
import './styles.scss';

const setColor = (status) => status === 'online' ? 'users-list__status_green' : '';

const UsersList = ({users}) => {
  return (
    <ul>
      {Object.values(users).map(({ name, id, presenceStore }) => (
        <li key={id}>
          <span className={`users-list__status ${setColor(presenceStore[name])}`} />
          <span className='users-list__name'>{name}</span>
      </li>
      ))}
    </ul>
  );
};

export default UsersList;