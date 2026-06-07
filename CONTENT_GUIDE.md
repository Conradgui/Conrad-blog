# Clancy Space 个人系统网站内容修改指南 (Content Modification Guide)

此指南旨在引导你逐步完成对网站个人简历、项目库、系统方法论、研究随笔及实验室原型的修改与内容完善。

---

## 1. 内容目录结构与映射规则

所有内容数据都以静态 TypeScript 数据库的形式存放在 `src/content/` 目录下。修改对应文件即可实时更新网站相应版块的内容：

| 文件路径 | 对应板块 / 展示内容 | 数据类型与结构 |
| :--- | :--- | :--- |
| [`src/content/site.config.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/site.config.ts) | 网页全局配置、导航栏、首屏（Hero）、精选项目（Builds Library） | `siteConfig`, `projects: Project[]` |
| [`src/content/profile.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/profile.ts) | 在线简历（Resume）中的核心摘要、关于我（About Me）、工作履历、核心能力、工具箱 | `profileData: ProfileData` |
| [`src/content/thinking.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/thinking.ts) | 系统方法模型（Systems Thinking）列表及深度分析富文本 | `thinkingItems: ThinkingItem[]` |
| [`src/content/notes.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/notes.ts) | 研究随笔（Research Notes）列表及富文本文章 | `noteItems: NoteItem[]` |
| [`src/content/cases.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/cases.ts) | 深度案例拆解（Case Studies）各维度的结构化分析文本 | `caseStudies: CaseStudy[]` |
| [`src/content/lab.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/lab.ts) | 系统实验室（Lab Playground）实验卡片、假设验证与结论 | `labItems: LabItem[]` |

---

## 2. 关系关联网络（ID 穿透系统）

本项目最核心的设计是**内容之间的交叉关联网络**（例如：阅读某个项目时，可以点击查看关联的深度案例、方法模型或随笔）。这种穿透是通过 **ID 匹配**实现的：

### 关联关系设置方法：

1. **项目关联案例/模型/随笔**：
   在 `src/content/site.config.ts` 中的某个项目项内，编辑以下 ID 数组：
   ```typescript
   relatedCaseIds: ["avoid-premature-prd"],        // 对应 cases.ts 中的 caseStudy.id
   relatedThinkingIds: ["stage-gate"],             // 对应 thinking.ts 中的 thinkingItem.id
   relatedNoteIds: ["agent-fsm-control"],          // 对应 notes.ts 中的 noteItem.id
   ```
2. **案例关联回项目**：
   在 `src/content/cases.ts` 中的某个案例项内，必须设置 `projectId`：
   ```typescript
   projectId: "zero-to-one",                       // 对应 site.config.ts 中的 project.id
   ```

---

## 3. 具体修改操作指南

### 3.1 修改个人简历与工作经历 (Profile / Resume)
打开 [`src/content/profile.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/profile.ts)：
* **修饰词与定位**：修改 `whoIAm`、`whatICareAbout`、`howIWork` 和 `careerDirection`。
* **工作经历**：在 `selectedExperience` 数组中添加或编辑公司和职责：
  ```typescript
  {
    period: "2024 - 至今",
    role: "你的职位名称",
    company: "公司/实验室名称",
    highlights: [
      "具体的可量化产出要点 1",
      "具体的可量化产出要点 2"
    ]
  }
  ```
  > [!TIP]
  > PDF 导出时，系统会自动强力排版 `selectedExperience` 中的前两项为标准两栏样式。

---

### 3.2 增加/编辑精选项目 (Projects)
打开 [`src/content/site.config.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/site.config.ts)：
* **添加项目**：向 `projects` 数组添加一个符合 `Project` 接口的对象。
* **状态定义**：`status` 可选值为：
  - `"shipped"` / `"mature"`：显示在“成熟或已上线项目”类别中，带有绿色的“已上线”状态标。
  - `"building"` / `"prototype"` / `"research"`：显示在“持续迭代与构建项目”中，带有黄色的状态标。
* **正文排版**：`contentBody` 支持 **Markdown 语法**，可以直接编写多行文本。
  > [!IMPORTANT]
  > 详情页 markdown 中的 H3 标题建议使用 `### 01 / 标题` 的命名格式，这会自动匹配网站的 Serif font 风格。

---

### 3.3 撰写系统方法论 (Thinking Framework)
打开 [`src/content/thinking.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/thinking.ts)：
* 向 `thinkingItems` 数组添加你的方法论（如 CPA 架构、用户阻尼设计等）。
* **门控步骤 (steps)**：可配置一个 `steps: string[]` 数组，它会在页面上以序列步骤条的形式进行渲染。

---

### 3.4 撰写研究随笔 (Research Notes)
打开 [`src/content/notes.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/notes.ts)：
* 向 `noteItems` 数组添加你的随笔随想。
* **状态过滤**：若 `draft` 设置为 `true`，请注意根据你的开发策略，它可能不会被渲染。在 V1 中建议设置 `draft: false` 以便直接发布。
* **标签搜索**：`tags: string[]` 会自动变成随笔卡片底部的 `#标签`，并在搜索框输入时参与全文过滤。

---

### 3.5 登记实验室探索 (Lab Items)
打开 [`src/content/lab.ts`](file:///Users/conrad/Desktop/个人作品集/src/content/lab.ts)：
* 向 `labItems` 数组追加实验。
* **实验属性**：
  - `status`: 可选 `"building"` | `"completed"` | `"paused"` | `"failed"`
  - `continueBuild`: 布尔值。为 `true` 时显示“● 计划继续孵化”，为 `false` 时显示“○ 实验已关闭归档”。

---

## 4. 排版与黑暗模式设计规范

为确保在黑色背景下的极致阅读体验，请在修改或新写组件样式时遵循以下原则：

1. **避免使用 `font-light` (300字重)**：
   * 在小号汉字和深色背景下，`font-light` 笔画过细会导致光线散焦发虚。正文请一律使用默认的标准字重 (`font-normal`) 或 `font-semibold`。
2. **文字颜色选择**：
   * `text-text-primary` (`#ece7df`)：用于主标题、大标题。
   * `text-text-secondary` (`#b8afa4`)：用于所有正文、列表描述，具有最舒适的对比度。
   * `text-text-muted` (`#8f887d`)：仅用于修饰性小字、小标签、时间日期等，**不要用于段落正文**。

---

## 5. 校验与部署工作流 (Verify & Deploy)

内容更新完成后，建议通过以下步骤完成本地校验与推送：

```bash
# 1. 本地构建校验（确保没有 TS 类型损坏、404 静态死链，并完美预渲染）
npm run build

# 2. 本地提交更改
git add .
git commit -m "content: update portfolio contents and resume highlights"

# 3. 推送至 GitHub 仓库
git push origin main
```
