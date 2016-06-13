var last_img;

document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        izoom(last_img);
    }
};

function getPos(el) {
    // yay readability
    for (var lx=0, ly=0;
        el != null;
        lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
    return {left: lx, top: ly};
}

function getOffsetSum(elem) {
  var top=0, left=0
  while(elem) {
    top = top + parseInt(elem.offsetTop)
    left = left + parseInt(elem.offsetLeft)
    elem = elem.offsetParent       
  }
  return {top: top, left: left}
}

function get_c0(node) {
    for (i = 0; i<10; i++) {
        if (node.className == 'content') {
            return node.parentNode;
        } else {
            node = node.parentNode;
        }
    }
    
    return None;
}

function izoom (img) {
    div = img.parentNode;
    
    c0 = get_c0(div.parentNode);
    //c0rect = c0.getBoundingClientRect();
    c0rect = getOffsetSum(c0);
    static_shift = c0rect.top;
    
    //alert(static_shift);
        
    if (img.style.position == "absolute") {
    // zoom back

        div.style.height = '';
        
        img.style.position = 'relative';
        img.style.top = '0';
        img.style.left = '0';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%'
        
        img.width = img.naturalWidth;

        img.style.zIndex = 1;
        
        last_img = null;

} else {
    // zoom out
    // надо прикинуть почему после zoom out image height становится неверный (уменьшенный)
        div.style.height = img.height + 10 + 'px'; // should be image margin
             
        var screen = {
            width: window.innerWidth || document.body.clientWidth,
            height: window.innerHeight || document.body.clientHeight
        }
        
        var rect_scr = img.getBoundingClientRect(); // это именно на экране
        var rect = getOffsetSum(img); // это внутри html, не зависит от скролла
        
        img.style.position = 'absolute';
        img.style.maxWidth = 'None';
        img.style.maxHeight = 'None';

        img.style.zIndex = 10;
        
        //img.style.width = '';
        //img.style.height = '';
        img.width = img.naturalWidth;
        //img.style.height = 'auto';
        
        if (screen.width - 16 > img.width) {
            new_x = (screen.width - img.width)/2;
            new_y = (screen.height - img.height)/2;
            if (new_y < 0) {new_y = 0;}
            
        } else {
            img.width = screen.width - 16;
            comp_factor = img.width / screen.width;
            new_y = (screen.height - (img.height / comp_factor))/2;
            new_x = (screen.width - img.width) / 2;
            
            //alert('img width: ' + img.width + ', screen: ' + screen.width);
        }
        
        img.style.top = rect.top - rect_scr.top - static_shift + new_y +'px'; 
        img.style.left = -1*rect.left + 20 + new_x + 'px';
        
        last_img = img;
    }
}