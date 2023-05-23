function f_reset()
{
    start_table.innerHTML = '';
    for_button.innerHTML = '';
    results.innerHTML = '';
    results_text.innerHTML = '';
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

var arr_numbers = [0,1,2,3,4,5,6,7,8,9,
                10,11,12,13,14,15,16,17,18,19,
                20,21,22,23,24,25,26,27,28,29,
                30,31,32,33,34,35];
var arr_numbers_cur = arr_numbers;

function f_getColor(num)
{
    var colors = ['red', 'blue'];
    //return colors[0];
    var c = Math.floor(num/9);
    if (c<=1){return colors[0];}
    else {return colors[1];}
}

function f_mainTable()
{
    start_table.innerHTML = '';
    results.innerHTML = '';
    results_text.innerHTML = '';
    n_cols = document.getElementById('hisName').value.trim().length;
    arr_numbers_cur = f_shuffle(arr_numbers);
    for (var i = 0; i < arr_numbers.length; i++)
    {
        start_table.innerHTML += "<INPUT type='button' style='font-size: 100%; padding:0; margin:0; color:" + f_getColor(arr_numbers_cur[i]) + ";' class='classicWithBorder square_small background_color_blue' id='b_n_" + i + "' value='" + f_getNum(arr_numbers_cur[i]) + "'>";
        if ((i+1)%12==0){start_table.innerHTML += "<BR>";}
    }

    // отобразим следующую кнопку:
    for_button.innerHTML = '<BR><BR><input type="button" class="restart 2small background_color_green" style="width: 150pt; height: 40pt" value="Погадать" onclick="f_setResult();"><BR>';
}

function f_getNum(num)
{
    return num%9+1;
}

var n_cols = 7;
var hisNameChars = [];
function f_setResult()
{
    results.innerHTML = "";
    results_text.innerHTML = '';
    hisNameChars = document.getElementById("hisName").value.trim().split("");
    for (var i = 0; i < n_cols; i++)
    {
        results.innerHTML += "<INPUT type='button' style='font-size: 100%;' class='classic square_small background_color_light_blue' value='" + hisNameChars[i] + "' disabled>";
    }
    results.innerHTML += "<BR><BR>";

    var arr_numsInCols = [];
    for (var i = 0; i < arr_numbers.length; i++)
    {
        var val_cur = f_getNum(arr_numbers_cur[i]);
        results.innerHTML += "<INPUT type='button' style='font-size: 100%; padding:0; margin:0; color:" + f_getColor(arr_numbers_cur[i]) + ";' class='classicWithBorder square_small background_color_blue' id='b2_n_" + i + "' value='" + val_cur + "'>";
        if ((i+1)%n_cols==0){results.innerHTML += "<BR>";}

        if (i < n_cols)
        {
            arr_numsInCols[i] = [val_cur];
        }
        else
        {
            arr_numsInCols[i%n_cols].push(val_cur);
        }
    }
    f_findPaars(arr_numsInCols);
}

function f_findPaars(arr_all)
{
    var paars_global = []; // перечисление пар, какие найдены
    results_text.innerHTML += '<b>Выпавшие пары чисел: ';
    // по каждому столбцу
    for (var j = 0; j < arr_all.length; j++)
    {
        arr = arr_all[j];
        //results.innerHTML += "<BR>" + arr;
        //var arr = [1, 2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 7, 7];
        var countMap = {};
        var result = [];
        var element = -1;

        // Iterate over the array
        for (var i = 0; i < arr.length; i++) {
            var element = arr[i];

            // If the element is already in the count map, increment its count
            if (countMap.hasOwnProperty(element)) {
                countMap[element]++;
            }
            // Otherwise, initialize its count to 1
            else {
                countMap[element] = 1;
            }


        }
        // If the count reaches 2, add the element to the result array
        for (var element in countMap){
            if (countMap[element] === 2) {
                result.push(element);
            }
        }

        //results.innerHTML += '<BR>Elements appearing exactly two times: ' + result;

        if (result.length > 0)
        {
            for (var k = 0; k < result.length; k++)
            {
                if (paars_global.indexOf(result[k]) !== -1){} // если пара встречалась ранее, то игнорируем
                else
                {
                    paars_global.push(result[k]);
                    var positions = f_getPosition(arr, result[k]);
                    // определяем имена клеток
                    var btn_name_1 = 'b2_n_' + (positions[0]*n_cols+j);
                    var btn_name_2 = 'b2_n_' + (positions[1]*n_cols+j);
                    // изменим фон клетки
                    document.getElementById(btn_name_1).classList.add('background_color_white');
                    document.getElementById(btn_name_1).classList.remove('background_color_blue');
                    document.getElementById(btn_name_2).classList.add('background_color_white');
                    document.getElementById(btn_name_2).classList.remove('background_color_blue');

                    var cur_color1 = document.getElementById(btn_name_1).style.color;
                    var cur_color2 = document.getElementById(btn_name_2).style.color;
                    results_text.innerHTML += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font color="' + cur_color1 + '">' + result[k] + '</font>-<font color="' + cur_color2 + '">' + result[k] + '</font>';
                }
            }
        }
    }
    results_text.innerHTML += '</b>'; 
}

function f_getPosition(arr, element)
{
    //results.innerHTML += '<br>element: ' + element + ' arr: ' + arr + ' ';
    var positions = [];
    
    // Iterate over the array
    for (var i = 0; i < arr.length; i++) {
    if (arr[i] == element) {
        // If the element is found, add its index to the positions array
        positions.push(i);
        //results.innerHTML += ' !!! ' + i + ' !!! ';
    }
    }
    
    return positions;
}