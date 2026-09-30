# Chat de contatos: Groq e primeiros testes

A SPA continua em HTML/CSS/JS no index.html. Não foram alterados login, dependências, configuração do Vite, rotas da SPA ou configuração da Vercel.

## O que está implementado

- API Node.js em api/leads/contacts/chat.js, compatível com Vercel Functions.
- Integração real com o endpoint de chat da Groq, modelo openai/gpt-oss-20b e saída JSON com schema estrito.
- POST check_connection verifica a credencial e a disponibilidade do modelo usando a lista de modelos, sem geração de texto.
- POST lookup_lead_contacts seleciona somente IDs de leads enviados; os contatos continuam vindo do estado da conta.
- Nomes, segmento, cidade e canais disponíveis são enviados à Groq. Identificadores temporários evitam enviar telefone/e-mail embutidos em chaves locais.
- Sem enriquecimento na internet, contatos inventados, escrita no saldo ou envio automático de mensagens.
- Código privado de testes obrigatório. O login atual é demonstrativo e não autentica a API.

## Configurar os segredos

A chave compartilhada em conversa não foi gravada no projeto. Revogue-a no painel Groq e gere uma nova.

Cadastre SOMENTE no ambiente do backend:

| Variável | Valor |
| --- | --- |
| GROQ_API_KEY | Nova chave da conta Groq |
| CONTACT_AI_TEST_TOKEN | Código aleatório de 32 a 256 caracteres, diferente da chave Groq |

Gere o código de teste localmente com:
~~~sh
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
~~~

Não use prefixos VITE_ ou NEXT_PUBLIC_. Não insira a chave Groq no campo de código do chat. O campo do chat recebe apenas CONTACT_AI_TEST_TOKEN, mantido em memória nesta aba.

## Rodar localmente sem novas dependências

Requer Node.js 22 ou superior e as dependências já existentes do projeto.

1. Copie .env.example para .env.local e preencha as duas variáveis apenas na sua máquina. Esse arquivo está ignorado pelo Git.
2. Rode:
~~~sh
npm run build
node --env-file=.env.local scripts/serve-contact-ai.mjs
~~~
3. Abra http://127.0.0.1:5174 e navegue pelo login até Workspace → Chat de contatos.
4. Informe o código privado e clique em **Testar conexão**.
5. Após sucesso, o modo **Groq · conexão verificada** é ativado.
6. Use um lead real da sua base para a primeira consulta.

O comando npm run dev/Vite sozinho não executa o backend. O servidor de testes serve apenas dist/, nunca a pasta do projeto ou os arquivos de segredos.

## Hospedagem

Na Vercel, o arquivo dentro de api/ é uma função Node.js; configure as duas variáveis no ambiente do projeto e faça um novo deploy. As regras existentes de SPA foram mantidas; a Vercel dá precedência aos arquivos/funções antes dos rewrites.

O push para main sincroniza o código com o Lovable. Isso não garante que o preview estático do Lovable execute funções Node.js nem cadastra os segredos automaticamente. Se a hospedagem atual servir apenas arquivos estáticos, será necessário hospedar o backend compatível e expor /api/leads/contacts/chat na mesma origem. O chat detecta HTML/404 e informa que o backend está indisponível, sem simular sucesso.

Não foi realizado deploy de backend nem configuração de segredos remotos por esta alteração.

## Contrato

GET /api/leads/contacts/chat retorna o identificador do serviço e configured, sem mostrar credenciais.

POST requer:
- Content-Type: application/json
- Authorization: Bearer <CONTACT_AI_TEST_TOKEN>
- Origem do próprio site; não há CORS aberto.

Teste:
~~~json
{"task":"check_connection"}
~~~

Consulta:
~~~text
{
  task: "lookup_lead_contacts",
  prompt: pedido de até 1.200 caracteres,
  channels: lista de whatsapp / instagram / email / phone,
  candidates: até 200 registros com key "lead-0", name, segment, location e availableChannels
}
~~~

Sucesso: { leadKeys: string[], outOfScope: boolean }.
Falha: { code, message }, sem corpo de erro da Groq ou segredos.
A chave de cada candidato precisa seguir lead-N e ser única.

## Limites e verificações

- 96 KiB por pedido; máximo de 200 leads.
- Tempo máximo de 15 segundos no provedor; cliente permite cancelamento.
- 6 chamadas/minuto e 60/hora por instância, incluindo testes de conexão; máximo de 2 simultâneas.
- Sem retries automáticos para evitar chamadas duplicadas.
- Validação dos IDs retornados, recusa de IDs novos e tratamento de resposta truncada.
- Tratamento de 401/403 da Groq, 429 com Retry-After, falhas de rede e indisponibilidade.
- Nenhum log de prompts, códigos de teste ou chaves.

Execute os testes sem usar a API paga:
~~~sh
node --test tests/contact-ai.test.mjs
~~~

Os testes usam respostas simuladas da Groq. Um teste real depende dos segredos e do backend publicados; não foi comprovado por testes simulados.

Os limites em memória reiniciam com a instância e não são globais entre funções. Para uso público/multiusuário, substitua o código compartilhado por autenticação real, resolva os leads no servidor com autorização por conta e use um limitador distribuído. Esta implementação destina-se aos primeiros testes privados, não a uma liberação pública irrestrita.

## Referências

- https://console.groq.com/docs/structured-outputs
- https://console.groq.com/docs/models
- https://vercel.com/docs/functions/runtimes/node-js
- https://vercel.com/docs/project-configuration/vercel-json
