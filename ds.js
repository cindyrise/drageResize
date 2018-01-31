(function(win, doc) {
  var storage = window.localStorage,
    targetDom = doc.body,
    tempEle = null, 
    mouseX = 0,//鼠标页面坐标
    mouseY = 0,//
    marginL = 0,//当前元素left ，top 距离
    marginT = 0,
    beforeW = 0,//当前元素宽，高
    beforeH = 0;
  targetDom.addEventListener("mousedown", _resize.bind(this));
  //改变div大小
  function _resize (ev){
    var ev = ev || window.event;
    if (ev.target.dataset.flag != "resize") return;
    _stopDefault(ev);
    _stopBubble(ev);
    var panel = ev.target.parentNode;
    mouseX = ev.clientX; // 获取鼠标按下时光标x的值
    mouseY = ev.clientY; // 获取鼠标按下时光标Y的值
    beforeW = panel.offsetWidth; // 获取拖拽前div的宽
    beforeH = panel.offsetHeight; // 获取拖拽前div的高
    targetDom.onmousemove = function(ev) {
      var ev = ev || window.event;
      var afterW = ev.clientX - mouseX + beforeW,
        afterH = ev.clientY - mouseY + beforeH;
      panel.style.width = afterW + "px"; // 拖拽后物体的宽
      panel.style.height = afterH + "px"; // 拖拽后物体的高
      //这里需要向localstorage 更新数据
    };
    targetDom.onmouseup = targetDom.onmouseleave = () => {
      targetDom.onmousemove = null;
      targetDom.onmouseup = null;
      targetDom.onmouseleave = null;
    };
  };
  //drag开始
  targetDom.addEventListener("dragstart", ev => {
    var e = ev || window.event;
    tempEle = ev.target;
    marginL = (e.pageX || e.clientX) - parseInt(tempEle.offsetLeft, 10);
    marginT = (e.pageY || e.clientY) - parseInt(tempEle.offsetTop, 10);
    ev.dataTransfer.effectAllowed = "move";
  });
  //drage结束
  targetDom.addEventListener(
    "drop",
    e => {
        var left=(e.pageX || e.clientX) - marginL,
        top=(e.pageY || e.clientY) - marginT;
      with (tempEle.style) {
        left =(e.pageX || e.clientX) - marginL + "px";
        top = (e.pageY || e.clientY) - marginT + "px";
      }
      console.log(left,top);
      //_stopDefault(e);
      //这里需要向localstorage 更新数据
    });
  targetDom.ondragover = e => {
    _stopDefault(e);
    e.dataTransfer.dropEffeet = "move";
  };

  var _stopDefault = e => {
    if (e && e.preventDefault) e.preventDefault();
    else window.event.returnValue = false;
    return false;
  };
  var _stopBubble = e => {
    e.cancelBubble = true;
    e.stopPropagation();
  };
})(window, document);
