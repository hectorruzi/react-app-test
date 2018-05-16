import React, {
    Component
} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './card.css';
class Card extends Component {
    constructor(props) {
        super(props);    
    }
    render() {
        return(
            <Draggable draggableId={this.props.card.id} index={this.props.index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                <div cardid={this.props.card.id} className="card-component">{this.props.card.name}</div>
              </div>)}
              </Draggable>
            
        )
    }
    
}

export default Card
