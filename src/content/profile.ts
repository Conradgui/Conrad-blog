export interface ProfileData {
  resumeSummary: string;
  education: {
    school: string;
    degree: string;
    period: string;
    description: string;
  };
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

export const profileDataAI: ProfileData = {
  resumeSummary:
    "具备战略咨询、产品商业化、AI 产品调研与 AI Workflow / Agent System 设计的复合背景。在百度智能云、艾瑞咨询、德勤管理咨询和 36氪的实践中，积累了深厚的用户洞察、PMF 验证、数据归因与转化漏斗优化经验；同时独立构建 RepoHarness、Zero-to-One Product Discovery、AI Trend Radar 等 AI 产品项目，围绕 Agent Runtime、分层上下文管理、记忆治理、Stage Gate 与 AI 评测体系设计，探索人机协同工作流（HITL）的高效可控落地。",
  education: {
    school: "中央民族大学",
    degree: "工商管理学｜本科在读",
    period: "2023.09 - 今",
    description: "主修管理统计学、运营管理学、消费者行为学、市场营销学、战略管理等课程；当前求职方向为 AI 产品经理。"
  },
  whoIAm:
    "我是 Conrad，一名 AI 产品经理与系统设计者。我专注于将模糊的想法和先进的 AI 能力，转化为结构化、可测试、可复盘的工业级系统工作流。我希望用这个数字空间，将我的 AI 独立项目与数智化商业实践融为一体。",
  whatICareAbout:
    "我关注如何构建安全可靠的 Agent 架构，以及如何通过 Stage Gate 和评测机制来约束并指导 AI 的输出。我选择战略与管理咨询作为起点，是为了训练极致的结构化思维与业务拆解能力，进而能够深度理解 AI 应用的商业闭环与业务重组价值。",
  howIWork:
    "我倾向于从系统工程的视角看产品。不管是设计多智能体协作流（Controller-Producer-Auditor），还是做商业化的转化漏斗分析，我都倾向于优先建立清晰的状态机模型与数据反馈回路，确保在不确定性中构建出高可控性的业务结果。",
  careerDirection:
    "致力于 AI 自动化、系统化、流程化构建（AI Systemization），探索人机协同工作流（HITL）的高效设计模式，并持续关注 AI 产品在海外 C 端的商业化变现与高维数据治理。",
  selectedExperience: [
    {
      period: "2025.10 - 2026.02",
      role: "海外 C 端产品经理",
      company: "百度智能云 ARM 云",
      highlights: [
        "针对支付损耗率高达 17% 的问题进行全链路归因，主导重构海外收银台产品逻辑；设计并落地“库存 > 预售”动态调度机制，引入海外本地化支付及 Google Play 自动订阅产品方案，优化 TikTok 导流跳转，将漏斗综合支付损耗率降至 2.7%，整体支付费率成本从 16% 压降至 3%，驱动台湾地区日均支付人次增长 225%。",
        "主导高性能云手机“高性能场景”的新业务需求调研和项目孵化，统筹 300+ 深度用户问卷与访谈，运用 PSM 定价模型确立 9-12 USD / 月定价锚点；纠正内部低价策略误判，确立以“低延迟 / 稳挂机”为核心的产品价值主张，推动新版本立项。",
        "主导对高风险“脚本商店”项目的合规风控评估并出具报告否决，引导项目转向合规 “Tool Box” 并在多开工具切入，通过 Work Profile 隔离方案建立技术壁垒。",
        "针对用户核心需求推动专线优化项目，基于 Python 自建自动化数据清洗与分析管道，处理 2619 份 HK-SG 专线 A/B Test 数据并进行“端 / 网 / ISP”多维交叉归因定位，量化驱动多端网络架构升级，网络故障反馈率降低 74%。",
        "搭建 KOC 运营及用户访谈 SOP，设计 Discord Bot 自动化工作流，使社区问题响应时效提升 77.8%，社区满意度达 94.8%；引入“好评外流、差评内化”机制，拉动 Google Play 月度评分由 3.71 升至 4.63（五星率 89.5%）。"
      ]
    },
    {
      period: "2026.02 - 2026.05",
      role: "AI 社区内容运营 / AI 产品调研",
      company: "36氪项目实习",
      highlights: [
        "基于大语言模型与多源信息流设计并搭建了自动化 AI 热点监控工作流（AI Trend Radar），串联 Product Hunt、GitHub、Hacker News、arXiv 等 15+ 公开信源，实现非结构化信号自动抓取、去重与选题分发。",
        "负责前沿 AI 生产力工具（如 Codex、NotebookLM、即梦、稿定 AI、LibLib 等）的系统级拆解与边界评测，从模型拟合度、功能鲁棒性、多模态交互逻辑及商业变现路径提炼深度产品判断。",
        "设计并实施 AI 选题质量的主客观评估体系，将多源非结构化 AI 信号转换为可排序、可度量的特征集，通过自动化运营手段，构建从信息流到内容选题的闭环交付路径。"
      ]
    },
    {
      period: "2025.05 - 2025.11",
      role: "战略咨询 / 数智化转型咨询",
      company: "艾瑞咨询（艾瑞数智）",
      highlights: [
        "针对中国移动“守护宝”产品定位和发展路径模糊痛点，深入拆解企业微信、电信外勤助手等 40 余款竞品，将单一地理追踪工具重构为“安全风控（预警）+ 效能管理（考勤）”的复合价值体系，验证 B2B2C 进校与入企渠道差异化策略，推动向场景化智能服务转型。",
        "参与头部央企与通信运营商数智化转型战略咨询，主导中国旅游集团数字化体系设计与云南移动多行业信息化咨询，负责 ToB SaaS 平台行业研究，解构运营商、云厂商及互联网平台的竞争壁垒，将客户战略方向转化为可执行的数字化 Roadmap。",
        "为咪咕视频等大型数娱平台搭建长期策略监测框架，系统性跟踪技术落地应用与竞品策略攻防节奏，提炼技术商业化的业务拐点，为长线策略和产品迭代提供决策支撑。"
      ]
    },
    {
      period: "2025.03 - 2025.06",
      role: "Private / CGO 项目行业研究",
      company: "德勤管理咨询",
      highlights: [
        "深度参与第七届中国卓越管理企业评选项目（覆盖飞书等 75 家标杆企业），制定 WBS 工作分解结构与执行甘特图，拉通 ITS、德勤书院等团队，管理四方核心诉求，保障出海、AI 和科创平行论坛的高质量交付。",
        "基于德勤全球“卓越管理标准”四大基石模型，调研飞书等企业并撰写企业案例，深度参与迭代《BMC 白皮书》；统筹输出德勤中国主席及合伙人的 20+ 篇 Keynote 演讲，将宏观行业洞察转化为高影响力品牌战略。",
        "负责对接王中林院士及比亚迪等十余位头部企业创始人/CEO 的专属议程与接待流程设计，保障高层对话环节的高质量交付与协同机制。"
      ]
    }
  ],
  coreCapabilities: [
    {
      name: "AI Workflow 产品化",
      description:
        "把开放式 AI 能力收敛为可控流程、状态、证据和交付物，关注模型输出前后的控制面。"
    },
    {
      name: "AI 评测与验证",
      description:
        "设计 unit tests、真实 API 可用性测试、baseline A/B、hard failure 和运行证据，判断 AI 产品是否可靠。"
    },
    {
      name: "工作流边界治理",
      description:
        "通过 stage gate、permission gate、review queue 和 dry-run handoff 控制幻觉、越权、工具副作用和过早产物化。"
    },
    {
      name: "AI 信息产品与调研",
      description:
        "将多源公开 AI 信号转成分类、评分、证据、推荐动作和自动分发链路，服务内容选题和产品调研。"
    },
    {
      name: "商业化与用户验证",
      description:
        "具备海外 C 端产品商业化、PSM 定价、A/B Test、漏斗归因、KOC 社群反馈和竞品拆解经验。"
    }
  ],
  toolsAndMethods: [
    {
      category: "AI 产品方法",
      items: ["Product Discovery", "Stage Gate", "Human-in-the-loop", "Benchmark", "Baseline A/B", "Bad Case 归因"]
    },
    {
      category: "Agent / RAG",
      items: ["Tool Calling", "Context Management", "Memory Governance", "Graph RAG", "Hybrid Search", "LangGraph"]
    },
    {
      category: "数据与调研",
      items: ["PSM 定价", "A/B Test", "漏斗分析", "竞品拆解", "用户访谈", "公开信源监控"]
    },
    {
      category: "工具与实现",
      items: ["Codex", "Claude Code", "Cursor", "Dify", "Coze", "GitHub Actions", "Python", "TypeScript", "SQL"]
    }
  ]
};

export const profileDataGeneral: ProfileData = {
  resumeSummary:
    "具备战略咨询、产品商业化与海外 C 端增长的复合背景。在百度智能云（海外）、艾瑞咨询、德勤管理咨询与 36氪的实践中，积累了深厚的用户调研、PSM 定价、本地化支付漏斗优化（支付损耗从 17% 降至 2.7%）与跨职能团队协作管理经验；同时具备扎实的工程落地能力，独立构建基于 AI 与受控工作流的代码审计、热点信号监控及原型开发工具，探索数智化工作流的高效设计与产品落地。",
  education: {
    school: "中央民族大学",
    degree: "工商管理学｜本科在读",
    period: "2023.09 - 今",
    description: "主修管理统计学、运营管理学、消费者行为学、市场营销学、战略管理等课程；当前求职方向为产品经理 / 商业化产品经理。"
  },
  whoIAm:
    "我是 Conrad，一名兼具商业洞察与工程落地能力的产品经理。我专注于以系统思维将用户痛点与业务逻辑转化为可度量、高可控的产品工作流，致力于通过数据驱动的增长手段及数智化工具提升业务效能。",
  whatICareAbout:
    "我关注如何通过合理的交互摩擦、沙箱机制和数据闭环来设计高安全、可审计的用户旅程。我选择德勤和艾瑞咨询作为起点，是为了训练严密的商业分析能力，帮助我在设计产品时能够站在商业模式和竞争壁垒的高度去理解用户价值。",
  howIWork:
    "我习惯以系统工程思维设计产品。无论是优化百度云收银台支付费率，还是拆解复杂的业务流程，我都会优先梳理状态机关系并搭建数据监控指标，通过精细化项目管理推进高质量交付。",
  careerDirection:
    "致力于商业化产品、增长产品及复杂业务工作流（SaaS / ToB）设计，擅长数据分析和工程级原型开发，探索人工智能与传统业务融合的数智化升级机会。",
  selectedExperience: profileDataAI.selectedExperience,
  coreCapabilities: [
    {
      name: "商业化与增长优化",
      description:
        "具备海外 C 端收银台重构、动态备用库存调度、支付漏斗全链路归因与 KOC 社群自动化运营经验。"
    },
    {
      name: "系统化工作流设计",
      description:
        "擅长将模糊复杂的业务流程建模为高可控、可审查、防越权的状态机与多节点交付流。"
    },
    {
      name: "数据分析与归因验证",
      description:
        "自建数据清洗分析管道，精通 A/B Test 多维交叉归因定位与基于单元测试的产品质量把关。"
    },
    {
      name: "商业分析与竞品研究",
      description:
        "深厚咨询背景，主导多项央企数智化转型竞品拆解、核心价值定位及 Roadmap 规划。"
    },
    {
      name: "项目管理与跨团队协作",
      description:
        "熟练运用 WBS 拆解甘特图进行平行项目管理、高风险合规评估，保障多职能团队协同交付。"
    }
  ],
  toolsAndMethods: [
    {
      category: "数据与商业",
      items: ["PSM 定价", "A/B Test", "漏斗归因", "WBS 甘特图", "合规评估", "竞品拆解", "用户访谈"]
    },
    {
      category: "系统与流程设计",
      items: ["Product Discovery", "Stage Gate", "Human-in-the-loop", "状态机设计", "API Mock 契约"]
    },
    {
      category: "AI 工作流与工具",
      items: ["Tool Calling", "Context Management", "Memory Governance", "Dify", "Codex", "LangGraph"]
    },
    {
      category: "工具与实现",
      items: ["GitHub Actions", "Python", "TypeScript", "SQL", "TailwindCSS", "Next.js"]
    }
  ]
};

export const profileDatas = {
  ai: profileDataAI,
  general: profileDataGeneral
};

export const profileData = profileDataAI;
