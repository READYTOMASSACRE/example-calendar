import Day from './Day'
import Week from './Week'
import Month from './Month'
import DrawLine from './DrawLine'

/**
 * @class {Month}
 * @desc Класс, реализующий взаимодействие отдельных классов для работы с датой в себе
 */
export default class Calendar {
    constructor(d, opts) {
        opts = opts || {}
        opts.type = opts.type || 'month'

        let day = new Day(d)
            , week = new Week(d)
            , month = new Month(d)

        this.type = opts.type
        this.day = new Map([
            [
                day.currentYear.toString() + day.currentMonth.toString(),
                day
            ]
        ])
        this.week = new Map([
            [
                week.currentYear.toString() + week.currentMonth.toString(),
                week
            ]
        ])
        this.month = new Map([
            [
                month.currentYear.toString() + month.currentMonth.toString(),
                month
            ]
        ])
        switch(this.type) {
            default:
                this.current = month
                break
        }
    }

    /**
     * Переводит состояние объекта у выбранной сущности вперед
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Calendar} - текущий экземпляр
     */
    next(step) {
        return this.change(this.current.copy().next(step))
    }

    /**
     * Переводит состояние объекта у выбранной сущности назад
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Calendar} - текущий экземпляр
     */
    prev(step) {
        return this.change(this.current.copy().prev(step))
    }

    /**
     * Изменяет состояние объекта
     *
     * @var {mixed} value
     *
     * @return {Calendar}
     */
    change(value) {
        let item = this.get().has(value.key) && this.get().get(value.key)
        if (!item) {
            item = value
            this.get().set(item.key, item)
        }
        this.current = item

        return this
    }

    /**
     * Возвращает коллекцию
     *
     * @return {Map}
     */
    get() {
        let data = null
        switch (this.type) {
            case 'day':
                data = this.day
                break
            case 'week':
                data = this.week
                break
            default:
                data = this.month
                break
        }

        return data
    }

    /**
     * Меняет состояние календаря
     *
     * @param {String} type
     *
     * @return {Calendar}
     */
    setCurrent(type) {
        if (this.type === type) return this
        if (['day', 'week', 'month'].indefOx(type) === -1) {
            throw new Error('Invalid type')
        }

        this.type = type
        if (type === 'day') {
            this.change(this.current.copy().get().pop())
        } else {
            let day = this.current.copy()
            if (!(day instanceof Day)) {
                day = day.pop()
            }
            this.change(type === 'week' && new Week(day) || new Month(day))
        }

        return this
    }
}

export { DrawLine, Month, Week, Day }
