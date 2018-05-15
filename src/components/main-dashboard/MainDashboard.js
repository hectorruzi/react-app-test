import React, {
    Component
} from 'react';
import LeftHand from '../left-hand/LeftHand';
import Board from '../board/Board'
import boardsService from '../../services/boardsService'

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {boards: [], boardSelected: {}};
        this.showBoard = this.showBoard.bind(this);
    }
    componentDidMount() {       
        let that = this;
        boardsService.getBoards().then((response) => {
            that.setState({boards: response.data});
            if(response.data.length) {
                this.setState({boardSelected: response.data[0]});
            }
        });
    }
    render() {
        if(this.state.boards.length && this.state.boardSelected.id) {
            return(            
                <div className="container h-100">
                    <div className="row h-100">
                        <LeftHand handleChangeBoard={this.showBoard} boardSelected={this.state.boardSelected} boards= {this.state.boards}/>
                        <Board board= {this.state.boardSelected}/>
                    </div>
                </div>
            )
        }
        return (<div>Loading</div>)
    }

    showBoard(board) {
        this.setState({boardSelected: board});        
    }
}

export default MainDashboard
