
//-----------------------載入共用的header跟footer----------------------------

$(document).ready(function () {
    $(".header").load("common.html .header>.nav", function () {
        //手機版漢堡選單點擊
        $('#mobile-menu').click(function () {
            $(this).toggleClass('active');
            $('#common_mask').toggle()
            if ($(this).hasClass('active')) {
                $('.nav_list').slideDown();
            } else {
                $('.nav_list').slideUp();
            }
        })
        //購物車數字載入
        document.addEventListener('click', function () {
            //購物車數字載入
            let items = JSON.parse(localStorage.getItem("car"));
            const cart = document.querySelector('.nav_list .cart_num');
            if (items) {
                if (items.length == 0) {
                    cart.classList.remove('num_active')
                } else {
                    cart.classList.add('num_active');
                    cart.innerHTML = items.length;
                }
            } else {
                cart.classList.remove('num_active')

            }


        })
    });

    //點擊黑色遮罩也能收合
    $('#common_mask').click(function () {
        $('#mobile-menu').click()
    });

    $(".footer").load("common.html .footer>.footer1");
});

//----------------------載入購物車的商品圖片-----------------------------
function get_img(item_id) {
    switch (item_id) {
        //全部商品
        case '圓塔':
            return './image/items/tart (1).jpg';
        case '方塔':
            return './image/items/tart (6).jpg';
        case '開心果優格慕斯':
            return './image/items/mousse (1).jpg';

        case '巧克力溜溜球蛋糕':
            return './image/items/mousse (5).jpg';
        case '香草蛋糕捲':
            return './image/items/mousse (9).JPG';
        case '草莓繪圖蛋糕':
            return './image/items/mousse (11).jpg';
        case '黑醋栗椰子慕斯':
            return './image/items/mousse (7).jpg';
        case '抹茶乳酪塔':
            return './image/items/tart (4).jpg';
        case '開心果塔':
            return './image/items/tart (5).jpg"';
        case '綜合美式軟餅乾':
            return './image/items/cookies (0).jpg';
        case '開心果覆盆子慕斯':
            return './image/items/mousse (8).png';
        case '開心果泡芙':
            return './image/items/choux (3).png';
        case '玫瑰泡芙':
            return './image/items/choux (8).png';
        //季節限定
        case '草莓塔':
            return './image/items/tart (24).jpg';
        case '草莓開心果塔':
            return './image/items/tart (22).jpg';
        case '草莓杯子蛋糕':
            return './image/items/cup cake (5).jpg';
        case '草莓愛心馬卡龍':
            return './image/items/macaron (6).jpg';
        case '草莓夏洛特':
            return './image/items/mousse (13).jpg';
        //杯子蛋糕

        case '薄荷巧克力杯子蛋糕':
            return './image/items/cup cake (1).jpg';
        case 'Oreo杯子蛋糕':
            return './image/items/cup cake (6).jpg';
        case '焦糖煎餅杯子蛋糕':
            return './image/items/cup cake (7).jpg';
        case '抹茶乳酪塔':
            return './image/items/tart (4).jpg"';

        case '香濃芝麻泡芙':
            return './image/items/choux (1).jpg';

        // 加購
        case '(任選兩支)':
            return './image/material/candles.jpg';
        case '(一組五人份)':
            return './image/material/plate.jpg';



        default:
            return "";
    }
}

//-----------------------加入購物車商品存入localstorage (car)----------------------------

function addCar(itemObj) {


    let items = JSON.parse(localStorage.getItem("car"));
    if (items) { // 若存在

        //1找出已經存在的產品與選擇的產品做判斷
        let exist_item = items.filter(function (local_item_obj) {
            return local_item_obj.item_id == itemObj.item_id
        })
        // console.log(exist_item);
        // console.log(exist_item.length);

        //2找出不一樣的產品做判斷
        let exist_item_di = items.filter(function (local_item_obj) {
            if (local_item_obj.item_id != itemObj.item_id) {
                return true;
            }
        })

        //3 合併一樣的產品數量跟金額
        if (exist_item.length != 0) {
            exist_item[0].num += itemObj.num;
            exist_item[0].total += itemObj.total;
            if (exist_item[0].num > 10) {
                alert("購物車商品已達上限10個")
                return;
            } else if (exist_item[0].num < 1) {
                alert("購物車商品最少1個")
                return;

            }

            //合併不一樣的產品和一樣的產品
            exist_item_di.push(exist_item[0]);

        } else {
            items.push(itemObj);  //在陣列中加入最後一個可以使用 push()
        }
    } else { // 若不存在
        items = [itemObj];
    }
    // console.log(items);
    localStorage.setItem("car", JSON.stringify(items));
    //將 JavaScript 值轉換為 JSON 字符串，物件變字串存入
}


