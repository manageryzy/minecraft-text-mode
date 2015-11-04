window.onload = function () {
    if (window.location.hash == '#default') {
        $('#default-language').show();
    }

    if (localStorage.getItem('music') == 'off') {
        $("[name='music']").bootstrapSwitch('state', false, true);;
    } else {
        localStorage.setItem('music', 'on');
        $("[name='music']").bootstrapSwitch('state', true, true);;
    }

    if (localStorage.getItem('sound') == 'off') {
        $("[name='sound']").bootstrapSwitch('state', false, true);;
    } else {
        localStorage.setItem('sound', 'on');
        $("[name='sound']").bootstrapSwitch('state', true, true);;
    }

    $("[name='music']").on('switchChange.bootstrapSwitch', function () {
        if (localStorage.getItem('music') == 'off') {
            localStorage.setItem('music', 'on');
        } else {
            localStorage.setItem('music', 'off');
        }
    });

    $("[name='sound']").on('switchChange.bootstrapSwitch', function () {
        if (localStorage.getItem('sound') == 'off') {
            localStorage.setItem('sound', 'on');
        } else {
            localStorage.setItem('sound', 'off');
        }
    });

    $('#name').val(localStorage.getItem('name'));
}


function setSkin() {
    var name = $('#name').val();
    if (name == "") {
        name = 'steve';
    }

    localStorage.setItem('name', name);

    $('#preview').attr('src', 'index-skin.html?' + name);
    $('#name').val(name);
}

function startGame() {
    setSkin();
    location.href = "play.html";
}