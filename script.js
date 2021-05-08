const DEBUG = true;

const CLASS_INITIAL_MAPS = {
    'ジュニア': 'J',
    'クラシック': 'C',
    'シニア': 'S',
}
const NAME_INITIAL_MAPS = {
    'ジュニアステークス': 'JS',
    'フューチュリティステークス': 'FS',
    'ステークス': 'S',
    'ロイヤルカップ': 'RC',
    'スプリングカップ': 'SC',
    'カップ': 'C',
    'ジュベナイルフィリーズ': 'JF',
    'チャレンジトロフィー': 'CT',
    'トロフィー': 'T',
    ' 東京優駿': '',
    'ハンデキャップ': 'H',
    'エリザベス': 'E',
    'アルゼンチン': 'A',
    'チャンピオンシップ': 'C',
    'サマーダッシュ': 'SD',
    'チャンピオンシップ': 'C',
    'オータムダッシュ': 'AD',
    'オープン': 'O',
    'きんもくせい': 'ｷﾝﾓｸｾｲ',
}
const GRADE_MAPS = {
    'Pre-OP': 'PO',
    'GIII': 'G3',
    'GII': 'G2',
    'GI': 'G1',
}
const HANKAKU_MAPS = {
    'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
    'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
    'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
    'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
    'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
    'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
    'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
    'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
    'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
    'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
    'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
    'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
    'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
    'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
    'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
    'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
    'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
    'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ', 'ー': 'ｰ',
}

const shortenString = (string, option = null) => {
    let maps = {};
    switch (option) {
        case 'hankaku':
            Object.assign(maps, HANKAKU_MAPS);
            break;
        case 'class initial':
            Object.assign(maps, CLASS_INITIAL_MAPS);
            break;
        case 'name initial':
            Object.assign(maps, NAME_INITIAL_MAPS);
            Object.assign(maps, HANKAKU_MAPS);
            break;
        case 'grade':
            Object.assign(maps, GRADE_MAPS);
            break;
        }
    const REG = new RegExp('(' + Object.keys(maps).join('|') + ')', 'g');
    return string.replace(REG, match => maps[match]);
}

let calendar = [];
let invertedDictionary = {};
races.forEach((race, id) => {
    if (race.distanse <= 1400) {
        race.range = '短距離';
    } else if (race.distanse <= 1800) {
        race.range = 'マイル';
    } else if (race.distanse <= 2400) {
        race.range = '中距離';
    } else {
        race.range = '長距離';
    }
    invertedDictionary[race.class + ' ' + race.name] = id;
    race.classes = [race.class, shortenString(race.class, 'hankaku'), shortenString(race.class, 'class initial'), ''];
    race.months = [race.month + '月 ' + race.period, race.month + ' ' + race.period.substr(0, 1), ''];
    race.names = [race.name, shortenString(race.name, 'hankaku'), shortenString(race.name, 'name initial'), ''];
    race.grades = [race.grade, shortenString(race.grade, 'grade'), ''];
    race.locations = [race.location, race.location, ''];
    race.grounds = [race.ground, shortenString(race.ground, 'hankaku'), race.ground.substr(0, 1), ''];
    race.distanses = [race.distanse + '（' + race.range + '）', race.distanse + '（' + race.range.substr(0, 1) + '）', race.distanse, race.range, race.range.substr(0, 1), ''];
    race.rotations = [race.rotation + (race.side ? ' ' + race.side : ''), race.rotation, ''];
    race.fullgates = [race.fullgate, null];
    race.requires = [race.require, null];
    race.rewardss = [race.rewards, [race.rewards[0], null, null, null, null], [null, null, null, null, null]];
    let order = race.month - 7;
    switch (race.class) {
        case 'シニア':
            order += 12;
        case 'クラシック':
            order += 12;
        case 'ジュニア':
    }
    let period = race.period === '前半' ? 0 : 1;
    if (!calendar[order]) calendar[order] = [[], []];
    calendar[order][period].push(id);
});







