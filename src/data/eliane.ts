export type Measurement = {
  date: string;       // ISO-ish
  label: string;      // for charts
  peso: number;
  imc: number;
  gorduraCorporal: number;       // %
  massaGorda: number;            // kg
  massaLivreGordura: number;     // kg
  massaMuscular: number;         // kg
  taxaMuscular: number;          // %
  massaMuscEsqueletica: number;  // %
  massaOssea: number;            // kg
  massaProteica: number;         // kg
  proteina: number;              // %
  teorUmidade: number;           // kg
  aguaCorporal: number;          // %
  gorduraSubcutanea: number;     // %
  gorduraVisceral: number;
  tmb: number;                   // kcal
  idadeMetabolica: number;
  pesoIdeal: number;             // kg (constante por avaliação)
};

export const patient = {
  id: '45428',
  name: 'Eliane Viana',
  age: 44,
  gender: 'Feminino',
  height: 165, // cm (estimado a partir do IMC/peso)
  pesoIdeal: 56.1,
};

export const measurements: Measurement[] = [
  {
    date: '2026-01-12', label: 'Jan/2026',
    peso: 68.80, imc: 25.3, gorduraCorporal: 28.4,
    massaGorda: 19.6, massaLivreGordura: 49.2,
    massaMuscular: 46.3, taxaMuscular: 67.3, massaMuscEsqueletica: 41.7,
    massaOssea: 3.0, massaProteica: 11.5, proteina: 16.7,
    teorUmidade: 33.8, aguaCorporal: 49.1,
    gorduraSubcutanea: 25.5, gorduraVisceral: 7.9,
    tmb: 1433, idadeMetabolica: 32, pesoIdeal: 56.1,
  },
  {
    date: '2026-02-14', label: 'Fev/2026',
    peso: 62.75, imc: 23.0, gorduraCorporal: 24.9,
    massaGorda: 15.6, massaLivreGordura: 47.1,
    massaMuscular: 44.3, taxaMuscular: 70.6, massaMuscEsqueletica: 43.8,
    massaOssea: 2.8, massaProteica: 11.2, proteina: 17.8,
    teorUmidade: 32.3, aguaCorporal: 51.5,
    gorduraSubcutanea: 22.7, gorduraVisceral: 5.8,
    tmb: 1388, idadeMetabolica: 30, pesoIdeal: 56.1,
  },
  {
    date: '2026-03-11', label: 'Mar/2026',
    peso: 60.30, imc: 22.1, gorduraCorporal: 23.5,
    massaGorda: 14.2, massaLivreGordura: 46.1,
    massaMuscular: 43.4, taxaMuscular: 71.9, massaMuscEsqueletica: 44.6,
    massaOssea: 2.8, massaProteica: 11.0, proteina: 18.2,
    teorUmidade: 31.7, aguaCorporal: 52.5,
    gorduraSubcutanea: 21.6, gorduraVisceral: 4.9,
    tmb: 1366, idadeMetabolica: 29, pesoIdeal: 56.1,
  },
  {
    date: '2026-05-14', label: 'Mai/2026',
    peso: 58.50, imc: 21.5, gorduraCorporal: 22.6,
    massaGorda: 13.2, massaLivreGordura: 45.3,
    massaMuscular: 42.6, taxaMuscular: 72.8, massaMuscEsqueletica: 45.1,
    massaOssea: 2.7, massaProteica: 10.8, proteina: 18.5,
    teorUmidade: 31.1, aguaCorporal: 53.1,
    gorduraSubcutanea: 20.9, gorduraVisceral: 4.3,
    tmb: 1348, idadeMetabolica: 29, pesoIdeal: 56.1,
  },
];

export const latest = measurements[measurements.length - 1];
export const first  = measurements[0];

export const delta = (key: keyof Measurement) =>
  +(((latest[key] as number) - (first[key] as number))).toFixed(1);
