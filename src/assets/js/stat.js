import { restart } from  './utils';

let clonedData = null;

let STATSCONTAINER = document.querySelector('section.stat__container > .wrapper');

export const renderStatToDom = () => {
    clearStat();
    cloneDataNode();
    renderSuccessNodesToDom();
    renderFailedNodesToDom();
    renderStatButtonsToDom();
}

const clearStat = () => {
    STATSCONTAINER.innerHTML = '';
}

const closeStat = () => {
    document.querySelector('.stat__container').style.display = "none";
}

const getSuccessContainer = () => {
    let successContainer = document.createElement('div');
    successContainer.classList.add('success_items');
    STATSCONTAINER.insertAdjacentElement('beforeend', successContainer);
    return successContainer;
}

const getFailedContainer = () => {
    let failedContainer = document.createElement('div');
    failedContainer.classList.add('failed_items');
    STATSCONTAINER.insertAdjacentElement('beforeend', failedContainer);
    return failedContainer
}

const cloneDataNode = () => {
    clonedData = document.querySelector('.words__container > .wrapper').cloneNode(true);
    //return clonedNode;
}

const getSuccessNodes = () => {
    let nodesSuccess = Array.from(clonedData.children).filter(it => it.classList.contains('checked'))
    return nodesSuccess
} 

const getFiledNodes = () => {
    let nodesFiled = Array.from(clonedData.children).filter(it => !it.classList.contains('checked'))
    return nodesFiled
} 

const renderSuccessNodesToDom = () => {
    let nodesSuccess = getSuccessNodes();
    let headerText = document.createElement('div');
    headerText.insertAdjacentText('beforeend', 'Успешно');
    headerText.classList.add('result_count_header');
    let count = document.createElement('span');
    count.classList.add('success')
    headerText.insertAdjacentElement('beforeend', count);
    let countNumber = nodesSuccess.length;
    count.insertAdjacentText('beforeend', countNumber.toString());    
    let successContainer = getSuccessContainer();
    //let failedsuccessContainerContainer = document.querySelector('.success_items');
    successContainer.insertAdjacentElement('beforeend', headerText);
    nodesSuccess.forEach(it => {
        successContainer.insertAdjacentElement('beforeend', it)
    })
}

const renderFailedNodesToDom = () => {
    let nodesFiled = getFiledNodes();
    let failedContainer = getFailedContainer();
    let headerText = document.createElement('div');
    headerText.insertAdjacentText('beforeend', 'Ошибок');
    headerText.classList.add('result_count_header');
    let count = document.createElement('span');
    headerText.insertAdjacentElement('beforeend', count);
    let countNumber = nodesFiled.length;
    count.insertAdjacentText('beforeend', countNumber.toString());
    failedContainer.insertAdjacentElement('beforeend', headerText)
    //let failedContainer = document.querySelector('.failed_items');
    
    nodesFiled.forEach(it => {
        failedContainer.insertAdjacentElement('beforeend', it)
    })
}

const renderStatButtonsToDom = () => {
    let buttonReturn = createButton('Return', 'btn_return');
    let buttonNewGame = createButton('New Game', 'btn_new_game');
    let statButtonsContainer = document.createElement('div');
    statButtonsContainer.classList.add('buttons__container');
    STATSCONTAINER.insertAdjacentElement('beforeend', statButtonsContainer);
    statButtonsContainer.insertAdjacentElement('beforeend', buttonReturn);
    statButtonsContainer.insertAdjacentElement('beforeend', buttonNewGame);
    statButtonsContainer.addEventListener('click', handleClickStatButtons)
}

const createButton = (text, classList) => {
    let buttonElement = document.createElement('a');    
    buttonElement.innerText = text;
    buttonElement.classList.add('btn');
    buttonElement.classList.add(classList);
    return buttonElement;
}

const handleClickStatButtons = () => {
    if (!event.target.classList.contains('btn')) return;
    console.log(event)
    const { target } = event;

    if (target.classList.contains('btn_return')) { 
        closeStat();
    }

    if (target.classList.contains('btn_new_game')) {
        closeStat();
        restart(); 
    }
}
