const howto = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: localStorage.getItem('howtoFoldFlag') !== null ? JSON.parse(localStorage.getItem('howtoFoldFlag')) : true, // 折り畳みのフラグ
            messages: [
                '　部屋の中を左回りでぐるぐるする。',
                '　華麗なステップで踊る。',
                '　先輩の愛車での<s>暴走</s>ドライブに付き合わされる。',
                '　フル装備のゴルシに拉致されて月面に行く。',
                '　甘いものの誘惑に負ける。',
                '　刺身にデスソースを投入される。',
                '　ワンマンオペラを4時間半ほど鑑賞する。',
                '　タコ焼きをおかずにごはんを食う。',
                '　カップ麺を食べる。<br>「おいしいっ！　3分でこんな味が！？<br>　ということは、時間を倍にしたらもっとおいしく…」<br>「ならねェよ！！」',
                '「それでねえ……って聞いてる？」<br>「だすけよ〜」',
                '　何者かに一服盛られて体が発光し始める。',
                '　辞書の諦めの文字を塗り潰す。<br>　これが諦めないってことか…？',
                '　全身全霊を貰「あげません！！」',
                '　マックイーンさんについてく、ついてく…。',
                '　わーっしょい！',
                '　えい、えい、むん！',
                // '',
            ],
        }
    },
    computed: {
        dice: function () {
            return new Date().getTime() % this.messages.length;
        },
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
            localStorage.setItem('howtoFoldFlag', JSON.stringify(this.foldFlag));
        },
    },
}).mount('#howto');