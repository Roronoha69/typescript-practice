import React from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, collectionGroup, query, where, addDoc } from 'firebase/firestore';
import { db } from '../Application';
import '../styles/User.scss';
import SignUpPage from './SingUp';

import pfp1 from '../assets/pfp/dalle1.png';
import pfp2 from '../assets/pfp/dalle2.png';
import pfp3 from '../assets/pfp/dalle3.png';
import pfp4 from '../assets/pfp/dalle4.png';
import pfp5 from '../assets/pfp/dalle5.png';
import pfp6 from '../assets/pfp/dalle6.png';
import pfp7 from '../assets/pfp/dalle7.png';
import pfp8 from '../assets/pfp/dalle8.png';

import gauche from '../assets/gauche.png';
import droite from '../assets/droite.png';
interface Props {
    message: string;
}

const UserCreation: React.FC<Props> = (props) => {
    const [firestoreUserName, setFirestoreUserName] = React.useState<string>();
    const [firestoreNickName, setFirestoreNickrName] = React.useState<string>();
    const [firestoreUserGender, setfirestoreUserGender] = React.useState<number>(7);
    const imagesPfp = [pfp1, pfp2, pfp3, pfp4, pfp5, pfp6, pfp7, pfp8];

    async function setUserProfile(params: any) {
        await setDoc(doc(db, 'Users', `${props.message}`), {
            name: firestoreUserName,
            nickname: firestoreNickName,
            gender: firestoreUserGender
        });
        window.location.assign('/');
    }

    return (
        <div>
            {props.message ? (
                <div className="all-User">
                    <div className="right-side">
                        <div className="wrapLoginInput">
                            <h3 className="logo-name">
                                Insta<span>Grumes</span>
                            </h3>
                            <h2>Profile</h2>
                            {/* 
                 />
                <input type="number" onChange={(e) => setfirestoreUserGender(Number(e.target.value))} />
                <button onClick={setUserProfile}>Confirmer</button>
            </div> */}
                            <label htmlFor="nameInput">Nom</label>
                            <input type="text" id="nameInput" placeholder="Andrew Tate" onChange={(e) => setFirestoreUserName(e.target.value)} />

                            <label htmlFor="nicknameInput">Nom d'utilisateur</label>
                            <input
                                id="nicknameInput"
                                placeholder="cobra_tate"
                                onChange={(event) => {
                                    setFirestoreNickrName(event.target.value);
                                }}
                            />

                            <div className="pfp-select">
                                <img className="arrow-left" src={gauche} alt="" onClick={() => setfirestoreUserGender(Math.floor(Math.random() * 8))} />
                                <img className="arrow-right" src={droite} alt="" onClick={() => setfirestoreUserGender(Math.floor(Math.random() * 8))} />
                                <img src={imagesPfp[firestoreUserGender]} alt="" />
                            </div>

                            <button className="log-btn" onClick={setUserProfile}>
                                Valider
                            </button>
                        </div>

                        {/* <h1>{userNow?.email}</h1> */}
                    </div>
                </div>
            ) : (
                <SignUpPage />
            )}
        </div>
    );
};

export default UserCreation;
