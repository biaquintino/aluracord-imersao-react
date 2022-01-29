import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from "next/router";
//import { ButtonSendSticker } from "../src/components/ButtonSendSticker";
//import { createClient } from '@supabase/supabase-js';

//para ter acesso ao supabase
//const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwODE4NCwiZXhwIjoxOTU4ODg0MTg0fQ.jI2kZFcGXBK0Sjr3xZBC-B1xEvmLXbujnAvdY9pZBV0'
//const SUPABASE_URL = 'https://elzvtudiszkgkeqgmzqe.supabase.co';
//const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

{/*function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}*/}

export default function ChatPage() {
  const roteamento = useRouter();
  const usuarioLogado = roteamento.query.username;
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);
  
  {/*React.useEffect(() => {
    supabaseClient
      .from('mensagens')
      .select('*')
      .order('id', { ascending: false })
      .then(({ data }) => {
        //console.log('Dados da consulta:', data);
        setListaDeMensagens(data);
      });
      
  }, []);*/}

 {/* const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
    console.log('Nova mensagem:', novaMensagem);
    console.log('listaDeMensagens:', listaDeMensagens);
    // Quero reusar um valor de referencia (objeto/array) 
    // Passar uma função pro setState
    setListaDeMensagens((valorAtualDaLista) => {
      console.log('valorAtualDaLista:', valorAtualDaLista);
      return [
        novaMensagem,
        ...valorAtualDaLista,
      ]
    });
  });

  return () => {
    subscription.unsubscribe();
  }, [];*/}

  
  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      id: listaDeMensagens.length + 1,
      de: 'biaquintino',
      texto: novaMensagem,
    };

    
    setMensagem('');
    setListaDeMensagens([
        mensagem, 
        ...listaDeMensagens]);
    setMensagem("");

}

     {/*supabaseClient
      .from('mensagens')
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem
      ])
      .then(({ data }) => {
        //console.log('Criando mensagem: ', data);
        setListaDeMensagens([
          data[0],
          ...listaDeMensagens,
        ]);
      });
  }*/}

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary['000'],
        backgroundImage: `url(background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 5px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "20px",
          backgroundColor: 'rgba(233,37,65 ,0.7)',
          height: "100%",
          maxWidth: "90%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: 'rgba(233,37,65 ,0.8)',
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens}/>
          
          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                setMensagem(valor);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: 'rgb(230,230,228, 0.7)',
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[600],
              }}
            />
            {/*CallBack */}
            {/*<ButtonSendSticker 
              onStickerClick={(sticker) => {
                // console.log('[USANDO O COMPONENTE] Salva esse sticker no banco', sticker);
                handleNovaMensagem(':sticker: ' + sticker);
              }}
            />*/}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <Text variant="heading5" styleSheet={{color: '#210b0d', fontSize: '20px'}}>Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
          styleSheet={{color: '#210b0d'}}
        />
      </Box>
    </>
  );
}

function MessageList(props) {

  // função para excluir mensagem enviada para o chat
  function excluirMensagem(message) {
    const mensagemExcluida = props.mensagens.filter(
      (mensagem) => mensagem.id !== message
    );
    props.setListaDeMensagens([...mensagemExcluida]);
  }
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: '#210b0d',
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: 'rgb(230,230,228, 0.5)',
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
                 
              </Text>
                <Button
                    type="onClick"                
                    onClick={(event) => {
                      event.preventDefault();
                      excluirMensagem(mensagem.id);
                    }}
                    styleSheet={{
                      position: "right",
                      marginLeft: "890px",
                      backgroundColor: "#210b0d",
                      borderRadius: "20px",
                      fontSize: "5px"
                    }}
                    buttonColors={{
                      contrastColor: appConfig.theme.colors.neutrals[100],
                      mainColor: appConfig.theme.colors.primary['060'],
                      mainColorStrong: appConfig.theme.colors.neutrals['060'],
                      
                    }}
                    variant="tertiary"
                    label="x"
                    href="/chat"
                />
            </Box>
            {mensagem.texto}

             
            {/*mensagem.texto.startsWith(':sticker:')
              ? (
                <Image src={mensagem.texto.replace(':sticker:', '')} />
              )
              : (
                mensagem.texto
              )*/}
          </Text>
        );
      })}
    </Box>
  );
}
