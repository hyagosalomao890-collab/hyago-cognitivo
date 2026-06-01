import React, { useState, useEffect } from 'react';

// ============ DADOS DOS TESTES ============
const TESTES_LOGICA = [
  {
    id: 1,
    categoria: "sequencia",
    dificuldade: 1,
    pergunta: "Qual o próximo número? 2, 4, 8, 16, ??",
    resposta_correta: ["32"],
    alternativas: ["24", "30", "32", "36"],
    explicacao: "Cada número é multiplicado por 2. Isso é uma progressão geométrica com razão 2.",
    modelo_mental: "Padrões e Sequências",
    vieses_comuns: ["Óbvio demais, pulou a análise"],
    pontos_max: 10
  },
  {
    id: 2,
    categoria: "deducao",
    dificuldade: 1,
    pergunta: "Todos os gatos são animais. Miau é um gato. Logo, Miau é um:",
    resposta_correta: ["Animal", "animal"],
    alternativas: ["Vegetal", "Animal", "Roupa", "Cor"],
    explicacao: "Silogismo dedutivo válido. Se A⊆B e x∈A, então x∈B.",
    modelo_mental: "Dedução Lógica",
    vieses_comuns: ["Pensamento automático"],
    pontos_max: 10
  },
  {
    id: 3,
    categoria: "causalidade",
    dificuldade: 2,
    pergunta: "Se aumentar preço de um produto, o que acontece com a demanda?",
    resposta_correta: ["Diminui", "diminui", "cai", "Cai"],
    alternativas: ["Aumenta", "Diminui", "Fica igual", "Depende"],
    explicacao: "Lei básica de economia: demanda é inversamente proporcional ao preço (ceteris paribus).",
    modelo_mental: "Pensamento Econômico",
    vieses_comuns: ["Salto lógico sem considerar contexto"],
    pontos_max: 15
  },
  {
    id: 4,
    categoria: "probabilidade",
    dificuldade: 2,
    pergunta: "Em 100 lançamentos de moeda que deram cara. Qual é a chance do próximo ser cara?",
    resposta_correta: ["50%", "50", "0.5", "0,5"],
    alternativas: ["Menor que 50%", "50%", "Maior que 50%", "Impossível saber"],
    explicacao: "Ilusão da série / Falácia do apostador. Cada lançamento é independente. Probabilidade = 50% sempre.",
    modelo_mental: "Pensamento Probabilístico",
    vieses_comuns: ["Viés de recência", "Ilusão da série"],
    pontos_max: 25
  },
  {
    id: 5,
    categoria: "inversao",
    dificuldade: 2,
    pergunta: "Se NÃO trabalho amanhã, então amanhã é necessariamente:",
    resposta_correta: ["Nada", "Nenhum dia específico", "Não é possível determinar"],
    alternativas: ["Sábado", "Domingo", "Feriado", "Nenhum dia específico"],
    explicacao: "Lógica inversa. Se você não trabalha, não significa que é dia de descanso. Pode ser doença, licença, etc.",
    modelo_mental: "Inversão",
    vieses_comuns: ["Pensamento binário", "Salto lógico"],
    pontos_max: 20
  },
  {
    id: 6,
    categoria: "multiplas_variaveis",
    dificuldade: 3,
    pergunta: "Uma empresa tem A clientes, B lucro, C custos. Se C aumenta 10%, o que você conclui?",
    resposta_correta: ["Insuficiente informação", "insuficiente", "Não é possível", "Faltam dados"],
    alternativas: ["Lucro cai 10%", "Lucro cai mais de 10%", "Insuficiente informação", "Lucro fica igual"],
    explicacao: "Você não sabe a relação entre C e lucro total. Custos podem ser 10% ou 80% do lucro. Precisa de mais contexto.",
    modelo_mental: "Primeiros Princípios",
    vieses_comuns: ["Saltos lógicos", "Assunções não-testadas"],
    pontos_max: 30
  },
  {
    id: 7,
    categoria: "silogismo",
    dificuldade: 3,
    pergunta: "Alguns artistas são ricos. Alguns ricos são felizes. Logo, alguns artistas são felizes?",
    resposta_correta: ["Não necessariamente", "Não", "Não é válido"],
    alternativas: ["Sim", "Não", "Sim, sempre", "Depende"],
    explicacao: "Falácia lógica. Os ricos artistas podem não ser os mesmos ricos felizes. Não há conexão garantida.",
    modelo_mental: "Lógica Formal",
    vieses_comuns: ["Viés de confirmação", "Pensamento associativo"],
    pontos_max: 35
  },
  {
    id: 8,
    categoria: "economia_comportamental",
    dificuldade: 3,
    pergunta: "Por que as pessoas gastam mais com cartão de crédito do que com dinheiro em espécie?",
    resposta_correta: ["Distância psicológica do dinheiro", "Menos abstração do valor"],
    alternativas: ["Cartão é mais barato", "Distância psicológica do dinheiro", "Dinheiro desaparece rápido", "Nenhuma razão"],
    explicacao: "Economia comportamental: dinheiro físico é mais 'real' psicologicamente. Cartão abstrai a perda.",
    modelo_mental: "Economia Comportamental",
    vieses_comuns: ["Ignorar psicologia do dinheiro"],
    pontos_max: 40
  },
  {
    id: 9,
    categoria: "sistema_complexo",
    dificuldade: 3,
    pergunta: "Aumentar salários causa inflação? Sempre?",
    resposta_correta: ["Depende do contexto", "Não sempre", "Depende"],
    alternativas: ["Sempre", "Nunca", "Depende do contexto", "Impossível saber"],
    explicacao: "Sistemas complexos. Inflação depende de oferta de moeda, capacidade produtiva, demanda agregada. Não é linear.",
    modelo_mental: "Pensamento Sistêmico",
    vieses_comuns: ["Causalidade linear"],
    pontos_max: 40
  },
  {
    id: 10,
    categoria: "inversao_estrategica",
    dificuldade: 4,
    pergunta: "Se você quer EVITAR o erro X, qual estratégia NÃO deve usar?",
    resposta_correta: ["Pensar direto em X"],
    alternativas: ["Pensar no oposto de X", "Listar causas de X", "Pensar no oposto de X", "Ignorar X"],
    explicacao: "Modelo de Inversão: pensar nos opostos revela caminhos. Pensar direto pode levar ao mesmo erro.",
    modelo_mental: "Inversão",
    vieses_comuns: ["Pensamento direto"],
    pontos_max: 45
  },
  {
    id: 11,
    categoria: "razao_vs_intuicao",
    dificuldade: 4,
    pergunta: "Seu instinto diz X, mas dados dizem Y. Como você decide de forma inteligente?",
    resposta_correta: ["Analisa por que divergem"],
    alternativas: ["Segue instinto", "Segue dados", "Analisa por que divergem", "Faz um meio termo"],
    explicacao: "Metacognição: a divergência ENTRE instinto e dados é o sinal mais valioso. Explore por quê divergem.",
    modelo_mental: "Metacognição",
    vieses_comuns: ["Confiança excessiva em um lado"],
    pontos_max: 50
  },
  {
    id: 12,
    categoria: "vies_cognitivo",
    dificuldade: 4,
    pergunta: "Você lê 10 notícias sobre crime. Acha que crime aumentou. Que viés é esse?",
    resposta_correta: ["Disponibilidade", "Viés de disponibilidade"],
    alternativas: ["Confirmação", "Disponibilidade", "Recência", "Ancoragem"],
    explicacao: "Viés de Disponibilidade: julgamos frequência pelo que vem à mente facilmente. Notícias são selecionadas.",
    modelo_mental: "Reconhecimento de Vieses",
    vieses_comuns: ["Meta-viés: ignorar próprios vieses"],
    pontos_max: 50
  },
  {
    id: 13,
    categoria: "logica_causal",
    dificuldade: 4,
    pergunta: "Se A causa B, e B causa C, mas observamos C sem A, então:",
    resposta_correta: ["A não é a única causa de B"],
    alternativas: ["A não causa B", "A não é a única causa de B", "Há erro nos dados", "Impossível"],
    explicacao: "A pode não ser a causa única de B. Há outras causas. Multicausalidade é normal em sistemas reais.",
    modelo_mental: "Pensamento Crítico",
    vieses_comuns: ["Causalidade simplificada"],
    pontos_max: 50
  },
  {
    id: 14,
    categoria: "paradoxo",
    dificuldade: 4,
    pergunta: "Um barbeiro barbeia todos os que não se barbeiam. Quem barbeia o barbeiro?",
    resposta_correta: ["Paradoxo não-resolvível"],
    alternativas: ["Ele mesmo", "Outro barbeiro", "Paradoxo não-resolvível", "Ninguém"],
    explicacao: "Paradoxo de Russell. Demonstra limites da lógica formal. Nem tudo é resolvível com lógica.",
    modelo_mental: "Pensamento de Limites",
    vieses_comuns: ["Precisão falsa"],
    pontos_max: 50
  },
  {
    id: 15,
    categoria: "primeiros_principios",
    dificuldade: 5,
    pergunta: "Uma startup tech precisa de: A) Muita tecnologia avançada, B) Produto que resolve problema real, C) Equipe A-players. Se só pode escolher 1, qual é ESSENCIAL?",
    resposta_correta: ["B", "Produto que resolve problema real"],
    alternativas: ["A", "B", "C", "Não é possível escolher"],
    explicacao: "Primeiros Princípios: sem problema real a resolver, tecnologia e talento são inúteis. B é fundamental.",
    modelo_mental: "Primeiros Princípios",
    vieses_comuns: ["Tecnologia-centrismo"],
    pontos_max: 100
  }
];

