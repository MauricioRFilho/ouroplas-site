# 🏭 Ouroplas - Site Institucional & Captura de Leads

Este é o repositório oficial do novo site institucional da **Ouroplas Indústria e Comércio de Plásticos**. Desenvolvido com tecnologias modernas para garantir performance, SEO e alta conversão de vendas.

![Ouroplas Logo](./public/ouroplas-logo.jpg)

## 🚀 Tecnologias Utilizadas

*   **Frontend**: [Next.js 15](https://nextjs.org/) (App Router, React Server Components)
*   **Linguagem**: TypeScript / React
*   **Estilização**: CSS Moderno (Vanilla + Modules) com Design System próprio (Navy Blue & Gold)
*   **Banco de Dados**: [Supabase](https://supabase.com/) (PostgreSQL) para gestão de Leads e CMS Headless
*   **Infraestrutura**: Docker & Docker Compose
*   **Mídia**: Suporte a Vídeo Background e Otimização de Imagens

## ✨ Funcionalidades Principais

1.  **Captura Inteligente de Leads**:
    *   Botão flutuante do WhatsApp e CTAs estratégicos.
    *   **Modal de Pré-qualificação**: Intercepta o clique para capturar Nome/Empresa/Telefone antes de redirecionar para o WhatsApp.
    *   Salva o lead automaticamente no banco de dados (Supabase) para CRM futuro.
    
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

2.  **Configure as Variáveis de Ambiente**:
    Crie um arquivo `.env.local` na raiz com suas chaves do Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=SuaUrlSupabase
    NEXT_PUBLIC_SUPABASE_ANON_KEY=SuaChaveAnonima
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

## 🗄️ Estrutura do Banco de Dados (Supabase)

O projeto utiliza um arquivo de migração em `supabase/migrations/0001_initial_schema.sql`.

### Tabelas:
*   `leads`: Armazena os contatos capturados pelo site.
*   `site_config`: Tabela Key-Value para permitir edição de textos (telefone, título) sem mexer no código (CMS).

## 📁 Estrutura de Pastas

*   `src/app`: Páginas e Layouts (Next.js App Router).
*   `src/components`: Componentes Reutilizáveis (Modal, Botão WhatsApp, Feed).
*   `public`: Arquivos estáticos (Imagens, Vídeos, Logos).
*   `supabase`: Migrations e scripts SQL.

---

**Desenvolvido por Equipe de Tecnologia Ouroplas**
*Foco em Inovação e Qualidade.*
