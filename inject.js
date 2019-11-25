const port = chrome.runtime.connect({name:"inject"});

port.onMessage.addListener(function(message,sender){
    console.log(message);
});

window.addEventListener('click', clickListener);
window.addEventListener('keyup', keyupListener); 

function clickListener(evt) {
    let data = {
        event: 'click',
        target: evt.target
    }
    console.log('click', getPathTo(evt.target));
    port.postMessage(data);
}

function keyupListener(evt) {
    let data = {
        event: 'keyup',
        target: evt.target
    }
    console.log('keyup', getPathTo(evt.target));
    port.postMessage(data);
}

function getPathTo(element) {
    let classAvailable = isClassUnique(element.className);
    if (element.id!=='')
        return 'id("'+element.id+'")';
    if (element===document.body)
        return element.tagName;
    if(classAvailable != null)
        return `class(${classAvailable})`;
    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}