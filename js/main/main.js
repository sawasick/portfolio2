function ReplaceFont() {
	const $targets = $('.font-extra, .section-title');
	for (let i = 0, len = $targets.length; i < len; i++) {
		$targets.eq(i).addClass('js-font-extra-ios');
	}
}
function CheckiOS() {
	// OSを判定→iOS,iPadOSならfont-familyを切り替える
	const ua = navigator.userAgent;
	// if (
	// 	/iPad|iPhone|iPod/.test(ua) ||
	// 	(navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
	// ) {
	// }
	// const $targets = $('.font-extra, .section-title');
	// for (let i = 0, len = $targets.length; i < len; i++) {
	// 	$targets.eq(i).addClass('js-font-extra-ios');
	// }

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

document.addEventListener(
	'DOMContentLoaded',
	function () {
		CheckiOS();
	},
	false
);
