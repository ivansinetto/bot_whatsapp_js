const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

// Lista de saudações possíveis
const saudacoes = [
    'oi',
    'oi!',
    'olá',
    'olá!',
    'ola',
    'ola!',
    'bom dia',
    'bom dia!',
];

// Lista de opções possíveis
const opcoes = [
    '1',
    '2',
]

// Função para criar e iniciar a sessão do cliente
wppconnect
  .create({
    session: 'sessionName',
    catchQR: (base64Qr, asciiQR) => {
      console.log(asciiQR); // Log do QR no terminal (opcional)

      // Decodifica o QR
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    logQR: false,
  })
  .then((client) => start(client)) // Inicia o cliente quando a sessão é criada
  .catch((error) => console.log(error));

// Função para iniciar o atendimento
function start(client) {
    client.onMessage((message) => {
        // Verifica se a mensagem do cliente é uma saudação
        if (saudacoes.includes(message.body.toLowerCase())) {
            // Envia uma mensagem de boas-vindas com as opções
            client
                .sendText(message.from, 'Olá, seja bem vindo(a)! 😊\n \nDigite uma das opções abaixo para começar ⬇️\n1) LaGráfica\n2) Touca de Cetim')
                .then((result) => {
                    console.log('Result: ', result); // Log do sucesso do envio
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); // Log do erro no envio
                });
        } else if (opcoes.includes(message.body.toLowerCase())) {
            // Se a mensagem for uma opção válida, confirma o início do atendimento
            client
                .sendText(message.from, 'Só um momento que o atendimento já vai começar!')
                .then((result) => {
                    console.log('Result: ', result); // Log do sucesso do envio
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); // Log do erro no envio
                });
        } else {
            // Se a mensagem não for uma saudação nem uma opção válida, envia uma mensagem de erro
            client
                .sendText(message.from, 'Digite uma opção válida.')
                .then((result) => {
                    console.log('Result: ', result); // Log do sucesso do envio
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); // Log do erro no envio
                });
        }
    });
}
