# 🏭 Ouroplas - Site Institucional & Captura de Leads

Este é o repositório oficial do novo site institucional da **Ouroplas Indústria e Comércio de Plásticos**. Desenvolvido com tecnologias modernas para garantir performance, SEO e alta conversão de vendas.

![Ouroplas Logo](./public/ouroplas-logo.jpg)

## 🚀 Tecnologias Utilizadas

*   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
*   **Linguagem**: TypeScript / React
*   **Estilização**: CSS Moderno (Vanilla + Modules) com Design System próprio (Navy Blue & Gold)
*   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
*   **Linguagem**: TypeScript / React
*   **Estilização**: CSS Moderno (Vanilla + Modules) com Design System próprio (Navy Blue & Gold)
*   **CMS (Gestão de Dados)**: Git-CMS via JSON (`src/data/content.json`) e GitHub API
*   **Infraestrutura**: Vercel
*   **Mídia**: Suporte a Vídeo Background e Otimização de Imagens

## ✨ Funcionalidades Principais

1.  **Captura Inteligente de Leads**:
    *   Botão flutuante do WhatsApp e CTAs estratégicos.
    *   **Modal de Pré-qualificação**: Intercepta o clique para capturar Nome/Empresa/Telefone antes de redirecionar para o WhatsApp.
    *   Redirecionamento dinâmico baseado nos contatos configurados.
    
2.  **Design Premium Industrial**:
    *   Identidade visual alinhada com a marca (Azul Marinho e Dourado).
    *   Efeito de *Glassmorphism* na navegação.
    *   Vídeo Background na Hero Section para impacto visual imediato.

3.  **Integrações**:
    *   **WhatsApp**: Redirecionamento com mensagem personalizada ("Olá, sou [Nome] da empresa [X]...").
    *   **Instagram**: Galeria "Vitrine" estática para performance (evita quebra de tokens).

## 🛠️ Como Rodar Localmente

### Pré-requisitos
*   Node.js 18+
*   Docker (Opcional, para rodar em container)

### Passo a Passo

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/seu-usuario/ouroplas-site.git
    cd ouroplas-site
    ```

    Crie um arquivo `.env.local` na raiz com as chaves para o Git-CMS:
    ```env
    ADMIN_PASSWORD=sua_senha
    GITHUB_TOKEN=ghp_seu_token
    GITHUB_REPO=MauricioRFilho/ouroplas-site
    ```

3.  **Instale as dependências**:
    ```bash
    npm install
    ```

4.  **Rode o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```
    Acesse `http://localhost:3000`.

## 🐳 Rodando com Docker

Para simular o ambiente de produção:

```bash
docker-compose up --build
```
O site estará disponível em `http://localhost:3000`.

## 🗄️ Painel Administrativo

O site possui um painel simples para edição de conteúdos em `/admin`. As alterações são salvas diretamente no repositório via API do GitHub, garantindo persistência sem custos de banco de dados.

### Configuração necessária (Vercel):
- `ADMIN_PASSWORD`: Senha de acesso ao painel.
- `GITHUB_TOKEN`: Fine-grained personal access token com permissão de escrita no repositório.
- `GITHUB_REPO`: `usuario/nome-do-repo`.

## 📁 Estrutura de Pastas

*   `src/app`: Páginas e Layouts (Next.js App Router).
*   `src/components`: Componentes Reutilizáveis (Modal, Botão WhatsApp, Feed).
*   `public`: Arquivos estáticos (Imagens, Vídeos, Logos).
*   `src/data`: Arquivos de dados JSON e configurações do site.

---

**Desenvolvido por Equipe de Tecnologia Ouroplas**
*Foco em Inovação e Qualidade.*
