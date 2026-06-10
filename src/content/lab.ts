export interface LabItem {
  id: string;
  slug: string;
  title: string;
  problem: string;
  hypothesis: string;
  techUsed: string[];
  results: string;
  status: "building" | "completed" | "paused" | "failed";
  conclusion: string;
  continueBuild: boolean;
  updatedAt: string;
  repositoryUrl?: string;
  section: "ai-pm" | "codex-plugin";
}

export const labItems: LabItem[] = [
  {
    id: "trend-radar-rag-lab",
    slug: "trend-radar-rag-lab",
    title: "AI Trend Radar RAG：趋势知识查询层",
    problem: "AI Trend Radar 能生成每日选题池，当历史报告变多后，用户还需要查询主题演进、来源覆盖和实体关系。",
    hypothesis: "如果把每日选题、来源、实体和报告沉淀为 Graph RAG + Agentic RAG 查询层，就能让信息产品从“看日报”延展到“查趋势”。",
    techUsed: ["Graph RAG", "Neo4j", "ChromaDB", "LangGraph", "ReAct Agent"],
    results: "当前正在推进基础知识图谱、向量检索 and 6 个查询工具方向，适合作为 AI Trend Radar 的产品延展，而不是主作品集项目。",
    status: "building",
    conclusion: "它承接的是知识系统探索：把持续产生的信息变成可查询、可比较、可复用的知识制品。",
    continueBuild: true,
    updatedAt: "2026-06-10",
    repositoryUrl: "https://github.com/Conradgui/AI-TREND-RADAR-RAG",
    section: "ai-pm"
  },
  {
    id: "fitcheck-lab",
    slug: "fitcheck-lab",
    title: "FitCheck｜商品场景预览小程序实验",
    problem: "帮助用户判断一个商品放进真实场景或上传场景图里的效果，先用图片模式验证核心路径，再逐步升级到实时相机和完整 3D。",
    hypothesis: "第一版不追求“完整 AR / 3D”，而是先验证用户是否需要“把商品放进自己场景里看一眼”的低成本判断工具。技术上先稳定前端状态机、图片上传、mock AI workflow 契约和 CloudBase 边界，再接 Dify 真实 workflow。",
    techUsed: ["微信小程序", "CloudBase", "Mock AI Workflow", "Dify"],
    results: "已完成图片摆放预览 MVP 开发，稳定前端状态机与图片上传，预留 mock AI workflow 契约 and CloudBase 云函数边界。当前默认仍走 mock workflow，CloudBase 云函数和 Dify 接入是下一阶段验证点。",
    status: "building",
    conclusion: "当前默认仍走 mock workflow，下一阶段重点验证 CloudBase 云函数与 Dify 接入（不夸大为已完成 AR / 3D / 真实 AI workflow，也无真实用户规模）。",
    continueBuild: true,
    updatedAt: "2026-06-10",
    repositoryUrl: "https://github.com/Conradgui/fitcheck-privat",
    section: "ai-pm"
  },
  {
    id: "insightspec-lab",
    slug: "insightspec-lab",
    title: "InsightSpec｜AI PRD 工作台实验",
    problem: "从一个产品想法出发，快速生成结构化 PRD，并延展用户故事、路线图、开发任务和 PRD 评分。",
    hypothesis: "把“写 PRD”拆成需求采集、追问确认、结构化生成、评分和导出几个步骤，尝试让 AI 不只是生成一段文档，而是辅助 PM 完成更可控的需求表达流程。",
    techUsed: ["Next.js", "TailwindCSS", "OpenAI / Gemini / Claude / Minimax", "Vercel KV"],
    results: "已实现全流程与快速模式双轨原型，支持多Provider路由、KV额度计数、历史记录本地保存与导出。重点展示 AI PM 工作流拆解和产品化思路。",
    status: "completed",
    conclusion: "个人 MVP，不包装成真实团队大规模使用；展示重点是 AI PM 工作流拆解和产品化思路。",
    continueBuild: false,
    updatedAt: "2026-06-10",
    section: "ai-pm"
  },
  {
    id: "zero-to-one-product-discovery-plugin",
    slug: "zero-to-one-product-discovery-plugin",
    title: "Zero-to-One Product Discovery Plugin｜产品发现方法论的 Codex 封装",
    problem: "避免 AI 在证据不足时过早输出看似完整的 PRD。重点是用 stage gates、evidence maturity、risk map 和 readiness markers 控制边界。",
    hypothesis: "把 `zero-to-one-product-discovery` 从一个项目方法论，封装成可被 Codex 调用的工作流技能插件，通过声明式的 SKILL.md 定义边界。",
    techUsed: ["Codex Plugin", "Workflow Skill Packaging", "Stage Gate", "JSON Schema"],
    results: "已完成 Codex 规范的 Plugin 封装，定义了多角色 (CPA) 协议和 13 个子能力 (child-skills) 适配器。重点在于用自动化 schema 校验拦截不实方案生成。",
    status: "completed",
    conclusion: "成功把项目方法论转化为可安装的插件，验证了通过 Codex 约束 AI 输出边界和证据成熟度的可行性。",
    continueBuild: false,
    updatedAt: "2026-06-10",
    repositoryUrl: "https://github.com/Conradgui/zero-to-one-product-discovery",
    section: "codex-plugin"
  },
  {
    id: "auto-issue-fix-codex-plugin",
    slug: "auto-issue-fix-codex-plugin",
    title: "Auto Issue Fix Codex Plugin｜可治理的 GitHub issue 自动修复流程",
    problem: "GitHub issue 自动修复在真实工程维护中存在越权修改、工具副作用失控和难以安全回滚等风险。",
    hypothesis: "把 GitHub issue 修复从一次性 AI 改代码，封装成有 dry-run、review gate、测试证据和 draft PR 边界的 Codex Plugin，默认 dry-run first；live 模式需要显式确认维护权限。",
    techUsed: ["Codex Plugin", "Agent Workflow Governance", "Dry-run", "GitHub API"],
    results: "已完成流程的 Plugin 封装设计，限制 Agent 修改范围并运行验证，经过自动审查门才允许创建 draft PR。项目重点是把 issue 修复变成可审查、可回滚、可复盘的 agent workflow。",
    status: "completed",
    conclusion: "展示了如何把 issue 修复变成可审查、可复盘的治理流程，而非简单演示“全自动修 bug”。",
    continueBuild: false,
    updatedAt: "2026-06-10",
    section: "codex-plugin"
  }
];
