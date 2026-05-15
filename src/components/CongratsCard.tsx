import { Trophy, ArrowRight } from 'lucide-react';
import { first, latest, patient } from '../data/eliane';

export default function CongratsCard() {
  const lostKg  = (first.peso - latest.peso).toFixed(1).replace('.', ',');
  const lostFat = (first.gorduraCorporal - latest.gorduraCorporal).toFixed(1).replace('.', ',');

  const goToMetas = () => {
    const el = document.getElementById('metas');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-brand-500 via-brand-600 to-emerald-700 rounded-2xl shadow-card p-6 sm:p-8 text-white">
      {/* Confetti decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-3 left-6 text-3xl">✨</div>
        <div className="absolute top-6 right-12 text-2xl">🎉</div>
        <div className="absolute top-12 left-1/3 text-xl">⭐</div>
        <div className="absolute bottom-6 left-12 text-2xl">⭐</div>
        <div className="absolute bottom-3 right-8 text-3xl">✨</div>
        <div className="absolute bottom-8 right-1/3 text-xl">🎉</div>
      </div>

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-card">
          <Trophy className="w-9 h-9 sm:w-10 sm:h-10 text-yellow-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xl sm:text-2xl font-extrabold leading-tight">
            Parabéns, {patient.name.split(' ')[0]}!
          </div>
          <div className="text-sm text-white/90 mt-1.5 leading-relaxed max-w-2xl">
            Você perdeu <strong>{lostKg} kg</strong> e reduziu <strong>{lostFat}%</strong> de
            gordura corporal nos últimos 4 meses. Continue assim — está no caminho certo para
            alcançar todas as metas!
          </div>
        </div>
        <button
          onClick={goToMetas}
          className="bg-white text-brand-700 text-sm font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 hover:gap-3 transition-all shadow-card flex-shrink-0"
        >
          Ver Metas <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
