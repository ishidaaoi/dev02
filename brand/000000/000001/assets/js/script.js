// ===========================================================
//  グローバル変数
// ===========================================================
let _canvasHeight = window.innerHeight;
let _canvasWidth = window.innerWidth;

// 0：メイクをしていない
// 1：メイクをしている
let _isVisible = 0;

// リアカメラ・フロントカメラの切り替え
// 0：フロント
// 1：リア
let _isSwitch = 0;
let _shotFlag = true;

// 比較機能
// 0：before
// 1：after
let _shutterCount = 0;
let _beforePhoto;
let _afterPhoto;
let _beerFlag = false;

// キャプチャ・比較機能のモーダル
let _modal = document.querySelector('.modal-container');
let _overlay = document.querySelector('.modal-overlay');
let _modalText = document.getElementById('modal-text');
let _modalFooter = document.getElementById('modal-footer');

// 商品選択エリアの表示切り替え
let _accTabs = document.querySelectorAll('.acc-tab');
let _accContents = document.querySelectorAll('.acc-content');
let _accArrow =  document.querySelectorAll('.acc-icon');

// カラー選択6色＋リップグロス
let _colorBtn01 = document.getElementById('colorBtn-01'),
_colorBtn02 = document.getElementById('colorBtn-02'),
_colorBtn03 = document.getElementById('colorBtn-03'),
_colorBtn04 = document.getElementById('colorBtn-04'),
_colorBtn05 = document.getElementById('colorBtn-05'),
_colorBtn06 = document.getElementById('colorBtn-06'),
_glossBtnWrap = document.getElementById('lipgloss-wrap');


// ===========================================================
//  deepAR
// ===========================================================
let deepAR = DeepAR({
	canvasWidth: _canvasWidth,
	canvasHeight: _canvasHeight,
	licenseKey: '98e0c740bb6799f9119703da94c9cb3a64e4b7d1d9ba89d61cb38f055bb68b3ef6480bf0823f2fc4',
	canvas: document.getElementById('deepar-canvas'),
	numOfFaces: 1,
	libPath: './lib',
	segmentationInfoZip: 'segmentation.zip',
	onInitialize: function() {
		startExternalVideo(1);
		deepAR.switchEffect(0, 'slot', './effects/220329_w_2', function() {
			let names = ['face_makeup','eyebrow_quad','eyeshadow','eyeshadow2','eyeshadow3','eyeshadow4','eyeshadow5', 'eyelashes','eyeliner','lips','lip_gloss'];
			for (let k = 0; k<names; k++) {
				deepAR.changeParameterBool(names[k], '', 'enabled', false);
			}
		})
  	},
	onScreenshotTaken: function(photo) {
		html2canvas(document.querySelector('#cvsWrap')).then(canvas => {
			let downloadEle = document.createElement('a');
			downloadEle.href = canvas.toDataURL('image/png');
			let poneImg = document.getElementById('modal-phot');
			poneImg.src = downloadEle;
			document.getElementById('save-btn1').onclick = () => {
				downloadEle.download = 'canvas.png';
				downloadEle.click();
				downloadEle.remove();
				_modal.classList.remove('active');
				overlay.classList.remove('active');
			}
			document.getElementById('save-btn2').onclick = () => {
				downloadEle.download = 'canvas.jpeg';
				downloadEle.click();
				downloadEle.remove();
				_modal.classList.remove('active');
				overlay.classList.remove('active');
			}
		});
		if(_shutterCount == 0){
			_afterPhoto = photo;
			let afterImg = document.getElementById('afterImg');
			afterImg.src = photo;
			_shutterCount = 1
		} else if(_shutterCount == 1){
			_beforePhoto = photo;
			let ele2 = document.getElementById('beer-slider');
			let beforeImg = document.getElementById('beforeImg');
			let width = ele2.clientWidth;
			beforeImg.style.width = width + 'px';
			beforeImg.src = photo;
			_shutterCount = 0;
			_beerFlag = true;
		}
	}
});

deepAR.onCameraPermissionAsked = function() {
	console.log('camera permission asked');
};
deepAR.onCameraPermissionGranted = function() {
	console.log('camera permission granted');
};
deepAR.onCameraPermissionDenied = function() {
	console.log('camera permission denied');
};
deepAR.onFaceVisibilityChanged = function(visible) {
	console.log('face visible', visible);
};
deepAR.onVideoStarted = function() {
	document.getElementById('loader-js').classList.add('loaded-js');
};

deepAR.downloadFaceTrackingModel('./lib/models-68-extreme.bin');

