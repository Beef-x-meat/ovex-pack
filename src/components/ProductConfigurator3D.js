import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, Text, useGLTF } from '@react-three/drei';
import {
  Box,
  Eye,
  Image as ImageIcon,
  Palette,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  Type,
  Upload,
  X
} from 'lucide-react';
import {
  Component,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import * as THREE from 'three';
import {
  coreModelFamilies,
  detectProductModelId,
  getCoreFamily,
  getProductModel,
  getVariant,
  modelAssetUrls,
  productModelCatalog
} from '@/lib/model-catalog';

const COLOR_PRESETS = [
  { name: 'Naturweiss', color: '#f9f7f2' },
  { name: 'Kraft', color: '#bea47f' },
  { name: 'Graphit', color: '#1f242b' },
  { name: 'Navy', color: '#2f4268' },
  { name: 'Bordeaux', color: '#6b2d35' },
  { name: 'Waldgruen', color: '#39564a' }
];

const MATERIAL_PRESETS = [
  {
    id: 'paper-natural',
    label: 'Natural Paper',
    settings: { roughness: 0.74, metalness: 0.02, clearcoat: 0.07, envMapIntensity: 0.78 }
  },
  {
    id: 'paper-coated',
    label: 'Soft Coated',
    settings: { roughness: 0.54, metalness: 0.05, clearcoat: 0.22, envMapIntensity: 1.05 }
  },
  {
    id: 'paper-premium',
    label: 'Premium Matte',
    settings: { roughness: 0.48, metalness: 0.08, clearcoat: 0.16, envMapIntensity: 1.12 }
  }
];

const STAGE_PRESETS = [
  {
    id: 'studio',
    label: 'Studio',
    background: '#f3f5f8',
    environment: 'studio',
    key: 1.2,
    fill: 0.42,
    rim: 0.3
  },
  {
    id: 'gallery',
    label: 'Gallery',
    background: '#eef1f5',
    environment: 'city',
    key: 1,
    fill: 0.36,
    rim: 0.24
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    background: '#eceff3',
    environment: 'warehouse',
    key: 1.16,
    fill: 0.28,
    rim: 0.2
  }
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getMaterialSettings(materialPreset, roughnessBias = 0, metalnessBias = 0) {
  const preset = MATERIAL_PRESETS.find((item) => item.id === materialPreset) || MATERIAL_PRESETS[0];
  return {
    roughness: clamp(preset.settings.roughness + roughnessBias, 0.05, 1),
    metalness: clamp(preset.settings.metalness + metalnessBias, 0, 1),
    clearcoat: clamp(preset.settings.clearcoat + metalnessBias * 0.4, 0, 1),
    envMapIntensity: clamp(preset.settings.envMapIntensity + metalnessBias * 0.6, 0.4, 2)
  };
}

function BrandPlate({ logoTexture, customText, brandOffset }) {
  if (!logoTexture && !customText) {
    return null;
  }

  return (
    <group position={brandOffset || [0, 0.03, 0.84]}>
      {logoTexture ? (
        <mesh>
          <planeGeometry args={[0.52, 0.28]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent
            roughness={0.24}
            metalness={0}
            emissive="#ffffff"
            emissiveIntensity={0.05}
          />
        </mesh>
      ) : (
        <>
          <mesh>
            <planeGeometry args={[0.54, 0.28]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.32} metalness={0.02} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.06}
            color="#111827"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.46}
          >
            {customText}
          </Text>
        </>
      )}
    </group>
  );
}

function PremiumModel({
  modelUrl,
  rotation,
  variantScale,
  baseColor,
  tintStrength,
  materialSettings,
  autoRotate,
  logoTexture,
  customText,
  brandOffset
}) {
  const { scene } = useGLTF(modelUrl);
  const groupRef = useRef(null);

  const preparedScene = useMemo(() => {
    const tint = new THREE.Color(baseColor);
    const root = scene.clone(true);

    root.rotation.set(rotation[0], rotation[1], rotation[2]);

    root.traverse((node) => {
      if (!node.isMesh) {
        return;
      }

      node.castShadow = true;
      node.receiveShadow = true;

      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => {
        if (!material) {
          return;
        }

        if ('roughness' in material) {
          material.roughness = materialSettings.roughness;
        }
        if ('metalness' in material) {
          material.metalness = materialSettings.metalness;
        }
        if ('clearcoat' in material) {
          material.clearcoat = materialSettings.clearcoat;
        }
        if ('envMapIntensity' in material) {
          material.envMapIntensity = materialSettings.envMapIntensity;
        }

        if ('color' in material) {
          const current = material.color.clone();
          material.color.copy(current.lerp(tint, tintStrength));
        }

        material.needsUpdate = true;
      });
    });

    const firstBox = new THREE.Box3().setFromObject(root);
    const size = firstBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = (1.6 / maxDim) * variantScale;
    root.scale.setScalar(normalizedScale);

    const finalBox = new THREE.Box3().setFromObject(root);
    const center = finalBox.getCenter(new THREE.Vector3());
    const floorY = -0.72;

    root.position.x -= center.x;
    root.position.z -= center.z;
    root.position.y += floorY - finalBox.min.y;

    return root;
  }, [scene, rotation, variantScale, baseColor, tintStrength, materialSettings]);

  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.34;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={preparedScene} />
      <BrandPlate logoTexture={logoTexture} customText={customText} brandOffset={brandOffset} />
    </group>
  );
}

