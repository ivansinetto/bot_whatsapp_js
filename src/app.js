const fs = require('fs');
const wppconnect = require('@wppconnect-team/wppconnect');

// Lista de opções possíveis
const opcoes = [
    '1',
    '2',
];

// Objeto para armazenar os estados de cada cliente
const estadosClientes = {};
const ETAPA_1 = 'etapa1';
const ETAPA_2 = 'etapa2';
const ETAPA_3 = 'etapa3';
const ETAPA_4 = 'etapa4';
const TEMPO_ESPERA_ETAPA_3 = 30 * 60 * 1000; // 30 minutos em milissegundos
const TEMPO_INICIO = 2 * 60 * 1000; // 2 minutos em milissegundos

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

  // Inicia o cliente após 2 minutos
  .then((client) => {
    setTimeout(() => {
      start(client);
    }, TEMPO_INICIO);
  })
  .catch((error) => console.log(error));

// Função para iniciar o atendimento
function start(client) {
  client.onMessage((message) => {
      const senderId = message.from; // Obtém o número do remetente
      
      // Verifica se o remetente já tem um estado associado
      const estadoCliente = estadosClientes[senderId] ? estadosClientes[senderId].estado : ETAPA_1;
      
      switch (estadoCliente) {
          case ETAPA_1:
              // Envia uma mensagem de boas-vindas solicitando o nome
              client
                  .sendText(message.from, `Olá ${message.sender.pushname}, seja bem vinda(o)! 🥰\n\nPor favor, escolha uma das opções abaixo: ⬇️\n\n*[ 1 ]* - La-Gráfica\n*[ 2 ]* - Touca de Cetim`)
                  .then((result) => {
                      console.log('Result: ', result); // Log do sucesso do envio
                      estadosClientes[senderId] = {
                        estado: ETAPA_2, // Atualiza o estado do cliente para a Etapa 2
                        temporizador: null 
                      }; 
                  })
                  .catch((erro) => {
                      console.error('Error when sending: ', erro); // Log do erro no envio
                  });
              break;

          case ETAPA_2:
              // Verifica se o cliente forneceu uma escolha válida
              const escolhaCliente = message.body.trim();
              if (escolhaCliente === '1' || escolhaCliente === '2') {
                  // Mensagem de confirmação da escolha
                  let resposta = '';
                  if (escolhaCliente === '1') {
                      resposta = `Certo ${message.sender.pushname}, só um momento que um atendente já vai falar com você! 😉\n\nEnquanto espera, dê uma olhada na nossa página do instagram: https://www.instagram.com/lagrafica__`;
                  } else if (escolhaCliente === '2') {
                      resposta = `Certo ${message.sender.pushname}, só um momento que um atendente já vai falar com você! 😉\n\nEnquanto espera, dê uma olhada na nossa página do instagram: https://www.instagram.com/toucade_cetim`;
                  }
                  client
                      .sendText(message.from, resposta)
                      .then((result) => {
                          console.log('Result: ', result); // Log do sucesso do envio
                          estadosClientes[senderId] = {
                              estado: ETAPA_3, // Atualiza o estado do cliente para a Etapa 3
                              temporizador: null
                          }; 
                      })
                      .catch((erro) => {
                          console.error('Error when sending: ', erro); // Log do erro no envio
                      });
              } else {
                  // Se a escolha não for válida, solicita que o cliente escolha novamente
                  client
                      .sendText(message.from, 'Por favor, selecione uma opção válida.\n\nExemplo: *1* ou *2*')
                      .then((result) => {
                          console.log('Result: ', result); // Log do sucesso do envio
                      })
                      .catch((erro) => {
                          console.error('Error when sending: ', erro); // Log do erro no envio
                      });
              }
              break;

            case ETAPA_3:
                // A etapa 3 não envia mensagens ao cliente, apenas aguarda o término do temporizador
                // Caso seja necessário a etapa 3 para fazer algo, crie a etapa 4 como um termino de atendimento do bot
                break;
        }
    });
}
