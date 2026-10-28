# Controle de Relatórios

Ferramenta auxiliar de controle das análises de relatórios de diárias e auxílio-representação do Escritório de Diárias, Passagens e Atividades Externas (Gabinete da Presidência, Coren-PE). O SCDP continua sendo o sistema oficial; todas as consultas ao SCDP são registradas manualmente.

- **Site:** arquivos estáticos (`index.html` + `config.js`), publicados no GitHub Pages.
- **Banco de dados:** Cloud Firestore (Firebase).
- **Login:** Firebase Authentication, com e-mail e senha e confirmação do e-mail.
- **Equipe:** até 5 pessoas (ou mais), com um administrador que inclui, desativa e exclui perfis pelo próprio sistema e pode passar a administração para outra pessoa.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `index.html` | O sistema inteiro: telas, regras e lógica. |
| `config.js` | Dados do seu projeto Firebase e regras da sessão. **É o único arquivo do site que você edita.** |
| `firestore.rules` | Regras de segurança do banco: quem pode ler e gravar. Cole no Console do Firebase. |
| `firebase.json` | Usado só se um dia você publicar pelo Firebase Hosting em vez do GitHub. |

---

## Parte 1 — Configurar o Firebase (uma vez só, cerca de 15 minutos)

### 1. Criar o projeto
1. Acesse <https://console.firebase.google.com> com uma conta Google.
2. Clique em **Criar um projeto** (ou **Adicionar projeto**), dê um nome (ex.: `controle-relatorios-corenpe`) e conclua. O Google Analytics pode ficar desativado.
3. O plano gratuito (**Spark**) é suficiente.

### 2. Criar o banco de dados
1. No menu à esquerda: **Bancos de dados e armazenamento > Firestore > Criar banco de dados**. Atalho: digite `Firestore` em **Pesquise produtos**.
2. Local: **`southamerica-east1 (São Paulo)`**. Não dá para mudar depois.
3. Escolha **Iniciar no modo de produção**.

### 3. Aplicar as regras de segurança
1. Ainda no Firestore, abra a aba **Regras**.
2. Apague o conteúdo e cole todo o conteúdo do arquivo `firestore.rules`.
3. Na linha `function adminInicial() { return '...'; }`, confira se está o e-mail de quem será o **primeiro administrador**, em letras minúsculas. Este pacote já vem com `joao.coren.melo@gmail.com`.
4. Clique em **Publicar**.

### 4. Ativar o login e criar seu usuário
1. Menu: **Segurança > Authentication > Vamos começar**. Atalho: digite `Authentication` em **Pesquise produtos**.
2. Aba **Método de login**: ative **E-mail/senha** (só a primeira opção) e salve.
3. Aba **Usuários > Adicionar usuário**: informe o e-mail do primeiro administrador e uma senha forte. (Ele também pode, em vez disso, usar o "Primeiro acesso" do site.)
4. Aba **Configurações > Ações do usuário**: deixe **marcado "Ativar criação (inscrição)"**, **desmarcado "Ativar exclusão"** e **marcada a "Proteção contra enumeração de e-mails"**. Salve.
   - A inscrição precisa ficar ligada para que cada pessoa da equipe crie a própria senha no "Primeiro acesso". Isso **não** abre o sistema para estranhos: quem cria uma conta mas não foi incluído pelo administrador na tela Equipe não vê nenhum registro. O Firestore recusa o acesso.
5. Opcional, recomendado: em **Configurações > Política de senha**, exija no mínimo 12 caracteres, com maiúscula, minúscula, número e símbolo.

### 5. Registrar o site e copiar a configuração
1. No menu à esquerda, clique em **Configurações > Configurações do projeto**.
2. Em **Seus apps**, clique no ícone **`</>`** (Web), dê um apelido (ex.: `site`) e clique em **Registrar app**. **Não** marque Firebase Hosting.
3. Aparecerá um bloco `const firebaseConfig = { apiKey: ..., authDomain: ..., ... }`.
4. Abra o arquivo `config.js` e substitua os valores de `window.CR_FIREBASE_CONFIG` pelos que apareceram.
5. No mesmo arquivo, `window.CR_USUARIOS` só sugere o nome do administrador na configuração inicial. Os nomes da equipe são cadastrados depois, na tela **Equipe**.

> Os dados do `config.js` identificam o projeto e **não são senhas**. Eles podem ficar públicos no GitHub. Quem protege os registros é o login somado às regras do passo 3.

---

## Parte 2 — Publicar no GitHub Pages

### 1. Criar o repositório
1. Acesse <https://github.com> e entre (ou crie uma conta gratuita).
2. Clique em **+ > New repository**.
3. Nome: `controle-relatorios`. Visibilidade: **Public** (veja a nota sobre privacidade abaixo).
4. Clique em **Create repository**.

