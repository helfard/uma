const schedule = Vue.createApp({
    data() {
        return {
            DEBUG: DEBUG, // デバッグモードのフラグ
            foldFlag: localStorage.getItem('scheduleFoldFlag') !== null ? JSON.parse(localStorage.getItem('scheduleFoldFlag')) : false, // 折り畳みのフラグ
            races: races,
            calendar: calendar,
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
            calendarMode: localStorage.getItem('calendarMode') !== null ? JSON.parse(localStorage.getItem('calendarMode')) : false,
            sharedState: store.state,
        }
    },
    computed: {
        totalData: function () {
            let races = this.races;
            let markedRaces = this.sharedState.markedRaces;
            let totalData = {
                number: markedRaces.length,
                grades: { 'GI': 0, 'GII': 0, 'GIII': 0, 'OP': 0, 'Pre-OP': 0 },
                locations: { '札幌': 0, '函館': 0, '福島': 0, '中山': 0, '東京': 0, '大井': 0, '新潟': 0, '中京': 0, '京都': 0, '阪神': 0, '小倉': 0 },
                grounds: { '芝': 0, 'ダート': 0 },
                ranges: { '短距離': 0, 'マイル': 0, '中距離': 0, '長距離': 0 },
                distance: 0, // 総バクシン距離
                rotations: { '左': 0, '右': 0, '直線': 0 },
                // sides: {'内': 0, '外': 0},
                reward: 0, // 総獲得ファン数（1位）
            };
            markedRaces.forEach(id => {
                if (races[id]) {
                    totalData.grades[races[id].grade]++;
                    totalData.locations[races[id].location]++;
                    totalData.grounds[races[id].ground]++;
                    totalData.ranges[races[id].range]++;
                    totalData.distance += races[id].length;
                    totalData.rotations[races[id].rotation]++;
                    totalData.reward += races[id].rewards[0];
                }
            });
            return totalData;
        },
        colspans: function () {
            // ここはresultと重複しているので無駄がある
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
            if (display.rewardss === 1) numbers[0] += 4;
            numbers[1] = numbers[0];
            if (DEBUG) numbers[0]++;
            if (display.turn) numbers[0]++;
            if (display.classes) numbers[0]++;
            if (display.months) numbers[0]++;
            return numbers;
        },
    },
    watch: {
        calendarMode: function (newFlag, oldFlag) {
            localStorage.setItem('calendarMode', JSON.stringify(newFlag));
        },
    },
    methods: {
        fold: function () {
            // 折り畳み
            this.foldFlag = !this.foldFlag;
            localStorage.setItem('scheduleFoldFlag', JSON.stringify(this.foldFlag));
        },
        markRace: function (id) {
            // 予定表に追加
            log('Result -> Store');
            store.markRace(id);
        },
        checkEmpty: function (ids) {
            let markedRaces = this.sharedState.markedRaces;
            let flag = true;
            ids.forEach(id => {
                if (markedRaces.includes(id)) flag = false;
            });
            return flag;
        },
        setDisplay: function (display) {
            this.display = display;
        },
        setConfig: function (config) {
            this.config = config;
        },
        copyTab: function () {
            let calendar = this.calendar;
            let races = this.races;
            let markedRaces = this.sharedState.markedRaces;
            let display = this.display;
            let text = '';
            calendar.forEach((months, mindex) => {
                months.forEach((periods, pindex) => {
                    if (!this.checkEmpty(periods)) {
                        periods.forEach((id, iindex) => {
                            let cells = [];
                            if (markedRaces.includes(id)) {
                                if (this.DEBUG) cells.push(id);
                                if (display.turn) cells.push(races[id].turn);
                                if (display.classes) cells.push(races[id].classes[display.classes]);
                                if (display.months) cells.push(races[id].months[display.months]);
                                if (display.names) cells.push(races[id].names[display.names]);
                                if (display.grades) cells.push(races[id].grades[display.grades]);
                                if (display.lotacions) cells.push(races[id].lotacions[display.locations]);
                                if (display.grounds) cells.push(races[id].grounds[display.grounds]);
                                if (display.distances) cells.push(races[id].distances[display.distances]);
                                if (display.courses) cells.push(races[id].courses[display.courses]);
                                if (display.fullgate) cells.push(races[id].fullgate);
                                if (display.require) cells.push(races[id].require);
                                if (display.rewardss) cells.push(races[id].rewardss[display.rewardss][0]);
                                if (display.rewardss === 1) cells.push(races[id].rewardss[display.rewardss][1]);
                                if (display.rewardss === 1) cells.push(races[id].rewardss[display.rewardss][2]);
                                if (display.rewardss === 1) cells.push(races[id].rewardss[display.rewardss][3]);
                                if (display.rewardss === 1) cells.push(races[id].rewardss[display.rewardss][4]);
                                text += cells.join('\t') + '\n';
                            }
                        });
                    } else if (this.calendarMode) {
                        let cells = [];
                        log('a');
                        if (this.DEBUG) cells.push(null);
                        if (display.turn) cells.push(periods[0] !== undefined ? races[periods[0]].turn : 1);
                        if (display.classes) cells.push(periods[0] !== undefined ? races[periods[0]].classes[display.classes] : ['', 'ジュニア', 'ｼﾞｭﾆｱ', 'J'][display.classes]);
                        if (display.months) cells.push(periods[0] !== undefined ? races[periods[0]].months[display.months] : ['', '7月 前半', '7 前'][display.months]);
                        if (this.colspans[1]) cells = cells.concat(Array(this.colspans[1]).fill(null));
                        text += cells.join('\t') + '\n';
                    }
                });
            });
            if (execCopy(text)) alert('コピーしました！');
        },
        copyAddress: function () {
            let races = this.races;
            let markedRaces = this.sharedState.markedRaces;
            let text = '';
            markedRaces.forEach(id => {
                text += '\'' + races[id].class + ' ' + races[id].name + '\',\n';
            });
            if (execCopy(text)) alert('コピーしました！');
        },
        clear: function () {
            store.clearRaces();
        },
    },
    mounted: function () {
    },
}).mount('#schedule');
