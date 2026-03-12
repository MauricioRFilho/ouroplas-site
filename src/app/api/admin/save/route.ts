import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, password } = body;

    // Autenticação simples via env
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // "username/repo"
    const FILE_PATH = "src/data/content.json";

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      return NextResponse.json(
        { error: "Configuração do GitHub ausente (GITHUB_TOKEN ou GITHUB_REPO)" },
        { status: 500 }
      );
    }

    // 1. Obter o SHA atual do arquivo no GitHub
    const getRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!getRes.ok) {
      const errorData = await getRes.json();
      return NextResponse.json(
        { 
          error: "Erro ao buscar arquivo no GitHub", 
          details: errorData.message || "Não foi possível obter detalhes",
          status: getRes.status 
        },
        { status: getRes.status }
      );
    }

    const fileData = await getRes.json();
    const sha = fileData.sha;

    // 2. Enviar a atualização
    const putRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "cms: atualização de conteúdo via painel admin",
          content: Buffer.from(JSON.stringify(content, null, 2)).toString("base64"),
          sha: sha,
        }),
      }
    );

    if (!putRes.ok) {
      const errorData = await putRes.json();
      return NextResponse.json(
        { error: "Erro ao salvar no GitHub", details: errorData },
        { status: putRes.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no Admin Save API:", error);
    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}
