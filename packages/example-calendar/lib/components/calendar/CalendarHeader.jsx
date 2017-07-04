import React, { Component } from 'react';

class CalendarHeader extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)

    }

    handleClick(e, direction) {
        this.props.toggle(e, direction)
    }

    render() {
        return (
            <thead>
                <tr>
                    <th onClick={e => this.handleClick(e, 'left')}>left</th>
                    <th onClick={e => this.handleClick(e, 'right')}>right</th>
                </tr>
            </thead>
        );
    }
}

export default CalendarHeader;
