import axios from 'axios'
import metadataService from '../metadataService';

var boardsService = {
    getBoards: function() {
        let metadata = metadataService();
        let that = this;
        return axios.get(`https://api.trello.com/1/members/roqueperalta2/boards?key=${metadata.key}&token=${metadata.token}`);
    }
}

export default boardsService;