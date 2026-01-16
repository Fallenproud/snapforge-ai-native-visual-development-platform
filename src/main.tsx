import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import WorkspacePage from '@/pages/WorkspacePage'
import WorkflowsPage from '@/pages/WorkflowsPage'
import PlaceholderView from '@/components/PlaceholderView'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/workspace/:projectId",
    element: <WorkspacePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/workflows",
    element: <WorkflowsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/projects",
    element: <PlaceholderView title="Project Archive" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/memory",
    element: <PlaceholderView title="Neural Memory" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/agents",
    element: <PlaceholderView title="Agent Workforce" />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/settings",
    element: <PlaceholderView title="System Settings" />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)