import { useRef, useState } from "react";


function StudyAddForm(props) {
    const { onAdd } = props
    const [ title, setTitle ] = useState('')
    const [ fieldOfStudy, setFieldOfStudy ] = useState('')
    const fieldRef = useRef(null)
    const studyRef = useRef(null)

    const addStudy = () => {
        onAdd({
            title,
            fieldOfStudy
        });
        
        fieldRef.current.value = ''
        studyRef.current.value = ''
    }


    return(
        <div>
            <input ref={fieldRef} type="text" placeholder="Field of study" onChange={(evt)=>setFieldOfStudy(evt.target.value)}/>
            <input ref={studyRef} type="text" placeholder="Title" onChange={(evt)=>setTitle(evt.target.value)}/>
            <input type="button" value="add" onClick={addStudy}/>
        </div>
    )
}

export default StudyAddForm