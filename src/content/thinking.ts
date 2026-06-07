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
  {
    id: "stage-gate",
    slug: "stage-gate",
    title: "Stage Gate 协作漏斗",
    type: "framework",
    problem: "如何在大模型任务生成中强制引入‘人机双向校验’，避免无反馈黑盒生成？",
    summary: "通过将 AI 生成流程划分为不同的‘阶段门控（Stage Gates）’，在每个关键节点截留状态并进行信息丰度审计，不合规时强力打回追问，合规后由人工授权放行。",
    steps: [
      "1. 提出构想 (Concept Input)",
      "2. 深度门槛评估 (Gate 1: Information Score Evaluation)",
      "3. 漏洞审计拦截 (Gate 2: Gap Detection & Prompting)",
      "4. 人工确认解锁 (Gate 3: HITL Confirmation)",
      "5. 最终结构化生成 (Final PRD Generation)"
    ],
    relatedProjectIds: ["zero-to-one"],
    updatedAt: "2026-05-24",
    contentBody: `
### 背景与痛点
绝大部分的智能生成应用（如 PRD 生成器、代码生成器）都在追求**“无痛一键生成”**。但这往往导致用户面临一个极大的“认知黑盒”：
1. 用户输入极少，AI 只能依赖随机幻觉进行细节填充。
2. 生成过程无法中断，用户眼睁睁看着 AI 生成一堆毫无实用价值的内容。
3. 缺少人机双向校验机制，导致系统输出的工业级可靠性极低。

### 解决方案：Stage Gate 协作漏斗
Stage Gate（阶段性关口）是从传统项目管理中演化出的一种精益产品流程。我们将其引入 AI Workflow：
1. **状态截留**：将复杂的生成工作流拆解为 3-5 个级联阶段，每个阶段结束时，工作流暂停，AI 不主动进入下一阶段。
2. **审计算法**：在每个关口（Gate），运行信息熵与特征提取校验，算出**“信息丰度得分（Depth Score）”**。
3. **安全拦截**：若得分低于阀值，直接触发“阻尼拦截（Gate Block）”，流式渲染出 AI 评估出的关键漏洞（Gaps），并请求用户补全。
4. **HITL 解锁**：用户在界面中勾选确认或输入解答，完成人机协同校验（Human-In-The-Loop）后解锁，才能流向下一个 Gate。

> 这种“优雅的阻尼感”能够将 AI 幻觉率降低 60% 以上，让复杂的系统构建在受控范围内运行。
`
  },
  {
    id: "controller-producer-auditor",
    slug: "controller-producer-auditor",
    title: "Controller / Producer / Auditor 架构模式",
    type: "framework",
    problem: "多 Agent 协作时，单一角色大模型如何避免既当裁判又当运动员的情况？",
    summary: "将 AI 系统的控制流（路由拦截）、生产流（文本生成）与审计流（格式/质量检查）完全分拆在不同的模型或 Prompt 实例中，构成三权分立的安全闭环。",
    steps: [
      "1. Controller 路由接收并建立状态",
      "2. Producer 执行具体的生成任务",
      "3. Auditor 独立审查输出，执行规则强匹配",
      "4. 产生分歧时 Controller 重新分配修正任务"
    ],
    relatedProjectIds: ["zero-to-one", "ai-trend-radar"],
    updatedAt: "2026-04-12",
    contentBody: `
### 三权分立设计
在复杂的任务执行（如自动编写周报、整理情报库、代码包自愈）中，若将**控制、执行、审核**交由同一个大模型实例在单次会话中完成，极易遭遇“自圆其说”的幻觉——AI 在出错后，往往倾向于编造理由掩盖错误。

为了解决此问题，我们设计了 **Controller-Producer-Auditor (CPA)** 分权协作系统架构：

#### 1. 控制器 (Controller)
- **职责**：不直接产生业务内容，只负责编排工作流。
- **作用**：解析用户的输入，调度状态转移，将任务打散并分发给 Producer。收到反馈后决定是流向下一步还是回滚重试。

#### 2. 执行器 (Producer)
- **职责**：单纯的内容生成者。
- **作用**：根据 Controller 分发到的子任务，专注生成（如编写一段 Python 函数、翻译某段文献）。它不考虑全局校验，只负责局部质量。

#### 3. 审计器 (Auditor)
- **职责**：严苛的规则审查官。
- **作用**：对 Producer 产生的输出进行格式、语法、合规度与安全等级检查。Auditor 可以是硬匹配规则（如 JSON Schema 校验器、AST 解析器），也可以是专门配置了防御性 Prompt 的微型大模型。

### 价值体现
通过这三个角色的协作与牵制，CPA 模式形成了一个安全自愈的负反馈闭环，极大地提高了智能体网络在遭遇大模型输出随机失效时的容错率。
`
  }
];
