# 📌 Backlog de Melhorias Futuras — Thanay Bot

Lista de funcionalidades planejadas para próximas versões do bot:

---

### 1. Download Automático de Mídias (Sem Comandos)
- **Descrição:** O bot deve reconhecer automaticamente URLs soltas enviadas no chat e baixar o conteúdo correspondente sem exigir o prefixo ou o comando explícito.
- **Plataformas prioritárias:**
  - TikTok (vídeos sem marca d'água e carrossel de fotos)
  - Instagram (Reels, posts de fotos e vídeos)
  - YouTube (Shorts e vídeos)
- **Regras de Ativação:**
  - Habilitado por padrão no PV (chat privado).
  - Em grupos: deve verificar se o modo de anti-link está ativo e permitir ativação/desativação por administradores via comando (ex: `!autodownload on/off`).

---

### 2. Novos Provedores de Download
- **Twitter / X:**
  - Integração de download de vídeos e GIFs enviados em links do `twitter.com` e `x.com`.
- **Facebook:**
  - Download de vídeos públicos e reels do `facebook.com` / `fb.watch`.

---

### 3. Revisão de Comandos Atuais
- Avaliar remoção ou limitação do comando `!apk` (`modyolo`) caso não seja utilizado no servidor de produção.
