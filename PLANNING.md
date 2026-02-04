# Planejamento Estratégico Digital - Ouroplas

## 1. Arquitetura "CMS Headless" (Supabase)
Para permitir a edição do site sem desenvolvedores, criaremos a seguinte estrutura no Supabase:

### Tabelas Sugeridas:
1.  **`site_config`**
    *   Armazena textos e links que podem mudar.
    *   *Colunas*: `key` (ex: 'whatsapp_number', 'home_title'), `value` (texto), `description`.
    *   *Uso*: O site busca isso ao carregar para exibir o telefone atual ou mudar o título da promoção.
2.  **`leads`**
    *   Captura quem clicou no botão antes de ir para o WhatsApp.
    *   *Colunas*: `name`, `company`, `phone`, `interest`, `status` (Novo, Em Contato, Convertido).
3.  **`services`**
    *   Lista de serviços/cards na home.
    *   *Colunas*: `title`, `description`, `icon_url`, `order_index`.

## 2. Estratégia de SEO (Search Engine Optimization)
Para posicionar a Ouroplas como referência:

*   **Palavras-Chave**: Focar em cauda longa e localização. Ex: "Fábrica de Injeção Plástica em [Cidade]", "Desenvolvimento de Moldes Plásticos".
*   **Performance**: O site atual já está otimizado (Next.js) para carregar em < 1s (Core Web Vitals).
*   **Dados Estruturados (JSON-LD)**: Adicionaremos marcação Schema.org para que o Google entenda que somos uma "Indústria" (logo, telefone, endereço aparecem melhor nos resultados).

## 3. Captura de Leads & Vendas
Apenas ter o botão do WhatsApp não é mensurável.
*   **Proposta**: Implementar um "Intermediador de Lead".
    1.  Cliente clica em "Falar com Especialista".
    2.  Modal pede: Nome e Empresa.
    3.  Ao dar "OK", salvamos no Supabase e redirecionamos para o WhatsApp Web já com a mensagem: *"Olá, sou [Nome] da [Empresa] e gostaria de um orçamento."*
    *Isso cria um banco de dados proprietário para a Ouroplas fazer remarketing depois.*

## 4. Inovação (Diferencial Competitivo)
O que o mercado está fazendo de mais moderno?
*   **Portal do Cliente**: Área logada onde o cliente Ouroplas acompanha o status do pedido ("Em injeção", "Em acabamento", "Enviado").
*   **Simulador 3D**: Se houverem produtos proprietários, exibir modelos 3D interativos no site.

## 5. Infraestrutura
*   **Docker**: Já configurado para garantir estabilidade.
*   **Hospedagem**: Sugerimos Vercel (frontend) ou Digital Ocean (via Docker) + Supabase (Banco).
