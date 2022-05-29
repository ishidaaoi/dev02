// ===========================================================
//   cartAPI 関数
// ===========================================================
  console.log("動いてるよ");
  var cartItems = JSON.parse(localStorage.getItem("cartItems"));
//////////カートAPI組み込み///////////
  const loaderWrapper = document.getElementById("loader-wrapper");
  //////////データ取得後の処理///////////
  //=====ローディング=====//
  loaderWrapper.classList.add("loaded");
  //=====カートページの商品の表示=====//
if (cartItems) {
  let cartTemplate = "";
  for (let i = 0; i < cartItems.length; i++) {
    cartTemplate += `
      <li class="p-inside__item">
      <div class="p-inside__picture">
        <img src="${cartItems[i][4]}" alt="">
      </div>
      <div class="p-inside__data">
        <div class="p-inside__name">${cartItems[i][0]}</div>
        <div class="p-inside__color">全${cartItems[i][1]}</div>
        <div class="p-inside__price">単価(税込):<span class="p-inside__priceNum" data-price="${cartItems[i][2]}">${cartItems[i][2]}円</span>
        </div>
      </div>
      <div class="p-inside__adjustment">
        <div class="p-inside__inner">
          <div class="p-inside__num">
            <div class="p-inside__count">
              <span class="p-inside__countText">${cartItems[i][3]}</span>
            </div>
            <div class="p-inside__arrow">
              <div class="p-inside__arrowUp" data-name="${cartItems[i][0]}" data-brand="${cartItems[i][1]}" data-price="${cartItems[i][2]}" data-num="${cartItems[i][3]}" data-url="${cartItems[i][4]}">
                <img src="./thumbs/14.png" alt="">
              </div>
              <div class="p-inside__arrowDown" data-name="${cartItems[i][0]}" data-brand="${cartItems[i][1]}" data-price="${cartItems[i][2]}" data-num="${cartItems[i][3]}" data-url="${cartItems[i][4]}">
                <img src="./thumbs/15.png" alt="">
              </div>
            </div>
          </div>
          <div class="p-inside__again">
            <p class="p-inside__againText">再計算</p>
          </div>
        </div>
        <div class="p-inside__delete" data-name="${cartItems[i][0]}" data-brand="${cartItems[i][1]}" data-price="${cartItems[i][2]}" data-num="${cartItems[i][3]}" data-url="${cartItems[i][4]}">削除する</div>
      </div>
    </li>`;
  }
  document.getElementById("js-cartTemplate").innerHTML = cartTemplate;
}

  // -----------------------------------------------------------
  //   cartAPI 定数・変数
  // -----------------------------------------------------------
  let total = 0;

//HTMLのid値を使って以下のDOM要素を取得
const upBtn = document.getElementsByClassName('p-inside__arrowUp');
const downBtn = document.getElementsByClassName('p-inside__arrowDown');
const text = document.getElementsByClassName('p-inside__countText');
const resetBtn = document.getElementsByClassName('p-inside__delete');

//ボタンが押されたらカウント減
for (let i = 0; i < downBtn.length; i++) {
  downBtn[i].onclick = function () {
  //0以下にはならないようにする
  if(text[i].innerHTML >= 1) {
    text[i].innerHTML--;
  total = total - cartItems[i][2];
  console.log(total);
  total_ele.innerHTML = total;
}
}
}
//ボタンが押されたらカウント増
for (let i = 0; i < upBtn.length; i++) {
  upBtn[i].onclick = function () {
    text[i].innerHTML++;
    total = total + cartItems[i][2];
    console.log(total);
    total_ele.innerHTML = total;
  }
}
//ボタンが押されたら0に戻る
for (let i = 0; i < resetBtn.length; i++) {
  resetBtn[i].onclick = function () {
  console.log(text[i].innerHTML);
  let koo = cartItems[i][2] * Number(text[i].innerHTML);
  console.log(koo);
  total = total - koo;
  total_ele.innerHTML = total;
  text[i].innerHTML = 0;
  }
}

//商品の合計金額表示用の要素
const total_ele = document.getElementById('js-total');
for (let i = 0; i < cartItems.length; i++) {
  // 合計金額を加算
  total = total + cartItems[i][2];
}
console.log(total);
total_ele.innerHTML = total;
