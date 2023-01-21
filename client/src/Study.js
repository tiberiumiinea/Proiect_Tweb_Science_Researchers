import { useEffect, useState } from "react"
import './study.css'


function Study(props) {
    const { onUpdate, onDelete, item } = props
    const [ title, setTitle ] = useState(item.title)
    const [ fieldOfStudy, setFieldOfStudy ] = useState(item.fieldOfStudy)
    const [ isEditing, setIsEditing ] = useState(false)


    const updateStudy = (evt) => {
        onUpdate(item.researcherId,{ title, fieldOfStudy },item.id)
        setIsEditing(false)     
    }

    const deleteStudy = (evt) => {
        onDelete(item.researcherId,item.id)
    }


    return (
        <div>
            {
                isEditing ?
                (
                    <>
                        <input type="text" value={fieldOfStudy} onChange={(evt) => setFieldOfStudy(evt.target.value) }/>
                        <input type="text" value={title} onChange={(evt) => setTitle(evt.target.value) }/>
                        <input type="button" value="save" onClick={updateStudy}/>
                        <input type="button" value="cancel" onClick={() => setIsEditing(false)}/>
                    </>
                )
                :
                (
                    <div id="study-container-div">
                        <div id="div-study">
                            {`Field: ${fieldOfStudy}, Title: ${title}`}
                        </div>
                        <div id="div-study-btn">
                            <input type="button" value="delete" onClick={deleteStudy}/>                        
                            <input type="button" value="edit" onClick={() => setIsEditing(true)}/>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default Study