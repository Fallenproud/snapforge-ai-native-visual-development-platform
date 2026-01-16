# Cloudflare Workers AI Chat Template

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Fallenproud/snapforge-ai-native-visual-development-platform)]

A production-ready template for building AI-powered chat applications using Cloudflare Workers, Durable Objects, and Cloudflare AI Gateway. Features multi-session conversations, streaming responses, tool calling (web search, weather, MCP integration), and a modern React UI with shadcn/ui components.

## 🚀 Features

- **Multi-Session Chat**: Persistent conversations with session management via Durable Objects
- **AI Integration**: Cloudflare AI Gateway with Gemini models (supports custom models)
- **Tool Calling**: Built-in tools for web search (SerpAPI), weather, and MCP servers
- **Streaming Responses**: Real-time streaming for natural chat experience
- **Responsive UI**: Modern Tailwind + shadcn/ui design with dark mode, sidebar, and mobile support
- **Session Controls**: Create, list, update, delete sessions with auto-generated titles
- **TypeScript**: Fully type-safe with proper error handling
- **Production-Ready**: CORS, logging, health checks, and error reporting

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, shadcn/ui, Lucide React, TanStack Query
- **Backend**: Cloudflare Workers, Hono, Agents SDK (Durable Objects)
- **AI**: Cloudflare AI Gateway, OpenAI SDK (Gemini compatible)
- **Tools**: SerpAPI, MCP (Model Context Protocol)
- **Build Tools**: Bun, Wrangler, TypeScript 5

## 📦 Installation

1. **Clone or download** the repository

2. **Install dependencies** using Bun:
   ```bash
   bun install
   ```

3. **Configure environment**:
   - Copy `wrangler.jsonc` and update:
     ```json
     "vars": {
       "CF_AI_BASE_URL": "https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/openai",
       "CF_AI_API_KEY": "{your_ai_gateway_token}",
       "SERPAPI_KEY": "{your_serpapi_key}",
       "OPENROUTER_API_KEY": "{optional_openrouter_key}"
     }
     ```
   - Get AI Gateway details from [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/ai-gateway)

## 🔄 Development

1. **Start dev server**:
   ```bash
   bun dev
   ```
   - Frontend: `http://localhost:3000`
   - Worker: `http://localhost:8787`

2. **Type generation** (for env types):
   ```bash
   bun run cf-typegen
   ```

3. **Lint and build**:
   ```bash
   bun lint
   bun build
   ```

## 💬 Usage

### Chat Sessions
- **New Session**: POST `/api/sessions` with `{ title?, firstMessage? }`
- **List Sessions**: GET `/api/sessions`
- **Chat**: POST `/api/chat/{sessionId}/chat` with `{ message, model?, stream? }`
- **Get Messages**: GET `/api/chat/{sessionId}/messages`
- **Clear Chat**: DELETE `/api/chat/{sessionId}/clear`
- **Update Model**: POST `/api/chat/{sessionId}/model` with `{ model }`

### Frontend
- Edit `src/pages/HomePage.tsx` for custom UI
- Use `src/lib/chat.ts` for API integration
- Customize sidebar in `src/components/app-sidebar.tsx`
- Add shadcn components via `components.json`

### Backend Customization
- **Routes**: Add to `worker/userRoutes.ts`
- **Tools**: Extend `worker/tools.ts`
- **AI Handler**: Modify `worker/chat.ts`
- **MCP**: Add servers to `worker/mcp-client.ts`

## ☁️ Deployment

1. **Build assets**:
   ```bash
   bun build
   ```

2. **Deploy to Cloudflare**:
   ```bash
   bun run deploy
   ```
   Or use the one-click deploy:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Fallenproud/snapforge-ai-native-visual-development-platform)

3. **Configure Workers**:
   - Bind Durable Objects in `wrangler.jsonc`
   - Set vars in Cloudflare Dashboard > Workers > Settings > Variables
   - Run migrations if needed: `wrangler do migrations`

4. **Custom Domain**: Add via `wrangler pages deploy` or Dashboard

## 🔧 Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `CF_AI_BASE_URL` | AI Gateway OpenAI-compatible endpoint | Yes |
| `CF_AI_API_KEY` | AI Gateway token | Yes |
| `SERPAPI_KEY` | Web search (optional) | No |
| `OPENROUTER_API_KEY` | Alternative models (optional) | No |

Update models in `src/lib/chat.ts` or API payloads.

## 🤝 Contributing

1. Fork and clone
2. Install: `bun install`
3. Create branch: `bun dev`
4. PR to `main`

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

## 🙌 Support

- [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/)
- [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
- [Agents SDK](https://developers.cloudflare.com/agents/)

Built with ❤️ by Cloudflare Developers