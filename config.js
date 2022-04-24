const config = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            CHARACTERS: Object.keys(MAIN_RACES), // ウマ娘
            races: races,
            addresses: addresses,
            raceSets: raceSets,
            foldFlag: localStorage.getItem('configFoldFlag') !== null ? JSON.parse(localStorage.getItem('configFoldFlag')) : false, // 折り畳みのフラグ
            config: localStorage.getItem('config') ? JSON.parse(localStorage.getItem('config')) : {
                character: 'ダイワスカーレット',
                emphasis: false,
                colorful: true,
                smart: true,
            },
            sharedState: store.state,
        }
    },
    computed: {
        dummy: function () {
            let number = 0;
            let config = this.config;
            number += config.emphasis ? 1 : 0;
            number += config.colorful ? 1 : 0;
            number += config.smart ? 1 : 0;
            localStorage.setItem('config', JSON.stringify(this.config));
            log('Config -> Result');
            result.setConfig(config);
            log('Config -> Schedule');
            schedule.setConfig(config);
            return number;
        },
        dummy2: function () {
            let character = this.config.character;
            let number = character.length;
            let races = this.races;
            let addresses = this.addresses;
            log('Config -> Store');
            store.setMainRaces(character);
            // Make a new track!!ではこの辺どうなるんだろうか？
            if (['ナリタタイシン', 'ビワハヤヒデ'].includes(character)) {
                // この連中は天皇賞（春）が阪神だった
                races[addresses['シニア 天皇賞（春）']].location = '阪神';
                races[addresses['シニア 天皇賞（春）']].locations = ['', '阪神', '阪神'];
                races[addresses['シニア 天皇賞（春）']].side = '外内';
                races[addresses['シニア 天皇賞（春）']].courses = ['', '右 外内', '右'];
            } else {
                // でもチケゾーだと京都になるの納得行かない
                races[addresses['シニア 天皇賞（春）']].location = '京都';
                races[addresses['シニア 天皇賞（春）']].locations = ['', '京都', '京都'];
                races[addresses['シニア 天皇賞（春）']].side = '外';
                races[addresses['シニア 天皇賞（春）']].courses = ['', '右 外', '右'];
            }
            if (['メジロライアン', 'ライスシャワー'].includes(character)) {
                // この連中はシニアの宝塚記念が京都だった
                races[addresses['シニア 宝塚記念']].location = '京都';
                races[addresses['シニア 宝塚記念']].locations = ['', '京都', '京都'];
                races[addresses['シニア 宝塚記念']].side = '外';
                races[addresses['シニア 宝塚記念']].courses = ['', '右 外', '右'];
            } else {
                races[addresses['シニア 宝塚記念']].location = '阪神';
                races[addresses['シニア 宝塚記念']].locations = ['', '阪神', '阪神'];
                races[addresses['シニア 宝塚記念']].side = '内';
                races[addresses['シニア 宝塚記念']].courses = ['', '右 内', '右'];
            }
            if (['ヤエノムテキ'].includes(character)) {
                // クラシックの皐月賞が東京だった
                // オグリ・クリーク・チヨノオー・アルダンも要確認
                races[addresses['クラシック 皐月賞']].location = '東京';
                races[addresses['クラシック 皐月賞']].locations = ['', '東京', '東京'];
                races[addresses['クラシック 皐月賞']].side = '';
                races[addresses['クラシック 皐月賞']].courses = ['', '左', '左'];
            } else {
                races[addresses['クラシック 皐月賞']].location = '中山';
                races[addresses['クラシック 皐月賞']].locations = ['', '中山', '中山'];
                races[addresses['クラシック 皐月賞']].side = '内';
                races[addresses['クラシック 皐月賞']].courses = ['', '右 内', '右'];
            }
            return number;
        },
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
            localStorage.setItem('configFoldFlag', JSON.stringify(this.foldFlag));
        },
        markMainRaces: function () {
            log('Config -> Store');
            store.markMainRaces();
        },
        markRaces: function (races) {
            let addresses = this.addresses;
            let ids = [];
            races.forEach(race => {
                ids.push(addresses[race]);
            });
            log('Config -> Store');
            store.markRaces(ids);
        },
    },
    mounted: function () {
    },
    updated: function () {
    }
}).mount('#config');
