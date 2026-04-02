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
          background: 'linear-gradient(145deg, #1a1633 0%, #231f3e 60%, #1a1633 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '32px 40px',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.15) 0%, transparent 65%)', top: '-180px', right: '-30px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.07) 0%, transparent 65%)', bottom: '-120px', left: '-30px', display: 'flex' }} />

        {/* Mini app frame — matching the welcome tour hero illustration */}
        <div style={{
          flex: 1,
          display: 'flex',
          borderRadius: '16px',
          background: 'rgba(35,31,62,0.92)',
          border: '1.5px solid #3a3460',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(108,92,231,0.08)',
          overflow: 'hidden',
        }}>
          {/* Sidebar */}
          <div style={{
            width: '48px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', background: '#6c5ce7',
            paddingTop: '14px', gap: '5px',
          }}>
            {/* Logo */}
            <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
            {/* Separator */}
            <div style={{ width: '18px', height: '1px', background: 'rgba(255,255,255,0.2)', marginTop: '4px', display: 'flex' }} />
            {/* Active nav item */}
            <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.3)', display: 'flex' }} />
            {[0, 1, 2].map((i) => (
              <div key={`a${i}`} style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
            ))}
            {/* Separator */}
            <div style={{ width: '18px', height: '1px', background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
            {[0, 1].map((i) => (
              <div key={`b${i}`} style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
            ))}
          </div>

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div style={{
              height: '36px', display: 'flex', alignItems: 'center',
              padding: '0 16px', borderBottom: '1px solid #3a3460',
              justifyContent: 'space-between',
            }}>
              <div style={{ width: '80px', height: '10px', borderRadius: '5px', background: 'rgba(226,223,240,0.15)', display: 'flex' }} />
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#2a2548', display: 'flex' }} />
                <div style={{ width: '56px', height: '20px', borderRadius: '5px', background: 'rgba(23,184,190,0.15)', border: '1px solid rgba(23,184,190,0.3)', display: 'flex' }} />
                <div style={{ width: '56px', height: '20px', borderRadius: '5px', background: 'rgba(108,92,231,0.15)', border: '1px solid rgba(108,92,231,0.3)', display: 'flex' }} />
              </div>
            </div>

            {/* Dashboard content */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '12px', gap: '10px' }}>
              {/* 4 Metric cards */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { label: 'Health', value: '74', color: '#2ca66c' },
                  { label: 'ARR', value: '$12.9M', color: '#632CA6' },
                  { label: 'Threats', value: '2', color: '#da545b' },
                  { label: 'Win Rate', value: '68%', color: '#1a8dff' },
                ].map((m) => (
                  <div key={m.label} style={{
                    flex: 1, display: 'flex', flexDirection: 'column',
                    padding: '10px 12px', borderRadius: '8px',
                    background: 'rgba(26,22,51,0.6)', border: '1px solid rgba(58,52,96,0.5)',
                    borderTop: `3px solid ${m.color}`,
                  }}>
                    <div style={{ fontSize: '9px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'flex' }}>{m.label}</div>
                    <div style={{ fontSize: '26px', fontWeight: 800, color: '#e2dff0', display: 'flex', marginTop: '1px' }}>{m.value}</div>
                    <div style={{ height: '3px', width: '55%', borderRadius: '2px', background: m.color, opacity: 0.5, marginTop: '5px', display: 'flex' }} />
                  </div>
                ))}
              </div>

              {/* Competitive Pulse + Win the Deal */}
              <div style={{ flex: 1, display: 'flex', gap: '10px', minHeight: 0 }}>
                {/* Chart */}
                <div style={{
                  flex: 5, display: 'flex', flexDirection: 'column',
                  borderRadius: '8px', background: 'rgba(26,22,51,0.6)', border: '1px solid rgba(58,52,96,0.5)',
                  padding: '10px 12px',
                }}>
                  <div style={{ fontSize: '9px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', marginBottom: '8px' }}>Competitive Pulse</div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                    {[35, 55, 40, 70, 45, 65, 80, 50, 60, 42, 75, 58].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          borderRadius: '2px 2px 0 0',
                          background: i === 6 ? '#6c5ce7' : 'rgba(108,92,231,0.25)',
                          display: 'flex',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Win the Deal */}
                <div style={{
                  flex: 7, display: 'flex', flexDirection: 'column',
                  borderRadius: '8px', background: 'rgba(26,22,51,0.6)', border: '1px solid rgba(58,52,96,0.5)',
                  padding: '10px 14px',
                }}>
                  <div style={{ fontSize: '9px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', marginBottom: '10px' }}>Win the Deal</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {[
                      { name: 'Battlecards', color: '#632CA6' },
                      { name: 'TCO Analysis', color: '#17b8be' },
                      { name: 'Head-to-Head', color: '#1a8dff' },
                      { name: 'Competitor Intel', color: '#e5a00d' },
                    ].map((a) => (
                      <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: a.color, opacity: 0.5, display: 'flex' }} />
                        <div style={{ fontSize: '13px', fontWeight: 500, color: '#cdc8e0', flex: 1, display: 'flex' }}>{a.name}</div>
                        <div style={{ fontSize: '14px', color: '#3a3460', display: 'flex' }}>›</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Two pillars + headshot */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '18px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 24px', borderRadius: '10px',
              background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.15)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#632CA6', display: 'flex' }}>Win the Deal</div>
              <div style={{ fontSize: '11px', color: '#8c86a5', display: 'flex', marginTop: '2px' }}>Battlecards, TCO, Head-to-Head</div>
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 24px', borderRadius: '10px',
              background: 'rgba(26,141,255,0.08)', border: '1px solid rgba(26,141,255,0.15)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a8dff', display: 'flex' }}>Know the Market</div>
              <div style={{ fontSize: '11px', color: '#8c86a5', display: 'flex', marginTop: '2px' }}>Competitor Intel, Event Stream</div>
            </div>
          </div>

          <img
            src={headshotBase64}
            width={38}
            height={38}
            style={{ borderRadius: '50%', border: '2px solid rgba(108,92,231,0.3)' }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
