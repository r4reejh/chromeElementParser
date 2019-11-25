function generateClassCombination(classes) {
    let temp= "";
    let combi = [];
    let combinations = Math.pow(2, classes.length);
    for (var i = 0; i < combinations ; i++){
        temp= "";
        for (var j=0;j<classes.length;j++) {
            if ((i & Math.pow(2,j))){ 
                temp += " "+classes[j];
            }
        }
        if (temp !== "") {
            combi.push(temp);
        }
    }
    return combi;
}

function isClassUnique(elementClass, currElement) {
    classes = elementClass.split(" ").filter((v) => {return v && v.length>0})
    classNames = generateClassCombination(classes, currElement);
    let currElements = document.getElementsByClassName(classNames[0].trim());
    let i = 0;
    while(currElements.length != 1 && currElements[0] != currElement && i<classes.length) {
        i++;
        currElements = document.getElementsByClassName(classNames[i].trim());
    }
    if(i<classNames.length) return classNames[i].trim();
    return null;
}