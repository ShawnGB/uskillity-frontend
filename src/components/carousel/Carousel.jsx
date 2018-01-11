import React from 'react';
import { Carousel } from 'react-bootstrap';

export class CustomCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
        this.state = {
            index: 0,
            direction: null
        };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
            index: selectedIndex,
            direction: e.direction
        });
    }

    render() {
        return (
            <Carousel
                activeIndex={this.state.index}
                direction={this.state.direction}
                onSelect={this.handleSelect}
                style={this.props.style}
            >
            {this.props.items.map((item, i) => (
                <Carousel.Item key={i}>
                    { item }
                </Carousel.Item>))}
            </Carousel>
        );
    }
}
