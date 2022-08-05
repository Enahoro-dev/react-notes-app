import React,{useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Note} from '../pages/notesListPage';
import {ReactComponent as ArrowLeft} from '../assets/chevron-left.svg'

const NotesPage:React.FC = () => {
    const params = useParams();
    let noteId = params.id
    const [note,setNote]=useState<Note>({
        id:null,
        body:'',
        created:'',
        updated:'',
    })
    let navigate=useNavigate()


    let getNote = async() => {
        if (noteId === 'new') return
        let response = await fetch(`https://enas-notes.herokuapp.com/api/notes/ ${noteId}/`)
        let data:Note  = await response.json()
        setNote(data)
    }

    useEffect(() => {getNote()},[])

    let createNote = async () => {
        fetch(`https://enas-notes.herokuapp.com/api/notes/create/`, {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(note)
        })
    }

    let updateNote = async () => {
        fetch(`https://enas-notes.herokuapp.com/api/notes/ ${noteId}/update/`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`https://enas-notes.herokuapp.com/api/notes/ ${noteId}/delete/`, {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
        })
        navigate('/');
    }


    let handleSubmit = ()  =>{
        if (noteId !== 'new' && note?.body === ''){
            deleteNote()
        } else if (noteId !== 'new'){
            updateNote()
        }else if (noteId === 'new' && note !== null){
            createNote()
        }
        setTimeout(()=>{
            navigate('/')
        },5000)    
        
    }

    return(
        <div className='note'>
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/>
                </h3>
                { noteId !== 'new'? (
                    <button onClick={deleteNote}>DELETE</button>):(
                        <button onClick={handleSubmit}>DONE</button>
                    )
                }
                
            </div>
            <textarea onChange={(e) => (setNote({...note , 'body':e.target.value}))} value={note?.body}></textarea>
        </div>
    )
}

export default NotesPage