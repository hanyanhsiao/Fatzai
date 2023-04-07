
//-----------------------載入共用的header跟footer----------------------------

$(document).ready(function () {
    $(".header").load("common.html .header>.nav", function () {
        $('#mobile-menu').click(function () {
            $(this).toggleClass('active');
            $('#common_mask').toggle()
            if ($(this).hasClass('active')) {
                $('.nav_list').slideDown();
            } else {
                $('.nav_list').slideUp();

            }
        })
    });
    $(".footer").load("common.html .footer>.footer1");
    $('#common_mask').click(function () {
        $('#mobile-menu').click()
    });
});

//----------------------載入購物車的商品圖片-----------------------------
function get_img(item_id) {
    switch (item_id) {
        case '圓塔':
            return './image/items/tart (1).jpg';
        case '方塔':
            return './image/items/tart (6).jpg';
        case '開心果優格慕斯':
            return './image/items/mousse (1).jpg';
        case '巧克力溜溜球蛋糕':
            return './image/items/mousse (5).jpg';
        case '草莓塔':
            return './image/items/tart (24).jpg';
        case '草莓開心果塔':
            return './image/items/tart (22).jpg';
        case '草莓杯子蛋糕':
            return './image/items/cup cake (5).jpg';
        case '薄荷巧克力杯子蛋糕':
            return './image/items/cup cake (1).jpg';
        case 'Oreo杯子蛋糕':
            return './image/items/cup cake (6).jpg';
        case '焦糖煎餅杯子蛋糕':
            return './image/items/cup cake (7).jpg';
        case '抹茶乳酪塔':
            return './image/items/tart (4).jpg"';
        case '開心果塔':
            return './image/items/tart (5).jpg"';
        case '香濃芝麻泡芙':
            return './image/items/choux (1).jpg';
        case '開心果泡芙':
            return './image/items/choux (3).png';
        case '玫瑰泡芙':
            return './image/items/choux (8).png';



        default:
            return "";
    }
}

//-----------------------加入購物車商品存入localstorage----------------------------

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
            }

            //合併不一樣的產品和一樣的產品
            exist_item_di.unshift(exist_item[0]);

        } else {
            items.unshift(itemObj);  //在陣列中加入在第一個則可以使用 unshift()
        }
    } else { // 若不存在
        items = [itemObj];
    }
    // console.log(items);
    localStorage.setItem("car", JSON.stringify(items));
    //將 JavaScript 值轉換為 JSON 字符串，物件變字串存入
}



