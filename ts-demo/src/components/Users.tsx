import React from 'react';

import resource from './resource';
import UserCard from './UserCard';

const Users: React.FC = () => {
  const data = resource.read<User[]>('/accounts');

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
      {data.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default Users;
