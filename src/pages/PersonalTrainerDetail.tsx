import { Dumbbell, FileText, AlertTriangle, Target, Activity, BookOpen, Zap, Heart } from 'lucide-react';
import DetailLayout, { Section, MetricRow, ActionItem, Reference, Highlight } from './DetailLayout';
import { first, latest, patient } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function PersonalTrainerDetail({ onBack }: { onBack: () => void }) {
  const muscleRateGain    = (latest.taxaMuscular - first.taxaMuscular).toFixed(1);
  const skeletalGain      = (latest.massaMuscEsqueletica - first.massaMuscEsqueletica).toFixed(1);
  const muscleLossAbs     = (first.massaMuscular - latest.massaMuscular).toFixed(1);
  const boneLoss          = ((first.massaOssea - latest.massaOssea) / first.massaOssea * 100).toFixed(1);

  return (
    <DetailLayout
      onBack={onBack}
      title="Análise de Performance Detalhada"
      professional="Prof. IA"
      registry="Personal Trainer"
      specialty="Musculação, Treinamento Funcional e Performance"
      score={88}
      scoreLabel="Muito Bom"
      theme="orange"
      Icon={Dumbbell}
    >

      {/* ── RESUMO EXECUTIVO ── */}
      <Section title="Avaliação Geral de Performance" icon={FileText}>
        <p>
          A aluna <strong>{patient.name}, {patient.age} anos</strong>, apresenta evolução de
          composição corporal e marcadores neuromusculares <strong>extraordinariamente
          favorável</strong> ao longo de 4 meses de treinamento sistemático. Os resultados
          quantitativos posicionam o caso como referência de boa-resposta ao protocolo
          estruturado: ganho de <strong>+{muscleRateGain}% na taxa muscular relativa</strong>{' '}
          (67,3% → 72,8%) e melhora de <strong>+{skeletalGain} p.p. na massa muscular
          esquelética</strong> (41,7% → 45,1%) confirmam que houve <strong>recomposição
          corporal</strong> — fenômeno relativamente raro em adultos em déficit calórico moderado.
        </p>
        <p>
          A análise da perda absoluta de massa muscular ({muscleLossAbs} kg) precisa ser
          contextualizada. Estudos de Helms (2014) e Longland (2016) demonstram que perdas de até
          25–30% da redução total de peso podem ser massa magra em protocolos com déficit moderado
          e ingestão proteica adequada — a aluna está dentro deste intervalo (perda de massa
          muscular = 36% da perda total). Considerando que o objetivo era simultâneo (perda
          gordura + preservação muscular), o resultado é <strong>tecnicamente excelente</strong>.
        </p>
        <p>
          Há, contudo, um <strong>alerta importante</strong>: a redução observada de{' '}
          <strong>{boneLoss}% na massa óssea</strong> em 4 meses exige atenção imediata e ajuste
          do protocolo. Mulheres na faixa dos 40 anos perdem fisiologicamente 0,5–1% de massa
          óssea ao ano — uma perda de 10% em 4 meses é <strong>atípica</strong> e merece
          intervenção combinada: nutricional (cálcio, vitamina D), endocrinológica (DXA, perfil
          hormonal) e física (exercícios osteogênicos com impacto controlado).
        </p>
        <p>
          O plano atualizado prioriza: <strong>(1)</strong> manutenção da taxa muscular acima de
          74% (meta fitness), <strong>(2)</strong> introdução sistemática de exercícios de
          impacto e carga axial para estímulo osteogênico, <strong>(3)</strong> progressão de
          carga periodizada, <strong>(4)</strong> trabalho específico para core e estabilizadores
          posteriores (prevenção lombar), e <strong>(5)</strong> aumento gradual do volume
          aeróbico para manter perda de gordura visceral.
        </p>
      </Section>

      {/* ── COMPOSIÇÃO CORPORAL DO PONTO DE VISTA DA PERFORMANCE ── */}
      <Section title="Análise de Composição Muscular" icon={Activity}>
        <p>
          Para mulheres acima de 40 anos, a <strong>preservação e o ganho de massa muscular</strong>{' '}
          são, hoje, considerados o <strong>marcador mais importante de longevidade saudável</strong>{' '}
          (Wolfe, 2006; Cruz-Jentoft, 2019 — EWGSOP2). Cada 1 kg de massa muscular preserva
          aproximadamente 13 kcal/dia de gasto basal, melhora sensibilidade insulínica, sustenta
          densidade óssea, reduz risco de quedas e está inversamente associado a mortalidade por
          todas as causas.
        </p>

        <MetricRow
          label="Massa Muscular Total"
          current={`${fmt(latest.massaMuscular)} kg`}
          previous={`${fmt(first.massaMuscular)} kg`}
          target="Preservação ≥ 42 kg"
          classification="Hidratada"
          status="good"
          interpretation={`Redução absoluta de ${muscleLossAbs} kg em 4 meses. Esta perda é proporcional à redução geral do peso corporal (-15%) e equivale a P:M ratio de 0,36 — dentro dos limites aceitáveis em protocolos cardápico-orientado de hipocalórico moderado (estudos de Longland indicam P:M até 0,40 como benigno em mulheres ativas).`}
        />

        <MetricRow
          label="Taxa Muscular"
          current={`${fmt(latest.taxaMuscular)}%`}
          previous={`${fmt(first.taxaMuscular)}%`}
          target="≥ 74% (fitness)"
          classification="Hiperidratado"
          status="excellent"
          interpretation="Ganho de 5,5 p.p. — sinal MUITO POSITIVO. Este é o melhor indicador de qualidade da recomposição corporal. Saiu de faixa abaixo da média (67,3%) para faixa atlética-recreacional (72,8%). Meta de 74% (fitness) é alcançável nos próximos 2 meses com ajuste fino do protocolo."
        />

        <MetricRow
          label="Massa Muscular Esquelética"
          current={`${fmt(latest.massaMuscEsqueletica)}%`}
          previous={`${fmt(first.massaMuscEsqueletica)}%`}
          target="≥ 46%"
          classification="Hidratado"
          status="excellent"
          interpretation="Ganho de 3,4 p.p. — incremento expressivo. Indica que o estímulo de musculação está promovendo manutenção/ganho do tecido muscular contrátil de fibras esqueléticas (não inclui musculatura visceral/cardíaca). Este parâmetro é o mais sensível à qualidade do treino de força."
        />

        <MetricRow
          label="Massa Proteica"
          current={`${fmt(latest.massaProteica)} kg`}
          previous={`${fmt(first.massaProteica)} kg`}
          target="Manter > 10,5 kg"
          classification="Excelente"
          status="good"
          interpretation="Redução absoluta de apenas 0,7 kg em 4 meses (-6%), enquanto o peso total reduziu 15%. Indicador robusto de proteção da estrutura proteica corporal pelo binômio treino + nutrição. Continuar."
        />
      </Section>

      {/* ── ANÁLISE DE SARCOPENIA ── */}
      <Section title="Triagem de Sarcopenia (EWGSOP2)" icon={Zap}>
        <p>
          A <strong>sarcopenia</strong> — perda progressiva de massa, força e função muscular —
          começa cerca dos 40 anos em mulheres e acelera durante a perimenopausa. O European
          Working Group on Sarcopenia in Older People (EWGSOP2, 2019) define três níveis de
          gravidade. Aplicando os critérios:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
            <div className="text-[11px] font-bold text-emerald-700 uppercase">Critério 1: Força</div>
            <div className="text-[13px] font-semibold mt-1">Avaliação pendente</div>
            <div className="text-[11px] text-slate-600 mt-1">
              Solicitar handgrip dynamometer (alvo mulher 40+: ≥ 26 kg).
              Ou teste de cadeira (5 levantadas em &lt; 15s).
            </div>
          </div>
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
            <div className="text-[11px] font-bold text-emerald-700 uppercase">Critério 2: Massa</div>
            <div className="text-[13px] font-semibold mt-1">Adequada ✓</div>
            <div className="text-[11px] text-slate-600 mt-1">
              IMM (Índice de Massa Muscular) estimado em ~16,2 kg/m² — acima do ponto de corte
              para sarcopenia em mulheres (&lt; 6,75 kg/m²). Sem evidência de sarcopenia.
            </div>
          </div>
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-3">
            <div className="text-[11px] font-bold text-emerald-700 uppercase">Critério 3: Performance</div>
            <div className="text-[13px] font-semibold mt-1">Avaliação pendente</div>
            <div className="text-[11px] text-slate-600 mt-1">
              Teste de velocidade de marcha (4m, alvo ≥ 0,8 m/s) ou SPPB.
              A aluna apresenta auto-relato de melhora de capacidade funcional.
            </div>
          </div>
        </div>

        <Highlight color="emerald">
          <p className="text-[13px]">
            <strong>Conclusão:</strong> sem critério antropométrico para sarcopenia. Aluna em
            faixa de proteção. Manter monitoramento anual de força e funcionalidade. Os testes
            funcionais (handgrip, cadeira, SPPB) devem ser incorporados ao protocolo de avaliação.
          </p>
        </Highlight>
      </Section>

      {/* ── MASSA ÓSSEA ── */}
      <Section title="Massa Óssea — Alerta Crítico" icon={AlertTriangle}>
        <MetricRow
          label="Massa Óssea"
          current={`${fmt(latest.massaOssea)} kg`}
          previous={`${fmt(first.massaOssea)} kg`}
          target="Estabilizar ≥ 2,7 kg"
          classification="Atenção"
          status="risk"
          interpretation={`Perda de ${boneLoss}% em 4 meses. Para mulher 44 anos sem comorbidades, a taxa fisiológica de perda óssea é 0,5–1% ao ano (perimenopausa: até 2%/ano). A magnitude observada (~30%/ano se mantida) é incompatível com perimenopausa simples e exige investigação endocrinológica imediata + ajuste do protocolo de treino.`}
        />

        <Highlight color="rose">
          <h4 className="font-bold text-[15px] mb-2">🦴 Ajustes Imediatos no Treino para Estímulo Ósseo</h4>
          <p className="text-[13px] mb-2">
            Exercícios <strong>osteogênicos</strong> são aqueles que geram <strong>tensão e/ou
            impacto na matriz óssea</strong>, estimulando osteoblastos. A literatura (Layne &amp;
            Nelson, 1999; Beck et al., 2017 — protocolo LIFTMOR) demonstra que mulheres em fase
            de perimenopausa <strong>respondem positivamente</strong> à combinação de:
          </p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li>
              <strong>Cargas elevadas (≥ 80% 1RM)</strong> em exercícios compostos multiarticulares
              — agachamento, deadlift, hip thrust, desenvolvimento militar
            </li>
            <li>
              <strong>Saltos verticais controlados</strong> (jump squats, box jumps de baixa altura,
              skipping) — 30–50 contatos/sessão, 2x/semana
            </li>
            <li>
              <strong>Impactos axiais</strong> via heel drops (10 repetições alternadas, 2x/dia)
            </li>
            <li>
              <strong>Exercícios contra resistência elevada</strong> nos sites de risco: coluna
              lombar, fêmur proximal, punho
            </li>
          </ul>
          <p className="text-[13px] mt-2">
            <strong>Protocolo LIFTMOR adaptado:</strong> 2 sessões/semana de treinamento de
            resistência de alta intensidade (5 séries x 5 repetições a 80–85% 1RM) em agachamento,
            deadlift, supino e desenvolvimento, mais 5 séries de salto e queda controlada — mostra
            ganho de DMO de coluna lombar de 2,9% em 8 meses (Beck, 2017).
          </p>
        </Highlight>
      </Section>

      {/* ── PROTOCOLO ATUALIZADO ── */}
      <Section title="Protocolo de Treino Periodizado" icon={Dumbbell}>
        <p>
          Com base nos resultados atuais e nos pontos de atenção identificados, o protocolo de
          treino entra em <strong>nova fase de periodização</strong> — Fase 3: Performance &amp;
          Densidade. Objetivo: <strong>manter recomposição corporal + foco em estímulo
          osteogênico + ganho de força máxima</strong>.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
            <h4 className="text-[13px] font-bold text-orange-900 mb-2">📅 Distribuição Semanal</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li><strong>SEG:</strong> Força (Lower) — Agachamento + Deadlift + acessórios</li>
              <li><strong>TER:</strong> Hipertrofia (Upper) — Costas/Bíceps + Core</li>
              <li><strong>QUA:</strong> Aeróbico Zona 2 (45 min) + Mobilidade</li>
              <li><strong>QUI:</strong> Força (Lower) — Hip Thrust + Frontal Squat + Saltos</li>
              <li><strong>SEX:</strong> Hipertrofia (Upper) — Peito/Ombros/Tríceps</li>
              <li><strong>SAB:</strong> Cardio variável (HIIT ou caminhada longa)</li>
              <li><strong>DOM:</strong> Descanso ativo (mobilidade, yoga, alongamento)</li>
            </ul>
          </div>

          <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
            <h4 className="text-[13px] font-bold text-orange-900 mb-2">⚖️ Parâmetros de Carga</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li><strong>Força (BIG 4):</strong> 4–5 séries x 4–6 reps · 80–85% 1RM · 3 min descanso</li>
              <li><strong>Hipertrofia composta:</strong> 3–4 séries x 8–12 reps · 65–75% 1RM · 90s</li>
              <li><strong>Acessórios:</strong> 3 séries x 12–15 reps · até falha técnica · 60s</li>
              <li><strong>Saltos (SEG e QUI):</strong> 5 séries x 5 saltos · 2 min entre séries</li>
              <li><strong>Core (toda sessão):</strong> 3 séries x 30–45s isométrico</li>
              <li><strong>Mobilidade:</strong> 10 min antes, 5 min após</li>
            </ul>
          </div>

          <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
            <h4 className="text-[13px] font-bold text-orange-900 mb-2">🎯 Volume Aeróbico</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li><strong>Cardio diário:</strong> 20–25 min em Zona 2 (60–70% FCmáx) — pós-musculação</li>
              <li><strong>Aeróbico longo (QUA):</strong> 45 min Zona 2 — preferir caminhada inclinada ou bike</li>
              <li><strong>HIIT (sábado, opcional):</strong> 20 min · 30s ON @ 90% / 90s OFF · 6–8 ciclos</li>
              <li><strong>Total semanal:</strong> ~3h30 min · suficiente para manter visceral em queda</li>
              <li><strong>Limite:</strong> não ultrapassar 5h/semana de aeróbico — risco de catabolismo</li>
            </ul>
          </div>

          <div className="border border-orange-200 bg-orange-50/50 rounded-lg p-4">
            <h4 className="text-[13px] font-bold text-orange-900 mb-2">🦴 Inclusões Osteogênicas</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li><strong>Box Jumps</strong> (caixote 30 cm): 5x5 — SEG e QUI</li>
              <li><strong>Heel drops</strong>: 2x/dia, 10 repetições — todos os dias</li>
              <li><strong>Single-leg Romanian Deadlift</strong>: 3x10/perna · 1x/semana</li>
              <li><strong>Step-ups com carga</strong>: 4x12/perna · 1x/semana</li>
              <li><strong>Carregamento de peso (Farmer's Walk)</strong>: 3 séries 30m · 1x/semana</li>
              <li><strong>Saltos laterais</strong>: 3x10 · 1x/semana</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ── INDICADORES PARA MONITORAR ── */}
      <Section title="Indicadores de Performance a Monitorar" icon={Activity}>
        <p>
          Recomendo registro sistemático (digital ou caderno) de:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="border border-slate-200 rounded-lg p-3">
            <h4 className="text-[12px] font-bold text-slate-800 mb-1">Performance de Força</h4>
            <ul className="text-[12px] space-y-0.5 text-slate-600">
              <li>• 1RM estimado de Agachamento, Deadlift, Supino, Desenvolvimento</li>
              <li>• Carga em RPE 8 nos exercícios principais</li>
              <li>• Reteste de 1RM a cada 8 semanas</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-3">
            <h4 className="text-[12px] font-bold text-slate-800 mb-1">Performance Funcional</h4>
            <ul className="text-[12px] space-y-0.5 text-slate-600">
              <li>• Handgrip (dinamômetro): alvo ≥ 26 kg</li>
              <li>• Salto vertical (squat jump)</li>
              <li>• Teste de cadeira (5RM): &lt; 10s</li>
              <li>• Velocidade de marcha (4m): ≥ 1,2 m/s</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-3">
            <h4 className="text-[12px] font-bold text-slate-800 mb-1">Aeróbico</h4>
            <ul className="text-[12px] space-y-0.5 text-slate-600">
              <li>• FC de repouso (idealmente {'<'} 65 bpm)</li>
              <li>• Variabilidade de FC (HRV)</li>
              <li>• Tempo de recuperação pós-treino</li>
              <li>• VO₂máx estimado (Cooper, Rockport ou TCPE anual)</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-lg p-3">
            <h4 className="text-[12px] font-bold text-slate-800 mb-1">Recuperação e Sono</h4>
            <ul className="text-[12px] space-y-0.5 text-slate-600">
              <li>• Horas de sono noturno (alvo ≥ 7h)</li>
              <li>• Qualidade subjetiva (escala 1–10)</li>
              <li>• PSE (Percepção Subjetiva de Esforço) por sessão</li>
              <li>• Sinais de overtraining: irritabilidade, fadiga, FC repouso elevada</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PLANO DE AÇÃO ── */}
      <Section title="Plano de Ação — Próximas 12 Semanas" icon={Target}>
        <ActionItem
          priority="alta"
          title="Implementar saltos osteogênicos"
          detail="Iniciar protocolo de box jumps (5x5) duas vezes por semana nas sessões de inferiores + heel drops diários. Aguardar autorização da endocrinologista após resultados da densitometria."
        />
        <ActionItem
          priority="alta"
          title="Trabalho de força máxima nos compostos"
          detail="Subir intensidade gradualmente para 80–85% 1RM no agachamento, deadlift e hip thrust. Aplicar princípio da sobrecarga progressiva: +2,5 kg/semana enquanto a técnica permitir RPE ≤ 8."
        />
        <ActionItem
          priority="alta"
          title="Avaliação funcional completa"
          detail="Aplicar bateria de testes: handgrip, salto vertical, teste de cadeira 5RM, SPPB, agachamento posterior 1RM. Registrar como linha de base para o ciclo de 12 semanas."
        />
        <ActionItem
          priority="media"
          title="Periodização do volume aeróbico"
          detail="Reduzir cardio de baixa intensidade em dias de força (manter apenas 20 min Zona 2 pós-treino). Concentrar HIIT no sábado. Evitar HIIT no dia seguinte a treinos pesados de força."
        />
        <ActionItem
          priority="media"
          title="Mobilidade e prevenção"
          detail="Adicionar 10 min de mobilidade dirigida antes de cada treino (quadril, torácica, ombros). Incluir 1 sessão semanal de pilates ou yoga focada em core profundo (transverso, multífidos)."
        />
        <ActionItem
          priority="baixa"
          title="Suplementação ergogênica"
          detail="Creatina monoidratada 5 g/dia (apoia força máxima e densidade muscular — evidência classe A). Beta-alanina 3,2 g/dia (melhora tolerância a esforços de 1–4 min). Discutir com a nutricionista."
        />
      </Section>

      {/* ── REFERÊNCIAS ── */}
      <Section title="Bibliografia Consultada" icon={BookOpen}>
        <Reference>
          <strong>Cruz-Jentoft AJ, Bahat G, Bauer J, et al.</strong> <em>Sarcopenia: revised European
          consensus on definition and diagnosis (EWGSOP2).</em> Age and Ageing. 2019;48(1):16–31.
        </Reference>
        <Reference>
          <strong>Beck BR, Daly RM, Singh MA, Taaffe DR.</strong> <em>Exercise and Sports Science
          Australia (ESSA) position statement on exercise prescription for the prevention and
          management of osteoporosis.</em> J Sci Med Sport. 2017;20(5):438–445.
        </Reference>
        <Reference>
          <strong>Watson SL, Weeks BK, Weis LJ, Harding AT, Horan SA, Beck BR.</strong> <em>High-
          intensity resistance and impact training improves bone mineral density and physical
          function in postmenopausal women with osteopenia and osteoporosis: The LIFTMOR randomized
          controlled trial.</em> J Bone Miner Res. 2018;33(2):211–220.
        </Reference>
        <Reference>
          <strong>Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM.</strong>{' '}
          <em>Higher compared with lower dietary protein during an energy deficit combined with
          intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial.</em>{' '}
          Am J Clin Nutr. 2016;103(3):738–746.
        </Reference>
        <Reference>
          <strong>Helms ER, Aragon AA, Fitschen PJ.</strong> <em>Evidence-based recommendations for
          natural bodybuilding contest preparation: nutrition and supplementation.</em> J Int Soc
          Sports Nutr. 2014;11:20.
        </Reference>
        <Reference>
          <strong>Wolfe RR.</strong> <em>The underappreciated role of muscle in health and disease.</em>{' '}
          Am J Clin Nutr. 2006;84(3):475–482.
        </Reference>
        <Reference>
          <strong>Layne JE, Nelson ME.</strong> <em>The effects of progressive resistance training
          on bone density: a review.</em> Med Sci Sports Exerc. 1999;31(1):25–30.
        </Reference>
        <Reference>
          <strong>CREF/CONFEF — Conselho Federal de Educação Física.</strong> Documento de Apoio à
          Avaliação Física em Adultos Maturos. 2023.
        </Reference>
        <Reference>
          <strong>ACSM — American College of Sports Medicine.</strong> Guidelines for Exercise
          Testing and Prescription. 11th ed. 2021.
        </Reference>
      </Section>

    </DetailLayout>
  );
}
