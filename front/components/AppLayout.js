import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';
import useInput from '../hooks/useInput';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const menuItems = (searchInput, onChangeSearchInput, onSearch) => [
  {
    key: 'Home',
    label: (
      <Link href='/'>
        <a>Home</a>
      </Link>
    ),
  },
  {
    key: 'Profile',
    label: (
      <Link href='/profile'>
        <a>Profile</a>
      </Link>
    ),
  },
  {
    key: 'Search',
    label: (
      <SearchInput
        enterButton
        value={searchInput}
        onChange={onChangeSearchInput}
        onSearch={onSearch}
      />
    ),
  },
];

const AppLayout = ({ children }) => {
  const [searchInput, onChangeSearchInput] = useInput('');
  const { me } = useSelector((state) => state.user);

  const onSearch = useCallback(() => {
    Router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <>
      <Menu
        mode='horizontal'
        items={menuItems(searchInput, onChangeSearchInput, onSearch)}
      />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <div>section 3</div>
        </Col>
      </Row>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
