import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const PostCardContent = ({
  editMode,
  postData,
  onChangePost,
  onCancelUpdate,
}) => {
  const { editPostLoading, editPostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);

  useEffect(() => {
    if (editPostDone) {
      onCancelUpdate();
    }
  }, [editPostDone]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <div>
      {editMode ? (
        <>
          <TextArea value={editText} onChange={onChangeText} />
          <Button.Group>
            <Button loading={editPostLoading} onClick={onChangePost(editText)}>
              수정
            </Button>
            <Button type='danger' onClick={onCancelUpdate}>
              취소
            </Button>
          </Button.Group>
        </>
      ) : (
        postData.split(/(#[^\s#]+)/g).map((string) => {
          if (string.match(/(#[^\s]+)/)) {
            return (
              <Link
                href={{ pathname: '/hashtag', query: { tag: string.slice(1) } }}
                as={`/hashtag/${string.slice(1)}`}
                key={string}
              >
                <a>{string}</a>
              </Link>
            );
          }
          return string;
        })
      )}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
