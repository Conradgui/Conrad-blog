export interface ProfileData {
  whoIAm: string;
  whatICareAbout: string;
  howIWork: string;
  careerDirection: string;
  selectedExperience: {
    period: string;
    role: string;
    company: string;
    highlights: string[];
  }[];
  coreCapabilities: {
    name: string;
    description: string;
  }[];
  toolsAndMethods: {
    category: string;
    items: string[];
  }[];
}

export const profileData: ProfileData = {
  whoIAm: "我是 Clancy，一名 AI 产品与智能系统设计者。我专注于将先进的语言模型（LLMs）和自动化 Agent 工作流转化为真正能够为业务落地并创造价值的工业级系统。",
  whatICareAbout: "我关注如何构建安全可靠的 Agent 架构，以及如何通过 Stage Gate 和评测机制来约束并指导 AI 的输出，解决大模型生成过程中的幻觉和过早收敛问题。",
  howIWork: "我习惯从系统工程的视角看产品。相比于堆砌功能，我更倾向于优先建立清晰的状态模型、降级安全带与控制器架构，以此保证在极端故障下系统的稳定性。",
  careerDirection: "致力于 AI 自动化、系统化、流程化构建（AI Systemization），探索人机协同工作流（HITL）的高效设计模式。",
  selectedExperience: [
    {
      period: "2024 - 至今",
      role: "AI 创意系统产品经理 / 独立开发者",
      company: "AI Product Lab",
      highlights: [
        "设计并搭建了 Zero-to-One 智能产品发现工作流，成功将产品前期探索周期缩短 40%。",
        "开发了 FitCheck 空间决策实验原型，设计了基于有限状态机（FSM）的动态场景切换与降级策略。"
      ]
    },
    {
      period: "2022 - 2024",
      role: "资深产品经理 (SaaS 与智能系统方向)",
      company: "Future Tech Studio",
      highlights: [
        "负责自动化情报收集系统（AI Trend Radar）的早期架构设计，利用大模型提取行业技术信号。",
        "主导多个基于 RAG 知识系统的落地交付，建立了一套结构化检索与长短上下文协同的优化方案。"
      ]
    }
  ],
  coreCapabilities: [
    { name: "Agent 工作流架构设计", description: "设计 Controller/Producer/Auditor 闭环多智能体架构，实现任务拆解与自动路由。" },
    { name: "产品探索与系统建模", description: "擅长 0 到 1 需求抽象、流程建模、有限状态机（FSM）设计与降级策略防范。" },
    { name: "评测与数据治理", description: "建立针对 LLM 生成质量的主客观评估体系（Evaluation Design）及动态知识注入约束。" }
  ],
  toolsAndMethods: [
    { category: "系统与架构", items: ["Zustand / Redux", "State Machines (XState / Custom)", "Controller-Producer-Auditor"] },
    { category: "AI & Data", items: ["LangChain", "Vector DB (Pinecone / Chroma)", "RAG Evaluation (Ragas)", "Prompt Engineering"] },
    { category: "工程与开发", items: ["Next.js / TypeScript", "Tailwind CSS", "Canvas API", "Git / GitHub Actions"] }
  ]
};
