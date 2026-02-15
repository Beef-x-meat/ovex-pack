import { useState } from 'react';
import SeoHead from '@/components/SeoHead';
import Viewer from '@/components/Viewer';

export default function ViewerPage() {
  const [modelPath, setModelPath] = useState('');

  return (
    <>
      <SeoHead
        title="3D Produktviewer"
        description="Dedizierter 3D Viewer mit Rotation, Zoom und Material-/Lichtsteuerung fuer Packaging-Prototypen."
        path="/viewer"
      />

      <section className="section">
        <div className="container panel">
          <p className="eyebrow">3D Studio</p>
          <h1 className="section-title">Viewer fuer GLB / GLTF Assets</h1>
          <p className="section-copy">
            Hinterlege ein Modell im Ordner public/models und gib den Pfad an, z. B. /models/dein-modell.glb.
            Ohne Pfad bleibt der neutrale Placeholder aktiv.
          </p>

          <label htmlFor="modelPath" className="small">
            Optionaler Modellpfad
          </label>
          <input
            id="modelPath"
            className="input"
            type="text"
            placeholder="/models/dein-modell.glb"
            value={modelPath}
            onChange={(event) => setModelPath(event.target.value)}
          />

          <div style={{ marginTop: '14px' }}>
            <Viewer title="Viewer Test" modelUrl={modelPath.trim()} adaptiveFallback />
          </div>
        </div>
      </section>
    </>
  );
}
