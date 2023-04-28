import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SingUp';
import Loader from './pages/Loader';
import Chatroom from './pages/Chat';

import { getFirestore } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';
import { config } from './config/config';
import AuthRoute from './components/AuthRoute';

initializeApp(config.firebaseConfig);

export interface IApplicationProps {}

const app = initializeApp(config.firebaseConfig);
export const db = getFirestore(app);
const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/loader" element={<Loader />} />
                <Route path="/chatroom" element={<Chatroom />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Application;