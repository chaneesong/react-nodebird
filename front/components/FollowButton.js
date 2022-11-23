import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW, UNFOLLOW } from '../actions/user';

const FollowButton = ({ post }) => {
  const { me, followLoading, unfollowLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const isFollowing = me?.Followings.find((v) => v.id === post.User.id);

  const onClickButton = useCallback(() => {
    console.log('isFollowings', isFollowing);
    if (isFollowing) {
      dispatch({ type: UNFOLLOW.request, data: post.User.id });
    } else {
      dispatch({ type: FOLLOW.request, data: post.User.id });
    }
  }, [isFollowing]);

  return (
    <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
      {isFollowing ? 'Unfollow' : 'follow'}
    </Button>
  );
};

FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
