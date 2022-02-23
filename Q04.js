axios = require("axios")
let url = 'https://pt.simplesite.com/'

axios.get(`${url}`).then(function(response){
    result = `${response.data }`
        Seach_html(result)})

    function Seach_html(html){
        html = html.split('<a href');

            for(i in html){
                links = html[i].split('>')
                    links = links[0].split('"')
                        console.log(links[1])
    }
}