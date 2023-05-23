var dictCellIdNext = {
    '0_0': '1_0',
    '1_0': '2_0',
    '2_0': '3_0',
    '3_0': '0_1',

    '0_1': '1_1',
    '1_1': '2_1',
    '2_1': '3_1',
    '3_1': '0_2',

    '0_2': '1_2',
    '1_2': '2_2',
    '2_2': '3_2',
    '3_2': '0_3',

    '0_3': '1_3',
    '1_3': '2_3',
    '2_3': '3_3',
    '3_3': '0_4',

    '0_4': '1_4',
    '1_4': '2_4',
    '2_4': '3_4',
    '3_4': '0_5',

    '0_5': '1_5',
    '1_5': '2_5',
    '2_5': '3_5',
    '3_5': '0_6',

    '0_6': '1_6',
    '1_6': '2_6',
    '2_6': '3_6',
    '3_6': '0_7',

    '0_7': '1_7',
    '1_7': '2_7',
    '2_7': '3_7',
    '3_7': '0_8',

    '0_8': '1_8',
    '1_8': '2_8',
    '2_8': '3_8',
    '3_8': '0_9',

    '0_9': '1_9',
    '1_9': '2_9',
    '2_9': '3_9',
    '3_9': '0_0'
};


// вычиркиваем клетку
function f_setCross(btn_id)
{
    //lurnist_table.innerHTML += 'btn_id: ' + btn_id + '<BR>';
    var el = document.getElementById(btn_id);
    el.disabled = true;
    el.removeAttribute("style");
    el.setAttribute("style","font-size: 30%; background: url(/pictures/ronklistazub/krest.gif); background-size: 100%;");
    //el.style.height= "25px";
    el.style.borderWidth='1';

    f_checkIsColFill(btn_id);

    if (num_stars == 10){return}

    // вычисляем подсказку
    id_num_cur = btn_id;
    index_num_cur++;
    if (index_num_cur >= arr_numbers.length)
    {
        index_num_cur -= arr_numbers.length;
    }
    f_nextStep(arr_numbers_cur[index_num_cur]);
}

// если стоит три крестика, то проставляем нолик в четвертой клетке
function f_checkIsColFill(btn_id)
{
    var idArray = btn_id.split("_");
    var colNum = idArray[idArray.length - 1];

    var numCross = 0;
    var row = 4;
    var idActive = '';
    for (var i = 0; i < row; i++)
    {
        var new_id = i + "_" + colNum;
        if (document.getElementById(new_id).disabled)
        {
            numCross++;
        }
        else
        {
            idActive = new_id;
        }
    
    }
    if (numCross == 3)
    {
        // проставляем нолик
        document.getElementById(idActive).disabled = true;
        document.getElementById(idActive).removeAttribute("style");
        document.getElementById(idActive).setAttribute("style","font-size: 30%; background: url(/pictures/ronklistazub/star_01.gif); background-size: 100%;");
        //document.getElementById(idActive).classList.add('background_color_blue');
        num_stars++;
    }

}

function f_init()
{
    num_stars = 0;
    id_num_cur = '3_9';
    index_num_cur = 0;
    arr_numbers_cur = arr_numbers;
    idName = id_num_cur;
}

