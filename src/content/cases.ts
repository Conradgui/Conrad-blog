export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  category: string;
  projectId: string;
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
    id: "z2o-evidence-gate",
    slug: "z2o-evidence-gate",
    title: "证据不足时，AI 为什么不能直接生成 PRD",
    category: "AI Product Discovery",
    projectId: "zero-to-one",
    tags: ["Product Discovery", "Stage Gate", "Evidence"],
    updatedAt: "2026-06-08",
    context: "Zero-to-One Product Discovery 面向早期产品想法：用户可能只有一句模糊需求、一份早期 PRD 草稿，或一些混乱材料。这个阶段最容易被 AI 的完整文档外观误导。",
    problem: "通用 AI 助手会在证据不足时过早生成完整 PRD、Roadmap 或实施计划，把假设包装成事实，让产品经理跳过澄清、验证和风险排序。",
    constraints: "它仍然要保持会话式体验，不能变成繁琐表单；同时也不能只靠 prompt 提醒模型“谨慎一点”，因为长任务中模型会遗忘边界。",
    decision: "我把核心决策从“生成更完整的 PRD”改成“按证据成熟度推进产品发现”。证据不足时，系统只能输出 gap、blocking question、decision surface 或 outline。",
    alternativesConsidered: "1. 只优化提示词：成本低，但难以稳定约束长流程。\n2. 做固定问卷：控制强，但会损失产品探索中的自由表达。\n3. 先生成再人工修改：看似高效，实际会把错误假设带进后续决策。",
    solution: "用 stage gate 和 evidence maturity 控制流程，把事实、假设、未知和风险分开表达；再用 Controller / Producer / Auditor 分工约束不同阶段能生成什么。",
    implementation: "Controller 负责路由和阶段判断，Producer 负责具体产物，Auditor 独立检查证据标签、格式和边界。导出 PRD / Roadmap / User Stories 前，必须满足对应的 evidence contract。",
    validation: "当前证据包括 71 个 unit tests、DeepSeek 真实 API 下 6 条 P0 路径行为层跑通，以及 Tool / Baseline Benchmark 对照。结果只说明在当前任务集下，workflow 更稳定地保留阶段门禁和证据标签。",
    outcome: "项目把“AI 直接给答案”的体验改造成“AI 帮助推进决策”的流程，适合展示我对 AI 产品发现、边界控制和评测证据的理解。",
    reflection: "这件事让我更明确：AI 产品经理不只是在设计输出结果，也是在设计 AI 什么时候不该输出。拒绝、追问和降级有时本身就是产品价值。"
  },
  {
    id: "repo-harness-memory-review",
    slug: "repo-harness-memory-review",
    title: "为什么 Coding Agent 的长期记忆需要人工审查",
    category: "Agent Governance",
    projectId: "repo-harness",
    tags: ["Memory Governance", "Review Queue", "Agent Runtime"],
    updatedAt: "2026-06-08",
    context: "RepoHarness 是运行在本地仓库里的 coding agent harness。它关注的不是让 AI 更快写代码，而是让用户知道 AI 读了什么、改了什么、为什么这样做。",
    problem: "长链路任务中，Agent 容易反复读取同一文件、遗忘前文、误信旧状态，甚至把错误经验沉淀为长期记忆，导致后续任务持续偏航。",
    constraints: "记忆必须能带来效率提升，但不能让错误自动进入 durable memory；同时本地仓库场景对隐私、权限和运行证据更敏感。",
    decision: "我决定让长期记忆必须先进入 Review Queue，由人 accept 或 edit 后再进入 durable memory。记忆不是越自动越好，可信的记忆需要审核边界。",
    alternativesConsidered: "1. 全自动写入长期记忆：体验顺滑，但错误污染风险高。\n2. 完全不做长期记忆：安全，但多轮任务效率低。\n3. 只保存聊天摘要：成本低，但难以解释为什么召回某段记忆。",
    solution: "将任务摘要、文件摘要、过程笔记和长期记忆分层管理，并为记忆召回提供 score breakdown 和 explanation，让用户可以看到记忆为什么被选中。",
    implementation: "项目设计了 Memory Pack、Review Queue、Explainable Retrieval、Fuzzy Lexical Retrieval，以及 checkpoint / resume 和 workspace drift 检测，避免 Agent 误信旧状态继续执行。",
    validation: "当前母版记录包括全量验证 240 passed；12 组长上下文配置平均 prompt 长度下降 16.19%；记忆依赖任务 follow-up 阶段重复读文件次数从 60 次降至 0 次。",
    outcome: "RepoHarness 证明了我对 Agent 产品的关注点：不是只看自动化程度，而是看控制权、审计证据、恢复路径和人机协作边界。",
    reflection: "Agent 产品越强，越需要设计“它如何被看见”。可解释的记忆、权限和运行痕迹，是工程协作型 AI 产品的重要信任基础。"
  },
  {
    id: "trend-radar-degradation",
    slug: "trend-radar-degradation",
    title: "AI 信息产品为什么要设计可信降级",
    category: "AI Information Product",
    projectId: "ai-trend-radar",
    tags: ["Information Product", "Scoring", "Degradation"],
    updatedAt: "2026-06-08",
    context: "AI Trend Radar 聚合 15+ 国内外公开 AI 信号，服务内容选题、AI 产品调研和趋势判断。它不是普通新闻摘要，而是一个可排序、可解释的中文选题池。",
    problem: "公开信源天然不稳定：GitHub 会限流，Product Hunt 需要 token，中文站点可能抓取失败。如果系统假装所有来源都成功，报告就会给用户一种错误确定性。",
    constraints: "系统每天要自动运行，不能因为部分来源失败就整体停止；但也不能把缺失数据包装成完整趋势判断。",
    decision: "我把来源状态显式标记为 ok、empty、skipped、error，并在报告中保留降级说明和修复提示。可信的信息产品要告诉用户自己不知道什么。",
    alternativesConsidered: "1. 失败即终止：可信，但影响可用性。\n2. 忽略失败来源：报告更干净，但误导用户。\n3. 用模型补齐缺失信息：看似完整，但会增加幻觉风险。",
    solution: "把采集、去重、分类、评分、证据、行动建议和分发拆成稳定管道。每条候选保留 action、reason、evidence、recommendedTopic 和 score。",
    implementation: "评分框架采用商业影响 40、热度 30、新鲜度 20、可写性 10，并串联 Markdown / HTML 报告、topic-pool.json、RSS、GitHub Pages、Telegram 和飞书通知。",
    validation: "项目通过 TypeScript typecheck、ESLint、Vitest 284 passed / 1 skipped。Benchmark 中工具平均 53.4 / 60，裸模型 21.9 / 60；优势集中在结构化证据、可追溯和产品化输出。",
    outcome: "项目连接了我的 36氪 AI 调研经历和个人开源项目：把分散 AI 信号转成可复用的选题判断，而不是只生成一段摘要。",
    reflection: "AI 信息产品的价值不在于“看起来知道很多”，而在于帮助用户判断什么值得继续投入注意力，并诚实暴露判断依据和缺口。"
  },
  {
    id: "trend-radar-rag-extension",
    slug: "trend-radar-rag-extension",
    title: "从每日选题报告，到可查询的知识层",
    category: "Product Lab",
    projectId: "ai-trend-radar-rag",
    tags: ["Graph RAG", "Knowledge Layer", "Agentic Search"],
    updatedAt: "2026-06-08",
    context: "AI Trend Radar RAG 是 AI Trend Radar 的延展探索，目标是让历史选题不只停留在日报里，而能被自然语言查询、比较和追踪。",
    problem: "当报告积累变多后，用户会从“今天发生了什么”转向“某个主题如何演进”“不同来源如何覆盖”“哪些实体之间有关联”。",
    constraints: "它仍处于开发中，不能包装成成熟知识引擎；同时要和主项目的数据管道保持边界，不让主仓库定位变混乱。",
    decision: "我把 RAG 能力拆成独立扩展仓库，把主项目保留为采集、评分、报告和分发管道，把 RAG 仓库作为知识查询层探索。",
    alternativesConsidered: "1. 直接把 RAG 混入主仓库：路径短，但产品边界变重。\n2. 只做向量搜索：实现简单，但难以表达实体、来源和主题关系。\n3. 先做独立扩展层：更利于探索，也更适合放入产品实验室。",
    solution: "用 Neo4j 表达 Topic / Entity / Source / Document / DailyDigest 关系，用 ChromaDB 支持语义检索，再通过 LangGraph ReAct Agent 编排查询工具。",
    implementation: "当前工具方向包括 search、topic_trend、entity_info、daily_overview、source_coverage、recommend，用自然语言完成趋势分析和选题推荐。",
    validation: "当前重点是验证信息管道到知识层的产品方向，尚未作为成熟主项目展示。对外表达应保持“正在推进中的产品实验”。",
    outcome: "它适合放在产品实验室，展示我对 AI 信息产品后续形态的思考：从日报、选题池，走向可查询的知识制品。",
    reflection: "RAG 的产品价值不只是“问文档”，而是把持续产生的信息沉淀成可以比较、追踪和复用的知识结构。"
  },
  {
    id: "prompix-non-destructive-editing",
    slug: "prompix-non-destructive-editing",
    title: "Prompt 工具为什么要保留创作者的局部控制感",
    category: "AIGC Workflow",
    projectId: "prompix",
    tags: ["AIGC", "Prompt Compiler", "Creator Control"],
    updatedAt: "2026-06-08",
    context: "Prompix 面向 AI 视觉创作者，把图片反推拆成主体、环境、构图、光照、情绪、风格等维度卡片，并编译成 Midjourney / Stable Diffusion 可用提示词。",
    problem: "很多提示词反推工具只给用户一整段 prompt。用户想微调光照或风格时，模型常常重写整段文本，导致原本想保留的主体、构图或氛围被破坏。",
    constraints: "产品既要利用多模态模型理解图片，又要降低重复调用成本；同时不能把创作者变成只能接受模型输出的人。",
    decision: "我把模型定位为特征提取器，把产品定位为格式编译器。用户编辑某一维度时，未涉及的卡片保持稳定，从而保留局部控制感。",
    alternativesConsidered: "1. 只输出完整 prompt：简单，但不可控。\n2. 做纯聊天式编辑：自由，但难以稳定复用。\n3. 做维度卡片和编译器：复杂一点，但更接近创作者工作流。",
    solution: "将视觉信息拆成维度卡片，支持权重微调、双语直出、本地词汇库、历史资产沉淀和不同生成平台的格式编译。",
    implementation: "项目用 IndexedDB / LocalStorage 分层保存图片和 metadata，配合 Canvas 缩略图管道、本地 glossary 和轻量模型旁路，减少等待和重复调用。",
    validation: "README 记录 76 个 Vitest 单元测试和 6 个 Playwright E2E 测试。它适合展示 AIGC 工作流和创作者控制感，但不能写成已有大规模设计师使用。",
    outcome: "Prompix 是补充项目，证明我对多模态创作工具、成本路由和提示词产品化有实践理解。",
    reflection: "AIGC 工具的核心不是帮用户生成一段更长的 prompt，而是让用户知道自己能控制什么，以及哪些控制可以稳定复用。"
  },
  {
    id: "peel-reality-first",
    slug: "peel-reality-first",
    title: "为什么 Peel 不强行 AI 化",
    category: "Product Design",
    projectId: "peel",
    tags: ["User Insight", "Reality-first", "Product Judgment"],
    updatedAt: "2026-06-08",
    context: "Peel 是一个 Reality-First 时间管理工具，面向效率焦虑型学生和职场新人。它不是 AI 项目，但适合展示传统 PM 基本功。",
    problem: "很多时间管理工具要求用户先计划再执行，但用户常常高估一天能做多少事，晚上面对计划落空会产生失败感和焦虑。",
    constraints: "这个问题不一定需要 AI。过度智能建议可能会增加用户压力，也可能把用户重新推回绩效化、被评价的体验。",
    decision: "我选择先记录真实专注，再帮助用户校准计划。产品不替用户规划人生，而是让用户看到自己的真实时间模式。",
    alternativesConsidered: "1. 加 AI 日程规划：更符合热点，但可能加重控制感。\n2. 做复杂任务管理：功能完整，但启动成本高。\n3. 做低摩擦记录与复盘：更朴素，但更贴近问题本质。",
    solution: "采用 Now / Today / Reflection 三页结构：白天低摩擦计时，晚上用时间拼图做非批判性复盘，次日用 7 天专注热力图辅助计划。",
    implementation: "采用 local-first 存储和无账号启动，降低注册门槛；通过导入导出、跨午夜归档和本地数据体积预估保障长期可用性。",
    validation: "当前价值在产品叙事、用户路径、流程测试矩阵和可用性验证，不应写成已经验证留存或真实用户规模。",
    outcome: "Peel 作为补充项目，证明我不是所有问题都强行 AI 化，也能从用户心理、交互减法和产品克制出发做判断。",
    reflection: "AI 产品经理也需要知道什么时候不该用 AI。产品判断不是追热点，而是选择最适合问题的形态。"
  }
];
