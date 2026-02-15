import dynamic from 'next/dynamic';
import FallbackViewer from '@/components/FallbackViewer';

const ProductViewer3D = dynamic(() => import('@/components/ProductViewer3D'), {
  ssr: false,
  loading: () => <FallbackViewer reason="3D-Viewer wird vorbereitet." />
});

export default function Viewer(props) {
  return <ProductViewer3D {...props} />;
}