const list = new Vue({
    el: '#list',
    data: {
        checkedButtons: [], // 表示条件
        checkedRaces: [], // チェックしたレース
        grades: ['GI', 'GII', 'GIII', 'OP', 'Pre-OP'],
        locations: ['札幌', '函館', '福島', '中山', '東京', '大井', '新潟', '中京', '京都', '阪神', '小倉'],
        grounds: ['芝', 'ダート'],
        distanses: ['短距離', 'マイル', '中距離', '長距離'],
        rotations: ['左', '右', '直線'],
        foldOptions: {
            search: false,
            config: true,
            schedule: true,
            list: true,
        },
        displayOptions: {
            turns: ['表示', '非表示'],
            classes: ['全角', '半角', '省略', '非表示'],
            months: ['全表示', '省略', '非表示'],
            names: ['全角', '半角', '省略', '非表示'],
            grades: ['全表示', '省略', '非表示'],
            locations: ['全表示', '省略', '非表示'],
            grounds: ['全角', '半角', '1文字', '非表示'],
            distanses: ['全表示', '省略', '距離のみ', '分類のみ', '1文字', '非表示'],
            rotations: ['全表示', '左右のみ', '非表示'],
            fullgates: ['表示', '非表示'],
            requires: ['表示', '非表示'],
            rewardss: ['全表示', '1位のみ', '非表示'],
            dropss: ['全表示', '省略', '非表示'],
            objective: true,
            charge: 'ダイワスカーレット',
            colorfulGrade: false,
            colorfulDistanse: false,
            empty: false,
            event: true,
            smart: true,
        },
        displayMode: {
            turns: 0,
            classes: 1,
            months: 0,
            names: 1,
            grades: 0,
            locations: 0,
            grounds: 0,
            distanses: 0,
            rotations: 0,
            fullgates: 1,
            requires: 1,
            rewardss: 1,
            dropss: 0
        },

    },
    computed: {
        results: function () {
            let checkedButtons = this.checkedButtons;
            let results = [];
            calendar.forEach((months, mindex) => {
                if (!results[mindex]) results[mindex] = [[], []];
                months.forEach((periods, pindex) => {
                    periods.forEach((id, iindex) => {
                        if (checkedButtons.includes(races[id].grade)
                            && checkedButtons.includes(races[id].location)
                            && checkedButtons.includes(races[id].ground)
                            && checkedButtons.includes(races[id].range)
                            && checkedButtons.includes(races[id].rotation)) { results[mindex][pindex].push(id); }
                        });
                    });
                });
            return results;
        },
        colspans: function () {
            let numbers = [0, 0];
            numbers[0] += races[0].names[this.displayMode.names] ? 1 : 0;
            numbers[0] += races[0].grades[this.displayMode.grades] ? 1 : 0;
            numbers[0] += races[0].locations[this.displayMode.locations] ? 1 : 0;
            numbers[0] += races[0].grounds[this.displayMode.grounds] ? 1 : 0;
            numbers[0] += races[0].distanses[this.displayMode.distanses] ? 1 : 0;
            numbers[0] += races[0].rotations[this.displayMode.rotations] ? 1 : 0;
            numbers[0] += races[0].fullgates[this.displayMode.fullgates] ? 1 : 0;
            numbers[0] += races[0].requires[this.displayMode.requires] ? 1 : 0;
            numbers[0] += races[0].rewardss[this.displayMode.rewardss][0] ? 1 : 0;
            numbers[0] += races[0].rewardss[this.displayMode.rewardss][1] ? 1 : 0;
            numbers[0] += races[0].rewardss[this.displayMode.rewardss][2] ? 1 : 0;
            numbers[0] += races[0].rewardss[this.displayMode.rewardss][3] ? 1 : 0;
            numbers[0] += races[0].rewardss[this.displayMode.rewardss][4] ? 1 : 0;
            numbers[1] = numbers[0];
            numbers[0] += DEBUG ? 1: 0;
            numbers[0] += !this.displayMode.turns ? 1: 0;
            numbers[0] += races[0].classes[this.displayMode.classes] ? 1: 0;
            numbers[0] += races[0].months[this.displayMode.months] ? 1: 0;
            return numbers;
        }
    },
    watch: {
    },
    methods: {
        checkAll: function (orders) {
            let ary = orders.filter(i => !this.checkedButtons.includes(i));
            this.checkedButtons = ary.length ? this.checkedButtons.concat(ary) : this.checkedButtons.filter(i => !orders.includes(i));
        },
        changeDisplayMode: function (item) {
            let mode = this.displayMode[item];
            mode = races[0][item][mode + 1] !== undefined ? mode + 1 : 0;
            this.displayMode[item] = mode;
        },
        checkRace: function (id) {
            if (!this.checkedRaces.includes(id)) this.checkedRaces.push(id)
            this.checkedRaces.sort((a, b) => a - b);;
        },
        uncheckRace: function (id) {
            this.checkedRaces = this.checkedRaces.filter(race => race !== id);
        },
        fold: function (option) {
            this.foldOptions[option] = !this.foldOptions[option];
        }
    },
    mounted: function () {
        let checkedButtons = [];
        Array.prototype.push.apply(checkedButtons, this.grades.slice(0, 3));
        Array.prototype.push.apply(checkedButtons, this.locations);
        Array.prototype.push.apply(checkedButtons, this.grounds);
        Array.prototype.push.apply(checkedButtons, this.distanses);
        Array.prototype.push.apply(checkedButtons, this.rotations.slice(2));
        this.checkedButtons = checkedButtons;
    }
});
