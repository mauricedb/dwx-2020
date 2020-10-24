import React from 'react';
import { useParams } from 'react-router-dom';

import LabeledInput from './LabeledInput';
import resource from './resource';

const UserUserDetails = () => {
  const { userId } = useParams();
  const data = resource.read(`/accounts/${userId}`);

  return (
    <div>
      <img src={data.picture} alt={data.firstname} />
      <LabeledInput label="Firstname:" value={data.firstname} />
      <LabeledInput label="Surname:" value={data.surname} />
      <LabeledInput label="Email:" value={data.email} />
      <LabeledInput label="Address:" value={data.address} />
      <LabeledInput label="Phone:" value={data.phone} />
    </div>
  );
};

export default UserUserDetails;
