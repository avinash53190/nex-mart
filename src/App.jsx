import AppProviders from './app/AppProviders'
import AppShell from './shared/components/AppShell'
import AppRoutes from './app/AppRoutes'

export default function App() {
  return (
    <AppProviders>
      <AppShell>
        <AppRoutes />
      </AppShell>
    </AppProviders>
  )
}
