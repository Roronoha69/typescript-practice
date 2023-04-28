import React, { useEffect, useState } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, collectionGroup, query, where, addDoc } from 'firebase/firestore';
import { db } from '../Application';
import '../styles/Home.scss';
import UserCreation from './UserCreation';

import Notif from '../assets/nav1.png';
import Inscri from '../assets/nav2.png';
import Home from '../assets/nav3.png';
import postBtn from '../assets/nav5.png';
import Msg from '../assets/nav4.png';
import Logo from '../assets/Exlogo.png';
import loupe from '../assets/loupe.png';

import Homeb from '../assets/nav3black.png';
import Notifb from '../assets/nav1black.png';
import Inscrib from '../assets/nav2black.png';
import Msgb from '../assets/nav4black.png';
import postBtnb from '../assets/nav5black.png';

import pfp1 from '../assets/pfp/dalle1.png';
import pfp2 from '../assets/pfp/dalle2.png';
import pfp3 from '../assets/pfp/dalle3.png';
import pfp4 from '../assets/pfp/dalle4.png';
import pfp5 from '../assets/pfp/dalle5.png';
import pfp6 from '../assets/pfp/dalle6.png';
import pfp7 from '../assets/pfp/dalle7.png';
import pfp8 from '../assets/pfp/dalle8.png';

import banana from '../assets/dalle-img-banane.png';
import pear from '../assets/dalle-img-poire.png';
import apple from '../assets/dalle-img-pomme.png';

import pfpMangue from '../assets/pfp/dalle7.png';

import LikeImg from '../assets/like.png';
import CommentImg from '../assets/comment.png';
import verif from '../assets/verif1.png';
import params from '../assets/params.png';

import lemonFish from '../assets/waterlemon.png';

import { Publication } from '../models/publication';
import { Comment } from '../models/comment';
import { Likes } from '../models/like';

