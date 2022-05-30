// ===========================================================
//   グローバル定数
// ===========================================================

//ARボタン
const HEADER_AR_BTN = document.getElementById("header--deepar");
const PUSH_BTN = document.getElementsByClassName("js-push");
//カートボタン
const HEADER_CART_BTN = document.getElementById("header--cart");
//モーダル
const MODAL = document.querySelector(".p-modal__container");
const MODAL_BTN = document.querySelector(".p-modal__button");
const MODAL_TEXT = document.querySelector(".p-modal__text");
const CLOSE_BTN_01 = document.getElementById("close-btn");
const CLOSE_BTN_02 = document.getElementById("close-btn02");
const SHOW_CART_BTN = document.getElementById("showCart-btn");
//プロダクトモーダル
const PRODUCT_MODAL = document.querySelector(".p-productModal__container");
const PRODUCT_OVERLAY = document.querySelector(".p-productModal__overlay");
const PRODUCT_MODAL_CLOSE = document.querySelector(".p-productModal__close");
//ARモーダル
const AR_MODAL = document.querySelector(".p-arModal__container");
const AR_OVERLAY = document.querySelector(".p-arModal__overlay");
const AR_MODAL_CLOSE = document.querySelector(".p-arModal__close");
//spAR帯
const BANNER = document.getElementById("js-banner");

// ===========================================================
//   グローバル変数
// ===========================================================

//ボタン管理
let _isMove = 0;
let _isCheck = 0;

// ===========================================================
//   API 関数
// ===========================================================

