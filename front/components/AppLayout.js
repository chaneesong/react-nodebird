import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import LoginForm from '../components/LoginForm';
import UserProfile from '../components/UserProfile';

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

const menuItems = [
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
    label: <SearchInput enterButton />,
  },
  {
    key: 'SignUp',
    label: (
      <Link href='/signup'>
        <a>Sign Up</a>
      </Link>
    ),
  },
];

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <>
      <Menu mode='horizontal' items={menuItems} />
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