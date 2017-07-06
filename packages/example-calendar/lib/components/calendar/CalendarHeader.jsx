import React, { Component } from 'react';
import { Day } from '../../utils/calendar' // server
// import { Day } from '../utils/calendar' // client

class CalendarHeader extends Component {
    /**
     * @inheritdoc
     */
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleToggleView = this.handleToggleView.bind(this)
    }

    /**
     * Обработчик, переключение календаря
     *
     * @param {Event} e
     * @param {String} direction
     *
     * @return {null}
     */
    handleClick(e, direction) {
        this.props.toggle(e, direction)
    }

    /**
     * Обработчик, переключение вида
     *
     * @param {Event} e
     * @param {String} view
     *
     * @return {null}
     */
    handleToggleView(e, view) {
        this.props.toggleView(e, view)
    }

    /**
     * Геттер
     *
     * @return {Array}
     */
    get month() {
        return [
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
    }

    /**
     * @inheritdoc
     */
    render() {
        let title = this.props.calendarItem instanceof Day ? this.props.calendarItem.currentDay + ' ' : ''
        title += this.month[this.props.calendarItem.currentMonth] + ', ' + this.props.calendarItem.currentYear
        return (
            <div>
            <ul className="nav nav-pills">
                <li role="presentation"><button className="btn btn-primary" onClick={e => this.handleClick(e, 'left')}>&lt;</button></li>
                <li role="presentation"><button className="btn btn-primary" onClick={e => this.handleClick(e, 'right')}>&gt;</button></li>
                <li role="presentation"><button className="btn btn-primary" onClick={e => this.handleToggleView(e, 'day')}>Дни</button></li>
                <li role="presentation"><button className="btn btn-primary" onClick={e => this.handleToggleView(e, 'month')}>Месяца</button></li>
            </ul>
            <h3><span className="label label-default">{title}</span></h3>
            </div>
        );
    }
}

export default CalendarHeader;