var data = {
  menu: [
    { id: "1", name: "Brow & Nose Shadow Powder", price: "3520", category: "2", date: "2020/10/1", colors: "1色", details: "ふんわり眉ときれいな鼻筋が描ける。アイブロウ＆ノーズシャドウパウダー。", url: "./thumbs/rip.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Eau De Parfum", price: "4620", category: "1", date: "2022/3/1", colors: "2色", details: "頬の血色感も立体感もコンパクト1つ。満開の桜を咲かせる限定チークカラー。", url: "./thumbs/rip02.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Crystal Bloom Sakura Bouquet", price: "3520", category: "2", date: "2022/2/25", colors: "2色", details: "春風にのって、笑顔の輪を広げる八重桜のように。この世でもっとも幸福感に満ちた、やわらかな香り。", url: "./thumbs/shampoo.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Bloom Mix Mascara", price: "4510", category: "4", date: "2022/3/1", colors: "1色", details: "天に向かい咲き誇る花のように続く、上向きまつ毛。ニュアンスカラーで可憐な仕上がりを叶えるマスカラ。", url: "./thumbs/brow.png", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Jelly Eye Liner", price: "2420", category: "3", date: "2022/1/10", colors: "1色", details: "軽やかに透明感のあるラインが描ける。宝石のような輝きとみずみずしいツヤ感のリキッドアイライナー。", url: "./thumbs/eyeshadow.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Rouge Lip Jewel Gemmy Satin", price: "2420", category: "6", date: "2022/1/1", colors: "1色", details: "まるでジュエリーを纏った時のような幸福感。無重力質感でサテンのツヤを叶える、美しい発色の宝石リップ。", url: "./thumbs/rip02.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Sakura Bouquet Blush Compact", price: "4620", category: "5", date: "2022/3/1", colors: "2色", details: "春風にのって、笑顔の輪を広げる八重桜のように。この世でもっとも幸福感に満ちた、やわらかな香り。", url: "./thumbs/rip02.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Eye Jewel Dew Line", price: "2420", category: "3", date: "2022/1/10", colors: "1色", details: "軽やかに透明感のあるラインが描ける。宝石のような輝きとみずみずしいツヤ感のリキッドアイライナー。", url: "./thumbs/shampoo.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Eyebrow Brush", price: "2200", category: "1", date: "2020/12/1", colors: "1色", details: "厚みのあるフラットな筆で、ふんわり眉が描きやすい。テクニックレスで理想の眉を叶える、優しい肌あたりのアイブロウブラシ。", url: "./thumbs/rip.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Sakura Bouquet Rouge Lip Jewel Gemmy Satin", price: "2420", category: "6", date: "2022/3/1", colors: "1色", details: "ジュエリーのような美発色と上質なサテンのツヤ。桜のようにやわらかな光を宿す限定色リップ&ケース。", url: "./thumbs/eyeshadow.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Glossy Brow Mascara", price: "2420", category: "4", date: "2020/12/1", colors: "1色", details: "繊細なピンクパールで、ツヤやかなフェミニン眉へ。毛流れをととのえて立体感をつくるクリアブロウマスカラ。", url: "./thumbs/brow.png", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
    { id: "1", name: "Bloom Mix Blush Compact", price: "4620", category: "5", date: "2022/2/7", colors: "2色", details: "頬の血色感も立体感もコンパクト1つ。春の陽射しの下、可憐に頬を彩る新色チークカラー。", url: "./thumbs/rip02.jpg", r1: "135", g1: "98", b1: "72", r2: "135", g2: "98", b2: "72", r3: "135", g3: "98", b3: "72", r4: "135", g4: "98", b4: "72", r5: "135", g5: "98", b5: "72", r6: "135", g6: "98", b6: "72" },
  ]
};

// ===========================================================
//   シーケンス上の関数
// ===========================================================

//-----スワイパー-----//
let _mySwiper = new Swiper(".js-swiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  speed: 2000,
  allowTouchMove: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

//-----フェードイン-----//
function fadeInEvent() {
  let fadeInClass = Array.prototype.slice.call(
    document.getElementsByClassName("fadein")
  );
  fadeInClass.forEach(function (element) {
    let boundingClientRect = element.getBoundingClientRect();
    let scroll = document.documentElement.scrollTop || document.body.scrollTop;
    let windowHeight = window.innerHeight;
    if (scroll > scroll + boundingClientRect.top - windowHeight + 200) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
}

//-----ロード時の処理-----//
// window.onload = function () {
//   let loaderWrapper = document.getElementById("loader-wrapper");
//   loaderWrapper.classList.add("loaded");
//   fadeInEvent();
//   window.addEventListener("scroll", fadeInEvent, false);
//   getAPI();
//   //transform対策
//   setTimeout(() => {
//     MODAL_BTN.classList.add("active");
//     MODAL_TEXT.classList.add("active");
//     CLOSE_BTN_01.classList.add("active");
//     CLOSE_BTN_02.classList.add("active");
//     SHOW_CART_BTN.classList.add("active");
//   }, 300);
// };


// ロード時の処理
const keyName = 'visited';
const keyValue = true;
if (!localStorage.getItem(keyName)) {
    //localStorageにキーと値を追加
  localStorage.setItem(keyName, keyValue);
  //ここに初回アクセス時の処理
  let loaderWrapper = document.getElementById("loader-wrapper");
  loaderWrapper.classList.add("loaded");
    console.log("初めての訪問です");
      localStorage.clear();
      window.onload = function () {
        fadeInEvent();
        window.addEventListener("scroll", fadeInEvent, false);
        setTimeout(() => {
          MODAL_BTN.classList.add("active");
          MODAL_TEXT.classList.add("active");
          CLOSE_BTN_01.classList.add("active");
          CLOSE_BTN_02.classList.add("active");
          SHOW_CART_BTN.classList.add("active");
        }, 300);
      };

} else {
    //ここに通常アクセス時の処理
  console.log("訪問済みです");
  window.onload = function () {
      let loaderWrapper = document.getElementById("loader-wrapper");
      loaderWrapper.classList.add("loaded");
      fadeInEvent();
      window.addEventListener("scroll", fadeInEvent, false);
      setTimeout(() => {
        MODAL_BTN.classList.add("active");
        MODAL_TEXT.classList.add("active");
        CLOSE_BTN_01.classList.add("active");
        CLOSE_BTN_02.classList.add("active");
        SHOW_CART_BTN.classList.add("active");
      }, 300);
    };
}


// ===========================================================
//   その他 関数
// ===========================================================

//////////ARモーダルを閉じる関数//////////
function closeArModal () {
  AR_MODAL.classList.remove("active");
  AR_OVERLAY.classList.remove("active");
}

/////////モーダルを閉じる関数//////////
function closeModal () {
  MODAL.classList.remove("active");
  AR_OVERLAY.classList.remove("active");
  setTimeout(() => {
    MODAL_TEXT.innerText = "AR TRY ONのリストに追加しました！";
  }, 200);
}

// ===========================================================
//   click Event
// ===========================================================

//////////safariダブルタップ無効//////////
document.addEventListener("dblclick",
  function (e) {e.preventDefault();},
  {passive: false,}
);

//////////モーダルクローズ(ボタンクリック)//////////
MODAL_BTN.onclick = function () {
  closeModal();
};

//////////ARモーダルクローズ(ボタンクリック)//////////
AR_MODAL_CLOSE.onclick = function () {
  closeArModal();
};

//////////ARモーダル・モーダルクローズ(背景クリック)//////////
AR_OVERLAY.onclick = function () {
  closeArModal();
  closeModal();
};

//////////詳細モーダルクローズ(ボタンクリック)//////////
PRODUCT_MODAL_CLOSE.onclick = function () {
  PRODUCT_MODAL.classList.remove("active");
  PRODUCT_OVERLAY.classList.remove("active");
};

//////////詳細モーダルクローズ(背景クリック)//////////
PRODUCT_OVERLAY.onclick = function () {
  PRODUCT_MODAL.classList.remove("active");
  PRODUCT_OVERLAY.classList.remove("active");
};

// ===========================================================
//   getAPI 関数
// ===========================================================

//////////getAPI組み込み///////////
  //=====productの表示=====//
  let productTemplate = "";
  for (let i = 0; i < data.menu.length; i++) {
    let categoryText = [
      "アイブロウ",
      "アイシャドウ",
      "アイライナー",
      "マスカラ",
      "チーク",
      "リップ",
    ];
    if (data.menu[i].category == 1) {
      categoryText = categoryText[0];
    } else if (data.menu[i].category == 2) {
      categoryText = categoryText[1];
    } else if (data.menu[i].category == 3) {
      categoryText = categoryText[2];
    } else if (data.menu[i].category == 4) {
      categoryText = categoryText[3];
    } else if (data.menu[i].category == 5) {
      categoryText = categoryText[4];
    } else if (data.menu[i].category == 6) {
      categoryText = categoryText[5];
    }
    data.menu[i].num = 1;
    data.menu[i].brand = "JILL STUART";
    productTemplate += `
      <li class="p-product__item fadein">
        <div class="p-product__picture">
          <img src="${data.menu[i].url}" alt="#">
        </div>
        <div class="p-product__name">${data.menu[i].name}</div>
        <p class="p-product__price">税込価格 ${data.menu[i].price}円</p>
        <p class="p-product__category" data-category="${data.menu[i].category}">${categoryText}</p>
        <div class="p-product__buttonWrap">
        <button
          class="p-product__deepar js-selectAr"
          data-name="${data.menu[i].name}" data-brand="${data.menu[i].brand}" data-colors="${data.menu[i].colors}" data-price="${data.menu[i].price}" data-category="${data.menu[i].category}" data-url="${data.menu[i].url}" data-num="${data.menu[i].num}" data-r1="${data.menu[i].r1}" data-g1="${data.menu[i].g1}" data-b1="${data.menu[i].b1}" data-r2="${data.menu[i].r2}" data-g2="${data.menu[i].g2}" data-b2="${data.menu[i].b2}" data-r3="${data.menu[i].r3}" data-g3="${data.menu[i].g3}" data-b3="${data.menu[i].b3}" data-r4="${data.menu[i].r4}" data-g4="${data.menu[i].g4}" data-b4="${data.menu[i].b4}" data-r5="${data.menu[i].r5}" data-g5="${data.menu[i].g5}" data-b5="${data.menu[i].b5}" data-r6="${data.menu[i].r6}" data-g6="${data.menu[i].g6}" data-b6="${data.menu[i].b6}"
        >
          <div class="p-product__icon">
            <img src="./thumbs/ar-icon01.png" alt="#">
          </div>
        </buttonclass=>
        <button
          class="p-product__cart js-cart"
          data-name="${data.menu[i].name}" data-brand="${data.menu[i].brand}" data-colors="${data.menu[i].colors}" data-price="${data.menu[i].price}" data-category="${data.menu[i].category}" data-url="${data.menu[i].url}" data-num="${data.menu[i].num}"
        >
          <div class="p-product__icon">
            <img src="./thumbs/cart-icon01.png" alt="#"></div>
            <p class="p-product__text">カートに<br class="p-product__textBr">追加</p>
        </button>
        </div>
      </li>
    `;
  }
  document.getElementById("js-product").innerHTML = productTemplate;

  //=====詳細モーダルの中身の表示=====//
  let modalTemplate = "";
  for (let i = 0; i < data.menu.length; i++) {
    let categoryText = [
      "アイブロウ",
      "アイシャドウ",
      "アイライナー",
      "マスカラ",
      "チーク",
      "リップ",
    ];
    if (data.menu[i].category == 1) {
      categoryText = categoryText[0];
    } else if (data.menu[i].category == 2) {
      categoryText = categoryText[1];
    } else if (data.menu[i].category == 3) {
      categoryText = categoryText[2];
    } else if (data.menu[i].category == 4) {
      categoryText = categoryText[3];
    } else if (data.menu[i].category == 5) {
      categoryText = categoryText[4];
    } else if (data.menu[i].category == 6) {
      categoryText = categoryText[5];
    }
    data.menu[i].num = 1;
    data.menu[i].brand = "JILL STUART";
    modalTemplate += `
      <li class="p-productModal__content">
        <div class="p-productModal__inner">
          <div class="p-productModal__picture">
            <img src="${data.menu[i].url}" alt="#">
          </div>
          <div class="p-productModal__name">${data.menu[i].name}</div>
          <p class="p-productModal__price">税込価格 ${data.menu[i].price}円</p>
          <div class="p-productModal__days">発売日 ${data.menu[i].date}</div>
          <div class="p-productModal__color">${data.menu[i].colors}</div>
          <p class="p-productModal__category" data-category="${data.menu[i].category}"> ${categoryText}</p>
          <div class="p-productModal__buttonWrap">
            <button
              class="p-productModal__deepar js-selectAr"
              data-name="${data.menu[i].name}" data-brand="${data.menu[i].brand}" data-colors="${data.menu[i].colors}" data-price="${data.menu[i].price}" data-category="${data.menu[i].category}" data-url="${data.menu[i].url}" data-num="${data.menu[i].num}" data-r1="${data.menu[i].r1}" data-g1="${data.menu[i].g1}" data-b1="${data.menu[i].b1}" data-r2="${data.menu[i].r2}" data-g2="${data.menu[i].g2}" data-b2="${data.menu[i].b2}" data-r3="${data.menu[i].r3}" data-g3="${data.menu[i].g3}" data-b3="${data.menu[i].b3}" data-r4="${data.menu[i].r4}" data-g4="${data.menu[i].g4}" data-b4="${data.menu[i].b4}" data-r5="${data.menu[i].r5}" data-g5="${data.menu[i].g5}" data-b5="${data.menu[i].b5}" data-r6="${data.menu[i].r6}" data-g6="${data.menu[i].g6}" data-b6="${data.menu[i].b6}"
            >
              <div class="p-productModal__icon">
                <img src="./thumbs/ar-icon01.png" alt="#">
              </div>
            </button>
            <button
              class="p-productModal__cart js-cart"
              data-name="${data.menu[i].name}" data-brand="${data.menu[i].brand}" data-colors="${data.menu[i].colors}" data-price="${data.menu[i].price}" data-category="${data.menu[i].category}" data-url="${data.menu[i].url}" data-num="${data.menu[i].num}"
            >
              <div class="p-productModal__icon">
                <img src="./thumbs/cart-icon01.png" alt="#">
              </div>
              <p class="p-productModal__text">カートに追加</p>
            </button>
          </div>
        </div>
        <p class="p-productModal__detail">${data.menu[i].details}</p>
      </li>
    `;
  }
  document.getElementById("js-productModal").innerHTML = modalTemplate;

  // -----------------------------------------------------------
  //   getAPI シーケンス上の関数
  // -----------------------------------------------------------

  //////////詳細モーダルの表示//////////
  function showProductModal() {
    const productName = document.getElementsByClassName("p-product__name");
    const modalItem = document.getElementsByClassName(
      "p-productModal__content"
    );
    let number = 0;
    for (let i = 0; i < productName.length; i++) {
      productName[i].onclick = function () {
        let index = i;
        PRODUCT_MODAL.classList.add("active");
        PRODUCT_OVERLAY.classList.add("active");
        modalItem[number].classList.remove("active");
        modalItem[index].classList.add("active");
        number = index;
      };
    }
  }

  ///////////AR機能//////////
  function countAr() {
    const arCntIcon = document.getElementById("js-ar-cnt");
    const arModalText = document.querySelector(".p-arModal__text");
    const arNextBtn = document.querySelector(".p-arModal__button");
    const arPushBtn = document.getElementById("arModal-btn");
    const popUp = document.getElementById("js-popUp");
    let arBtn = document.querySelectorAll(".p-product__deepar");
    let arModalBtn = document.querySelectorAll(".p-productModal__deepar");
    let clicked = [];
    let tryItems = [];
    let arItems = JSON.parse(localStorage.getItem("arItems"));
    //ローディングtransform対策
    arModalText.classList.add("active");
    arNextBtn.classList.add("active");

    if (arItems) {
      for (let i = 0; i < arItems.length; i++) {
        tryItems.push(arItems[i]);
      }
    }

    //=====ARボタンを押した際の処理=====//
    arBtn.forEach(function (arBtn, index) {
      arBtn.addEventListener("click", function () {
        BANNER.classList.add("active");
        SHOW_CART_BTN.classList.remove("active");
        // ARボタンがすでに押されているかの判定
        if (clicked.indexOf(index) >= 0) {
          for (var i = 0; i < clicked.length; i++) {
            if (clicked[i] == index) {
              clicked.splice(i, 1);
              tryItems.splice(i, 1);
            }
          }
          inactivate_btn(index);
        } else if (clicked.indexOf(index) == -1) {
          popUp.classList.add("active");
          setTimeout(() => {
            popUp.classList.remove("active");
          }, 800);
          clicked.push(index);
              let name = this.dataset.name,
            brand = this.dataset.brand,
              price = this.dataset.price,
    category = Number(this.dataset.category),
    url = this.dataset.url,
    r1 = Number(this.dataset.r1),
    g1 = Number(this.dataset.g1),
    b1 = Number(this.dataset.b1);
          tryItems.push([
            name,
            brand,
            price,
            category,
            url,
            r1,
            g1,
            b1
          ]);
          //データ表示
          for (let i = 0; i < tryItems.length; i++) {
            console.log(
              tryItems[i][0],
              tryItems[i][1],
              tryItems[i][2],
              tryItems[i][3],
              tryItems[i][4],
              tryItems[i][5],
              tryItems[i][6],
              tryItems[i][7],
              tryItems[i][8],
              tryItems[i][9],
              tryItems[i][10],
              tryItems[i][11],
              tryItems[i][12],
              tryItems[i][13],
              tryItems[i][14],
              tryItems[i][15],
              tryItems[i][16],
              tryItems[i][17],
              tryItems[i][18],
              tryItems[i][19],
              tryItems[i][20],
              tryItems[i][21],
              tryItems[i][22]
            );
          }
          activate_btn(index);
        }
        console.log(tryItems.length);
        localStorage.setItem("arItems",JSON.stringify(tryItems));
        console.log(tryItems.length);
      });
    });

    //=====詳細モーダルのARボタンを押した際の処理=====//
    arModalBtn.forEach(function (arModalBtn, index) {
      arModalBtn.addEventListener("click", function () {
        BANNER.classList.add("active");
        SHOW_CART_BTN.classList.remove("active");
        // カートボタンがすでに押されているかの判定
        if (clicked.indexOf(index) >= 0) {
          for (var i = 0; i < clicked.length; i++) {
            if (clicked[i] == index) {
              clicked.splice(i, 1);
              tryItems.splice(i, 1);
            }
          }
          inactivate_btn(index);
        } else if (clicked.indexOf(index) == -1) {
          popUp.classList.add("active");
          setTimeout(() => {
            popUp.classList.remove("active");
          }, 800);
          clicked.push(index);
          let name = this.dataset.name,
            brand = this.dataset.brand,
            price = this.dataset.price,
            category = Number(this.dataset.category),
            url = this.dataset.url,
            r1 = Number(this.dataset.r1),
            g1 = Number(this.dataset.g1),
            b1 = Number(this.dataset.b1);
          tryItems.push([
            name,
            brand,
            price,
            category,
            url,
            r1,
            g1,
            b1
          ]);
          for (let i = 0; i < tryItems.length; i++) {
            console.log(
              tryItems[i][0],
              tryItems[i][1],
              tryItems[i][2],
              tryItems[i][3],
              tryItems[i][4],
              tryItems[i][5],
              tryItems[i][6],
              tryItems[i][7],
              tryItems[i][8],
              tryItems[i][9],
              tryItems[i][10],
              tryItems[i][11],
              tryItems[i][12],
              tryItems[i][13],
              tryItems[i][14],
              tryItems[i][15],
              tryItems[i][16],
              tryItems[i][17],
              tryItems[i][18],
              tryItems[i][19],
              tryItems[i][20],
              tryItems[i][21],
              tryItems[i][22]
            );
          }
          activate_btn(index);
        }
        console.log(tryItems.length);
        localStorage.setItem("arItems",JSON.stringify(tryItems));
        console.log(tryItems.length);
      });
    });

    //=====ヘッダーのARボタン・バナーを押した際の処理=====//
    for (let i = 0; i < PUSH_BTN.length; i++) {
      PUSH_BTN[i].onclick = function () {
        //モーダルの判定
        if (tryItems.length === 0) {
          MODAL_TEXT.innerText =
            "まだAR TRY ONのリストに何も追加されていません";
          MODAL.classList.add("active");
          AR_OVERLAY.classList.add("active");
          SHOW_CART_BTN.classList.remove("active");
        } else {
          //=====ARモーダルに組み込み=====//
          let modalAr = "";
          for (let i = 0; i < tryItems.length; i++) {
            modalAr += `
              <li class="p-arModal__content">
                <div class="p-arModal__inner">
                  <div class="p-arModal__picture">
                    <img src="${tryItems[i][4]}" alt="#">
                  </div>
                  <div class="p-arModal__name">${tryItems[i][0]}</div>
                </div>
              </li> `;
          }
          document.getElementById("js-arModal").innerHTML = modalAr;
          AR_MODAL.classList.add("active");
          AR_OVERLAY.classList.add("active");
        }
      };
    }

    //=====データ送信後、AR画面へ移動する前の処理(ボタンのアクティブを外す、配列を空にする)=====//
    function removeBtnSign() {
      return new Promise((resolve, reject) => {
        tryItems.splice(0);
        clicked.splice(0);
        BANNER.classList.remove("active");
        arCntIcon.parentNode.classList.remove("active");
        arCntIcon.innerHTML = tryItems.length;
        for (let i = 0; i < arBtn.length; i++) {
            arBtn[i].classList.remove("active");
        }
        for (let i = 0; i < arModalBtn.length; i++) {
          arModalBtn[i].classList.remove("active");
        }
        console.log("外す");
        resolve();
      });
    }

    //=====AR画面へ移動する際の処理=====//
    arPushBtn.onclick = function () {
          removeBtnSign()
          .then(() => {
            console.log("AR画面へ移動");
            location.href = '000001';
            MODAL_TEXT.innerText = "AR TRY ONのリストに追加しました！";
          })
        .catch((error) => {
          console.log(error);
        });
    };

    //=====ARボタンが押されていない(選択されていない)際の処理=====//
    function activate_btn(index) {
      if (tryItems.length >= 1) {
        arCntIcon.parentNode.classList.add("active");
      }
      arCntIcon.innerHTML = tryItems.length;
      arBtn[index].classList.add("active");
      arModalBtn[index].classList.add("active");
    }

    //=====ARボタンが既に押されている際の処理=====//
    function inactivate_btn(index) {
      if (tryItems.length == 0) {
        arCntIcon.parentNode.classList.remove("active");
        BANNER.classList.remove("active");
      }
      arCntIcon.innerHTML = tryItems.length;
      arBtn[index].classList.remove("active");
      arModalBtn[index].classList.remove("active");
    }

  }

  //////////カート機能///////////
  function countCart() {
    const cartCntIcon = document.getElementById("js-cart-cnt");
    let cartBtn = document.querySelectorAll(".p-product__cart");
    let cartModalBtn = document.querySelectorAll(".p-productModal__cart");
    let clicked02 = [];
    let saveItems = [];

    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (cartItems) {
        var id;
        for (var i = 0; i < cartItems.length; i++) {
          id = cartItems[i].id;
          saveItems.push(cartItems[i]);
          clicked02.push(id);
          activate_btn(id);
        }
        if(cartItems.length != 0){
          cart_cnt_icon.innerHTML = save_items.length;;
        }
      }


    //=====カートボタンを押した際の処理=====//
    cartBtn.forEach(function (cartBtn, index) {
      cartBtn.addEventListener("click", function () {
        // カートボタンがすでに押されているかの判定
        MODAL.classList.add("active");
        AR_OVERLAY.classList.add("active");
        SHOW_CART_BTN.classList.add("active");
        console.log(clicked02.length + 1);
        clicked02.push(index);
            let name = this.dataset.name,
            brand = this.dataset.brand,
            price = Number(this.dataset.price),
            num = this.dataset.num,
            url = this.dataset.url;
        saveItems.push([
          name,
              brand,
              price,
              num,
              url
        ]);
        for (let i = 0; i < saveItems.length; i++) {
          console.log(
            saveItems[i][0],
            saveItems[i][1],
            saveItems[i][2],
            saveItems[i][3],
            saveItems[i][4]
          );
        }
        console.log(index);
        activate_btn(index);
        localStorage.setItem("cartItems",JSON.stringify(saveItems));
        console.log(saveItems.length);
      });
    });

    //=====詳細モーダルのカートボタンを押した際の処理=====//
    cartModalBtn.forEach(function (cartModalBtn, index) {
      cartModalBtn.addEventListener("click", function () {
        // カートボタンがすでに押されているかの判定
        MODAL.classList.add("active");
        AR_OVERLAY.classList.add("active");
        SHOW_CART_BTN.classList.add("active");
        console.log(clicked02.length + 1);
        clicked02.push(index);
            let name = this.dataset.name,
            brand = this.dataset.brand,
            price = Number(this.dataset.price),
            num = this.dataset.num,
            url = this.dataset.url;
        saveItems.push([
          name,
              brand,
              price,
              num,
              url
        ]);
        for (let i = 0; i < saveItems.length; i++) {
          console.log(
            saveItems[i][0],
            saveItems[i][1],
            saveItems[i][2],
            saveItems[i][3],
            saveItems[i][4]
          );
        }
        console.log(index);
        activate_btn(index);
        localStorage.setItem("cartItems",JSON.stringify(saveItems));
        console.log(saveItems.length);
      });
    });

    //=====データ送信・ページ移動の前にnum=0の配列を削除する処理=====//
    function check() {
      return new Promise((resolve, reject) => {
        saveItems = saveItems.filter(function(element) {
          return element.indexOf(0) === -1;
        });
        console.log(saveItems);
        console.log("カートデータに送る配列を表示");
        resolve();
      });
    }

    //=====ページ移動の前にcartDataに送る処理=====//
    function sendCart() {
      if (saveItems.length === 0) {
        MODAL.classList.add("active");
        AR_OVERLAY.classList.add("active");
        SHOW_CART_BTN.classList.remove("active");
        MODAL_TEXT.innerText = "まだカートに何も追加されていません";
      } else {
          MODAL.classList.remove("active");
          AR_OVERLAY.classList.remove("active");
          console.log("データ送信完了");
        //   resolve();
        // });
        console.log("カート画面へ移動");
        window.location.href = "./confirm.html";
        MODAL_TEXT.innerText = "AR TRY ONのリストに追加しました！";
      }
    }
    //=====ヘッダーのカートボタンでカートページ移動する処理=====//
    HEADER_CART_BTN.onclick = function () {
        check()
        .then(() => {
          sendCart()
        })
        .catch((error) => {
          console.log(error);
        });
    };
    //=====モーダルのカート画面へボタンでカートページ移動する処理=====//
    SHOW_CART_BTN.onclick = function () {
      check()
        .then(() => {
          sendCart()
        })
        .catch((error) => {
          console.log(error);
        });
    };

    //=====カートボタンを押した際の処理=====//
    function activate_btn(index) {
      if (saveItems.length >= 1) {
        cartCntIcon.parentNode.classList.add("active");
      }
      cartCntIcon.innerHTML = clicked02.length;
      MODAL_TEXT.innerText = "カートに追加しました！";
    }
  }

  showProductModal();
  countAr();
  countCart();
// }
