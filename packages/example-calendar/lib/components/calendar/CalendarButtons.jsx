import React, { Component } from 'react'

export default class CalendarButtons extends Component {
    constructor(props) {
        super(props)
        this.handleShowClick = this.handleShowClick.bind(this)
        this.handleDeleteClick = this.handleDeleteClick.bind(this)
    }

    handleShowClick(e) {
        return this.props.showClick(e)
    }

    handleDeleteClick(e) {
        return this.props.deleteClick(e)
    }

    render() {
        return (
            <div className="buttons">
                <button onClick={this.handleShowClick}>
                    <legend>Show</legend>
                </button>
                <button onClick={this.handleDeleteClick}>
                    <legend>Delete</legend>
                </button>
            </div>
        )
    }
}
