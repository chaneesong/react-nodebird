import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { logoutAction } from '../reducers/user';

const LogOutButton = styled(Button)`
  margin-top: 10px;
`;

const UserProfile = () => {
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <Card
      actions={[
        <div key='twit'>
          트윗
          <br />0
        </div>,
        <div key='followings'>
          팔로잉
          <br />0
        </div>,
        <div key='followers'>
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>GG</Avatar>} title='gigo96' />
      <LogOutButton onClick={onLogOut}>logout</LogOutButton>
    </Card>
  );
};

export default UserProfile;
