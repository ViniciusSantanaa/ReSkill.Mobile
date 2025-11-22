ReSkill Mobile - Global Solution

## 👨‍💻 Integrantes do Grupo
- Vinícius De Souza - 556841
- Felipe Rosa - 557636
- Pedro Henrique De Souza - 555533

## 📺 Vídeo de Demonstração
Link do YouTube:

## 📱 Sobre o Projeto (Global Solution)
O ReSkill Mobile é a interface mobile da plataforma de requalificação profissional ReSkill+. Desenvolvido em React Native (Expo), o aplicativo permite que estudantes e profissionais em transição de carreira monitorem suas sessões de estudo de forma prática.

O aplicativo se conecta a uma API RESTful (.NET) para garantir a persistência e integridade dos dados.

## 🛠️ Funcionalidades
- Autenticação: Cadastro e Login integrados ao Banco de Dados SQL Server.
- CRUD de Sessões:
  - Visualizar histórico de estudos.
  - Adicionar novas sessões.
  - Editar detalhes da sessão.
  - Excluir sessões (com confirmação de segurança).
- Integração: Consumo de API via Axios.
- Deploy: Publicado via Firebase App Distribution.

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js e NPM instalados.
- Aplicativo Expo Go no celular ou Emulador Android/iOS.
- API .NET rodando localmente (configurada na porta 5156).

### Passo a passo
1. Clone o repositório.
2. Instale as dependências:
   npm install
3. Configure o IP da API:
   Abra o arquivo src/services/api.ts e substitua o IP na baseURL pelo endereço IPv4 da sua máquina local (onde a API está rodando).
4. Execute o projeto:
   npx expo start

## Link do repositório .Net caso necessário
https://github.com/ViniciusSantanaa/ReSkill-API.git

## Link vídeo do Youtube 
--Sem link ainda 
