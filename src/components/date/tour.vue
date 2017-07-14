<style scoped>
    .ivu-picker-panel-body-wrapper {
        display: inline-block;
    }
    .ivu-picker-panel-body {
        float: none;
        box-shadow: 0 0 15px rgba(0,0,0,0.2);
        border-radius: 5px;
    }
</style>
<template>
    <div :class="classes">
        <div :class="[prefixCls + '-sidebar']" v-if="shortcuts.length">
            <div
                    :class="[prefixCls + '-shortcut']"
                    v-for="shortcut in shortcuts"
                    @click="handleShortcutClick(shortcut)">{{ shortcut.text }}</div>
        </div>
        <div :class="[prefixCls + '-body']">
            <div :class="[datePrefixCls + '-header']">
                <span
                        :class="iconBtnCls('prev', '-double')"
                        @click="prevYear"><Icon type="ios-arrow-left"></Icon></span>
                <span
                        :class="iconBtnCls('prev')"
                        @click="prevMonth"
                        v-show="currentView === 'date'"><Icon type="ios-arrow-left"></Icon></span>
                <span
                        :class="[datePrefixCls + '-header-label']"
                        @click="showYearPicker">{{ yearLabel }}</span>
                <span
                        :class="[datePrefixCls + '-header-label']"
                        @click="showMonthPicker"
                        v-show="currentView === 'date'">{{ monthLabel }}</span>
                <span
                        :class="iconBtnCls('next', '-double')"
                        @click="nextYear"><Icon type="ios-arrow-right"></Icon></span>
                <span
                        :class="iconBtnCls('next')"
                        @click="nextMonth"
                        v-show="currentView === 'date'"><Icon type="ios-arrow-right"></Icon></span>
            </div>
            <div :class="[prefixCls + '-content']">
                <date-table
                        v-show="currentView === 'date'"
                        :year="year"
                        :month="month"
                        :date="date"
                        :selected="value"
                        :selection-mode="selectionMode"
                        :disabled-dates="disabledDates"
                        @on-pick="handleDatePick"></date-table>
                <year-table
                        ref="yearTable"
                        v-show="currentView === 'year'"
                        :year="year"
                        :date="date"
                        :selection-mode="selectionMode"
                        :disabled-dates="disabledDates"
                        @on-pick="handleYearPick"
                        @on-pick-click="handlePickClick"></year-table>
                <month-table
                        ref="monthTable"
                        v-show="currentView === 'month'"
                        :month="month"
                        :date="date"
                        :selection-mode="selectionMode"
                        :disabled-dates="disabledDates"
                        @on-pick="handleMonthPick"
                        @on-pick-click="handlePickClick"></month-table>
            </div>
        </div>
    </div>
</template>
<script>
    import Icon from 'iview/src/components/icon/icon.vue';
    import DateTable from './table.vue';
    import YearTable from 'iview/src/components/date-picker/base/year-table.vue';
    import MonthTable from 'iview/src/components/date-picker/base/month-table.vue';

    import Mixin from 'iview/src/components/date-picker/panel/mixin';
    import Locale from 'iview/src/mixins/locale';

    import { initTimeDate, formatDate } from 'iview/src/components/date-picker/util';

    const prefixCls = 'ivu-picker-panel';
    const datePrefixCls = 'ivu-date-picker';

    export default {
        name: 'DatePicker',
        mixins: [ Mixin, Locale ],
        components: { Icon, DateTable, YearTable, MonthTable },
        props: {
            disabledDates: {}
        },
        data () {
            return {
                prefixCls: prefixCls,
                datePrefixCls: datePrefixCls,
                shortcuts: [],
                currentView: 'date',
                date: initTimeDate(),
                value: [],
                selectionMode: 'day',
                year: null,
                month: null,
                format: 'yyyy-MM-dd'
            };
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}-body-wrapper`,
                    {
                        [`${prefixCls}-with-sidebar`]: this.shortcuts.length
                    }
                ];
            },
            yearLabel () {
                const tYear = this.t('i.datepicker.year');
                const year = this.year;
                if (!year) return '';
                if (this.currentView === 'year') {
                    const startYear = Math.floor(year / 10) * 10;
                    return `${startYear}${tYear} - ${startYear + 9}${tYear}`;
                }
                return `${year}${tYear}`;
            },
            monthLabel () {
                const month = this.month + 1;
                return this.t(`i.datepicker.month${month}`);
            }
        },
        methods: {
            setValue (date) {
                this.value = date;
            },
            resetDate () {
                this.date = new Date(this.date);
            },
            prevYear () {
                if (this.currentView === 'year') {
                    this.$refs.yearTable.prevTenYear();
                } else {
                    this.year--;
                    this.date.setFullYear(this.year);
                    this.resetDate();
                }
            },
            nextYear () {
                if (this.currentView === 'year') {
                    this.$refs.yearTable.nextTenYear();
                } else {
                    this.year++;
                    this.date.setFullYear(this.year);
                    this.resetDate();
                }
            },
            prevMonth () {
                this.month--;
                if (this.month < 0) {
                    this.month = 11;
                    this.year--;
                }
            },
            nextMonth () {
                this.month++;
                if (this.month > 11) {
                    this.month = 0;
                    this.year++;
                }
            },
            showYearPicker () {
                this.currentView = 'year';
            },
            showMonthPicker () {
                this.currentView = 'month';
            },
            handleYearPick(year, close = true) {
                this.year = year;
                if (!close) return;

                this.date.setFullYear(year);
                if (this.selectionMode === 'year') {
                    this.$emit('on-pick', new Date(year, 0, 1));
                } else {
                    this.currentView = 'month';
                }

                this.resetDate();
            },
            handleMonthPick (month) {
                this.month = month;
                const selectionMode = this.selectionMode;
                if (selectionMode !== 'month') {
                    this.date.setMonth(month);
                    this.currentView = 'date';
                    this.resetDate();
                } else {
                    this.date.setMonth(month);
                    this.year && this.date.setFullYear(this.year);
                    this.resetDate();
                    const value = new Date(this.date.getFullYear(), month, 1);
                    this.$emit('on-pick', value);
                }
            },
            handleDatePick (value) {
                if (this.selectionMode === 'day') {
                    this.$emit('on-pick', value);
                    this.date.setFullYear(value.getFullYear());
                    this.date.setMonth(value.getMonth());
                    this.date.setDate(value.getDate());

                    let _value = value.getTime();
                    let index = this.value.indexOf(_value);
                    if (index >= 0) {
                        this.value.splice(index, 1);
                    } else {
                        this.value.push(_value);
                    }

                    this.$emit('on-select-change', this.value.map(t => formatDate(t)));

                    this.date = value;
                    this.year = value.getFullYear();
                    this.month = value.getMonth();
                }
            }
        },
        mounted () {
            if (this.selectionMode === 'month') {
                this.currentView = 'month';
            }

            if (this.date && !this.year) {
                this.year = this.date.getFullYear();
                this.month = this.date.getMonth();
            }
        }
    };
</script>
