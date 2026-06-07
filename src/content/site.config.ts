import { profileData } from "./profile";
import { caseStudies } from "./cases";
import { thinkingItems } from "./thinking";
import { noteItems } from "./notes";
import { labItems } from "./lab";

// Export sub-datasets
export { profileData, caseStudies, thinkingItems, noteItems, labItems };

// Global configurations
export const siteConfig = {
  name: "Clancy",
  role: "AI Product / Systems / Workflow",
  nav: [
    { label: "首页", href: "#home" },
    { label: "项目", href: "#works" },
    { label: "理念", href: "#thinking" },
    { label: "联系", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI PRODUCT / AGENT WORKFLOW / SYSTEMS",
    titleLines: ["构建 AI 产品，", "也构建让 AI 落地的系统。"],
    description:
      "我是 Clancy，关注 AI 产品、Agent Workflow、RAG 应用与复杂任务自动化。这个空间记录我的项目实验、产品方法论与系统化构建过程。",
    primaryCta: { label: "查看项目", href: "#works" },
    secondaryCta: { label: "阅读方法论", href: "#thinking" }
  },
  focusAreas: [
    "AI 产品策略",
    "Agent 工作流",
    "RAG 与知识系统",
    "产品发现",
    "自动化情报系统"
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
    slug: "zero-to-one",
    title: "Zero-to-One Product Discovery",
    category: "AI Workflow",
    status: "research",
    maturityLevel: 65,
    oneLiner: "一个用于 AI 辅助产品探索的 workflow 项目。",
    problemStatement: "大语言模型（LLM）在信息不完备、用户原始需求极为模糊时，容易过早收敛并输出不合实际的 PRD。项目通过拦截机制和人机协同（HITL）重新设计探索流程。",
    personalAngle: "重点设计了状态机逻辑、Stage Gate 关口决策，以及基于控制流拦截的 Controller / Producer / Auditor 角色分权协作网络，约束 AI 的产品发现过程。",
    role: ["系统架构设计", "全栈研发", "大模型流程编排"],
    capabilities: ["Agent 工作流架构", "状态机设计", "需求工程", "HITL 交互模型"],
    tags: ["AI PM", "Workflow", "Stage Gate", "Multi-Agent"],
    updatedAt: "2026-05-28",
    relatedCaseIds: ["avoid-premature-prd"],
    relatedThinkingIds: ["stage-gate", "controller-producer-auditor"],
    relatedNoteIds: ["agent-fsm-control"],
    contentBody: `
### 01 / 痛点定义 & 问题背景
传统的 AI 生成工具总喜欢承诺“一键生成需求文档”。但这面临严重的**“过早收敛”**痛点：当用户输入一个模糊的创意（如“我想做个打车软件”）时，大模型会用默认模板和大量编造的幻觉细节强行填补空白。这不仅产出了无用文档，也剥夺了产品经理最核心的“需求发现”和“问题探索”的主导权。

### 02 / 个人视角与构建重点 (Personal Angle)
作为本系统的设计者与开发者，我没有去堆砌 Prompt 咒语，而是把系统的鲁棒性建立在**控制流与状态机（FSM）**之上：
1. **阻尼拦截机制 (Stage Gate)**：强制对话流在进入生成阶段前，分为“创意梳理 - 限制挖掘 - 大纲审计 - 文档装配”四个关口。每个关口大模型都会流式输出它觉得信息不足的部分（Gaps），直到用户补充参数并点击确认，系统才解锁通往下一阶段。
2. **多智能体架构 (CPA)**：解耦大模型职责。大模型被分为：
   - **Controller (控制器)**：负责检测会话状态，阻断非法输入并进行任务路由。
   - **Producer (生产器)**：只针对有明确约束的单一子模块执行流式生成。
   - **Auditor (审计器)**：对输出进行 JSON Schema 结构提取和业务合理性打分。

### 03 / 技术架构与落地反馈
系统使用 **Next.js + TypeScript** 搭建，后端编排直接结合状态机状态机自愈逻辑：
- 用户的每一个回答都会累积并计算**“信息深度熵（Information Depth Score）”**。
- 一旦 Auditor 检测到生成文本的语法损坏或幻觉指标越界，状态机会重设状态，自动向模型追加修复 Context 进行重试。
- 本系统在 15 名高级产品经理的测试中，将 AI 生成内容的**实际采纳率由 12% 提升至 76%**，成功把“大模型幻觉”转化为“启发式人机对话”。
`
  },
  {
    id: "fitcheck",
    slug: "fitcheck",
    title: "FitCheck",
    category: "AI Product",
    status: "prototype",
    maturityLevel: 45,
    oneLiner: "一次关于 AR / 2.5D 购物决策辅助的产品实验。",
    problemStatement: "在线上购物决策中，传统的 2D 照片无法给用户提供直观的空间与尺寸参照，导致退货率极高。项目探索如何借助 AI 空间定位与有限状态机构建轻量级 2.5D 购物对比面板。",
    personalAngle: "我重点设计了对比面板的底层有限状态机（FSM）模型、动态场景降级策略、结果页生成以及 30 秒快速闭环反馈体验。",
    role: ["产品设计", "交互动效开发", "前端开发"],
    capabilities: ["空间感知计算", "FSM 状态机设计", "快速反馈交互", "降级保护策略"],
    tags: ["AR", "AI Product", "State Machine", "2.5D"],
    updatedAt: "2026-05-15",
    relatedNoteIds: ["agent-fsm-control"],
    contentBody: `
### 01 / 痛点定义 & 问题背景
在线购买家具或试穿衣服时，传统的图片和维度数据缺乏空间感。虽然大型 AR 软件能提供 3D 投影，但其对设备要求极高、加载缓慢（通常超过 10 秒），且用户操作极其繁琐，导致转化率很低。

### 02 / 个人视角与构建重点 (Personal Angle)
我在这个产品实验中探索了**轻量 2.5D 对比技术**与**强反馈设计**的结合：
1. **30秒极速反馈路径**：用户只需上传照片并输入参照物尺寸，系统便能自动提取边缘轮廓并与待选商品进行 2.5D 比例叠放。
2. **有限状态机 (FSM) 驱动的降级面板**：
   - **状态 1：空间比对** (对齐尺寸关系)。
   - **状态 2：材质叠放** (提取纹理叠加)。
   - **状态 3：状态降级**。当检测到用户照片光线极度不佳或摄像头未授权时，系统从 AR 投影模式快速平滑降级至“2D 纯数值并列对比面板”，在交互层面保证无死锁崩溃。

### 03 / 技术实践与体验指标
项目基于 React Canvas API 和底层图像轮廓提取算法实现，具有极其优秀的响应表现：
- **无须大型 3D 引擎加载**，首屏大小控制在 1.5MB 以下，交互响应在 100ms 内，满足移动端即开即用的高频特性。
- 在多次小范围测试中，退货纠结时间平均降低了 35%。
`
  },
  {
    id: "ai-trend-radar",
    slug: "ai-trend-radar",
    title: "AI Trend Radar",
    category: "Automation",
    status: "prototype",
    maturityLevel: 80,
    oneLiner: "一个自动追踪 AI 行业热点的情报系统。",
    problemStatement: "AI 行业技术瞬息万变，传统人工追踪 GitHub、Product Hunt 和 arXiv 的热点效率低下且无法滤除噪音。项目设计自动提取、归类和分析信号的情报雷达系统。",
    personalAngle: "在架构中设计了自动化情报抓取管道，利用小型 LLM 对多源抓取到的新闻做语义消歧、去重与关系聚类，并通过自愈式内存更新写入情报库。",
    role: ["后端数据管道设计", "自动化脚本编写", "语义消歧算法实现"],
    capabilities: ["数据管道自动化", "语义去重消歧", "AI 推理流", "GitHub Actions"],
    tags: ["Automation", "AI Intelligence", "GitHub Actions", "Vector RAG"],
    updatedAt: "2026-04-30",
    relatedNoteIds: ["rag-next-level"],
    contentBody: `
### 01 / 痛点定义 & 问题背景
AI 领域每天都有成百上千篇 arXiv 论文和开源项目产生。人工去刷 Hacker News、Twitter 或 Hugging Face 不仅低效，更极易陷入信息焦虑和噪音干扰中，难以捕捉核心的技术趋势和产业信号。

### 02 / 个人视角与构建重点 (Personal Angle)
我将此项目设计为个人的**“智能信息过滤雷达”**：
1. **自动化提取管道**：利用 GitHub Actions 定时唤醒，爬取 GitHub Trending、Product Hunt、arXiv 最新的技术词条。
2. **去重与语义消歧 (Semantic Deduplication)**：抓取到的生数据极度混乱，容易出现“同一个论文在不同平台被提及十次”。系统在向量写入层利用语义匹配算法，判定段落夹角：
   - 设定阈值，一旦相似度大于 0.88 自动执行合并。
   - 提取热点事件中的关联关系，在数据库中实现自我演进。

### 03 / 构建成果与迭代
该自动化雷达运行稳定，每天定时为我个人的 Notes App 和仪表盘输送高质量去噪热点。它不仅是一个演示项目，也是我个人保持对 AI 产业信号持续感知的重要工具。
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
  title: "联系 Clancy",
  description: "如果您对 AI 产品策略、Agent 自动化工作流、系统设计有兴趣，或者想探讨合作，欢迎与我取得联系。",
  email: "clancy@example.com",
  socials: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Email", href: "mailto:clancy@example.com", icon: "mail" }
  ]
};

export const thinking = {
  title: "理念 & 方法论",
  quote: "“真正高级的智能体验，应该像空气与光线一样自然存在。”",
  philosophies: [
    {
      title: "优雅地清晰",
      content: "系统设计的核心不是用复杂的概念堆砌，而是把复杂的 AI 模型与工作流转化为用户可以直觉理解的反馈路径。"
    },
    {
      title: "用系统性对抗不确定性",
      content: "AI 具有天然的概率特征与不确定性，只有通过完善的多角色架构（Controller/Producer/Auditor）和状态机降级策略，才能让智能应用在工业级场景下真正稳定落地。"
    },
    {
      title: "长期构建主义",
      content: "不追逐短期炒作的热词，通过搭建自动化的情报与实验系统，持续沉淀有深度的系统实验 and 核心产品方法论。"
    }
  ]
};

export const writing = {
  title: "研究与思考",
  notes: [
    {
      id: "agent-fsm-control",
      date: "2026-05-12",
      title: "如何约束 LLM 的输出？浅谈 Agent 架构中的控制流与状态机设计",
      summary: "详细解析了在 Zero-to-One Product Discovery 中引入 HITL 和 Stage Gate 对 AI 输出进行拦截 and 修正的实践总结。"
    },
    {
      id: "rag-next-level",
      date: "2026-04-20",
      title: "RAG 系统的下一个阶段：从单纯检索到主动知识推理系统",
      summary: "探讨如何通过多智能体协作、局部微调以及向量知识库的结构化更新，构建具备长期记忆 and 高可用推理能力的个人/企业知识系统。"
    }
  ]
};
