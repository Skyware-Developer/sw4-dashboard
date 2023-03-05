"use client";
import { useState } from "react";
import styles from "./page.module.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation';

export default function Login() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDahBmoVxjj7aeJwU2wkpayU71Pnmpvrw4",
    authDomain: "sw4-udem.firebaseapp.com",
    projectId: "sw4-udem",
    storageBucket: "sw4-udem.appspot.com",
    messagingSenderId: "544450645227",
    appId: "1:544450645227:web:413a284578d5ef0ac682ae",
  };
  const router = useRouter();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (auth, email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('Login exitoso');
    console.log(user);
    router.push('/dashboard');
    // ...
  })
  .catch((error) => {
    alert('Error');
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(`error code ${errorCode} message: ${errorMessage}`);
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email is: ${email} and password is: ${password}`);
    signIn(getAuth(), email, password);
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
