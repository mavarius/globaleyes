/* global document */
import React from 'react'
import NoteList from './NoteList'

const closeNotebook = () => {
  document.getElementById('notebook').className = ''
}

const Notebook = () => (
  <div id="notebook">
    <div className="notebookHeader">
      <h1>Notebook</h1>
      <button className="closeButton" onClick={() => closeNotebook()}><img src="/images/closeBtn.png" alt="close notebook"/></button>
    </div>
    <NoteList />
  </div>
  )

export default Notebook
