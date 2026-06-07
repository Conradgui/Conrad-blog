export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  projectId: string; // Links to the related project
  tags: string[];
  updatedAt: string;
  
  context: string;
  problem: string;
  constraints: string;
  decision: string;
  alternativesConsidered: string;
  solution: string;
  implementation: string;
  validation: string;
  outcome: string;
  reflection: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "avoid-premature-prd",
    slug: "avoid-premature-prd",
    title: "如何避免 AI 过早输出 PRD",
    category: "Workflow Design",
    projectId: "zero-to-one",
    tags: ["HITL", "Stage Gate", "Workflow Control"],
    updatedAt: "2026-05-18",
    context: "在设计 Zero-to-One 智能产品发现工具时，大语言模型（LLM）在信息极度不充分、用户只给出一句模糊想法时，常容易过早套用模板强行生成一份细节完备的 PRD（产品需求文档）。",
    problem: "这种过早收敛（Premature Convergence）不仅导致 PRD 充满了大模型的幻觉和胡编乱造，更剥夺了用户探讨问题本质和开展产品探索的主动权。",
    constraints: "1. 必须依赖大模型作为生成核心。2. 不得增加繁重的用户表单填写，需保持会话式探索体验。",
    decision: "决定引入「Stage Gate（阶段性关口）」和「HITL（人机协同拦截）」设计，强制在大模型流式输出前，拦截并收集必要的背景参数。",
    alternativesConsidered: "1. 通过 Prompt 强调‘不要直接生成 PRD’。验证后发现大模型常忽视负向 Prompt，该方案无效。\n2. 使用分步式表单强引导。用户体验过于割裂，违背了自由探索的本意。",
    solution: "构建由 Controller 拦截的动态对话状态机。当用户给出构想时，系统先流式生成‘挑战与追问（Gaps）’，只有当用户做出回应并越过特定指标门槛后，才会解锁 PRD 生成权限。",
    implementation: "采用 TypeScript 实现的轻量状态管理器，结合大模型 Function Calling 来评估当前信息深度分数（Information Depth Score）。",
    validation: "组织 15 位产品经理进行 Baseline 对照测试：在无拦截组，生成的 PRD 采纳率仅为 12%；而在 Stage Gate 拦截组，产品需求的质量打分提升了 180%，采纳率增至 76%。",
    outcome: "成功解决了 AI 在信息匮乏情况下的幻觉问题，让产品经理在与 AI 协作时重新找回了‘问题定义’阶段的主导权。",
    reflection: "AI 产品的交互设计不能一味追求‘一键生成’。在复杂系统设计中，‘优雅的阻尼感’（比如合理的拦截与追问）往往比顺滑的快捷路径更能保证内容质量。"
  }
];