let videoObjects = {};
function startExternalVideo(id) {
	let video = document.createElement('video');
	video.id = 'camera';
	video.muted = true;
	video.loop = true;
	video.controls = true;
	video.setAttribute('playsinline', 'playsinline');
	video.style.width = '100%';
	video.style.height = '100%';
	if (id == 2) video.facingMode = 'environment';

	let videoContainer = document.createElement('div');
	videoContainer.appendChild(video);
	videoContainer.id = id;
	videoContainer.style.width = '1px';
	videoContainer.style.height = '1px';
	videoContainer.style.position = 'absolute';
	videoContainer.style.top = '0px';
	videoContainer.style.left = '0px';
	videoContainer.style['z-index'] = '-1';
	document.body.appendChild(videoContainer);

	videoObjects.videoContainer = videoContainer;
	videoObjects.video = video;

	let _facingMode = (id == 1) ? 'user' : 'environment';
	navigator.mediaDevices.getUserMedia({
	audio: false,
	video: { facingMode: _facingMode }})
	.then(function(stream) {
		try {
			video.srcObject = stream;
		} catch (error) {
			video.src = URL.createObjectURL(stream);
		}
		setTimeout(function() {
			video.play();
		}, 50);
	}).catch(function(error) {
		console.log('error in video play:', error);
	});

	let _setVideoFlg = (id == 1) ? true : false;
	deepAR.setVideoElement(video, _setVideoFlg);
	document.getElementById('loader-js').classList.add('loaded-js');
}

function cleanupVideoObjects() {
	if (videoObjects.video.srcObject) {
		videoObjects.video.srcObject.getTracks().forEach(track => track.stop())
	}
}

// ===========================================================
//   GAS selectedAPI 関数
// ===========================================================

// カルーセル用意
class Carousel {
	constructor(query) {
		this.$elm = document.querySelector(query);
		this.maxIndex = Math.round(this.$elm.scrollWidth / this.$elm.clientWidth);
	}
	get index() {
		let index = Math.round(this.$elm.scrollLeft / this.$elm.clientWidth);
		return index;
	}
	goto(index) {
		let i = (index + this.maxIndex) % this.maxIndex;
		this.$elm.children[i].scrollIntoView({ behavior: 'smooth' });
	}
}

// カルーセルにimgを入れる
function seetingCal(data) {
	let carouselElm = document.getElementById('carousel-data');
	for (i = 0; i < data.length; i++) {
		if (data[i] != null) {
			let aTag = document.createElement('a');
			aTag.classList.add('aTag');
			aTag.id = 'carousel-img-' + data[i]['category'] + '-' + i;
			aTag.href = 'javascript:void(0);';
			aTag.dataset.r1 = data[i]['r1'];
			aTag.dataset.r2 = data[i]['r2'];
			aTag.dataset.r3 = data[i]['r3'];
			aTag.dataset.r4 = data[i]['r4'];
			aTag.dataset.r5 = data[i]['r5'];
			aTag.dataset.r6 = data[i]['r6'];
			aTag.dataset.g1 = data[i]['g1'];
			aTag.dataset.g2 = data[i]['g2'];
			aTag.dataset.g3 = data[i]['g3'];
			aTag.dataset.g4 = data[i]['g4'];
			aTag.dataset.g5 = data[i]['g5'];
			aTag.dataset.g6 = data[i]['g6'];
			aTag.dataset.b1 = data[i]['b1'];
			aTag.dataset.b2 = data[i]['b2'];
			aTag.dataset.b3 = data[i]['b3'];
			aTag.dataset.b4 = data[i]['b4'];
			aTag.dataset.b5 = data[i]['b5'];
			aTag.dataset.b6 = data[i]['b6'];
			aTag.dataset.name = data[i]['name'];
			aTag.dataset.price = data[i]['price'];
			carouselElm.appendChild(aTag);

			let aTagSetdata = document.getElementById('carousel-img-' + data[i]['category'] + '-' + i);
			let carouselImgElm = document.createElement('img');
			carouselImgElm.src = data[i]['url'];
			carouselImgElm.alt = data[i]['name'];
			carouselImgElm.classList.add('sample-data');
			aTagSetdata.appendChild(carouselImgElm);
    	}
  	}
}

