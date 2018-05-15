import axios from 'axios'
import metadataService from '../metadataService';

var listsService = {
    getLists: function(boardId) {
        let metadata = metadataService();
        let that = this;
        return axios.get(`https://api.trello.com/1/boards/${boardId}?lists=open&list_fields=id,name&key=${metadata.key}&token=${metadata.token}`);
    }
}

export default listsService;