# Toss (토스) Reference Design System

<!-- design-md:section experience -->
## 1. Experience

### Visual Theme & Atmosphere

Toss는 소비자의 중요한 금전적 결정을 즉답 가능하고 시각적으로 차분하게 느끼게 만들려는 통합 금융 플랫폼입니다. 공개된 디자인은 두 갈래로 나뉩니다: TDS Mobile은 크고 터치 중심적인 컨트롤과 명시적인 상태 계약을 갖춘 제품 UI를 문서화하고, `toss.im`은 더 좁은 마케팅 웹 버튼 시스템을 사용합니다. 두 시스템 모두에서 강한 액션 컬러, 평이한 언어, 넉넉한 위계, 전용 타이포그래피가 금융에 대한 심리적 거리감을 줄입니다. 이 문서는 제품과 마케팅 표면을 하나의 가짜 공용 컴포넌트로 억지로 합치지 않고 분리해서 유지합니다.

검증된 공통 언어는 Toss Product Sans, 밝은 인터랙션 액센트(현재는 오렌지 `#FF6000`), 웜 뉴트럴 톤, 직접적인 위계입니다. 아래 정확한 값은 현재 계산된 스타일 또는 현재 공식 TDS 문서로 한정합니다.

**Key Characteristics:**
- Product primary `#FF6000`; marketing weak CTA `#F2EDE6` / `#1C1C1C`
- Toss Product Sans loaded and used across all 810 visible TDS observations
- Four documented TDS button sizes with explicit loading and disabled behavior
- Surface-specific component geometry rather than one blended “Toss style”

### Do's and Don'ts

### Do
- Keep TDS Mobile and `toss.im` marketing variants explicitly named by surface.
- Use `Toss Product Sans` where the font is available, with a system fallback for resilience.
- Preserve documented loading, disabled, pressed, and keyboard-focus states on buttons.
- Treat badge content as status metadata, not as an action affordance.
- Use exact component geometry only where the evidence names a size and surface.

### Don't
- Don't use logo brand color as a silent replacement for UI primary `#FF6000`.
- Don't claim Tossface is the visible primary UI font; it was declared but unused in this capture.
- Don't copy documentation-site colors into native product tokens without component-level evidence.
- Don't merge the 16px TDS radius with the 7px marketing radius into an average value.
- Don't invent cards, shadows, tabs, toasts, or dialogs from generic fintech conventions.

### Brand Narrative

Toss는 금융을 개별 기관들의 파편이 아니라 하나로 연결된 제품 경험으로 제시합니다. 디자인 시스템은 확인, 비교, 동의, 결제, 복구처럼 반복되는 행동들을 기반 금융 상품이 달라도 일관되게 느끼도록 돕습니다.

회사의 1차 디자인 문서는 이 일관성이 어떻게 브랜드 시스템으로 제품 내부에 자리 잡았는지 보여줍니다. 제품 브랜딩은 캠페인 포장이 아니라 기능을 사용하는 동안 사람이 받는 경험 자체로 다뤄집니다. Toss Product Sans는 같은 논리를 타이포그래피로 확장한 것으로, 숫자·기호·한글·다양한 디지털/오프라인 맥락을 하나의 제품 문제로 다뤘습니다.

실무적인 디자인 태도는 결국 "명료함과 추진력"입니다. **Easy to answer**는 의사결정의 인지 비용을 줄이고, **Value first, cost later**는 커밋 이전에 이익을 먼저 눈에 보이게 만듭니다. 컬러, 타이포그래피, 모션, 마이크로카피는 사람이 돈과 관련된 일을 더 확신 있게 통과하도록 도울 때만 의미가 있습니다.

### Principles

The following are implementation principles derived from the verified surfaces, not quoted corporate doctrine:

1. Separate product-system evidence from marketing-surface evidence.
2. Make interaction color (`#FF6000`) functional rather than decorative.
3. Preserve component states, especially disabled, loading, pressed, and keyboard focus.
4. Prefer exact, readable typography over ornamental depth.
5. Treat financial outcomes as explicit states with clear next actions.

### Personas

These are first-party product contexts, not invented demographic personas.

- **A person answering a financial question:** needs options translated into concrete, comparable choices rather than a dense form or open-ended prompt.
- **A person evaluating value before effort:** needs the likely benefit made visible before consent, document upload, consultation, or payment is requested.
- **A person recovering from an interrupted flow:** needs the current state, consequence, and next safe action stated explicitly, especially in insurance, payment, or account contexts.

