import InvalidArgumentException from './InvalidArgumentException'

/**
 * @class {Day}
 * @desc Класс, реализующий функционал для работы с датой, как с днем
 */
export default class Day {
    constructor(d) {
        this.active = false
        this.change(d || new Date())
    }

    /**
     * Переводит состояние объекта на день вперед
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Day} - текущий экземпляр
     */
    next(step) {
        return this.change(new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() + (step || 1)))
    }

    /**
     * Переводит состояние объекта на день назад
     *
     * @param {Integer} step - на сколько свдинуть, по умолчанию 1
     *
     * @return {Day} - текущий экземпляр
     */
    prev(step) {
        return this.change(new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() - (step || 1)))
    }

    /**
     * Изменяет состояние объекта
     *
     * @param {mixed} value - Значение
     *
     * @return {Day}
     *
     * @throws {InvalidArgumentException}
     */
    change(value) {
        if (!(value instanceof Date)) {
            try {
                value = new Date(value)
            } catch (err) {
                throw new InvalidArgumentException(err)
            }
        }
        this.current = new Date().getDate() === value.getDate() && new Date().getMonth() === value.getMonth()
        this.d = value

        return this
    }

    /**
     * Устанавливает на первый день, в зависимости от типа
     *
     * @param {String} type - Тип устанавливаемого значения, по умолчанию Год
     *
     * @return {Day}
     */
    first(type) {
        let date = null
        switch(type) {
            case 'week':
                date = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() - ((this.d.getDay() === 0 ? 7 : this.d.getDay()) - 1))
                break
            case 'month':
                date = new Date(this.d.getFullYear(), this.d.getMonth(), 1)
                break
            default:
                date = new Date(this.d.getFullYear(), 0, 1)
                break
        }

        return this.change(date)
    }

    /**
     * Устанавливает на последний день, в зависимости от типа
     *
     * @param {String} type - Тип устанавливаемого значения, по умолчанию Год
     *
     * @return {Day}
     */
    last(type) {
        let date = null
        switch(type) {
            case 'week':
                date = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() + ( 7 - (this.d.getDay() === 0 ? 7 : this.d.getDay()) ))
                break
            case 'month':
                date = new Date(this.d.getFullYear(), this.d.getMonth() + 1, 0)
                break
            default:
                date = new Date(this.d.getFullYear() + 1, 0, 0)
                break
        }

        return this.change(date)
    }

    /**
     * Устанавливает на текущий день
     *
     * @param {String} type - Тип устанавливаемого значения, по умолчанию Год
     *
     * @return {Day}
     */
    now() {
        return this.change(new Date())
    }

    /**
     * Переопределение примитива valueOf
     *
     * @return {Integer}
     */
    valueOf() {
        return this.d.valueOf()
    }

    /**
     * Переопределение примитива toString
     *
     * @return {String}
     */
    toString() {
        return this.d.toString()
    }

    /**
     * Геттер
     *
     * @return {Date}
     */
    get() {
        return this.d
    }

    /**
     * Геттер
     *
     * @var currentDay - Текущий день
     *
     * @return {Integer}
     */
    get currentDay() {
        return this.d.getDate()
    }

    /**
     * Геттер
     *
     * @var currentDay - Текущий месяц
     *
     * @return {Integer}
     */
    get currentMonth() {
        return this.d.getMonth()
    }

    /**
     * Геттер
     *
     * @var currentDay - Текущий день
     *
     * @return {Integer}
     */
    get currentYear() {
        return this.d.getFullYear()
    }

    /**
     * Копирование экземпляра
     *
     * @return {Day}
     */
    copy() {
        return Object.assign(new Day(this.get()), this)
    }

    /**
     * Геттер
     *
     * @var key - идентификатор
     *
     * @return {String}
     */
    get key() {
        return this.currentYear.toString() + this.currentMonth.toString()
    }
}
