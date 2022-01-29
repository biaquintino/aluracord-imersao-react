import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Titulo(props) {
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
            ${Tag} {
                color: '#210b0d';
                font-size: 25px;
                font-weight: 600;
            }
            `}</style>
    </>
  );
}

export default function PaginaInicial() {
  //const username = 'biaquintino';
  const [username, setUsername] = React.useState('biaquintino')
  const roteamento = useRouter()

  return (
    <>
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary['000'],
          backgroundImage: 'url(background.png)',
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '10px', padding: '35px', margin: '16px',
            boxShadow: '0 5px 10px 0 rgb(0 0 0 / 50%)',
            backgroundColor: 'rgb(233,37,65 ,0.70)',
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form');
              roteamento.push('/chat')
              //window.location.href = '/chat';
            }}
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: '#210b0d'}}>
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              onChange={function (event) {
                console.log('Usuário digitou', event.target.value);
                //onde está o valor?
                const valor = event.target.value;
                //trocar o valor da variavel
                //através do React e avise quem precisa
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[600],
                  mainColor: appConfig.theme.colors.neutrals[300],
                  mainColorHighlight: appConfig.theme.colors.neutrals[400],
                  backgroundColor: 'rbga(230,230,228)',
                },
              }}
            />
            <Button
              type='submit'
              label='Entrar'
              fullWidth
              styleSheet={{
                color: '#210b0d', 
                backgroundColor: '#e6e6e4',
                hover: {
                  backgroundColor: '#210b0d',
                  color: '#e6e6e4'
                }
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '200px',
              padding: '5px',
              //backgroundColor: appConfig.theme.colors.neutrals[500],
              //border: '1px solid',
              //borderColor: appConfig.theme.colors.neutrals[500],
              borderRadius: '15px',
              flex: 1,
              minHeight: '240px',
            }}
          >
            <Image
              styleSheet={{
                borderRadius: '50%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: '#210b0d',
                fontSize: '1rem',
      
                //backgroundColor: "#222129",
                padding: '3px 10px',
                borderRadius: '1000px'
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}