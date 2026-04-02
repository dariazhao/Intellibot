import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Intellibot | Self-Serve Deal Hub';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const imgData = await readFile(join(process.cwd(), 'public', 'og-preview.png'));
  const imgBase64 = `data:image/png;base64,${imgData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1633 0%, #231f3e 25%, #2a2060 50%, #1e2a52 75%, #1a3a5c 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Texture: gradient orbs */}
        <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(108,92,231,0.2) 0%, transparent 60%)', top: '-250px', left: '-100px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(26,141,255,0.15) 0%, transparent 60%)', bottom: '-200px', right: '-80px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(44,166,108,0.08) 0%, transparent 60%)', top: '100px', right: '200px', display: 'flex' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 60%)', bottom: '50px', left: '300px', display: 'flex' }} />

        {/* Subtle grid dots texture */}
        {Array.from({ length: 12 }).map((_, row) =>
          Array.from({ length: 20 }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              style={{
                position: 'absolute',
                width: '2px',
                height: '2px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                top: `${50 + row * 50}px`,
                left: `${50 + col * 58}px`,
                display: 'flex',
              }}
            />
          ))
        )}

        {/* Screenshot with frame */}
        <div
          style={{
            display: 'flex',
            borderRadius: '16px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(108,92,231,0.15), 0 0 120px rgba(108,92,231,0.1)',
            overflow: 'hidden',
          }}
        >
          <img
            src={imgBase64}
            width={1080}
            height={568}
            style={{ objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
