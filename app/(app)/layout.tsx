import { Layout } from '@/components/layout/layout';
import '@/styles/globals.css';
import { ReactFlowProvider } from '@xyflow/react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </Layout>
  );
}
