import InvalidArgumentException from './InvalidArgumentException'
import Day from './Day'

/**
 * @class {DrawLine}
 * @desc Линии бронирования на календаре
 */
export default class DrawLine {
    constructor(opts) {
        opts = opts || {}
        if (opts.startedAt && !(opts.startedAt instanceof Day)) {
            opts.startedAt = new Day(opts.startedAt)
        }
        if (opts.finishedAt && !(opts.finishedAt instanceof Day)) {
            opts.finishedAt = new Day(opts.finishedAt)
        }
        this.startedAt = opts.startedAt || null
        this.finishedAt = opts.finishedAt || null
        this.text = opts.description || "DrawLines Instance"
        this.status = this.startedAt instanceof Day
            ? this.finishedAt instanceof Day
                ? DrawLine.STATUS_FINISH
                : DrawLine.STATUS_BEGIN
            : DrawLine.STATUS_NULL
    }

    /**
     * Геттер
     *
     * @var STATUS_BEGIN - статус
     *
     * @return {String}
     */
    static get STATUS_BEGIN() {
        return 'begin'
    }

    /**
     * Геттер
     *
     * @var STATUS_FINISH - статус
     *
     * @return {String}
     */
    static get STATUS_FINISH() {
        return 'finish'
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
            case DrawLine.STATUS_FINISH:
                this.startedAt = null
                this.finishedAt = null
                this.status = DrawLine.STATUS_NULL
                break
            case DrawLine.STATUS_BEGIN:
                if (value.get() > this.startedAt.get()) {
                    this.finishedAt = value
                    this.status = DrawLine.STATUS_FINISH
                } else {
                    this.finishedAt = this.startedAt.copy()
                    this.startedAt = value
                    this.status = DrawLine.STATUS_FINISH
                }
                break
            default:
                this.startedAt = value
                this.status = DrawLine.STATUS_BEGIN
                break
        }

        return this
    }

    /**
     * Проверяет на вхождение в отрезок выбранного элемента
     *
     * @var {Day} value - день
     *
     * @return {Boolean}
     */
    isEmptyFor(item) {
        return this.status !== DrawLine.STATUS_FINISH
            || item.get() < this.startedAt.get()
            || item.get() > this.finishedAt.get()
    }
}
