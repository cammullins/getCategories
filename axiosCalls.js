const axios = require('axios')

 const getArticle = function (axUrl, params){
   return axios
            .get(axURL, params)
                .then((res) => {
                    var index = notreturned.indexOf(res.data.page);
                    if (index > -1) {
                        notreturned.splice(index, 1);
                    }
                    console.log("Page:", res.data.page)
                    console.log("Not Returned yet: ", notreturned);
                    res.data.articles.forEach((article) => {
                        let newArticle = {
                            'Article ID': article.id,
                            'Article Title': article.name.split(',').join('>'),
                            'Article Created': article.created_at,
                            'Article Last Updated': article.updated_at,
                            'Article URL': article.html_url
                        }
                
                        const sect = article.section_id;
                        const sectnameobj = res.data.sections.find(obj => obj.id === sect);
                        newArticle["Section Name"] = sectnameobj.name.split(',').join('>');
                        newArticle["Section ID"] = sectnameobj.id;
                
                        const catId = sectnameobj.category_id;
                        const catObj = res.data.categories.find(obj => obj.id === catId);
                        newArticle["Category Name"] = catObj.name;
                        newArticle["Category ID"] = catObj.id;
                
                        allArticles.push(newArticle)
                    })
                })
                .catch((error) => {
                    getArticle(axUrl, params)
                })
} 

module.exports = getArticle