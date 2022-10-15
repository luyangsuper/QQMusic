
function getAlbumImg(mid) {
    return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${mid}.jpg`;
}
function secondConvertMinutes(interval) {
    const minutes = Number.parseInt(interval / 60) + '';
    const seconds = (interval % 60) + '';
    return `${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
}
function goToDetailPage(routerInstance, routeInstance, route, id) {
    const mapping = {
        '/singerDetail': 'singermid',
        '/albumDetail': 'albummid',
        '/mvPlay': 'vid'
    };
    routerInstance[routeInstance.path === route ? 'replace' : 'push']({
        path: route,
        query: { [mapping[route]]: id },
    });
}
function transformNum(value) {
    let newValue = ['', '', ''];
    let fr = 1000;
    const ad = 1;
    let num = 3;
    const fm = 1;
    while (value / fr >= 1) {
        fr *= 10;
        num += 1;
    }
    if (num <= 4) { // 千
        newValue[1] = '千';
        newValue[0] = parseInt(value / 1000) + '';
    } else if (num <= 8) { // 万
        const text1 = parseInt(num - 4) / 3 > 1 ? '千万' : '万';
        // tslint:disable-next-line:no-shadowed-variable
        const fm = '万' === text1 ? 10000 : 10000000;
        newValue[1] = text1;
        newValue[0] = (value / fm) + '';
    } else if (num <= 16) {// 亿
        let text1 = (num - 8) / 3 > 1 ? '千亿' : '亿';
        text1 = (num - 8) / 4 > 1 ? '万亿' : text1;
        text1 = (num - 8) / 7 > 1 ? '千万亿' : text1;
        // tslint:disable-next-line:no-shadowed-variable
        let fm = 1;
        if ('亿' === text1) {
            fm = 100000000;
        } else if ('千亿' === text1) {
            fm = 100000000000;
        } else if ('万亿' === text1) {
            fm = 1000000000000;
        } else if ('千万亿' === text1) {
            fm = 1000000000000000;
        }
        newValue[1] = text1;
        newValue[0] = parseInt(value / fm) + '';
    }
    if (value < 1000) {
        newValue[1] = '';
        newValue[0] = value + '';
    }
    return newValue.join('');
}
const defaultImg = new URL('../assets/img/default.jpg', import.meta.url).href;
function errorImage(e) {
    let img = e.srcElement;
    img.src = defaultImg;
    img.onerror = null;
    img = null;
}
function getImgMainColor(img) {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const context = canvas.getContext('2d');
    // img.crossOrigin = 'Anonymous';
    img.setAttribute('crossOrigin', 'anonymous');
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
    const data = context.getImageData(0, 0, img.width, img.height).data;
    const rgbObj = {};
    for (let i = 0; i < data.length; i += 4) {
        const rgb = `${data[i]}, ${data[i + 1]}, ${data[i + 2]}`;
        if (rgbObj[rgb] !== undefined) {
            rgbObj[rgb]++;
        } else {
            rgbObj[rgb] = 0;
        }
    }
    canvas = null
    let rgbList = Object.entries(rgbObj);
    rgbList.sort((a, b) => b[1] - a[1]);
    let mainColor = `rgb(${rgbList[0][0]})`
    rgbList = null
    return mainColor
}
export default {
    getAlbumImg,
    secondConvertMinutes,
    transformNum,
    goToDetailPage,
    errorImage
}
export {
    getAlbumImg,
    secondConvertMinutes,
    transformNum,
    goToDetailPage,
    errorImage
}