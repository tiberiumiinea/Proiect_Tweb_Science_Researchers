import { useState } from 'react'
import './researcherAddForm.css'


function ResearcherAddForm(props){
    const { onAdd } = props
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')

    const add = (evt) => {
        onAdd({
            firstName,
            lastName
        })
        
        const textInputs = document.getElementsByClassName('text-box');
        textInputs[0].value ='';
        textInputs[1].value ='';
    }

    return (
        <div id='container'>
            <h2>Add researcher</h2>
            <div>
                <input className='text-box' type="text" placeholder='First Name' onChange={(evt) => setFirstName(evt.target.value) }/>
            </div> 
            <div>
                <input className='text-box' type="text" placeholder='Last Name' onChange={(evt) => setLastName(evt.target.value) }/>
            </div>
            <div>
                <input type="button" value='Add' onClick={add}/>
            </div>

        </div>
    )
}

export default ResearcherAddForm