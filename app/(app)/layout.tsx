import { Layout } from '@/components/layout/layout';
import { ReactFlowProvider } from '@xyflow/react';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </Layout>
  );
}
