export default function FallbackViewer({ reason = '3D-Vorschau ist auf diesem Geraet deaktiviert.' }) {
  return (
    <div className="viewer-fallback" role="img" aria-label="3D Vorschau nicht verfuegbar">
      <div className="viewer-dot" aria-hidden="true" />
      <strong>Statische Vorschau</strong>
      <p>{reason}</p>
      <p className="small">Fuer interaktive Modelle bitte ein leistungsfaehigeres Geraet nutzen.</p>
    </div>
  );
}