<!-- design-md:section foundations -->
## 2. Foundations

<!-- design-md:claim foundations kind=rules-or-constraints lang=en -->
### Color Palette & Roles

### Product and shared roles
- **Primary** (`#FF6000`): TDS interaction accent and primary action reference.
- **Primary Hover / Strong Accent** (`#E65600`): Primary보다 한 톤 진한 hover 상태 컬러.
- **Canvas** (`#F9F9F9`): principal light background.
- **Foreground** (`#1C1C1C`): strongest product text.
- **Body** (`#333333`): emphasized body and neutral action text.
- **Muted** (`#7A7A7A`): secondary product text.
- **Surface** (`#F2EDE6`): quiet neutral / warm layer.
- **Border** (`#E5E0D8`): light divider or outline reference.
- **On Primary** (`#ffffff`): text on filled primary actions.
- **Danger** (`#e42939`): destructive/error text observed in the current TDS page.

### Marketing-web roles
- **Weak Background** (`#F2EDE6`) and **Weak Foreground** (`#1C1C1C`): `toss.im`-스타일 CTA 페어.
- 로고/브랜드 컬러는 카탈로그 아이덴티티 메타데이터이며, UI Primary `#FF6000`과는 별도로 관리합니다.
<!-- design-md:claim-end -->

### Depth & Elevation

No canonical shadow token is promoted in this revision. The inspected evidence contains documentation-site chrome as well as TDS examples, so treating every computed shadow as a Toss product token would overstate the source. Use flat color layering until a component-specific official source verifies elevation.

### Motion & Easing

No canonical motion duration or easing token is promoted in this revision. Preserve state clarity and reduced-motion compatibility, but label any exact animation curve or duration as a local extension until it is verified from an official component source.

<!-- design-md:section typography-assets -->
## 3. Typography & Assets

### Typography Rules

### Font Family
- **Canonical visible UI family**: `Toss Product Sans`. The collector found 810 visible first-family uses backed by loaded FontFace resources.
- **Tossface status**: declared in FontFace resources but not observed as the first family on a visible element. It is therefore context, not a canonical UI token.
- **Monospace**: no current canonical monospace claim.

### Current TDS documentation hierarchy

| Role | Size | Weight | Line Height | Evidence |
|---|---:|---:|---:|---|
| H1 | 36px | 700 | 54px | computed TDS documentation style |
| H2 | 30px | 600 | 45px | computed TDS documentation style |
| H3 | 24px | 600 | 36px | computed TDS documentation style |
| H4 | 22px | 600 | 33px | computed TDS documentation style |
| Body | 16px | 400 | 24px | dominant visible role |
| Body Small | 14px | 400 | 21px | secondary visible role |

These are evidence-backed public-document roles, not a claim that every native Toss product screen uses this exact hierarchy. (색상 외 값은 변경하지 않았습니다.)

| Evidence class | Toss status |
|---|---|
| **Official product-use** | Toss Product Sans was designed for financial symbols and mobile, desktop, and offline product contexts |
| **Live surface-use** | Toss Product Sans is loaded and visibly used throughout the inspected TDS documentation surfaces |
| **Official distributed asset** | No general redistribution right is asserted by the current official sources |
| **Declared-only** | Tossface is declared in captured FontFace resources but was not observed as the visible first family |
| Evidence boundary | Public redistribution/license terms and exact native-screen type metrics beyond documented TDS roles |

<!-- design-md:section components-states -->
## 4. Components & States

### Component Stylings

### TDS Mobile Button
- Background: `#FF6000` for the canonical primary reference
- Text: `#ffffff`
- Radius: 16px at xlarge
- Height: 56px at xlarge
- Padding: 0 20px
- Font: 17px / 600 / Toss Product Sans
- Size scale: small 32px / 8px radius; medium 38px / 10px; large 48px / 14px; xlarge 56px / 16px
- States: fill or weak; primary, danger, light, or dark; loading, disabled, pressed, and keyboard focus
- Use: primary and secondary mobile actions; preserve width while loading

### TDS Mobile Text Field
- Variants: box, line, big, hero
- States: focus, error, disabled, read-only
- Use: text entry with label, help text, and error text. Do not transfer undocumented page-chrome colors into the product field token.

### TDS Mobile Badge
- Variants: fill or weak; xsmall, small, medium, large; semantic colors
- States: semantic and size variants; badge is descriptive rather than interactive
- Use: compact status or category label

