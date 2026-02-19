import { Suspense, useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Html, OrbitControls, useGLTF } from '@react-three/drei';
import FallbackViewer from '@/components/FallbackViewer';

function supportsWebGL() {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
}

function isLowPowerDevice() {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return cores <= 4 || memory <= 4 || prefersReduced;
}

function applyMaterialSettings(material, { color, roughness, metalness }) {
  if (!material) {
    return;
  }

  if ('color' in material) {
    material.color.set(color);
  }
  if ('roughness' in material) {
    material.roughness = roughness;
  }
  if ('metalness' in material) {
    material.metalness = metalness;
  }

  material.needsUpdate = true;
}

function ProceduralPackage({ color, roughness, metalness }) {
  return (
    <group>
      {/* Main body placeholder for packaging preview */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 2.1, 1.2]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>

      {/* Top segment */}
      <mesh castShadow receiveShadow position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.56, 0.56, 0.35, 40]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>
    </group>
  );
}

function GLTFModel({ modelUrl, materialControls }) {
  const { scene } = useGLTF(modelUrl);
  const clone = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    clone.traverse((node) => {
      if (!node.isMesh) {
        return;
      }

      node.castShadow = true;
      node.receiveShadow = true;

      if (Array.isArray(node.material)) {
        node.material.forEach((mat) => applyMaterialSettings(mat, materialControls));
      } else {
        applyMaterialSettings(node.material, materialControls);
      }
    });
  }, [clone, materialControls]);

  return <primitive object={clone} scale={1.15} />;
}

export default function ProductViewer3D({
  title = 'Produktvorschau',
  modelUrl = '',
  adaptiveFallback = true,
  compact = false
}) {
  const [interactive, setInteractive] = useState(true);
  const [fallbackReason, setFallbackReason] = useState('3D-Vorschau ist aktuell nicht verfuegbar.');
  const [lightIntensity, setLightIntensity] = useState(1.1);
  const [roughness, setRoughness] = useState(0.5);
  const [metalness, setMetalness] = useState(0.2);
  const [color, setColor] = useState('#c9d9cf');

  const materialControls = useMemo(
    () => ({
      color,
      roughness,
      metalness
    }),
    [color, roughness, metalness]
  );

  useEffect(() => {
    if (!supportsWebGL()) {
      setInteractive(false);
      setFallbackReason('WebGL wurde in diesem Browser nicht erkannt.');
      return;
    }

    if (adaptiveFallback && isLowPowerDevice()) {
      setInteractive(false);
      setFallbackReason('3D wurde auf einem Low-Power-Profil automatisch reduziert.');
      return;
    }

    setInteractive(true);
  }, [adaptiveFallback]);

  if (!interactive) {
    return <FallbackViewer reason={fallbackReason} />;
  }

  return (
    <div className={compact ? 'viewer-shell viewer-shell-compact' : 'viewer-shell'}>
      <div className="viewer-canvas" role="img" aria-label={`Interaktive 3D-Ansicht: ${title}`}>
        <Canvas shadows dpr={[1, 1.7]} camera={{ position: [0, 1.3, 3.2], fov: 46 }}>
          <color attach="background" args={['#edf2ed']} />
          <ambientLight intensity={0.55 * lightIntensity} />
          <directionalLight
            castShadow
            position={[2.7, 4, 2]}
            intensity={1.05 * lightIntensity}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[-2, 1.2, -1]} intensity={0.42 * lightIntensity} />

          <Suspense fallback={<Html center>3D-Modell wird geladen...</Html>}>
            {modelUrl ? (
              <GLTFModel modelUrl={modelUrl} materialControls={materialControls} />
            ) : (
              <ProceduralPackage
                color={materialControls.color}
                roughness={materialControls.roughness}
                metalness={materialControls.metalness}
              />
            )}
            <Environment preset="city" />
          </Suspense>

          <mesh rotation-x={-Math.PI / 2} position={[0, -1.25, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.2} />
          </mesh>

          <OrbitControls
            enablePan={false}
            enableZoom
            minDistance={1.8}
            maxDistance={5.8}
            autoRotate
            autoRotateSpeed={0.7}
          />
        </Canvas>
      </div>

      {!compact && (
        <aside className="viewer-panel" aria-label="Licht und Materialeinstellungen">
          <div className="field">
            <label htmlFor="viewer-color">Materialfarbe</label>
            <input id="viewer-color" type="color" value={color} onChange={(event) => setColor(event.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="viewer-roughness">Rauheit ({roughness.toFixed(2)})</label>
            <input
              id="viewer-roughness"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={roughness}
              onChange={(event) => setRoughness(Number(event.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="viewer-metalness">Metallik ({metalness.toFixed(2)})</label>
            <input
              id="viewer-metalness"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={metalness}
              onChange={(event) => setMetalness(Number(event.target.value))}
            />
          </div>

          <div className="field">
            <label htmlFor="viewer-light">Licht ({lightIntensity.toFixed(2)})</label>
            <input
              id="viewer-light"
              type="range"
              min="0.4"
              max="2"
              step="0.05"
              value={lightIntensity}
              onChange={(event) => setLightIntensity(Number(event.target.value))}
            />
          </div>

          <p className="small">Drehen: Drag. Zoomen: Scroll/Pinch. GLB/GLTF via Produktfeld modelUrl.</p>
        </aside>
      )}
    </div>
  );
}
