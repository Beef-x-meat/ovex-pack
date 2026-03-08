import ProductDetailPage from '@/components/ProductDetailPage';
import { localProducts, getLocalProductBySlug } from '@/lib/products';

export default ProductDetailPage;

export function getStaticPaths() {
  return {
    paths: localProducts.map((product) => ({
      params: { slug: product.slug }
    })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const product = getLocalProductBySlug(params.slug);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product }
  };
}
