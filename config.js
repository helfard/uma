const config = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            CHARACTERS: Object.keys(MAIN_RACES), // ウマ娘
            foldFlag: true, // 折り畳みのフラグ
            config: {
                character: 'ダイワスカーレット',
                emphasis: true,
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
            log('Config -> Result');
            result.setConfig(config);
            log('Config -> Schedule');
            schedule.setConfig(config);
            return number;
        },
        dummy2: function () {
            let character = this.config.character;
            let number = character.length;
            log('Config -> Store');
            store.setMainRaces(character);
            return number;
        },
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
        },
        markMainRaces: function () {
            log('Config -> Store');
            store.markMainRaces();
        },
    },
    mounted: function () {
    },
    updated: function () {
    }
}).mount('#config');