// отобразим поле кнопок 12 на 4
var arr_letters = ['Л', 'У', 'Р', 'Н', 'И', 'С', 'Т', 'ВД', 'ХВ', 'ЕД']
var arr_numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
function f_display()
{
    // Очистим поля гаданий (перезапуск)
    lurnist_numbers.innerHTML = '';
    lurnist_head.innerHTML = '';
    lurnist_names.innerHTML = '';
    lurnist_table.innerHTML = '';
    // инициализация переменных
    f_init();
    // сделаем активной кнопку "Расставить числа"

    // 1. строка с буквами
    for (var i = 0; i < arr_letters.length; i++)
    {
        lurnist_head.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classicWithBorder square_small background_color_green' id='b_" + i + "' value='" + arr_letters[i] + "'>";
    }
    //lurnist.innerHTML += "<BR>"

    // 2. поля с именами
    var row = 4;
    for (var i = 0; i < row; i++)
    {
        lurnist_names.innerHTML += "<input type='text' maxlength='14' size='15px' style='height:30px' id='name" + i + "' name='name" + i + "' value='Имя " + (i+1) + "'><BR>";
    }

    // 2. теперь клетки 4 ряда 10 столбцов
    f_setMainTable();
    

    // 3. Нижний ряд чисел (пустые)
    for (var i = 0; i < arr_numbers.length; i++)
    {
        lurnist_numbers.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classicWithBorder square_small background_color_green' value='?'>";
    }

}

// основное поле с гаданием
function f_setMainTable()
{
    lurnist_table.innerHTML = '';
    var row = 4;
    var col = 10;
    for (var i = 0; i < row; i++)
    {
        //lurnist_names.innerHTML += "<input type='text' maxlength='14' size='15px' style='height:30px' id='name" + i + "' name='name" + i + "' value='Имя " + (i+1) + "'><BR>";
        document.getElementById('name' + i).style.padding = "0";
        document.getElementById('name' + i).style.margin = "0";
        for (var j = 0; j < col; j++)
        {
            var id = i + "_" + j;
            lurnist_table.innerHTML += "<INPUT type='button' class='classicWithBorder square_small background_color_blue' style='font-size: 30%; background: url(/pictures/ronklistazub/blue.gif); background-size: 100%;' id='" + id + "' onclick='f_setCross(\"" + id + "\");' value=' '>";
        }
        lurnist_table.innerHTML += "<BR>";
    }
}

var num_stars = 0;
var id_num_cur = '3_9'; // изначально клетка-старт в первой клетке первого ряда
var index_num_cur = 0;
var arr_numbers_cur = arr_numbers;
function f_setRandomNums()
{
    // заново инициализируем переменные
    f_init();

    // 3. Нижний ряд чисел
    lurnist_numbers.innerHTML = '';
    arr_numbers_cur = f_shuffle(arr_numbers);
    for (var i = 0; i < arr_numbers_cur.length; i++)
    {
        lurnist_numbers.innerHTML += "<INPUT type='button' style='font-size: 100%; padding:0; margin:0;' class='classicWithBorder square_small background_color_green' id='b_n_" + i + "' value='" + arr_numbers_cur[i] + "'>";
    }

    // + удаляем проставленные крестики, если были (т.к. генерация новых чисел - перезапуск гадания)
    f_setMainTable();

    // вычисляем клетку подсказку
    f_nextStep(arr_numbers_cur[0]);
        
}

// отображение клетки-подсказки
var idName = id_num_cur;
function f_nextStep(num)
{
    // с предыдущей подсказки удаляем подсветку
    
    var el = document.getElementById(idName);
    el.style.borderColor='#000000';
    el.style.borderWidth='1';
    el.value = ' ';

    // берем текущий id: id_num_cur -> вычисляем следующий
    // если следующий пустой, то счетчик +1, иначе вычисляем дальше
    // пока счетчик не станет равен нашему текущему числу num
    idName = id_num_cur;
    //lurnist_numbers.innerHTML += '<BR>' + num + ' ' + id_num_cur + '->' + dictCellIdNext[idName] + '<BR>';
    
    var counter = 0;
    while (counter < num)
    {
        idName = dictCellIdNext[idName];
        var el = document.getElementById(idName);
        while (document.getElementById(idName).disabled) // прокручиваем до активной кнопки
        {
            idName = dictCellIdNext[idName];
        }
        counter++;
    }


    var el = document.getElementById(idName);
    el.style.borderColor='#FF0000';
    el.style.borderWidth='thick';
    el.value = '+' + num;
}

function f_shuffle(myArray)
{
    for (let i = myArray.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));
        [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
    }
    return myArray;
}