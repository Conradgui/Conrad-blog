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
    id: "agent-fsm-control",
    slug: "agent-fsm-control",
    title: "如何约束 LLM 的输出？浅谈 Agent 架构中的控制流与状态机设计",
    summary: "详细解析了在 Zero-to-One Product Discovery 中引入 HITL 和 Stage Gate 对 AI 输出进行拦截和修正的实践总结。",
    type: "research",
    tags: ["Agent Control", "State Machine", "HITL"],
    createdAt: "2026-05-12",
    updatedAt: "2026-05-12",
    draft: false,
    relatedProjectIds: ["zero-to-one"],
    contentBody: `
### 引言：从 Prompt Engeneering 到控制流架构
早期的智能体研发高度依赖复杂的 Prompt。然而，大模型的随机性极其容易让长会话走向不可预测的黑洞。我们在实践中发现，要实现业务级的稳定产出，系统的核心控制权必须从 **Prompt 侧移交给确定性的代码控制流**。

其中，**有限状态机（Finite State Machine, FSM）** 是最佳的解题思路。

### 为什么选择有限状态机？
1. **状态明确**：将大模型交互划分为明确的业务状态（如：\`初始化想法\`、\`挑战追问\`、\`大纲生成\`、\`需求终稿\`），状态之间转换逻辑完全受控于代码。
2. **输入约束**：仅在对应状态下，大模型才被允许调用特定的工具（Tools），极大降低了大模型误调工具的概率。
3. **安全自愈**：当 Auditor 审查出生成内容格式损坏（如 JSON 截断）时，状态机能快速切入 \`自愈状态\`（Auto-Repair State），向模型追加修复上下文，完成低成本重试。

### 代码级实现策略
在 Node/TypeScript 体系中，我们可以设计一个轻量状态机类：

\`\`\`typescript
type State = 'idle' | 'collecting_gaps' | 'generating_outline' | 'finalizing';

interface StateTransition {
  on: string;
  target: State;
  action?: () => Promise<void>;
}
\`\`\`

结合大模型流式输出（Streaming），当检测到状态异常时，直接调用中断信号：
- 不论模型生成进行到哪一步，若触发阻尼关口（Stage Gate），抛出错误并捕获当前快照。
- 允许用户在中途插入修正参数（Human-In-The-Loop），再从保存的快照处断点续传。

这种控制模式大幅减轻了模型需要“时刻牢记全局逻辑”的认知负担，使其在单个步骤中发挥出最大生成效能。
`
  },
  {
    id: "rag-next-level",
    slug: "rag-next-level",
    title: "RAG 系统的下一个阶段：从单纯检索到主动知识推理系统",
    summary: "探讨如何通过多智能体协作、局部微调以及向量知识库的结构化更新，构建具备长期记忆和高可用推理能力的个人/企业知识系统。",
    type: "learning",
    tags: ["RAG", "Knowledge Base", "Vector DB"],
    createdAt: "2026-04-20",
    updatedAt: "2026-04-20",
    draft: false,
    relatedProjectIds: ["ai-trend-radar"],
    contentBody: `
### 传统 RAG 的局限性
经典的 Vector RAG（向量相似度检索）正面临严重的瓶颈：
- **语义割裂**：单纯切片（Chunking）后做相似度比对，容易丢失文档的长上下文逻辑与层次关联。
- **只懂搜索，不懂推理**：AI 只能把搜出来的碎片拼接并进行汇总，遇到“对比这两项技术的演进路线”等横向推理问题时，生成效果极差。

### 下一代 RAG 演进方向：主动推理
要构建具备“系统性思维”的知识系统，我们正在尝试以下方案：

#### 1. Graph RAG (图谱检索)
- 利用大模型在离线状态下将原始文档转化为**实体-关系网络（Knowledge Graph）**。
- 在用户查询时，检索算法不再是单纯比对向量距离，而是顺着关系链进行子图提取，极大还原了长文档内部的信息拓扑结构。

#### 2. 自愈式知识写入 (Self-Updating Memory)
- 当系统在运行自动化情报雷达（如 AI Trend Radar）并写入新数据时，引入 Auditor 执行相似度合并与语义消歧，防止向量空间被雷同的多源新闻污染。
- 采用 **Memory Controller**，每当有新热点写入，自动在关联的“方法论（Thinking）”卡片中建立关系链，使整个个人知识网实现长期演进与自愈。
`
  }
];
