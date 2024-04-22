# WhatsApp Connect - Sistema de Atendimento Automatizado

Este é um sistema de atendimento automatizado via WhatsApp, desenvolvido usando a biblioteca `@wppconnect-team/wppconnect.` O sistema permite que os clientes interajam com opções predefinidas e recebam respostas adequadas de acordo com suas escolhas.

## Instalação

Para começar, siga estas etapas:

**1. Clone este repositório em sua máquina local:**
`git clone https://github.com/ivansinetto/bot_whatsapp_js.git`

**2. Instale as dependências necessárias usando o npm:**
`npm install`

## Iniciando sessão

- Inicie o sistema: `node .\src\app.js`

- Um QRcode irá aparecer no terminal e na pasta de arquivos, você tem 1 minuto para ler o QRcode com o WhatsApp.

- Se não conseguir conectar o WhatsApp em 1 minuto, um novo QRcode irá ser gerado, se mesmo assim não conseguir conectar, exclua a pasta **Tokens** que é gerada após iniciar a aplicação e reinicie o código.

## Opções Disponíveis

Atualmente, o sistema oferece as seguintes opções:

1. La-Gráfica
2. Touca de Cetim

## Contribuição

- Contribuições são bem-vindas! Se você encontrar um bug ou desejar adicionar um novo recurso, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Observações

- O código é de fácil leitura e está bem documentado, facilitando a edição conforme seu uso.

- Recomendo verificar a documentação oficial da biblioteca para melhor compreensão do código e a adição de funcionalidades. 
Link: https://wppconnect.io/pt-BR/ 

## Notas de Lançamento

- **Versão Beta/Alpha 0.1.0**:
  - Implementação inicial do sistema de atendimento automatizado.
  - Capacidade de receber mensagens dos clientes e responder com opções predefinidas.

## Autor

[Ivan Neto ](https://github.com/ivansinetto) - Desenvolvedor

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).