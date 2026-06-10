import { profileData } from "./profile";
import { caseStudies } from "./cases";
import { thinkingItems } from "./thinking";
import { noteItems } from "./notes";
import { labItems } from "./lab";

// Export sub-datasets
export { profileData, caseStudies, thinkingItems, noteItems, labItems };

// Global configurations
export const siteConfig = {
  name: "Conrad",
  role: "AI 产品与系统设计者",
  nav: [
    { label: "首页", href: "#home" },
    { label: "项目", href: "#works" },
    { label: "方法", href: "#thinking" },
    { label: "联系", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI PRODUCT MANAGER",
    titleLines: ["Designing AI Products", "for Real-World Impact"],
    description:
      "Exploring AI, agents, and workflows through product thinking, turning emerging technologies into meaningful value for users and businesses.",
    primaryCta: { label: "查看项目证据", href: "#works" },
    secondaryCta: { label: "阅读方法与思考", href: "#thinking" }
  },
  focusAreas: [
    "AI 产品发现",
    "AI 评测与验证",
    "Agent 工作流设计",
    "工作流边界治理",
    "AI 信息产品与研究",
    "商业化与用户洞察"
  ]
};

// Types & Schemas
export type ProjectStatus = "mature" | "shipped" | "building" | "prototype" | "research" | "archived";

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  status: ProjectStatus;
  maturityLevel: number;
  oneLiner: string;
  problemStatement: string;
  personalAngle: string;
  evidenceSummary?: string;
  role: string[];
  capabilities: string[];
  tags: string[];
  updatedAt: string;
  demoUrl?: string;
  repositoryUrl?: string;
  
  // Relations
  relatedCaseIds?: string[];
  relatedNoteIds?: string[];
  relatedThinkingIds?: string[];
  
  // Details Markdown
  contentBody: string;
}

