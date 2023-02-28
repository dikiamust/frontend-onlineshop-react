import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';
import SigninFormFormik from 'containers/Signin';

const Signin: NextPage = () => {
  return (
    <>
      <Meta
        title="Onlineshop"
        description="Buy our products"
        pathName="/signin"
        thumbnail=""
      />
      <SigninFormFormik />
    </>
  );
};

export default Signin;
