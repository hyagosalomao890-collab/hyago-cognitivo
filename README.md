# 🚀 HYAGO COGNITIVO - Sistema de Treinamento Cognitivo

## O que é?

Um sistema inteligente de treinamento cognitivo que:
- ✅ 15 testes de lógica (progressivos)
- ✅ 5 cenários complexos com análise socrática
- ✅ Integração com IA Groq (análise profunda)
- ✅ Identifica seus vieses cognitivos
- ✅ Dashboard com histórico e evolução
- ✅ Sistema de pontuação inteligente

## 🎯 Antes de Começar

### Você precisa de:
1. **Chave Groq (GRATUITA)**: https://console.groq.com
   - Faça signup (Google/GitHub)
   - Vá em "API Keys"
   - Crie uma nova chave
   - Copie (você vai usar dentro do app)

## 📦 Instalação Local (Desenvolvimento)

### Opção 1: Replit (Mais Fácil - 2 min)

1. Abra: https://replit.com
2. Crie novo projeto Node.js
3. Copie os arquivos deste projeto para lá
4. Execute `npm install && npm run dev`
5. Abra a URL fornecida

### Opção 2: Seu Computador

```bash
# Clone ou baixe este projeto
cd hyago-cognitivo

# Instale dependências
npm install

# Rode em desenvolvimento
npm run dev

# Acesse em http://localhost:5173
```

## 🌐 Deploy em Vercel (Recomendado)

### Passo 1: Prepare o GitHub
```bash
# Initialize git (se não tiver)
git init

# Adicione os arquivos
git add .

# Commit
git commit -m "Initial commit - HYAGO COGNITIVO"

# Push para um repositório GitHub
# (Você precisa criar um novo repo em github.com antes)
git push origin main
```

### Passo 2: Deploy no Vercel
1. Abra https://vercel.com
2. Clique "New Project"
3. Selecione seu repositório GitHub
4. Clique "Deploy"
5. Pronto! Sua URL estará pronta

### Passo 3: Use o App
1. Abra sua URL do Vercel
2. Cole sua chave Groq
3. Comece a treinar!

## 🎮 Como Usar

### Primeira Sessão
1. **Setup**: Cole sua chave Groq (obtida em groq.com)
2. **Home**: Veja seus stats e inicie uma sessão
3. **Testes de Lógica**: Responda 15 perguntas progressivas
4. **Cenários**: Análise socrática com 5 dilemas complexos
5. **Resultados**: Veja seus pontos e padrões identificados

### Cada Teste
- Responda a pergunta
- Receba feedback analítico (não apenas certo/errado)
- Sistema identifica seus vieses
- Acumule pontos

### Cada Cenário
- Leia a situação complexa
- Responda a 3 perguntas socráticas
- Análise profunda via IA
- Identifica modelos mentais que você usou

### Dashboard
- Veja histórico de sessões
- Padrões cognitivos identificados
- Evolução ao longo do tempo
- Modelos mentais a treinar

## 🔑 Groq API Key

A chave Groq é **GRATUITA E ILIMITADA**:

1. Acesse https://console.groq.com
2. Faça login/signup
3. Vá em "API Keys"
4. Crie uma nova chave
5. Copie (não compartilhe!)
6. Cole no app quando pedir

## 🏗️ Estrutura do Projeto

```
hyago-cognitivo/
├── HyagoCognitivo.jsx    # Componente principal
├── main.jsx              # Ponto de entrada
├── index.html            # HTML
├── package.json          # Dependências
├── vite.config.js        # Configuração Vite
└── .gitignore            # Git ignore
```

## 💾 Dados Salvos

Tudo é salvo no **localStorage** do seu navegador:
- Sua chave Groq
- Histórico de sessões
- Pontos e níveis
- Padrões identificados

Nada vai para servidor externo (privado!).

## 🚨 Troubleshooting

### Erro: "Chave Groq inválida"
- Verify que copiou a chave corretamente
- Vá em https://console.groq.com e gere uma nova

### Erro: "Groq API error"
- Seu crédito Groq pode estar esgotado (improvável, é ilimitado)
- Tente atualizar a página

### App não carrega
- Verifique sua conexão
- Tente incógnito (localStorage)
- Limpe cache do navegador

## 📊 Que tal começar?

### Vercel (Mais Rápido):
1. Cria uma conta GitHub
2. Faz push desse código lá
3. Conecta no Vercel
4. Deploy automático

### Replit (Mais Fácil):
1. Vai em replit.com
2. Novo projeto
3. Cola os arquivos
4. `npm install && npm run dev`
5. Pronto!

## 🎯 Próximos Passos Após Deploy

1. **Obter Chave Groq**: https://console.groq.com
2. **Usar o App**: Cole a chave na tela inicial
3. **Fazer Primeira Sessão**: Complete todos os testes
4. **Ver Dashboard**: Analise seus padrões
5. **Retornar**: Novas sessões para melhorar

## 📝 Licença

Livre para usar, modificar e compartilhar.

---

**Qualquer dúvida?** Rode no seu máquina e explore!
