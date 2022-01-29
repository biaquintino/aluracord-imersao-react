function GlobalStyle() {
    return (
      <style global jsx>{`
      @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          list-style: none;
        }
        
        body {
          font-family: 'Roboto', sans-serif;
        }

  
        /* App fit Height */ 
        html, body, #__next {
          min-height: 100vh;
          display: flex;
          flex: 1;
        }
        #__next {
          flex: 1;
        }
        #__next > * {
          flex: 1;
        }
        /* ./App fit Height */ 
      `}</style>
    );
  }


export default function MyApp({ Component, pageProps }) {
    console.log('roda em todas as páginas')
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    ) 
    
    
}