import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

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
    label: <Input.Search style={{ verticalAlign: 'middle' }} enterButton />,
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
  return (
    <>
      <Menu mode='horizontal' items={menuItems} />
      <Row>
        <Col xs={24} md={6}>
          left
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          right
        </Col>
      </Row>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
