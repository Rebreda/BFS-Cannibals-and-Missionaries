function moveElement(elementName) {

    var selectedElement = document.getElementById(elementName);
    var parentElement = selectedElement.parentNode.id;

    //add events to selected element
    selectedElement.onmousedown = function (e) {
        dragEle.startMoving(this, parentElement, e);
    }
    selectedElement.onmouseup = function (e) {
            dragEle.stopMoving(parentElement);
        }
        //move functionality 
    var dragEle = function () {
        return {
            move: function (elementId, xpos, ypos) {
                elementId.style.left = xpos + 'px';
                elementId.style.top = ypos + 'px';
            },
            startMoving: function (elementId, container, event) {
                event = event || window.event;
                var posX = event.clientX,
                    posY = event.clientY,
                    divTop = elementId.style.top,
                    divLeft = elementId.style.left,
                    elementWidth = parseInt(elementId.style.width),
                    elementHeight = parseInt(elementId.style.height),
                    parentWidth = parseInt(document.getElementById(container).style.width),
                    parentHeight = parseInt(document.getElementById(container).style.height);
                document.getElementById(container).style.cursor = 'move';
                divTop = divTop.replace('px', '');
                divLeft = divLeft.replace('px', '');
                var diffX = posX - divLeft,
                    diffY = posY - divTop;
                document.onmousemove = function (event) {
                    event = event || window.event;
                    var posX = event.clientX,
                        posY = event.clientY,
                        aX = posX - diffX,
                        aY = posY - diffY;
                    if (aX < 0) aX = 0;
                    if (aY < 0) aY = 0;
                    if (aX + elementWidth > parentWidth) aX = parentWidth - elementWidth;
                    if (aY + elementHeight > parentHeight) aY = parentHeight - elementHeight;
                    dragEle.move(elementId, aX, aY);
                }
            },
            stopMoving: function (container) {
                var a = document.createElement('script');
                document.getElementById(container).style.cursor = 'default';
                document.onmousemove = function () {}
            },
        }
    }();
}

moveElement("square");