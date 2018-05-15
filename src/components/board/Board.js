import React, {
    Component
} from 'react';
import './board.css';
import listsService from '../../services/listsService';
import List from '../list/List';

class Board extends Component {
    constructor(props) {
        super(props);  
        this.state = {isLoaded: false, lists: [], boardId: ''};      
    }
    componentDidMount() {
        this.getLists(this.props.board.id);        
    }    

    render() {    
        if(this.state.isLoaded) {
            if(this.props.board.id != this.state.boardId) {
                this.getLists(this.props.board.id);
                return (<div className="col-sm-9">loading...</div>)
            } 
            let lists = this.state.lists.map(list => {
                return <List key={list.id} list={list} />
            })            
            return(<div className="col-sm-9 board-component border">
                        <div className="title">
                            <h3>{this.props.board.name}</h3>
                        </div>
                        <div className="wrapper-lists d-flex">
                            {lists}
                        </div>
                    </div>)
        } else {
            return (<div className="col-sm-9">Lists is loading</div>)
        }                
    }
    getLists(boardId) {
        listsService.getLists(boardId).then(response => {
            this.setState({lists: response.data.lists, isLoaded: true, boardId: boardId});
        })
    }
}
export default Board;
