import { EventEmitter } from 'fbemitter'

const SERVER = 'http://localhost:8080'

class Store {
    constructor() {
        this.data = []
        this.emitter = new EventEmitter()
    }

    async getResearchers() {
        try {
            const response = await fetch(`${SERVER}/researchers`)
            if(!response.ok){
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_RESEARCHERS_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_RESEARCHERS_ERROR')
        }
        
    }

    async addResearcher(researcher) {
        try {
            const response = await fetch(`${SERVER}/researchers`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(researcher)
            })
            if(!response.ok){
                throw response
            }
            this.getResearchers()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_RESEARCHER_ERROR')
        }
         
    }

    async updateResearcher(id, researcher) {
        try {
            const response = await fetch(`${SERVER}/researchers/${id}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(researcher)

            })
            if(!response.ok){
                throw response
            }
            this.getResearchers()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('UPDATE_RESEARCHER_ERROR')
        }
    }

    async deleteResearcher(id) {
        try {
            const response = await fetch(`${SERVER}/researchers/${id}`, {
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getResearchers()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_RESEARCHER_ERROR')
        }
    }

    async getStudies(rId) {
        try {
            const response = await fetch(`${SERVER}/researchers/${rId}/studies`)
            if(!response.ok){
                throw response
            }
            this.data = await response.json()
            this.emitter.emit('GET_STUDIES_SUCCESS')
        } catch(err) {
            console.warn(err)
            this.emitter.emit('GET_STUDIES_ERROR')
        }
    }

    async addStudy(study,rId) {
        try {
            const response = await fetch(`${SERVER}/researchers/${rId}/studies`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(study)
            })
            if(!response.ok){
                throw response
            }
            this.getStudies(rId)
        } catch(err) {
            console.warn(err)
            this.emitter.emit('ADD_STUDY_ERROR')
        }
    }

    async updateStudy(rId, study,sId) {
        try {
            const response = await fetch(`${SERVER}/researchers/${rId}/studies/${sId}`, {
                method:'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(study)

            })
            if(!response.ok){
                throw response
            }
            this.getStudies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('UPDATE_STUDY_ERROR')
        }
    }

    async deleteStudy(rId,sId) {
        try {
            const response = await fetch(`${SERVER}/researchers/${rId}/studies/${sId}`, {
                method:'DELETE'
            })
            if(!response.ok){
                throw response
            }
            this.getStudies()
        } catch(err) {
            console.warn(err)
            this.emitter.emit('DELETE_STUDY_ERROR')
        }
    }

}

const store = new Store()

export default store