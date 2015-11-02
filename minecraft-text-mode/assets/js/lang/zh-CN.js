//language translate 
// {{...}} -> direct output English
// [[...]] -> item name need translate


var sentences = {
    '{{Language Engine Inited}}': '语言引擎初始化完成',
    '{{language engine init failed!}}':'语言引擎初始化失败'
};

var items = {
    '[[item]]': 'it~~em'
};

function translate(msg) {
    if (!msg) {
        return '';
    }

    if (typeof (msg) !== "string") {
        return '';
    }

    var sentence = msg.match(/{{[^{}]*}}/g);
    if (sentence)
        for (var i = 0; i < sentence.length; i++) {
            if (sentences[sentence[i]]) {
                msg = msg.replace(sentence[i], sentences[sentence[i]]);
            } else {
                game.Log.info('lost translation:' + sentence[i]);
            }
        }

    var item = msg.match(/\[\[[^\[\]]*\]\]/g);
    if (item)
        for (var i = 0; i < item.length; i++) {
            if (items[item[i]]) {
                msg = msg.replace(item[i], items[item[i]]);
            } else {
                game.Log.info('lost translation:' + item[i]);
            }
        }

    return msg;
};

translate;