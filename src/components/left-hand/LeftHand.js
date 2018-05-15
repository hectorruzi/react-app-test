import React, {
    Component
} from 'react';

import './left-hand.css';
import axios from 'axios';

class LeftHand extends Component {
    constructor(props) {
        super(props);        
    }
    componentDidMount() {
    
    }    

    render() {
        const boards = this.props.boards.map(board => {
            return <li key={board.id} className={"nav-item d-flex" + (this.props.boardSelected.id === board.id ? ' selected-board': '')}>
                    <span style={{'background':board.prefs.background}} className="square"/>
                    <span onClick={()=>{this.handleChangeBoard(board)}}>{board.name}</span>
                </li>
        })
        return ( 
        <div className="left-hand-component col-sm d-flex flex-column border bg-light"> 
            <h5>Boards</h5>            
            <ul className="nav flex-column board-items">
                {boards}    
            </ul>                        
        </div>
        )
    }

    handleChangeBoard(board) {
        this.props.handleChangeBoard(board);
    }
}

export default LeftHand;