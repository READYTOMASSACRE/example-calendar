import React, { Component } from 'react'
import Calendar, { Day, DrawLine } from '../../utils/calendar'
import { Components, withList, withNew, withCurrentUser, Loading, getFragment } from 'meteor/vulcan:core'
import CalendarCollection from '../../modules/calendar/collection'
// import Calendar, { Day, DrawLine } from '../utils/calendar' //client
import CalendarHeader from './CalendarHeader'
import CalendarDay from './CalendarDay'
import CalendarMonth from './CalendarMonth'
import CalendarButtons from './CalendarButtons'
import CalendarModal from './CalendarModal'

const SERVER = 1
    , CLIENT = 0
    , ENVIROMENT = SERVER

/**
 * @inheritdoc
 */
class CalendarComponent extends Component {
    /**
     * @inheritdoc
     */
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.handleToggleView = this.handleToggleView.bind(this)
        this.selectItem = this.selectItem.bind(this)

        this.drawLineShow = this.drawLineShow.bind(this)
        this.drawLineAdd = this.drawLineAdd.bind(this)
        this.drawLineUpdate = this.drawLineUpdate.bind(this)
        this.drawLineDelete = this.drawLineDelete.bind(this)
        this.drawLineTextChange = this.drawLineTextChange.bind(this)

        let lines = []
            , results = props.results
        if (results && results instanceof Array) {
            results.map(item => {
                lines.push(new DrawLine(item))
                return item
            })
        }

