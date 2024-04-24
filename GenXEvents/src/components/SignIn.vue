<template>
    <div>
      <input class="d-checkbox" type="checkbox" id="dstart">
      <input class="d-checkbox" type="checkbox" id="dprogress2">
      <input class="d-checkbox" type="checkbox" id="dfinish">
      <div class="d-form__progress"></div>
  
      
      <div class="d-formContainer">
        
        <form class="d-form" action="">
          <div class="d-form__group"> 
            <label class="d-form__label" for="dfemail">
              <input
                type="email"
                id="dfemail"
                class="d-form__input"
                placeholder=" "
                required
                v-model="email">
              <label class="d-form__next" for="dprogress2" role="button">
                <span class="d-form__nextIcon"></span>
              </label>
              <span class="d-form__groupLabel">Enter your email.</span>
              <b class="d-form__border"></b>
            </label>
          </div>
  
          <div class="d-form__group">
            <label class="d-form__label" for="dfpass">
              <input
                type="password"
                id="dfpass"
                class="d-form__input"
                placeholder=" "
                required
                v-model="password">
              <label class="d-form__next" for="dfinish" role="button">
                <span class="d-form__nextIcon"></span>
              </label>
              <span class="d-form__groupLabel">Enter your password.</span>
              <b class="d-form__border"></b>
            </label>
          </div>
  
          <label class="d-form__toggle" for="dstart">Login<span class="d-form__toggleIcon"></span></label>
        </form>
        <div id="errorMessage" v-show="isErrorVisible">No account with this user and password was found</div>
        <div id="errorMessage2" v-show="isErrorVisible">Please sign up or try again.</div>
        <div class="d-welcome" v-show="isWelcomeVisible">Welcome back!</div>
        <label class="dd-form__toggle" id="tryAgain" v-show="isErrorVisible" @click="refreshPage">Try Again</label>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
  import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
  import { firebaseApp, firebaseAuth, firestore } from './firebase';

  export default {
    data() {
      return {
        email: "",
        password: "",
        isWelcomeVisible: false,
        isErrorVisible: false,
      };
    },
    methods: {
      async signIn() {
        const email = this.email;
        const password = this.password;
  
        try {
          // Sign in user with email and password
          await signInWithEmailAndPassword(getAuth(), email, password);
  
          // Signin successful, display welcome message
          this.isWelcomeVisible = true;
          this.isErrorVisible = false;
          console.log("User signed in:", getAuth().currentUser.uid);
        } catch (error) {
          // Handle errors
          this.isWelcomeVisible = false;

          this.isErrorVisible = true;

        }
      },
      refreshPage() {
        location.reload(); // Refresh the page
      }
    },
    mounted() {
      document.getElementById('dfinish').addEventListener('click', this.signIn);
    }
  };
  </script>
  
  <style scoped>
  /* Add your existing CSS styles here */
