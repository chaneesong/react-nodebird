import Head from 'next/head';
import React from 'react';

import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [
    { nickname: 'song' },
    { nickname: 'chang' },
    { nickname: 'hee' },
  ];
  const followingList = [
    { nickname: 'song' },
    { nickname: 'chang' },
    { nickname: 'hee' },
  ];

  return (
    <>
      <Head>
        <title>Nodebird | Profile</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
