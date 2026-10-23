# Thanay Bot 🤖

Thanay Bot é um bot moderno e modular para **WhatsApp**, construído em **TypeScript** com a biblioteca **Baileys** (Multi-Device).

---

## 🚀 Funcionalidades

- **Multi-Device Moderno:** Conexão estável com suporte a QR Code e Pairing Code (código de 8 dígitos).
- **Moderação de Grupos:** Anti-link, anti-vídeo, anti-áudio, boas-vindas automáticas, aviso de administradores, menção de todos (@hidetag).
- **Downloads de Mídia:** YouTube (MP3 e MP4), TikTok, Instagram, Pinterest e APKs.
- **Figurinhas / Stickers:** Criação de figurinhas estáticas e animadas a partir de imagens/vídeos.
- **Brincadeiras e Interatividade:** Jogos, rank de participantes, piadas e comandos interativos.
- **Painel do Dono:** Gerenciamento remoto via WhatsApp (bloqueio, reinicialização, auto-update, configuração de prefixo e nome).
- **Pronto para VPS:** Otimizado com fila de concorrência FFmpeg, Docker / Docker Compose e PM2.

---

## 🛠️ Como Iniciar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configuração e Inicialização
```bash
# Iniciar assistente de inicialização e pareamento
npm start

# Ou iniciar diretamente
npm run start:fast
```

### 3. Deploy em Produção (VPS via Docker)
```bash
docker compose up -d --build
```

---

## 📚 Documentação / Documentation

| Idioma / Language | Instalação | Arquitetura | Configuração | Legal |
| :--- | :--- | :--- | :--- | :--- |
| **Português (pt)** | [Instalação](docs/pt/installation.md) | [Arquitetura](docs/pt/architecture.md) | [Configuração](docs/pt/configuration.md) | [Legal](docs/pt/legal.md) |
| **English (en)** | [Installation](docs/en/installation.md) | [Architecture](docs/en/architecture.md) | [Configuration](docs/en/configuration.md) | [Legal](docs/en/legal.md) |
| **Español (es)** | [Instalación](docs/es/installation.md) | [Arquitectura](docs/es/architecture.md) | [Configuración](docs/es/configuration.md) | [Legal](docs/es/legal.md) |
| **Bahasa Indonesia (id)** | [Instalasi](docs/id/installation.md) | [Arsitektur](docs/id/architecture.md) | [Konfigurasi](docs/id/configuration.md) | [Legal](docs/id/legal.md) |
| **العربية (ar)** | [التثبيت](docs/ar/installation.md) | [الهندسة](docs/ar/architecture.md) | [الإعدادات](docs/ar/configuration.md) | [قانوني](docs/ar/legal.md) |
| **Français (fr)** | [Installation](docs/fr/installation.md) | [Architecture](docs/fr/architecture.md) | [Configuration](docs/fr/configuration.md) | [Légal](docs/fr/legal.md) |
| **हिन्दी (hi)** | [स्थापना](docs/hi/installation.md) | [वास्तुकला](docs/hi/architecture.md) | [विन्यास](docs/hi/configuration.md) | [कानूनी](docs/hi/legal.md) |
| **اردو (ur)** | [تنصیب](docs/ur/installation.md) | [فن تعمیر](docs/ur/architecture.md) | [ترتیب](docs/ur/configuration.md) | [قانونی](docs/ur/legal.md) |
| **Deutsch (de)** | [Installation](docs/de/installation.md) | [Architektur](docs/de/architecture.md) | [Konfiguration](docs/de/configuration.md) | [Rechtliches](docs/de/legal.md) |
| **Türkçe (tr)** | [Kurulum](docs/tr/installation.md) | [Mimari](docs/tr/architecture.md) | [Yapılandırma](docs/tr/configuration.md) | [Yasal](docs/tr/legal.md) |
| **বাংলা (bn)** | [ইনস্টলেশন](docs/bn/installation.md) | [স্থাপত্য](docs/bn/architecture.md) | [কনফিগারেশন](docs/bn/configuration.md) | [আইনি](docs/bn/legal.md) |
