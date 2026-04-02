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
          background: 'linear-gradient(160deg, #130f28 0%, #1a1633 40%, #231f3e 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.12) 0%, transparent 65%)', top: '-200px', right: '-50px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.06) 0%, transparent 65%)', bottom: '-150px', left: '-50px', display: 'flex' }} />

        {/* Top bar with logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '24px 40px 16px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #632CA6, #7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
              </div>
              <div style={{ width: '10px', height: '2px', borderRadius: '1px', background: '#e2dff0', opacity: 0.5, display: 'flex' }} />
            </div>
          </div>
          <div style={{ fontSize: '18px', fontWeight: 700, color: '#8c86a5', display: 'flex' }}>Intellibot</div>
        </div>

        {/* Dashboard frame */}
        <div style={{
          flex: 1, margin: '0 32px',
          display: 'flex',
          borderRadius: '16px',
          border: '1.5px solid #3a3460',
          background: 'rgba(42,37,72,0.6)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
          overflow: 'hidden',
        }}>
          {/* Sidebar */}
          <div style={{
            width: '52px', display: 'flex', flexDirection: 'column',
            alignItems: 'center', background: '#130f28',
            borderRight: '1px solid #2a2548', paddingTop: '14px', gap: '6px',
          }}>
            {/* Active icon */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '6px',
              background: '#231f3e', display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderLeft: '3px solid #632CA6',
            }}>
              <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '2px solid #e2dff0', display: 'flex' }} />
            </div>
            <div style={{ width: '20px', height: '1px', background: '#2a2548', display: 'flex' }} />
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '2px solid #3a3460', display: 'flex' }} />
              </div>
            ))}
            <div style={{ width: '20px', height: '1px', background: '#2a2548', display: 'flex' }} />
            {[0, 1].map((i) => (
              <div key={i} style={{ width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '3px', border: '2px solid #3a3460', display: 'flex' }} />
              </div>
            ))}
          </div>

          {/* Content area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div style={{
              height: '38px', display: 'flex', alignItems: 'center',
              padding: '0 20px', borderBottom: '1px solid #2a2548',
              justifyContent: 'space-between',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#e2dff0', display: 'flex' }}>Home</div>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#2a2548', display: 'flex' }} />
                <div style={{ width: '60px', height: '20px', borderRadius: '5px', background: 'rgba(23,184,190,0.15)', border: '1px solid rgba(23,184,190,0.3)', display: 'flex' }} />
                <div style={{ width: '60px', height: '20px', borderRadius: '5px', background: 'rgba(108,92,231,0.15)', border: '1px solid rgba(108,92,231,0.3)', display: 'flex' }} />
              </div>
            </div>

            {/* 4 Metric cards */}
            <div style={{ display: 'flex', gap: '8px', padding: '14px 16px 8px' }}>
              {[
                { label: 'Health', value: '74', color: '#2ca66c' },
                { label: 'ARR', value: '$12.9M', color: '#632CA6' },
                { label: 'Threats', value: '2', color: '#da545b' },
                { label: 'Win Rate', value: '68%', color: '#1a8dff' },
              ].map((m) => (
                <div key={m.label} style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  padding: '10px 12px', borderRadius: '8px',
                  background: '#231f3e', border: '1px solid #2a2548',
                  borderTop: `3px solid ${m.color}`,
                }}>
                  <div style={{ fontSize: '10px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, display: 'flex' }}>{m.label}</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: '#e2dff0', display: 'flex', marginTop: '2px' }}>{m.value}</div>
                  <div style={{ height: '3px', width: '55%', borderRadius: '2px', background: m.color, opacity: 0.5, marginTop: '6px', display: 'flex' }} />
                </div>
              ))}
            </div>

            {/* Competitive Pulse + Win the Deal */}
            <div style={{ display: 'flex', gap: '8px', padding: '4px 16px 14px', flex: 1, minHeight: 0 }}>
              {/* Competitive Pulse chart */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                borderRadius: '8px', background: '#231f3e', border: '1px solid #2a2548',
                padding: '12px',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', marginBottom: '10px' }}>Competitive Pulse</div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
                  {[32, 48, 38, 62, 42, 58, 78, 45, 55, 40, 70, 52, 65, 48, 72, 50].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: '2px 2px 0 0',
                        background: i === 6 || i === 14 ? '#632CA6' : 'rgba(108,92,231,0.25)',
                        display: 'flex',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Win the Deal panel */}
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                borderRadius: '8px', background: '#231f3e', border: '1px solid #2a2548',
                padding: '12px',
              }}>
                <div style={{ fontSize: '10px', fontWeight: 600, color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'flex', marginBottom: '12px' }}>Win the Deal</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { name: 'Battlecards', color: '#632CA6' },
                    { name: 'TCO Analysis', color: '#17b8be' },
                    { name: 'Head-to-Head', color: '#1a8dff' },
                    { name: 'Competitor Intel', color: '#e5a00d' },
                  ].map((a) => (
                    <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: a.color, opacity: 0.7, display: 'flex' }} />
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#cdc8e0', flex: 1, display: 'flex' }}>{a.name}</div>
                      <div style={{ fontSize: '12px', color: '#3a3460', display: 'flex' }}>›</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Two pillars + Author */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 40px 20px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 28px', borderRadius: '10px',
              background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.15)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#632CA6', display: 'flex' }}>Win the Deal</div>
              <div style={{ fontSize: '11px', color: '#8c86a5', display: 'flex', marginTop: '2px' }}>Battlecards, TCO, Head-to-Head</div>
            </div>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '8px 28px', borderRadius: '10px',
              background: 'rgba(26,141,255,0.08)', border: '1px solid rgba(26,141,255,0.15)',
            }}>
              <div style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#1a8dff', display: 'flex' }}>Know the Market</div>
              <div style={{ fontSize: '11px', color: '#8c86a5', display: 'flex', marginTop: '2px' }}>Competitor Intel, Event Stream</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={headshotBase64}
              width={36}
              height={36}
              style={{ borderRadius: '50%', border: '2px solid rgba(108,92,231,0.3)' }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