### TDS Mobile Agreement
- States: checked, unchecked, disabled, and nested agreement hierarchy
- Use: terms selection; v3 and v4 are retained as separate official surfaces because both are publicly documented

### toss.im Marketing Primary
- Background: `#F2EDE6`
- Text: `#1C1C1C`
- Radius: 7px
- Height: 40px
- Padding: 11px 16px
- Font: 15px / 600 / Toss Product Sans
- States: default observed; hover not captured in the retained evidence bundle
- Use: light-warm marketing CTA

### toss.im Marketing Dark
- Background: `rgba(28, 28, 28, 0.8)`
- Text: `#ffffff`
- Radius: 7px
- Height: 46px
- Padding: 11px 16px
- Font: 17px / 600 / Toss Product Sans
- States: default observed; hover not captured in the retained evidence bundle
- Use: app-store style marketing CTA

### States

| Component | Verified state contract |
|---|---|
| TDS Button | fill/weak, semantic color, loading, disabled, pressed, keyboard focus |
| TDS Text Field | box/line/big/hero, focus, error, disabled, read-only |
| TDS Agreement | checked, unchecked, disabled, nested hierarchy |
| Marketing CTAs | default geometry captured; hover remains unclaimed |

<!-- design-md:section layout-platforms -->
## 5. Layout & Platforms

### Layout Principles

### Spacing System
- Captured TDS documentation clusters: 4px, 6px, 8px, 16px, 24px, and 32px.
- Treat those values as a compact working scale, not proof of every native product layout token.
- (색상 외 값이므로 변경하지 않았습니다.)

### Grid & Container
- TDS component documentation is mobile-oriented; its xlarge button is designed as a strong touch action.
- The public marketing site uses a distinct responsive web composition and should not inherit mobile component geometry wholesale.

### Border Radius Scale
- Documentation chrome and components cluster around 4px and 6px for small surfaces.
- Button sizes use 8px, 10px, 14px, and 16px radii from small through xlarge.

### Responsive Behavior

- TDS Mobile component sizes should remain touch-oriented; xlarge is the documented default button size.
- On web, preserve the observed 40px or 46px marketing button height rather than substituting the 56px mobile control.
- The public sources in this verification do not establish universal breakpoints, desktop maximum widths, or native safe-area values.

<!-- design-md:section content-locales -->
## 6. Content & Locales

### Voice & Tone

Toss speaks as a capable guide that removes work rather than displaying financial expertise. Copy is short and direct, but the governing idea is not minimal word count by itself: a person should understand the value, answer the question, and recover from uncertainty without decoding industry language. Official product-design writing describes principles such as **Easy to answer** and **Value first, cost later**—make choices concrete, and show why an action is worthwhile before asking for effort, data, or commitment.

In product flows, name the outcome and next action precisely. In education or product-branding surfaces, explain one unfamiliar idea in everyday language and let the interface carry the rest. Avoid vague reassurance, unexplained abbreviations, institutional phrasing, or playful copy that makes a financial consequence ambiguous.

<!-- design-md:section governance -->
## 7. Governance

### Agent Prompt Guide

- "Create a TDS Mobile xlarge primary button using `#FF6000`, white text, 56px height, 16px radius, 17px/600 Toss Product Sans, and explicit loading/disabled/focus behavior."
- "Create a `toss.im` weak marketing CTA using `#F2EDE6` background, `#1C1C1C` text, 40px height, and 7px radius."
- "Use Toss Product Sans for the verified UI family; do not promote Tossface without visible usage evidence."
- "If building a component not listed here, mark it as an extension rather than presenting it as verified TDS."

<!-- design-md:claim authority kind=evidence-backed-reconstruction lang=en -->
### Authority

This document is an evidence-backed reconstruction with a custom color remap, not authority for an unrelated target project.
<!-- design-md:claim-end -->

<!-- design-md:claim application-priority order=prompt-fact,repository-fact,system-contract,reference-inspiration lang=en -->
### Application priority

1. Direct user instructions for the requested scope.
2. Repository facts.
3. This system contract.
4. Reference inspiration.
<!-- design-md:claim-end -->

<!-- design-md:claim unknowns policy=absent-at-smallest-unresolved-boundary lang=en -->
### Unknowns

Omit only the smallest unresolved value or group. Do not replace it with a plausible default.
<!-- design-md:claim-end -->

<!-- design-md:claim changes policy=review-record-validate-before-adoption lang=en -->
### Changes

Record, review, and validate changes before adoption.
<!-- design-md:claim-end -->
