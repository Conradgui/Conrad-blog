export type ThinkingType = "framework" | "principle" | "playbook" | "essay" | "methodology";

export interface ThinkingItem {
  id: string;
  slug: string;
  title: string;
  type: ThinkingType;
  problem: string;
  summary: string;
  steps?: string[];
  relatedProjectIds?: string[];
  updatedAt: string;
  contentBody: string;
}

export const thinkingItems: ThinkingItem[] = [
  // ==================== 1. Zero-to-One Product Discovery (3 items) ====================
  {
    id: "evidence-gated-ai",
    slug: "evidence-gated-ai",
    title: "证据门禁：AI 什么时候不该给最终答案",
    type: "principle",
    problem: "早期产品发现里，AI 很容易把假设写成事实，并用完整文档制造虚假的确定性。",
    summary: "把 AI 产物按证据成熟度推进：证据不足时只允许追问、列缺口或输出草稿轮廓，而不是直接生成 final。",
    steps: ["区分事实、假设、未知和风险", "按证据成熟度限制可输出内容", "在导出前设置人类确认和审计关口"],
    relatedProjectIds: ["zero-to-one"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：对抗大模型的“伪收敛”

在早期产品发现阶段，通用 AI 工具最危险的能力不是写得不够好，而是写得太像真的。用户只给出一句模糊想法，模型就能补出用户画像、需求清单、路线图和实施计划。这种“伪收敛”会把未经验证的假设包装成项目事实。

因此我把 Zero-to-One Product Discovery 的核心原则定为：AI 不应该在证据不足时给最终答案。它可以帮助用户继续澄清问题，但不能替用户跳过证据成熟的过程。

### 02 / 方法论构建：Evidence Maturity 作为产品控制面

证据门禁不是简单地让模型“谨慎一点”，而是把输出权限绑定到证据成熟度。系统需要识别当前材料里哪些是事实、哪些是假设、哪些仍然未知、哪些是风险。

当关键变量缺失时，AI 只能输出 evidence gap、blocking questions、decision surface 或 outline；当材料足够成熟时，才允许进入 PRD、Roadmap 或执行交接。

### 03 / 产品含义：阻力也可以是体验

在普通软件里，阻力常常意味着体验不好；但在 AI 协同产品里，合理阻力是信任的一部分。一个敢于告诉用户“这里证据不够”的系统，比一个永远迎合用户生成完整文档的系统更可靠。
`
  },
  {
    id: "controller-producer-auditor",
    slug: "controller-producer-auditor",
    title: "Controller / Producer / Auditor：把生成、控制和审计分开",
    type: "framework",
    problem: "如果同一个模型既负责生成内容，又负责判断自己是否可靠，就容易自圆其说。",
    summary: "把任务路由、内容生成和独立审查拆成不同角色，让 AI workflow 不依赖单次模型自觉。",
    steps: ["Controller 判断阶段和路由", "Producer 生成局部产物", "Auditor 独立检查格式、证据和边界", "失败时回滚或降级"],
    relatedProjectIds: ["zero-to-one", "repo-harness"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：不要让模型既当选手又当裁判

复杂 AI workflow 里，如果同一个模型同时负责生成、判断、修正和放行，就会产生一种隐蔽风险：它可能会用流畅的语言解释自己的错误，而不是发现错误。

所以我把 Controller / Producer / Auditor 作为一个基础分工模型。它不是为了堆 Agent 名称，而是为了把生成能力放进可观察、可回滚、可审计的流程里。

### 02 / 方法论构建：三类职责拆分

Controller 只负责判断阶段、路由任务和控制流程，不直接生产业务内容。Producer 只负责在明确约束下生成当前阶段允许的产物。Auditor 独立检查格式、证据、权限和边界，并决定是否回滚、降级或请求人工确认。

这个拆分让系统不再依赖模型“自己记得所有规则”，而是用结构保证模型在每一步只承担有限职责。

### 03 / 产品含义：可预测性重于功能堆叠

对严肃工作流来说，用户要的不是更多 Agent，而是更少黑箱。CPA 架构的价值在于让用户知道：谁在生成，谁在把关，失败后系统如何处理。
`
  },
  {
    id: "workflow-topology-over-prompt",
    slug: "workflow-topology-over-prompt",
    title: "Prompt 咒语的尽头：为什么需要工作流拓扑",
    type: "methodology",
    problem: "通过堆砌长 Prompt 期待大模型一步到位解决复杂任务，最终会导致指令退化与系统不可调优。",
    summary: "将长指令解耦为由状态机控制的工作流节点，把系统容错边界建立在流程结构上，而不是模型自觉上。",
    steps: ["把复杂任务拆成阶段节点", "为关键节点定义输入输出契约", "在节点之间保留检查、暂停和回滚空间"],
    relatedProjectIds: ["zero-to-one"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：长 Prompt 不是复杂系统的地基

很多 AI 产品在早期会把所有要求塞进一个长 Prompt：身份、格式、限制、示例、反例、语气、边界。短任务里这可能有效，但一旦进入多阶段任务，Prompt 会变得难调试、难复用、难定位问题。

当输出出错时，你很难判断是材料不足、阶段错位、格式失败，还是某条规则被模型忽略。Prompt 越长，系统越像一团不可调试的黑箱。

### 02 / 方法论构建：从提示词转向工作流拓扑

在 Zero-to-One Product Discovery 里，我更倾向于把复杂指令拆成工作流拓扑：每个阶段只做一个明确任务，每个节点都有输入、输出、检查条件和失败处理。

例如，问题澄清、材料吸收、风险排序、MVP 假设和执行交接不应该混在一次生成里。它们应该成为可以暂停、检查和回滚的流程节点。

### 03 / 产品含义：AI PM 要会设计流程，而不只是写提示词

Prompt 是入口，不是系统本身。AI 产品经理真正要设计的是能力如何流动、在哪些节点被检查、在什么时候交还给用户确认。
`
  },

  // ==================== 2. RepoHarness (3 items) ====================
  {
    id: "human-reviewed-memory",
    slug: "human-reviewed-memory",
    title: "长期记忆必须经过人类审查",
    type: "principle",
    problem: "Agent 的错误记忆一旦进入长期上下文，后续任务会持续受到污染。",
    summary: "让记忆先进入 Review Queue，经过 accept 或 edit 后再进入 durable memory，把效率收益和风险控制分开。",
    steps: ["先记录候选记忆", "解释召回原因", "由人审核后写入长期记忆", "保留修改和回滚空间"],
    relatedProjectIds: ["repo-harness"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：记忆不是越自动越好

Agent 的长期记忆看起来很诱人：它能减少重复解释、减少重复读文件，让长任务更连续。但如果错误判断被自动写入 durable memory，后续任务就会反复召回这段错误，形成持续偏航。

所以在 RepoHarness 里，我没有让 Agent 自动保存所有“经验”。长期记忆必须先进入 Review Queue，由人 accept、edit 或 reject 后再生效。

### 02 / 方法论构建：候选记忆、审核队列、长期资产

记忆系统需要分层。候选记忆只是 Agent 对当前任务的临时提炼；Review Queue 是人类确认的控制面；durable memory 才是后续任务可以召回的长期资产。

更重要的是，记忆召回要能解释来源。用户需要知道这段记忆为什么被选中、它来自哪次任务、可能影响什么推理。

### 03 / 产品含义：可控制的连续性

好的 Agent 记忆不是替用户记住一切，而是在用户可审查的范围内提供连续性。它降低重复沟通成本，但不绕过人的判断权。
`
  },
  {
    id: "ai-runtime-audit",
    slug: "ai-runtime-audit",
    title: "Agent 产品需要运行审计，而不只是任务完成",
    type: "framework",
    problem: "AI 完成任务后，如果用户看不到过程、权限和失败证据，就很难信任结果。",
    summary: "用 run trace、permission gate、checkpoint / resume 和 workspace drift 检测，把 Agent 行为变成可复盘的协作过程。",
    steps: ["记录读取、修改和工具调用", "高风险操作进入审批", "中断后恢复前检查 workspace drift", "保留失败和 partial trace"],
    relatedProjectIds: ["repo-harness"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：用户信任的不是“它做完了”

在 coding agent 场景里，最终结果并不足以建立信任。用户还需要知道 AI 读了哪些文件、调用了哪些工具、做了哪些修改、哪些操作被阻止、失败时留下了什么证据。

缺少运行审计的 Agent，很难进入真实工程协作。它可能很快，但用户无法复盘，也无法放心交接。

### 02 / 方法论构建：Run Trace 与 Permission Gate

RepoHarness 把运行审计放在产品核心：工具调用要记录，文件读写要记录，高风险操作要进入 permission gate，中断恢复要检查 workspace drift。

Checkpoint / resume 也不是简单恢复聊天记录，而是在恢复前先确认本地工作区是否已经变化，避免 Agent 误信旧状态继续执行。

### 03 / 产品含义：让自动化变得可复盘

运行审计看似是工程特性，但本质是产品信任机制。真正可用的 Agent 产品，不只要能完成任务，还要让用户看见任务如何被完成。
`
  },
  {
    id: "context-budgeting-governance",
    slug: "context-budgeting-governance",
    title: "长周期任务中的 Token / Context 治理",
    type: "methodology",
    problem: "Agent 在长链路任务中会不断累积会话上下文，导致成本上升、注意力稀释和重复工具调用。",
    summary: "用分层上下文预算、历史压缩和任务摘要，把长任务从“堆上下文”改成“管理上下文资产”。",
    steps: ["拆分当前请求、历史、记忆和工具输出", "按优先级裁剪与压缩", "用评测观察上下文治理收益"],
    relatedProjectIds: ["repo-harness"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：长上下文不是免费午餐

Agent 任务越长，上下文越容易变成杂物堆。历史对话、工具输出、报错日志、文件片段都被塞进 prompt，最后既增加成本，也稀释模型对当前任务的注意力。

所以 RepoHarness 里的 context governance 不是纯优化项，而是 Agent 产品能否长期运行的基础能力。

### 02 / 方法论构建：分层预算与可测收益

我把上下文拆成 prefix、memory、skills、relevant memory、history、current request 等区域，并按优先级处理。当前请求和关键约束保留，历史和工具输出需要摘要、裁剪或压缩。

这部分有明确项目证据：12 组长上下文配置中，平均 prompt 长度从 7082 压缩至 5664，平均压缩率 16.19%；记忆依赖任务的 follow-up 阶段重复读文件次数从 60 次降至 0 次。

### 03 / 产品含义：上下文治理也是成本治理

AI 产品经理不能只关心模型“能不能做”，也要关心它在多轮任务里是否稳定、可持续、可负担。Context budget 是体验问题，也是成本问题。
`
  },

  // ==================== 3. AI Trend Radar (3 items) ====================
  {
    id: "evidence-scored-intelligence",
    slug: "evidence-scored-intelligence",
    title: "AI 信息产品的价值是可解释判断",
    type: "methodology",
    problem: "AI 摘要很容易让信息变短，但不一定帮助用户判断哪些信号值得继续投入注意力。",
    summary: "把多源信息转成分类、评分、证据、行动建议和来源状态，让用户知道判断来自哪里。",
    steps: ["聚合多源信号", "去重和分类", "输出分数、理由和证据", "透明展示来源失败和降级状态"],
    relatedProjectIds: ["ai-trend-radar"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：摘要不是判断

AI 信息产品最容易掉进“摘要陷阱”：把长信息变短，却没有帮助用户决定下一步做什么。对 AI PM、内容运营和研究者来说，真正稀缺的是注意力分配，而不是更多简报。

AI Trend Radar 的定位因此不是新闻摘要器，而是选题判断工具。它要回答：哪些信号值得深挖，为什么值得，证据来自哪里。

### 02 / 方法论构建：分数、理由、证据和动作

每条候选不只保留标题和摘要，还要输出 action、reason、evidence、recommendedTopic 和 score。评分框架由商业影响、热度、新鲜度和可写性组成，服务“深挖、入池、观察、归档”等动作判断。

Benchmark 中工具平均 53.4 / 60，裸模型 21.9 / 60；这里的价值不在于宣称模型更聪明，而在于结构化证据、可复跑和业务格式更稳定。

### 03 / 产品含义：可解释性就是信任

如果系统只给一个分数，用户不会真正相信它。信息产品要让用户看见分数背后的信源、理由和证据，这样判断才有被采用的可能。
`
  },
  {
    id: "credible-degradation-signals",
    slug: "credible-degradation-signals",
    title: "可信降级：信息源失败时不伪装完整",
    type: "principle",
    problem: "多源信息产品天然会遇到 API 限流、缺 token、来源为空和抓取失败；如果系统不暴露这些状态，就会制造错误确定性。",
    summary: "把 ok、empty、skipped、error 作为产品状态展示出来，让用户知道报告哪里完整、哪里降级、哪里需要修复。",
    steps: ["定义来源状态", "在报告中暴露降级原因", "保留可用输出但不掩盖缺口", "把失败作为可复盘信号"],
    relatedProjectIds: ["ai-trend-radar"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：不完整不可怕，伪装完整才可怕

AI Trend Radar 依赖多个公开信源。现实里，GitHub 可能限流，Product Hunt 可能缺 token，某些中文站点可能临时失败。如果系统把这些失败藏起来，用户看到的就不是趋势，而是被包装过的缺口。

所以可信降级是信息产品的底线。系统可以继续交付，但必须告诉用户哪些来源正常、哪些为空、哪些跳过、哪些失败。

### 02 / 方法论构建：来源状态也是产品信息

我把来源状态分为 ok、empty、skipped、error，并在报告里保留修复提示和降级说明。这样即使部分来源失败，报告仍然可用，但不会制造“全量覆盖”的错觉。

对 AI 信息产品来说，失败不只是技术异常，也是用户判断的一部分。来源缺失会影响结论边界，必须被看见。

### 03 / 产品含义：诚实比顺滑更重要

很多 AI 产品害怕暴露失败，担心影响体验。但在研究和决策场景里，隐藏失败比失败本身更危险。可信系统应该敢于展示自己的不完整。
`
  },
  {
    id: "hybrid-routing-unit-economics",
    slug: "hybrid-routing-unit-economics",
    title: "混合路由：把 LLM 用在真正需要推理的地方",
    type: "methodology",
    problem: "全链路使用通用大模型处理清洗、去重、翻译和打分，会造成成本浪费，也会把简单任务复杂化。",
    summary: "按任务认知等级拆分数据管道：规则和缓存处理低认知任务，LLM 聚焦选题判断、理由生成和行动建议。",
    steps: ["识别低认知任务", "优先使用规则、缓存和本地词库", "把 LLM 留给高价值判断", "后续用成本与质量指标验证"],
    relatedProjectIds: ["ai-trend-radar"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：不是每一步都值得调用大模型

数据型 AI 产品很容易出现“大模型一把梭”：清洗 HTML、去重、术语翻译、分类、评分全部交给 LLM。这样做实现快，但成本不可控，也让系统变得难解释。

我更倾向于把 AI Trend Radar 的数据管道拆成不同认知等级。低认知任务交给规则、缓存、本地词库；高认知任务再交给模型。

### 02 / 方法论构建：Hybrid Routing

清洗、去噪、格式整理可以由确定性规则完成；常见术语可以优先命中本地 glossary；只有选题价值判断、行动建议和理由生成，才需要调用更强的模型能力。

这不是为了炫耀工程优化，而是为了让 LLM 的成本和能力对齐。昂贵模型应该用在真正需要推理的地方。

### 03 / 产品含义：成本敏感也是产品能力

这里不写未经验证的节省百分比。更稳的表达是：混合路由是一种成本敏感的产品判断，后续应通过单次报告成本、处理时延和输出质量共同验证。
`
  },

  // ==================== 4. AI Trend Radar RAG (1 item) ====================
  {
    id: "knowledge-artifact-layer",
    slug: "knowledge-artifact-layer",
    title: "从日报到知识制品：RAG 应该承接什么产品问题",
    type: "essay",
    problem: "日报会随着时间堆积，用户真正需要的是追踪历史趋势、比较来源和理解主题关系。",
    summary: "把持续产生的信息预编译为知识层，让历史选题可以被查询、比较和复用。",
    steps: ["保留结构化选题池", "抽取实体和来源关系", "建立知识图谱与向量检索", "用 Agent 工具回答趋势类问题"],
    relatedProjectIds: ["ai-trend-radar-rag"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：RAG 不只是给文档加问答

当 AI Trend Radar 的日报持续积累后，用户的问题会发生变化：不只是“今天有什么”，而是“这个主题过去如何演进”“哪些来源反复提到它”“某个实体和哪些事件有关”。

这类问题不是普通摘要能解决的，它需要把历史信息沉淀成可查询的知识制品。

### 02 / 方法论构建：运行前知识整理

AI Trend Radar RAG 的方向是把每日选题、实体、来源和报告沉淀为图谱与向量索引。受 Nexus 一类知识引擎思路启发，它更强调在用户提问前先整理结构，而不是运行时临时把大量原文塞给模型。

当前它仍是产品实验室方向，所以不写成成熟知识引擎。更准确的表达是：它在探索信息管道如何升级为知识查询层。

### 03 / 产品含义：把信息变成可复用资产

RAG 的产品价值不是“能问”，而是让信息能够被追踪、比较、复用。它把一次性日报变成长期知识资产。
`
  },

  // ==================== 5. AIGC Tools & Product Design (2 items) ====================
  {
    id: "model-as-extractor-tool-as-compiler",
    slug: "model-as-extractor-tool-as-compiler",
    title: "模型负责提取，产品负责控制和编译",
    type: "framework",
    problem: "AIGC 工具如果只给一段 prompt，用户很难稳定控制某个局部维度。",
    summary: "把多模态模型当成特征提取器，把产品界面当成可编辑的格式编译器，保留创作者控制感。",
    steps: ["拆分视觉维度", "允许局部编辑和权重调整", "稳定未修改部分", "编译到目标平台格式"],
    relatedProjectIds: ["prompix"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：创作者需要控制面，而不只是生成结果

AIGC 创作工具如果只输出一整段 prompt，用户很难稳定控制局部效果。想改光照，主体可能变了；想改风格，构图可能被重写。模型的生成能力越强，用户越需要一个可控界面。

Prompix 的方法是把模型当特征提取器，把产品当控制和编译层。

### 02 / 方法论构建：维度卡片与 Prompt Compiler

系统把图片拆成主体、环境、构图、光照、情绪和风格等维度卡片。用户调整某一维时，其他卡片保持稳定，再由编译器生成适配 Midjourney 或 Stable Diffusion 的提示词。

本地 glossary 和历史资产管理不是附属功能，它们让视觉语言能够沉淀和复用。

### 03 / 产品含义：从接受输出到管理工作流

创作者工具的价值不只是“帮我生成”，而是“让我能控制”。AI 产品需要把概率输出转化为可编辑、可锁定、可复用的工作流。
`
  },
  {
    id: "record-first-plan-second",
    slug: "record-first-plan-second",
    title: "先记录现实，再规划明天",
    type: "principle",
    problem: "很多效率工具让用户先计划，但计划失败会放大焦虑和挫败感。",
    summary: "先记录真实专注，再用非批判性复盘帮助用户校准计划。",
    steps: ["低摩擦记录真实时间", "晚上做非批判性复盘", "用历史热力图校准次日计划"],
    relatedProjectIds: ["peel"],
    updatedAt: "2026-06-09",
    contentBody: `
### 01 / 核心判断：不是所有问题都需要 AI

Peel 解决的是计划失败感。很多效率工具要求用户先制定计划，再用完成率评价自己。问题是，人经常高估一天能做多少事，于是工具反而放大焦虑。

我没有给 Peel 加 AI 日程规划，因为这可能把用户推向另一个被评价、被催促的黑箱。

### 02 / 方法论构建：Reality-First

Peel 的流程是先记录真实发生，再校准计划。Now 负责低摩擦计时，Today 负责非批判性复盘，Reflection 用过去 7 天的真实专注记录帮助用户安排明天。

这里的重点不是智能推荐，而是让用户看见自己的真实时间模式。

### 03 / 产品含义：克制也是 AI PM 能力

AI PM 的能力不只体现在会把 AI 加进去，也体现在知道什么时候不该加。选择朴素的产品形态，有时比追热点更成熟。
`
  }
];
