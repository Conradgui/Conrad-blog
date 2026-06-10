export type NoteType = "learning" | "project-log" | "research" | "observation" | "tool-review" | "reflection";

export interface NoteItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  type: NoteType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  draft: boolean;
  relatedProjectIds?: string[];
  contentBody: string;
}

export const noteItems: NoteItem[] = [
  {
    id: "ai-product-discovery-boundary",
    slug: "ai-product-discovery-boundary",
    title: "我为什么越来越警惕 AI 直接生成 PRD",
    summary: "从大模型的“讨好式生成”出发，反思为什么产品发现阶段需要证据门禁、追问和诚实的沉默。",
    type: "reflection",
    tags: ["Product Discovery", "Evidence", "AI PM"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["zero-to-one"],
    contentBody: `
最近在使用各种 AI 工具时，我越来越不喜欢一种体验：只要给它一个粗糙想法，它就能立刻吐出一份排版完整、语气笃定、看起来很像真的 PRD。表面上这很高效，实际上很危险。因为早期产品发现里最稀缺的不是文档，而是对问题、用户、场景和约束的诚实澄清。

这也是我做 *Zero-to-One Product Discovery* 时最在意的地方。我没有把它设计成“一键生成 PRD”的工具，而是把输出权限和证据成熟度绑定起来。证据不足时，系统应该暴露 gap，提出 blocking questions，甚至只给 outline，而不是把一堆未经验证的假设包装成 final。

我现在更愿意把这种设计称为“诚实的沉默”。一个 AI 产品的优势不只在于它能生成多少内容，也在于它知道什么时候不该替用户下结论。对 AI PM 来说，真正要设计的不是更顺滑的幻觉，而是让不确定性被看见、被追问、被复盘。
`
  },
  {
    id: "positive-friction-in-ai-workflow",
    slug: "positive-friction-in-ai-workflow",
    title: "有些 AI 产品应该故意变慢一点",
    summary: "讨论产品发现工作流里的正向摩擦：好的 AI 不一定总是减少步骤，也可能是在关键节点阻止错误前进。",
    type: "observation",
    tags: ["Workflow", "Friction", "Decision Quality"],
    createdAt: "2026-06-09",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["zero-to-one"],
    contentBody: `
我以前会下意识觉得，AI 产品当然应该更快、更短、更少点击。后来做产品发现类 workflow 时，我开始怀疑这个直觉。因为在一些高不确定任务里，速度不是第一指标，决策质量才是。太快的生成会把用户从“还没想清楚”直接推到“已经有方案了”，中间最关键的怀疑过程反而消失了。

所以我在 *Zero-to-One Product Discovery* 里接受了某种“正向摩擦”：阶段门禁、证据盲区、Auditor 校验、导出限制，这些设计都不是为了让用户爽快，而是为了让用户在关键节点停一下。停顿不是低效，它是在提醒 PM：现在还缺什么证据？这个假设能不能被反驳？下一步是不是应该先访谈，而不是先排期？

我觉得 AI PM 很容易被“减少操作成本”的叙事绑架。但真实产品里，有些摩擦是在保护用户。尤其当 AI 的表达能力强到足以伪装确定性时，产品更需要设计一种温和但坚定的刹车。
`
  },
  {
    id: "coding-agent-boundary",
    slug: "coding-agent-boundary",
    title: "Coding Agent 的价值不只是帮我写代码",
    summary: "从 RepoHarness 出发，反思 Agent 产品真正难的不是生成代码，而是让过程可控、可恢复、可解释。",
    type: "research",
    tags: ["Coding Agent", "Runtime", "Audit"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["repo-harness"],
    contentBody: `
作为一个没有传统代码背景的人，我对 Coding Agent 的期待其实很矛盾。一方面，我确实需要它降低工程进入门槛；另一方面，我又非常害怕自己被一堆“看起来能跑”的改动带着走，最后不知道它读了什么、改了什么、为什么这么改。

这也是 *RepoHarness* 对我最有意义的地方。它不是把 Agent 想象成一个无所不能的工程师，而是把它放进一个受控运行环境里：工具调用要留下 trace，权限动作要有边界，长任务要能 checkpoint / resume，记忆写入要经过 review。对我来说，这些不是工程装饰，而是非工程背景用户能否信任 AI 协作的前提。

我越来越觉得，Coding Agent 产品的竞争点不会只停留在“谁更会写代码”。真正重要的是：当任务变长、上下文变乱、工具开始产生副作用时，用户还能不能接管现场。AI 写代码只是起点，让人重新拿回控制权，才是产品价值。
`
  },
  {
    id: "memory-review-queue-reflection",
    slug: "memory-review-queue-reflection",
    title: "我不太相信自动长期记忆",
    summary: "从 RepoHarness 的 Memory Review Queue 出发，讨论为什么 Agent 记忆必须经过人类确权，而不是自动沉淀。",
    type: "reflection",
    tags: ["Memory", "Human Review", "Agent Governance"],
    createdAt: "2026-06-09",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["repo-harness"],
    contentBody: `
我对 Agent 长期记忆一直有一种本能的不信任。不是因为记忆没用，而是因为“自动记住”听起来太像一个产品陷阱：它可能记住了用户偏好，也可能记住了一次临时妥协、一次错误判断，甚至一次上下文里的误会。短期看它很聪明，长期看它可能把错误变成系统性偏见。

所以在 *RepoHarness* 里，我更愿意把长期记忆设计成 Review Queue，而不是自动写入。Agent 可以提炼候选记忆，但用户需要确认它是否值得持久化。这一步看起来慢，却是在保护未来的上下文质量。因为记忆一旦进入 durable layer，它就不再只是一次回答的材料，而会影响后续很多轮任务的判断。

这件事让我意识到：Agent 产品里的“智能”不能只理解为自动化程度。很多时候，真正成熟的智能是让系统知道哪些东西需要人来盖章。长期记忆不是越多越好，能被审查、能被删除、能被解释，才值得被信任。
`
  },
  {
    id: "topic-radar-not-summary",
    slug: "topic-radar-not-summary",
    title: "AI 信息产品的价值不是摘要",
    summary: "从 AI Trend Radar 出发，反思信息产品真正要解决的是注意力分配，而不是把新闻压短。",
    type: "observation",
    tags: ["AI Information", "Scoring", "Research"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["ai-trend-radar"],
    contentBody: `
我一开始做 *AI Trend Radar* 时，也很容易被“自动摘要”这个方向吸引。毕竟 AI 最擅长把长信息压短，看起来天然适合做资讯产品。但越做我越觉得，摘要只是最低层的能力。对于内容研究者、产品经理或者创作者来说，真正稀缺的不是“今天发生了什么”，而是“我应该把注意力放在哪里”。

所以我没有把它做成一个新闻压缩器，而是做成选题判断池。每条候选都要给出 action、reason、evidence、score 和 recommendedTopic。也就是说，系统不只是复述信号，而是要解释为什么这个信号值得写、值得测、值得继续观察，或者为什么它只是噪音。

这背后其实是我对 AI 信息产品的一个偏见：只会总结的信息产品很快会变成同质化内容机器；能帮助用户分配注意力的产品，才更接近决策工具。摘要解决阅读成本，判断解决机会成本，而后者才是我更想做的部分。
`
  },
  {
    id: "credible-degradation-diary",
    slug: "credible-degradation-diary",
    title: "不完整不可怕，伪装完整才可怕",
    summary: "从 AI Trend Radar 的来源状态设计出发，讨论为什么信息源失败时要透明降级，而不是用顺滑文案掩盖缺口。",
    type: "project-log",
    tags: ["Credible Degradation", "Evidence", "Information Product"],
    createdAt: "2026-06-09",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["ai-trend-radar"],
    contentBody: `
做信息产品时，我最担心的不是系统偶尔抓不到某个来源，而是它抓不到以后还装作一切正常。大模型很擅长补全叙事，尤其在资讯场景里，只要语气足够流畅，用户很难立刻意识到某些源缺席了、某些证据链断了。

所以 *AI Trend Radar* 里我保留了来源状态：ok、empty、skipped、error。它们看起来不像漂亮功能，却是我认为最重要的可信度接口。当 Telegram、RSS 或其他公开源失败时，系统应该告诉用户“这次判断基于哪些来源，哪些来源没有参与”，而不是继续生成一份完整得过分的趋势报告。

这让我对“可用性”有了更克制的理解。很多产品会把异常藏起来，因为怕打断体验；但在 AI 信息产品里，异常本身就是决策证据的一部分。不完整并不可怕，可怕的是产品把不完整包装成确定性，让用户在错误的安全感里继续行动。
`
  },
  {
    id: "rag-from-digest-to-query",
    slug: "rag-from-digest-to-query",
    title: "我为什么想把日报变成可查询的知识层",
    summary: "AI Trend Radar RAG 是正在推进的实验：它尝试把持续产生的选题报告沉淀为可追问、可比较、可复用的知识制品。",
    type: "project-log",
    tags: ["RAG", "Knowledge Graph", "Product Lab"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["ai-trend-radar-rag"],
    contentBody: `
当 *AI Trend Radar* 开始稳定产出日报后，我很快遇到一个新问题：日报本身是线性的，但用户的追问不是线性的。今天看完一条模型发布，明天可能会想知道它和过去哪几次技术路线变化有关；看到一个公司动作，也会想追问它是否连续出现、被哪些来源覆盖、和哪些实体产生了关系。

这就是我继续做 *AI Trend Radar RAG* 的原因。它不是为了给所有文档套一个问答壳，而是尝试把每天产生的选题沉淀成知识制品：实体、事件、来源、主题、证据之间要能被重新组织。Neo4j、ChromaDB、Agentic RAG 这些技术在这里服务的不是炫技，而是让信息从“当天可读”进入“长期可查”。

我现在仍然把它放在实验室，因为它还在验证阶段。但它承接了一个很重要的产品问题：当 AI 信息流持续生产内容时，产品有没有能力把内容变成资产，而不是让它们每天自然过期。
`
  },
  {
    id: "prompt-compiler-not-chatbot",
    slug: "prompt-compiler-not-chatbot",
    title: "Prompt 工具不一定要做成聊天机器人",
    summary: "从 Prompix 出发，反思为什么 AIGC 创作工具更需要维度控制、格式编译和资产沉淀，而不只是自由对话。",
    type: "reflection",
    tags: ["AIGC", "Prompt", "Creator Tools"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["prompix"],
    contentBody: `
我对很多 AIGC 工具有一个小小的不满：它们太爱把所有事情都塞进聊天框了。聊天当然灵活，但创作者真正需要的往往不是继续和模型寒暄，而是稳定控制主体、构图、光线、风格、权重，并且知道自己改动了哪一层。

所以 *Prompix* 里我把模型放在“提取器”的位置，而不是让它统治整个创作流程。图片反推后，结果会被拆成维度卡片；用户可以锁定某些卡片，只修改局部视觉要素，再把这些结构化信息编译成 Midjourney 或 Stable Diffusion 能用的 prompt。模型负责理解图片，产品负责控制、组织和输出格式。

这件事让我更相信：AI 产品形态不应该被聊天框绑架。尤其是创作工具，用户追求的不是一次性生成惊喜，而是可重复、可微调、可沉淀的控制感。好的 prompt 工具，与其像聊天机器人，不如像一个视觉语言编译器。
`
  },
  {
    id: "why-peel-not-ai",
    slug: "why-peel-not-ai",
    title: "为什么 Peel 不需要强行 AI 化",
    summary: "从 Peel 出发，讨论产品判断里的克制：有些用户问题先需要记录、反馈和复盘，而不是自动规划。",
    type: "reflection",
    tags: ["Product Judgment", "User Insight", "No AI"],
    createdAt: "2026-06-08",
    updatedAt: "2026-06-09",
    draft: false,
    relatedProjectIds: ["peel"],
    contentBody: `
在现在的作品集语境里，不把大模型写进一个项目里似乎需要一点勇气。但我依然愿意把 *Peel* 放在网站里，因为它提醒我：AI PM 不是把所有问题都 AI 化，而是判断什么时候不该使用 AI。

Peel 解决的是计划失败感。很多时间管理工具让用户早上先规划一天，晚上再面对计划落空后的挫败。如果我给它加一个“AI 智能日程规划”，听起来很酷，但本质上可能只是把用户推向另一个被评价、被催促的黑箱。我更想做的是白天低摩擦记录真实专注，晚上用非批判性的方式回看，第二天再根据过去一段时间的真实状态温和校准计划。

这不是反 AI，而是对用户问题的尊重。有些场景里，用户缺的不是更聪明的安排者，而是一个不评判他的镜子。知道什么时候不用 AI，有时也是更成熟的产品判断。
`
  },
  {
    id: "fitcheck-mock-degradation",
    slug: "fitcheck-mock-degradation",
    title: "FitCheck：商品预览场景下的 AI 降级设计与 Mock 边界",
    summary: "讨论为什么 FitCheck 小程序第一版不追求“实时 3D / 完整 AR”，而是先通过图片摆放和 Mock 契约验证用户“看一眼”的低成本痛点。",
    type: "reflection",
    tags: ["AI 降级", "Mock Workflow", "微信小程序"],
    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",
    draft: false,
    relatedProjectIds: ["fitcheck-lab"],
    contentBody: `
在规划 FitCheck 商品场景预览小程序时，技术层面的“诱惑”非常大。由于这是视觉摆放产品，很容易下意识地规划实时相机 AR 摆放、三维模型重建，甚至接入当时流行的 AI 图像融合算法（将商品图无缝融进背景图）。

但我的产品判断是：将首版 MVP 坚决地收窄为图片摆放模式，并进行可信降级（Mock AI workflow）。

### 为什么不做完整 3D 和 AR？

1. **认知成本与用户阻尼**：用户购买商品或摆放商品时，最首要的痛点是“把这件商品放到我的场景里看一眼颜色、比例和整体效果”。这并不需要毫秒级的实时 AR，普通 2.5D 图片摆放足以做低成本的辅助决策；
2. **AI 推理时延瓶颈**：实时调用大模型融合接口或 AR 渲染引擎会导致小程序的冷启动和响应时间极长（往往需要 5s 以上），这会摧毁微信小程序“即开即用”的低阻力心智。

### Mock 工作流在产品验证中的价值

在小程序中，我们通过预留 mock AI workflow 契约，由 CloudBase 云函数直接返回模拟的摆放坐标和合成资产。这样前端的交互体验（拖拽、旋转、放缩、保存）能够以 60 帧的高流畅度独立调优。

我们验证的是“用户是否愿意为了这一预览而上传图片”的行为数据，而不是模型的图像合成质量。在前期，将复杂的 AI 能力进行契约化的 Mock 隔离，能够极大保护前端的产品体验和验证效率。
`
  },
  {
    id: "insightspec-design-reflection",
    slug: "insightspec-design-reflection",
    title: "从一键生成 PRD，到受控的 PM 需求采集工作台",
    summary: "反思 InsightSpec 交互设计决策：为什么我们需要将大模型的 PRD 生成能力拆解为 Intake、Probe 与 Rating，以及双轨生成对 PM 体验的影响。",
    type: "observation",
    tags: ["AI PM", "Intake Workflow", "PRD Rating"],
    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",
    draft: false,
    relatedProjectIds: ["insightspec-lab"],
    contentBody: `
我在设计 InsightSpec 这款 AI PRD 工具时，遇到了一个经典的“体验冲突”：
- 如果追求“爽快感”，产品应该提供一个大对话框，用户写一句话，AI 直接“一键生成”一整份排版精致的 PRD；
- 如果追求“严谨性”，产品应该强迫用户回答大量关于用户场景、非目标、成功标准的问题，然后再开始写。

前者效率极高但容易产生“讨好式生成”（幻觉严重），后者高度可控但交互阻尼极大，容易消磨 PM 的灵感。

### 拆解需求采集：Intake 与 Probe

为了平衡这两者，我们在 InsightSpec 中将“生成 PRD”拆解为了有边界的工作流：
1. **Intake（需求采集）**：PM 只需要输入两三句模糊的原始想法，系统接收但不急于生成；
2. **Probe（追问确认）**：后台模型基于 Intake 提取出关键的假设与未知（Unknowns），在前台只对 PM 抛出一个“含金量最高”的问题。

这个“一问一答”的摩擦力极小，却能够引导 PM 补充最危险的假设证据。只有在这一步完成之后，才会调用生成接口。

### 快速模式与全流程模式的双轨设计

在实际 PM 办公场景中，有些 PM 确实已经有了成熟草稿，只想用 AI 来做格式优化和可控性评分。因此，我们提供了双轨模式（Dual-Track）：
- **全流程模式**：强制执行“澄清追问”，拦截编造的 PRD；
- **快速模式**：PM 一键粘贴草稿，系统直接跳过交互探索，进入结构化 draft 生成，但在段落中会显式打上证据标签（如 \`[Fact]\` / \`[Assumption]\`），并附带 Evidence Gap 评估。

这让我们在尊重用户紧急高产出需求的同时，依然守住了“诚实暴露数据缺口”的产品边界。
`
  },
  {
    id: "auto-issue-fix-dryrun",
    slug: "auto-issue-fix-dryrun",
    title: "Auto Issue Fix：为什么 Agent 自动修 Bug 必须具备 Dry-run 边界",
    summary: "讨论 Auto Issue Fix Codex Plugin 核心逻辑：为什么把 issue 自动修复做成 Agent 治理，远比单纯演示“全自动改 Bug”更有工程实用性。",
    type: "research",
    tags: ["Agent Governance", "Dry-run", "Codex Plugin"],
    createdAt: "2026-06-10",
    updatedAt: "2026-06-10",
    draft: false,
    relatedProjectIds: ["auto-issue-fix-codex-plugin"],
    contentBody: `
大语言模型在代码修复上的表现确实让人惊叹，但一旦把它放进真实、多文件关联的工程项目中，让 AI Coding Agent 拥有完全的“直接修改与提交”权限，就会带来极大的安全和治理风险。

在设计 Auto Issue Fix Codex 插件时，我将核心关注点从“模型能不能写对 bug”，转移到了“我们该如何建立可治理、可审查的安全边界”。

### 为什么默认 Dry-run First？

对真实仓库的修改是不容许发生破坏的。插件在设计上确立了默认的 Dry-run（模拟运行）机制：
1. **沙箱式读取与分析**：Agent 在读取和限定修改范围时，所做的一切分析和生成仅暂存在 Workbench 内存中，不直接触碰本地工作区文件；
2. **测试驱动的自动化审查**：即使在本地运行验证测试，系统也只在隔离分支上跑。只有在本地 100% 跑通 Regression Tests 且经过 Auditor 对代码修改范围、Token 预算的独立结构化打分通过后，系统才会生成 Draft Pull Request。

### live 模式的权限确权

真实修改代码的 live 模式被严格设为“手动授权门禁”。大模型在运行到修改前必须挂起执行，输出详细的改动意图和 dry-run 测试报告，向人类寻求确权盖章。

这虽然打断了“全自动”的科幻感，却给真实工程维护提供了防偏航、防越权、可复盘的制度保障。Agent 产品的重点不是用黑箱替人决定一切，而是把高风险的行为变成一种受控协作。
`
  }
];
