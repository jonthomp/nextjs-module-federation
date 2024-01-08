import styled from '@emotion/styled';
import { GetServerSidePropsContext } from 'next';

const StyledPage = styled.div`
  .page {
  }
`;

export function Product({ id }: { id: string }) {
  return (
    <StyledPage>
      <h1>Product ID edited: {id}</h1>
    </StyledPage>
  );
}

export default Product;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.params || {};
  return {
    props: {
      id,
    },
  };
};
