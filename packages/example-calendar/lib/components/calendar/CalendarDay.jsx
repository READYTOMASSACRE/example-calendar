import React, { Component } from 'react';
import { Month, DrawLine, Day } from '../../utils/calendar' // server
// import { Month, DrawLine, Day } from '../utils/calendar' // client

class CalendarDay extends Component {
    constructor(props) {
        super(props)
        this.selectItem = this.selectItem.bind(this)
    }

    selectItem(e, day, hour) {
        return this.props.select(e, day, hour)
    }

    get dayItems() {
        let _items = this.setActivity()
            , items = []
        for (let i = 0; i < 12; i++) {
            let dayOne = _items[i]
                , dayTwo = _items[i+12]
            items.push(
                <tr key={i}>
                    <td
                        onClick={e => this.selectItem(e, this.props.calendarItem.copy(), dayOne.key)}
                        className={((dayOne.current ? 'current' : '') + (dayOne.active ? ' active' : '')).trim()}
                    >
                        {dayOne.key} : 00
                    </td>
                    <td
                        onClick={e => this.selectItem(e, this.props.calendarItem.copy(), dayTwo.key)}
                        className={((dayTwo.current ? 'current' : '') + (dayTwo.active ? ' active' : '')).trim()}
                    >
                        {dayTwo.key}:00
                    </td>
                </tr>
            )
        }

        return items
    }

    /**
     * @inheritdoc
     */
    setActivity() {
        let items = []

        for(let i = 0; i < 24; i++) {
            let active = false,
                day = new Day(this.props.calendarItem.get())
            day.get().setHours(i)

            this.props.drawLines.map(line => {
                /*
                    Проверяем если текущий день еще не имеет active == true
                    и он попадает под range отметки drawLine
                */
                if (line.isDateInRange(day.get())) {
                    active = !active
                }

                return line
            })

            // отдельно проверяем текущую нарисованную линию
            if (
                this.props.currentDrawLine
                && this.props.currentDrawLine instanceof DrawLine
            ) {
                if (
                    !active
                    && this.props.currentDrawLine.isDateInRange(day.get())
                ) {
                    active = !active
                }
            }

            items.push({
                current: false
                , active: active
                , key: i
            })
        }

        return items
    }

    render() {
        return (
            <table className="table table-hover">
                <tbody>
                    {this.header}
                    {this.dayItems}
                </tbody>
            </table>
        );
    }
}

export default CalendarDay;
