export default function ViewerRemovedPage() {
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