        this.state = {
            calendar: new Calendar(props.date || new Date())
            , lines: lines
            , editableButtons: false
            , showableButtons: false
            , currentDrawLine: null
            , toggleModal: false
        }
    }

    /**
     * обрабатывает клик смены дня/месяца
     */
    handleClick(e, direction) {
        if (direction === 'left') {
            this.state.calendar.prev()
        } else {
            this.state.calendar.next()
        }

        this.setState((prevState, props) => {
            return {
                calendar: prevState.calendar
            }
        })
    }

    /**
     * обрабатывает клик переключения вида
     */
    handleToggleView(e, view) {
        this.state.calendar.setCurrent(view)
        this.setState((prevState, props) => {
            return {
                calendar: prevState.calendar
            }
        })
    }

    /**
     * обрабатывает клик смены отображения дня/месяца
     *
     * @param {Event} e
     * @param {String} type
     */
    handleChangeType(e, type) {
        this.state.calendar.setCurrent(type)
    }

    /**
     * обрабатывает клик
     *
     * @param {Event} e
     * @param {Day} selectedItem
     * @param {Integer|null} hour
     */
    selectItem(e, selectedItem, hour) {
        let currentDrawLine= this.state.currentDrawLine
            , editableButtons = false
            , showableButtons = true

        if (typeof hour !== 'undefined') {
            selectedItem.get().setHours(hour)
        }

        let line = this.findLine(selectedItem.get())

        if (line) {
            // ячейка не пустая
            currentDrawLine = line
        } else {
            // ячейка пустая
            if (
                !currentDrawLine
                || (
                    currentDrawLine
                    && currentDrawLine.status !== DrawLine.STATUS_INIT
                )
            ) {
                // начинаем рисовать линию
                currentDrawLine = new DrawLine({ startedAt: selectedItem })
            } else {
                // заканчиваем рисовать линию
                let copiedDrawLine = currentDrawLine.copy()
                if (this.checkRoad(copiedDrawLine.change(selectedItem))) {
                    currentDrawLine.change(selectedItem)
                } else {
                    currentDrawLine = null
                }
            }
            editableButtons = true
        }

        // обновляем статус
        this.setState((prevState, props) => {
            return {
                lines: prevState.lines
                , currentDrawLine: currentDrawLine
                , editableButtons: editableButtons
                , showableButtons: showableButtons
                , toggleModal: false
            }
        })
    }

    /**
     * Находит бронь по дате
     *
     * @param {Date} date
     *
     * @return {DrawLine}
     *
     * @throws {Error}
     */
    findLine(date) {
        if (!(date instanceof Date)) {
            throw new Error('Param must be instance of Date')
        }

        return this.state.lines.find(item => item.isDateInRange(date))
    }

    /**
     * Проверяет валидность выбранного отрезка
     *
     * @param {DrawLine} line
     *
     * @return {Boolean}
     *
     * @throws {Error}
     */
    checkRoad(line) {
        if (!(line instanceof DrawLine)) {
            throw new Error('Param must be instance of DrawLine')
        }

        return !this.state.lines.find(item => line.isIntersectWith(item))
    }

    /**
     * добавляет новую бронь
     *
     * @param {Event} e
     */
    drawLineAdd(e, {document, newMutation}) {
        let result = {
            startedAt: this.state.currentDrawLine.startedAt.get().toString()
            , finishedAt: (
                    this.state.currentDrawLine.finishedAt instanceof Day
                    && this.state.currentDrawLine.finishedAt.get().toString()
                )
                || this.state.currentDrawLine.startedAt.get().toString()
            , description: this.state.currentDrawLine.description
        }

        if (result) {
            newMutation({ document: result }).then(_res => {
                let res = _res.data.calendarNewItem
                    , drawLine = new DrawLine(res)
                    , lines = this.state.lines
                lines.push(drawLine)
                this.setState((prevState, props) => {
                    return {
                        lines: lines
                        , currentDrawLine: drawLine
                        , editableButtons: false
                        , showableButtons: true
                    }
                })
            })
        }
    }

    /**
     * меняет текст у брони
     *
     * @param {Event} e
     */
    drawLineTextChange(e) {
        if (this.state.currentDrawLine) {
            let currentDrawLine = this.state.currentDrawLine
            currentDrawLine.description = e.target.value.trim()
            this.setState((prevState, props) => {
                return {
                    currentDrawLine: currentDrawLine
                }
            })
        }

    }

    /**
     * изменяет бронь
     *
     * @param {Event} e
     */
    drawLineUpdate(e) {
        return null
    }

    /**
     * удаляет бронь
     *
     * @param {Event} e
     */
    drawLineDelete(e) {
        if (
            this.state.currentDrawLine
            && this.state.currentDrawLine.status !== DrawLine.STATUS_PUSHED
        ) {
            this.setState((prevState, props) => {
                return {
                    currentDrawLine: null
                    , toggleModal: false
                    , showableButtons: false
                    , editableButtons: false
                }
            })
        }
    }

    /**
     * показывает бронь
     *
     * @param {Event} e
     */
    drawLineShow(e) {
        this.setState((prevState, props) => {
            return {
                toggleModal: !prevState.toggleModal
            }
        })
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <div className="calendar">
                <div style={{padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc'}}>

                    {ENVIROMENT === SERVER ? <Components.AccountsLoginForm /> : null}

                </div>
                <div className="row">
                    <div className="col-md-4">
                        {
                            /* Render Header */
                            <CalendarHeader
                                toggle={this.handleClick}
                                toggleView={this.handleToggleView}
                                calendarItem={this.state.calendar.current}
                            />
                        }
                    </div>
                    <div className="col-md-8">
                        {
                            /* Render buttons */
                            <CalendarButtons
                                addClick={this.drawLineAdd}
                                showClick={this.drawLineShow}
                                deleteClick={this.drawLineDelete}
                                onTextChange={this.drawLineTextChange}
                                editableButtons={this.state.editableButtons}
                                showableButtons={this.state.showableButtons}
                                drawLines={this.state.lines}
                                currentDrawLine={this.state.currentDrawLine}
                            />
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        {
                            /* Render Body */
                            this.state.calendar.current instanceof Day
                                ? <CalendarDay
                                    select={this.selectItem}
                                    drawLines={this.state.lines}
                                    currentDrawLine={this.state.currentDrawLine}
                                    calendarItem={this.state.calendar.current}
                                />
                                : <CalendarMonth
                                    select={this.selectItem}
                                    drawLines={this.state.lines}
                                    currentDrawLine={this.state.currentDrawLine}
                                    calendarItem={this.state.calendar.current}
                                />
                        }
                    </div>
                </div>
                {
                    /* Render modal */
                    this.state.toggleModal
                        ? <CalendarModal currentDrawLine={this.state.currentDrawLine} />
                        : null
                }
            </div>
        );
    }
}

const options = {
    collection: CalendarCollection
        , fragmentName: 'CalendarItemFragment'
        , limit: 50
}

export default withList(options)(withCurrentUser(CalendarComponent));
