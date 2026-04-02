import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Intellibot | Self-Serve Deal Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const headshotData = await readFile(join(process.cwd(), 'public', 'daria-headshot.jpg'));
  const headshotBase64 = `data:image/jpeg;base64,${headshotData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(145deg, #1a1633 0%, #231f3e 50%, #1a1633 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '40px 48px',
        }}
      >
        {/* Decorative gradient orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 70%)', top: '-150px', right: '50px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.08) 0%, transparent 70%)', bottom: '-100px', left: '80px', display: 'flex' }} />

        {/* Top bar: Logo + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          {/* Robot icon as styled div */}
          <div style={{
            width: '44px', height: '44px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #632CA6, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(99,44,166,0.3)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              {/* Eyes */}
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
              </div>
              {/* Mouth */}
              <div style={{ width: '14px', height: '3px', borderRadius: '2px', background: '#e2dff0', opacity: 0.6, display: 'flex' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#e2dff0', letterSpacing: '-0.02em', lineHeight: 1, display: 'flex' }}>
              Intellibot
            </div>
            <div style={{ fontSize: '13px', fontWeight: 500, color: '#8c86a5', letterSpacing: '0.02em', display: 'flex', marginTop: '2px' }}>
              Self-Serve Deal Hub
            </div>
          </div>
        </div>

        {/* Dashboard screenshot */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            borderRadius: '12px',
            border: '1px solid #3a3460',
            background: 'rgba(35,31,62,0.95)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 0 1px rgba(108,92,231,0.1)',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar */}
          <div style={{
            width: '38px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', background: '#130f28',
            borderRight: '1px solid #2a2548', paddingTop: '10px', gap: '5px',
          }}>
            <div style={{ width: '20px', height: '20px', borderRadius: '5px', background: '#632CA6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: '3px' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
              </div>
            </div>
            <div style={{ width: '16px', height: '1px', background: '#2a2548', margin: '2px 0', display: 'flex' }} />
            <div style={{ fontSize: '5px', fontWeight: 700, color: '#8c86a5', opacity: 0.4, display: 'flex' }}>WIN</div>
            {[true, false, false].map((active, i) => (
              <div key={i} style={{
                width: '22px', height: '22px', borderRadius: '5px',
                background: active ? '#231f3e' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: `1.5px solid ${active ? '#e2dff0' : '#3a3460'}`, display: 'flex' }} />
              </div>
            ))}
            <div style={{ fontSize: '5px', fontWeight: 700, color: '#8c86a5', opacity: 0.4, display: 'flex', marginTop: '2px' }}>INTEL</div>
            {[false, false].map((_, i) => (
              <div key={i} style={{
                width: '22px', height: '22px', borderRadius: '5px', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: '1.5px solid #3a3460', display: 'flex' }} />
              </div>
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div style={{
              height: '28px', display: 'flex', alignItems: 'center',
              padding: '0 12px', borderBottom: '1px solid #2a2548',
              justifyContent: 'space-between',
            }}>
              <div style={{ fontSize: '8px', fontWeight: 700, color: '#e2dff0', display: 'flex' }}>Home</div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ fontSize: '6px', color: '#8c86a5', padding: '2px 6px', borderRadius: '3px', border: '1px solid #3a3460', display: 'flex' }}>Past 24h</div>
                <div style={{ fontSize: '6px', fontWeight: 600, color: '#632CA6', padding: '2px 6px', borderRadius: '3px', background: 'rgba(108,92,231,0.15)', display: 'flex' }}>Learn</div>
              </div>
            </div>

            {/* 4 Metric cards */}
            <div style={{ display: 'flex', gap: '5px', padding: '8px 10px 5px' }}>
              {[
                { label: 'Health', value: '74', color: '#2ca66c' },
                { label: 'ARR', value: '$12.9M', color: '#632CA6' },
                { label: 'Threats', value: '2', color: '#da545b' },
                { label: 'Win Rate', value: '68%', color: '#1a8dff' },
              ].map((m) => (
                <div key={m.label} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  padding: '6px 7px', borderRadius: '5px',
                  background: '#231f3e', border: '1px solid #2a2548',
                  borderTop: `2px solid ${m.color}`,
                }}>
                  <div style={{ fontSize: '6px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'flex' }}>{m.label}</div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#e2dff0', display: 'flex' }}>{m.value}</div>
                  <div style={{ height: '2px', width: '50%', borderRadius: '1px', background: m.color, opacity: 0.4, marginTop: '2px', display: 'flex' }} />
                </div>
              ))}
            </div>

            {/* Deal Assist + Accounts */}
            <div style={{ display: 'flex', gap: '5px', padding: '3px 10px 10px', flex: 1, minHeight: 0 }}>
              {/* Deal Assist */}
              <div style={{
                width: '180px', display: 'flex', flexDirection: 'column',
                borderRadius: '5px', background: '#231f3e', border: '1px solid #2a2548',
                borderTop: '2px solid #17b8be', padding: '7px',
              }}>
                <div style={{ fontSize: '6px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '5px' }}>Quick Actions</div>
                <div style={{ fontSize: '5px', fontWeight: 700, color: '#632CA6', opacity: 0.5, display: 'flex', marginBottom: '3px' }}>WIN THE DEAL</div>
                {[
                  { name: 'Battlecards', color: '#632CA6' },
                  { name: 'TCO Analysis', color: '#17b8be' },
                  { name: 'Head-to-Head', color: '#1a8dff' },
                ].map((a) => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: a.color, opacity: 0.5, display: 'flex' }} />
                    <div style={{ fontSize: '7px', color: '#cdc8e0', display: 'flex' }}>{a.name}</div>
                  </div>
                ))}
                <div style={{ fontSize: '5px', fontWeight: 700, color: '#1a8dff', opacity: 0.5, display: 'flex', marginTop: '3px', marginBottom: '3px' }}>KNOW THE MARKET</div>
                {[
                  { name: 'Competitor Intel', color: '#e5a00d' },
                  { name: 'Event Stream', color: '#da545b' },
                ].map((a) => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '2px', background: a.color, opacity: 0.5, display: 'flex' }} />
                    <div style={{ fontSize: '7px', color: '#cdc8e0', display: 'flex' }}>{a.name}</div>
                  </div>
                ))}
              </div>

              {/* Account table */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                borderRadius: '5px', background: '#231f3e', border: '1px solid #2a2548',
                borderTop: '2px solid #632CA6', padding: '7px', gap: '3px',
              }}>
                <div style={{ fontSize: '6px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '2px' }}>Account Portfolio</div>
                {[
                  { name: 'TitanForge Manufacturing', arr: '$3.1M', health: 91, color: '#2ca66c', stage: 'expansion' },
                  { name: 'Meridian Financial Group', arr: '$2.4M', health: 82, color: '#2ca66c', stage: 'customer' },
                  { name: 'Quantum Logistics Inc', arr: '$2.0M', health: 58, color: '#e5a00d', stage: 'customer' },
                  { name: 'Apex Healthcare Systems', arr: '$1.8M', health: 65, color: '#e5a00d', stage: 'customer' },
                  { name: 'Pinnacle Energy Corp', arr: '$1.5M', health: 73, color: '#e5a00d', stage: 'customer' },
                ].map((a) => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '2px 0' }}>
                    <div style={{ fontSize: '7px', fontWeight: 500, flex: 1, color: '#e2dff0', display: 'flex' }}>{a.name}</div>
                    <div style={{ fontSize: '7px', fontWeight: 600, color: '#8c86a5', width: '36px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>{a.arr}</div>
                    <div style={{ width: '36px', height: '4px', borderRadius: '2px', background: '#2a2548', display: 'flex', overflow: 'hidden' }}>
                      <div style={{ width: `${a.health}%`, height: '100%', borderRadius: '2px', background: a.color, display: 'flex' }} />
                    </div>
                    <div style={{ fontSize: '7px', fontWeight: 600, color: a.color, width: '16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>{a.health}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Tagline + Author */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{
                fontSize: '12px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: '#632CA6',
                padding: '3px 10px', borderRadius: '4px',
                background: 'rgba(108,92,231,0.12)',
                display: 'flex',
              }}>
                Win the Deal
              </div>
              <div style={{
                fontSize: '12px', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '0.08em', color: '#1a8dff',
                padding: '3px 10px', borderRadius: '4px',
                background: 'rgba(26,141,255,0.12)',
                display: 'flex',
              }}>
                Know the Market
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={headshotBase64}
              width={30}
              height={30}
              style={{ borderRadius: '50%', border: '2px solid rgba(108,92,231,0.3)' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#e2dff0', display: 'flex' }}>Daria Zhao</div>
              <div style={{ fontSize: '10px', color: '#8c86a5', display: 'flex' }}>Director of AI PMM at Yext</div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
