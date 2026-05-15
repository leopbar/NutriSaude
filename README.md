# NutriSaúde — Acompanhamento Clínico Integrado

Aplicação web para acompanhamento nutricional, endocrinológico e de performance física, com base em dados de bioimpedância. Desenvolvida como demonstração técnica do caso clínico da paciente **Eliane Viana** (44 anos), com 4 medições reais ao longo de 4 meses.

## ✨ Funcionalidades

- 📊 **Dashboard** com KPIs, gráfico de evolução temporal e composição corporal (donut)
- 🩺 **Pareceres detalhados** com 3 especialistas (Nutricionista, Endocrinologista, Personal Trainer)
- 📋 **Histórico completo** dos 18 indicadores da bioimpedância agrupados em 6 categorias clínicas
- 🎯 **Metas terapêuticas** com barras de progresso (peso, gorduras, taxa muscular, idade metabólica)
- 🏋️ **Programa de treinos** semanal (Segunda a Sexta) com aeróbico e musculação
- 🍽️ **Cardápio semanal** com macros, calorias por refeição e recomendações da nutricionista
- 📱 **Totalmente responsivo** — funciona em qualquer celular
- 🔬 **Análises baseadas em literatura científica** (Phillips, Heyward, Després, EWGSOP2, LIFTMOR, SBEM, FEBRASGO)

## 🚀 Stack

- **React 18** + **TypeScript** + **Vite 5**
- **Tailwind CSS 3** com paleta customizada
- **Recharts** para gráficos
- **Lucide React** + **React Icons** (MDI, Game Icons) para ícones
- Navegação por **scrollspy** automática na sidebar

## 📦 Instalação

```bash
npm install
npm run dev
```

Acesse [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

```bash
npm run build
npm run preview
```

## 📁 Estrutura

```
src/
├── App.tsx                  # Orquestração do dashboard e roteamento de detalhes
├── components/              # Componentes da tela principal
│   ├── Sidebar.tsx          # Menu lateral com scrollspy
│   ├── Topbar.tsx
│   ├── KpiCards.tsx
│   ├── EvolutionChart.tsx
│   ├── BodyComposition.tsx
│   ├── HistoryTable.tsx
│   ├── TeamCards.tsx
│   ├── GoalsCard.tsx
│   ├── CongratsCard.tsx
│   ├── TrainingSchedule.tsx
│   └── MealPlan.tsx
├── pages/                   # Páginas de parecer detalhado
│   ├── DetailLayout.tsx
│   ├── NutritionalDetail.tsx
│   ├── EndocrinologicalDetail.tsx
│   └── PersonalTrainerDetail.tsx
└── data/
    └── eliane.ts            # Medições da paciente (4 avaliações × 18 indicadores)
```

## 📚 Bibliografia consultada

As análises detalhadas foram fundamentadas em literatura científica internacional, incluindo:

- Phillips SM. *Protein requirements in older adults* — AJCN, 2016
- Heyward & Wagner. *Applied Body Composition Assessment*, 3rd ed.
- Després JP, Lemieux I. *Abdominal obesity and metabolic syndrome* — Nature, 2012
- Cruz-Jentoft AJ et al. *EWGSOP2 — Sarcopenia consensus* — Age and Ageing, 2019
- Watson SL et al. *LIFTMOR randomized controlled trial* — J Bone Miner Res, 2018
- SBEM, FEBRASGO, ABRASSO, ACSM, CREF, SBAN

## 👤 Autor

**Leonardo Barretti** — Criador

## 📄 Licença

Projeto demonstrativo de uso técnico/educacional.