// deepARの処理
function settingMake() {
	let settings = [
		{
			'name': 'アイブロウ',
			'category': 1,
			'gameObject': ['eyebrow_quad'],
			'parameter': 'u_color',
			'a': 1.0
		},
		{
			'name': 'アイシャドウ',
			'category': 2,
			'gameObject': ['eyeshadow'],
			'parameter': 'u_color',
			'a': 1.0
		},
		{
			'name': 'アイライナー',
			'category': 3,
			'gameObject': ['eyeliner'],
			'parameter': 'u_color',
			'a': 0.8
		},
		{
			'name': 'マスカラ',
			'category': 4,
			'gameObject': ['eyelashes'],
			'parameter': 'u_color',
			'a': 1.0
		},
		{
			'name': 'チーク',
			'category': 5,
			'gameObject': ['face_makeup'],
			'parameter': 'blushColor',
			'a': 1.0
		},
		{
			'name': 'リップ',
			'category': 6,
			'gameObject': ['lips'],
			'parameter': 'u_color',
			'a': 0.6
		}
 	];
	for (let i = 0; i< settings.length; i++) {
		let aTags = document.querySelectorAll('.aTag');
		let circles = document.querySelectorAll('.circle');
		let aTagArr = document.querySelectorAll('[id^="carousel-img-'+ settings[i]['category'] +'-"]');

		aTags.forEach(aTag => {
			aTag.addEventListener('click', function () {
				aTags.forEach(btn => btn.classList.remove('active'));
				this.classList.add('active');
			});
		});
		circles.forEach(circle => {
			circle.addEventListener('click', function () {
				circles.forEach(circleBtn => circleBtn.classList.remove('active'));
				this.classList.add('active');
			});
		});

    	for (let j = 0; j < aTagArr.length; j++) {
      		aTagArr[j].onclick = () => {
				let isThis = aTagArr[j];
				let isPrice = isThis.dataset.price,
				isName = isThis.dataset.name,
				isCategory = document.getElementById('product_category');
				document.getElementById('product_price').innerHTML = '税込価格\n' + isPrice + '円';
				document.getElementById('product_name').innerHTML = isName;
				isCategory.innerHTML = settings[i]['name'];

				let isR1 = isThis.dataset.r1,
				isR2 = isThis.dataset.r2,
				isR3 = isThis.dataset.r3,
				isR4 = isThis.dataset.r4,
				isR5 = isThis.dataset.r5,
				isR6 = isThis.dataset.r6,
				isG1 = isThis.dataset.g1,
				isG2 = isThis.dataset.g2,
				isG3 = isThis.dataset.g3,
				isG4 = isThis.dataset.g4,
				isG5 = isThis.dataset.g5,
				isG6 = isThis.dataset.g6,
				isB1 = isThis.dataset.b1,
				isB2 = isThis.dataset.b2,
				isB3 = isThis.dataset.b3,
				isB4 = isThis.dataset.b4,
				isB5 = isThis.dataset.b5,
        		isB6 = isThis.dataset.b6;

				if (isR1 == '')_colorBtn01.style.display = 'none';
				if (isR2 == '')_colorBtn02.style.display = 'none';
				if (isR3 == '')_colorBtn03.style.display = 'none';
				if (isR4 == '')_colorBtn04.style.display = 'none';
				if (isR5 == '')_colorBtn05.style.display = 'none';
				if (isR6 == '')_colorBtn06.style.display = 'none';
				if (isR1 != '')_colorBtn01.style.display = 'block';
				if (isR2 != '')_colorBtn02.style.display = 'block';
				if (isR3 != '')_colorBtn03.style.display = 'block';
				if (isR4 != '')_colorBtn04.style.display = 'block';
				if (isR5 != '')_colorBtn05.style.display = 'block';
				if (isR6 != '')_colorBtn06.style.display = 'block';

				_colorBtn01.style.backgroundColor = 'rgb(' + isR1 + ',' + isG1 + ',' + isB1 + ')';
				_colorBtn02.style.backgroundColor = 'rgb(' + isR2 + ',' + isG2 + ',' + isB2 + ')';
				_colorBtn03.style.backgroundColor = 'rgb(' + isR3 + ',' + isG3 + ',' + isB3 + ')';
				_colorBtn04.style.backgroundColor = 'rgb(' + isR4 + ',' + isG4 + ',' + isB4 + ')';
				_colorBtn05.style.backgroundColor = 'rgb(' + isR5 + ',' + isG5 + ',' + isB5 + ')';
				_colorBtn06.style.backgroundColor = 'rgb(' + isR6 + ',' + isG6 + ',' + isB6 + ')';

				_isVisible = 1;
				for (let k = 0; k<settings[i]['gameObject'].length; k++) {
					deepAR.changeParameterBool(settings[i]['gameObject'][k], '', 'enabled', true);
					// eyebrow_quad
					if (settings[i]['category'] == 1) {
						isCategory.style.backgroundColor = '#e8deda';
					}
					// eyeshadow
					else if (settings[i]['category'] == 2) {
						isCategory.style.backgroundColor = '#e5c5ba';
					}
					// eyeliner
					else if (settings[i]['category'] == 3) {
						isCategory.style.backgroundColor = '#f1ccff';
					}
					// eyelashes
					else if (settings[i]['category'] == 4) {
						isCategory.style.backgroundColor = '#e2d1e8';
					}
					// cheek
					else if (settings[i]['category'] == 5) {
						isCategory.style.backgroundColor = '#cfb2e8';
					}
					// lip
					else if (settings[i]['category'] == 6) {
						deepAR.changeParameterVector('lip_gloss', 'MeshRenderer', 'u_color', 255/255, 255/255 , 255/255, 0.6);
						document.getElementById('lipgloss-btn01').onclick = () => {
							deepAR.changeParameterBool('lip_gloss', '', 'enabled', true);
						}
						document.getElementById('lipgloss-btn02').onclick = () => {
							deepAR.changeParameterBool('lip_gloss', '', 'enabled', false);
						}
					}
					// lipgross
					if (settings[i]['category'] == 6) {
						_glossBtnWrap.style.display = 'block';
					} else {
						_glossBtnWrap.style.display = 'none';
					}

					// カラー選択
					_colorBtn01.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR1/255, isG1/255 , isB1/255, settings[i]['a']);
					}
					_colorBtn02.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR2/255, isG2/255 , isB2/255, settings[i]['a']);
					}
					_colorBtn03.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR3/255, isG3/255 , isB3/255, settings[i]['a']);
					}
					_colorBtn04.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR4/255, isG4/255 , isB4/255, settings[i]['a']);
					}
					_colorBtn05.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR5/255, isG5/255 , isB5/255, settings[i]['a']);
					}
					_colorBtn06.onclick = () => {
						deepAR.changeParameterVector(settings[i]['gameObject'][k], 'MeshRenderer', settings[i]['parameter'], isR6/255, isG6/255 , isB6/255, settings[i]['a']);
					}
				}
      		}
    	}
  	}
}

