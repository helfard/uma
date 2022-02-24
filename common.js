const DEBUG = location.hostname === 'localhost' ? true : false; // ローカル実行時はデバッグモード
const log = msg => {
    // デバッグ用のメッセージの表示
    const SEC = new Date().getSeconds();
    if (DEBUG) console.log(SEC + ' ' + msg);
}

// バージョンが違ったらローカルストレージを一旦消去
let version = localStorage.getItem('version') ? JSON.parse(localStorage.getItem('version')) : null;
if (version !== VERSION) {
    localStorage.clear();
    version = VERSION;
    log('Vresion Check -> Cleared Local Storage');
}
localStorage.setItem('version', JSON.stringify(version));

const shortenString = (string, option = null) => {
    // フルネームから省略形への変換処理
    const CLASS_INITIAL_MAPS = {
        // 級から省略形への変換辞書
        'ジュニア': 'J',
        'クラシック': 'C',
        'シニア': 'S',
    }
    const NAME_INITIAL_MAPS = {
        // レース名から省略形への変換辞書
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
        // グレードから省略形への変換辞書
        'Pre-OP': 'PO',
        'GIII': 'G3',
        'GII': 'G2',
        'GI': 'G1',
    }
    const HANKAKU_MAPS = {
        // 全角カタカナから半角カタカナへの変換辞書
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
    let maps = {}; // 変換辞書
    switch (option) {
        case 'hankaku':
            Object.assign(maps, HANKAKU_MAPS); // 半角カタカナ
            break;
        case 'class initial':
            Object.assign(maps, CLASS_INITIAL_MAPS); // 級
            break;
        case 'name initial':
            Object.assign(maps, NAME_INITIAL_MAPS); // レース名を省略形に
            Object.assign(maps, HANKAKU_MAPS); // さらに半角カタカナに
            break;
        case 'grade':
            Object.assign(maps, GRADE_MAPS); // グレード
            break;
        }
    const REG = new RegExp('(' + Object.keys(maps).join('|') + ')', 'g'); // 変換用の正規表現
    return string.replace(REG, match => maps[match]);
}

let calendar = []; // 全レースの日程表
let addresses = {}; // レース名からIDへの逆引き辞書
races.forEach((race, index) => {
    // racesを表示用に拡張
    race.id = index; // 通し番号
    race.address = race.class + ' ' + race.name; // 逆引き用のキー
    race.classes = ['', race.class, shortenString(race.class, 'hankaku'), shortenString(race.class, 'class initial')];
    race.months = ['', race.month + '月 ' + race.period, race.month + ' ' + race.period.substr(0, 1)];
    race.names = ['', race.name, shortenString(race.name, 'hankaku'), shortenString(race.name, 'name initial')];
    race.grades = ['', race.grade, shortenString(race.grade, 'grade')];
    race.locations = ['', race.location, race.location];
    race.grounds = ['', race.ground, shortenString(race.ground, 'hankaku'), race.ground.substr(0, 1)];
    if (race.length <= 1400) {
        race.range = '短距離';
    } else if (race.length <= 1800) {
        race.range = 'マイル';
    } else if (race.length <= 2400) {
        race.range = '中距離';
    } else {
        race.range = '長距離';
    }
    race.distances = [null, race.length + '（' + race.range + '）', race.length + '（' + race.range.substr(0, 1) + '）', race.length, race.range, race.range.substr(0, 1)];
    race.courses = ['', race.rotation + (race.side ? ' ' + race.side : ''), race.rotation];
    // race.fullgate
    // race.require
    race.rewardss = [[null, null, null, null, null], race.rewards, [race.rewards[0], null, null, null, null]];
    let order = race.month - 7; // 開始時点からの月数
    switch (race.class) {
        case 'シニア':
            order += 12;
        case 'クラシック':
            order += 12;
        case 'ジュニア':
    }
    let period = race.period === '前半' ? 0 : 1;
    race.turn = order * 2 + period + 1; // ターン数
    if (!calendar[order]) calendar[order] = [[], []];
    calendar[order][period].push(index);
    addresses[race.address] = index; // 逆引き辞書に登録
});

const execCopy = string => {
    // 任意の文字列ををクリップボードにコピー
    // https://qiita.com/simiraaaa/items/2e7478d72f365aa48356 からパクった
    let tmp = document.createElement('div');
    let pre = document.createElement('pre');
    pre.style.webkitUserSelect = 'auto';
    pre.style.userSelect = 'auto';
    tmp.appendChild(pre).textContent = string;
    let s = tmp.style;
    s.position = 'fixed';
    s.right = '200%';
    document.body.appendChild(tmp);
    document.getSelection().selectAllChildren(tmp);
    let result = document.execCommand("copy");
    document.body.removeChild(tmp);
    return result;
}

let store = {
    // 共用データ
    state: Vue.reactive({
        mainRaces: [[], []], // 必須レース/推奨レース
        markedRaces: [], // 予定表に登録しているレース（ID）
        markedRaces: localStorage.getItem('markedRaces') ? JSON.parse(localStorage.getItem('markedRaces')) : [],
    }),
    setMainRaces: function (character) {
        let ary = [[], []];
        if (MAIN_RACES[character]) {
            let [essentials, recommends] = MAIN_RACES[character];
            essentials.forEach(id => ary[0].push(addresses[id]));
            recommends.forEach(id => ary[1].push(addresses[id]));
        }
        this.state.mainRaces = ary;
    },
    markRace: function (id) {
        let races = this.state.markedRaces.slice();
        if (races.includes(id)) {
            races = races.filter(value => value != id); // 何故か動かない
        } else {
            races.push(id);
            races.sort((a, b) => a - b);
        }
        this.state.markedRaces = races;
        localStorage.setItem('markedRaces', JSON.stringify(this.state.markedRaces));

    },
    markRaces: function (ids) {
        let races = this.state.markedRaces.slice();
        ids.forEach(id => {
            if (!races.includes(id)) races.push(id);
            races.sort((a, b) => a - b);
        });
        this.state.markedRaces = races;
        localStorage.setItem('markedRaces', JSON.stringify(this.state.markedRaces));
    },
    markMainRaces: function () {
        let ids = [...this.state.mainRaces[0], ...this.state.mainRaces[1]];
        this.markRaces(ids);
    },
    clearRaces: function () {
        this.state.markedRaces = [];
    },
}