import React from 'react';
import type { NextPage } from 'next';

// components
import HomeContainer from 'containers/Home';
import Meta from 'components/Meta';

const Home: NextPage = () => {
  return (
    <>
      <Meta
        title="Onlineshop"
        description="Buy our product"
        pathName="/"
        thumbnail=""
      />
      <HomeContainer />
    </>
  );
};

export default Home;
