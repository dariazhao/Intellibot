import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Intellibot — Self-Serve Competitive Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const llamaData = await readFile(join(process.cwd(), 'public', 'llama.png'));
  const llamaBase64 = `data:image/png;base64,${llamaData.toString('base64')}`;

  const miniCard = {
    background: '#ffffff',
    borderRadius: '6px',
    border: '1px solid #d5d3e3',
    boxShadow: '0 1px 4px rgba(108,92,231,0.06)',
  };

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
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.10) 0%, transparent 70%)', top: '-200px', left: '100px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.06) 0%, transparent 70%)', bottom: '-150px', right: '100px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(44,166,108,0.05) 0%, transparent 70%)', bottom: '50px', left: '-50px', display: 'flex' }} />

        {/* ═══ Left: Hero branding ═══ */}
        <div
          style={{
            width: '520px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 40px 50px',
          }}
        >
          {/* Llama logo — large and prominent */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '160px',
              height: '160px',
              borderRadius: '36px',
              background: 'linear-gradient(145deg, rgba(108,92,231,0.12), rgba(108,92,231,0.04))',
              border: '2px solid rgba(108,92,231,0.15)',
              boxShadow: '0 8px 40px rgba(108,92,231,0.12), 0 0 0 8px rgba(108,92,231,0.04)',
              marginBottom: '28px',
            }}
          >
            <img src={llamaBase64} width={120} height={120} />
          </div>

          {/* Product name */}
          <div
            style={{
              fontSize: '52px',
              fontWeight: 800,
              color: '#1e1b3a',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              display: 'flex',
              marginBottom: '12px',
            }}
          >
            Intellibot
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '17px',
              fontWeight: 500,
              color: '#6b6589',
              textAlign: 'center',
              lineHeight: 1.4,
              display: 'flex',
              marginBottom: '24px',
            }}
          >
            Self-Serve Competitive Intelligence
          </div>

          {/* Accent line */}
          <div
            style={{
              width: '60px',
              height: '3px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #6c5ce7, #1a8dff)',
              display: 'flex',
              marginBottom: '20px',
            }}
          />

          {/* Made by */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '12px',
              color: '#9b95b3',
            }}
          >
            <div style={{ display: 'flex' }}>Made with</div>
            <div style={{ color: '#da545b', display: 'flex', fontSize: '13px' }}>&#10084;</div>
            <div style={{ display: 'flex' }}>by Daria</div>
          </div>
        </div>

        {/* ═══ Right: Mini dashboard preview ═══ */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '30px 30px 30px 0',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '14px',
              border: '1px solid #d5d3e3',
              background: 'rgba(255,255,255,0.5)',
              boxShadow: '0 12px 48px rgba(108,92,231,0.10), 0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Mini sidebar + content */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
              {/* Sidebar */}
              <div
                style={{
                  width: '36px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  background: 'linear-gradient(180deg, #7c6ef0 0%, #5b4fd4 100%)',
                  paddingTop: '10px',
                  gap: '7px',
                }}
              >
                <img src={llamaBase64} width={20} height={20} style={{ borderRadius: '5px' }} />
                <div style={{ width: '16px', height: '1px', background: 'rgba(255,255,255,0.2)', display: 'flex' }} />
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
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', border: `1.5px solid rgba(255,255,255,${active ? '0.95' : '0.35'})`, display: 'flex' }} />
                  </div>
                ))}
              </div>

              {/* Content area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Top bar */}
                <div
                  style={{
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    background: 'rgba(255,255,255,0.7)',
                    borderBottom: '1px solid #e8e6f0',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ fontSize: '8px', fontWeight: 700, color: '#1e1b3a', display: 'flex' }}>Competitive Intel Overview</div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <div style={{ fontSize: '6px', color: '#9b95b3', padding: '2px 6px', borderRadius: '4px', border: '1px solid #e0dded', display: 'flex' }}>Past 24h</div>
                    <div style={{ fontSize: '6px', fontWeight: 600, color: '#6c5ce7', padding: '2px 6px', borderRadius: '4px', background: 'rgba(108,92,231,0.1)', display: 'flex' }}>Battlecard</div>
                  </div>
                </div>

                {/* Metric cards row */}
                <div style={{ display: 'flex', gap: '5px', padding: '8px 10px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Win Rate', value: '68.4%', color: '#6c5ce7' },
                    { label: 'Deals', value: '142', color: '#1a8dff' },
                    { label: 'Battlecards', value: '847', color: '#2ca66c' },
                    { label: 'Signals', value: '23', color: '#e5a00d' },
                    { label: 'At Risk', value: '$4.2M', color: '#da545b' },
                  ].map((w) => (
                    <div
                      key={w.label}
                      style={{
                        ...miniCard,
                        flex: 1,
                        minWidth: '90px',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '6px 8px',
                        borderTop: `2px solid ${w.color}`,
                      }}
                    >
                      <div style={{ fontSize: '6px', color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, display: 'flex' }}>{w.label}</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b3a', display: 'flex', marginTop: '1px' }}>{w.value}</div>
                      <div style={{ display: 'flex', gap: '1px', marginTop: '3px', alignItems: 'flex-end', height: '10px' }}>
                        {[40,55,35,65,50,70,45,80,60,75,90,70].map((h, i) => (
                          <div key={i} style={{ flex: 1, height: `${h}%`, background: w.color, borderRadius: '0.5px', opacity: 0.2 + (i / 15), display: 'flex' }} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom panels */}
                <div style={{ display: 'flex', gap: '5px', padding: '0 10px 8px', flex: 1, minHeight: 0 }}>
                  {/* Competitive Pulse */}
                  <div style={{ ...miniCard, width: '220px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '5px 8px', borderBottom: '1px solid #e8e6f0', display: 'flex' }}>
                      <div style={{ fontSize: '6px', color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, display: 'flex' }}>Competitive Pulse</div>
                    </div>
                    {[
                      { name: 'Synthetica AI', color: '#da545b' },
                      { name: 'Lakehouse.io', color: '#da545b' },
                      { name: 'NeuralEdge', color: '#e5a00d' },
                      { name: 'DataVault', color: '#e5a00d' },
                      { name: 'OpenML', color: '#2ca66c' },
                    ].map((c) => (
                      <div key={c.name} style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #f4f3f8', gap: '5px' }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: c.color, display: 'flex' }} />
                        <div style={{ fontSize: '7px', fontWeight: 500, color: '#1e1b3a', flex: 1, display: 'flex' }}>{c.name}</div>
                        <div style={{ display: 'flex', gap: '0.5px', alignItems: 'flex-end', height: '10px' }}>
                          {[3,5,4,7,6,8,5,9,7,10,8,11].map((h, i) => (
                            <div key={i} style={{ width: '1.5px', height: `${h * 0.9}px`, background: c.color, borderRadius: '0.5px', opacity: 0.3 + (i / 16), display: 'flex' }} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Events */}
                  <div style={{ ...miniCard, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ padding: '5px 8px', borderBottom: '1px solid #e8e6f0', display: 'flex' }}>
                      <div style={{ fontSize: '6px', color: '#6b6589', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600, display: 'flex' }}>Event Stream</div>
                    </div>
                    {[
                      { entity: 'COMPETITOR', eColor: '#da545b', title: 'Synthetica AI raises $180M' },
                      { entity: 'PROSPECT', eColor: '#1a8dff', title: 'Demo: Customer Segmentation' },
                      { entity: 'COMPETITOR', eColor: '#da545b', title: 'NeuralEdge launches LLM' },
                      { entity: 'CUSTOMER', eColor: '#2ca66c', title: 'Expansion Discovery Call' },
                      { entity: 'CUSTOMER', eColor: '#2ca66c', title: 'QBR — Meridian Platform' },
                    ].map((e, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '4px 8px', borderBottom: '1px solid #f4f3f8', gap: '4px' }}>
                        <div style={{ fontSize: '5px', fontWeight: 700, color: e.eColor, background: `${e.eColor}12`, padding: '1px 3px', borderRadius: '2px', letterSpacing: '0.04em', display: 'flex' }}>{e.entity}</div>
                        <div style={{ fontSize: '7px', fontWeight: 500, color: '#1e1b3a', display: 'flex', flex: 1 }}>{e.title}</div>
                      </div>
                    ))}
                  </div>
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
