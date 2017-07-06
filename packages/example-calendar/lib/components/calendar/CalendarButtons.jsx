import React, { Component } from 'react'

export default class CalendarButtons extends Component {
    constructor(props) {
        super(props)
        this.handleShowClick = this.handleShowClick.bind(this)
        this.handleAddClick = this.handleAddClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleShowClick(e) {
        return this.props.showClick(e)
    }

    handleDeleteClick(e) {
        return this.props.deleteClick(e)
    }

    handleAddClick(e) {
        return this.props.addClick(e)
    }

    handleChange(e) {
        return this.props.onTextChange(e)
    }

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
