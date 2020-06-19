import { dataArr, dataArrActive, setActiveLevel, setActiveLevelPage } from '../../index';
import { getWords } from './getData'
import { toggleBtnSpeachClass } from './buttons'

const DATAPATH = 'https://raw.githubusercontent.com/okrypets/rslang-data/master/data/';
let isPlay = false;

export const handleClickByWord = (event) => {
    event.preventDefault();
    if (isPlay) return;
    const { target, currentTarget } = event;
    const {classList, parentNode, dataset: targetDataSet } = target;
    const { dataset: { id: parentId = ""}} = parentNode;
    const { id = ""} = targetDataSet;
    console.log(id, parentId);
    
    let currentId = id || parentId;
    if (currentId) {
        reRenderImage(currentId);
        console.log(event)
        showTranslateById(currentId);
        wordAudioPlay(currentId)
    }
    
}

export const setIsPlay = (bool) => {
    isPlay = bool;
    console.log(isPlay);
}

export const getIsPlay = () => {
    console.log(isPlay);
    return isPlay;
}

const getWordId = (item) => {
    const { image } = item;
    let idFromImageName = Number(image.match(/[0-9]{4}/g)[0]);
    return idFromImageName;
}

export const getImageById = (id) => {
    let url = dataArrActive.find(it => {
        const { image } = it;
        let imageNumb = Number(image.match(/[0-9]{4}/g)[0]); 
        if ( imageNumb === Number(id) ) {
            return imageNumb;
        }
    })
    let imageName = url.image.replace(/[files\/]/g, '');
    let src = DATAPATH + imageName;
    console.log(src)
    return src;
}

export const reRenderImage = (id) => {
    let imageElement = document.querySelector('section.image__container > .wrapper img')
    let imageFile = getImageById(id);
    imageElement.setAttribute('src', imageFile)
}

export const showTranslateById = (id) => {
    let wordElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}'] > p.translation`);
    let translationElement = document.createElement('p');
    translationElement.innerText = wordElement.innerText;
    let imageContainerElement = document.querySelector('section.image__container > .wrapper');
    let translationContainer = document.querySelector('.translation__container') || document.createElement('div');
    translationContainer.classList.contains('translation__container') ? null : translationContainer.classList.add('translation__container');  
    translationContainer.style.display = 'block';
    translationContainer.innerHTML = '';
    imageContainerElement.insertAdjacentElement('beforeend', translationContainer);
    translationContainer.insertAdjacentElement('beforeend', translationElement);
}

export const handleMenuClick = () => {
    console.log(event)
    const { dataset : { level = 1 }} = event.target.parentNode;
    setMenuActive(level)
}

export const toggleMenu = () => {
    document.querySelector('nav.header_navigation > ul > li').classList.toggle("active");
}

export const setMenuActive = level => {    
    let menuList = document.querySelector('nav.header_navigation > ul').children;
    Array.from(menuList)
    .forEach(it => {
        const { classList, dataset } = it;
        if (classList.contains('active')) {
            classList.remove('active');
        }
        if (Number(dataset["level"]) === Number(level) ) {
            classList.add('active');
        }
    })
    resetLevel();
}

export const getActiveLevel = () => {
    if (!document.querySelector('nav.header_navigation > ul')) return;
    let activeLevel = 1;
    let menuList = document.querySelector('nav.header_navigation > ul').children;
    let activeMenuData = Array.from(menuList)
        .find(it => it.classList.contains('active')).dataset;
    const { level = activeLevel} = activeMenuData;
    activeLevel = Number(level);
    return activeLevel;
}

export const getActiveLevelPage = () => {
    let rand = Math.random() * 30;
    return Math.floor(rand);
}

export const resetLevel = () => {
    let level = getActiveLevel();
    let page = getActiveLevelPage();
    getWords(page, level);
}

const wordAudioPlay = (id) => {
    let audioElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}'] > audio`);
    audioElement.play();
}

export const hideTranslation = () => {
    document.querySelector('.translation__container') ? document.querySelector('.translation__container').style.display = 'none' : null;
}

export const hideMicropgoneLine = () => {
    document.querySelector('.microphone_line') ? document.querySelector('.microphone_line').remove() : null;
}

export const renderMicrophoneLineToDom = () => {
    let isMicriphoneLine = document.querySelector('.image__container > .wrapper > .microphone_line');
    let microphoneLine = null;
    if (!isMicriphoneLine) {
        microphoneLine = document.createElement('div');
        microphoneLine.classList.add('microphone_line');
    } else {
        microphoneLine = document.querySelector('.image__container > .wrapper > .microphone_line')
    } 
    document.querySelector('.image__container > .wrapper').insertAdjacentElement('beforeend', microphoneLine);
}

export const checkResult = (value) => {
    console.log(value)
    let microphoneLineContainer = document.querySelector('.image__container > .wrapper > .microphone_line');
    microphoneLineContainer.innerText = ''
    let microphoneLineValue = document.createElement('span');
    microphoneLineContainer.insertAdjacentElement('beforeend', microphoneLineValue)
    let matchedWord = dataArrActive.find(it => {
        let itWord = it.word.toLowerCase();
        let val = value.toLowerCase();
        return itWord === val;
    });
    if ( matchedWord ) {
        microphoneLineValue.innerText = value;
        let wordId = getWordId(matchedWord);
        setWordChecked(wordId);
    } 
}

const setWordChecked = (id) => {
    let wordElement = document.querySelector(`section.words__container > .wrapper > div[data-id='${id}']`);
    wordElement.classList.add('checked');

}

export const restart = () => {
    document.querySelectorAll(`section.words__container > .wrapper > div.word_item.checked`).forEach(it => {
        it.classList.remove('checked')
    })
    document.querySelector("section.buttons__container a.btn.btn_speach").classList.remove('active');
    setIsPlay(false);
    hideTranslation();
    hideMicropgoneLine();
}