function Scene({
  stagePreset,
  modelUrl,
  rotation,
  variantScale,
  baseColor,
  tintStrength,
  materialSettings,
  lightIntensity,
  autoRotate,
  logoTexture,
  customText,
  brandOffset
}) {
  return (
    <>
      <color attach="background" args={[stagePreset.background]} />

      <ambientLight intensity={0.52 * lightIntensity} />
      <directionalLight
        position={[3.1, 5.1, 2.4]}
        intensity={stagePreset.key * lightIntensity}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3.2, 2.7, -1.8]} intensity={stagePreset.fill * lightIntensity} />
      <pointLight position={[0, 1.8, 3.2]} intensity={stagePreset.rim * lightIntensity} />

      <mesh position={[0, -0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[3.8, 120]} />
        <meshStandardMaterial color="#ebeef3" roughness={0.96} metalness={0} />
      </mesh>

      <mesh position={[0, 0.32, -1.4]} rotation={[-0.16, 0, 0]}>
        <planeGeometry args={[8.6, 4.5]} />
        <meshStandardMaterial color="#f3f5f8" roughness={1} metalness={0} />
      </mesh>

      <PremiumModel
        modelUrl={modelUrl}
        rotation={rotation}
        variantScale={variantScale}
        baseColor={baseColor}
        tintStrength={tintStrength}
        materialSettings={materialSettings}
        autoRotate={autoRotate}
        logoTexture={logoTexture}
        customText={customText}
        brandOffset={brandOffset}
      />

      <ContactShadows position={[0, -0.84, 0]} opacity={0.3} scale={3.4} blur={2.6} far={2.4} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.45}
        maxDistance={4.5}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 1.65}
        autoRotate={false}
      />

      <Environment preset={stagePreset.environment} />
    </>
  );
}

