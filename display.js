const display = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: true, // 折り畳みのフラグ
            radio: {
                turn: ['非表示', '表示'],
                classes: ['非表示', '全角表示', '半角表示', '省略表示'],
                months: ['非表示', '全表示', '省略表示'],
                names: ['非表示', '全角表示', '半角表示', '省略表示'],
                grades: ['非表示', '全表示', '省略表示'],
                locations: ['非表示', '全表示', '省略表示'],
                grounds: ['非表示', '全角表示', '半角表示', '1文字'],
                distances: ['非表示', '全表示', '省略表示', '距離のみ', '分類のみ', '1文字'],
                courses: ['非表示', '全表示', '左右のみ'],
                fullgate: ['非表示', '表示'],
                require: ['非表示', '表示'],
                rewardss: ['非表示', '全表示', '1位のみ'],
                dropss: ['非表示', '全表示', '省略表示'],
            },
            checked: {
                turn: 1,
                classes: 1,
                months: 1,
                names: 1,
                grades: 1,
                locations: 1,
                grounds: 1,
                distances: 1,
                courses: 1,
                fullgate: 1,
                require: 1,
                rewardss: 1,
                dropss: 0,
            },
        }
    },
    computed: {
        dummy: function () {
            let number = 0;
            let checked = this.checked;
            Object.keys(checked).forEach(key => number += checked[key]);
            log('Display -> Result');
            result.setDisplay(checked);
            log('Display -> Schedule');
            schedule.setDisplay(checked);
            return number;
        },
    },
    methods: {
        toggle: function (order) {
            let number = this.checked[order] + 1;
            if (number >= this.radio[order].length) number = 0;
            this.checked[order] = number;
        },
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
        },
    },
    mounted: function () {
    },
}).mount('#display');
