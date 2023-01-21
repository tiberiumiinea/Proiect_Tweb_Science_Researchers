import { useState } from "react"
import StudiesList from "./StudiesList"
import './researcher.css'

function Researcher(props){
    const { item , onDelete, onUpdate } = props
    const [ isEditing, setIsEditing ] = useState(false)    
    const [ firstName, setFirstName ] = useState(item.firstName)
    const [ lastName, setLastName ] = useState(item.lastName)
    

    const deleteResearcher = (evt) => {
        onDelete(item.id)
    }

    const updateResearcher = (evt) => {
        onUpdate(item.id, {
            firstName,
            lastName
        })
        setIsEditing(false) 
    }

    return (
        <div id="researcher-div">
        {            
            isEditing                
                ? (
                    <>
                    <div className="researcher-div-container">
                        <input type="text" value={firstName} onChange={(evt) => setFirstName(evt.target.value) }/>
                        <input type="text" value={lastName} onChange={(evt) => setLastName(evt.target.value) }/>
                        <input type="button" value="save" onClick={updateResearcher}/>
                        <input type="button" value="cancel" onClick={() => setIsEditing(false)}/>
                        </div>
                    </>
                )
                : (
                    <>
                    <div className="researcher-div-container">
                        Researcher: {item.firstName} {item.lastName}
                        <div id="researcher-btn-div">
                        <input className="researcher-btn" type="button" value="delete" onClick={deleteResearcher}/>
                        <input className="researcher-btn" type="button" value="edit" onClick={() => setIsEditing(true)}/>                      
                        </div>
                        <StudiesList  researcher = {item} rId={ item.id }/>
                    </div>
                    </>
                )
        }
        </div>
    )
}

export default Researcher