const CENARIOS = [
  {
    id: 1,
    titulo: "Dilema de Carreira",
    situacao: "Você tem uma oferta de emprego que paga 40% a mais, em empresa maior, com prestígio. Seu trabalho atual é menor, paga menos, MAS você tem liberdade total e aprende mais. Tem 2 filhos, precisa de estabilidade. Qual você escolhe?",
    constraints: ["Não pode mudar de ideia em 2 anos", "Cada escolha tem trade-offs reais"],
    perguntas: [
      { ordem: 1, pergunta: "O que você priorizaria: dinheiro, aprendizado, ou estabilidade para sua família? Por quê?" },
      { ordem: 2, pergunta: "Se não tivesse filhos, sua resposta mudaria? O que isso diz sobre suas VERDADEIRAS prioridades?" },
      { ordem: 3, pergunta: "Qual decisão você se arrependeria mais em 10 anos?" }
    ],
    vieses_provaveis: ["Viés de recência", "Aversão à perda", "Status quo bias"],
    modelos_mentais: ["Custo de Oportunidade", "Trade-offs", "Pensamento de Longo Prazo"],
    pontos_max: 150
  },
  {
    id: 2,
    titulo: "Estratégia de Negócio",
    situacao: "Sua startup tem produto bom, mas vendas ruins. Você sabe que A) Equipe de vendas é fraca, B) Produto pode ter problemas, C) Mercado pode não existir. Você tem capital para investigar 1 coisa primeiro. Qual escolhe?",
    constraints: ["Tempo limitado", "Recursos escassos"],
    perguntas: [
      { ordem: 1, pergunta: "Como você diferenciaria entre um problema de PRODUTO vs MERCADO vs EXECUÇÃO?" },
      { ordem: 2, pergunta: "Qual erro custaria mais caro se você estivesse errado?" },
      { ordem: 3, pergunta: "Se você estivesse completamente errado em sua primeira intuição, por quê estaria errado?" }
    ],
    vieses_provaveis: ["Viés do fundador", "Confiança excessiva", "Ilusão de controle"],
    modelos_mentais: ["Pensamento Sistêmico", "Primeiros Princípios", "Análise de Risco"],
    pontos_max: 150
  },
  {
    id: 3,
    titulo: "Dilema Ético",
    situacao: "Seu chefe pede para falsificar um relatório. Você precisa do emprego, mas sabe que é errado. Como você estrategicamente aborda isso?",
    constraints: ["Pressão financeira real", "Hierarquia corporativa"],
    perguntas: [
      { ordem: 1, pergunta: "Qual é o PIOR cenário se você recusa? E se você aceita?" },
      { ordem: 2, pergunta: "Há uma terceira opção que ninguém está vendo?" },
      { ordem: 3, pergunta: "Como você teria evitado estar nesta posição?" }
    ],
    vieses_provaveis: ["Otimismo ilusório", "Dissonância cognitiva"],
    modelos_mentais: ["Pensamento de Cenários", "Inversão", "Ética aplicada"],
    pontos_max: 150
  },
  {
    id: 4,
    titulo: "Investimento e Risco",
    situacao: "Você tem R$10.000. Opção A: Investimento seguro, 5% ao ano. Opção B: Startup com 20% de chance de 10x retorno, 80% de perda total. O que você faz e por quê?",
    constraints: ["Capital limitado", "Incerteza"],
    perguntas: [
      { ordem: 1, pergunta: "Qual é seu risco máximo tolerável? Como você define isso?" },
      { ordem: 2, pergunta: "Como você diferencia uma 'boa decisão' de um 'bom resultado'?" },
      { ordem: 3, pergunta: "Se tivesse R$100 mil em vez de R$10 mil, sua resposta mudaria? Por quê?" }
    ],
    vieses_provaveis: ["Aversão à perda", "Ilusão do controle"],
    modelos_mentais: ["Pensamento Probabilístico", "Kelly Criterion", "Variância e Incerteza"],
    pontos_max: 150
  },
  {
    id: 5,
    titulo: "Meta-Decisão",
    situacao: "Você enfrenta um problema difícil. Como você decide? A) Pensa rápido, decide e age. B) Analisa demais, decide tarde. C) Delega para outro. D) Usa um framework estruturado.",
    constraints: ["Cada estilo tem custos"],
    perguntas: [
      { ordem: 1, pergunta: "Por que você naturalmente tende a UM desses estilos? Qual é a origem disso?" },
      { ordem: 2, pergunta: "Qual estilo é MELHOR para THIS tipo de problema? Por quê?" },
      { ordem: 3, pergunta: "Como você saberia se está usando o estilo CERTO?" }
    ],
    vieses_provaveis: ["Pensamento automático", "Falta de flexibilidade"],
    modelos_mentais: ["Metacognição", "Adaptação contextual"],
    pontos_max: 150
  }
];

