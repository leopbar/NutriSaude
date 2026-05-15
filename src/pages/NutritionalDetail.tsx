import { Apple, FileText, Target, AlertTriangle, Activity, BookOpen, Utensils, Droplet } from 'lucide-react';
import DetailLayout, { Section, MetricRow, ActionItem, Reference, Highlight } from './DetailLayout';
import { measurements, first, latest, patient } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function NutritionalDetail({ onBack }: { onBack: () => void }) {
  // Cálculos clínicos
  const proteinRequirementLow  = Math.round(latest.peso * 1.4); // g/dia
  const proteinRequirementHigh = Math.round(latest.peso * 1.8); // g/dia
  const proteinCurrent         = Math.round(latest.peso * (latest.proteina / 100) * 100); // estimativa
  const totalFatLoss           = (first.massaGorda - latest.massaGorda).toFixed(1);
  const totalWeightLoss        = (first.peso - latest.peso).toFixed(1);
  const muscleLossKg           = (first.massaMuscular - latest.massaMuscular).toFixed(1);
  const muscleRateGain         = (latest.taxaMuscular - first.taxaMuscular).toFixed(1);

  return (
    <DetailLayout
      onBack={onBack}
      title="Análise Nutricional Detalhada"
      professional="Dra. Carolina Mendes"
      registry="CRN 12.456"
      specialty="Nutrição Clínica e Esportiva"
      score={90}
      scoreLabel="Excelente"
      theme="green"
      Icon={Apple}
    >

      {/* ── RESUMO EXECUTIVO ── */}
      <Section title="Resumo Executivo" icon={FileText}>
        <p>
          A paciente <strong>{patient.name}, {patient.age} anos, sexo feminino</strong>, apresenta
          evolução nutricional <strong>excepcionalmente favorável</strong> ao longo dos 4 meses de
          acompanhamento (Jan/2026 → Mai/2026). Foram registradas perdas consistentes e sustentáveis
          de tecido adiposo com preservação relativa da massa magra, indicando aderência ao plano
          alimentar e adequação do balanço energético prescrito.
        </p>
        <p>
          Os marcadores nutricionais mais relevantes mostram trajetória positiva: <strong>redução de
          5,8 pontos percentuais na gordura corporal</strong> (28,4% → 22,6%), <strong>melhora de 1,8 pontos no
          percentual proteico</strong> (16,7% → 18,5% — classificação Excelente) e <strong>aumento da
          taxa muscular relativa de 5,5 pontos</strong> (67,3% → 72,8%). Estes parâmetros são
          consistentes com um protocolo de restrição calórica moderada associado a alta densidade
          proteica — exatamente o que a literatura recomenda para mulheres na faixa etária e
          contexto hormonal da paciente.
        </p>
        <p>
          A perda total de <strong>{totalWeightLoss} kg</strong> em 4 meses (taxa de 2,6 kg/mês — dentro
          da faixa ideal de 0,5 a 1% do peso corporal/semana para preservação de massa magra) foi
          composta por <strong>{totalFatLoss} kg de gordura</strong> (~62% da perda) e
          aproximadamente <strong>{muscleLossKg} kg de massa muscular absoluta</strong> (~36% da perda).
          Embora a redução absoluta de massa muscular pareça preocupante em uma análise superficial,
          o <strong>aumento da taxa muscular relativa (+{muscleRateGain}%)</strong> confirma que a
          composição corporal melhorou, e que parte da redução é proporcional à perda de peso total,
          não a uma perda neta de tecido contrátil.
        </p>
        <p>
          Há, contudo, <strong>três pontos de atenção</strong> que precisam de monitoramento e ajuste
          terapêutico: (1) a redução de <strong>massa óssea de 3,0 → 2,7 kg</strong> (-10%) — sinal de
          alerta clínico em mulher na perimenopausa, (2) a <strong>idade metabólica ainda</strong>
          significativamente abaixo da idade cronológica (29 vs 44 anos) que merece interpretação
          cuidadosa, e (3) a aproximação ao <strong>peso ideal (56,1 kg)</strong> que exigirá
          transição do déficit para a manutenção ainda neste trimestre.
        </p>
      </Section>

      {/* ── PARÂMETROS DE COMPOSIÇÃO CORPORAL ── */}
      <Section title="Análise de Composição Corporal" icon={Activity}>
        <p>
          Os percentuais de composição corporal são, em conjunto, o pilar central da avaliação
          nutricional. Para mulheres entre 40 e 50 anos, a literatura internacional (Heyward &amp;
          Wagner; Gallagher et al.) estabelece como <strong>faixa saudável</strong> de gordura
          corporal o intervalo de <strong>23% a 33%</strong>, com a faixa <strong>fitness</strong> em
          21–24% e <strong>atlética</strong> em 17–20%. A paciente migrou da faixa "média alta" para
          a <strong>faixa saudável superior</strong> em apenas quatro meses, aproximando-se da faixa
          fitness.
        </p>

        <MetricRow
          label="Gordura Corporal (%)"
          current={`${fmt(latest.gorduraCorporal)}%`}
          previous={`${fmt(first.gorduraCorporal)}%`}
          target="< 22% (fitness)"
          classification="Saudável ✓"
          status="good"
          interpretation="Redução de 5,8 p.p. — excelente. A faixa de 22,6% coloca a paciente em região saudável-superior para mulher 40–50 anos. A literatura (Heyward, 2014; Gallagher, 2000) estabelece risco metabólico aumentado quando >32% nesta faixa etária. Manter trajetória, mas evitar redução abaixo de 18%, que pode comprometer eixo hormonal feminino e densidade óssea (já em queda)."
        />

        <MetricRow
          label="Massa Gorda (kg)"
          current={`${fmt(latest.massaGorda)} kg`}
          previous={`${fmt(first.massaGorda)} kg`}
          target="11,2 kg (objetivo)"
          classification="Saudável ✓"
          status="excellent"
          interpretation="Perda absoluta de 6,4 kg em 4 meses — 32,6% de redução. Taxa de perda de gordura: ~1,6 kg/mês (excelente — preserva metabolismo e massa magra). A literatura recomenda que perdas superiores a 1% do peso corporal/semana resultam em maior catabolismo proteico e perda óssea."
        />

        <MetricRow
          label="Massa Muscular (kg)"
          current={`${fmt(latest.massaMuscular)} kg`}
          previous={`${fmt(first.massaMuscular)} kg`}
          target="≥ 42 kg (preservação)"
          classification="Hidratado"
          status="attention"
          interpretation="A redução absoluta de 3,7 kg pode ser interpretada de duas formas: (a) ~50% representa redução proporcional ao peso total, esperada em protocolo de emagrecimento; (b) os 50% restantes representam catabolismo real, mitigável com aumento da ingestão proteica para 1,8 g/kg/dia (atualmente em ~1,5 g/kg). Recomendação: elevar proteína para 105 g/dia."
        />

        <MetricRow
          label="Massa Livre de Gordura (kg)"
          current={`${fmt(latest.massaLivreGordura)} kg`}
          previous={`${fmt(first.massaLivreGordura)} kg`}
          classification="Adequada"
          status="good"
          interpretation="A massa livre de gordura inclui músculo, osso, água e órgãos. A queda de 3,9 kg em 4 meses é fisiológica em emagrecimento — ~70% explicada por redução do volume de água celular (devido à menor massa corporal total) e ~30% por catabolismo proteico/ósseo. Manter monitoramento."
        />

        <MetricRow
          label="Taxa Muscular (%)"
          current={`${fmt(latest.taxaMuscular)}%`}
          previous={`${fmt(first.taxaMuscular)}%`}
          target="≥ 74% (fitness)"
          classification="Hiperidratado"
          status="excellent"
          interpretation="Ganho de 5,5 p.p. — sinal qualitativo de excelente recomposição. A paciente está agora a 1,2 p.p. da faixa 'fitness' (≥74%). Este indicador é o melhor preditor de longevidade e prevenção de sarcopenia em mulheres acima de 40 anos (Janssen, 2002)."
        />
      </Section>

      {/* ── ANÁLISE PROTEICA ── */}
      <Section title="Análise Proteica Detalhada" icon={Utensils}>
        <p>
          A avaliação proteica é <strong>o eixo central</strong> da intervenção nutricional em
          mulheres na perimenopausa. A queda dos níveis de estrogênio reduz a sensibilidade dos
          tecidos à estimulação anabólica, exigindo <strong>dose proteica por refeição</strong>{' '}
          maior para o mesmo efeito de síntese muscular.
        </p>

        <MetricRow
          label="Proteína Corporal (%)"
          current={`${fmt(latest.proteina)}%`}
          previous={`${fmt(first.proteina)}%`}
          target="≥ 18%"
          classification="Excelente ✓"
          status="excellent"
          interpretation="O percentual atual (18,5%) está na faixa ótima superior — superior à média populacional (~16%) para mulheres na mesma faixa etária. O ganho de 1,8 p.p. é um marcador robusto de adesão à ingestão proteica adequada e de qualidade muscular preservada."
        />

        <MetricRow
          label="Massa Proteica (kg)"
          current={`${fmt(latest.massaProteica)} kg`}
          previous={`${fmt(first.massaProteica)} kg`}
          classification="Excelente"
          status="good"
          interpretation="Redução absoluta pequena (0,7 kg) compatível com perda total de peso. O percentual relativo aumentou — confirmando preservação da estrutura proteica corporal."
        />

        <Highlight color="emerald">
          <h4 className="font-bold text-[14px] mb-2">📋 Necessidade Proteica Recalculada</h4>
          <p className="text-[13px] mb-2">
            Com peso atual de <strong>{fmt(latest.peso)} kg</strong> e objetivo de preservação
            muscular durante a fase final de redução de peso:
          </p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li><strong>Mínimo terapêutico:</strong> {Math.round(latest.peso * 1.2)} g/dia (1,2 g/kg) — manutenção</li>
            <li><strong>Recomendado para fase atual:</strong> {proteinRequirementLow} g/dia (1,4–1,6 g/kg) — preservação durante déficit calórico</li>
            <li><strong>Ideal (Stuart Phillips, McMaster Univ.):</strong> {proteinRequirementHigh} g/dia (1,8–2,0 g/kg) — proteção máxima de massa magra</li>
            <li><strong>Por refeição:</strong> 25–30 g distribuídos em 4–5 refeições/dia para otimizar síntese proteica miofibrilar</li>
          </ul>
        </Highlight>
      </Section>

      {/* ── HIDRATAÇÃO ── */}
      <Section title="Hidratação e Equilíbrio Hídrico" icon={Droplet}>
        <p>
          A hidratação é parâmetro <strong>frequentemente subestimado</strong> em avaliações
          nutricionais. Para mulheres adultas, a faixa de água corporal saudável situa-se entre{' '}
          <strong>45% e 60%</strong>, sendo influenciada por composição corporal (mais músculo →
          mais água), idade, momento da medição e ingestão hídrica diária.
        </p>

        <MetricRow
          label="Água Corporal (%)"
          current={`${fmt(latest.aguaCorporal)}%`}
          previous={`${fmt(first.aguaCorporal)}%`}
          target="≥ 52%"
          classification="Hidratada ✓"
          status="excellent"
          interpretation="Subiu de 49,1% (limite inferior) para 53,1% (faixa ótima). O aumento de 4 p.p. é consistente com perda de gordura (que tem ~10% de água) e ganho relativo de massa magra (que tem ~75% de água). Indica também boa adesão à ingestão hídrica."
        />

        <MetricRow
          label="Teor de Umidade (kg)"
          current={`${fmt(latest.teorUmidade)} kg`}
          previous={`${fmt(first.teorUmidade)} kg`}
          classification="Hidratado"
          status="good"
          interpretation="A redução absoluta de 2,7 kg de água é proporcional à perda de peso total e ao menor volume corporal. Não há sinal de desidratação — pelo contrário, o percentual relativo melhorou."
        />

        <Highlight color="blue">
          <h4 className="font-bold text-[14px] mb-2">💧 Prescrição Hídrica</h4>
          <p className="text-[13px]">
            <strong>{Math.round(latest.peso * 35)} ml/dia</strong> (35 ml/kg) — equivalente a
            ~{Math.round(latest.peso * 35 / 250)} copos de 250 ml. Aumentar para{' '}
            <strong>{Math.round(latest.peso * 40)} ml/dia</strong> em dias de treino. Distribuir ao
            longo do dia, com 1–2 copos imediatamente ao despertar para reidratação após o jejum
            noturno.
          </p>
        </Highlight>
      </Section>

      {/* ── GORDURAS ── */}
      <Section title="Análise de Gordura Subcutânea e Visceral" icon={Activity}>
        <p>
          A diferenciação entre gordura subcutânea (tecido adiposo abaixo da pele) e gordura
          visceral (em torno dos órgãos) é fundamental, pois <strong>elas têm impactos metabólicos
          completamente distintos</strong>. A gordura visceral é metabolicamente ativa e fortemente
          associada a resistência à insulina, dislipidemia e risco cardiovascular.
        </p>

        <MetricRow
          label="Gordura Subcutânea (%)"
          current={`${fmt(latest.gorduraSubcutanea)}%`}
          previous={`${fmt(first.gorduraSubcutanea)}%`}
          target="< 19%"
          classification="Padrão (Saudável)"
          status="good"
          interpretation="Redução de 4,6 p.p. — 18% de redução absoluta. A faixa atual (20,9%) já está em região saudável. O padrão da redução (perda mais lenta que a gordura visceral) é esperado, já que a gordura subcutânea responde primariamente ao déficit calórico, enquanto a visceral responde também a exercício e melhora da sensibilidade à insulina."
        />

        <MetricRow
          label="Gordura Visceral"
          current={fmt(latest.gorduraVisceral, 1)}
          previous={fmt(first.gorduraVisceral, 1)}
          target="< 4 (ideal: < 3)"
          classification="Médio Risco"
          status="attention"
          interpretation="Redução expressiva de 7,9 → 4,3 (45,6% de queda) — excelente resposta clínica. Contudo, ainda está dentro da faixa de 'risco médio' segundo classificação Tanita (1–12 saudável, 13+ excessivo, ideal < 4). Continuar redução é prioridade — cada unidade abaixo reduz risco cardiovascular em ~10% (Després, 2012; Neeland, 2019)."
        />

        <Highlight color="amber">
          <h4 className="font-bold text-[14px] mb-2">⚠️ Gordura Visceral — Acompanhamento Prioritário</h4>
          <p className="text-[13px]">
            Mulheres na perimenopausa apresentam <strong>deslocamento natural</strong> da gordura
            de distribuição ginóide (quadris/coxas) para androide (abdômen/visceral) devido à
            queda do estrogênio. A meta de visceral &lt; 3 deve ser perseguida com:{' '}
            <strong>(a)</strong> manutenção do déficit calórico moderado,{' '}
            <strong>(b)</strong> ingestão de fibras solúveis ≥ 25 g/dia (aveia, psyllium, leguminosas),{' '}
            <strong>(c)</strong> restrição de álcool (≤ 1 dose/dia) e açúcares simples,{' '}
            <strong>(d)</strong> aumento de gorduras monoinsaturadas (azeite extra virgem, abacate,
            castanhas) que melhoram lipogênese hepática.
          </p>
        </Highlight>
      </Section>

      {/* ── PLANO ALIMENTAR ── */}
      <Section title="Distribuição de Macros — Prescrição Atualizada" icon={Target}>
        <p>
          Com base no novo peso (58,5 kg), TMB de 1.348 kcal e fator de atividade física estimado
          em <strong>1,5</strong> (musculação 5x/semana + cardio diário moderado), o gasto energético
          total estimado é de <strong>~2.020 kcal/dia</strong>. Para finalizar a redução até o peso
          ideal (56,1 kg), recomendo déficit calórico de <strong>15–20%</strong>, totalizando ~1.620 kcal/dia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
            <div className="text-xs font-bold uppercase text-emerald-700">Proteína</div>
            <div className="text-2xl font-extrabold text-emerald-900 mt-1">{proteinRequirementLow}–{proteinRequirementHigh}g</div>
            <div className="text-xs text-emerald-700 mt-1">~25–35% do total · {Math.round(proteinRequirementLow * 4)}–{Math.round(proteinRequirementHigh * 4)} kcal</div>
            <div className="text-[11px] text-slate-600 mt-2">
              Fontes prioritárias: peito de frango, peixes magros (tilápia, merluza, atum), ovos,
              cottage, iogurte grego, whey isolado, soja, lentilhas.
            </div>
          </div>
          <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
            <div className="text-xs font-bold uppercase text-amber-700">Carboidratos</div>
            <div className="text-2xl font-extrabold text-amber-900 mt-1">140–170g</div>
            <div className="text-xs text-amber-700 mt-1">~35–40% do total · 560–680 kcal</div>
            <div className="text-[11px] text-slate-600 mt-2">
              Preferir baixo índice glicêmico: aveia, arroz integral, batata-doce, mandioca,
              quinoa, frutas com casca, leguminosas. Concentrar 60% nos períodos peri-treino.
            </div>
          </div>
          <div className="border border-rose-200 bg-rose-50 rounded-lg p-4">
            <div className="text-xs font-bold uppercase text-rose-700">Gorduras</div>
            <div className="text-2xl font-extrabold text-rose-900 mt-1">50–60g</div>
            <div className="text-xs text-rose-700 mt-1">~28–33% do total · 450–540 kcal</div>
            <div className="text-[11px] text-slate-600 mt-2">
              Azeite extra virgem (2 col./dia), abacate (¼ unidade/dia), castanhas (20g/dia),
              salmão 2x/semana, sementes de chia/linhaça. Limitar saturadas a &lt; 7% das calorias.
            </div>
          </div>
        </div>
      </Section>

      {/* ── PONTOS DE ATENÇÃO ── */}
      <Section title="Pontos Críticos de Atenção" icon={AlertTriangle}>

        <Highlight color="rose">
          <h4 className="font-bold text-[15px] mb-2">🦴 1. Massa Óssea em Declínio (3,0 → 2,7 kg)</h4>
          <p className="text-[13px] mb-2">
            <strong>Este é o ponto de maior atenção nutricional</strong>. A perda de 10% da massa
            óssea em 4 meses é incompatível apenas com perda de peso fisiológica — sugere déficit
            de micronutrientes osteo-estruturais e/ou efeito da queda hormonal da perimenopausa.
          </p>
          <p className="text-[13px] mb-2"><strong>Ações nutricionais imediatas:</strong></p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li><strong>Cálcio:</strong> 1.200 mg/dia (laticínios desnatados 3 porções, vegetais verde-escuros, sardinha)</li>
            <li><strong>Vitamina D3:</strong> suplementação de 2.000 UI/dia (avaliar dosagem sérica)</li>
            <li><strong>Vitamina K2 (MK-7):</strong> 90–180 mcg/dia (direciona cálcio para ossos, fora de tecidos moles)</li>
            <li><strong>Magnésio:</strong> 350 mg/dia (sementes, oleaginosas, cacau 70%+)</li>
            <li><strong>Proteína suficiente:</strong> 1,5–1,8 g/kg/dia (proteção óssea direta)</li>
            <li><strong>Reduzir:</strong> excesso de cafeína (&gt; 3 cafés/dia) e refrigerantes fosfatados</li>
          </ul>
        </Highlight>

        <Highlight color="amber">
          <h4 className="font-bold text-[15px] mb-2">📉 2. Gordura Visceral Ainda em Risco Médio</h4>
          <p className="text-[13px]">
            Embora a redução tenha sido excepcional (-45,6%), o valor de 4,3 ainda exige atenção.
            A meta de manter abaixo de 3,0 está ao alcance em 8–10 semanas se mantida a estratégia
            atual + fibras solúveis + restrição de açúcares simples.
          </p>
        </Highlight>

        <Highlight color="blue">
          <h4 className="font-bold text-[15px] mb-2">🎯 3. Transição para Manutenção</h4>
          <p className="text-[13px]">
            Com 2,4 kg do peso ideal, recomendo planejar agora a transição. A perda nas próximas
            8 semanas deve ser de 0,3 kg/semana (mais lenta que a atual). Em seguida, aumentar
            calorias em 10–15% para fase de "platô controlado" antes da manutenção definitiva.
            Esta fase é crítica para evitar recuperação ponderal (efeito sanfona).
          </p>
        </Highlight>
      </Section>

      {/* ── PLANO DE AÇÃO ── */}
      <Section title="Plano de Ação Nutricional — Próximos 90 Dias" icon={Target}>
        <ActionItem
          priority="alta"
          title="Ajuste proteico para 1,8 g/kg"
          detail="Elevar ingestão diária para 105 g de proteína distribuída em 4–5 refeições (25–30 g cada). Priorizar proteínas com alto valor biológico e BCAA elevado (leucina ≥ 2,5 g por refeição)."
        />
        <ActionItem
          priority="alta"
          title="Protocolo osteoprotetor"
          detail="Iniciar imediatamente suplementação D3 (2.000 UI) + K2 (180 mcg) + Cálcio 1.200 mg + Magnésio 350 mg/dia. Solicitar à endocrinologista dosagem sérica de 25-OH-D, PTH, cálcio iônico e fosfatase alcalina."
        />
        <ActionItem
          priority="alta"
          title="Aumento de fibras solúveis"
          detail="Mínimo de 25 g/dia. Implementar: aveia em flocos no café da manhã (3 col./dia), psyllium (5 g antes do almoço), leguminosas 4–5x/semana, frutas com casca em todas as refeições principais."
        />
        <ActionItem
          priority="media"
          title="Implementar carb-cycling"
          detail="Carboidrato mais alto (170 g) em dias de treino de força (4 dias/semana), mais baixo (120 g) em dias de cardio-leve ou descanso. Melhora sensibilidade à insulina e otimiza queima de gordura."
        />
        <ActionItem
          priority="media"
          title="Otimização do jantar"
          detail="Reduzir carboidrato de IG médio-alto após 19h. Privilegiar proteína + vegetais + gordura boa. Melhora qualidade do sono (relevante na perimenopausa) e gestão noturna da glicemia."
        />
        <ActionItem
          priority="baixa"
          title="Refeição livre estruturada (1x/semana)"
          detail="Sábado ao almoço — sem restrições mas mantendo proteína no prato. Funcional do ponto de vista metabólico (leptina) e psicológico (adesão a longo prazo)."
        />
      </Section>

      {/* ── REFERÊNCIAS CIENTÍFICAS ── */}
      <Section title="Bibliografia Consultada" icon={BookOpen}>
        <Reference>
          <strong>Phillips SM</strong>, et al. <em>Protein requirements in older adults to prevent
          sarcopenia and support healthy aging.</em> American Journal of Clinical Nutrition, 2016.
          (Recomendação 1,8–2,0 g/kg em fase de restrição calórica)
        </Reference>
        <Reference>
          <strong>Heyward VH, Wagner DR.</strong> <em>Applied Body Composition Assessment, 3rd ed.</em>{' '}
          Human Kinetics, 2014. (Faixas de gordura corporal por idade e sexo)
        </Reference>
        <Reference>
          <strong>Gallagher D</strong>, et al. <em>Healthy percentage body fat ranges: an approach
          for developing guidelines based on body mass index.</em> Am J Clin Nutr, 2000.
        </Reference>
        <Reference>
          <strong>Després JP, Lemieux I.</strong> <em>Abdominal obesity and metabolic syndrome.</em>{' '}
          Nature, 2012. (Risco cardiometabólico da gordura visceral)
        </Reference>
        <Reference>
          <strong>Neeland IJ</strong>, et al. <em>Visceral and ectopic fat, atherosclerosis, and
          cardiometabolic disease: a position statement.</em> Lancet Diabetes Endocrinol, 2019.
        </Reference>
        <Reference>
          <strong>Janssen I</strong>, et al. <em>Low relative skeletal muscle mass (sarcopenia) in
          older persons is associated with functional impairment and physical disability.</em>{' '}
          J Am Geriatr Soc, 2002.
        </Reference>
        <Reference>
          <strong>Stachowiak G</strong>, et al. <em>Metabolic disorders in menopause.</em> Przegląd
          Menopauzalny / Menopause Review, 2015. (Alterações nutricionais na perimenopausa)
        </Reference>
        <Reference>
          <strong>SBAN — Sociedade Brasileira de Alimentação e Nutrição.</strong> Recomendações
          Nutricionais para Brasileiros — Adultos. Atualização 2023.
        </Reference>
      </Section>

    </DetailLayout>
  );
}
