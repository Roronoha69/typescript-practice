import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
//import { TweenMax, Expo, Quad } from 'gsap';
import "../styles/Login.scss"

import Github from "../assets/github.png";
import Google from '../assets/google.png';

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  const userNow = auth.currentUser;


  onAuthStateChanged(auth, (currentUser:any) => {
      setUser(currentUser);
  });

   



    const signInWithGoogle = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    const signInWithGithub = async () => {
        setAuthing(true);

        signInWithPopup(auth, new GithubAuthProvider())
            .then((response) => {
                console.log(response.user.uid);
                navigate('/');
            })
            .catch((error) => {
                console.log(error);
                setAuthing(false);
            });
    };

    const login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log(user);
        } catch (error) {
            console.log('bordel');
        }
    };




    

   

    return (
        <div className="all-Login">
            <div className="left-side">
                <div className="wrapLoginInput">
                    <h3 className="logo-name">
                        Insta<span>Grumes</span>
                    </h3>
                    <h2>Connexion</h2>
                    <label htmlFor="emailInput">Email:</label>
                    <input
                        id="emailInput"
                        placeholder="Email..."
                        onChange={(event) => {
                            setLoginEmail(event.target.value);
                        }}
                    />
                    <label htmlFor="mdpInput">Mot de passe :</label>
                    <input
                        id="mdpInput"
                        placeholder="Password..."
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }}
                    />

                    <button className="log-btn" onClick={login}>
                        Continuer
                    </button>
                    <p>
                        Pas encore inscrit ? <a href="/signup"> connexion</a>{' '}
                    </p>

                    <button onClick={() => signInWithGoogle()} disabled={authing}>
                        <img src={Google} alt="" /> Google
                    </button>
                    <button onClick={() => signInWithGithub()} disabled={authing}>
                        <img src={Github} alt="" /> Github
                    </button>
                </div>

                {/* <h1>{userNow?.email}</h1> */}
            </div>
            <div className='right-side'>
                
            </div>
        </div>
    );
};

export default LoginPage;
