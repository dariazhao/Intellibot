import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Intellibot — Self-Serve Competitive Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1633 0%, #231f3e 40%, #1a1633 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            opacity: 0.06,
            backgroundImage:
              'linear-gradient(#632CA6 1px, transparent 1px), linear-gradient(90deg, #632CA6 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #632CA6, #1a8dff, #2ca66c, #e5a00d)',
            display: 'flex',
          }}
        />

        {/* Bot icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100px',
            height: '100px',
            borderRadius: '24px',
            background: '#632CA6',
            marginBottom: '32px',
            position: 'relative',
          }}
        >
          {/* Simple bot face */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#e2dff0', display: 'flex' }} />
            </div>
            <div style={{ width: '36px', height: '6px', borderRadius: '3px', background: '#e2dff0', opacity: 0.8, display: 'flex' }} />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: '#e2dff0',
            letterSpacing: '-0.02em',
            marginBottom: '12px',
            display: 'flex',
          }}
        >
          Intellibot
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '26px',
            fontWeight: 400,
            color: '#8c86a5',
            marginBottom: '48px',
            display: 'flex',
          }}
        >
          Self-Serve Competitive Intelligence Hub
        </div>

        {/* Mini dashboard mockup */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            padding: '0 60px',
          }}
        >
          {/* Widget 1 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              height: '90px',
              background: '#231f3e',
              borderRadius: '12px',
              border: '1px solid #3a3460',
              borderTop: '3px solid #632CA6',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex' }}>Win Rate</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#e2dff0', marginTop: '4px', display: 'flex' }}>68.4%</div>
          </div>

          {/* Widget 2 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              height: '90px',
              background: '#231f3e',
              borderRadius: '12px',
              border: '1px solid #3a3460',
              borderTop: '3px solid #1a8dff',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex' }}>Active Deals</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#e2dff0', marginTop: '4px', display: 'flex' }}>142</div>
          </div>

          {/* Widget 3 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              height: '90px',
              background: '#231f3e',
              borderRadius: '12px',
              border: '1px solid #3a3460',
              borderTop: '3px solid #2ca66c',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex' }}>Battlecards</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#e2dff0', marginTop: '4px', display: 'flex' }}>847</div>
          </div>

          {/* Widget 4 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '200px',
              height: '90px',
              background: '#231f3e',
              borderRadius: '12px',
              border: '1px solid #3a3460',
              borderTop: '3px solid #e5a00d',
              padding: '14px 16px',
            }}
          >
            <div style={{ fontSize: '11px', color: '#8c86a5', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex' }}>Comp Signals</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#e2dff0', marginTop: '4px', display: 'flex' }}>23</div>
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#8c86a5',
            fontSize: '14px',
          }}
        >
          <div style={{ display: 'flex' }}>Made with</div>
          <div style={{ color: '#da545b', display: 'flex' }}>&#10084;</div>
          <div style={{ display: 'flex' }}>by Daria</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
