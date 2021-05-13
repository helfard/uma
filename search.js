const search = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: false, // 折り畳みのフラグ
            checkbox: {
                grades: ['GI', 'GII', 'GIII', 'OP', 'Pre-OP'],
                locations: ['札幌', '函館', '福島', '中山', '東京', '大井', '新潟', '中京', '京都', '阪神', '小倉'],
                grounds: ['芝', 'ダート'],
                ranges: ['短距離', 'マイル', '中距離', '長距離'],
                rotations: ['左', '右', '直線'],
            },
            checked: {
                grades: [],
                locations: [],
                grounds: [],
                ranges: [],
                rotations: [],
            },
        }
    },
    computed: {
        dummy: function () {
            let number = 0;
            let checked = this.checked;
            Object.keys(checked).forEach(key => number += checked[key].length);
            log('Search -> Result');
            result.setSearch(checked);
            return number;
        },
    },
    methods: {
        checkAll: function (order) {
            // 全チェック/解除
            let ary = this.checkbox[order].filter(value => !this.checked[order].includes(value));
            this.checked[order] = ary.length ? this.checked[order].concat(ary) : [];
        },
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
        },
    },
    mounted: function () {
        // 初期化
        // 後でローカルストレージからの読み込みに置き換える
        let checkbox = this.checkbox;
        let checked = this.checked;
        Array.prototype.push.apply(checked.grades, checkbox.grades.slice(0, 3));
        Array.prototype.push.apply(checked.locations, checkbox.locations);
        Array.prototype.push.apply(checked.grounds, checkbox.grounds);
        Array.prototype.push.apply(checked.ranges, checkbox.ranges);
        Array.prototype.push.apply(checked.rotations, checkbox.rotations);
    },
}).mount('#search');