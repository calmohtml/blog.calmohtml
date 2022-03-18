import { createGlobalStyle } from "styled-components";
import { Fragment } from "react";

const GlobalStyle = createGlobalStyle`
  :root {
    --titles: "JetBrains Mono", monospace;
    --text: "Inter", sans-serif;
    --h1: 1.8rem;
    --h2: 1.5rem;
    --h3: 1.4rem;
    --h4: 1.2rem;
    --h6: 1.1rem;
    --blue: #14274e;
    --light-blue: #394867;
    --white: #f1f6f9;
    --grey: #9ba4b4;
  }

  *, 
  *::before, 
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: var(--text), -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: var(--blue);
    color: var(--white);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: var(--titles);
    color: var(--white);
  }

  li {
    color: var(--white);
    list-style: none;

    a {
      color: var(--light-blue);
    }
  }

  #__next {
    width: 80%;
    margin: 0 auto;
    padding: 2vh;
  }
`;

const App = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <GlobalStyle />
      <Component {...pageProps} />
    </Fragment>
  );
};

export default App;
