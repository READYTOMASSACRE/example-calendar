import React, { Component } from 'react';
import { Month, DrawLine } from '../../utils/calendar' // server
// import { Month, DrawLine } from '../utils/calendar' // client
import DayNames from './DayNames'

const SERVER = 1
    , CLIENT = 0
    , ENVIROMENT = SERVER
/**
 * @inheritdoc
 */
class CalendarMonth extends Component {
    /**
     * @inheritdoc
     */
    constructor(props) {
        super(props)
        if (
            !this.props.select
            || typeof this.props.select !== 'function'
        ) {
            throw new Error('ComponentMonth must have select function')
        }

        this.state = {
            calendarItem: props.calendarItem || new Month()
        }
    }
    /**
     * рендерим дни месяца
     *
     * @return {ReactComponent}
     */
    get monthItems() {
        let _items = this.setActivity().map((item,) =>
            /* подсвечиваем текущий день + дни, у которых стоит active == true */
            <td
                key={item.currentDay + item.currentMonth}
                className={('text-center ' + (item.current ? 'current' : '') + (item.active ? ' active' : '')).trim()}
                onClick={e => this.props.select(e, item)}
            >
                {item.currentDay}
            </td>
        )
        let items = []
            , step = 0

        /** собираем дни месяца в массив размером [7,6] */
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
    setActivity() {
        return this.props.calendarItem.get().map(item => {
            item.active = false
            this.props.drawLines.map(line => {
                /*
                    Проверяем если текущий день еще не имеет active == true
                    и он попадает под range отметки drawLine
                */
                if (
                    !item.active
                    && line.isDateInRange(item.get())
                ) {
                    item.active = !item.active
                }

                return line
            })

            // отдельно проверяем текущую нарисованную линию
            if (
                this.props.currentDrawLine
                && this.props.currentDrawLine instanceof DrawLine
            ) {
                if (
                    !item.active
                    && this.props.currentDrawLine.isDateInRange(item.get())
                ) {
                    item.active = !item.active
                }
            }

            return item
        })
    }

    /**
     * рендерим шапку календаря
     *
      @return {ReactComponent}
     */
    get header() {
        return (
            <tr>
                <td>123</td>
            </tr>
        )
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <table className="table table-hover">
                <DayNames />
                <tbody>{this.monthItems}</tbody>
            </table>
        );
    }
}

export default CalendarMonth;
