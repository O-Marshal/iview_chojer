<template>
    <div
            :class="classes"
            @click="handleClick">
        <div :class="[prefixCls + '-header']">
            <span>{{ t('i.datepicker.weeks.sun') }}</span><span>{{ t('i.datepicker.weeks.mon') }}</span><span>{{ t('i.datepicker.weeks.tue') }}</span><span>{{ t('i.datepicker.weeks.wed') }}</span><span>{{ t('i.datepicker.weeks.thu') }}</span><span>{{ t('i.datepicker.weeks.fri') }}</span><span>{{ t('i.datepicker.weeks.sat') }}</span>
        </div>
        <span :class="getCellCls(cell)" v-for="(cell, index) in readCells"><em :index="index">{{ cell.text }}</em></span>
    </div>
</template>
<script>
    import { getFirstDayOfMonth, getDayCountOfMonth } from 'iview/src/components/date-picker/util';
    import { deepCopy } from 'iview/src/utils/assist';
    import Locale from 'iview/src/mixins/locale';

    const prefixCls = 'ivu-date-picker-cells';

    const clearHours = function (time) {
        const cloneDate = new Date(time);
        cloneDate.setHours(0, 0, 0, 0);
        return cloneDate.getTime();
    };

    const dateCurrent = clearHours(new Date());

    const checkSelected = (selected, time) => selected.indexOf(time) >= 0;
    const checkDisbaled = (disables, time) => {
        return time <= dateCurrent || (disables && disables.map(t => clearHours(new Date(t))).indexOf(time) >= 0);
    };

    export default {
        mixins: [ Locale ],
        props: {
            date: {},
            year: {},
            month: {},
            disabledDates: {},
            selected: Array
        },
        data () {
            return {
                prefixCls: prefixCls,
                readCells: []
            };
        },
        watch: {
            cells: {
                handler (cells) {
                    this.readCells = cells;
                },
                immediate: true
            }
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`
                ];
            },
            cells () {
                const date = new Date(this.year, this.month, 1);
                let day = getFirstDayOfMonth(date);    // day of first day
                day = (day === 0 ? 7 : day);
                const today = clearHours(new Date());

                const dateCountOfMonth = getDayCountOfMonth(date.getFullYear(), date.getMonth());
                const dateCountOfLastMonth = getDayCountOfMonth(date.getFullYear(), (date.getMonth() === 0 ? 11 : date.getMonth() - 1));

                let cells = [];
                const cell_tmpl = {
                    text: '',
                    type: '',
                    selected: false,
                    disabled: false,
                    range: false,
                    start: false,
                    end: false
                };
                if (day !== 7) {
                    for (let i = 0; i < day; i++) {
                        const cell = deepCopy(cell_tmpl);
                        cell.type = 'prev-month';
                        cell.text = dateCountOfLastMonth - (day - 1) + i;

                        let prevMonth = this.month - 1;
                        let prevYear = this.year;
                        if (this.month === 0) {
                            prevMonth = 11;
                            prevYear -= 1;
                        }
                        const time = clearHours(new Date(prevYear, prevMonth, cell.text));
                        cell.disabled = checkDisbaled(this.disabledDates, time);
                        cells.push(cell);
                    }
                }

                for (let i = 1; i <= dateCountOfMonth; i++) {
                    const cell = deepCopy(cell_tmpl);
                    const time = clearHours(new Date(this.year, this.month, i));
                    cell.type = time === today ? 'today' : 'normal';
                    cell.text = i;
                    cell.selected = checkSelected(this.selected, time);
                    cell.disabled = checkDisbaled(this.disabledDates, time);
                    cells.push(cell);
                }

                const nextMonthCount = 42 - cells.length;
                for (let i = 1; i <= nextMonthCount; i++) {
                    const cell = deepCopy(cell_tmpl);
                    cell.type = 'next-month';
                    cell.text = i;

                    let nextMonth = this.month + 1;
                    let nextYear = this.year;
                    if (this.month === 11) {
                        nextMonth = 0;
                        nextYear += 1;
                    }
                    const time = clearHours(new Date(nextYear, nextMonth, cell.text));
                    cell.disabled = checkDisbaled(this.disabledDates, time);
                    cells.push(cell);
                }

                return cells;
            }
        },
        methods: {
            getDateOfCell (cell) {
                let year = this.year;
                let month = this.month;
                let day = cell.text;

                const date = this.date;
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const seconds = date.getSeconds();

                if (cell.type === 'prev-month') {
                    if (month === 0) {
                        month = 11;
                        year--;
                    } else {
                        month--;
                    }
                } else if (cell.type === 'next-month') {
                    if (month === 11) {
                        month = 0;
                        year++;
                    } else {
                        month++;
                    }
                }

                return new Date(year, month, day, hours, minutes, seconds);
            },
            handleClick (event) {
                const target = event.target;
                if (target.tagName === 'EM') {
                    const cell = this.cells[parseInt(event.target.getAttribute('index'))];
                    if (cell.disabled) return;

                    const newDate = this.getDateOfCell(cell);
                    this.$emit('on-pick', newDate);
                }
                this.$emit('on-pick-click');
            },
            getCellCls (cell) {
                return [
                    `${prefixCls}-cell`,
                    {
                        [`${prefixCls}-cell-selected`]: cell.selected,
                        [`${prefixCls}-cell-disabled`]: cell.disabled,
                        [`${prefixCls}-cell-today`]: cell.type === 'today',
                        [`${prefixCls}-cell-prev-month`]: cell.type === 'prev-month',
                        [`${prefixCls}-cell-next-month`]: cell.type === 'next-month',
                        [`${prefixCls}-cell-range`]: cell.range && !cell.start && !cell.end
                    }
                ];
            },

        }
    };
</script>
