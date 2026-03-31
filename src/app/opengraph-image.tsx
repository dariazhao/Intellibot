import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Intellibot — Competitive Intelligence Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const llamaData = await readFile(join(process.cwd(), 'public', 'llama.png'));
  const llamaBase64 = `data:image/png;base64,${llamaData.toString('base64')}`;

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
          background: 'linear-gradient(145deg, #dfe2f0 0%, #eaecf3 35%, #f0eef8 70%, #e6e4f2 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          padding: '36px 48px',
          alignItems: 'center',
        }}
      >
        {/* Decorative gradient orbs */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.10) 0%, transparent 70%)', top: '-200px', right: '100px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.06) 0%, transparent 70%)', bottom: '-150px', left: '100px', display: 'flex' }} />

        {/* ═══ Dashboard screenshot ═══ */}
        <div
          style={{
            width: '100%',
            maxWidth: '1060px',
            height: '320px',
            display: 'flex',
            borderRadius: '14px',
            border: '1px solid #d5d3e3',
            background: 'rgba(255,255,255,0.9)',
            boxShadow: '0 12px 48px rgba(108,92,231,0.10), 0 2px 8px rgba(0,0,0,0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: '40px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: 'linear-gradient(180deg, #7c6ef0 0%, #5b4fd4 100%)',
              paddingTop: '12px',
              gap: '8px',
            }}
          >
            <img src={llamaBase64} width={20} height={20} style={{ borderRadius: '4px' }} />
            <div style={{ width: '18px', height: '1px', background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
            {[true, false, false, false, false].map((active, i) => (
              <div
                key={i}
                style={{
                  width: '22px',
                  height: '22px',
                  borderRadius: '5px',
                  background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div style={{ width: '11px', height: '11px', borderRadius: '2px', border: `1.5px solid rgba(255,255,255,${active ? '0.95' : '0.3'})`, display: 'flex' }} />
              </div>
            ))}
          </div>

          {/* Content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Top bar */}
            <div
              style={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                padding: '0 14px',
                background: 'rgba(255,255,255,0.8)',
                borderBottom: '1px solid #e8e6f0',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '9px', fontWeight: 700, color: '#1e1b3a', display: 'flex' }}>Competitive Intel Overview</div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <div style={{ fontSize: '7px', color: '#9b95b3', padding: '2px 7px', borderRadius: '4px', border: '1px solid #e0dded', display: 'flex' }}>Past 24h</div>
                <div style={{ fontSize: '7px', fontWeight: 600, color: '#6c5ce7', padding: '2px 7px', borderRadius: '4px', background: 'rgba(108,92,231,0.1)', display: 'flex' }}>Generate Battlecard</div>
              </div>
            </div>

            {/* Metric row */}
            <div style={{ display: 'flex', gap: '6px', padding: '10px 12px 6px' }}>
              {[
                { label: 'Accounts', value: '24', color: '#6c5ce7' },
                { label: 'Threats', value: '7', color: '#da545b' },
                { label: 'Health', value: '82%', color: '#2ca66c' },
                { label: 'Signals', value: '156', color: '#1a8dff' },
              ].map((m) => (
                <div
                  key={m.label}
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '7px 8px',
                    borderRadius: '6px',
                    background: '#ffffff',
                    border: '1px solid #e8e6f0',
                    borderTop: `2.5px solid ${m.color}`,
                  }}
                >
                  <div style={{ fontSize: '7px', color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'flex' }}>{m.label}</div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: '#1e1b3a', display: 'flex' }}>{m.value}</div>
                  <div style={{ height: '3px', width: '60%', borderRadius: '2px', background: m.color, opacity: 0.3, marginTop: '3px', display: 'flex' }} />
                </div>
              ))}
            </div>

            {/* Chart + table */}
            <div style={{ display: 'flex', gap: '6px', padding: '4px 12px 12px', flex: 1, minHeight: 0 }}>
              {/* Chart */}
              <div style={{ flex: 5, display: 'flex', flexDirection: 'column', borderRadius: '6px', background: '#ffffff', border: '1px solid #e8e6f0', padding: '8px' }}>
                <div style={{ fontSize: '7px', fontWeight: 600, color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '6px' }}>Competitive Pulse</div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '3px' }}>
                  {[35, 55, 40, 70, 45, 65, 80, 50, 60, 42, 75, 58].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        borderRadius: '1.5px 1.5px 0 0',
                        background: i === 6 ? '#6c5ce7' : 'rgba(108,92,231,0.2)',
                        display: 'flex',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ flex: 7, display: 'flex', flexDirection: 'column', borderRadius: '6px', background: '#ffffff', border: '1px solid #e8e6f0', padding: '8px', gap: '4px' }}>
                <div style={{ fontSize: '7px', fontWeight: 600, color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '2px' }}>Top Accounts</div>
                {[
                  { name: 'Acme Corp', score: 92, color: '#2ca66c' },
                  { name: 'TechVault', score: 78, color: '#e5a00d' },
                  { name: 'DataFlow', score: 85, color: '#2ca66c' },
                  { name: 'CloudSync', score: 64, color: '#da545b' },
                ].map((a) => (
                  <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#e8e6f0', display: 'flex' }} />
                    <div style={{ fontSize: '8px', fontWeight: 500, flex: 1, color: '#1e1b3a', display: 'flex' }}>{a.name}</div>
                    <div style={{ width: '50px', height: '5px', borderRadius: '3px', background: '#f0eef8', display: 'flex', overflow: 'hidden' }}>
                      <div style={{ width: `${a.score}%`, height: '100%', borderRadius: '3px', background: a.color, display: 'flex' }} />
                    </div>
                    <div style={{ fontSize: '8px', fontWeight: 600, color: '#1e1b3a', width: '18px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>{a.score}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ Below: Badge + Logo + Description (horizontally stacked) ═══ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '1060px',
            marginTop: '28px',
            gap: '24px',
          }}
        >
          {/* Left: Badge + Logo + Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Badge */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: '#6c5ce7',
                display: 'flex',
              }}
            >
              Live Interactive Demo
            </div>

            {/* Logo + title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(145deg, rgba(108,92,231,0.12), rgba(108,92,231,0.04))',
                  border: '1.5px solid rgba(108,92,231,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src={llamaBase64} width={42} height={42} />
              </div>
              <div style={{ fontSize: '48px', fontWeight: 800, color: '#1e1b3a', letterSpacing: '-0.03em', lineHeight: 1, display: 'flex' }}>
                Intellibot
              </div>
            </div>
          </div>

          {/* Vertical accent line */}
          <div
            style={{
              width: '3px',
              height: '60px',
              borderRadius: '2px',
              background: 'linear-gradient(180deg, #6c5ce7, #1a8dff)',
              display: 'flex',
              marginLeft: '16px',
              marginRight: '16px',
            }}
          />

          {/* Right: Description + Author */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <div
              style={{
                fontSize: '28px',
                fontWeight: 500,
                color: '#4a4565',
                lineHeight: 1.3,
                display: 'flex',
              }}
            >
              Real-time comp intel for AI-native teams.
            </div>

            {/* Signed by — single line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={headshotBase64}
                width={28}
                height={28}
                style={{ borderRadius: '50%', border: '2px solid rgba(108,92,231,0.2)' }}
              />
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#6b6589', display: 'flex' }}>
                Daria Zhao · SF PMM Community
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