// Projects database
export const projects: Project[] = [
  {
    id: "zero-to-one",
    slug: "zero-to-one-product-discovery",
    title: "Zero-to-One Product Discovery",
    subtitle: "AI 产品发现 workflow skill",
    category: "AI Workflow",
    status: "shipped",
    maturityLevel: 82,
    oneLiner: "把早期产品想法从“直接生成 PRD”重构为按证据成熟度推进的 AI 产品发现流程。",
    problemStatement:
      "通用 AI 助手在信息不足时太容易直接产出看似完整的 PRD、Roadmap 或实施计划，导致假设被包装成事实，早期产品决策失真。",
    personalAngle:
      "我把重点放在 stage gate、evidence maturity、Controller / Producer / Auditor 分工和导出 guard 上，让 AI 在证据不足时追问、降级或标注 NOT_READY，而不是伪装成 final。",
    evidenceSummary: "71 个单元测试、DeepSeek 真实 API 下 6 条 P0 路径跑通，并完成 Tool / Baseline Benchmark 对照。",
    role: ["独立项目负责人", "AI Workflow 设计", "评测与证据体系设计"],
    capabilities: ["Product Discovery", "Stage Gate", "Multi-Agent Governance", "Benchmark", "Human-in-the-loop"],
    tags: ["AI PM", "Workflow", "Evidence", "Evaluation"],
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/zero-to-one-product-discovery",
    relatedCaseIds: ["z2o-evidence-gate"],
    relatedThinkingIds: ["evidence-gated-ai", "controller-producer-auditor", "workflow-topology-over-prompt"],
    relatedNoteIds: ["ai-product-discovery-boundary", "positive-friction-in-ai-workflow"],
    contentBody: `
### 01 / 项目背景与痛点定义

在早期产品发现阶段，通用 AI 助手往往会在用户仅给出模糊的想法时，直接生成看似完整但未经严密论证的 PRD、Roadmap 或实施计划。这种“过早产出”会诱导 PM 跳过核心问题澄清、假设验证与风险评估，将未经验证的假设误包装为项目事实，导致后续研发资源的严重浪费。

### 02 / 核心产品决策与设计逻辑

Zero-to-One 重新定义了 AI 辅助的产品发现流程。产品设计不追求一键生成，而是将流程重构为“按证据成熟度（Evidence Maturity）推进决策”的受控工作流：
- **证据成熟度门禁 (Stage Gate)**：将发现流程解耦为问题澄清、材料解构、风险优先级、MVP 假设等递进阶段。当下层证据不足时，限制大模型仅能输出 blocking questions、evidence gaps 或结构提纲，强力拦截不实方案的生成；
- **多角色编排模型 (CPA)**：解耦为 Controller (路由判定与阶段校验)、Producer (单点内容流式产出) 与 Auditor (JSON 结构化分析与合规打分)，规避单一生成器自我审计的黑盒隐患。

### 03 / 解决方案与验证数据

系统通过 71 个单元测试和 6 条核心 P0 业务路径的完全跑通。通过构建定制评测 Benchmark 对比发现，在限制条件下该 workflow 方案的阶段边界控制行为评分达到 87.2（对比裸模型 Baseline 71.7），子 skill 激活评分达到 95.6（对比 Baseline 35.0），显著提升了 AI 辅助产品决策的稳定度与可审计性。
`
  },
  {
    id: "repo-harness",
    slug: "repo-harness",
    title: "RepoHarness",
    subtitle: "本地代码智能体 Harness",
    category: "Agent Runtime",
    status: "shipped",
    maturityLevel: 84,
    oneLiner: "一个运行在本地仓库里的受控 coding agent，让用户看得见 AI 读了什么、改了什么、为什么这么做。",
    problemStatement:
      "AI 能帮忙写代码，但长链路仓库任务中常见上下文膨胀、重复读文件、状态丢失、工具副作用不可控和结果难复盘。",
    personalAngle:
      "我把它作为工程协作型 AI 产品来设计：重点不是“自动写代码”，而是本地控制、权限边界、记忆审查、任务恢复和运行审计。",
    evidenceSummary: "全量验证 240 passed；长上下文配置平均 prompt 长度下降 16.19%，记忆依赖任务重复读文件次数从 60 次降至 0 次。",
    role: ["独立项目负责人", "Agent Runtime 设计", "运行治理与评测设计"],
    capabilities: ["Tool Calling", "Context Management", "Memory Governance", "Permission Gate", "Run Trace"],
    tags: ["Coding Agent", "Local-first", "Memory", "Audit"],
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/repo-harness",
    relatedCaseIds: ["repo-harness-memory-review"],
    relatedThinkingIds: [
      "controller-producer-auditor",
      "human-reviewed-memory",
      "ai-runtime-audit",
      "context-budgeting-governance"
    ],
    relatedNoteIds: ["coding-agent-boundary", "memory-review-queue-reflection"],
    contentBody: `
### 01 / 项目背景与痛点定义

在面向代码仓库的长链路开发任务中，AI Coding Agent 极易发生上下文膨胀、重复文件读取、状态丢失以及不受控的本地工具副作用。由于缺乏清晰的运行审计与人机协作接口，用户难以对 AI 的读写动作进行有效监督与错误复盘。

### 02 / 核心产品决策与设计逻辑

RepoHarness 被定义为工程协作型的 Agent 运行环境，核心解决“大模型自主行为的可审计性与受控安全问题”。产品引入了以下核心设计决策：
- **分层记忆治理 (Memory Governance)**：构建 Memory Pack 与 Review Queue。所有长期记忆生成后需进入人工审核队列，由用户确权后方可持久化写入 durable memory，防止错误假设污染后续上下文；
- **状态自愈与任务恢复 (Checkpoint / Resume)**：记录多轮迭代下的 workspace 状态。当遇到 Token 溢出或中断时支持精确恢复，自动判别代码工作区是否发生偏移，规避 Agent 误信脏数据执行错误指令。

### 03 / 解决方案与验证数据

系统设计了分层上下文裁剪预算，在 12 组长上下文评测中将平均 Prompt 长度压缩 16.19%；在记忆依赖场景下，Follow-up 阶段的重复读文件次数从 60 次降至 0 次。结合工作区隔离、工具白名单及高风险审批门禁，项目通过了包括上下文治理、恢复正确性在内的 240 个自动化回归测试案例，使本地开发任务更容易被观察、恢复和接管。
`
  },
  {
    id: "ai-trend-radar",
    slug: "ai-trend-radar",
    title: "AI Trend Radar",
    subtitle: "AI 热点选题雷达",
    category: "AI Intelligence",
    status: "shipped",
    maturityLevel: 86,
    oneLiner: "把 15+ 国内外公开 AI 信号转成可排序、可解释、可分发的中文选题池。",
    problemStatement:
      "AI 信息源太分散、太吵。内容研究者和 AI PM 真正需要的不是更多新闻摘要，而是判断哪些主题值得写、值得测、值得深挖。",
    personalAngle:
      "我把它设计成信息产品，而不是新闻摘要脚本：每条候选都有分类、分数、行动建议、理由和证据，来源失败也会透明标记并降级交付。",
    evidenceSummary: "Vitest 284 passed / 1 skipped；Benchmark 中工具平均 53.4 / 60，裸模型 21.9 / 60，优势集中在结构化证据和可复跑输出。",
    role: ["独立项目负责人", "AI 信息产品设计", "自动化调研工作流"],
    capabilities: ["Multi-source Signals", "Scoring Framework", "Credible Degradation", "GitHub Actions", "RSS / Telegram"],
    tags: ["AI Research", "Topic Radar", "Automation", "Evidence"],
    updatedAt: "2026-06-08",
    demoUrl: "https://conradgui.github.io/AI-TREND-RADAR",
    repositoryUrl: "https://github.com/Conradgui/AI-TREND-RADAR",
    relatedCaseIds: ["trend-radar-degradation"],
    relatedThinkingIds: ["evidence-scored-intelligence", "credible-degradation-signals", "hybrid-routing-unit-economics"],
    relatedNoteIds: ["topic-radar-not-summary", "credible-degradation-diary"],
    contentBody: `
### 01 / 项目背景与痛点定义

每天都有海量的 AI 新闻、开源项目、产品发布与社区讨论在各渠道爆发。对于内容研究者与产品团队而言，直接使用大模型做粗放摘要不仅无法滤除低价值噪音，更因缺乏统一的行业度量标准与可追溯的评估数据，难以直接支撑内容选题决策或深入的产品调研。

### 02 / 核心产品决策与设计逻辑

AI Trend Radar 彻底摒弃普通的新闻聚合与粗放摘要，转型为高置信的决策选题池：
- **量化评分模型**：设计“商业影响 + 热度 + 新新鲜度 + 可写性”的多维评分框架，针对每条热点输出 action、reason、score 维度卡片，直接提供深挖、入池、观察或归档的动作推荐；
- **可信度降级机制**：显式定义数据源状态（ok, empty, skipped, error）。在 API 限流或特定中文源调用失败时，系统进行透明降级并输出异常警示，避免把脏数据或残缺信息包装为行业趋势。

### 03 / 解决方案与验证数据

系统集成 GitHub Actions、RSS、Telegram、飞书，将生数据清洗、评分推理和多渠道分发实现一键式流式作业。项目在 TypeScript 类型校验与 Vitest 下跑通 284 组测试；Benchmark 测评中工具输出平均得分达到 53.4/60（裸模型 Baseline 为 21.9/60），优势集中于高可追溯选题证据与高可用业务格式输出。
`
  },
  {
    id: "ai-trend-radar-rag",
    slug: "ai-trend-radar-rag",
    title: "AI Trend Radar RAG",
    subtitle: "AI 趋势知识查询层",
    category: "RAG / Knowledge",
    status: "building",
    maturityLevel: 68,
    oneLiner: "受 Pinecone Nexus 启发设计的 AI 趋势知识引擎（Agentic RAG + 运行前预编译），目前正在持续迭代与完善中。",
    problemStatement:
      "当每日选题报告积累起来，用户不只想看当天报告，还会想追问历史趋势、来源差异、实体关系和某个主题的演进路径。",
    personalAngle:
      "我把它作为 AI Trend Radar 的延展，不抢主项目位置。它展示的是从信息管道到知识查询层的下一步探索。",
    role: ["独立项目负责人", "RAG 架构探索", "Agent 工具编排"],
    capabilities: ["Graph RAG", "Neo4j", "ChromaDB", "LangGraph ReAct Agent", "Hybrid Search"],
    tags: ["RAG", "Knowledge Graph", "Agentic Search"],
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/AI-TREND-RADAR-RAG",
    relatedCaseIds: ["trend-radar-rag-extension"],
    relatedThinkingIds: ["knowledge-artifact-layer"],
    relatedNoteIds: ["rag-from-digest-to-query"],
    contentBody: `
### 01 / 项目背景与痛点定义

随着 AI Trend Radar 自动化报告的持续累积，历史选题和行业信号呈指数级增长。传统的单向报告输出已无法满足用户对跨时空趋势对比、跨渠道信号聚合以及细分实体（模型/技术）演进脉络的深层追问需求。

### 02 / 核心产品决策与设计逻辑

作为 RAG 查询层的架构扩展，本项目独立探索了如何将流水线数据无缝演进为结构化知识资产。受 Pinecone Nexus 架构启发，产品引入了以下核心设计决策：
- **Nexus 启发式知识引擎**：基于 Agentic RAG 框架，构建包括 Pre-runtime Knowledge Compilation (运行前知识预编译)、Knowledge Artifact Layer (知识制品层)、Structured Knowledge Query (结构化知识查询)、Evidence & Governance Layer (证据与治理层) 以及 Evaluation Feedback Loop (评估反馈环) 的多层引擎，用于改善趋势问答的证据组织与可追溯性；
- **混合检索拓扑**：引入 Neo4j 知识图谱与 ChromaDB 向量库，将热点选题解构为“实体 - 事件 - 关系”图谱，支持精确图路径查询与混合语义搜索。

### 03 / 解决方案与验证数据

系统正在打通从选题数据流水线到图谱自动转录、预编译的闭环。用户可通过受控的 ReAct 决策链路进行复杂的趋势对比，减少直接检索长文时因证据缺失带来的误判风险，为信息产品走向深度知识引擎提供了可继续验证的方案方向。
`
  },
  {
    id: "prompix",
    slug: "prompix",
    title: "Prompix",
    subtitle: "视觉提示词智能工作台",
    category: "AIGC Tools",
    status: "shipped",
    maturityLevel: 72,
    oneLiner: "把图片反推拆成可控的视觉维度卡片，并编译成 Midjourney / Stable Diffusion 可用提示词。",
    problemStatement:
      "AI 视觉创作者不只是需要生成 prompt，还需要稳定控制主体、构图、光照、风格和权重，并把视觉语言沉淀为可复用资产。",
    personalAngle:
      "我把模型当特征提取器，把产品当格式编译器：重点是非破坏性维度锁定、双语直出、本地资产存储和低成本路由。",
    role: ["独立项目负责人", "AIGC 工作流设计", "多模态产品体验设计"],
    capabilities: ["Visual Prompt", "Prompt Compiler", "Model Routing", "IndexedDB", "Wordbank"],
    tags: ["AIGC", "Prompt", "Creator Tools"],
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/Prompix",
    relatedCaseIds: ["prompix-non-destructive-editing"],
    relatedThinkingIds: ["model-as-extractor-tool-as-compiler"],
    relatedNoteIds: ["prompt-compiler-not-chatbot"],
    contentBody: `
### 01 / 项目背景与痛点定义

在 AIGC 视觉创作中，传统的提示词反推工具仅提供整段文本的黑盒反推，创作者无法对特定的视觉要素（如构图、光照或艺术风格）进行精细化、局部性的微调。一旦修改部分词汇，大模型往往会重构整张图的生成意图，导致创作资产控制感缺失。

### 02 / 核心产品决策与设计逻辑

Prompix 确立了“非破坏性视觉解耦”的编译产品决策，重构了以维度卡片为核心的交互工作台：
- **视觉解耦模块**：将生成要素拆分为主体、环境、构图、光照、情绪、风格 6 大独立维度。修改特定维度时，其余维度卡片保持锁定，避免模型进行破坏性重写；
- **成本敏感体验设计**：多模态反推时同步输出中英文提示词，避免二次翻译请求；高频术语优先检索本地 Glossary，非结构化追问路由至低成本模型，把接口开销与响应延迟纳入后续持续验证的优化方向。

### 03 / 解决方案与验证数据

系统前端采用 IndexedDB 对大图与元数据进行分发与离线存储，配合 Canvas 缩略图缓存保障大批次视觉历史资产的流畅渲染。项目配备了 76 个 Vitest 单元测试 and 6 个 Playwright 自动化 E2E 链路测试，确保高负载交互状态下路由和状态机的鲁棒性。
`
  },
  {
    id: "peel",
    slug: "peel",
    title: "Peel",
    subtitle: "Reality-First 时间管理工具",
    category: "Product Design",
    status: "shipped",
    maturityLevel: 60,
    oneLiner: "一款先记录真实专注、再校准计划的时间管理工具，用来减少计划失败感。",
    problemStatement:
      "很多时间管理工具要求用户早晨先制定计划，但用户往往高估自己一天能完成的任务，晚上因为计划落空而焦虑。",
    personalAngle:
      "这个项目不强行 AI 化。它展示的是传统 PM 基本功：用户痛点、行为心理、交互减法、本地优先和克制取舍。",
    role: ["独立项目负责人", "产品叙事与交互设计", "本地优先体验设计"],
    capabilities: ["User Insight", "Behavior Design", "Local-first", "Reflection Loop", "Usability Matrix"],
    tags: ["Product Design", "Time Management", "Local-first"],
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/peel",
    relatedCaseIds: ["peel-reality-first"],
    relatedThinkingIds: ["record-first-plan-second"],
    relatedNoteIds: ["why-peel-not-ai"],
    contentBody: `
### 01 / 项目背景与痛点定义

许多时间管理工具强制要求用户在清晨预设精确的计划，然而日常的突发状况与效率波动极易导致计划落空，从而产生严重的挫败感。项目从用户行为心理出发，核心关注“如何通过交互与流程设计缓解时间管理带来的焦虑感”。

### 02 / 核心产品决策与设计逻辑

为打破“计划 -> 失败 -> 放弃”的恶性循环，Peel 确立了 “Reality-First” 的核心设计决策。产品重构为“Now / Today / Reflection”三阶段闭环：
- **Now (即时记录)**：首屏仅保留低摩擦的一键启动计时器，最小化记录成本；
- **Today (行为拼图)**：在晚间引导用户将今日专注时长拼成可视化热力图，促进非批判性复盘；
- **Reflection (校准计划)**：基于过去 7 天的真实专注数据辅助规划次日安排，实现从“盲目计划”向“数据校准”的转变。

### 03 / 解决方案与体验指标

项目采用 Local-first（本地优先）的轻量化存储策略，免除繁琐的账号注册与云端同步配置。支持多场景跨午夜归档及本地数据备份，首屏只保留核心记录动作，尽量降低用户即开即用的启动阻力。
`
  }
];

