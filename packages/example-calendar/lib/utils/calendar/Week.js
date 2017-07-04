import Day from './Day'
import InvalidArgumentException from './InvalidArgumentException'

/**
 * @class {Week}
 * @desc Класс, реализующий функционал для работы с датой, как с неделей
 */
export default class Week {
    constructor(instance) {
        this.change(instance || new Day())
    }

    /**
     * Устанавливает на первый день недели, в зависимости от типа
     *
     * @param {String} type - Тип устанавливаемого значения, по умолчанию Год
     *
     * @return {Week}
     */
    first(type) {
        let day = null
        switch(type) {
            case 'month':
                day = this.get().find(item => item.currentMonth === this.currentMonth).first('month')
                break
            default:
                day = this.get().find(item => item.currentMonth === this.currentMonth).first('year')
                break
        }

        return this.change(day)
    }

    /**
     * Устанавливает на последний день недели, в зависимости от типа
     *
     * @param {String} type - Тип устанавливаемого значения, по умолчанию Год
     *
     * @return {Week}
     */
    last(type) {
        let day = null
        switch(type) {
            case 'month':
                day = this.get().find(item => item.currentMonth === this.currentMonth).last('month')
                break
            default:
                day = this.get().find(item => item.currentMonth === this.currentMonth).last('year')
                break
        }

        return this.change(day)
    }

    /**
     * Переводит состояние объекта на неделю вперед
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Week} - текущий экземпляр
     */
    next(step) {
        return this.change(this.get().pop().next((step || 1) * 7))
    }

    /**
     * Переводит состояние объекта на неделю назад
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Week} - текущий экземпляр
     */
    prev(step) {
        return this.change(this.get().shift().prev((step || 1) * 7))
    }

    /**
     * Устанавливает на текущую неделю
     *
     * @return {Week}
     */
    now() {
        return this.change(new Day())
    }

    /**
     * Изменяет состояние объекта
     *
     * @param {mixed} value - Значение
     *
     * @return {Week}
     */
    change(instance) {
        if (!(instance instanceof Day)) {
            instance = new Day(instance)
        }
        this.currentMonth = instance.currentMonth
        this.currentYear = instance.currentYear
        this.w = this.format(instance)
        return this
    }

    /**
     * Изменяет состояние объекта
     *
     * @param {Day} day
     * @param {Array} days
     *
     * @return {Array}
     */
    format(day, days) {
        if (!(day instanceof Day)) {
            throw new InvalidArgumentException('First argument must be instance of Day')
        } else if (days && !(days instanceof Array)) {
            throw new InvalidArgumentException('Second argument must be instance of Array')
        }
        return days instanceof Array
            ? days.length > 6
                ? day.next() && days
                : this.format(day.next(), days.push(day.copy()) && days)
            : this.format(day.first('week'), [day.copy()])
    }

    /**
     * Геттер
     *
     * @return {Array}
     */
    get() {
        return this.w
    }

    /**
     * Копирование экземпляра
     *
     * @return {Week}
     */
    copy() {
        let object = Object.assign(new Week(), this)
            , days = this.get().map(item => item.copy())
        object.w = days

        return object
    }

    /**
     * Переопределение примитива toArray
     *
     * @return {Array}
     */
    toArray() {
        return this.w
    }

    /**
     * Геттер
     *
     * @var key - Идентификатор
     *
     * @return {String}
     */
    get key() {
        return this.currentYear.toString() + this.currentMonth.toString()
    }
}
