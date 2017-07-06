import React, { Component } from 'react'
import { withApollo, compose } from 'react-apollo';
import { Components, withNew, withDocument, getFragment } from 'meteor/vulcan:core'
import CalendarCollection from '../../modules/calendar/collection'

class CalendarButtons extends Component {
    constructor(props) {
        super(props)
        this.handleShowClick = this.handleShowClick.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    /**
     * Обработчик на клик - показать информацию о бронировании
     *
     * @param {Event} e
     *
     * @return {null}
     */
    handleShowClick(e) {
        return this.props.showClick(e)
    }

    /**
     * Обработчик на клик - удалить бронирование
     *
     * @param {Event} e
     *
     * @return {null}
     */
    handleDeleteClick(e) {
        return this.props.deleteClick(e)
    }

    /**
     * Обработчик на клик - добавить бронирование
     *
     * @param {Event} e
     *
     * @return {null}
     */
    handleAddClick(e) {
        return this.props.addClick(e, {
            document: this.props.document
            , newMutation: this.props.newMutation
        })
    }

    /**
     * Событие, при изменении описания бронирования
     *
     * @param {Event} e
     *
     * @return {null}
     */
    handleChange(e) {
        return this.props.onTextChange(e)
    }

    /**
     * @inheritdoc
     */
    render() {
        let editableButtons = null
            , showableButtons = null
        if (this.props.editableButtons) {
            editableButtons = [
                <li key="1"><button className="btn btn-success" key="0" onClick={this.handleAddClick}>
                    Add
                </button></li>,
                <li key="2"><textarea className="form-control" onChange={this.handleChange} key="1" id="description" type="text" placeholder="Краткое описание брони...">
                </textarea></li>,
                <li key="3"><button className="btn btn-danger" key="2" onClick={this.handleDeleteClick}>
                    Delete
                </button></li>,
            ]
        }
        if (this.props.showableButtons) {
            showableButtons = [
                <li key="4"><button className="btn btn-default" key="0" onClick={this.handleShowClick}>
                    Show
                </button></li>
            ]
        }
        return (
            <ul className="nav nav-pills">
                {editableButtons}
                {showableButtons}
            </ul>
        )
    }
}

const options = {
    collection: CalendarCollection
    , fragment: getFragment('CalendarItemFragment')
}
const queryOptions = {
    collection: CalendarCollection
    , fragment: getFragment('CalendarItemFragment')
}

/** оборачиваем функцией обреткой для добавления newMutation */
export default compose(withNew(options), withDocument(queryOptions))(CalendarButtons)
