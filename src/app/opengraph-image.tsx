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
          background: 'linear-gradient(145deg, #dfe2f0 0%, #eaecf3 35%, #f0eef8 70%, #e6e4f2 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative gradient orbs */}
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.10) 0%, transparent 70%)', top: '-200px', right: '200px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.06) 0%, transparent 70%)', bottom: '-150px', left: '100px', display: 'flex' }} />

        {/* ═══ Card container (centered) ═══ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            padding: '40px 60px',
          }}
        >
          {/* The "tour card" frame */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              background: 'rgba(255,255,255,0.85)',
              borderRadius: '20px',
              border: '1px solid #d5d3e3',
              boxShadow: '0 20px 60px rgba(108,92,231,0.12), 0 4px 12px rgba(0,0,0,0.04)',
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}
          >
            {/* Left: Mini app preview */}
            <div
              style={{
                width: '520px',
                display: 'flex',
                padding: '24px',
                background: 'linear-gradient(135deg, rgba(108,92,231,0.08) 0%, rgba(26,141,255,0.05) 50%, rgba(44,166,108,0.06) 100%)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative blurs inside */}
              <div style={{ position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(108,92,231,0.06)', top: '-60px', right: '-40px', display: 'flex', filter: 'blur(40px)' }} />
              <div style={{ position: 'absolute', width: '160px', height: '160px', borderRadius: '50%', background: 'rgba(26,141,255,0.05)', bottom: '-40px', left: '-20px', display: 'flex', filter: 'blur(30px)' }} />

              {/* Mini app frame */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  borderRadius: '12px',
                  border: '1px solid #d5d3e3',
                  background: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 8px 32px rgba(108,92,231,0.08)',
                  overflow: 'hidden',
                }}
              >
                {/* Sidebar */}
                <div
                  style={{
                    width: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'linear-gradient(180deg, #7c6ef0 0%, #5b4fd4 100%)',
                    paddingTop: '12px',
                    gap: '8px',
                  }}
                >
                  <img src={llamaBase64} width={18} height={18} style={{ borderRadius: '4px' }} />
                  <div style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
                  {[true, false, false, false, false].map((active, i) => (
                    <div
                      key={i}
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        background: active ? 'rgba(255,255,255,0.22)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: `1.5px solid rgba(255,255,255,${active ? '0.95' : '0.3'})`, display: 'flex' }} />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Top bar */}
                  <div
                    style={{
                      height: '26px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 10px',
                      background: 'rgba(255,255,255,0.8)',
                      borderBottom: '1px solid #e8e6f0',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ fontSize: '7px', fontWeight: 700, color: '#1e1b3a', display: 'flex' }}>Competitive Intel Overview</div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <div style={{ fontSize: '5px', color: '#9b95b3', padding: '2px 5px', borderRadius: '3px', border: '1px solid #e0dded', display: 'flex' }}>Past 24h</div>
                      <div style={{ fontSize: '5px', fontWeight: 600, color: '#6c5ce7', padding: '2px 5px', borderRadius: '3px', background: 'rgba(108,92,231,0.1)', display: 'flex' }}>Magic Battlecard</div>
                    </div>
                  </div>

                  {/* Metric row */}
                  <div style={{ display: 'flex', gap: '4px', padding: '8px 8px 4px' }}>
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
                          padding: '5px 6px',
                          borderRadius: '5px',
                          background: '#ffffff',
                          border: '1px solid #e8e6f0',
                          borderTop: `2px solid ${m.color}`,
                        }}
                      >
                        <div style={{ fontSize: '5px', color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'flex' }}>{m.label}</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e1b3a', display: 'flex' }}>{m.value}</div>
                        <div style={{ height: '3px', width: '60%', borderRadius: '2px', background: m.color, opacity: 0.3, marginTop: '3px', display: 'flex' }} />
                      </div>
                    ))}
                  </div>

                  {/* Chart + table */}
                  <div style={{ display: 'flex', gap: '4px', padding: '4px 8px 8px', flex: 1, minHeight: 0 }}>
                    {/* Chart */}
                    <div style={{ flex: 5, display: 'flex', flexDirection: 'column', borderRadius: '5px', background: '#ffffff', border: '1px solid #e8e6f0', padding: '6px' }}>
                      <div style={{ fontSize: '5px', fontWeight: 600, color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '4px' }}>Competitive Pulse</div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                        {[35, 55, 40, 70, 45, 65, 80, 50, 60, 42, 75, 58].map((h, i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: `${h}%`,
                              borderRadius: '1px 1px 0 0',
                              background: i === 6 ? '#6c5ce7' : 'rgba(108,92,231,0.2)',
                              display: 'flex',
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Table */}
                    <div style={{ flex: 7, display: 'flex', flexDirection: 'column', borderRadius: '5px', background: '#ffffff', border: '1px solid #e8e6f0', padding: '6px', gap: '3px' }}>
                      <div style={{ fontSize: '5px', fontWeight: 600, color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', marginBottom: '2px' }}>Top Accounts</div>
                      {[
                        { name: 'Acme Corp', score: 92, color: '#2ca66c' },
                        { name: 'TechVault', score: 78, color: '#e5a00d' },
                        { name: 'DataFlow', score: 85, color: '#2ca66c' },
                        { name: 'CloudSync', score: 64, color: '#da545b' },
                      ].map((a) => (
                        <div key={a.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#e8e6f0', display: 'flex' }} />
                          <div style={{ fontSize: '6px', fontWeight: 500, flex: 1, color: '#1e1b3a', display: 'flex' }}>{a.name}</div>
                          <div style={{ width: '40px', height: '4px', borderRadius: '2px', background: '#f0eef8', display: 'flex', overflow: 'hidden' }}>
                            <div style={{ width: `${a.score}%`, height: '100%', borderRadius: '2px', background: a.color, display: 'flex' }} />
                          </div>
                          <div style={{ fontSize: '6px', fontWeight: 600, color: '#1e1b3a', width: '16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}>{a.score}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Copy */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '40px 48px',
              }}
            >
              {/* Badge */}
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#6c5ce7',
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                Interactive Demo
              </div>

              {/* Logo + title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'linear-gradient(145deg, rgba(108,92,231,0.12), rgba(108,92,231,0.04))',
                    border: '1.5px solid rgba(108,92,231,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img src={llamaBase64} width={36} height={36} />
                </div>
                <div style={{ fontSize: '36px', fontWeight: 800, color: '#1e1b3a', letterSpacing: '-0.02em', display: 'flex' }}>
                  Intellibot
                </div>
              </div>

              {/* Description */}
              <div
                style={{
                  fontSize: '17px',
                  fontWeight: 400,
                  color: '#6b6589',
                  lineHeight: 1.55,
                  marginBottom: '28px',
                  display: 'flex',
                }}
              >
                A competitive intelligence platform built live with Claude Code at a PMM workshop in SF.
              </div>

              {/* Accent line */}
              <div
                style={{
                  width: '48px',
                  height: '3px',
                  borderRadius: '2px',
                  background: 'linear-gradient(90deg, #6c5ce7, #1a8dff)',
                  display: 'flex',
                  marginBottom: '20px',
                }}
              />

              {/* Signed by */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={headshotBase64}
                  width={36}
                  height={36}
                  style={{ borderRadius: '50%', border: '2px solid rgba(108,92,231,0.2)' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e1b3a', display: 'flex' }}>Daria Zhao</div>
                  <div style={{ fontSize: '11px', color: '#9b95b3', display: 'flex' }}>SF PMM Community</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