// ===========================================================
//   その他 関数
// ===========================================================
function before () {
	_shutterCount = 0;
	deepAR.takeScreenshot();
}

function after () {
	_shutterCount = 1;
	setTimeout(function(){
		deepAR.clearEffect('slot');
		deepAR.takeScreenshot();
	},50);
	setTimeout(function(){
		deepAR.switchEffect(0, 'slot', './effects/220329_w_2', function () {
			deepAR.startVideo(true);
			_isVisible = 0;
		});
	},100);
}

// ===========================================================
//   click Event
// ===========================================================

// ダブルタップ無効
document.addEventListener('dblclick', function(e){ e.preventDefault();}, { passive: false });

// リアカメラ・フロントカメラの切り替え
document.getElementById('switch-btn').onclick = () => {
	if (!_isSwitch) {
		_isSwitch = 1;
		cleanupVideoObjects();
		startExternalVideo(2);
		document.getElementById('1').remove();
		document.querySelector('#camera').classList.remove('active');
	} else {
		_isSwitch = 0;
		cleanupVideoObjects();
		startExternalVideo(1);
		document.getElementById('2').remove();
		document.querySelector('#camera').classList.add('active');
    }
}

// メイクを全て外す
document.getElementById('reset-btn').onclick = () => {
	let names = ['face_makeup','eyebrow_quad','eyeshadow','eyeshadow2','eyeshadow3','eyeshadow4','eyeshadow5', 'eyelashes','eyeliner','lips','lip_gloss'];
	for (let i = 0; i<names.length; i++) {
		deepAR.changeParameterBool(names[i], '', 'enabled', false);
	}
	_isVisible = 0;
}

// 比較機能
document.getElementById('btn-cap').onclick = () => {
	if(!_isVisible){
		_isVisible = 0;
		alert('[make up]ボタンでメイクしてください');
	} else {
		_isVisible = 1;
		_beerFlag = true;
		after();
		before();
		let slider = new BeerSlider(document.getElementById('beer-slider'));
		document.getElementById('beer-area').style.display='block';
		document.getElementById('modal-picture').style.display='none';
		_modalFooter.style.display='none';
		_modalText.innerText='矢印をスライドさせてください';
		_modal.classList.add('active');
		_overlay.classList.add('active');
  	}
}

// キャプチャ
document.getElementById('btn-shot').onclick = () => {
	if(!_isVisible){
		_isVisible = 0;
		alert('[make up]ボタンでメイクしてください');
	} else {
		deepAR.takeScreenshot();
		_modal.classList.add('active');
		_overlay.classList.add('active');
		document.getElementById('beer-area').style.display='none';
		_modalFooter.style.display='block';
		_modalText.innerText='保存してください';
		document.getElementById('modal-picture').style.display='block';
	}
}

// 商品選択エリアの表示切り替え
for (let i = 0; i < _accTabs.length; i++) {
	_accTabs[i].addEventListener('click', function () {
		this.classList.toggle('active');
		_accContents[i].classList.toggle('active');
		_accArrow[i].classList.toggle('active');
	});
}

// カルーセル内、商品情報の表示
document.getElementById('carousel-data').onclick = () => {
	document.getElementById('acc-btnsWrap').style.display = 'block';
}

// キャプチャ・比較のモーダルクローズ
document.getElementById('close-btn').onclick = () => {
	_modal.classList.remove('active');
	_overlay.classList.remove('active');
};
