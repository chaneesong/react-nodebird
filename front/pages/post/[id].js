import { useRouter } from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';
import { useSelector } from 'react-redux';
import Head from 'next/head';

import wrapper from '../../store/configureStore';
import { LOAD_POST } from '../../actions/post';
import { LOAD_MY_INFO } from '../../actions/user';
import AppLayout from '../../components/AppLayout';
import PostCard from '../../components/PostCard';
import backURL from '../../config';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  return (
    <AppLayout>
      <Head>
        <title>{singlePost.User.nickname}의 게시글</title>
        <meta
          property='og:title'
          content={`${singlePost.User.nicname}님의 게시글`}
        />
        <meta property='og:description' content={singlePost.content} />
        <meta property='og:image' content={singlePost.content} />
        <meta property='og:url' content={`${backURL}/post/${id}`} />
      </Head>
      singlePost ? <PostCard post={singlePost} />
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req?.headers.cookie;
      axios.defaults.headers.Cookie = '';

      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO.request,
      });
      store.dispatch({
        type: LOAD_POST.request,
        data: params.id,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
    }
);

export default Post;
