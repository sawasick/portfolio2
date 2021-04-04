let jsonSkill; //jsonファイル読み込み
function ReplaceFont() {
	// iOSの時にフォントを変える
	const $targets = $('.font-extra, .section-title');
	for (let i = 0, len = $targets.length; i < len; i++) {
		$targets.eq(i).addClass('js-font-extra-ios');
	}
}
function CheckiOS() {
	// OSを判定→iOS,iPadOSならfont-familyを切り替える
	const ua = navigator.userAgent;
	if (
		ua.indexOf('iPhone') > 0 ||
		ua.indexOf('iPod') > 0
		// || (ua.indexOf('Android') > 0 &&
		// 	ua.indexOf('Mobile') > 0)
	) {
		//スマホ用の処理
		ReplaceFont();
	} else if (
		ua.indexOf('iPad') > 0
		// || ua.indexOf('Android') > 0
	) {
		//タブレット用の処理
		ReplaceFont();
	} else if (
		ua.indexOf('Safari') > 0 &&
		ua.indexOf('Chrome') == -1 &&
		typeof document.ontouchstart !== 'undefined'
	) {
		//iOS13以降のiPad用の処理
		ReplaceFont();
	}
}
function Loadjson() {
	$.ajax({
		// json読み込み開始
		type: 'GET',
		url: 'json/skills.json',
		dataType: 'json',
	}).then(
		function (json) {
			// jsonの読み込みに成功した時
			jsonSkill = json;
		},
		function () {
			//jsonの読み込みに失敗した時
		}
	);
}

$(function () {
	let headerFlag = false;
	$(window).scroll(function () {
		const windowHeight = $(window).height();
		let thisPos;

		// -----ヘッダー表示切り替え-----
		const $header = $('.header-wrapper');
		thisPos = $(this).scrollTop();
		if (thisPos > windowHeight / 2) {
			if (!headerFlag) {
				headerFlag = true;
				$header.toggleClass('is-hide');
			}
		} else {
			if (headerFlag) {
				headerFlag = false;
				$header.toggleClass('is-hide');
			}
		}

		// -----スキルアイコンアニメーション-----
		$('.js-skill').each(function () {
			thisPos = $(this).offset().top;
			const scroll = $(window).scrollTop();
			const $paId = $(this).parent().attr('id');
			const per = (100 - jsonSkill[$paId]) * 0.8;
			const currentHeight = $(this).css('height');
			if (
				currentHeight === '120px' &&
				scroll > thisPos - windowHeight + windowHeight / 3
			) {
				$(this).animate(
					{
						height: `${per}%`,
					},
					{ duration: 1300 }
				);
			} else {
			}
		});
	});
});

// -----スムーススクロール-----
$(function () {
	$('a[href^="#"]').click(function () {
		const speed = 500;
		const href = $(this).attr('href');
		const target = $(href == '#' || href == '' ? 'html' : href);
		const position = target.offset().top - $(window).height() / 10;
		$('html, body').animate({ scrollTop: position }, speed, 'swing');
		return false;
	});
});

document.addEventListener(
	'DOMContentLoaded',
	function () {
		CheckiOS();
		Loadjson();
	},
	false
);
