import { VideoPlaceholder } from "./shared";
import { YouTubeFacade } from "./youtube-facade";

function CycleRing({
  cycle,
  total,
}: {
  cycle: number;
  total: number;
}): React.ReactElement {
  const size = 16;
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - 2;
  const gapDeg = 16;
  const segmentDeg = 360 / total - gapDeg;

  const polar = (deg: number): { x: number; y: number } => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
      aria-hidden="true"
    >
      {Array.from({ length: total }, (_, i) => {
        const startDeg = (i * 360) / total + gapDeg / 2;
        const endDeg = startDeg + segmentDeg;
        const start = polar(startDeg);
        const end = polar(endDeg);
        const isFilled = i < cycle;
        return (
          <path
            key={i}
            d={`M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${r} ${r} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`}
            fill="none"
            stroke={isFilled ? "var(--color-brand-blue)" : "currentColor"}
            strokeOpacity={isFilled ? 1 : 0.2}
            strokeWidth="2"
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}

type PoomsaeCardProps = {
  videoId?: string;
  beltName: string;
  beltDotClass: string;
  beltDotStyle?: React.CSSProperties;
  beltDotBorder?: string;
  formName: string;
  formKorean: string;
  formIndex: number | null;
  formTotal: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  cycle: string;
  totalCycles: number;
};

export function PoomsaeCard({
  videoId,
  beltName,
  beltDotClass,
  beltDotStyle,
  beltDotBorder,
  formName,
  formKorean,
  formIndex,
  formTotal,
  level,
  cycle,
  totalCycles,
}: PoomsaeCardProps): React.ReactElement {
  const cycleNum = Number.parseInt(cycle, 10);
  const thumbnailTitle = `${formName} — ${beltName} belt`;

  return (
    <div
      className="group overflow-hidden rounded-[1.5rem] bg-white p-1.5 shadow-[0_10px_30px_-12px_rgba(26,26,46,0.12)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-[0_22px_44px_-14px_rgba(26,26,46,0.22)]"
    >
      {videoId ? (
        <YouTubeFacade videoId={videoId} title={thumbnailTitle} />
      ) : (
        <VideoPlaceholder title={formName} />
      )}

      <div className="flex items-stretch gap-3 px-4 pb-4 pt-4">
        {/* Vertical belt stripe — structural accent */}
        <div
          aria-hidden="true"
          className={`w-[3px] shrink-0 self-stretch rounded-full ${beltDotClass} ${beltDotBorder ?? ""}`}
          style={beltDotStyle}
        />

        <div className="min-w-0 flex-1">
          {/* Top row: form name + form index */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-heading text-lg leading-[1.15] tracking-tight text-brand-black">
                {formName}
              </p>
              <p className="mt-0.5 text-[13px] text-brand-black/45">
                {formKorean}
              </p>
            </div>
            <span className="flex shrink-0 items-baseline gap-0.5 font-heading text-[14px] font-semibold leading-none tracking-tight tabular-nums">
              {formIndex !== null ? (
                <>
                  <span className="text-brand-black/70">
                    {String(formIndex).padStart(2, "0")}
                  </span>
                  <span className="text-brand-black/20">
                    /{String(formTotal).padStart(2, "0")}
                  </span>
                </>
              ) : (
                <span className="text-[11px] uppercase tracking-[0.24em] text-brand-black/35">
                  Basic
                </span>
              )}
            </span>
          </div>

          {/* Metadata strip */}
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-brand-taupe/25 pt-2.5">
            <span className="font-heading text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-red/80">
              {beltName}
            </span>
            <div className="flex items-center gap-2 font-heading text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-black/45">
              <span>{level}</span>
              <span aria-hidden="true" className="text-brand-black/20">
                ·
              </span>
              <span className="flex items-center gap-1.5">
                <CycleRing cycle={cycleNum} total={totalCycles} />
                <span>C{cycle}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