interface CombinedData {
    publication: Publication;
    comments: Comment[];
    likes: Likes[];
}

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
    const auth = getAuth();
    const userNow = auth.currentUser;
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState<string>();
    const [userGender, setUserGender] = useState<number>();
    const [userNickname, setUserNickname] = useState<number>();
    const [publications, setPublications] = React.useState<CombinedData[]>([]);
    const [toggleComment, setToggleComment] = useState<string>('');
    const message = userNow?.email ? userNow.email : '';
    const imagesPfp = [pfp1, pfp2, pfp3, pfp4, pfp5, pfp6, pfp7, pfp8];
    const igmPost = [banana, pear, apple];
    const reversedPublications = publications.reverse();
    const [onPage, setOnPage] = useState<number>(1);

    // Fetch
    useEffect(() => {
        if (userNow && !userName) {
            const docRef = doc(db, 'Users', `${userNow?.email}`);
            const fetchUser = async () => {
                const docSnap = await getDoc(docRef);
                docSnap.exists() ? console.log(docSnap.data()) : console.log('c vide ducon');
                docSnap.exists() ? setUserName(docSnap.data().name) : console.log('No such document!');
                docSnap.exists() ? setUserNickname(docSnap.data().nickname) : console.log('No such document!');
                docSnap.exists() ? setUserGender(docSnap.data().gender) : console.log('No such document!');
            };
            fetchUser();
        }
    });

    useEffect(() => {
        setPublications([]);
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'Publications'));
            querySnapshot.forEach(async (doc) => {
                const publication = doc.data() as Publication;
                const commentsSnapshot = await getDocs(collection(db, `Publications/${doc.id}/Comments`));
                const comments: Comment[] = [];
                commentsSnapshot.forEach((commentDoc) => {
                    comments.push(commentDoc.data() as Comment);
                });
                const likesSnapshot = await getDocs(collection(db, `Publications/${doc.id}/Likes`));
                const likes: Likes[] = [];
                likesSnapshot.forEach((likeDoc) => {
                    likes.push(likeDoc.data() as Likes);
                });
                setPublications((prevPublications) => [...prevPublications, { publication: { ...publication, id: doc.id }, comments, likes }]);
            });
        };
        fetchData();
        console.log();
    }, []);

    // Auth
    onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
    });

    const [firestoreUserName, setFirestoreUserName] = useState<string>();
    const [firestoreUserGender, setfirestoreUserGender] = useState<number>(2);
    const [firestorePublication, setFirestorePublication] = useState<string>();
    const [firestoreComment, setFirestoreComment] = useState<string>();

    // CRUD opérations

    async function createPublication() {
        const docRef = await addDoc(collection(db, 'Publications'), {
            author: userName,
            authorNickname: userNickname,
            authorMail: userNow?.email,
            post: firestorePublication,
            gender: userGender
        });
        console.log('Document written with ID: ', docRef.id);
    }
    async function createComment(document: any) {
        console.log(document);

        const docRef = await addDoc(collection(db, 'Publications', document, 'Comments'), {
            author: userName,
            authorNickname: userNickname,
            authorMail: userNow?.email,
            comment: firestoreComment,
            gender: userGender,
            id: document
        });
        console.log('Document written with ID: ', docRef.id);
    }

    async function createLike(document: any) {
        console.log(document);

        await setDoc(doc(db, 'Publications', document, 'Likes', `${userNow?.email}`), {
            author: userName,
            authorNickname: userNickname,
            authorMail: userNow?.email,
            gender: userGender
        });
    }

    return (
        <div>
            {userName ? (
                <div className="all-Home">
                    <div className="nav">
                        <img className="logo" src={Logo} alt="" />
                        <div className="on-page">
                            <div className={`bar ${onPage == 1 ? '' : 'invisible'}`}></div>
                        </div>
                        <img onClick={() => setOnPage(1)} src={onPage == 1 ? Homeb : Home} alt="" />
                        <div className="on-page">
                            <div className={`bar ${onPage == 2 ? '' : 'invisible'}`}></div>
                        </div>
                        <img onClick={() => setOnPage(2)} src={onPage == 2 ? Msgb : Msg} alt="" />
                        <div className="on-page">
                            <div className={`bar ${onPage == 3 ? '' : 'invisible'}`}></div>
                        </div>
                        <img onClick={() => setOnPage(3)} src={onPage == 3 ? Notifb : Notif} alt="" />
                        <div className="on-page">
                            <div className={`bar ${onPage == 4 ? '' : 'invisible'}`}></div>
                        </div>
                        <img onClick={() => setOnPage(4)} src={onPage == 4 ? Inscrib : Inscri} alt="" />
                        <div className="on-page">
                            <div className={`bar ${onPage == 5 ? '' : 'invisible'}`}></div>
                        </div>
                        <img onClick={() => setOnPage(5)} src={onPage == 5 ? postBtnb : postBtn} alt="" />

                        <img className="user-pfp" src={imagesPfp[userGender ? userGender : 7]} alt="" />
                        <p className="id">@{userNickname}</p>
                    </div>

                    <div className="content">
                        <div className="search">
                            <input type="text" placeholder="What's going on ?" />
                            <img src={loupe} alt="" />
                        </div>

                        {publications.map((publicationData, index) => (
                            <div key={index}>
                                <div className="post">
                                    <div className="pfp">
                                        <img src={imagesPfp[publicationData.publication.gender]} alt="" />
                                        <div className="user-info">
                                            <p>{publicationData.publication.author}</p>
                                            <p className="id">@{publicationData.publication.authorNickname}</p>
                                        </div>
                                    </div>
                                    <div className="post-info">
                                        <p className="desc">{publicationData.publication.post}</p>
                                        <div className="buttons">
                                            <button onClick={() => setToggleComment(publicationData.publication.id)}>
                                                <img src={CommentImg} alt="" />
                                                <span>{publicationData.comments.length}</span>
                                            </button>
                                            <button onClick={() => createLike(publicationData.publication.id)}>
                                                <img src={LikeImg} alt="" />
                                                <span>{publicationData.likes.length}</span>
                                            </button>
                                        </div>
                                    </div>

                                    <img src={igmPost[publicationData.publication.img ? publicationData.publication.img : 1]} alt="" />
                                </div>

                                <div className={`comment-box ${toggleComment == publicationData.publication.id ? '' : 'invisible'}`}>
                                    <div className="comments-text">
                                        {publicationData.comments
                                            .filter((comment) => comment.id === publicationData.publication.id)
                                            .map((comment, commentIndex) => (
                                                <div key={`${publicationData.publication.id}-${commentIndex}`}>
                                                    <p>
                                                        {comment.author} à dit : {comment.comment}
                                                    </p>
                                                </div>
                                            ))}

                                        <input type="text" id="commentInput" onChange={(e) => setFirestoreComment(e.target.value)} />

                                        <button onClick={() => createComment(publicationData.publication.id)}>Poster</button>
                                        <p className="close-com" onClick={() => setToggleComment('')}>
                                            X
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* <p>Publier quelque chose</p>

                <input type="text" onChange={(e) => setFirestorePublication(e.target.value)} />
                <p>{firestorePublication} </p>
                <button onClick={createPublication}>publier</button> */}

                        <div className="container">
                            <div className="mess">
                                <div className="mess-title">
                                    <p className="mess-title">Start conversation</p>
                                    <img src={params} alt="" />
                                </div>
                                {/* wrap here */}
                                <div className="msg-users">
                                    <img src={imagesPfp[6]} alt="" />
                                    <div className="msg-user-info">
                                        <p className="wrap-verif">
                                            Pierre <img src={verif} alt="" />
                                        </p>
                                        <p className="user-id">@PierroLaStreet</p>
                                    </div>
                                    <a href="">+</a>
                                </div>

                                {/* To wrap */}

                                <div className="msg-users">
                                    <img src={imagesPfp[2]} alt="" />
                                    <div className="msg-user-info">
                                        <p className="wrap-verif">
                                            Billy <img src={verif} alt="" />
                                        </p>
                                        <p className="user-id">@superHero</p>
                                    </div>
                                    <a href="">+</a>
                                </div>
                                <div className="msg-users">
                                    <img src={imagesPfp[7]} alt="" />
                                    <div className="msg-user-info">
                                        <p className="wrap-verif">
                                            Kalypso <img src={verif} alt="" />
                                        </p>
                                        <p className="user-id">@gb69</p>
                                    </div>
                                    <a href="">+</a>
                                </div>
                                {/*  */}

                                <a className="voir-plus" href="">
                                    voir plus
                                </a>
                            </div>

                            <div className="dalle">
                                <img className="bocal" src={lemonFish} alt="" />
                                <div className="button-codepen">
                                    <div className="wrap-dalle-btn">
                                        <p>
                                            <span> DALL·E 2</span>
                                        </p>

                                        <a href="#" className="link link--alt">
                                            <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg" className="link__svg" aria-labelledby="link2-title link2-desc">
                                                <title id="link2-title">Utiliser DALL·E 2 pour generer des images</title>
                                                <desc id="link2-desc">A rotating link with text placed around a circle, with a cloud/flower shape around it, and a smiley face inside</desc>

                                                <path id="link-circle-alt" className="link__path" d="M 35, 100 a 65,65 0 1,1 130,0 a 65,65 0 1,1 -130,0" stroke="none" fill="none" />

                                                <path
                                                    className="link__cloud"
                                                    d="M88.964,9.111C89.997,4.612 94.586,0.999 100,0.999C105.413,0.999 110.002,4.612 111.036,9.111C113.115,4.991 118.435,2.581 123.692,3.878C128.948,5.172 132.54,9.78 132.466,14.393C135.472,10.891 141.214,9.824 146.008,12.341C150.801,14.855 153.185,20.189 152.01,24.651C155.766,21.968 161.597,22.307 165.648,25.899C169.7,29.488 170.741,35.235 168.53,39.286C172.818,37.583 178.4,39.307 181.474,43.761C184.551,48.217 184.183,54.047 181.068,57.451C185.641,56.823 190.646,59.834 192.567,64.894C194.486,69.955 192.735,75.529 188.895,78.09C193.486,78.573 197.626,82.693 198.278,88.067C198.93,93.441 195.898,98.433 191.556,100C195.898,101.567 198.93,106.56 198.278,111.934C197.626,117.307 193.486,121.427 188.895,121.91C192.735,124.472 194.486,130.045 192.567,135.106C190.646,140.167 185.641,143.177 181.068,142.549C184.183,145.954 184.551,151.783 181.474,156.239C178.4,160.693 172.818,162.418 168.53,160.712C170.741,164.766 169.7,170.512 165.648,174.102C161.597,177.691 155.766,178.032 152.01,175.349C153.185,179.812 150.801,185.145 146.008,187.66C141.214,190.176 135.472,189.109 132.466,185.607C132.54,190.221 128.948,194.828 123.692,196.123C118.435,197.419 113.115,195.009 111.036,190.889C110.002,195.388 105.413,199.001 100,199.001C94.586,199.001 89.997,195.388 88.964,190.889C86.884,195.009 81.564,197.419 76.307,196.123C71.051,194.828 67.461,190.221 67.533,185.607C64.529,189.109 58.785,190.176 53.992,187.66C49.2,185.145 46.815,179.812 47.989,175.349C44.233,178.032 38.402,177.691 34.351,174.102C30.299,170.512 29.259,164.766 31.469,160.712C27.181,162.418 21.599,160.693 18.525,156.239C15.449,151.783 15.816,145.954 18.931,142.549C14.359,143.177 9.353,140.167 7.434,135.106C5.513,130.045 7.264,124.472 11.104,121.91C6.514,121.427 2.374,117.307 1.722,111.934C1.07,106.56 4.103,101.567 8.443,100C4.103,98.433 1.07,93.441 1.722,88.067C2.374,82.693 6.514,78.573 11.104,78.09C7.264,75.529 5.513,69.955 7.434,64.894C9.353,59.834 14.359,56.823 18.931,57.451C15.816,54.047 15.449,48.217 18.525,43.761C21.599,39.307 27.181,37.583 31.469,39.286C29.259,35.235 30.299,29.488 34.351,25.899C38.402,22.307 44.233,21.968 47.989,24.651C46.815,20.189 49.2,14.855 53.992,12.341C58.785,9.824 64.529,10.891 67.533,14.393C67.461,9.78 71.051,5.172 76.307,3.878C81.564,2.581 86.884,4.991 88.964,9.111Z"
                                                    fill="none"
                                                />

                                                <g className="link__face">
                                                    <path d="M 95 102 Q 100 107 105 102" fill="none" />
                                                    <ellipse className="" cx="90" cy="100" rx="2" ry="2" stroke="none" />
                                                    <ellipse className="" cx="110" cy="100" rx="2" ry="2" stroke="none" />
                                                    <ellipse className="" cx="100" cy="100" rx="35" ry="35" fill="none" />
                                                </g>

                                                <text className="link__text">
                                                    <textPath href="#link-circle-alt" stroke="none">
                                                        • Utiliser DALL·E 2 • créer des images
                                                    </textPath>
                                                </text>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <UserCreation message={message} />
            )}
        </div>
    );
};

export default HomePage;
