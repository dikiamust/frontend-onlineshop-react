import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
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
import Cookies from 'js-cookie';
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
import { ErrorTextAuth } from 'components/ErrorTextAuth';

const DummyBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '20vh',
  backgroundColor: '#48773E',
}));

const ContainerSignin = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: '#48773E',
  height: '63vh',
  [theme.breakpoints.down('sm')]: {
    height: '150vh',
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

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

interface State {
  password: string;
  showPassword: boolean;
}

const SigninFormFormik: NextPage = () => {
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
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async () => {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formik.values),
      });

      const validate = await response.json();

      const signInSucces = response.status === 200;

      if (signInSucces) {
        setLoading(false);
        Cookies.set('access_token', validate.access_token);
        if (validate.role === 'admin') {
          await router.push('/dashboard');
        } else {
          await router.push('/');
        }
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
      <ContainerSignin>
        <Header3 logo="original" />
        <Wrapper>
          <Typography
            component="h1"
            variant="h5"
            sx={{ mt: 13, color: 'white' }}
          >
            Sign in
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
                <ErrorTextAuth>{formik.errors.email}</ErrorTextAuth>
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
                <ErrorTextAuth>{formik.errors.password}</ErrorTextAuth>
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
              Sign In
            </Button>
            <Grid container>
              <Grid item lg={12} xs={12}>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Wrapper>
      </ContainerSignin>
      {loading ? <ContentLoading /> : <DummyBox />}
      <Footer3 />
    </>
  );
};

export default SigninFormFormik;
