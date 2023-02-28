import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { ErrorText } from './styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { InputAdornment } from '@mui/material';
import { NextPage } from 'next';
import BASE_URL from 'utils/baseUrl';
import Image from 'next/image';
import ErrorIcon from '@/svg/error-icon.svg';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { validationSchema } from './ validationSchema';
import Footer3 from 'components/Footer3';
import Header3 from 'components/Header3';
import ContentLoading from 'components/ContentLoading';

const DummyBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '20vh',
  backgroundColor: '#48773E',
}));

const ContainerSignup = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#48773E',
  height: '93vh',
  [theme.breakpoints.down('sm')]: {
    height: '200vh',
  },
}));

const ContainerError = styled(Box)(({ theme }) => ({
  display: 'flex',
  mt: '10px',
  alignItems: 'start',
}));

const ImageErrorWrapper = styled(Box)(({ theme }) => ({
  width: '16px',
  height: '16px',
  [theme.breakpoints.down('sm')]: {
    width: '13px',
    height: '13px',
  },
}));

const ContainerForm = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

interface State {
  password: string;
  showPassword: boolean;
}

const SignupFormFormik: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [valuesPass, setValues] = useState<State>({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...valuesPass,
      showPassword: !valuesPass.showPassword,
    });
  };

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      phone: '',
      shippingAddress: '',
      role: 'customer',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      });

      const validate = await response.json();
      console.log('check', validate);
      console.log('check', response);

      const signUpSucces = validate.success;

      if (signUpSucces) {
        setLoading(false);
        await router.push('/signin');
      } else if (validate.message === 'Email already exist!.') {
        setLoading(false);
        formik.setFieldError('email', validate.message);
      } else {
        setLoading(false);
        formik.setFieldError('email', 'Invalid credentials');
        formik.setFieldError('password', 'Invalid credentials');
      }
    },
  });

  const theme = useTheme();

  return (
    <>
      <ContainerSignup>
        <Header3 logo="original" />
        <ContainerForm>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 13, color: 'white' }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{
              mt: 3,
              zIndex: 2,
              maxWidth: '350px',
              backgroundColor: 'white',
              padding: '35px',
              borderRadius: '10px',
            }}
            onBlur={formik.handleBlur}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"
              label="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.touched.username && formik.errors.username ? (
              <ContainerError>
                <ImageErrorWrapper>
                  <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  />
                </ImageErrorWrapper>
                <ErrorText>{formik.errors.username}</ErrorText>
              </ContainerError>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email ? (
              <ContainerError>
                <ImageErrorWrapper>
                  <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  />
                </ImageErrorWrapper>
                <ErrorText>{formik.errors.email}</ErrorText>
              </ContainerError>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              type={valuesPass.showPassword ? 'text' : 'password'}
              name="password"
              label="Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {valuesPass.showPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {formik.touched.password && formik.errors.password ? (
              <ContainerError>
                <ImageErrorWrapper>
                  <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  />
                </ImageErrorWrapper>
                <ErrorText>{formik.errors.password}</ErrorText>
              </ContainerError>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />

            {formik.touched.phone && formik.errors.phone ? (
              <ContainerError>
                <ImageErrorWrapper>
                  <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  />
                </ImageErrorWrapper>
                <ErrorText>{formik.errors.phone}</ErrorText>
              </ContainerError>
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              name="shippingAddress"
              label="Shipping Address"
              value={formik.values.shippingAddress}
              onChange={formik.handleChange}
            />

            {formik.touched.shippingAddress && formik.errors.shippingAddress ? (
              <ContainerError>
                <ImageErrorWrapper>
                  <Image
                    src={ErrorIcon}
                    alt="Error Icon"
                    objectFit="fill"
                    quality={100}
                  />
                </ImageErrorWrapper>
                <ErrorText>{formik.errors.shippingAddress}</ErrorText>
              </ContainerError>
            ) : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Link href="/signin" variant="body2">
                  {'Have an account? Sign In'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </ContainerForm>
      </ContainerSignup>
      {loading ? <ContentLoading /> : <DummyBox />}
      <Footer3 />
    </>
  );
};

export default SignupFormFormik;
