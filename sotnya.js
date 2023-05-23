var arrNums = new Array(1,2,3,4,5,6,7,8,9,
    1,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,9,
    2,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,
    3,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,
    4,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,
    5,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,
    6,6,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,
    7,7,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,
    8,8,1,8,2,8,3,8,4,8,5,8,6,8,7,8,8,8,9,
    9,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9);
var cNumDefault = 10;
var iter = 0;
var row = 0;
var colNum = cNumDefault;
    var res = new Array(
        'любит','ревнует','не обращает внимания','нравишься ему','обратит внимание','равнодушен','будете общаться','хочет быть с тобой','будете вместе',
        'любит','ревнует','не обращает внимания','нравишься ему','обратит внимание','равнодушен','будете общаться','хочет быть с тобой','будете вместе',
        'любит','ревнует','не обращает внимания','нравишься ему','обратит внимание','равнодушен','будете общаться','хочет быть с тобой','будете вместе');
var id_cur = -1;
var id_hints = new Array();

/* Первоначальное рисование*/
function f_drowFirst()
{

    if (f_checkName())
    {
        sotnya.innerHTML = "<BR>";
        colNum = f_getColNum();

        // инициализация массива
        f_resetArrNum();

        // прибавка даты в конец массива
        f_addDate();

        for (var i = 0; i < colNum; i++)
        {
            sotnya.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classic square_small background_color_light_blue' value='" + (i+1) + "' disabled>";
        }
        sotnya.innerHTML += "<BR><BR>";

        iter = 0;
        row = 0;
        var col = 0;
        for (var i = 0; i < arrNums.length; i++)
        {
            var id = row + "_" + (i%colNum);
            sotnya.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classic square_small background_color_blue' id='" + id + "' onclick='f_setDisable(\"" + id + "\");' value='" + arrNums[i] + "'>";
            if (((i + 1)%colNum == 0) && (colNum*(row+1) < arrNums.length)) {sotnya.innerHTML += "<BR>"; row++;};
        }
        row++;
        hint.innerHTML = "<input type='button' class='restart 2small background_color_green'  value='Подсказка' onclick='f_displayHint();'>&nbsp;" +
            "<input type='button' class='restart 2small background_color_green'  value='Отметить все' onclick='f_displayAllHint();'>&nbsp;";
        hint.innerHTML += "<input type='button' class='restart 2small background_color_green' value='Далее' onclick='f_drowNext();'>";
    }
    else
    {
        errors.innerHTML = "Необходимо ввести полное имя парня";
    }
    nextStep.innerHTML = "<input type='button' class='restart 2small background_color_green' style='width: 150pt; height: 40pt'  value='Далее' onclick='f_drowNext();'>";
}

function f_drowNext()
{
    hintMes.innerHTML = "";

    var lenBefore = arrNums.length;
    arrNums = new Array();
    // пробегаемся по всем кнопкам и собираем активные
    for (var i = 0; i < row; i++)
    {
    for (var j = 0; j < colNum; j++)
    {
        var curLen = (i*colNum + (j));
        if (curLen >= lenBefore) {break;};
        if ((i*colNum + (j + 1)) <= lenBefore)
        {
            if (document.getElementById(i + "_" + j).disabled == false)
            { arrNums.push(document.getElementById(i + "_" + j).value);}
        }
    }
    }
    colNum = document.getElementById("hisName").value.trim().length;
    var hisNameChars = document.getElementById("hisName").value.trim().split("");

    var lenAfter = arrNums.length;

    var isHintExist = true; //f_displayHint(false);
    sotnya.innerHTML = "<BR>";

    for (var i = 0; i < colNum; i++)
    {
        sotnya.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classic square_small background_color_light_blue' value='" + hisNameChars[i] + "' disabled>";
    }
    sotnya.innerHTML += "<BR><BR>";

    // продолжаем гадание
    row = 0;
    var col = 0;
    for (var i = 0; i < arrNums.length; i++)
    {
        var id = row + "_" + (i%colNum);
        sotnya.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classic square_small background_color_blue' id='" + id + "' onclick='f_setDisable(\"" + id + "\");' value='" + arrNums[i] + "'>";
        if (((i + 1)%colNum == 0) && (colNum*(row+1) < arrNums.length)) {sotnya.innerHTML += "<BR>"; row++;}
    }
    row++;

    if (iter > 0)
    {
        isHintExist = f_displayHint(false);
        if (!isHintExist)
        {
            // вывод результата
            //sotnya.innerHTML += "<BR>Количество оставшихся клеточек: " + lenAfter;
            nextStep.innerHTML = "<div class='heavy_rounded result_area'>Количество оставшихся клеточек: <b>" + lenAfter + "</b></div>";
        }
    }
    else {iter++;}
    

}

function f_displayAllHint()
{
    var v1, v2, v3;

    for (var i = 0; i < row; i++)
    {
    for (var j = 0; j < colNum; j++)
    {
        if ((i*colNum + j + 1) < arrNums.length)
        {
            v1 = document.getElementById(i + "_" + j).value;
            // смотрим на соседа снизу
            if (((i + 1) < row) && (((i + 1)*colNum + j) < arrNums.length))
            {
                if (f_checkIsPair(i + "_" + j, (i + 1) + "_" + j))
                {
                    f_setDisable(i + "_" + j);
                    f_setDisable((i + 1) + "_" + j);
                }
            }

            // смотрим на соседа справа
            if (((j + 1) < colNum) && ((i*colNum + j + 1) < arrNums.length))
            {
                if (f_checkIsPair(i + "_" + j, i + "_" + (j + 1)))
                {
                    f_setDisable(i + "_" + j);
                    f_setDisable(i + "_" + (j + 1));
                }
            }
        }
    }
    }
}

/* Отображение подсказки*/
function f_displayHint(show)
{
    var v1, v2, v3;

    for (var i = 0; i < row; i++)
    {
    for (var j = 0; j < colNum; j++)
    {
        if ((i*colNum + j + 1) < arrNums.length)
        {
            v1 = document.getElementById(i + "_" + j).value;
            // смотрим на соседа снизу
            if (((i + 1) < row) && (((i + 1)*colNum + j) < arrNums.length))
            {
                if (f_checkIsPair(i + "_" + j, (i + 1) + "_" + j))
                {
                    if (show != false)
                    f_setHint(i + "_" + j, (i + 1) + "_" + j);
                    return true;
                }
            }

            // смотрим на соседа справа
            if (((j + 1) < colNum) && ((i*colNum + j + 1) < arrNums.length))
            {
                if (f_checkIsPair(i + "_" + j, i + "_" + (j + 1)))
                {
                    // раскрашиваем клетки в красный
                    if (show != false)
                    f_setHint(i + "_" + j, i + "_" + (j + 1));
                    return true;
                }
            }
        }
    }
    }
    if (show == false) {return false;}
    hintMes.innerHTML = "Больше нет возможных ходов! Для продолжения гадания нажмите \"Далее\"";
}

function f_checkIsPair(id1, id2)
{
    var el1 = document.getElementById(id1);
    var el2 = document.getElementById(id2);

    if (el1.disabled || el2.disabled) return false;
    // если совпадают или в сумме 10
    if ((el1.value == el2.value) || ((parseInt(el1.value) + parseInt(el2.value)) == 10)) return true;
    return false;
}

function f_checkIsNeighbors(id1, id2)
{
  var el1 = id1.split("_");
  var el2 = id2.split("_");
  
  var r1 = parseInt(el1[0]);
  var c1 = parseInt(el1[1]);
  var r2 = parseInt(el2[0]);
  var c2 = parseInt(el2[1]);
  
  if ((r1 == r2) && ((c1 == c2 + 1) || (c1 == c2 - 1)))
  {
    // соседи
    return true;
  }
  if ((c1 == c2) && ((r1 == r2 + 1) || (r1 == r2 - 1)))
  {
    // соседи
    return true;
  }

    return false;
}

/* Отображение подсказки*/
function f_setHint(id1, id2)
{
    document.getElementById(id1).classList.add('background_color_red');
    document.getElementById(id1).classList.remove('background_color_blue');
    document.getElementById(id2).classList.add('background_color_red');
    document.getElementById(id2).classList.remove('background_color_blue');
    id_hints = new Array(id1, id2);
//hintMes.innerHTML += "<BR>подсказка установлена: " + id_hints[0] + ", " + id_hints[1];
}


/* Вычеркивание цифры*/
function f_setDisable(id)
{
		// подсказку удалим: удаляем красный, возвращаем голубой
		if (id_hints.length > 0)
		{
			document.getElementById(id_hints[0]).classList.add('background_color_blue');
			document.getElementById(id_hints[0]).classList.remove('background_color_red');
			document.getElementById(id_hints[1]).classList.add('background_color_blue');
			document.getElementById(id_hints[1]).classList.remove('background_color_red');
			id_hints = new Array();
		}

    if (id_cur < 0) // это первый клик: заменим цвет, но оставим возможность отщелкнуть
    {

		
        document.getElementById(id).classList.add('background_color_green');
        document.getElementById(id).classList.remove('background_color_blue');
        id_cur = id;
		

    }
    else
    {
        if (id == id_cur) // это отщелкивание: просто возвращаем цвет
        {
            document.getElementById(id).classList.add('background_color_blue');
            document.getElementById(id).classList.remove('background_color_green');
            id_cur = -1;
        }
        else // вычеркиваем пару
        {
            // проверка на корректность пары: если не пара, то просто новая клетка старта
            if ((f_checkIsPair(id, id_cur)) && f_checkIsNeighbors(id, id_cur)) // пара
            {
                var button = document.getElementById(id);
                button.disabled = true;
                var button = document.getElementById(id_cur);
                button.disabled = true;
                document.getElementById(id_cur).classList.add('background_color_light_blue');
                document.getElementById(id).classList.add('background_color_light_blue');
                document.getElementById(id_cur).classList.remove('background_color_green');
//                document.getElementById(id_cur).classList.remove('background_color_red');
//                document.getElementById(id).classList.remove('background_color_red');
                id_cur = -1;
            }
            else // не пара: возвращаем цвет предыдущей клетке и добавляем новую
            {
                document.getElementById(id_cur).classList.add('background_color_blue');
                document.getElementById(id_cur).classList.remove('background_color_green');
                document.getElementById(id).classList.add('background_color_green');
                document.getElementById(id).classList.remove('background_color_blue');
                id_cur = id;
            }
            
        }
    }

}

/* Заполнено ли имя*/
function f_checkName()
{
    var hisName = document.getElementById("hisName").value;
    if ((hisName != null) && (hisName != "") && (hisName.length > 1))
        {return true;}
    else
        {return false;}
}

/* Верно ли заполнено число*/
function f_getColNum()
{
    var cNum = document.getElementById("colNum").value;

    if ((cNum == null) || (cNum == ""))
    {
        cNum = cNumDefault;
        errors.innerHTML = "Не введено число от 5 до 15. Будет использоваться " + cNumDefault;
    }
    else if (cNum < 5)
    {
        cNum = 5;
        errors.innerHTML = "Введенное число меньше 5. Будет использоваться 5";
    }
    else if (cNum > 15)
    {
        cNum = 15;
        errors.innerHTML = "Введенное число больше 15. Будет использоваться 15";
    }
    else if (!(!isNaN(parseFloat(cNum)) && isFinite(cNum)))
    {
        cNum = cNumDefault;
        errors.innerHTML = "Неверно введено число от 5 до 15. Будет использоваться " + cNumDefault;
    }
    else errors.innerHTML = "";

    return cNum;
}

function f_addDate()
{
    // считывание даты
    var day = document.getElementById("date1").value;
    var month = parseInt(document.getElementById("date2").value) + 1;
    var today = new Date();
    var year = today.getFullYear();

    var allDate = day.toString() + month.toString() + year.toString();

    for (var i = 0; i < allDate.length; i++)
    {
        var d = parseInt(allDate.charAt(i));
        if (d > 0) {arrNums.push(d);}
    }
}

/* Перезагрузка при нажатии на кнопку Погадать*/
function f_resetArrNum()
{
    arrNums = new Array(1,2,3,4,5,6,7,8,9,
    1,1,1,1,2,1,3,1,4,1,5,1,6,1,7,1,8,1,9,
    2,2,1,2,2,2,3,2,4,2,5,2,6,2,7,2,8,2,9,
    3,3,1,3,2,3,3,3,4,3,5,3,6,3,7,3,8,3,9,
    4,4,1,4,2,4,3,4,4,4,5,4,6,4,7,4,8,4,9,
    5,5,1,5,2,5,3,5,4,5,5,5,6,5,7,5,8,5,9,
    6,6,1,6,2,6,3,6,4,6,5,6,6,6,7,6,8,6,9,
    7,7,1,7,2,7,3,7,4,7,5,7,6,7,7,7,8,7,9,
    8,8,1,8,2,8,3,8,4,8,5,8,6,8,7,8,8,8,9,
    9,9,1,9,2,9,3,9,4,9,5,9,6,9,7,9,8,9,9);
}

function f_showResult()
{
    result.innerHTML = "";
    for (var i = 0; i < res.length; i++)
    {result.innerHTML += i + " - " + res[i] + "<BR>";}
}