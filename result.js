const result = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: false, // 折り畳みのフラグ
            races: races,
            calendar: calendar,
            search: {
                grades: [],
                locations: [],
                grounds: [],
                ranges: [],
                rotations: [],
            },
            display: {
                turn: 0,
                classes: 0,
                months: 0,
                names: 0,
                grades: 0,
                locations: 0,
                grounds: 0,
                distances: 0,
                courses: 0,
                fullgate: 0,
                require: 0,
                rewardss: 0,
                dropss: 0,
            },
            config: {
                character: '',
                emphasis: false,
                colorful: false,
                smart: false,
            },
            number: 0, // 検索にヒットするレースの数
            sharedState: store.state,
        }
    },
    computed: {
        results: function () {
            let races = this.races;
            let calendar = this.calendar;
            let search = this.search;
            let results = [];
            let number = 0;
            calendar.forEach((months, mindex) => {
                if (!results[mindex]) results[mindex] = [[], []];
                months.forEach((periods, pindex) => {
                    periods.forEach((id, iindex) => {
                        if (search.grades.includes(races[id].grade)
                            && search.locations.includes(races[id].location)
                            && search.grounds.includes(races[id].ground)
                            && search.ranges.includes(races[id].range)
                            && search.rotations.includes(races[id].rotation)) {
                                results[mindex][pindex].push(id);
                                number++;
                            }
                        });
                    });
                });
            this.number = number;
            return results;
        },
        colspans: function () {
            // ここはscheduleと重複しているので無駄がある
            let display = this.display;
            let numbers = [0, 0];
            if (display.names) numbers[0]++;
            if (display.grades) numbers[0]++;
            if (display.locations) numbers[0]++;
            if (display.grounds) numbers[0]++;
            if (display.distances) numbers[0]++;
            if (display.courses) numbers[0]++;
            if (display.fullgate) numbers[0]++;
            if (display.require) numbers[0]++;
            if (display.rewardss > 0) numbers[0]++;
            if (display.rewardss > 1) numbers[0] += 4;
            numbers[1] = numbers[0];
            if (DEBUG) numbers[0]++;
            if (display.turn) numbers[0]++;
            if (display.classes) numbers[0]++;
            if (display.months) numbers[0]++;
            return numbers;
        },
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
        },
        markRace: function (id) {
            // 予定表に追加
            log('Result -> Store');
            store.markRace(id);
        },
        setSearch: function (search) {
            this.search = search;
        },
        setDisplay: function (display) {
            this.display = display;
        },
        setConfig: function (config) {
            this.config = config;
        },
    },
    mounted: function () {
    },
}).mount('#result');
