import React, {
    Component
} from 'react';
import './card.css';
class Card extends Component {
    constructor(props) {
        super(props);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragStar = this.handleDragStar.bind(this);
    }
    render() {
        return(
            <div onDragOver={this.handleDragOver} onDragEnd={this.handleDragEnd} onDragLeave={this.handleDragLeave} onDragStart={this.handleDragStar} cardid={this.props.card.id} draggable="true" onDrag={this.handleDrag} onDrop={this.handleDrop} className="card-component">{this.props.card.name}</div>
        )
    }

    handleDragOver(e) {
        if (e.preventDefault) {
                e.preventDefault(); // Necessary. Allows us to drop.
          }
        
          e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
        
          return false;
    }

    handleDragEnd(e) {
        e.currentTarget.style.opacity = "1";
        
    }

    handleDragStar(e) {
        e.currentTarget.style.opacity = "0.4";
        e.dataTransfer.effectAllowed = 'move';        
    }
   
    handleDrop(e) {
        console.log(e.target)
        
        if (e.stopPropagation) {
            e.stopPropagation(); // Stops some browsers from redirecting.
        }
        this.props.moveCard(e.currentTarget.getAttribute('cardid'), e.target.parentElement.getAttribute('listid'));

    }
}

export default Card