body {
    font-family: "Bahnschrift", "Open Sans", sans-serif;
    margin: 0;
    height: 100vh;
    display: grid;
    place-items: center;
    background-color: #25a3ff;
    position: relative;
    overflow: hidden;
  }
  
  .d-checkbox {
    display: none;
  }
  
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form__toggle {
    visibility: hidden;
    opacity: 0;
    transform: scale(0.7);
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form {
    width: 382px;
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) {
    visibility: visible;
    opacity: 1;
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) .d-form__border {
    width: 100%;
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__border,
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__next {
    color: #ff0033;
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) .d-form__input:required:valid ~ .d-form__next {
    pointer-events: initial;
    color: #565656;
  }
  .d-checkbox:nth-of-type(1):checked ~ .d-form__progress {
    width: calc(100vw / 3);
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-form__progress {
    width: calc(200vw / 3);
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) {
    visibility: hidden;
    opacity: 0;
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(1) .d-form__border {
    width: 0;
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) {
    visibility: visible;
    opacity: 1;
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) .d-form__border {
    width: 100%;
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__border,
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__next {
    color: #ff0033;
  }
  .d-checkbox:nth-of-type(2):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) .d-form__input:required:valid ~ .d-form__next {
    pointer-events: initial;
    color: #565656;
  }
  
  .d-checkbox:nth-of-type(3):checked ~ .d-form__progress {
    width: calc(100vw);
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) {
    visibility: hidden;
    opacity: 0;
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(2) .d-form__border {
    width: 0;
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) {
    visibility: visible;
    opacity: 1;
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) .d-form__border {
    width: 100%;
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__border,
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) .d-form__input:not(:placeholder-shown):invalid ~ .d-form__next {
    color: #ff0033;
  }
  .d-checkbox:nth-of-type(3):checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) .d-form__input:required:valid ~ .d-form__next {
    pointer-events: initial;
    color: #565656;
  }
  
  #dfinish:checked ~ .d-form__progress {
    width: 100vw;
  }
  #dfinish:checked ~ .d-formContainer .d-form {
    transition: opacity 0.2s 0.1s, transform 0.3s;
    opacity: 0;
    transform: translateX(50%) scaleX(0);
  }
  #dfinish:checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) {
    transition: 0s;
    visibility: hidden;
    opacity: 0;
  }
  #dfinish:checked ~ .d-formContainer .d-form .d-form__group:nth-child(3) .d-form__border {
    width: 0;
  }
  #dfinish:checked ~ .d-formContainer .d-welcome {
    opacity: 1;
  }
  
  .d-formContainer {
    width: 180px;
    height: 65px;
    z-index: 1;
    display: flex;
    justify-content: center;
  }
  
  .d-welcome {
    position: absolute;
    width: max-content;
    height: inherit;
    font-size: 60px;
    color: white;
    opacity: 0;
    transition: 0.3s;
  }

  .dd-form__toggle {
    position: absolute;
    font-size: 30px;
    opacity: 1;
    transition: 0.3s;
    display: none;
    background-image: linear-gradient(to right, rgb(148, 202, 216), rgb(235, 249, 248));
    width: auto;
    height: auto;
    font-size: 18px;
    color: #333333;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 20px 20px 20px;
  }

  #errorMessage {
 /* Hide the error message by default */
    font-size: 40px; /* Set font size */
    position: absolute;
    width: max-content;
    height: inherit;
    transition: 0.3s;
    top: calc(33.333% - 20px);
    color:#ffffff;
    word-wrap: break-word;
  }

  #errorMessage2 {
 /* Hide the error message by default */
    font-size: 40px; /* Set font size */
    position: absolute;
    width: max-content;
    height: inherit;
    transition: 0.3s;
    top: calc(40%);
    color:#ffffff;
    word-wrap: break-word;
  }

  #signUp {
 /* Hide the error message by default */
    font-size: 40px; /* Set font size */
    position: absolute;
    width: max-content;
    height: inherit;
    transition: 0.3s;
    top: calc(50% - 20px);
  }

  #tryAgain {
    align-items: center;
    justify-content: center;
  }
  
  .d-form__toggle {
    width: inherit;
    height: inherit;
    font-size: 18px;
    color: #333333;
    cursor: pointer;
    transition: 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative; /* Ensure relative positioning */
  }
  
  .d-form {
    position: relative;
    width: inherit;
    height: inherit;
    background-color: #ffffff;
    box-shadow: 0 5px 10px -2px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.3);
  }

  .d-form__toggleIcon, .dd-form__toggleIcon {
    display: inline-block;
    margin-left: 10px;
    position: relative;
    width: 15px;
    height: 17px;
  }
  
  .d-form__toggleIcon::before, .d-form__toggleIcon::after {
    content: "";
    position: absolute;
    background-color: #565656;
  }
  
  .d-form__toggleIcon::before, .dd-form__toggleIcon::before {
    left: 50%;
    transform: translateX(-50%);
    width: 9px;
    height: 9px;
    border-radius: 50%;
  }
  
  .d-form__toggleIcon::after, .dd-form__toggleIcon::after {
    bottom: 0;
    width: 100%;
    height: 7px;
    border-radius: 7px 7px 0 0;
  }
  
  .d-form__group {
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    padding: 12px 15px;
    box-sizing: border-box;
    transition: 0.2s 0.2s;
    position: absolute;
  }

  .d-form__label {
    position: relative;
    cursor: pointer;
    width: calc(100% - 40px);
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  
  .d-form__input {
    font-size: 20px;
    font-family: inherit;
    width: 100%;
    height: 90%;
    border: 0;
    outline: 0;
    color: #333333;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  .d-form__input:focus ~ .d-form__groupLabel, .d-form__input:not(:placeholder-shown) ~ .d-form__groupLabel {
    font-size: 10px;
    top: -4px;
    transform: translateY(0);
    color: #333333;
  }
  
  .d-form__input:focus ~ .d-form__border,
  .d-form__input:focus ~ .d-form__next, .d-form__input:not(:placeholder-shown) ~ .d-form__border,
  .d-form__input:not(:placeholder-shown) ~ .d-form__next {
    transition: 0.3s;
  }
  
  .d-form__input:focus {
    cursor: initial;
  }
  
  .d-form__groupLabel {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    transition: 0.2s;
  }
  
  .d-form__border {
    position: absolute;
    width: 0;
    height: 3px;
    color: #25a3ff;
    background-color: currentColor;
    transition: 1s 0.2s ease-out;
  }
  
  .d-form__next {
    color: #25a3ff;
    position: absolute;
    right: -40px;
    height: 100%;
    width: 40px;
    cursor: pointer;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  
  .d-form__nextIcon {
    position: relative;
    right: 1.5px;
    width: 20px;
    height: 3px;
    background-color: currentColor;
  }
  
  .d-form__nextIcon::before, .d-form__nextIcon::after {
    content: "";
    position: absolute;
    right: -1.5px;
    width: 15px;
    height: 3px;
    background-color: inherit;
  }
  
  .d-form__nextIcon::before {
    bottom: -1.5px;
    transform-origin: top right;
    transform: rotate(45deg);
  }
  
  .d-form__nextIcon::after {
    top: -1.5px;
    transform-origin: bottom right;
    transform: rotate(-45deg);
  }
  
  .d-form__progress {
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-image: url(../assets/benjamin-davies-P9BY2joAcwk-unsplash.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    transition: width 1s ease-in-out; /* Adjust transition duration */
    z-index: 0; /* Push the image behind other elements */
  }
  
  </style>
  