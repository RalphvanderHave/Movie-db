import { createGlobalStyle } from "styled-components";

import wantlist from "./images/3d_glasses.png";
import collection from "./images/film.png";

export const GlobalStyle = createGlobalStyle`
    :root{
        --maxWidth: 1280px;
        --white: #fff;
        --lightGrey: #eee;
        --medGrey: #353535;
        --darkGrey: #1c1c1c;
        --fontSuperBig: 2.5rem;
        --fontBig: 1.5rem;
        --fontMed: 1.2rem;
        --fontSmall: 1rem;
    }

    * {
        box-sizing: border-box;
        font-family: 'Abel', sans-serif;
    }

    body {
        margin: 0;
        padding: 0;

        h1 {
            font-size: 2rem;
            font-weight: 600;
            color: var(--white);
        }

        h3 {
            font-size: 1.1rem;
            font-weight: 600;
        }

        p {
            font-size: 1rem;
            color: var(--white);
        }
    }

    .wantlist {
        background-image: url(${wantlist});
    }

    .collection {
        background-image: url(${collection});
    }

    .createPostPage {
        font-family: Arial, Helvetica, sans-serif;
        width: 100vw;
        height: 70vh;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .formContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 500px;
        height: auto;
        padding: 20px;
        border: 5px solid dodgerblue;
        border-radius: 5px;
      }
      
      .formContainer #inputCreatePost {
        height: 40px;
        margin-top: 10px;
        margin-bottom: 10px;
        border: 2px solid grey;
        border-radius: 5px;
        padding-left: 10px;
        font-size: 20px;
      }
      
      .formContainer button {
        margin-top: 15px;
        height: 40px;
        border: none;
        background-color: lightskyblue;
        border-radius: 5px;
        color: white;
      }
      
      .formContainer button:hover {
        cursor: pointer;
        background-color: dodgerblue;
      }
      
      .loginContainer {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100vh;
        padding-top: 100px;
      }
      
      .loginContainer input,
      button {
        width: 200px;
        height: 50px;
        border-radius: 8px;
        border: none;
        margin: 10px;
      }
      
      .loginContainer button {
        background-color: dodgerblue;
        color: white;
      }
      
      .loginContainer input {
        border: 2px solid dodgerblue;
      }
      
      #movie {
        border-collapse: collapse;
        border: 3px solid #ddd;
      }

      #movie td, #movie th{
        border: 1px solid #ddd;
        padding: 12px;
      }

      #movie tr:hover {
        background-color: #ddd;
      }

      #movie th {
        padding: 10px;
        text-align: center;
        background-color: var(--darkGrey);
        color: white;
      }

      .action {
        text-align: center;
      }
`;
