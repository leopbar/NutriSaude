import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KpiCards from './components/KpiCards';
import EvolutionChart from './components/EvolutionChart';
import BodyComposition from './components/BodyComposition';
import HistoryTable from './components/HistoryTable';
import TeamCards from './components/TeamCards';
import GoalsCard from './components/GoalsCard';
import CongratsCard from './components/CongratsCard';
import TrainingSchedule from './components/TrainingSchedule';
import MealPlan from './components/MealPlan';
import NutritionalDetail from './pages/NutritionalDetail';
import EndocrinologicalDetail from './pages/EndocrinologicalDetail';
import PersonalTrainerDetail from './pages/PersonalTrainerDetail';

export type DetailView = 'nutritional' | 'endocrinological' | 'personal';

export default function App() {
  const [detailView, setDetailView] = useState<DetailView | null>(null);

  if (detailView === 'nutritional')
    return <NutritionalDetail onBack={() => setDetailView(null)} />;
  if (detailView === 'endocrinological')
    return <EndocrinologicalDetail onBack={() => setDetailView(null)} />;
  if (detailView === 'personal')
    return <PersonalTrainerDetail onBack={() => setDetailView(null)} />;

  return (
    <div className="min-h-screen flex bg-slate-100">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <div className="flex-1 p-3 sm:p-5 space-y-4 sm:space-y-5">

          {/* ─── TOPO ─── esquerda: KPIs + Chart | direita: Body Comp */}
          <section className="grid grid-cols-1 xl:grid-cols-12 gap-4">
            {/* LEFT */}
            <div className="xl:col-span-9 flex flex-col gap-4">
              <KpiCards />
              <div className="h-[320px]">
                <EvolutionChart />
              </div>
            </div>

            {/* RIGHT */}
            <div className="xl:col-span-3">
              <BodyComposition />
            </div>
          </section>

          {/* ─── PARECERES DETALHADOS DA EQUIPE ─── */}
          <section id="pareceres" className="space-y-3 scroll-mt-24">
            <SectionTitle>Pareceres Detalhados da Equipe Multidisciplinar</SectionTitle>
            <TeamCards onOpenDetail={setDetailView} />
          </section>

          {/* ─── METAS ─── */}
          <section id="metas" className="space-y-3 scroll-mt-24">
            <SectionTitle>Metas em Acompanhamento</SectionTitle>
            <GoalsCard />
          </section>

          {/* ─── HISTÓRICO ─── largura total */}
          <section id="historico" className="scroll-mt-24">
            <HistoryTable />
          </section>

          {/* ─── PARABÉNS ─── faixa horizontal abaixo do histórico */}
          <CongratsCard />

          {/* ─── TREINOS ─── */}
          <section id="treinos" className="space-y-3 scroll-mt-24">
            <SectionTitle>Programa de Treinos — Segunda a Sexta</SectionTitle>
            <TrainingSchedule />
          </section>

          {/* ─── CARDÁPIO ─── */}
          <section id="cardapio" className="space-y-3 scroll-mt-24">
            <SectionTitle>Cardápio Semanal — Segunda a Sexta</SectionTitle>
            <MealPlan />
          </section>

          <footer className="text-center text-[11px] text-slate-400 pt-1 pb-2">
            NutriSaúde © 2026 · Acompanhamento Clínico Integrado · Eliane Viana — ID 45428
          </footer>
        </div>
      </main>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[15px] font-bold text-slate-800 flex items-center gap-2">
      <span className="w-1 h-4 bg-brand-500 rounded-full" />
      {children}
    </h2>
  );
}
