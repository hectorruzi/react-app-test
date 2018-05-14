import React, {
    Component
} from 'react';
// import './App.css';
import axios from 'axios';
import metadataService from '../../metadataService';
import LeftHand from '../left-hand/LeftHand';

class MainDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {boards: [], boardSelected: {}};
        this.showBoard = this.showBoard.bind(this);
    }
    componentDidMount() {
        debugger;
        let metadata = metadataService();
        let that = this;
        axios.get(`https://api.trello.com/1/members/roqueperalta2/boards?key=${metadata.key}&token=${metadata.token}`)
        .then((response) => {
            that.setState({boards: response.data});
        })
    }
    render() {
        return(
            <div className="container">
            <div className="row">
                <LeftHand className="col-sm left-hand" handleChangeBoard={this.showBoard} boards= {this.state.boards}/>
                <div className="col-sm-9 lists-panel" board= {this.state.boardSelected}></div>
            </div>
          </div>
        )
    }

    showBoard(board) {
        this.setState({boardSelected: board});
    }
}

export default MainDashboard
