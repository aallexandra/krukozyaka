var strHerName = "Пушкин Александр";//"Ахматова Анна";
var strHisName = "Ахматова Анна";//"Пушкин Александр";

var arrVertValues;
var arrHorValues;
var curParent = 0;
var arrAreas = [];

function f_getJoy()
{
	strHerName = document.getElementById('herName').value;
	strHisName = document.getElementById('hisName').value;
	
	// очистка результатов предыдущего гадания
	areaJoinTable.innerHTML = "";
	areaTable.innerHTML = "";
	errorMsg.innerHTML = "";
	results.innerHTML = "";
	
	// вывод результатов
	if ((f_checkNames(strHerName) != false) && (f_checkNames(strHisName) != false))
	{
		f_calculate();
	}
}

// проверка, что строка содержит русские буквы и пробел
function f_checkNames(str)
{
	var strNoSpace = str.replace(/\s/gi, '');
	 
	var re  = new RegExp("^[а-яА-Я\s ]+$"); 
	if(re.exec(str) == null)
	{
		errorMsg.innerHTML += "Неверно заполнены поля: Имена и фамилии могут содержать только русские буквы<BR>";
		return false;
	}
	else if (strNoSpace.length <= 2)
	{
		errorMsg.innerHTML += "Неверно заполнены поля: Длина данных должна быть не менее трех символов<BR>";
		return false;
	}
	return true;
}

function f_calculate()
{
arrHorValues = f_getLettersArray(strHerName);
arrVertValues = f_getLettersArray(strHisName);

// разбивка букв на три группы
var arrAreasLetters = {а:'A',
б:'A',
в:'A',
г:'A',
д:'B',
е:'B',
ё:'B',
ж:'C',
з:'A',
и:'B',
й:'C',
к:'A',
л:'B',
м:'B',
н:'B',
о:'C',
п:'C',
р:'B',
с:'A',
т:'A',
у:'B',
ф:'C',
х:'A',
ц:'B',
ч:'B',
ш:'B',
щ:'C',
ъ:'C',
ы:'C',
ь:'C',
э:'C',
ю:'C',
я:'A'};

// задание двумерного массива из нулей (сначала поле не раскрашено) 
// пусть массив одномерный - будем к нему обращаться по индексам
var arrField = [];
for (var i = 0; i < arrVertValues.length; i++)
{
	arrField[i] = [];
	for (var j = 0; j < arrHorValues.length; j++)
		arrField[i][j] = 0;
}

// пробегаемся по всем ячейкам и раскрашиваем совпадающие
for (var i = 0; i < arrVertValues.length; i++)
{
for (var j = 0; j < arrHorValues.length; j++)
{
	// закраска совпадающих букв и смежных клеток
	if (arrHorValues[j] == arrVertValues[i])
	{
		// закраска соседей
		if (i > 0) arrField[i - 1][j] = 1; // закраска верхнего соседа
		if (i < (arrVertValues.length - 1)) arrField[i + 1][j] = 1; // закраска нижнего соседа
		if (j > 0) arrField[i][j - 1] = 1; // закраска левого соседа
		if (j < (arrHorValues.length - 1)) arrField[i][j + 1] = 1; // закраска правого соседа
	}
	
	// закраска букв из одной области (закраска отдельной клетки)
	if (arrAreasLetters[arrHorValues[j]] == arrAreasLetters[arrVertValues[i]])
		arrField[i][j] = 1;
}
}

// отображение результатов (отображается для отладки - потом убрать)
var str = "<BR>";
for (var i = 0; i < arrVertValues.length; i++)
{
for (var j = 0; j < arrHorValues.length; j++)
{
	str += arrField[i][j] + " ";
}
str+= "<BR>";
} 
//document.write(str);
//areaTable.innerHTML += "Закраска совпадающих областей:<BR>";
//areaTable.innerHTML += str;


// теперь надо вычислить количество областей


// 1. каждой клетке ставим в соответствие клетку-родителя
//var arrAreas = [];
//var curParent = 0;
for (var i = 0; i < arrVertValues.length; i++)
{
arrAreas[i] = [];
for (var j = 0; j < arrHorValues.length; j++)
{
	// закраска совпадающих букв и смежных клеток
	if (arrField[i][j] == 0)
	{
		arrAreas[i][j] = 0;
	}
	else
	{
		curParent++;
		arrAreas[i][j] = curParent;
	}
}
}
	
//document.write("<BR>Всего закрашенных клеток: " + curParent);
var cellsNum = arrVertValues.length*arrHorValues.length;
results.innerHTML += "<BR><b>Всего клеток:</b> " + cellsNum;
results.innerHTML += "<BR><b>Всего закрашенных клеток:</b> " + curParent;

// ! потом переделать: вычислять коэффициент по другой формуле 
var koef = Math.round((curParent*1.3/(cellsNum + (1.3 - 1)*curParent))*100);
results.innerHTML += "<BR><BR><b>Общий коэффициент радости:</b> " + koef + " " + f_koef_description(koef);

// 2. поиск областей
for (var i = 0; i < arrVertValues.length; i++)
{
for (var j = 0; j < arrHorValues.length; j++)
{
	// смотрим на смежную нижнюю клетку
	if (i < (arrVertValues.length - 1))
		if ((arrAreas[i][j] > 0) && (arrAreas[i + 1][j] > 0))
		{
			f_joinAreas(arrAreas[i + 1][j], arrAreas[i][j]);
		}
	// смотрим на смежную правую клетку
	if (j < (arrHorValues.length - 1))
		if ((arrAreas[i][j] > 0) && (arrAreas[i][j + 1] > 0))
		{
			f_joinAreas(arrAreas[i][j + 1], arrAreas[i][j]);
		}
}
}



f_drowAreas(arrAreas, arrVertValues, arrHorValues);

// теперь надо вычислить количество клеток в каждой области
// первоначально для всех областей зададим длину 1
var numCellsInEachArea = new Array();
for (var i = 0; i < curParent; i++)
	numCellsInEachArea[i] = 1;
	
var c = 0;
var arrAreasCopy = arrAreas;
for (var i = 0; i < arrVertValues.length; i++)
{
for (var j = 0; j < arrHorValues.length; j++)
{
	if (arrAreas[i][j] > 0)
	{
		numCellsInEachArea[c] = f_countCellsInArea(arrAreas[i][j]);
		c++;
	}
	
}
}

var str = "";
for (var i = 0; i < numCellsInEachArea.length; i++)
{
	str += " " + numCellsInEachArea[i];
}
//document.write("<BR><BR>" + str + "<BR>");

// подсчет сколько каких типов областей: маленькие, большие, огромные
var arrTypes = f_countAreasType(numCellsInEachArea);
//document.write("<BR>Маленьких радостей: " + arrTypes[0]);
//document.write("<BR>Больших радостей: " + arrTypes[1]);
//document.write("<BR>Огромных радостей: " + arrTypes[2]);

// количество радостей с процентах
var rHuge = Math.round(arrTypes[2]/(arrTypes[0] + arrTypes[1] + arrTypes[2])*100);
var rBig = Math.round(arrTypes[1]/(arrTypes[0] + arrTypes[1] + arrTypes[2])*100);
var rSmall = 100 - rHuge - rBig;

results.innerHTML += "<BR><b>Маленьких радостей:</b> " + rSmall + "%";
results.innerHTML += "<BR><b>Больших радостей:</b> " + rBig + "%";
results.innerHTML += "<BR><b>Огромных радостей:</b> " + rHuge + "%";

} // конец функции f_calculate










