//language translate 
// {{...}} -> direct output English
// [[...]] -> item name need translate


var sentences = {
    '{{Language Engine Inited}}': '语言引擎初始化完成',
    '{{language engine init failed!}}': '语言引擎初始化失败',
    '{{Adding fuel to the engine}}':'向引擎注入燃料',
    '{{Preparing to time leap}}':'准备时空跃迁',
    '{{Calculating targe position}}':'计算目的坐标',
    '{{Engine overheating}}':'引擎过热',
    '{{Preparing brain-computer interface}}':'准备脑机接口',
    '{{Connecting to the Matrix}}':'正在连接到矩阵',
    '{{Found the black monolith}}':'发现黑色石碑',
    '{{Found the answer to life the universe and everything}}':'计算完成生命宇宙一切的答案',
    '{{Secure,Contain,Protect}}':'控制·收容·保护',
    '{{Preparing to dementional hitting}}':'准备降维打击',
    '{{Rendering Items}}':'渲染物品',
    '{{Rendering Blocks}}':'渲染方块',
    '{{Rendering Enities}}':'渲染实体',
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