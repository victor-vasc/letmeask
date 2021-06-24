import IllustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {useHistory} from 'react-router-dom'

import { auth, firebase, database } from '../services/firebase'

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
  const history = useHistory();

  function signIn() {}

  function handleCreateRoom(){
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.signInWithPopup(provider).then(result => {
      console.log(result);
    })

    // history.push('/rooms/new');
  }

  return(
    <div id="page-auth">
      <aside>
        <img src={IllustrationImg} alt="ILustração Perguntas e Respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="LetMeAsk"/> 
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Login com sua conta google"/>
             Crie sua sala com Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text"
              placeholder="Digite o código da sala "
            />
            <Button type="submit">
              Entrar na sala
              </Button>
          </form>
        </div>
      </main>
    </div>
  )
}