### 2. Enviar os arquivos (sem instalar nada)
1. Na página do repositório, clique em **uploading an existing file** (ou **Add file > Upload files**).
2. Arraste os arquivos `index.html`, `config.js` (já preenchido), `firestore.rules`, `firebase.json` e `README.md`.
3. Clique em **Commit changes**.

### 3. Ativar o GitHub Pages
1. No repositório: **Settings > Pages**.
2. Em **Build and deployment > Source**, escolha **Deploy from a branch**.
3. Branch: **main**, pasta **/ (root)**. Clique em **Save**.
4. Em 1 a 2 minutos o endereço aparece no topo da página, no formato `https://SEU-USUARIO.github.io/controle-relatorios/`.

### 4. Autorizar o endereço no Firebase (obrigatório)
1. Firebase: **Authentication > Configurações > Domínios autorizados > Adicionar domínio**.
2. Informe **`SEU-USUARIO.github.io`**, sem `https://` e sem o nome do repositório.

### 5. Primeiro uso (administrador)
1. Abra o endereço do site e entre com o e-mail e a senha do administrador inicial.
2. O sistema pede para **confirmar o e-mail**: clique em **Enviar o link novamente**, abra o e-mail (veja também o spam), clique no link e volte ao sistema em **Já confirmei, entrar**.
3. Na **Configuração inicial**, confira o seu nome e clique em **Concluir e entrar**. Pronto, você é o administrador.
4. Vá em **Equipe > + Incluir perfil** para cadastrar as demais pessoas.

---

## Uso no dia a dia

- **Atualizar o sistema:** no GitHub, abra o arquivo, clique no lápis (Edit), cole a nova versão e faça **Commit changes**. O site se atualiza em cerca de 1 minuto. Os registros não são afetados, porque ficam no Firestore.
- **Esqueci a senha:** na tela de login, digite o e-mail e clique em **Esqueci minha senha**.
- **Incluir uma pessoa (administrador):** **Equipe > + Incluir perfil**, com nome e e-mail. O sistema gera a mensagem com as instruções; copie e envie por e-mail ou WhatsApp. A pessoa abre o site, clica em **Primeiro acesso**, cria a própria senha e confirma o e-mail. O administrador nunca conhece a senha de ninguém.
- **Férias ou licença de um membro:** **Desativar**. Na volta, **Reativar**.
- **Alguém saiu da equipe:** **Excluir**. O acesso termina na hora, mesmo com o sistema aberto. Os registros feitos pela pessoa continuam no histórico com o nome dela.
- **Passar a administração** (férias do administrador ou saída da equipe): **Equipe > Tornar administrador**, na linha da pessoa, e confirme. Quem passou continua na equipe como membro. Na volta, o novo administrador pode devolver da mesma forma. Faça isso **antes** de sair: o sistema não deixa o administrador desativar nem excluir o próprio perfil.
- **Se o administrador ficar sem acesso de repente** (sem ter passado a administração): o dono do projeto no Firebase entra em **Firestore > Dados > sistema > config**, edita o campo `admin` e coloca o e-mail de um membro ativo, em minúsculas.
- **Continuidade do projeto:** o projeto Firebase pertence a uma conta Google. Para que a equipe não dependa de uma só pessoa, adicione um segundo responsável (por exemplo, a chefia) em **Configurações > Configurações do projeto > Usuários e permissões > Adicionar membro**, com o papel **Proprietário**.
- **Editar dados cadastrais e excluir relatórios:** só o administrador. Na ficha do relatório, ele vê **Editar dados** e **Excluir relatório**; a exclusão pede confirmação ("Deseja realmente excluir este relatório?"). Os membros cadastram relatórios e registram consultas, devoluções, aprovações e cancelamentos.
- **Auditoria** (menu visível só para o administrador): mostra quem cadastrou, movimentou, editou e excluiu cada relatório, e quem incluiu, desativou, excluiu perfis ou passou a administração, com data e hora. Dá para filtrar por período, ação e pessoa e exportar em Excel ou CSV. Os registros da auditoria não podem ser alterados nem apagados por ninguém, nem pelo administrador, e continuam lá mesmo depois que o relatório é excluído.
- **Ocultar o menu lateral:** clique na setinha **‹** no canto superior do menu. Para mostrar de novo, clique no botão **☰** que fica no canto superior esquerdo. O sistema lembra a escolha naquele computador.
- **Cópia de segurança:** use **Relatórios > Exportar Excel** e **Histórico de movimentações > Exportar Excel** periodicamente e guarde os arquivos na rede do Coren-PE.

## Testar no computador antes de publicar (opcional)

O login do Firebase não funciona abrindo o arquivo com duplo clique (`file://`). Para testar localmente, abra um terminal na pasta dos arquivos e rode:

```
python -m http.server 8000
```

Depois acesse <http://localhost:8000>. O endereço `localhost` já vem autorizado no Firebase.

## Segurança — configurações obrigatórias (fazer uma vez)

