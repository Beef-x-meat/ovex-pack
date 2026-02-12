import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Text } from "@react-three/drei";
import { useRef, useState, useCallback, useMemo, Suspense, Component, type ReactNode } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  RotateCcw,
  Palette,
  Type,
  Image as ImageIcon,
  X,
  Eye,
  Box,
} from "lucide-react";

interface ConfiguratorProps {
  productType?: "cup" | "bag" | "box" | "bowl" | "napkin";
  productName?: string;
}

const COLOR_PRESETS = [
  { name: "Weiss", color: "#ffffff" },
  { name: "Kraft", color: "#c4a676" },
  { name: "Schwarz", color: "#2a2a2a" },
  { name: "Blau", color: "#3b82f6" },
  { name: "Rot", color: "#ef4444" },
  { name: "Gruen", color: "#22c55e" },
];

function PaperCup({
  baseColor,
  logoTexture,
  customText,
}: {
  baseColor: string;
  logoTexture: THREE.Texture | null;
  customText: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const cupGeometry = useMemo(() => {
    const radiusTop = 0.45;
    const radiusBottom = 0.3;
    const height = 1.2;
    const segments = 64;
    return new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments, 1, true);
  }, []);

  const bottomGeometry = useMemo(() => {
    return new THREE.CircleGeometry(0.3, 64);
  }, []);

  const rimGeometry = useMemo(() => {
    return new THREE.TorusGeometry(0.45, 0.025, 16, 64);
  }, []);

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <mesh geometry={cupGeometry}>
        <meshStandardMaterial
          color={baseColor}
          side={THREE.DoubleSide}
          roughness={0.6}
          metalness={0.05}
        />
      </mesh>

      <mesh geometry={bottomGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <meshStandardMaterial color={baseColor} roughness={0.7} />
      </mesh>

      <mesh geometry={rimGeometry} position={[0, 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color={baseColor} roughness={0.5} metalness={0.1} />
      </mesh>

      {logoTexture && (
        <mesh position={[0, 0.05, 0.39]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshStandardMaterial
            map={logoTexture}
            transparent
            roughness={0.4}
            metalness={0}
          />
        </mesh>
      )}

      {customText && !logoTexture && (
        <Text
          position={[0, 0.05, 0.39]}
          fontSize={0.09}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.7}
          font="/fonts/Inter-Bold.woff"
        >
          {customText}
        </Text>
      )}
    </group>
  );
}

function PaperBag({
  baseColor,
  logoTexture,
  customText,
}: {
  baseColor: string;
  logoTexture: THREE.Texture | null;
  customText: string;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 1.0, 0.4]} />
        <meshStandardMaterial color={baseColor} roughness={0.7} metalness={0} />
      </mesh>

      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[0.72, 0.06, 0.42]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} metalness={0.05} />
      </mesh>

      <mesh position={[-0.15, 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
        <torusGeometry args={[0.08, 0.012, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>
      <mesh position={[0.15, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <torusGeometry args={[0.08, 0.012, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#8B7355" roughness={0.8} />
      </mesh>

      {logoTexture && (
        <mesh position={[0, 0, 0.21]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshStandardMaterial map={logoTexture} transparent roughness={0.4} />
        </mesh>
      )}

      {customText && !logoTexture && (
        <Text
          position={[0, 0, 0.21]}
          fontSize={0.08}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.55}
        >
          {customText}
        </Text>
      )}
    </group>
  );
}

function FoodBox({
  baseColor,
  logoTexture,
  customText,
}: {
  baseColor: string;
  logoTexture: THREE.Texture | null;
  customText: string;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef} position={[0, -0.1, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.0, 0.5, 0.7]} />
        <meshStandardMaterial color={baseColor} roughness={0.65} metalness={0} />
      </mesh>

      <mesh position={[0, 0.28, -0.1]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[1.02, 0.04, 0.72]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} metalness={0.05} />
      </mesh>

      {logoTexture && (
        <mesh position={[0, 0.05, 0.36]}>
          <planeGeometry args={[0.5, 0.3]} />
          <meshStandardMaterial map={logoTexture} transparent roughness={0.4} />
        </mesh>
      )}

      {customText && !logoTexture && (
        <Text
          position={[0, 0.05, 0.36]}
          fontSize={0.07}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.8}
        >
          {customText}
        </Text>
      )}
    </group>
  );
}

function GenericProduct({
  baseColor,
  logoTexture,
  customText,
}: {
  baseColor: string;
  logoTexture: THREE.Texture | null;
  customText: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 64]} />
        <meshStandardMaterial color={baseColor} roughness={0.6} metalness={0.05} />
      </mesh>

      {logoTexture && (
        <mesh position={[0, 0, 0.51]} ref={meshRef}>
          <planeGeometry args={[0.4, 0.2]} />
          <meshStandardMaterial map={logoTexture} transparent roughness={0.4} />
        </mesh>
      )}
    </group>
  );
}

function Scene({
  productType,
  baseColor,
  logoTexture,
  customText,
}: {
  productType: string;
  baseColor: string;
  logoTexture: THREE.Texture | null;
  customText: string;
}) {
  const ProductComponent = useMemo(() => {
    switch (productType) {
      case "cup":
        return PaperCup;
      case "bag":
        return PaperBag;
      case "box":
        return FoodBox;
      default:
        return PaperCup;
    }
  }, [productType]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <directionalLight position={[-3, 4, -3]} intensity={0.3} />
      <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} />

      <ProductComponent
        baseColor={baseColor}
        logoTexture={logoTexture}
        customText={customText}
      />

      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.4}
        scale={3}
        blur={2}
        far={2}
      />

      <OrbitControls
        enablePan={false}
        minDistance={1.5}
        maxDistance={4}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.5}
        autoRotate={false}
      />

      <Environment preset="studio" />
    </>
  );
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

class Canvas3DErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function WebGLFallback() {
  return (
    <div
      className="flex flex-col items-center justify-center text-center p-8 bg-muted/30 rounded-md"
      style={{ height: 320 }}
      data-testid="webgl-fallback"
    >
      <Box className="w-12 h-12 text-primary mb-3" />
      <p className="font-medium mb-1">3D-Vorschau nicht verfuegbar</p>
      <p className="text-sm text-muted-foreground">
        Ihr Browser unterstuetzt kein WebGL. Die 3D-Vorschau ist auf anderen Geraeten verfuegbar.
      </p>
    </div>
  );
}

export function ProductConfigurator3D({
  productType = "cup",
  productName = "Produkt",
}: ConfiguratorProps) {
  const [baseColor, setBaseColor] = useState("#ffffff");
  const [logoTexture, setLogoTexture] = useState<THREE.Texture | null>(null);
  const [logoFileName, setLogoFileName] = useState("");
  const [customText, setCustomText] = useState("");
  const [activeTab, setActiveTab] = useState<"color" | "logo" | "text">("logo");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const texture = new THREE.Texture(img);
        texture.needsUpdate = true;
        texture.colorSpace = THREE.SRGBColorSpace;
        setLogoTexture(texture);
        setLogoFileName(file.name);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const removeLogo = useCallback(() => {
    setLogoTexture(null);
    setLogoFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const resetAll = useCallback(() => {
    setBaseColor("#ffffff");
    removeLogo();
    setCustomText("");
  }, [removeLogo]);

  const detectedType = useMemo(() => {
    if (productName.toLowerCase().includes("becher") || productName.toLowerCase().includes("cup")) return "cup";
    if (productName.toLowerCase().includes("tuet") || productName.toLowerCase().includes("bag")) return "bag";
    if (productName.toLowerCase().includes("box") || productName.toLowerCase().includes("schale")) return "box";
    return productType;
  }, [productName, productType]);

  return (
    <Card className="overflow-visible" data-testid="card-3d-configurator">
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">3D Konfigurator</h3>
          </div>
          <Badge variant="secondary" data-testid="badge-3d-preview">
            <Eye className="w-3 h-3 mr-1" />
            Live-Vorschau
          </Badge>
        </div>

        <Canvas3DErrorBoundary fallback={<WebGLFallback />}>
          {isWebGLAvailable() ? (
            <>
              <div className="rounded-md overflow-hidden bg-gradient-to-b from-muted/30 to-muted/60 mb-4" style={{ height: 320 }}>
                <Canvas
                  camera={{ position: [0, 0.5, 2.5], fov: 45 }}
                  dpr={[1, 2]}
                  data-testid="canvas-3d"
                >
                  <Suspense fallback={null}>
                    <Scene
                      productType={detectedType}
                      baseColor={baseColor}
                      logoTexture={logoTexture}
                      customText={customText}
                    />
                  </Suspense>
                </Canvas>
              </div>
              <p className="text-xs text-muted-foreground text-center mb-4">
                Drehen und zoomen Sie das 3D-Modell mit der Maus
              </p>
            </>
          ) : (
            <div className="mb-4">
              <WebGLFallback />
            </div>
          )}
        </Canvas3DErrorBoundary>

        <div className="flex gap-1 mb-4">
          <Button
            variant={activeTab === "logo" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("logo")}
            className="flex-1"
            data-testid="button-tab-logo"
          >
            <ImageIcon className="w-4 h-4 mr-1" />
            Logo
          </Button>
          <Button
            variant={activeTab === "color" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("color")}
            className="flex-1"
            data-testid="button-tab-color"
          >
            <Palette className="w-4 h-4 mr-1" />
            Farbe
          </Button>
          <Button
            variant={activeTab === "text" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveTab("text")}
            className="flex-1"
            data-testid="button-tab-text"
          >
            <Type className="w-4 h-4 mr-1" />
            Text
          </Button>
        </div>

        {activeTab === "logo" && (
          <div className="space-y-3" data-testid="panel-logo">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              onChange={handleLogoUpload}
              className="hidden"
              data-testid="input-logo-file"
            />
            {logoFileName ? (
              <div className="flex items-center justify-between gap-2 p-3 bg-muted/50 rounded-md">
                <div className="flex items-center gap-2 min-w-0">
                  <ImageIcon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-sm truncate">{logoFileName}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={removeLogo}
                  data-testid="button-remove-logo"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => fileInputRef.current?.click()}
                data-testid="button-upload-logo"
              >
                <Upload className="w-4 h-4 mr-2" />
                Logo hochladen
              </Button>
            )}
            <p className="text-xs text-muted-foreground">
              PNG, JPG oder SVG. Fuer beste Ergebnisse verwenden Sie ein transparentes PNG.
            </p>
          </div>
        )}

        {activeTab === "color" && (
          <div className="space-y-3" data-testid="panel-color">
            <div className="grid grid-cols-6 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setBaseColor(preset.color)}
                  className={`aspect-square rounded-md border-2 transition-all ${
                    baseColor === preset.color
                      ? "border-primary scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.name}
                  data-testid={`button-color-${preset.name.toLowerCase()}`}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground shrink-0">
                Eigene Farbe:
              </label>
              <input
                type="color"
                value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-9 h-9 rounded-md cursor-pointer border-0"
                data-testid="input-custom-color"
              />
              <span className="text-xs text-muted-foreground font-mono">
                {baseColor.toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {activeTab === "text" && (
          <div className="space-y-3" data-testid="panel-text">
            <Input
              placeholder="Ihr Firmenname oder Slogan..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              maxLength={30}
              data-testid="input-custom-text"
            />
            <p className="text-xs text-muted-foreground">
              Max. 30 Zeichen. Text wird auf der Verpackung angezeigt, wenn kein Logo hochgeladen ist.
            </p>
          </div>
        )}

        <Separator className="my-4" />

        <Button
          variant="ghost"
          size="sm"
          onClick={resetAll}
          className="w-full"
          data-testid="button-reset-config"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Alles zuruecksetzen
        </Button>
      </div>
    </Card>
  );
}
