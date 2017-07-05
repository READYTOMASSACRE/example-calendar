import React, { Component } from 'react'
import Calendar, { Month, Week, Day, DrawLine } from '../../utils/calendar'
import { Components, withList, withCurrentUser, Loading, getFragment } from 'meteor/vulcan:core'
import CalendarCollection from '../../modules/calendar/collection'
import CalendarHeader from './CalendarHeader'
import CalendarDay from './CalendarDay'
import CalendarMonth from './CalendarMonth'
import CalendarButtons from './CalendarButtons'
import CalendarModal from './CalendarModal'

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
        this.selectItem = this.selectItem.bind(this)

        this.drawLineShow = this.drawLineShow.bind(this)
        this.drawLineAdd = this.drawLineAdd.bind(this)
        this.drawLineUpdate = this.drawLineUpdate.bind(this)
        this.drawLineDelete = this.drawLineDelete.bind(this)

        let lines = []
        if (props.results && props.results instanceof Array) {
            props.results.map(item => {
                lines.push(new DrawLine(item))
            })
        }

        this.state = {
            calendar: new Calendar(props.date || new Date())
            , lines: lines
            , toggleButtons: false
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
     */
    selectItem(e, selectedItem) {
        let line = this.findLine(selectedItem.get())
            , drawLine = this.state.currentDrawLine

        if (!line) {

        }

        this.setState((prevState, props) => {
            return {
                lines: lines
                , toggleButtons: toggleButtons
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

        return this.state.lines.find(item => item.startedAt.get() === date
            || (
                item.finishedAt
                && date >= item.startedAt.get()
                && item.finishedAt.get() <= date
            )
        )
    }

    /**
     * добавляет новую бронь
     */
    drawLineAdd(e) {
        console.log('delete')
        return null
    }

    /**
     * изменяет бронь
     */
    drawLineUpdate(e) {
        console.log('delete')
        return null
    }

    /**
     * удаляет бронь
     */
    drawLineDelete(e) {
        console.log('delete')
        return null
    }

    /**
     * показывает бронь
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

                  <Components.AccountsLoginForm />

                </div>
                <table className="table table-hover">
                    {/* Render Header */}
                    <CalendarHeader
                        toggle={this.handleClick}
                        calendarItem={this.state.calendar.current}
                    />
                    {
                        /* Render Body */
                        this.state.calendar.current instanceof Day
                            ? <CalendarDay
                                select={this.selectItem}
                                drawLines={this.state.lines}
                                calendarItem={this.state.calendar.current}
                            />
                            : <CalendarMonth
                                select={this.selectItem}
                                drawLines={this.state.lines}
                                calendarItem={this.state.calendar.current}
                            />
                    }
                </table>
                {
                    /* Render buttons */
                    this.state.toggleButtons
                        ? <CalendarButtons
                            addClick={this.drawLineAdd}
                            showClick={this.drawLineShow}
                            deleteClick={this.drawLineDelete}
                        />
                        : null
                }
                {
                    /* Render modal */
                    this.state.toggleModal
                        ? <CalendarModal text={this.state.line.text} />
                        : null
                }
                {
                    /* Render form Add Draw Line */
                    CalendarCollection.options.mutations.new.check(this.props.currentUser)
                        ? <Components.SmartForm
                          collection={CalendarCollection}
                          mutationFragment={getFragment('CalendarItemFragment')}
                        />
                        : null
                }
            </div>
        );
    }
}

const options = {
    collection: CalendarCollection
        , fragmentName: 'CalendarItemFragment'
        , limit: 5
}

export default withList(options)(withCurrentUser(CalendarComponent));
