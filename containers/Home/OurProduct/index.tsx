import React from 'react';
import Image from 'next/image';

// material
import { Box, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/system';

// axios
import axios from 'axios';

// base URL
import BASE_URL from 'utils/baseUrl';

const Section = styled(Box)(({ theme }) => ({
  padding: '0 80px',
  position: 'relative',
  backgroundColor: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    padding: '0 24px',
    backgroundSize: '138px 144px',
  },
  [theme.breakpoints.down(321)]: {
    padding: '0 15px',
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'row',
  gap: '10px',
  margin: '0 0 10px 0',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '29px',
  lineHeight: '33px',
  color: '#01110C',
  textAlign: 'center',
  margin: '20px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const CardBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '250px',
  height: '360px',
  position: 'relative',
  backgroundColor: '#171F26',
  backgroundRepeat: 'no-repeat',
  borderRadius: '15px',
  border: '2px solid black',
  [theme.breakpoints.down('sm')]: {
    width: '240px',
    height: '345px',
  },
}));

const GlassBox = styled(Box)(({ theme }) => ({
  width: '230px',
  height: '180px',
  padding: '16px',
  margin: '168px 0 0 0',
  position: 'relative',
  background:
    'linear-gradient(131.89deg, rgba(255, 255, 255, 0.4) 13.98%, rgba(255, 255, 255, 0.1) 78.4%)',
  backdropFilter: 'blur(16px)',
  borderRadius: '8px',
  [theme.breakpoints.down('sm')]: {
    width: '225px',
    height: '165px',
    margin: '168px 0 0 0',
  },
}));

const ProductName = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins-Regular, Sans-Serif',
  fontStyle: 'normal',
  textAlign: 'center',
  fontWeight: 900,
  fontSize: '20px',
  lineHeight: '26px',
  color: '#FFFFFF',
  margin: '0 0 10px 0',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '24px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontFamily: 'Poppins-Regular, Sans-Serif',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FFFFFF',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '16px',
  },
}));

const ButtonOrder = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  backgroundColor: '#FFFFFF',
  borderRadius: '15px',
  margin: '15px 0 0 0',
  cursor: 'pointer',
}));

const ContainerStock = styled(Box)(({ theme }) => ({
  padding: '0 10px',
  position: 'absolute',
  left: 9,
  backgroundColor: '#FFFFFF',
  borderRadius: '15px',
  margin: '10px 0 0 0',
}));

interface CardProps {
  description: string;
  cardColor?: string;
  backgroundImage?: string;
  productName?: string;
  typeOrder: 'pre-order' | 'order';
  stock: number;
}

const Card = ({
  description,
  cardColor,
  backgroundImage,
  productName,
  typeOrder,
  stock,
}: CardProps) => (
  <CardBox sx={{ backgroundColor: cardColor, backgroundImage }}>
    <ContainerStock>Stock: {stock}</ContainerStock>
    <GlassBox>
      <ProductName>{productName}</ProductName>
      <Description> Description: </Description>
      <Description>{description}</Description>
      <ButtonOrder>{typeOrder}</ButtonOrder>
    </GlassBox>
  </CardBox>
);

interface IProduct {
  _id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

const OurProduct = () => {
  const theme = useTheme();

  const [dataProduct, setDataProduct] = React.useState([]);

  React.useEffect(() => {
    const getDataProduct = async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      setDataProduct(response.data.data);
    };

    getDataProduct();
  }, []);

  return (
    <>
      <Section>
        <Title>Our Products</Title>
        <CardContainer>
          {dataProduct.length > 0 ? (
            dataProduct.map((dataProduct: IProduct) => (
              <Box key={dataProduct._id}>
                <Card
                  cardColor="#48773E"
                  description={dataProduct.description}
                  productName={dataProduct.name}
                  backgroundImage={dataProduct.imageUrl}
                  typeOrder={dataProduct.stock <= 0 ? 'pre-order' : 'order'}
                  stock={dataProduct.stock}
                />
              </Box>
            ))
          ) : (
            <p>Not found</p>
          )}
        </CardContainer>
      </Section>
    </>
  );
};

export default OurProduct;
