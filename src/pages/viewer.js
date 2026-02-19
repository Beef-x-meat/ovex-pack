import SeoHead from '@/components/SeoHead';
import ConfiguratorPage from '@/components/ConfiguratorPage';

export default function ViewerPage() {
  return (
    <>
      <SeoHead
        title="3D Konfigurator"
        description="Gestalten Sie Ihre Verpackung individuell mit unserem 3D-Konfigurator."
        path="/viewer"
      />
      <ConfiguratorPage />
    </>
  );
}
