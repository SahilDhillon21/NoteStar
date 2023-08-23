import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import * as NotesAPI from './network/notes_api';
import NotesPage from './pages/NotesPage';
import PageNotFoundPage from './pages/PageNotFoundPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {

        const user = await NotesAPI.getLoggedInUser();
        setLoggedInUser(user);

      } catch (error) {
        console.log(error);
      }
    }
  }, []
  );

  return (

    <>

      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessfull={() => setLoggedInUser(null)}
        onSignUpClicked={() => setShowSignUpModal(true)}
      />

      <Container>

          <Routes>

            <Route path='/'
              element={<NotesPage loggedInUser={loggedInUser} />} />

            <Route path='/privacy'
              element={<PrivacyPage />} />

            <Route path='/*' element={<PageNotFoundPage />} />

          </Routes>

      </Container>

      <>
        {showSignUpModal &&
          <SignUpModal onDismiss={() => { setShowSignUpModal(false) }}
            onSignUpSucessfull={(user) => {

              setLoggedInUser(user)
              setShowSignUpModal(false)
            }} />
        }

        {showLoginModal &&
          <LoginModal onDismiss={() => { setShowLoginModal(false) }}
            onLoginSucessfull={(user) => {
              setLoggedInUser(user)
              setShowLoginModal(false)
            }} />
        }
      </>

    </>
  );
}

export default App;
