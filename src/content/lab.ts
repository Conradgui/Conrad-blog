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
}

export const labItems: LabItem[] = [
  {
    id: "trend-radar-rag-lab",
    slug: "trend-radar-rag-lab",
    title: "AI Trend Radar RAG：趋势知识查询层",
    problem: "AI Trend Radar 能生成每日选题池，当历史报告变多后，用户还需要查询主题演进、来源覆盖和实体关系。",
    hypothesis: "如果把每日选题、来源、实体和报告沉淀为 Graph RAG + Agentic RAG 查询层，就能让信息产品从“看日报”延展到“查趋势”。",
    techUsed: ["Graph RAG", "Neo4j", "ChromaDB", "LangGraph", "ReAct Agent"],
    results: "当前正在推进基础知识图谱、向量检索和 6 个查询工具方向，适合作为 AI Trend Radar 的产品延展，而不是主作品集项目。",
    status: "building",
    conclusion: "它承接的是知识系统探索：把持续产生的信息变成可查询、可比较、可复用的知识制品。",
    continueBuild: true,
    updatedAt: "2026-06-08"
  },
  {
    id: "winblog-interface-lab",
    slug: "winblog-interface-lab",
    title: "winBlog：复古桌面式个人网页实验",
    problem: "个人网站不一定只能是线性简历页，也可以通过桌面隐喻、窗口层级和工作台入口组织项目、方法和个人表达。",
    hypothesis: "Windows 95 风格的桌面界面可以作为个人作品集的信息组织实验，让访问者以“打开应用”的方式探索简历、项目、思考和联系入口。",
    techUsed: ["Next.js", "React", "Retro UI", "Portfolio System"],
    results: "该方向基于现有项目和素材改造，不作为主项目证明；它更适合放在产品实验室，展示我对作品集表达、界面叙事和个人系统化呈现的探索。",
    status: "completed",
    conclusion: "winBlog：Windows 95 风格个人网页实验，用于探索作品集界面表达与复古交互风格。",
    continueBuild: false,
    updatedAt: "2026-06-08",
    repositoryUrl: "https://github.com/Conradgui/winBlog.git"
  }
];
