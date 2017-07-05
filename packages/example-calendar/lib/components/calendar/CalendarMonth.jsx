import React, { Component } from 'react';
import Calendar, { Month } from '../../utils/calendar'

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
                className={((item.current ? 'current' : '') + (item.active ? ' active' : '')).trim()}
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
                    && (
                        line.startedAt.get() === item.get()
                        || (
                            line.finishedAt
                            && item.get() >= line.startedAt.get()
                            && line.finishedAt.get() >= item.get()
                        )
                    )
                ) {
                    item.active = !item.active
                }
            })
            return item
        })
    }

    get currentMonth() {
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь',
        ]

        return months[this.state.calendarItem.currentMonth]
    }

    get currentYear() {
        return this.state.calendarItem.currentYear
    }

    /**
     * рендерим шапку календаря
     *
      @return {ReactComponent}
     */
    get header() {
        return (
            <tr>
                <td>{this.currentMonth}, {this.currentYear}</td>
            </tr>
        )
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <tbody>{this.monthItems}</tbody>
        );
    }
}

export default CalendarMonth;
