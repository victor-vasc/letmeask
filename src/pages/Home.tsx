import IllustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import {useHistory} from 'react-router-dom'

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const {signInWithGoogle, user} = useAuth()
  const [roomCode, setRoomCode ] = useState('')
  async function handleCreateRoom(){
    if(!user){
     await signInWithGoogle()
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent){
    event.preventDefault();
    
    if(roomCode.trim() === ''){
      return
    }

    const roomRef = await database.ref(`/rooms/${roomCode}`).get()

    if(!roomRef.exists()){
      alert('This room does not exist');
      return
    }

    if(roomRef.val().endedAt){
      alert('Room already closed');
      return;
    }

    history.push(`/rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text"
              placeholder="Digite o código da sala "
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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