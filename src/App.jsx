import { useContext, useState } from 'react'

import './App.css'
import Note from './components/Note'
import { noteContext } from './context/noteContext'

function App() {
  const [showCard, setShowCard] = useState(false)
  const [newText, setNewText] = useState("")
  const { notes, addNote } = useContext(noteContext)
  

  const renderNotes = () => {
    return notes?.map((note, index) => <Note text={note.text} date={note.date} id={index} />)
  };

  const handleNote = () => {
    const newCard = {
        text: newText,
        date: new Date().toISOString() 
    };
    setNewText("");
    setShowCard(false);
    addNote(newCard);
};



  return (
    <div className='app'>
      <div className="sidebar">
        <h3 className='cslcslcsl'>Add a New Note</h3>
        <button className='btn' onClick={() => setShowCard(!showCard)}>
          <i className="fa-solid fa-plus"></i>
        </button>
        <div className='sdsksk d-flex flex-column justify-content-end'>
          <a href='https://praveengandikota.netlify.app/'  target='_blank' rel='noopener noreferrer' >Visit my Website</a>
        </div>
      </div>
      <div className="content">
        <h1 className='headidnan'>Saved Notes</h1>
        <div className="notes-container">
          {showCard && (
            <div className="new-note note">
                <textarea 
                value={newText} 
                placeholder='Start Here'
                onChange={(e) => setNewText(e.target.value)}
                cols={50} rows={30}></textarea>
                <button className='btn' onClick={handleNote}><i className="fa-solid fa-check"></i></button>
            </div>
        )}

          {renderNotes()}
        </div>
      </div>
    </div>
  )
}

export default App