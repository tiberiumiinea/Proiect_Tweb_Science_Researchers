import { useEffect, useState } from 'react'
import store from './Store'
import ResearcherAddForm from './ResearcherAddForm'
import Researcher from './Researcher'
import './researcherList.css'


function ResearcherList() {
    const [ researchers, setResearchers ] = useState([])

    useEffect(() => {
      store.getResearchers()
      store.emitter.addListener('GET_RESEARCHERS_SUCCESS', () => {
        setResearchers(store.data)        
      })
    }, [])


    const addResearcher = (researcher) => {
      store.addResearcher(researcher)
    }

    const deleteResearcher = (id) => {
      store.deleteResearcher(id)
    }

    const updateResearcher = (id, researcher) => {
      store.updateResearcher(id, researcher)
    }

    return (
      <div>
          <ResearcherAddForm onAdd = {addResearcher}/>        
        <h1>List of science researchers</h1>        
          {researchers.map(e=><Researcher key={e.id} item={e} onDelete={deleteResearcher} onUpdate={updateResearcher}/>)}
      </div>
    );
  }
  
  export default ResearcherList;
  