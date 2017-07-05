import React, { Component } from 'react';

class CalendarDay extends Component {
    get dayItems() {
        let items = []
            , day = this.props.day
            for(let i = 0; i < 24; i++) {
                items.push(
                    <tr>
                        <td>{i + 1}</td>
                    </tr>
                )
            }

        return items
    }
    render() {
        return (
            <tbody>
                {this.header}
                {this.dayItems}
            </tbody>
        );
    }
}

export default CalendarDay;
