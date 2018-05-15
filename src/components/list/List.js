import React, {
    Component
} from 'react';

import cardsService from '../../services/cardsService';
import './list.css';
import Card from '../card/Card';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {cards: [], addCardValue: '', listId: ''};
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.moveCardToList = this.moveCardToList.bind(this);
    }
    componentDidMount() {        
        this.getCards(this.props.list.id)
    }
    render() {
        if (this.state.cards.length) {
            if(this.state.listId != this.props.list.id) {
                this.getCards(this.props.list.id);
                return(<div>Loading...</div>);
            }
            let cards = this.state.cards.map(card => {
                return <Card key={card.id} card={card} moveCard={this.moveCardToList} />
            })
            return(
                <div listid={this.props.list.id} className="d-flex flex-column border mr-2 list-component">
                    {cards}
                    <input placeholder="Add a card" type="text" value={this.state.addCardValue} onBlur={this.handleOnBlur} onChange={this.handleChangeInput} onKeyPress={this._handleKeyPress}></input>
                    <span className={this.state.addCardValue.length ? 'd-block':'d-none'}>Press enter to add card</span>
                </div>
            )
        }
        return (<div> Loading...</div>)
    }

    moveCardToList(cardId, listId) {
        cardsService.moveCard(cardId, listId).then(response => {
            this.setState((prevState) => {
                cards: prevState.cards.filter(card => {return card.id != response.data.id})
            })
        });
    }

    getCards(listId) {
        cardsService.getCards(listId).then(response => {
            this.setState({cards: response.data, listId: listId});
        })
    }

    handleOnBlur(e) {
        this.setState({addCardValue: ''});
    }

    handleChangeInput(e) {
        this.setState({addCardValue: e.target.value});
    }

    _handleKeyPress(e) {
    
        if (e.key === 'Enter') {
            cardsService.postCard(this.props.list.id, this.state.addCardValue).then(response=> {                
                this.setState((prevState, props) => ({
                    cards: prevState.cards.concat(response.data),
                    addCardValue: ''
                  }));

            });
        }
          
    }
}

export default List