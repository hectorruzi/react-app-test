import React, {
    Component
} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import './board.css';
import listsService from '../../services/listsService';
import cardsService from '../../services/cardsService';
import List from '../list/List';

class Board extends Component {
    constructor(props) {
        super(props);          
        this.state = {isLoaded: false, lists: [], boardId: ''};      
        this.onDragEnd = this.onDragEnd.bind(this);
    }
    componentDidMount() {
        this.getLists(this.props.board.id);        
    }    

    onDragEnd(event) {
        if(!event.destination) {
            return
        }

        if(event.source.droppableId !== event.destination.droppableId) {
            cardsService.moveCard(event.draggableId, event.destination.droppableId).then(card => {                           
                this.state.lists.forEach((list, index) => {
                    if(list.id == event.source.droppableId) {
                        this.childs[index].current.removeCard(card.data.id);
                    } else if (list.id == event.destination.droppableId) {
                        this.childs[index].current.addCard(card.data, event.destination.index);                        
                    }
                })    
            });
        }
    }

    render() {    
        if(this.state.isLoaded) {
            if(this.props.board.id != this.state.boardId) {
                this.getLists(this.props.board.id);
                return (<div className="col-sm-9">loading...</div>)
            } 
            this.childs = [];
            let lists = this.state.lists.map(list => {
                let child = React.createRef();
                this.childs.push(child);
                return <List ref={child} key={list.id} list={list} />
            })            
            return(<div className="col-sm-9 board-component border">
                        <div className="title">
                            <h3>{this.props.board.name}</h3>
                        </div>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                        <div className="wrapper-lists d-flex">
                            {lists}
                        </div>
                        </DragDropContext>
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

    moveCardToList(cardId, listId) {                 
        cardsService.moveCard(cardId, listId).then(response => {            
        });
    }
}
export default Board;