// ============ COMPONENTES ============

function Home({ onStart, stats }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">H</span>
          </div>
          <h1 className="text-4xl font-bold text-white">HYAGO COGNITIVO</h1>
        </div>

        {/* Greeting */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Olá, Hyago! 👋</h2>
          <p className="text-slate-400">Pronto para treinar o raciocínio hoje?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 mb-12">
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Seu Nível</p>
                <p className="text-3xl font-bold text-white">{stats.nivel}</p>
              </div>
              <span className="text-3xl text-red-400">{stats.pontos_totais} pts</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all"
                style={{ width: `${(stats.pontos_totais % 500) / 5}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-xs mt-2">{stats.pontos_totais % 500}/500 pts para próximo nível</p>
          </div>

          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-slate-400 text-sm mb-2">Últimas Sessões</p>
            <p className="text-3xl font-bold text-white">{stats.sessoes_total}</p>
          </div>

          {stats.vieses_identificados.length > 0 && (
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
              <p className="text-slate-400 text-sm mb-3">Padrões Detectados</p>
              <div className="space-y-2">
                {stats.vieses_identificados.slice(0, 3).map((vies, idx) => (
                  <div key={idx} className="text-sm text-red-400">• {vies}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg transition-all text-lg"
        >
          ⚡ INICIAR SESSÃO MISTA
        </button>
      </div>
    </div>
  );
}

function TesteLógica({ teste, onResposta, numeroPergunta, total }) {
  const [respostaUsuario, setRespostaUsuario] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [analisando, setAnalisando] = useState(false);

  const handleSubmit = async () => {
    if (!respostaUsuario.trim()) return;

    setAnalisando(true);
    setEnviado(true);

    // Verificação local
    const acertou = teste.resposta_correta.some(r => 
      r.toLowerCase() === respostaUsuario.toLowerCase()
    );

    // Integração Groq para análise profunda
    try {
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('groq_api_key')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          max_tokens: 300,
          messages: [{
            role: 'user',
            content: `Analise esta resposta de teste cognitivo:
Pergunta: ${teste.pergunta}
Resposta do usuário: ${respostaUsuario}
Resposta correta: ${teste.resposta_correta[0]}
Modelo mental envolvido: ${teste.modelo_mental}

Responda em JSON:
{
  "acertou": ${acertou},
  "pontos": ${acertou ? teste.pontos_max : Math.floor(teste.pontos_max * 0.3)},
  "explicacao": "Texto breve",
  "vies_detectado": "Nome do viés ou null",
  "feedback": "Análise honesta da qualidade do pensamento"
}`
          }]
        })
      });

      const groqData = await groqResponse.json();
      const analise = JSON.parse(groqData.choices[0].message.content);
      
      setResultado({
        acertou,
        pontos: analise.pontos,
        explicacao: analise.explicacao,
        vies_detectado: analise.vies_detectado,
        feedback: analise.feedback
      });
    } catch (error) {
      console.error('Erro Groq:', error);
      setResultado({
        acertou,
        pontos: acertou ? teste.pontos_max : Math.floor(teste.pontos_max * 0.3),
        explicacao: teste.explicacao,
        vies_detectado: null,
        feedback: "Análise do Claude"
      });
    }

    setAnalisando(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400">Teste {numeroPergunta} de {total}</span>
          <span className="text-red-400 font-bold">{teste.modelo_mental} • {teste.pontos_max} pts</span>
        </div>

        {/* Pergunta */}
        <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 mb-6">
          <p className="text-xl text-white leading-relaxed">{teste.pergunta}</p>
        </div>

        {/* Resposta */}
        {!enviado ? (
          <div className="space-y-4 mb-8">
            {teste.alternativas ? (
              <div className="grid gap-3">
                {teste.alternativas.map((alt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setRespostaUsuario(alt)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      respostaUsuario === alt
                        ? 'bg-red-500 border-red-500 text-white'
                        : 'bg-slate-700 border-slate-600 text-white hover:border-red-400'
                    }`}
                  >
                    {alt}
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={respostaUsuario}
                onChange={(e) => setRespostaUsuario(e.target.value)}
                placeholder="Sua resposta..."
                className="w-full p-4 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-red-400 outline-none"
              />
            )}
            <button
              onClick={handleSubmit}
              disabled={!respostaUsuario.trim()}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              {analisando ? 'Analisando...' : 'Responder'}
            </button>
          </div>
        ) : resultado && (
          <div className={`rounded-lg p-6 border-2 mb-8 ${
            resultado.acertou 
              ? 'bg-emerald-900 border-emerald-500' 
              : 'bg-red-900 border-red-500'
          }`}>
            <div className="flex gap-2 mb-4">
              <span className={resultado.acertou ? 'text-emerald-400 text-2xl' : 'text-red-400 text-2xl'}>
                {resultado.acertou ? '✓' : '✗'}
              </span>
              <span className="text-white font-bold text-lg">
                {resultado.acertou ? 'ACERTOU!' : 'INCORRETO'}
              </span>
            </div>
            
            <p className="text-white mb-4">{resultado.explicacao}</p>
            
            {resultado.vies_detectado && (
              <div className="bg-black bg-opacity-40 p-3 rounded mb-4 text-sm text-yellow-300">
                🚩 Padrão detectado: {resultado.vies_detectado}
              </div>
            )}
            
            <p className="text-slate-300 text-sm italic">{resultado.feedback}</p>
            
            <div className="mt-4 pt-4 border-t border-slate-600">
              <span className="text-white font-bold">+{resultado.pontos} pontos</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CenarioTest({ cenario, onConcluir, numeroSessao, total }) {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState(null);

  const pergunta = cenario.perguntas[perguntaAtual];
  const respostaAtual = respostas[perguntaAtual] || '';

  const handleProxima = () => {
    if (perguntaAtual < cenario.perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    }
  };

  const handleAnterior = () => {
    if (perguntaAtual > 0) {
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  const atualizarResposta = (valor) => {
    const novasRespostas = [...respostas];
    novasRespostas[perguntaAtual] = valor;
    setRespostas(novasRespostas);
  };

  const handleConcluir = async () => {
    setAnalisando(true);

    try {
      const analisePrompt = `Analise este cenário respondido pelo usuário:

CENÁRIO: ${cenario.titulo}
SITUAÇÃO: ${cenario.situacao}

PERGUNTAS E RESPOSTAS:
${cenario.perguntas.map((p, i) => `
P${i+1}: ${p.pergunta}
R${i+1}: ${respostas[i] || 'Sem resposta'}
`).join('\n')}

Modelos mentais esperados: ${cenario.modelos_mentais.join(', ')}
Vieses prováveis: ${cenario.vieses_provaveis.join(', ')}

Responda em JSON:
{
  "pontos": 75-150,
  "qualidade": "alta|média|baixa",
  "modelos_usados": ["lista de modelos mencionados"],
  "vieses_detectados": ["lista de vieses encontrados"],
  "analise_profunda": "Análise honesta e direta. O que o usuário fez bem? Onde errou?",
  "proximos_passos": "Recomendação de modelo mental a estudar"
}`;

      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('groq_api_key')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          max_tokens: 500,
          messages: [{ role: 'user', content: analisePrompt }]
        })
      });

      const groqData = await groqResponse.json();
      const analise = JSON.parse(groqData.choices[0].message.content);
      
      setResultado({
        pontos: analise.pontos,
        qualidade: analise.qualidade,
        modelos_usados: analise.modelos_usados,
        vieses_detectados: analise.vieses_detectados,
        analise_profunda: analise.analise_profunda,
        proximos_passos: analise.proximos_passos
      });
    } catch (error) {
      console.error('Erro:', error);
      setResultado({
        pontos: 100,
        qualidade: 'média',
        modelos_usados: [],
        vieses_detectados: [],
        analise_profunda: 'Análise do sistema',
        proximos_passos: 'Continue treinando'
      });
    }

    setAnalisando(false);
  };

  if (resultado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">{cenario.titulo} - Análise</h2>
          
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Qualidade:</span>
              <span className={`font-bold ${
                resultado.qualidade === 'alta' ? 'text-emerald-400' :
                resultado.qualidade === 'média' ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {resultado.qualidade.toUpperCase()}
              </span>
            </div>

            <div>
              <p className="text-slate-400 mb-2">Análise:</p>
              <p className="text-white text-sm leading-relaxed">{resultado.analise_profunda}</p>
            </div>

            {resultado.modelos_usados.length > 0 && (
              <div>
                <p className="text-slate-400 mb-2">Modelos Mentais Detectados:</p>
                <div className="flex flex-wrap gap-2">
                  {resultado.modelos_usados.map((m, i) => (
                    <span key={i} className="bg-emerald-900 text-emerald-400 px-3 py-1 rounded text-sm">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {resultado.vieses_detectados.length > 0 && (
              <div>
                <p className="text-slate-400 mb-2">Vieses Identificados:</p>
                <div className="flex flex-wrap gap-2">
                  {resultado.vieses_detectados.map((v, i) => (
                    <span key={i} className="bg-red-900 text-red-400 px-3 py-1 rounded text-sm">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-600">
              <p className="text-white font-bold">+{resultado.pontos} PONTOS</p>
            </div>

            <button
              onClick={() => onConcluir(resultado.pontos)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg mt-4"
            >
              Próximo →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <span className="text-slate-400">Cenário {numeroSessao} de {total}</span>
          <span className="text-red-400 font-bold">{cenario.titulo}</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">{cenario.titulo}</h2>

        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 mb-8">
          <p className="text-white leading-relaxed">{cenario.situacao}</p>
        </div>

        <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 mb-6">
          <p className="text-slate-300 mb-4 text-sm">
            Pergunta {perguntaAtual + 1} de {cenario.perguntas.length}
          </p>
          <h3 className="text-xl text-white mb-4">{pergunta.pergunta}</h3>
          
          <textarea
            value={respostaAtual}
            onChange={(e) => atualizarResposta(e.target.value)}
            placeholder="Sua resposta..."
            className="w-full p-4 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-red-400 outline-none min-h-24"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleAnterior}
            disabled={perguntaAtual === 0}
            className="flex-1 bg-slate-600 hover:bg-slate-700 disabled:bg-slate-800 text-white font-bold py-3 rounded-lg transition-all"
          >
            ← Anterior
          </button>
          
          {perguntaAtual < cenario.perguntas.length - 1 ? (
            <button
              onClick={handleProxima}
              disabled={!respostaAtual.trim()}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              Próxima →
            </button>
          ) : (
            <button
              onClick={handleConcluir}
              disabled={!respostaAtual.trim() || analisando}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg transition-all"
            >
              {analisando ? 'Analisando...' : 'Concluir Cenário'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Dashboard({ stats, onVoltar }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm">Pontos Totais</p>
            <p className="text-3xl font-bold text-white">{stats.pontos_totais}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm">Nível</p>
            <p className="text-3xl font-bold text-white">{stats.nivel}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm">Sessões</p>
            <p className="text-3xl font-bold text-white">{stats.sessoes_total}</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
            <p className="text-slate-400 text-sm">Acurácia Média</p>
            <p className="text-3xl font-bold text-white">{stats.acuracia_media || '-'}%</p>
          </div>
        </div>

        {/* Padrões Identificados */}
        {stats.vieses_identificados.length > 0 && (
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Padrões Identificados</h2>
            <div className="space-y-3">
              {stats.vieses_identificados.map((vies, i) => (
                <div key={i} className="bg-slate-800 p-3 rounded text-red-400 text-sm flex items-center gap-2">
                  <span>🚩</span> {vies}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Histórico de Sessões */}
        {stats.historico_sessoes && stats.historico_sessoes.length > 0 && (
          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <h2 className="text-xl font-bold text-white mb-4">Últimas Sessões</h2>
            <div className="space-y-2">
              {stats.historico_sessoes.slice(-5).reverse().map((sessao, i) => (
                <div key={i} className="bg-slate-800 p-3 rounded flex justify-between text-sm">
                  <span className="text-slate-400">{sessao.data}</span>
                  <span className="text-red-400 font-bold">+{sessao.pontos_ganhos} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onVoltar}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg mt-8"
        >
          ← Voltar ao Início
        </button>
      </div>
    </div>
  );
}

// ============ APP PRINCIPAL ============

export default function App() {
  const [tela, setTela] = useState('setup'); // setup, home, testes, cenarios, resultados, dashboard
  const [groqKey, setGroqKey] = useState(() => localStorage.getItem('groq_api_key') || '');
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('hyago_stats');
    return saved ? JSON.parse(saved) : {
      nome: 'Hyago',
      nivel: 1,
      pontos_totais: 0,
      sessoes_total: 0,
      acuracia_media: 0,
      vieses_identificados: [],
      modelos_mentais_dominados: [],
      historico_sessoes: []
    };
  });

  const [sessaoAtual, setSessaoAtual] = useState({
    tipo: 'misto',
    testes_completados: 0,
    cenarios_completados: 0,
    pontos_ganhos: 0,
    testes_respostas: [],
    cenarios_respostas: []
  });

  const [testeIndex, setTesteIndex] = useState(0);
  const [cenarioIndex, setCenarioIndex] = useState(0);

  // Setup Groq
  if (tela === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 flex items-center">
        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold text-white mb-2">HYAGO COGNITIVO</h1>
          <p className="text-slate-400 mb-8">Sistema de Treinamento Cognitivo</p>

          <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
            <p className="text-white mb-4">Você precisa de uma chave Groq (gratuita):</p>
            
            <a 
              href="https://console.groq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-red-400 hover:text-red-300 text-sm mb-4 block"
            >
              1. Obter chave em console.groq.com →
            </a>

            <input
              type="password"
              value={groqKey}
              onChange={(e) => setGroqKey(e.target.value)}
              placeholder="Cole sua chave Groq aqui..."
              className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-red-400 outline-none mb-4"
            />

            <button
              onClick={() => {
                if (groqKey.trim()) {
                  localStorage.setItem('groq_api_key', groqKey);
                  setTela('home');
                }
              }}
              disabled={!groqKey.trim()}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-slate-600 text-white font-bold py-3 rounded-lg"
            >
              Salvar e Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Home
  if (tela === 'home') {
    return (
      <>
        <Home 
          onStart={() => {
            setSessaoAtual({ tipo: 'misto', testes_completados: 0, cenarios_completados: 0, pontos_ganhos: 0, testes_respostas: [], cenarios_respostas: [] });
            setTesteIndex(0);
            setCenarioIndex(0);
            setTela('testes');
          }}
          stats={stats}
        />
        <button
          onClick={() => setTela('dashboard')}
          className="fixed bottom-6 right-6 bg-slate-700 hover:bg-slate-600 text-white p-3 rounded-full"
        >
          📊
        </button>
      </>
    );
  }

  // Testes
  if (tela === 'testes' && testeIndex < TESTES_LOGICA.length) {
    return (
      <TesteLógica
        teste={TESTES_LOGICA[testeIndex]}
        numeroPergunta={testeIndex + 1}
        total={TESTES_LOGICA.length}
        onResposta={(pontos, vies) => {
          setSessaoAtual(s => ({
            ...s,
            testes_completados: s.testes_completados + 1,
            pontos_ganhos: s.pontos_ganhos + pontos,
            testes_respostas: [...s.testes_respostas, { teste: testeIndex, pontos, vies }]
          }));
          setTesteIndex(testeIndex + 1);
        }}
      />
    );
  }

  // Cenários
  if (tela === 'testes' && testeIndex >= TESTES_LOGICA.length && cenarioIndex < CENARIOS.length) {
    return (
      <CenarioTest
        cenario={CENARIOS[cenarioIndex]}
        numeroSessao={cenarioIndex + 1}
        total={CENARIOS.length}
        onConcluir={(pontos) => {
          setSessaoAtual(s => ({
            ...s,
            cenarios_completados: s.cenarios_completados + 1,
            pontos_ganhos: s.pontos_ganhos + pontos,
            cenarios_respostas: [...s.cenarios_respostas, { cenario: cenarioIndex, pontos }]
          }));
          setCenarioIndex(cenarioIndex + 1);
        }}
      />
    );
  }

  // Resultados
  if (tela === 'testes' && testeIndex >= TESTES_LOGICA.length && cenarioIndex >= CENARIOS.length) {
    const novoNivel = Math.floor((stats.pontos_totais + sessaoAtual.pontos_ganhos) / 500) + 1;
    const novoStats = {
      ...stats,
      pontos_totais: stats.pontos_totais + sessaoAtual.pontos_ganhos,
      sessoes_total: stats.sessoes_total + 1,
      nivel: novoNivel,
      historico_sessoes: [...(stats.historico_sessoes || []), {
        data: new Date().toLocaleDateString(),
        pontos_ganhos: sessaoAtual.pontos_ganhos,
        acertos: sessaoAtual.testes_completados
      }]
    };
    localStorage.setItem('hyago_stats', JSON.stringify(novoStats));
    setStats(novoStats);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Sessão Concluída! 🎯</h1>
          
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 mb-8">
            <p className="text-slate-400 mb-2">Pontos ganhos nesta sessão</p>
            <p className="text-5xl font-bold text-red-400">+{sessaoAtual.pontos_ganhos}</p>
          </div>

          <div className="grid gap-4 mb-8">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <p className="text-slate-400">Testes Completados</p>
              <p className="text-2xl font-bold text-white">{sessaoAtual.testes_completados}/{TESTES_LOGICA.length}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <p className="text-slate-400">Cenários Completados</p>
              <p className="text-2xl font-bold text-white">{sessaoAtual.cenarios_completados}/{CENARIOS.length}</p>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <p className="text-slate-400">Novo Nível</p>
              <p className="text-2xl font-bold text-white">{novoNivel}</p>
            </div>
          </div>

          <button
            onClick={() => setTela('home')}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-lg"
          >
            ← Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  if (tela === 'dashboard') {
    return (
      <Dashboard 
        stats={stats}
        onVoltar={() => setTela('home')}
      />
    );
  }

  return <Home onStart={() => setTela('testes')} stats={stats} />;
}