// Helper functions for content retrieval and dynamic routing relations
export const getContentRelations = (project: Project) => {
  return {
    cases: caseStudies.filter((c) => project.relatedCaseIds?.includes(c.id)),
    thinking: thinkingItems.filter((t) => project.relatedThinkingIds?.includes(t.id)),
    notes: noteItems.filter((n) => project.relatedNoteIds?.includes(n.id))
  };
};

export const contact = {
  title: "联系 Conrad",
  description: "如果你想聊 AI 产品经理求职、AI workflow、Agent 产品、AI 调研自动化或作品集项目欢迎联系我",
  email: "conradgui@163.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Conradgui", icon: "github" },
    { label: "Email", href: "mailto:conradgui@163.com", icon: "mail" }
  ]
};

export const thinking = {
  title: "一套正在形成的 AI 产品观",
  quote: "“AI 产品的核心，不是让模型更快给答案，而是设计一个系统，让不确定的模型能力在真实场景里被使用、约束、检查和复盘”",
  philosophies: [
    {
      title: "从生成结果，到推进决策",
      content: "AI 产品不能只追求一键生成，而要帮助用户在信息不足时继续澄清、判断和推进。对我来说，好的 AI 产品不是替用户跳过思考，而是让下一步决策更清楚。"
    },
    {
      title: "从模型能力，到工作流边界",
      content: "模型可以生成，但产品要决定什么时候生成、什么时候追问、什么时候拒绝、什么时候交给人确认。工作流边界不是束缚能力，而是让能力进入可控场景。"
    },
    {
      title: "从自动执行，到可审计协作",
      content: "Agent 不应该只是替人执行任务，还应该留下过程、证据、权限边界和恢复路径。用户信任的不是“它做完了”，而是“我知道它如何做完”。"
    },
    {
      title: "从信息摘要，到可解释判断",
      content: "AI 信息产品的价值不是把信息变短，而是帮用户判断哪些信号值得跟进，以及这个判断来自哪些证据、分数和来源状态。"
    },
    {
      title: "从 AI 化一切，到选择合适形态",
      content: "不是所有产品问题都需要强行加入 AI。好的产品判断也包括知道什么时候做减法，什么时候用更朴素的记录、反馈和交互解决问题。"
    },
    {
      title: "从全自动黑盒，到受控的沙箱与确权",
      content: "真正的智能体协同不是给 AI 无限的直接执行与提交权限，而是通过默认的 Dry-run 模拟、回归测试守门和人类显式确权，将 AI 行为约束在安全可控的沙箱审计边界内。"
    },
    {
      title: "从高认知高延迟，到轻量契约化验证",
      content: "在产品探索极早期，不要急于将复杂、高延迟的真实 AI 推理流强行耦合进交互，而是通过定义严格的数据契约和 Mock 推理层，以最小开销快速验证核心体验路径。"
    },
    {
      title: "从上下文无限堆叠，到分层记忆治理",
      content: "大模型在长周期任务中会因信息累积导致指令退化。通过设计“工作区短期缓存 - 候选记忆审核队列 - 人类确权写入”的分层记忆，将上下文无序膨胀转化为高置信的决策数据库。"
    },
    {
      title: "从感性主观评估，到量化单元评测",
      content: "评测 AI 产品绝不能只靠人工抽样看感觉，而要像工程软件一样编写自动运行的单元测试与定制 Benchmark。让模型每一次迭代的逻辑收敛与边界表现，都成为可度量、可回归的数字化证据。"
    }
  ]
};

export const writing = {
  title: "延伸思考",
  notes: [
    {
      id: "ai-product-discovery-boundary",
      date: "2026-06-09",
      title: "我为什么越来越警惕 AI 直接生成 PRD",
      summary: "从大模型的“讨好式生成”出发，反思为什么产品发现阶段需要证据门禁、追问和诚实的沉默。"
    },
    {
      id: "positive-friction-in-ai-workflow",
      date: "2026-06-09",
      title: "有些 AI 产品应该故意变慢一点",
      summary: "讨论产品发现工作流里的正向摩擦：好的 AI 不一定总是减少步骤，也可能是在关键节点阻止错误前进。"
    },
    {
      id: "coding-agent-boundary",
      date: "2026-06-09",
      title: "Coding Agent 的价值不只是帮我写代码",
      summary: "从 RepoHarness 出发，反思 Agent 产品真正难的不是生成代码，而是让过程可控、可恢复、可解释。"
    },
    {
      id: "topic-radar-not-summary",
      date: "2026-06-09",
      title: "AI 信息产品的价值不是摘要",
      summary: "从 AI Trend Radar 出发，反思信息产品真正要解决的是注意力分配，而不是把新闻压短。"
    }
  ]
};
