# web-read

`web-read` 和 `web-read-deep` 用于读取需要登录或授权后才能访问的网页内容。

## 适用范围

适用于任何登录后网页应用，不限于：

- 腾讯会议
- Google Docs / Forms
- Figma
- 飞书
- Jira / Confluence
- 各类后台和 SaaS 页面

## 工作方式

默认流程：

1. 先在可控浏览器里打开页面
2. 如需登录、授权、审批或输入密码，等待用户操作
3. 登录后先读页面可见内容
4. 再读动态请求和分页数据

## 使用前提

要真正生效，agent 需要具备可控浏览器能力。

如果只有静态网页抓取能力，这个 skill 只能部分起作用。

## 两个版本

- `web-read`
  轻量版，适合普通网页登录后内容读取

- `web-read-deep`
  深度版，适合动态渲染、分页、转写、接口鉴权等复杂场景

## 配置指南

### 1. 安装 skill

将以下目录放到 agent 的 skills 目录中：

- `web-read`
- `web-read-deep`

### 2. Codex 配置

在仓库根目录执行：

```bash
mkdir -p ~/.codex/skills && cp -R agent-skills/web-read agent-skills/web-read-deep ~/.codex/skills/
```

### 3. OpenCode 配置

在仓库根目录执行：

```bash
mkdir -p ~/.config/opencode/skills && cp -R agent-skills/web-read agent-skills/web-read-deep ~/.config/opencode/skills/
```

### 4. 浏览器能力要求

如果 agent 只有静态网页抓取能力，这套 skill 无法完整工作。  
要支持“先打开页面，再登录/授权，再继续读取动态内容”，agent 需要可控浏览器能力。

### 5. OpenCode 配置 Playwright MCP

如果你在 OpenCode 中使用，推荐配置 Playwright MCP：

```json
"mcp": {
  "playwright": {
    "type": "local",
    "enabled": true,
    "command": ["npx", "-y", "@playwright/mcp"]
  }
}
```

将这段加入 `~/.config/opencode/opencode.jsonc` 后，重启 OpenCode。

### 6. 使用方式

日常直接说：

- `看一下这个链接里的内容`

复杂场景可以明确说：

- `用 web-read-deep 看一下这个链接里的动态内容`