function isWebGLAvailable() {
  try {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

function isLowPowerDevice() {
  if (typeof navigator === 'undefined' || typeof window === 'undefined') {
    return false;
  }

  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  const reducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return cores <= 4 || memory <= 4 || reducedMotion;
}

class Canvas3DErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function WebGLFallback({
  description =
    'Ihr Browser unterstuetzt kein WebGL. Die 3D-Vorschau ist auf anderen Geraeten verfuegbar.'
}) {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8 apple-card rounded-3xl"
      style={{ minHeight: 360 }}
      data-testid="webgl-fallback"
    >
      <Box className="w-12 h-12 text-primary mb-3" />
      <p className="font-semibold mb-1">3D-Vorschau nicht verfuegbar</p>
      <p className="text-sm text-muted-foreground max-w-sm">{description}</p>
    </div>
  );
}

export default function ProductConfigurator3D({
  productType = 'cup',
  productName = 'Produkt',
  productCategory = '',
  mode = 'full'
}) {
  const isMinimalMode = mode === 'minimal';

  const initialProductId = useMemo(
    () => detectProductModelId({ productType, productCategory, productName }),
    [productType, productCategory, productName]
  );

  const initialCore = useMemo(() => getProductModel(initialProductId).defaultCore || 'cup', [initialProductId]);

  const [workspace, setWorkspace] = useState(productCategory ? 'products' : 'core');
  const [selectedCoreFamilyId, setSelectedCoreFamilyId] = useState(initialCore);
  const [selectedCoreVariantId, setSelectedCoreVariantId] = useState(getCoreFamily(initialCore).variants[0].id);
  const [selectedProductId, setSelectedProductId] = useState(initialProductId);

  const [baseColor, setBaseColor] = useState('#f9f7f2');
  const [materialPreset, setMaterialPreset] = useState('paper-natural');
  const [stagePresetId, setStagePresetId] = useState('studio');
  const [lightIntensity, setLightIntensity] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);

  const [logoTexture, setLogoTexture] = useState(null);
  const [logoFileName, setLogoFileName] = useState('');
  const [customText, setCustomText] = useState('');

  const [force3D, setForce3D] = useState(false);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (productCategory) {
      setWorkspace('products');
      setSelectedProductId(initialProductId);
      const nextCore = getProductModel(initialProductId).defaultCore || 'cup';
      setSelectedCoreFamilyId(nextCore);
      setSelectedCoreVariantId(getCoreFamily(nextCore).variants[0].id);
    }
  }, [productCategory, initialProductId]);

  useEffect(() => {
    setSelectedCoreVariantId(getCoreFamily(selectedCoreFamilyId).variants[0].id);
  }, [selectedCoreFamilyId]);

  useEffect(() => {
    return () => {
      if (logoTexture) {
        logoTexture.dispose();
      }
    };
  }, [logoTexture]);

  const webglAvailable = useMemo(() => isWebGLAvailable(), []);
  const lowPower = useMemo(() => isLowPowerDevice(), []);
  const disable3D = !webglAvailable || (lowPower && !force3D);

  const activeCoreFamily = useMemo(() => getCoreFamily(selectedCoreFamilyId), [selectedCoreFamilyId]);
  const activeCoreVariant = useMemo(
    () => getVariant(selectedCoreFamilyId, selectedCoreVariantId),
    [selectedCoreFamilyId, selectedCoreVariantId]
  );
  const activeProductModel = useMemo(() => getProductModel(selectedProductId), [selectedProductId]);

  const activeStagePreset = useMemo(
    () => STAGE_PRESETS.find((item) => item.id === stagePresetId) || STAGE_PRESETS[0],
    [stagePresetId]
  );

  const activeMaterialSettings = useMemo(() => {
    if (workspace === 'core') {
      return getMaterialSettings(
        materialPreset,
        activeCoreVariant.roughnessBias || 0,
        activeCoreVariant.metalnessBias || 0
      );
    }
    return getMaterialSettings(materialPreset);
  }, [workspace, materialPreset, activeCoreVariant]);

  const sceneConfig = useMemo(() => {
    if (workspace === 'core') {
      return {
        title: `${activeCoreFamily.label} / ${activeCoreVariant.label}`,
        modelUrl: activeCoreFamily.modelUrl,
        rotation: [
          activeCoreFamily.baseRotation?.[0] || 0,
          (activeCoreFamily.baseRotation?.[1] || 0) + (activeCoreVariant.rotationY || 0),
          activeCoreFamily.baseRotation?.[2] || 0
        ],
        variantScale: activeCoreVariant.scale || 1,
        tintStrength: activeCoreVariant.tintStrength ?? activeCoreFamily.baseTintStrength ?? 0.22,
        brandOffset: activeCoreVariant.brandOffset || [0, 0.03, 0.84],
        credit: activeCoreFamily.credit
      };
    }

    return {
      title: activeProductModel.label,
      modelUrl: activeProductModel.modelUrl,
      rotation: [0, 0.34, 0],
      variantScale: 1,
      tintStrength: activeProductModel.tintStrength ?? 0.2,
      brandOffset: [0, 0.04, 0.84],
      credit: activeProductModel.credit
    };
  }, [workspace, activeCoreFamily, activeCoreVariant, activeProductModel]);

  const handleLogoUpload = useCallback(
    (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const image = new Image();
        image.onload = () => {
          const texture = new THREE.Texture(image);
          texture.needsUpdate = true;
          texture.colorSpace = THREE.SRGBColorSpace;

          if (logoTexture) {
            logoTexture.dispose();
          }

          setLogoTexture(texture);
          setLogoFileName(file.name);
        };
        image.src = readerEvent.target?.result;
      };
      reader.readAsDataURL(file);
    },
    [logoTexture]
  );

  const removeLogo = useCallback(() => {
    if (logoTexture) {
      logoTexture.dispose();
    }
    setLogoTexture(null);
    setLogoFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [logoTexture]);

  const resetAll = useCallback(() => {
    setBaseColor('#f9f7f2');
    setMaterialPreset('paper-natural');
    setStagePresetId('studio');
    setLightIntensity(1);
    setAutoRotate(true);
    setCustomText('');
    removeLogo();
  }, [removeLogo]);

  return (
    <article className="rounded-[2rem] apple-card studio-shell overflow-hidden" data-testid="card-3d-configurator">
      <div className={`p-5 lg:p-6 ${isMinimalMode ? 'space-y-4' : 'space-y-5'}`}>
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-muted-foreground mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {isMinimalMode ? 'Studio Preview' : 'Premium 3D Studio'}
            </div>
            <h3 className="text-xl font-semibold tracking-tight">
              {isMinimalMode ? 'Objektfokus in Echtzeit' : 'Interaktive Verpackungsvorschau'}
            </h3>
            {!isMinimalMode && (
              <p className="text-sm text-muted-foreground mt-1">
                3 Core-Modelle plus Produktpalette fuer das komplette Sortiment.
              </p>
            )}
          </div>
          {!isMinimalMode && (
            <span className="apple-btn-ghost h-auto py-1.5 px-3 text-xs" data-testid="badge-3d-preview">
              <Eye className="w-3 h-3 mr-1" />
              Live-Vorschau
            </span>
          )}
        </div>

        {!isMinimalMode && (
          <div className="grid grid-cols-2 gap-2 rounded-2xl studio-control-card p-1.5">
            <button
              type="button"
              onClick={() => setWorkspace('core')}
              className={`h-10 rounded-xl text-sm font-medium transition-all ${
                workspace === 'core'
                  ? 'bg-primary text-primary-foreground shadow-[0_10px_24px_-18px_rgba(2,6,23,0.8)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="button-workspace-core"
            >
              Core Modelle
            </button>
            <button
              type="button"
              onClick={() => setWorkspace('products')}
              className={`h-10 rounded-xl text-sm font-medium transition-all ${
                workspace === 'products'
                  ? 'bg-primary text-primary-foreground shadow-[0_10px_24px_-18px_rgba(2,6,23,0.8)]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="button-workspace-products"
            >
              Produktpalette
            </button>
          </div>
        )}

        {!isMinimalMode && (workspace === 'core' ? (
          <>
            <div>
              <p className="text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">Core Modell</p>
              <div className="grid grid-cols-3 gap-2">
                {coreModelFamilies.map((family) => (
                  <button
                    key={family.id}
                    type="button"
                    onClick={() => setSelectedCoreFamilyId(family.id)}
                    className={`h-11 rounded-xl border text-sm font-medium transition-all ${
                      selectedCoreFamilyId === family.id
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white border-black/10 hover:border-black/22'
                    }`}
                    data-testid={`button-core-family-${family.id}`}
                  >
                    {family.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">Variante</p>
              <div className="grid sm:grid-cols-3 gap-2" data-testid="panel-core-variant">
                {activeCoreFamily.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedCoreVariantId(variant.id)}
                    className={`text-left rounded-xl border px-3 py-2.5 transition-all ${
                      selectedCoreVariantId === variant.id
                        ? 'border-primary bg-primary/6 shadow-[0_14px_26px_-24px_rgba(2,6,23,0.65)]'
                        : 'border-black/10 bg-white hover:border-black/20'
                    }`}
                    data-testid={`button-core-variant-${variant.id}`}
                  >
                    <p className="text-sm font-medium">{variant.label}</p>
                    <p className="text-xs text-muted-foreground">{variant.detail}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>
            <p className="text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">Produktmodell</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2" data-testid="panel-product-models">
              {productModelCatalog.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedProductId(item.id)}
                  className={`text-left rounded-xl border px-3 py-2.5 transition-all ${
                    selectedProductId === item.id
                      ? 'border-primary bg-primary/6 shadow-[0_14px_26px_-24px_rgba(2,6,23,0.65)]'
                      : 'border-black/10 bg-white hover:border-black/20'
                  }`}
                  data-testid={`button-product-model-${item.id}`}
                >
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </button>
              ))}
            </div>
          </div>
        ))}

        <Canvas3DErrorBoundary fallback={<WebGLFallback />}>
          {!disable3D ? (
            <>
              <div
                className="rounded-3xl overflow-hidden studio-stage"
                style={{ height: isMinimalMode ? 520 : 398 }}
              >
                <Canvas camera={{ position: [0, 0.58, 2.62], fov: 42 }} dpr={[1, 2]} data-testid="canvas-3d">
                  <Suspense fallback={null}>
                    <Scene
                      stagePreset={activeStagePreset}
                      modelUrl={sceneConfig.modelUrl}
                      rotation={sceneConfig.rotation}
                      variantScale={sceneConfig.variantScale}
                      baseColor={baseColor}
                      tintStrength={sceneConfig.tintStrength}
                      materialSettings={activeMaterialSettings}
                      lightIntensity={lightIntensity}
                      autoRotate={autoRotate}
                      logoTexture={logoTexture}
                      customText={customText}
                      brandOffset={sceneConfig.brandOffset}
                    />
                  </Suspense>
                </Canvas>
              </div>
              <p className={`text-xs text-muted-foreground text-center ${isMinimalMode ? 'mt-1' : ''}`}>
                Drehen: Drag. Zoomen: Scroll/Pinch. Aktives Modell: {sceneConfig.title}
              </p>
            </>
          ) : (
            <div>
              <WebGLFallback
                description={
                  webglAvailable
                    ? 'Ihr Geraet nutzt ein Energiesparprofil. Die 3D-Vorschau kann optional aktiviert werden.'
                    : 'Ihr Browser unterstuetzt kein WebGL. Die 3D-Vorschau ist auf anderen Geraeten verfuegbar.'
                }
              />
              {webglAvailable && lowPower && (
                <div className="text-center mt-3">
                  <button
                    type="button"
                    className="apple-btn-secondary h-9 px-3 text-sm"
                    onClick={() => setForce3D(true)}
                    data-testid="button-force-3d"
                  >
                    3D trotzdem laden
                  </button>
                </div>
              )}
            </div>
          )}
        </Canvas3DErrorBoundary>

        {isMinimalMode ? (
          <div className="grid lg:grid-cols-[1fr,auto] gap-3 items-center">
            <div className="rounded-2xl studio-control-card p-3.5">
              <p className="inline-flex items-center text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">
                <Palette className="w-3.5 h-3.5 mr-1" />
                Farbton
              </p>
              <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 mb-3">
                {COLOR_PRESETS.slice(0, 6).map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => setBaseColor(preset.color)}
                    className={`aspect-square rounded-lg border transition-all ${
                      baseColor === preset.color ? 'border-primary scale-105' : 'border-black/12'
                    }`}
                    style={{ backgroundColor: preset.color }}
                    title={preset.name}
                    data-testid={`button-color-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ))}
              </div>
              <button
                type="button"
                className={`w-full h-9 rounded-lg border text-sm font-medium transition-all ${
                  autoRotate
                    ? 'border-primary bg-primary/6 text-foreground'
                    : 'border-black/10 bg-white text-muted-foreground'
                }`}
                onClick={() => setAutoRotate((value) => !value)}
                data-testid="button-toggle-autorotate"
              >
                Rotation {autoRotate ? 'aktiv' : 'pausiert'}
              </button>
            </div>
            <button
              type="button"
              className="apple-btn-secondary h-10 px-4"
              onClick={resetAll}
              data-testid="button-reset-config"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-4">
              <div className="rounded-2xl studio-control-card p-3.5">
                <p className="inline-flex items-center text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">
                  <Palette className="w-3.5 h-3.5 mr-1" />
                  Farbe
                </p>
                <div className="grid grid-cols-6 gap-2 mb-3">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setBaseColor(preset.color)}
                      className={`aspect-square rounded-lg border transition-all ${
                        baseColor === preset.color ? 'border-primary scale-105' : 'border-black/12'
                      }`}
                      style={{ backgroundColor: preset.color }}
                      title={preset.name}
                      data-testid={`button-color-${preset.name.toLowerCase().replace(/\s+/g, '-')}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="custom-color" className="text-xs text-muted-foreground shrink-0">
                    HEX
                  </label>
                  <input
                    id="custom-color"
                    type="color"
                    value={baseColor}
                    onChange={(event) => setBaseColor(event.target.value)}
                    className="w-9 h-9 rounded-md cursor-pointer border-0"
                    data-testid="input-custom-color"
                  />
                  <span className="text-xs text-muted-foreground font-mono">{baseColor.toUpperCase()}</span>
                </div>
              </div>

              <div className="rounded-2xl studio-control-card p-3.5">
                <p className="inline-flex items-center text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 mr-1" />
                  Material
                </p>
                <div className="space-y-2 mb-3">
                  {MATERIAL_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setMaterialPreset(preset.id)}
                      className={`w-full text-left rounded-lg px-2.5 py-2 border text-sm transition-all ${
                        materialPreset === preset.id
                          ? 'border-primary bg-primary/6'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                      data-testid={`button-material-${preset.id}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                <p className="inline-flex items-center text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">
                  <SunMedium className="w-3.5 h-3.5 mr-1" />
                  Stage
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {STAGE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setStagePresetId(preset.id)}
                      className={`h-8 rounded-lg border text-xs font-medium transition-all ${
                        stagePresetId === preset.id
                          ? 'border-primary bg-primary/6'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                      data-testid={`button-stage-${preset.id}`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl studio-control-card p-3.5">
                <p className="inline-flex items-center text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">
                  <SunMedium className="w-3.5 h-3.5 mr-1" />
                  Licht
                </p>
                <label htmlFor="light-intensity" className="text-xs text-muted-foreground block mb-1">
                  Intensitaet ({lightIntensity.toFixed(2)})
                </label>
                <input
                  id="light-intensity"
                  type="range"
                  min="0.65"
                  max="1.45"
                  step="0.05"
                  value={lightIntensity}
                  onChange={(event) => setLightIntensity(Number(event.target.value))}
                  className="w-full"
                  data-testid="input-light-intensity"
                />
                <button
                  type="button"
                  className={`w-full mt-3 h-9 rounded-lg border text-sm font-medium transition-all ${
                    autoRotate
                      ? 'border-primary bg-primary/6 text-foreground'
                      : 'border-black/10 bg-white text-muted-foreground'
                  }`}
                  onClick={() => setAutoRotate((value) => !value)}
                  data-testid="button-toggle-autorotate"
                >
                  Rotation {autoRotate ? 'aktiv' : 'pausiert'}
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-[1fr,auto] gap-3 items-start">
              <div className="rounded-2xl studio-control-card p-3.5">
                <p className="text-xs uppercase tracking-[0.11em] text-muted-foreground mb-2">Branding Overlay</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                      data-testid="input-logo-file"
                    />
                    {logoFileName ? (
                      <div className="flex items-center justify-between gap-2 rounded-xl border border-black/10 bg-white px-3 py-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <ImageIcon className="w-4 h-4 shrink-0 text-primary" />
                          <span className="text-sm truncate">{logoFileName}</span>
                        </div>
                        <button
                          type="button"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03]"
                          onClick={removeLogo}
                          data-testid="button-remove-logo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="w-full apple-btn-secondary h-10"
                        onClick={() => fileInputRef.current?.click()}
                        data-testid="button-upload-logo"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Logo hochladen
                      </button>
                    )}
                  </div>
                  <div>
                    <label htmlFor="custom-text" className="sr-only">
                      Eigener Text
                    </label>
                    <div className="relative">
                      <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="custom-text"
                        placeholder="Firmenname oder Slogan"
                        value={customText}
                        onChange={(event) => setCustomText(event.target.value)}
                        maxLength={30}
                        className="apple-input pl-9"
                        data-testid="input-custom-text"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2.5">
                  Das Branding wird als Preview-Panel im 3D-View gezeigt, damit Farben und Wirkung sofort vergleichbar sind.
                </p>
              </div>

              <button
                type="button"
                className="apple-btn-secondary h-10 px-4"
                onClick={resetAll}
                data-testid="button-reset-config"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>

            <div className="rounded-2xl studio-control-card px-4 py-3 text-xs text-muted-foreground flex flex-wrap items-center gap-2">
              <span className="font-medium text-foreground">Asset:</span>
              <span>{sceneConfig.credit.title}</span>
              <span>·</span>
              <span>{sceneConfig.credit.author}</span>
              <span>·</span>
              <a href={sceneConfig.credit.sourceUrl} target="_blank" rel="noreferrer" className="underline hover:text-foreground">
                Quelle
              </a>
              <span>·</span>
              <span>{sceneConfig.credit.license}</span>
            </div>
          </>
        )}
      </div>
    </article>
  );
}

modelAssetUrls.forEach((assetUrl) => {
  useGLTF.preload(assetUrl);
});
