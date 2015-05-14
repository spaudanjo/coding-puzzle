function addClassNameToElement(el, className) {
    if (el.classList)
    {
        el.classList.add(className);
    }
    else
    {
        el.className += " " + className;
    }
}

function removeClassNameFromElement(el, className) {
    if (el.classList)
    {
        el.classList.remove(className);
    }
    else
    {
        el.className = el.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    }
}

module.exports = {
    addClassNameToElement: addClassNameToElement,
    removeClassNameFromElement: removeClassNameFromElement
};
