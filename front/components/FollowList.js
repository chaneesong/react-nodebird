import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card, List, Button } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER, UNFOLLOW } from '../actions/user';

const FollowList = ({ header, data }) => {
  const dispatch = useDispatch();

  const onCancle = useCallback((id) => () => {
    if (header === 'follow') {
      dispatch({
        type: UNFOLLOW.request,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER.request,
      data: id,
    });
  });

  return (
    <List
      style={{ marginBottom: '20px' }}
      grid={{ gutter: 4, xs: 2, md: 3 }}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        <div style={{ textAlign: 'center', margin: '10px 0' }}>
          <Button>더 보기</Button>
        </div>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ marginTop: '20px' }}>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancle(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
