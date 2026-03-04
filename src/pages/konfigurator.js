export default function KonfiguratorRemovedPage() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/produkte',
      permanent: false
    }
  };
}