// 抓出localstorage商品並顯示在小圖上
function get_items() {
    let items = JSON.parse(localStorage.getItem("car"));
    // console.log(items);

    if (items) {
        let list_html = "";

        items.forEach(function (item, i) {

            list_html += `
            <li>
                <a href="./item.html">
                    <img src="${get_img(item.item_id)}" alt="">
                </a>
                <div class="addcar_item_text">
                    <h1>${item.name}</h1>
                    <div class="addcar_item_dollars">
                        $<p>${item.dollars}</p>
                        <p> &nbsp; x &nbsp;</p>
                        <p>${item.num}</p>
                    </div>
                    <p class="item_id">${item.item_id}</p>
                    <p>已加入購物車</p>
                </div>
            </li>`;
        })

        $('.addcar_item').find('ul').html(list_html);
        // let ul_task_list = document.getElementsByClassName("task_list")[0];
        // ul_task_list.innerHTML = list_html;

        document.querySelector('.nav_list .cart_num').innerHTML = items.length;
        if (items.length > 0) {
            $('.nav_list .cart_num').addClass('active');
        }

    }
};

// -----------------封裝setTimeout功能變成一個類別-----------------------------------
var Timer = function (callback, delay) {
    var timerId, start, remaining = delay;

    this.pause = function () {
        window.clearTimeout(timerId);
        timerId = null;
        remaining -= Date.now() - start;
    };
    this.resume = function () {
        if (timerId) {
            return;
        }

        start = Date.now();
        timerId = window.setTimeout(callback, remaining);
    };
    this.resume();
};
// -----------------封裝setTimeout功能變成一個類別-----------------------------------


//-------------------收藏商品加入清單並存入localstorage (favorite)----------------------------

function addFavorite(itemObj) {

    let items = JSON.parse(localStorage.getItem("favorite"));
    if (items) { // 若存在

        //1找出已經存在的產品與選擇的產品做判斷
        let exist_item = items.filter(function (local_item_obj) {
            return local_item_obj.item_id == itemObj.item_id
        })
        // console.log(exist_item);
        // console.log(exist_item.length);

        //2找出不一樣的產品做判斷
        let exist_item_di = items.filter(function (local_item_obj) {
            if (local_item_obj.item_id != itemObj.item_id) {
                return true;
            }
        })

        //3 合併一樣的產品數量跟金額
        if (exist_item.length != 0) {
            exist_item[0].num += itemObj.num;
            exist_item[0].total += itemObj.total;
            if (exist_item[0].num > 10) {
                alert("購物車商品已達上限10個")
                return;
            } else if (exist_item[0].num < 1) {
                alert("購物車商品最少1個")
                return;
            }

            //合併不一樣的產品和一樣的產品
            exist_item_di.push(exist_item[0]);

        } else {
            items.push(itemObj);  //在陣列中加入最後一個可以使用 push()
        }
    } else { // 若不存在
        items = [itemObj];
    }
    // console.log(items);
    localStorage.setItem("favorite", JSON.stringify(items));
    //將 JavaScript 值轉換為 JSON 字符串，物件變字串存入
}

//小購物車數字改變
// document.addEventListener('click', function () {
//     //購物車數字載入
//     let items = JSON.parse(localStorage.getItem("car"));
//     const cart = document.querySelector('.nav_list .cart_num');
//     if (items) {
//         if (items.length == 0) {
//             cart.classList.remove('num_active')
//         } else {
//             cart.classList.add('num_active');
//             cart.innerHTML = items.length;
//         }
//     }


// })





