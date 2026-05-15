import { measurements } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

type Row = {
  label: string;
  description: string;
  key: keyof typeof measurements[0];
  decimals?: number;
  unit?: string;
  goalDown?: boolean;
  constant?: boolean;
  group?: 'comp' | 'massa' | 'liquido' | 'gordura' | 'metab' | 'ref';
};

const rows: Row[] = [
  // Composição geral
  { label: 'Peso',                    description: 'Massa corporal total medida pela balança',
    key: 'peso',                  unit: 'kg',  goalDown: true,  group: 'comp' },
  { label: 'IMC',                     description: 'Índice de Massa Corporal (peso ÷ altura²) — classifica eutrofia/sobrepeso',
    key: 'imc',                                 goalDown: true,  group: 'comp' },
  { label: 'Gordura Corporal',        description: 'Percentual total de tecido adiposo do corpo',
    key: 'gorduraCorporal',       unit: '%',   goalDown: true,  group: 'comp' },

  // Massa magra e muscular
  { label: 'Massa Gorda',             description: 'Quantidade absoluta de tecido adiposo (em kg)',
    key: 'massaGorda',            unit: 'kg',  goalDown: true,  group: 'massa' },
  { label: 'Massa Livre de Gordura',  description: 'Músculo + osso + água + órgãos — todo o "não-gordura"',
    key: 'massaLivreGordura',     unit: 'kg',                   group: 'massa' },
  { label: 'Massa Muscular',          description: 'Total da musculatura corporal (esquelética + lisa)',
    key: 'massaMuscular',         unit: 'kg',                   group: 'massa' },
  { label: 'Taxa Muscular',           description: 'Percentual de músculo em relação ao peso total',
    key: 'taxaMuscular',          unit: '%',                    group: 'massa' },
  { label: 'Massa Musc. Esquelética', description: 'Percentual da musculatura voluntária (treinável)',
    key: 'massaMuscEsqueletica',  unit: '%',                    group: 'massa' },
  { label: 'Massa Óssea',             description: 'Massa mineral dos ossos — marcador de saúde óssea',
    key: 'massaOssea',            unit: 'kg',                   group: 'massa' },
  { label: 'Massa Protéica',          description: 'Conteúdo de proteína estrutural do corpo (kg)',
    key: 'massaProteica',         unit: 'kg',                   group: 'massa' },
  { label: 'Proteína',                description: 'Percentual de proteína corporal — qualidade muscular',
    key: 'proteina',              unit: '%',                    group: 'massa' },

  // Hidratação
  { label: 'Teor de Umidade',         description: 'Quantidade absoluta de água no corpo (em kg)',
    key: 'teorUmidade',           unit: 'kg',                   group: 'liquido' },
  { label: 'Água Corporal',           description: 'Percentual de água no corpo — status de hidratação',
    key: 'aguaCorporal',          unit: '%',                    group: 'liquido' },

  // Gorduras
  { label: 'Gordura Subcutânea',      description: 'Gordura logo abaixo da pele — estética e isolamento térmico',
    key: 'gorduraSubcutanea',     unit: '%',   goalDown: true,  group: 'gordura' },
  { label: 'Gordura Visceral',        description: 'Gordura ao redor dos órgãos — alto risco cardiometabólico',
    key: 'gorduraVisceral',                    goalDown: true,  group: 'gordura' },

  // Metabolismo
  { label: 'TMB',                     description: 'Taxa Metabólica Basal — calorias gastas em repouso',
    key: 'tmb',                   decimals: 0, unit: 'kcal',    group: 'metab' },
  { label: 'Idade Metabólica',        description: 'Idade equivalente ao metabolismo atual (menor = melhor)',
    key: 'idadeMetabolica',       decimals: 0, unit: 'anos', goalDown: true, group: 'metab' },

  // Referência
  { label: 'Peso Corporal Ideal',     description: 'Peso recomendado pela bioimpedância (estatura e biotipo)',
    key: 'pesoIdeal',             unit: 'kg',  constant: true,  group: 'ref' },
];

const groupLabels: Record<NonNullable<Row['group']>, string> = {
  comp:    'Composição Geral',
  massa:   'Massa Magra e Muscular',
  liquido: 'Hidratação',
  gordura: 'Gorduras',
  metab:   'Metabolismo',
  ref:     'Referência',
};

export default function HistoryTable() {
  return (
    <div className="bg-white rounded-2xl shadow-card p-4 sm:p-5">
      <h3 className="text-sm font-bold text-slate-800 mb-3">Histórico de Avaliações — Bioimpedância Completa</h3>

      <div className="overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="text-slate-500 border-b-2 border-slate-200">
              <th className="text-left font-semibold pb-2 pr-3">Indicador</th>
              {measurements.map(m => (
                <th key={m.date} className="text-right font-semibold pb-2 px-2 whitespace-nowrap">{m.label}</th>
              ))}
              <th className="text-right font-semibold pb-2 pl-2 whitespace-nowrap">Variação</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => {
              const prevGroup = idx > 0 ? rows[idx - 1].group : null;
              const isNewGroup = r.group !== prevGroup;
              const firstVal = measurements[0][r.key] as number;
              const lastVal  = measurements[measurements.length - 1][r.key] as number;
              const diff     = lastVal - firstVal;
              const good     = r.constant ? null : (r.goalDown ? diff < 0 : diff > 0);

              return (
                <>
                  {isNewGroup && r.group && (
                    <tr key={`group-${r.group}`} className="bg-slate-50">
                      <td
                        colSpan={measurements.length + 2}
                        className="text-[10px] uppercase tracking-wider font-bold text-slate-500 py-1.5 px-3"
                      >
                        {groupLabels[r.group]}
                      </td>
                    </tr>
                  )}
                  <tr key={r.key} className="border-b border-slate-100 hover:bg-slate-50/60">
                    <td className="py-2.5 pr-2 sm:pr-3">
                      <span className="font-semibold text-slate-700 whitespace-nowrap">{r.label}</span>
                      <span className="text-[11px] text-slate-400 font-normal ml-2 hidden md:inline">— {r.description}</span>
                    </td>
                    {measurements.map((m, i) => {
                      const val = m[r.key] as number;
                      const prev = i > 0 ? (measurements[i - 1][r.key] as number) : null;
                      const d = prev !== null ? val - prev : null;
                      const positive = !r.constant && d !== null && (r.goalDown ? d < 0 : d > 0);
                      return (
                        <td key={m.date} className="py-2.5 px-2 text-right whitespace-nowrap text-slate-700">
                          <span className="font-medium">{fmt(val, r.decimals ?? 1)}</span>
                          {!r.constant && d !== null && d !== 0 && (
                            <span className={`ml-1 text-[10px] font-semibold ${positive ? 'text-emerald-600' : 'text-rose-500'}`}>
                              {d > 0 ? '▲' : '▼'}{fmt(Math.abs(d), r.decimals ?? 1)}
                            </span>
                          )}
                        </td>
                      );
                    })}
                    <td className="py-2.5 pl-2 text-right whitespace-nowrap">
                      {r.constant ? (
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          constante
                        </span>
                      ) : (
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${good ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'}`}>
                          {diff > 0 ? '+' : ''}{fmt(diff, r.decimals ?? 1)}{r.unit ? ` ${r.unit}` : ''}
                        </span>
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[10px] text-slate-400 mt-3">
        * Variações por coluna em relação à avaliação anterior · Badge final representa variação total (1ª → 4ª avaliação)
      </p>
    </div>
  );
}