O sistema já vem com estas proteções:
- **Login obrigatório com e-mail confirmado**, e só o administrador e os perfis **ativos** da tela Equipe leem ou gravam registros. Isso vale mesmo para quem tenha o código e o endereço do site, ou crie uma conta por conta própria.
- **Só o administrador** inclui, desativa ou exclui perfis e passa a administração, e só para um perfil ativo. Essa regra é aplicada pelo próprio Firebase, não apenas pela tela.
- **A sessão termina ao fechar o navegador** e **depois de 30 minutos sem uso**. As duas regras podem ser ajustadas em `config.js > CR_SEGURANCA`.
- **Bloqueio de códigos externos** (Content-Security-Policy): o site só executa o próprio código e as bibliotecas do Firebase e da exportação para Excel.
- **O site não abre dentro de outra página**, o que evita a criação de páginas falsas por cima dele, e não aparece em buscadores.
- **Regras do banco**: só aceitam os três status, e nenhuma alteração apaga movimentações do histórico.
- **Proteção do Google**: os dados trafegam sempre criptografados (HTTPS) e ficam criptografados nos servidores do Google.

Faça também estes passos no console:

### 1. Proteger a conta Google dona do projeto (o mais importante)
Quem entra nessa conta Google tem acesso total ao Firebase e aos dados.
1. Acesse <https://myaccount.google.com/security>.
2. Ative a **Verificação em duas etapas**, de preferência com o app no celular ou com chave de acesso (*passkey*).
3. Não compartilhe essa conta com ninguém.

### 2. Usar uma senha forte no sistema
- Use pelo menos 12 caracteres, diferente da senha do Gmail e de qualquer outra.
- Para trocar: **Authentication > Usuários > ⋮ (três pontos) ao lado do usuário > Redefinir senha**, ou **Esqueci minha senha** na tela de login.

### 3. Conferir as opções do Authentication
Em **Segurança > Authentication > Configurações**:
1. **Ações do usuário**: "Ativar criação (inscrição)" **marcado**, necessário para o "Primeiro acesso"; "Ativar exclusão" **desmarcado**.
2. **Proteção contra enumeração de e-mails**: **ativada**, para não revelar quais e-mails existem.
3. **Política de senha**: exigir 12 caracteres ou mais, com maiúscula, minúscula, número e símbolo.
4. **Domínios autorizados**: deixe só `SEU-USUARIO.github.io` e o `...firebaseapp.com`. Remova `localhost` se não for testar no computador.

### 4. Restringir a chave de API ao endereço do site
Isso impede que outros sites usem a configuração do seu projeto.
1. Acesse <https://console.cloud.google.com/apis/credentials> e escolha o projeto `controle-de-relatorios---scpd` no seletor do topo.
2. Em **Chaves de API**, clique na chave chamada **Browser key (auto created by Firebase)**.
3. Em **Restrições de aplicativos**, escolha **Sites**. Em **Adicionar**, inclua os dois endereços abaixo, um de cada vez:
   - `https://SEU-USUARIO.github.io/*`
   - `https://controle-de-relatorios---scpd.firebaseapp.com/*`
4. Clique em **Salvar**. A mudança pode levar até 5 minutos para valer.

### 5. Acompanhar os acessos
- No sistema, **Equipe > Último acesso** mostra quando cada pessoa entrou pela última vez.
- Em **Authentication > Usuários** aparecem todas as contas criadas. Uma conta que não está na tela Equipe não tem acesso a nada; se quiser, exclua-a ali pelos três pontinhos ⋮.
- Em computadores compartilhados, clique sempre em **Sair do sistema** ao terminar.

### 6. Cópias de segurança
O plano gratuito do Firebase não faz backup automático. Toda semana, exporte em Excel em **Relatórios** e em **Histórico de movimentações**. Guarde os arquivos na rede do Coren-PE, **nunca no GitHub**.

## Privacidade, LGPD e limites

- **Repositório público:** qualquer pessoa vê o código e a configuração, mas **não vê os registros**. Sem login autorizado, o Firestore recusa a leitura. O site tem a marcação `noindex` para não aparecer no Google. Um repositório privado com GitHub Pages exige plano pago do GitHub; outra opção é publicar pelo **Firebase Hosting** (gratuito), usando o `firebase.json`.
- **Nunca** coloque dados reais, planilhas ou documentos no repositório do GitHub. Os dados ficam só no Firestore.
- Os dados ficam hospedados no Google Cloud (região São Paulo). Antes do uso com dados reais, recomenda-se obter a ciência ou autorização da área de TI e do encarregado de dados (DPO) do Coren-PE.
- O plano gratuito permite cerca de 50 mil leituras e 20 mil gravações por dia e 1 GB de armazenamento, muito acima do uso esperado.
- As regras do banco garantem que só existam os status *Pendente de alteração*, *Aprovado* e *Cancelado*, e que uma alteração nunca reduza o histórico de um relatório.
