import type { NextPage } from 'next';

// components
import Meta from 'components/Meta';
import SignupFormFormik from 'containers/Signup';

const Signin: NextPage = () => {
  return (
    <>
      <Meta
        title="Onlineshop"
        description="Buy our products"
        pathName="/signup"
        thumbnail=""
      />
      <SignupFormFormik />
    </>
  );
};

export default Signin;
