import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Github from '../assets/github.png';
import Google from '../assets/google.png';

export interface ILoginPageProps {}

const SignUpPage: React.FunctionComponent<ILoginPageProps> = (props) => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [authing, setAuthing] = useState(false);

    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [user, setUser] = useState({});
    const userNow = auth.currentUser;

   

    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
    });

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
            console.log(user);
        } catch (error) {
            console.log('oh mince');
        }
    };

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
    

    const logout = async () => {
        await signOut(auth);
    };
   

     {
         /* <input
                    placeholder="Email..."
                    onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }}
                />
                <input
                    placeholder="Password..."
                    onChange={(event) => {
                        setRegisterPassword(event.target.value);
                    }}
                /> */
     }

    return (
        <div className="all-Signup">
            <div className="left-side">
                <div className="wrapLoginInput">
                    <h3 className="logo-name">
                        Insta<span>Grumes</span>
                    </h3>
                    <h2>Créer un compte</h2>
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

                    <button className="log-btn" onClick={register}>
                        Continuer
                    </button>
                    <p>
                        Déja inscrit ? <a href="/login"> connexion</a>{' '}
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
            <div className="right-side"></div>
        </div>
    );
};

export default SignUpPage;
