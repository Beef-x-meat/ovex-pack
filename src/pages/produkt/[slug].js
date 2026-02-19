import ProductDetailPage from '@/components/ProductDetailPage';
import { fetchProductBySlug, fetchProducts } from '@/lib/cms';

export default ProductDetailPage;

export async function getStaticPaths() {
  const products = await fetchProducts();
  return {
    paths: products.map((product) => ({
      params: { slug: product.slug }
    })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product },
    revalidate: 300
  };
}
