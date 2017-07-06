import React from 'react';

const CalendarModal = (props) =>
    <div className="_modal">
        {
            typeof props.currentDrawLine !== 'undefined'
                ? props.currentDrawLine.description
                : null
        }
    </div>

export default CalendarModal
