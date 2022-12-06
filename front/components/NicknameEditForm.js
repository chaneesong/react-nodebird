import React, { useCallback, useMemo } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { CHANGE_NICKNAME } from '../actions/user';

import useInput from '../hooks/useInput';

const NicknameEditForm = () => {
  const dispatch = useDispatch();
  let [nickname, onChangeNickname] = useInput('');
  const style = useMemo(
    () => ({
      marginBottom: '20px',
      border: '1px solid #d9d9d9',
      padding: '20px',
    }),
    []
  );

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME.request,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={style}>
      <Input.Search
        addonBefore='닉네임'
        enterButton='수정'
        value={nickname}
        onChange={onChangeNickname}
        onSearch={onSubmit}
      />
    </Form>
  );
};

export default NicknameEditForm;
