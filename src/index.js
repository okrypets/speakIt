import { getWords } from './assets/js/getData';
import { handleMenuClick, getActiveLevel, getActiveLevelPage } from './assets/js/utils';
import WordsList from './assets/js/WordsList';
import { renderButtonsToDom } from './assets/js/buttons' ;

export let dataArr = [];
export let dataArrActive = [];
export let page = 1;
export let level = 1;

window.onload = () => {
    
    setActiveLevelPage();
    setActiveLevel();
    getWords(page, level);
    renderButtonsToDom();
    document.querySelector('nav.header_navigation > ul').addEventListener('click', handleMenuClick);
}

export const setDataFromReq = (data) => {
    dataArr = [...dataArr, ...data];
    renderWordsList()
}

const getActiveDataList = () => {        
    let suffleArr = Array.isArray(dataArr) ? dataArr.sort(() => Math.random() - 0.5) : [];
    let dataList = suffleArr.slice(0, 10);
    console.log(dataList)
    dataArrActive = dataList;
    return dataList;
}

export const renderWordsList = () => {
    let dataLIst = getActiveDataList();
        let wordsList = new WordsList(dataLIst);
        wordsList.init();
    }


export const setActiveLevel = () => {
    level = getActiveLevel();
}

export const setActiveLevelPage = () => {
    page = getActiveLevelPage();
}





 