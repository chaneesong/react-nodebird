import Head from 'next/head';
import React, { useEffect } from 'react';
import Router from 'next/router';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_FOLLOWERS, LOAD_FOLLOWINGS } from '../actions/user';

const Profile = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    dispatch({
      type: LOAD_FOLLOWERS.request,
    });
    dispatch({
      type: LOAD_FOLLOWINGS.request,
    });
  }, []);

  if (!me) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Nodebird | Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉' data={me.Followings} />
        <FollowList header='팔로워' data={me.Followers} />
      </AppLayout>
    </>
  );
};

export default Profile;
