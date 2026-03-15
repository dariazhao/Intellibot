import { Badge } from '@/components/ui/badge';
import { ThemePicker } from './theme-picker';

const INTEGRATIONS = [
  { name: 'Salesforce', description: 'CRM data — accounts, contacts, opportunities', icon: '☁️', status: 'connected' },
  { name: 'Gong', description: 'Call recordings and conversation intelligence', icon: '🎙️', status: 'connected' },
  { name: 'Marketo', description: 'Marketing automation and engagement data', icon: '📊', status: 'connected' },
  { name: 'Snowflake', description: 'Data warehouse — product usage and analytics', icon: '❄️', status: 'connected' },
  { name: 'G2', description: 'Third-party review intelligence', icon: '⭐', status: 'connected' },
  { name: 'Slack', description: 'Notifications and competitive alerts', icon: '💬', status: 'not_configured' },
];

export default function SettingsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage appearance and integrations</p>
      </div>

      {/* Theme section */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Choose a color theme for the interface</p>
        </div>
        <ThemePicker />
      </section>

      {/* Integrations section */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Integrations</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Data source connections</p>
        </div>
        <div className="space-y-3">
          {INTEGRATIONS.map(integration => (
            <div
              key={integration.name}
              className="rounded-xl border border-border bg-card p-5 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                  {integration.icon}
                </div>
                <div>
                  <div className="font-medium">{integration.name}</div>
                  <div className="text-sm text-muted-foreground">{integration.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {integration.status === 'connected' ? (
                  <>
                    <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                      Mock Data
                    </Badge>
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </>
                ) : (
                  <>
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border">
                      Not Configured
                    </Badge>
                    <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-dashed border-border bg-card/50 p-8 text-center">
        <div className="text-muted-foreground text-sm">
          All data sources are currently in <span className="text-primary font-medium">Mock Data</span> mode.
          <br />
          Connect real integrations to enable live competitive intelligence.
        </div>
      </div>
    </div>
  );
}
