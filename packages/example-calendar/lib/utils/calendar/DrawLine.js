import InvalidArgumentException from './InvalidArgumentException'
import Day from './Day'

/**
 * @class {DrawLine}
 * @desc Линии бронирования на календаре
 */
export default class DrawLine {
    constructor(props) {
        let opts = {}
        if (props && typeof props.startedAt !== 'undefined') {
            opts.startedAt = new Day(props.startedAt)
        }
        if (props && typeof props.finishedAt !== 'undefined') {
            opts.finishedAt = new Day(props.finishedAt)
        }
        if (props && typeof props.description !== 'undefined') {
            opts.description = props.description
        }
        this.startedAt = opts.startedAt || null
        this.finishedAt = opts.finishedAt || null
        this.description = opts.description || "DrawLine Instance"
        if (typeof opts.status !== 'undefined') {
            this.status = opts.status
        } else {
            this.status = this.startedAt instanceof Day
                ? this.finishedAt instanceof Day
                    ? DrawLine.STATUS_COMPLETED
                    : DrawLine.STATUS_INIT
                : DrawLine.STATUS_NULL
        }
    }

    /**
     * Геттер
     *
     * @var STATUS_BEGIN - статус
     *
     * @return {String}
     */
    static get STATUS_INIT() {
        return 'init'
    }

    /**
     * Геттер
     *
     * @var STATUS_FINISH - статус
     *
     * @return {String}
     */
    static get STATUS_COMPLETED() {
        return 'completed'
    }

    /**
     * Геттер
     *
     * @var STATUS_NULL - статус
     *
     * @return {String}
     */
    static get STATUS_NULL() {
        return 'null'
    }

    /**
     * Геттер
     *
     * @var STATUS_PUSHED - статус
     *
     * @return {String}
     */
    static get STATUS_PUSHED() {
        return 'pushed'
    }

    /**
     * Изменяет состояние объекта
     *
     * @var {Day} value - день
     *
     * @return {DrawLine}
     */
    change(value) {
        value = value || new Day()
        if (!(value instanceof Day)) {
            throw new InvalidArgumentException('First param must be instance of Day')
        }

        switch (this.status) {
            case DrawLine.STATUS_COMPLETED:
                this.startedAt = null
                this.finishedAt = null
                this.status = DrawLine.STATUS_NULL
                break
            case DrawLine.STATUS_INIT:
                if (value.get() > this.startedAt.get()) {
                    this.finishedAt = value.copy()
                    this.status = DrawLine.STATUS_COMPLETED
                } else {
                    this.finishedAt = this.startedAt.copy()
                    this.startedAt = value
                    this.status = DrawLine.STATUS_COMPLETED
                }
                break
            default:
                this.startedAt = value
                this.status = DrawLine.STATUS_INIT
                break
        }

        return this
    }

    /**
     * Проверяет на вхождение в отрезок выбранного элемента
     *
     * @var {Date} value - дата
     *
     * @return {Boolean}
     */
    isDateInRange(date) {
        return (
            this.startedAt instanceof Day
            && this.startedAt.valueOf() === date.valueOf()
        ) || (
            this.startedAt instanceof Day
            && this.finishedAt instanceof Day
            && date >= this.startedAt.get()
            && this.finishedAt.get() >= date
        )
    }

    /**
     * Проверяет пересечение отрезков
     *
     * @var {DrawLine} item
     *
     * @return {Boolean}
     */
    isIntersectWith(item) {
        return (
            item.startedAt.get() >= this.startedAt.get()
            && this.finishedAt.get() >= item.finishedAt.get()
        ) || (
            item.startedAt.get() >= this.startedAt.get()
            && this.finishedAt.get() >= item.startedAt.get()
            && item.finishedAt.get() >= this.finishedAt.get()
        ) || (
            this.startedAt.get() >= item.startedAt.get()
            && item.finishedAt.get() >= this.startedAt.get()
            && this.finishedAt.get() >= item.finishedAt.get()
        )
    }

    /**
     * Копирует объект
     *
     * @return {DrawLine}
     */
    copy() {
        return Object.assign(new DrawLine(), this)
    }

}
