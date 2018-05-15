import axios from 'axios'
import metadataService from '../metadataService';

var cardsService = {
    getCards: function(listId) {
        let metadata = metadataService();        
        return axios.get(`https://api.trello.com/1/lists/${listId}/cards?fields=id,name,desc&key=${metadata.key}&token=${metadata.token}`);
    },

    postCard: function(listId, name) {
        let metadata = metadataService();
        return axios.post(`https://api.trello.com/1/cards?idList=${listId}&name=${name}&key=${metadata.key}&token=${metadata.token}`,{})
    },

    moveCard: function(cardId, toListId) {
        let metadata = metadataService();
        return axios.put(`https://api.trello.com/1/cards/${cardId}?idList=${toListId}&key=${metadata.key}&token=${metadata.token}`, {})
    }
}

export default cardsService;