import React, { Component } from 'react';
import Calendar, { DrawLine } from '../../utils/calendar'
import CalendarHeader from './CalendarHeader'
import CalendarBody from './CalendarBody'
import CalendarButtons from './CalendarButtons'
import CalendarModal from './CalendarModal'
import { Components, withList, withCurrentUser, Loading, getFragment } from 'meteor/vulcan:core';
import CalendarCollection from '../../modules/calendar/collection'

class CalendarComponent extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.selectItem = this.selectItem.bind(this)
        this.showDrawLineText = this.showDrawLineText.bind(this)
        this.deleteDrawLine = this.deleteDrawLine.bind(this)

        let calendar = new Calendar(props.date || new Date())
            , line = props.results.slice(0, 1).pop()
        this.state = {
            calendar: calendar
            , line: props.line || new DrawLine({startedAt: line.startedAt, finishedAt: line.finishedAt, description: line.description})
            , toggleButtons: false
            , toggleModal: false
        }
    }

    handleClick(e, direction) {
        if (direction === 'left') {
            this.state.calendar.prev()
        } else {
            this.state.calendar.next()
        }
        this.setActive()
    }

    componentDidMount() {
        this.setActive()
    }

    selectItem(e, selectedItem) {
        let line = this.state.line
            , toggleButtons = false
        if (line.isEmptyFor(selectedItem)) {
            line.change(selectedItem)
        } else {
            toggleButtons = !toggleButtons
        }
        this.setState((prevState, props) => {
            return {
                toggleButtons: toggleButtons
            }
        })
        this.setActive(line)
    }

    setActive(line) {
        line = line || this.state.line
        this.state.calendar.current.get().map(item => {
            item.active = false
            return item
        })
        switch(line.status) {
            case 'begin':
                this.state.calendar.current.get().map(item => {
                    if (line.startedAt === item) {
                        item.active = !item.active
                    }
                    return item
                })
                break
            case 'finish':
                this.state.calendar.current.get().map(item => {
                    if (
                        item.get() >= line.startedAt.get()
                        && line.finishedAt.get() >= item.get()
                    ) {
                        item.active = !item.active
                    }
                    return item
                })
                break
            default:
                break
        }

        this.setState((prevState, props) => {
            return {
                calendar: prevState.calendar
                    , line: line
            }
        })
    }

    showDrawLineText(e) {
        this.setState((prevState, props) => {
            return {
                toggleModal: !prevState.toggleModal
            }
        })
    }

    deleteDrawLine() {
        console.log('delete')
        return null
    }

    render() {
        const items = this.state.calendar.current.get()
        let buttons = null
            , modal = null
        if (this.state.toggleButtons) {
            buttons = <CalendarButtons showClick={this.showDrawLineText} deleteClick={this.deleteDrawLine} />
        }
        if (this.state.toggleModal) {
            modal = <CalendarModal text={this.state.line.text} />
        }
        return (
            <div className="calendar">
                <div style={{padding: '20px 0', marginBottom: '20px', borderBottom: '1px solid #ccc'}}>

                  <Components.AccountsLoginForm />

                </div>
                <table>
                    <CalendarHeader toggle={this.handleClick}/>
                    <CalendarBody select={this.selectItem} items={items} />
                </table>
                {buttons}
                {modal}
                {
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
