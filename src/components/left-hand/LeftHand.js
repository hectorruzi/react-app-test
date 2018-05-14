import React, {
    Component
} from 'react';
// import './App.css';
import axios from 'axios';

class LeftHand extends Component {
    componentDidMount() {
    
    }    

    render() {
        const boards = this.props.boards.map(board => {
            return <li className="nav-item"><span onClick={this.props.handleChangeBoard(board)}>{board.name}</span></li>
        })
        return ( 
        <div> 
            <h5>Boards</h5>
            <ul className="nav flex-column">
                {boards}    
            </ul>
        </div>
        )
    }
}

export default LeftHand;