function f_countAreasType(arrT)
{
	var arrTypes = new Array(0, 0, 0);
	// 0 - маленькие; 1 - большие; 2 - огромные
	for (var i = 0; i < arrT.length; i++)
	{
		if (arrT[i] <= 4) arrTypes[0]++;
		else if ((arrT[i] > 4) && (arrT[i] <= 15)) arrTypes[1]++;
		else arrTypes[2]++;
	}
	return arrTypes;
}


function f_countCellsInArea(val)
{
	var cc = 0;
	for (var i = 0; i < arrVertValues.length; i++)
	{
	for (var j = 0; j < arrHorValues.length; j++)
	{
		if (arrAreas[i][j] == val)
			cc++;
	}
	}
	f_joinAreas(val, 0);
	return cc;
}





function f_joinAreas(oldValue, newValue)
{
	if (oldValue == newValue) return;
	var c = 0;
	for (var i = 0; i < arrVertValues.length; i++)
	{
	for (var j = 0; j < arrHorValues.length; j++)
	{
		if (arrAreas[i][j] == oldValue)
		{
			arrAreas[i][j] = newValue;
			if (c == 0) {curParent--;c++;}
		}
	}
	}
}

/* Отображение раскрашенных и нераскрашенных клеток*/
function f_drowAreas(arrAreas, arrVertValues, arrHorValues)
{
	radosti_ona.innerHTML = '';
	radosti_on.innerHTML = '';
	radosti_table.innerHTML = '';
	// 1. строка с буквами Она (горизонтальная)
    for (var i = 0; i < arrHorValues.length; i++)
    {
        radosti_ona.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classicWithBorder square_small background_color_green' value='" + arrHorValues[i] + "'>";
    }

	// 2. строка с буквами Он (вертикальная)
    for (var i = 0; i < arrVertValues.length; i++)
    {
        radosti_on.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classicWithBorder square_small background_color_green' value='" + arrVertValues[i] + "'><BR>";
    }

	// 3. Таблица с областями
	for (var i = 0; i < arrVertValues.length; i++)
	{
		for (var j = 0; j < arrHorValues.length; j++)
		{
			var class_color = (arrAreas[i][j] > 0)?"background_color_red":"background_color_light_grey";
			radosti_table.innerHTML += "<input type='button' value='' style='font-size: 100%;' class='classicWithBorder square_small " + class_color + "'>";
		}
		radosti_table.innerHTML += "<BR>";
	} 



}













function f_show_areas(){if (draw_areas.style.display=='none'){draw_areas.style.display='block';}else {draw_areas.style.display='none';}}

// Перевод всех букв в строчные и оставление только русских букв
function f_getLettersArray(str)
{
	str = str.toLowerCase();
	
	var k = 0;
	var arrLetters = new Array();
	
	for (var i = 0; i < str.length; i++)
	{
		if ((str.charAt(i) >= 'а') && (str.charAt(i) <= 'я'))
			{arrLetters[k] = str.charAt(i); k++;}
	}
	
	return arrLetters;
}

function f_koef_description(koef)
{
	var description = ["очень высокий", "высокий", "средний", "не высокий", "низкий"];
	var index = 0;
	
	if (koef < 84) index++;
	if (koef < 70) index++;
	if (koef < 48) index++;
	if (koef < 35) index++;
	
	var desc = "(" + description[index] + ")";

	return desc;
}




