# Gerenciador de Backups - MySQL (Node.js)

Este é um script Node.js para agendar e automatizar backups de bancos de dados MySQL. Ele utiliza o `node-cron` para executar a rotina de backup de forma diária, salvando os arquivos `.sql` em um diretório local. As credenciais e configurações são gerenciadas por variáveis de ambiente (`.env`) e um arquivo de configuração (`config.json`) para garantir segurança e flexibilidade.

## Requisitos

* Node.js (v14+ recomendado)
* npm
* mysqldump disponível no sistema (instalado com MySQL/MariaDB)

## Como Configurar

### 1. Clonar o Repositório

<pre class="overflow-visible!" data-start="778" data-end="869"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/usuario/nodejs-backup.git
</span><span>cd</span><span> nodejs-backup
</span></span></code></div></div></pre>

### 2. Instalar as Dependências

<pre class="overflow-visible!" data-start="904" data-end="927"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install
</span></span></code></div></div></pre>

### 3. Configurar as Variáveis de Ambiente

Renomeie o arquivo  `env` para `.env` na raiz do projeto e adicione suas credenciais do banco de dados.

### 4. Configurar o Projeto

A lista de bancos de dados e a forma de execução (agendada ou imediata) são controladas pelo arquivo `config.json`.

`config.json`:

<pre class="overflow-visible!" data-start="1444" data-end="1634"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"databases"</span><span>:</span><span> </span><span>[</span><span>
    </span><span>"nome_do_seu_banco1"</span><span>,</span><span>
    </span><span>"nome_do_seu_banco2"</span><span>
  </span><span>]</span><span>,</span><span>
  </span><span>"schedule"</span><span>:</span><span> </span><span>{</span><span>
    </span><span>"enabled"</span><span>:</span><span> </span><span>true</span><span></span><span>,</span><span>
    </span><span>"cronExpression"</span><span>:</span><span> </span><span>"0 0 * * *"</span><span>
  </span><span>}</span><span>,</span><span>
  </span><span>"runImmediately"</span><span>:</span><span> </span><span>false</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

* `databases`: Adicione os nomes dos bancos de dados que você deseja fazer backup.
* `schedule.enabled`: `true` para agendar o backup, `false` para desativar.
* `schedule.cronExpression`: A expressão cron para o agendamento (ex: `"0 0 * * *"` para rodar à meia-noite).
* `runImmediately`: Se `true`, o script fará o backup imediatamente ao ser iniciado. Se `false`, ele respeitará o agendamento.

---

## Como Usar

### Agendar Backups (Recomendado)

Certifique-se de que `schedule.enabled` está como `true` e `runImmediately` como `false` em `config.json`.

<pre class="overflow-visible!" data-start="2232" data-end="2256"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node cron.js
</span></span></code></div></div></pre>

O script ficará ativo e executará os backups automaticamente no horário agendado.

### Executar Backup Manualmente (Uso Único)

Se você precisa rodar um backup imediatamente, defina `runImmediately` como `true` em `config.json` e `schedule.enabled` como `false`.

<pre class="overflow-visible!" data-start="2522" data-end="2546"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>node cron.js
</span></span></code></div></div></pre>

O script fará o backup e será encerrado logo em seguida.

---

## Estrutura de Diretórios (sugerida)

<pre class="overflow-visible!" data-start="2653" data-end="2979"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>
├─ backups/           # arquivos .sql gerados
├─ logs/              # logs de execução por </span><span>data</span><span>/hora
├─ cron.js         # script principal que registra o cron e executa backups
├─ config.json
├─ .env
├─ </span><span>package</span><span>.json
└─ README.md
</span></span></code></div></div></pre>

---

## Logs de Execução

Todos os logs de execução são salvos em um diretório `logs/`. Para cada execução, é criada uma pasta com **data e hora**, contendo um arquivo `backup-log.txt` com todos os detalhes do processo (bancos processados, status, erros, paths dos arquivos .sql).

---

## Boas práticas e recomendações

* Nunca comite o arquivo `.env`.
* Valide permissões no diretório de backups para garantir que o processo Node.js consiga escrever os arquivos.
* Faça rotação/limpeza de backups antigos;
* Considere compactar os `.sql` (gzip) para economizar espaço em disco.
* Em ambientes de produção, considere enviar backups para um storage remoto.

---

## Nota

Contribuições são bem-vindas!
Se você encontrar um bug ou tiver uma sugestão de melhoria, abra uma issue ou envie um pull request.
