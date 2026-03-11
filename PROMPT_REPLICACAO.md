# Prompt Estrutural para Replicação de Site Institucional (Ouroplas Model)

Este documento contém o prompt e a estrutura necessária para replicar este site para outras empresas de forma rápida e eficiente.

## 📋 Como usar este modelo

Para criar um novo site baseado nesta estrutura, forneça o seguinte prompt a um assistente de IA:

---

### PROMPT DE REPLICAÇÃO

"Crie um site institucional baseado no modelo 'Ouroplas Industrial'. O site deve ser desenvolvido em **Next.js 15+**, **React**, **TypeScript** e **CSS Puro** (sem frameworks de utilitários como Tailwind, a menos que especificado).

**Estrutura de Dados:**
Toda a configuração deve residir em um único arquivo `src/data/site-data.ts`.

**Informações da Nova Empresa:**
- **Nome:** [NOME DA EMPRESA]
- **Setor:** [SETOR DE ATUAÇÃO]
- **Cores Principais:** [COR PRIMÁRIA], [COR SECUNDÁRIA]
- **WhatsApp:** [NÚMERO COM DDD]
- **Email:** [EMAIL DE CONTATO]
- **Localização:** [CIDADE/ESTADO]

**Componentes Necessários:**
1. **Navbar:** Logo à esquerda, links de navegação à direita, botão de orçamento em destaque.
2. **Hero Section:** Título impactante com gradiente, vídeo de fundo (lite) ou imagem premium, CTA para WhatsApp.
3. **About Section:** Texto descritivo sobre a empresa e sua expertise.
4. **Services Section:** Grid de cards com ícones modernos descrevendo os principais serviços.
5. **News Section:** Lista de novidades/posts recentes (estático).
6. **Instagram Feed:** Integração visual com o feed da empresa.
7. **Contact Modal:** Formulário de captação simples que redireciona para o WhatsApp com mensagem pré-preenchida.
8. **Footer:** Mapa do site, contatos e redes sociais.

**Diretrizes de Design (Premium):**
- Use **Glassmorphism** em componentes flutuantes.
- Aplique **micro-animações** suaves em hover e scroll.
- Utilize tipografia moderna (ex: Inter, Montserrat).
- Garanta **SEO otimizado** com metatags dinâmicas e Schema.org para Local Business.
- O design deve ser **totalmente responsivo** e focado em conversão via mobile (Botão WhatsApp flutuante)."

---

## 🛠️ Manutenção Manual

Para alterar qualquer informação no site:
1. Abra o arquivo `src/data/site-data.ts`.
2. Edite os valores no objeto `siteConfig` ou no array `newsData`.
3. O site atualizará automaticamente após o deploy.

## ✅ Checklist de Replicação
- [ ] Atualizar favicon em `public/`.
- [ ] Substituir vídeos/imagens em `public/`.
- [ ] Configurar as cores no arquivo CSS global (CSS Variables).
- [ ] Validar o número do WhatsApp no `site-data.ts`.
