    var fieldNameElement = document.getElementById('sidebar');
    
    var hst = document.location.hostname.substr(0, 4);
    if (hst == '127.' || hst == '192.' || document.location.hostname.toLowerCase() == 'localhost') {
        fieldNameElement.innerHTML += 'running local</br>';
        fieldNameElement.innerHTML += '<a href="/cgi/edit/">new2</a><br/>';
        fieldNameElement.innerHTML += '<a href="/cgi/hybernate/">hybernate</a>';
        
        var posts = document.getElementsByName('dynamicdiv');
        
        for (var i = 0; i < posts.length; ++i) {
            var item = posts[i];  
            var id = item.id;
            item.innerHTML = '<a href="/cgi/edit/'+id+'.html">[e]</a>';
        }
    }