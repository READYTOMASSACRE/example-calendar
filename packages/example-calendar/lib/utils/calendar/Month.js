import Day from './Day'
import Week from './Week'
import InvalidArgumentException from './InvalidArgumentException'

/**
 * @class {Month}
 * @desc Класс, реализующий функционал для работы с датой, как с месяцем
 */
export default class Month {
    constructor(instance) {
        this.change(instance || new Week())
    }

    /**
     * Устанавливает на первый месяц текущего года
     *
     * @return {Month}
     */
    first() {
        return this.change(this.get().find(item => item.year === this.currentYear).first('year'))
    }

    /**
     * Устанавливает на последний месяц текущего года
     *
     * @return {Month}
     */
    last() {
        return this.change(this.get().find(item => item.year === this.currentYear).last('year'))
    }

    /**
     * Переводит состояние объекта на месяц вперед
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Month} - текущий экземпляр
     */
    next(step) {
        return this.change(this.get().pop().next(step || 1))
    }

    /**
     * Переводит состояние объекта на месяц назад
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Month} - текущий экземпляр
     */
    prev(step) {
        return this.change(this.get().shift().prev(step || 1))
    }

    /**
     * Устанавливает на текущий месяц
     *
     * @return {Month}
     */
    now() {
        return this.change(new Day())
    }

    /**
     * Изменяет состояние объекта
     *
     * @param {mixed} value - Значение
     *
     * @return {Month}
     */
    change(instance) {
        if (!(instance instanceof Week)) {
            instance = new Week(instance)
        }
        this.currentYear = instance.currentYear
        this.currentMonth = instance.currentMonth
        this.m = this.format(instance)
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
    format(week, weeks) {
        if (!(week instanceof Week)) {
            throw new InvalidArgumentException('First argument must be instance of Week')
        } else if (weeks && !(weeks instanceof Array)) {
            throw new InvalidArgumentException('Second argument must be instance of Array')
        }
        return weeks instanceof Array
            ? weeks.length > 40
                ? week.next() && weeks
                : this.format(week.next(), weeks.concat(week.copy().get()))
            : this.format(week.first('month'), week.copy().get())
    }

    /**
     * Геттер
     *
     * @return {Array}
     */
    get() {
        return this.m
    }

    /**
     * Переопределение примитива toArray
     *
     * @return {Array}
     */
    toArray() {
        return this.m
    }

    /**
     * Копирование экземпляра
     *
     * @return {Month}
     */
    copy() {
        let object = Object.assign(new Month(), this)
            , days = this.get().map(item => item.copy())
        object.m = days

        return object
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
