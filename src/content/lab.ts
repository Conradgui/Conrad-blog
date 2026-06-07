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
}

export const labItems: LabItem[] = [
  {
    id: "vibe-coding-agent",
    slug: "vibe-coding-agent",
    title: "Vibe Coding 自动化脚手架",
    problem: "如何在仅提供产品框架提示词（Specification）下，依靠子 Agent 自动编写出 TypeScript 类型文件并跑通 Lint？",
    hypothesis: "在 Controller 引入多路分支，使用 Linter 的报错输出作为负反馈回路，可以让 Agent 实现 85% 以上的代码编译自我修正。",
    techUsed: ["Node.js", "TypeScript Compiler API", "ESLint", "Claude 3.5 Sonnet"],
    results: "经过 20 次循环测试，Agent 在第 3 轮迭代后成功修复了所有类型冲突与未定义导入错误，脚手架生成跑通率达到 90%。",
    status: "completed",
    conclusion: "类型校验和 linting 报错是大模型自动写代码最理想的外部监督信号，闭环的 Linter feedback 机制远远比写好 prompt 更有意义。",
    continueBuild: true,
    updatedAt: "2026-05-30"
  },
  {
    id: "prompt-robustness-check",
    slug: "prompt-robustness-check",
    title: "Prompt 对抗性注入测试",
    problem: "在 Agent 对话中，用户通过特定语句（如 'Ignore previous instructions'）强行越狱并泄露系统 Prompt，该如何设计轻量防御策略？",
    hypothesis: "在输入流上架设一个由轻量 Llama-3B 驱动的安全看门狗（Watchdog），审查语义向量偏角，相比在主提示词中堆砌安全警示防漏效果更好且成本极低。",
    techUsed: ["Ollama", "Llama 3 8B / 3B", "Cosine Similarity"],
    results: "看门狗对 100 余种越狱 Prompt 拦截率达到 98.4%，额外延迟低于 80ms，主大模型的 Prompt 复杂度得以精简 20%。",
    status: "completed",
    conclusion: "大模型安全防漏不应该写在业务 Prompt 中，应在输入管道层使用小模型进行语义相似度检测直接拦截。",
    continueBuild: false,
    updatedAt: "2026-04-15"
  }
];
