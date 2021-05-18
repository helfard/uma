const memo = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: localStorage.getItem('memoFoldFlag') !== null ? JSON.parse(localStorage.getItem('memoFoldFlag')) : true, // 折り畳みのフラグ
        }
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
            localStorage.setItem('memoFoldFlag', JSON.stringify(this.foldFlag));
        },
    },
}).mount('#memo');