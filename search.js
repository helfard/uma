const search = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: localStorage.getItem('searchFoldFlag') !== null ? JSON.parse(localStorage.getItem('searchFoldFlag')) : false, // 折り畳みのフラグ
            checkbox: {
                grades: ['GI', 'GII', 'GIII', 'OP', 'Pre-OP'],
                locations: ['札幌', '函館', '福島', '中山', '東京', '大井', '新潟', '中京', '京都', '阪神', '小倉'],
                grounds: ['芝', 'ダート'],
                ranges: ['短距離', 'マイル', '中距離', '長距離'],
                rotations: ['左', '右', '直線'],
            },
            checked: localStorage.getItem('search') ? JSON.parse(localStorage.getItem('search')) : {
                grades: [],
                locations: ['札幌', '函館', '福島', '中山', '東京', '大井', '新潟', '中京', '京都', '阪神', '小倉'],
                grounds: ['芝', 'ダート'],
                ranges: ['短距離', 'マイル', '中距離', '長距離'],
                rotations: ['左', '右', '直線'],
            },
        }
    },
    computed: {
        dummy: function () {
            let number = 0;
            let checked = this.checked;
            Object.keys(checked).forEach(key => number += checked[key].length);
            localStorage.setItem('search', JSON.stringify(this.checked));
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
            localStorage.setItem('searchFoldFlag', JSON.stringify(this.foldFlag));
        },
    },
}).mount('#search');