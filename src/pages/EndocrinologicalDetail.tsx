import { Stethoscope, FileText, AlertTriangle, Target, Activity, BookOpen, FlaskConical, Heart } from 'lucide-react';
import DetailLayout, { Section, MetricRow, ActionItem, Reference, Highlight } from './DetailLayout';
import { first, latest, patient } from '../data/eliane';

const fmt = (v: number, d = 1) =>
  v.toLocaleString('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });

export default function EndocrinologicalDetail({ onBack }: { onBack: () => void }) {
  const visceralReduction = ((1 - latest.gorduraVisceral / first.gorduraVisceral) * 100).toFixed(1);
  const metabolicAgeAdvantage = patient.age - latest.idadeMetabolica;
  const tmbDelta = first.tmb - latest.tmb;

  return (
    <DetailLayout
      onBack={onBack}
      title="Análise Endocrinológica Detalhada"
      professional="Dr. Roberto Almeida"
      registry="CRM 54.321"
      specialty="Endocrinologia e Metabologia"
      score={85}
      scoreLabel="Muito Bom"
      theme="blue"
      Icon={Stethoscope}
    >

      {/* ── RESUMO EXECUTIVO ── */}
      <Section title="Resumo Executivo Clínico" icon={FileText}>
        <p>
          Paciente <strong>{patient.name}, {patient.age} anos, sexo feminino</strong>, sem comorbidades
          conhecidas, em <strong>fase de perimenopausa</strong> (faixa etária 40–50 anos), apresenta
          quadro de <strong>recomposição corporal favorável</strong> e <strong>melhora expressiva do
          perfil cardiometabólico</strong> ao longo dos 4 meses de acompanhamento.
        </p>
        <p>
          Do ponto de vista endocrinológico, destacam-se três achados extraordinariamente positivos:
          (1) <strong>redução da gordura visceral em {visceralReduction}%</strong> (7,9 → 4,3) —
          o parâmetro mais crítico para risco cardiovascular e diabetes tipo 2 em mulheres na
          perimenopausa; (2) <strong>normalização do IMC</strong> de 25,3 (sobrepeso) para 21,5
          (eutrofia); (3) <strong>redução da idade metabólica</strong> de 32 para 29 anos —
          posicionamento ~{metabolicAgeAdvantage} anos <em>abaixo</em> da idade cronológica.
        </p>
        <p>
          Em contrapartida, três pontos exigem investigação e seguimento atento:{' '}
          <strong>(1)</strong> a <strong>perda óssea de 10%</strong> em apenas 4 meses (3,0 → 2,7 kg)
          — sugere início de osteopenia perimenopáusica e requer densitometria;{' '}
          <strong>(2)</strong> a <strong>redução da TMB em {tmbDelta} kcal</strong> (1.433 → 1.348)
          é parcialmente fisiológica (menor massa corporal) mas pode também refletir adaptação
          metabólica ao déficit — necessita controle laboratorial tireoideano;{' '}
          <strong>(3)</strong> a interpretação da <strong>idade metabólica de 29 anos</strong> deve
          ser feita com parcimônia clínica — discutida em detalhes adiante.
        </p>
        <p>
          Plano endocrinológico: <strong>monitoramento perimenopausal estruturado</strong>, painel
          laboratorial completo (TSH, T4L, glicemia, HOMA-IR, perfil lipídico, 25-OH-D, PTH, FSH,
          LH, estradiol), <strong>densitometria óssea</strong> (DXA) prioritária, e reavaliação em
          12 semanas.
        </p>
      </Section>

      {/* ── ANTROPOMETRIA E IMC ── */}
      <Section title="Antropometria e Classificação Nutricional" icon={Activity}>
        <p>
          O <strong>Índice de Massa Corporal</strong>, apesar de suas limitações conhecidas (não
          diferencia massa magra de gorda, não considera distribuição corporal), permanece como
          parâmetro de triagem populacional validado pela OMS, com forte correlação com risco
          metabólico em mulheres de meia-idade.
        </p>

        <MetricRow
          label="Índice de Massa Corporal (IMC)"
          current={fmt(latest.imc, 1)}
          previous={fmt(first.imc, 1)}
          target="18,5–24,9 (eutrofia)"
          classification="Eutrófica ✓"
          status="excellent"
          interpretation="Saiu da faixa de sobrepeso (25,0–29,9) para eutrofia (18,5–24,9). A queda de 3,8 pontos é robusta. Pela classificação OMS, sai da categoria de risco metabólico aumentado. Atenção: meta de IMC para mulher 44 anos não deve ser abaixo de 20,0 — risco de baixa massa óssea e desregulação hormonal."
        />

        <MetricRow
          label="Peso Corporal"
          current={`${fmt(latest.peso)} kg`}
          previous={`${fmt(first.peso)} kg`}
          target={`${fmt(patient.pesoIdeal)} kg (ideal)`}
          classification="Próximo do ideal"
          status="good"
          interpretation="Redução de 10,3 kg (15% do peso inicial) em 4 meses, taxa de 0,6% do peso/semana — perfeitamente dentro da recomendação clínica (< 1%/semana). A 2,4 kg do peso ideal calculado por bioimpedância."
        />
      </Section>

      {/* ── GORDURA VISCERAL — A PRIORIDADE ── */}
      <Section title="Gordura Visceral: Avaliação Cardiometabólica" icon={Heart}>
        <p>
          A <strong>gordura visceral</strong> é o tecido adiposo localizado em torno dos órgãos
          intra-abdominais (fígado, pâncreas, mesentério). Diferente da gordura subcutânea, é
          <strong> altamente metabolicamente ativa</strong> — secreta citocinas pró-inflamatórias
          (TNF-α, IL-6), adipocinas (resistina, leptina) e ácidos graxos livres que atingem o
          fígado pela veia porta. Está fortemente associada a:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-[13px]">
          <li><strong>Resistência insulínica</strong> e progressão para diabetes tipo 2</li>
          <li><strong>Esteatose hepática não-alcoólica</strong> (DHGNA)</li>
          <li><strong>Dislipidemia aterogênica</strong> (LDL pequeno e denso elevado, HDL reduzido)</li>
          <li><strong>Hipertensão arterial</strong></li>
          <li><strong>Risco cardiovascular maior</strong> (Després, Nature 2012)</li>
          <li><strong>Risco oncológico</strong> (mama pós-menopausa, endométrio, colorretal)</li>
        </ul>

        <MetricRow
          label="Gordura Visceral (Tanita)"
          current={fmt(latest.gorduraVisceral, 1)}
          previous={fmt(first.gorduraVisceral, 1)}
          target="< 3,0 (excelente)"
          classification="Médio Risco"
          status="attention"
          interpretation={`Classificação Tanita: 1–9 normal, 10–14 alto risco, ≥15 muito alto risco. Valor atual (4,3) está na faixa normal-superior, mas para mulher em perimenopausa o objetivo deve ser <3 (eliminação de risco residual). A redução de ${visceralReduction}% foi excepcional e deve ser celebrada — equivale a ~3,5 kg de tecido adiposo perivisceral, com reversão esperada de marcadores inflamatórios e melhora da sensibilidade insulínica.`}
        />

        <Highlight color="amber">
          <h4 className="font-bold text-[15px] mb-2">📊 Implicações Cardiometabólicas Estimadas</h4>
          <p className="text-[13px] mb-2">
            Com base nos dados de Després (2012) e Neeland (2019), a redução de ~3,6 unidades de
            gordura visceral em mulher na perimenopausa está associada à:
          </p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li>Redução estimada de <strong>~25–35% no risco relativo de DM2 em 5 anos</strong></li>
            <li>Redução estimada de <strong>~15–20% no risco cardiovascular</strong> (cálculo Framingham)</li>
            <li>Melhora esperada do HDL em <strong>+5 a +10 mg/dL</strong></li>
            <li>Redução esperada de triglicerídeos em <strong>20–30%</strong></li>
            <li>Melhora da sensibilidade insulínica (HOMA-IR) em <strong>~20–30%</strong></li>
          </ul>
          <p className="text-[13px] mt-2">
            <strong>Recomendação:</strong> solicitar painel laboratorial em 90 dias para confirmar
            magnitude da melhora bioquímica.
          </p>
        </Highlight>
      </Section>

      {/* ── METABOLISMO BASAL ── */}
      <Section title="Taxa Metabólica Basal e Idade Metabólica" icon={Activity}>
        <p>
          A <strong>Taxa Metabólica Basal (TMB)</strong> representa o gasto energético mínimo para
          manutenção das funções vitais em repouso. Em mulheres, declina aproximadamente{' '}
          <strong>2–3% por década</strong> a partir dos 30 anos, com aceleração durante a transição
          menopausal devido à perda de massa magra (sarcopenia) e à queda do estrogênio.
        </p>

        <MetricRow
          label="TMB (Taxa Metabólica Basal)"
          current={`${latest.tmb} kcal/dia`}
          previous={`${first.tmb} kcal/dia`}
          target="Manter > 1.300 kcal"
          classification="Adequada"
          status="good"
          interpretation={`Redução de ${tmbDelta} kcal (~5,9%) — proporcional à perda de 15% do peso corporal e à pequena redução absoluta de massa muscular. O TMB observado (1.348 kcal) está dentro do esperado para mulher de 58,5 kg, 44 anos e composição corporal atual (Mifflin-St Jeor prevê ~1.310 kcal). Não há sinal de adaptação metabólica patológica ("starvation mode"), mas monitoramento é prudente.`}
        />

        <MetricRow
          label="Idade Metabólica"
          current={`${latest.idadeMetabolica} anos`}
          previous={`${first.idadeMetabolica} anos`}
          target={`< ${patient.age} anos`}
          classification="Excelente"
          status="excellent"
          interpretation={`Idade metabólica ${metabolicAgeAdvantage} anos abaixo da cronológica é resultado favorável. NOTA CLÍNICA IMPORTANTE: este parâmetro é proprietário das balanças Tanita/Fitdays e representa a idade média populacional cuja TMB se assemelha à TMB atual da paciente — não é um marcador biológico padronizado. Útil como indicador qualitativo de evolução, mas não substitui marcadores bioquímicos de envelhecimento celular.`}
        />

        <Highlight color="blue">
          <h4 className="font-bold text-[14px] mb-2">🔬 Interpretação Clínica da Idade Metabólica</h4>
          <p className="text-[13px]">
            A "idade metabólica de 29 anos" reflete que o gasto basal atual da paciente
            (1.348 kcal) é equivalente ao gasto médio populacional de uma mulher de 29 anos.
            Isso é consistente com sua atual composição corporal favorável (taxa muscular 72,8%,
            gordura corporal 22,6%). <strong>Não significa</strong> que ela seja biologicamente
            mais jovem — para isso, marcadores específicos seriam necessários (comprimento de
            telômeros, idade epigenética por metilação de DNA, perfil inflamatório). Mas{' '}
            <strong>significa</strong>, sim, que sua composição corporal está protegida contra a
            queda metabólica esperada para sua faixa etária.
          </p>
        </Highlight>
      </Section>

      {/* ── PERIMENOPAUSA ── */}
      <Section title="Contexto Hormonal: Perimenopausa" icon={Activity}>
        <p>
          Aos 44 anos, a paciente está na <strong>janela típica da perimenopausa</strong> — fase de
          transição que precede a menopausa propriamente dita (cessação definitiva da menstruação)
          e que pode durar de 4 a 10 anos. Esta fase é caracterizada por:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-[13px]">
          <li>
            <strong>Flutuação estrogênica:</strong> picos e quedas mais erráticos, com tendência
            geral à redução progressiva
          </li>
          <li>
            <strong>Elevação progressiva do FSH</strong> — marcador-chave da reserva ovariana em queda
          </li>
          <li>
            <strong>Mudança na distribuição da gordura corporal</strong> — de ginóide (quadris/coxas)
            para androide (visceral)
          </li>
          <li>
            <strong>Aumento da resistência à insulina</strong> — mesmo sem alteração do peso
          </li>
          <li>
            <strong>Aceleração da perda óssea</strong> — pode chegar a 2% ao ano
          </li>
          <li>
            <strong>Redução do sono profundo</strong> e da síntese de GH noturno
          </li>
          <li>
            <strong>Sintomas vasomotores:</strong> fogachos, suores noturnos (avaliar presença)
          </li>
        </ul>
        <p>
          A <strong>evolução clínica observada</strong> sugere fortemente que a paciente está
          <strong> respondendo bem</strong> a este desafio fisiológico — a queda do estrogênio que
          favoreceria acúmulo de gordura visceral foi <strong>compensada</strong> pela intervenção
          multidisciplinar (alimentação + treino).
        </p>
      </Section>

      {/* ── MASSA ÓSSEA — CRÍTICO ── */}
      <Section title="Massa Óssea: Sinal de Alerta Clínico" icon={AlertTriangle}>
        <MetricRow
          label="Massa Óssea"
          current={`${fmt(latest.massaOssea)} kg`}
          previous={`${fmt(first.massaOssea)} kg`}
          target="≥ 2,9 kg"
          classification="Atenção"
          status="risk"
          interpretation="Perda de 0,3 kg de massa óssea em 4 meses representa redução de 10% — magnitude clinicamente significativa. Em mulher na perimenopausa, parte é fisiológica (queda do estrogênio reduz formação óssea), mas o ritmo observado é compatível com osteopenia inicial. PRIORIDADE: solicitar densitometria óssea (DXA) — exame padrão-ouro."
        />

        <Highlight color="rose">
          <h4 className="font-bold text-[15px] mb-2">🚨 Conduta Clínica para Massa Óssea</h4>
          <p className="text-[13px] mb-2"><strong>Exames complementares prioritários:</strong></p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li><strong>Densitometria Óssea (DXA)</strong> — coluna lombar e fêmur — interpretação por T-score</li>
            <li><strong>25-Hidroxivitamina D</strong> (meta: 40–60 ng/mL)</li>
            <li><strong>PTH</strong> (paratormônio) e <strong>Cálcio iônico</strong></li>
            <li><strong>Fosfatase alcalina</strong> (marcador de turnover ósseo)</li>
            <li><strong>CTX sérico</strong> (telopeptídeo C-terminal — marcador de reabsorção óssea)</li>
            <li><strong>Magnésio sérico</strong></li>
            <li><strong>FSH, LH, Estradiol</strong> (caracterização do status perimenopausal)</li>
          </ul>
          <p className="text-[13px] mt-2"><strong>Conduta terapêutica conforme resultados:</strong></p>
          <ul className="text-[13px] space-y-1 ml-4 list-disc">
            <li>
              Se 25-OH-D &lt; 30 ng/mL: <strong>reposição com colecalciferol</strong> 50.000 UI semanais
              por 8 semanas, seguido de manutenção 2.000 UI/dia
            </li>
            <li>
              Se T-score ≤ -1,0 (osteopenia): instituir <strong>exercício de impacto controlado</strong>{' '}
              + cálcio + vitamina D + reavaliação anual
            </li>
            <li>
              Se T-score ≤ -2,5 (osteoporose): considerar <strong>bisfosfonatos</strong>,{' '}
              denosumabe ou terapia hormonal (avaliar contraindicações)
            </li>
            <li>
              Se sintomas vasomotores expressivos + perda óssea acelerada:{' '}
              discutir <strong>terapia de reposição hormonal (TRH)</strong> com a paciente,
              ponderando riscos/benefícios individualizados
            </li>
          </ul>
        </Highlight>
      </Section>

      {/* ── PERFIL HIDROELETROLÍTICO ── */}
      <Section title="Hidratação e Implicações Endócrinas" icon={Activity}>
        <p>
          O percentual de <strong>água corporal subiu de 49,1% para 53,1%</strong> — melhora
          relevante. A hidratação adequada (≥ 50% em mulheres) está associada a:
        </p>
        <ul className="list-disc ml-6 space-y-1 text-[13px]">
          <li>Melhor função tubular renal e clearance de creatinina</li>
          <li>Otimização da função tireoidiana (a desidratação reduz conversão de T4 em T3)</li>
          <li>Melhor regulação glicêmica e sensibilidade insulínica</li>
          <li>Menor risco de litíase renal (relevante: pacientes em dietas hiperproteicas)</li>
        </ul>

        <MetricRow
          label="Água Corporal"
          current={`${fmt(latest.aguaCorporal)}%`}
          previous={`${fmt(first.aguaCorporal)}%`}
          target="≥ 50%"
          classification="Excelente"
          status="excellent"
          interpretation="Hidratação ótima. Suportar com 35 ml/kg/dia (~2,1 L) — atenção a dietas com whey e creatina, que aumentam demanda hídrica."
        />
      </Section>

      {/* ── EXAMES SOLICITADOS ── */}
      <Section title="Painel Laboratorial Solicitado" icon={FlaskConical}>
        <p>Para a próxima consulta (recomendo em 60–90 dias), solicito os seguintes exames:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
          <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
            <h4 className="font-bold text-[13px] text-blue-900 mb-2">Metabolismo Geral</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li>• Glicemia de jejum + Hemoglobina glicada (HbA1c)</li>
              <li>• Insulina basal + HOMA-IR</li>
              <li>• Perfil lipídico completo (CT, LDL, HDL, TG, não-HDL)</li>
              <li>• PCR ultrassensível (inflamação subclínica)</li>
              <li>• Ácido úrico, ureia, creatinina</li>
              <li>• TGO, TGP, GGT (função hepática)</li>
            </ul>
          </div>

          <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
            <h4 className="font-bold text-[13px] text-blue-900 mb-2">Função Endócrina</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li>• TSH ultrassensível + T4 livre</li>
              <li>• Anti-TPO, Anti-Tg (autoimunidade tireoidiana)</li>
              <li>• FSH, LH, Estradiol (status perimenopausal)</li>
              <li>• Progesterona (fase lútea — se ciclos regulares)</li>
              <li>• Cortisol salivar (4 amostras circadianas)</li>
              <li>• DHEA-S</li>
            </ul>
          </div>

          <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
            <h4 className="font-bold text-[13px] text-blue-900 mb-2">Vitaminas e Minerais</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li>• 25-Hidroxivitamina D (alvo: 40–60 ng/mL)</li>
              <li>• Vitamina B12 + Folato</li>
              <li>• Ferritina + Saturação de transferrina</li>
              <li>• Zinco e Magnésio séricos</li>
              <li>• Cálcio iônico + PTH</li>
            </ul>
          </div>

          <div className="border border-blue-200 bg-blue-50/50 rounded-lg p-4">
            <h4 className="font-bold text-[13px] text-blue-900 mb-2">Imagem</h4>
            <ul className="text-[12px] space-y-1 text-slate-700">
              <li>• <strong>Densitometria Óssea (DXA)</strong> — PRIORIDADE</li>
              <li>• USG abdome total (avaliação esteatose hepática)</li>
              <li>• USG transvaginal (rotina ginecológica anual)</li>
              <li>• Mamografia (rastreio anual a partir dos 40)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* ── PLANO DE AÇÃO ── */}
      <Section title="Plano Terapêutico — Próximos 90 Dias" icon={Target}>
        <ActionItem
          priority="alta"
          title="Densitometria Óssea Imediata"
          detail="Solicitar DXA de coluna lombar (L1–L4) e fêmur. Resultado norteará condução: vigilância vs. intervenção farmacológica."
        />
        <ActionItem
          priority="alta"
          title="Suplementação D3 + Cofatores"
          detail="Iniciar Colecalciferol 2.000 UI/dia + Vitamina K2 (MK-7) 180 mcg/dia + Cálcio 600 mg (apenas se ingestão alimentar < 1.000 mg/dia) + Magnésio quelado 350 mg/dia, ajustar conforme exames."
        />
        <ActionItem
          priority="alta"
          title="Painel Laboratorial Completo"
          detail="Solicitar exames listados (metabolismo + endócrino + nutrientes). Retorno em 30 dias após coleta."
        />
        <ActionItem
          priority="media"
          title="Discussão sobre Terapia Hormonal"
          detail="Aguardar resultados de FSH/LH/Estradiol + DXA. Se confirmação de perimenopausa + perda óssea acelerada + sintomas, discutir terapia hormonal (estrogênio transdérmico ± progesterona). Avaliar contraindicações (história familiar de câncer de mama, tromboembolia)."
        />
        <ActionItem
          priority="media"
          title="Monitoramento Cardiovascular"
          detail="Ergometria ou Teste Cardiopulmonar de Exercício (TCPE) — avaliar capacidade funcional e excluir isquemia silenciosa antes de progressão de carga no treino."
        />
        <ActionItem
          priority="baixa"
          title="Reavaliação Bioimpedância"
          detail="Manter mensal por mais 3 meses; após estabilização do peso, trimestral. Padronizar horário, jejum e estado de hidratação para comparação válida."
        />
      </Section>

      {/* ── REFERÊNCIAS ── */}
      <Section title="Bibliografia Consultada" icon={BookOpen}>
        <Reference>
          <strong>Després JP, Lemieux I.</strong> <em>Abdominal obesity and metabolic syndrome.</em>{' '}
          Nature. 2012;414:881–887.
        </Reference>
        <Reference>
          <strong>Neeland IJ, Ross R, Després JP, et al.</strong> <em>Visceral and ectopic fat,
          atherosclerosis, and cardiometabolic disease: a position statement.</em> Lancet Diabetes
          Endocrinol. 2019;7(9):715–725.
        </Reference>
        <Reference>
          <strong>Davis SR, Lambrinoudaki I, Lumsden M, et al.</strong> <em>Menopause.</em> Nat Rev
          Dis Primers. 2015;1:15004.
        </Reference>
        <Reference>
          <strong>Greendale GA, Sternfeld B, Huang M, et al.</strong> <em>Changes in body composition
          and weight during the menopause transition.</em> JCI Insight. 2019;4(5):e124865.
        </Reference>
        <Reference>
          <strong>SBEM — Sociedade Brasileira de Endocrinologia e Metabologia.</strong> Diretriz
          Brasileira para Diagnóstico e Tratamento da Osteoporose em Mulheres na Pós-Menopausa. 2022.
        </Reference>
        <Reference>
          <strong>FEBRASGO — Federação Brasileira das Associações de Ginecologia e Obstetrícia.</strong>{' '}
          Manual de Climatério e Menopausa. 3ª ed. 2023.
        </Reference>
        <Reference>
          <strong>ABRASSO — Associação Brasileira de Avaliação Óssea e Osteometabolismo.</strong>{' '}
          Posicionamento sobre Vitamina D e Saúde Óssea. 2024.
        </Reference>
        <Reference>
          <strong>ENDO Society Clinical Practice Guidelines.</strong> <em>Pharmacological Management
          of Osteoporosis in Postmenopausal Women.</em> J Clin Endocrinol Metab. 2019;104(5).
        </Reference>
      </Section>

    </DetailLayout>
  );
}
