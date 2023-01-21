import { useEffect, useState } from "react"
import StudyAddForm from "./StudyAddForm"
import store from "./Store"
import Study from "./Study"


function StudiesList(props) {
    const { rId } = props
    const [ studies, setStudies ] = useState([])
    const SERVER = 'http://localhost:8080'

    const fetchData = async () => {
            const response = await fetch(`${SERVER}/researchers/${rId}/studies`)
            const json = await response.json()
            setStudies(json)
    }

    useEffect(() => {
            fetchData()
      },[studies])
      

      const setStudy = (study) => {
        store.addStudy(study, rId)
      }

      const onUpdate = (rId,study,sId) => {
        store.updateStudy(rId,study,sId)
      }

      const onDelete = (rId,sId) => {
        store.deleteStudy(rId,sId)
      }   

      return (
        <div>
            {Array.isArray(studies)?studies.map((e) => <Study onUpdate={onUpdate} onDelete={onDelete} key={e.id} item={e}/>):null}
            <StudyAddForm onAdd = {setStudy}/>
        </div>
      )

}

export default StudiesList