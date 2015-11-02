//language translate 
// {{...}} -> direct output English
// [[...]] -> item name need translate

// not use in English
var sentences = null;

//
var items = {
    '[[item]]':'it~~em'
};

function translate(msg) {
    if (!msg) {
        return '';
    }

    if (typeof (msg) !== "string") {
        return '';
    }

    var sentence = msg.match(/{{[^{}]*}}/g);
    if(sentence)
    for (var i = 0; i < sentence.length; i++) {
        msg = msg.replace(sentence[i], sentence[i].substring(2, sentence[i].length - 2))
    }

    var item = msg.match(/\[\[[^\[\]]*\]\]/g);
    if(item)
    for (var i = 0; i < item.length; i++) {
        if (items[item[i]]) {
            msg = msg.replace(item[i], items[item[i]]);
        }
    }

    return msg;
};

translate;