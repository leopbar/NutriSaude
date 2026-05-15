import { TrendingUp } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4 flex items-center gap-2 sm:gap-4">
      {/* Title */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 pl-12 lg:pl-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-brand-400 to-brand-600 rounded-xl flex items-center justify-center shadow-card flex-shrink-0">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div className="min-w-0">
          <h1 className="text-base sm:text-xl font-bold text-slate-800 leading-tight truncate">Relatório Dinâmico</h1>
          <p className="text-[10px] sm:text-xs text-slate-500 truncate">Acompanhe a evolução mês a mês</p>
        </div>
      </div>

      {/* Doctor */}
      <div className="flex items-center gap-2 pl-2 sm:pl-3 sm:border-l border-slate-200 flex-shrink-0">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">LB</div>
        <div className="text-right hidden sm:block">
          <div className="text-sm font-semibold text-slate-800 leading-tight">Leonardo Barretti</div>
          <div className="text-[11px] text-slate-500">Criador</div>
        </div>
      </div>
    </header>
  );
}
