import { TrendingUp } from 'lucide-react';

const SCORE = 87;

export default function HealthScoreGauge() {
  // Gauge geometry: semicircle, radius=80, drawn from (20,100) → (180,100)
  const SEMI_LEN = Math.PI * 80;
  const filledLen = (SCORE / 100) * SEMI_LEN;

  return (
    <div className="bg-white rounded-2xl shadow-card p-5 h-full flex flex-col">
      <h3 className="text-[13px] font-bold text-slate-800">Score de Saúde Geral</h3>

      <div className="flex-1 flex items-center justify-center my-2">
        <div className="relative w-full max-w-[230px]">
          <svg viewBox="0 0 200 110" className="w-full block">
            <defs>
              <linearGradient id="scoreGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%"   stopColor="#ef4444" />
                <stop offset="40%"  stopColor="#f59e0b" />
                <stop offset="70%"  stopColor="#84cc16" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Score arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={`${filledLen} ${SEMI_LEN}`}
            />
          </svg>

          {/* Score number INSIDE the arc cavity */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1 pointer-events-none">
            <div className="text-[40px] font-extrabold text-slate-800 leading-none">{SCORE}</div>
            <div className="text-xs font-semibold text-emerald-600 mt-0.5">Excelente</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between text-[10px] text-slate-400 font-medium px-3 -mt-1">
        <span>0</span>
        <span>100</span>
      </div>

      <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-600 mt-3 pt-2 border-t border-slate-100">
        <TrendingUp className="w-3.5 h-3.5" />
        +18 pontos desde o início
      </div>
    </div>
  );
}
