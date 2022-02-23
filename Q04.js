axios = require("axios")
let url = 'https://pt.simplesite.com/'

axios.get(`${url}`).then(function(response){
        all_html = `${response.data }`
        Seach_html(all_html)})

    function Seach_html(html){
        html = html.split('<a href');

            for(i in html){
                links = html[i].split('>')
                    links = links[0].split('"')
                        console.log(links[1])
    }
}