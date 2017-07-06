import React, { Component } from 'react';
import DayNames from './DayNames'

/**
 * @inheritdoc
 */
class CalendarBody extends Component {
    /**
     * Геттер
     *
     * @return {Array}
     */
    get listItems() {
        let _items = this.props.items.map((item,) =>
            <td
                key={item.currentDay + item.currentMonth}
                className={((item.current ? 'current' : '') + (item.active ? ' active' : '')).trim()}
                onClick={e => this.props.select(e, item)}
            >
                {item.currentDay}
            </td>
        )
        let items = []
            , step = 0
        for(let i = 0; i < 6; i++) {
            step = i * 7
            items.push(
                <tr key={i+1}>
                {_items.slice(step, step + 7)}
                </tr>
            )
        }

        return items
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <tbody>
                <DayNames />
                {this.listItems}
            </tbody>
        )
    }
}

export default CalendarBody;
