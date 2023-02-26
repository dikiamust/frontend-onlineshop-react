import React from 'react';
import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';

const Dashboard: NextPage = () => {
  return (
    <>
      <Meta
        title="NWL - Landing Page"
        description="Be the first to know how we plan to be part of the solution by innovating sustainable materials into eco-friendly products"
        pathName="/"
        thumbnail=""
      />
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
