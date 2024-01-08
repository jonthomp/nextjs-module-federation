import { GetServerSidePropsContext } from 'next';
import { lazy } from 'react';

const ShopProduct = lazy(() => import('shop/product'));

const Product = (pageProps: { id: string }) => {
  return <ShopProduct {...pageProps} />;
};

export default Product;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const page = await import('shop/product');

  return page.getServerSideProps(ctx);
};
