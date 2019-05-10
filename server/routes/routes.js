const router = require('express').Router();
const csv = require('csvtojson');
const csvFilePath = './articles.csv';
const path = require('path');

router.get('/', (req, res) => {
    // console.log(sites)
    res.sendFile(path.join(__dirname, '../../getCategories.html'))
})

router.post('/makeCSV', (req, res) => {
    // console.log("CSV", req.body);
    console.log(util.inspect(req.body, false, null, true))
        (async () => {
            let csv = new ObjectsToCsv(req.body.undefined);

            // Save to file:
            await csv.toDisk('./test.csv');

            // Return the CSV file as string:
            // console.log(await csv.toString());
        })();
})

router.post('/scrape', (request, response) => {
    let totalArticles = request.body.data;
    let allArticles = [];
    let cycles;
    axios.get('https://help.yapicentral.com/api/v2/help_center/articles.json?', {
        headers: {
            'Authorization': `Basic ${btoa('cameron.mullins@yapicentral.com/token:1Uki5iszgzKNtTyclDnZjYmvs7mjW6AucFwV48KQ')}`
        }
    })
        .then(function (res) {
            console.log(res.data.articles);
        })
        .catch(function (error) {
            console.log(error);
        });
    if (totalArticles % 30 === 0) {
        cycles = (totalArticles / 30);
    } else {
        cycles = (totalArticles / 30) + 1;
    }
    const promises = [];
    const notreturned = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20]
    for (var i = 1; i < cycles; i++) {
        const axiosURL = `https://help.yapicentral.com/api/v2/help_center/articles.json?include=sections,categories&page=${i}`;
        const parameters = {
            headers: {
                'Authorization': 'Basic cmFuZHkubGFtQHlhcGljZW50cmFsLmNvbS90b2tlbjpqbVJGdm5IVUtXaWEwVnpJRnYzQ05BbUNUM3BCbGdHSE1nR3JXSU5N'
            }
        }
        const req = getArticle(axiosURL, parameters)
        // const req = axios.get(axURL, params).then((res) => {
        //     var index = notreturned.indexOf(res.data.page);
        //     if (index > -1) {
        //         notreturned.splice(index, 1);
        //     }
        //     console.log("Page:", res.data.page)
        //     console.log("Not Returned yet: ", notreturned);
        //     res.data.articles.forEach( (article) => {
        //         let newArticle = {
        //             'Article ID': article.id,
        //             'Article Title': article.name.split(',').join('>'),
        //             'Article Created': article.created_at,
        //             'Article Last Updated': article.updated_at,
        //             'Article URL': article.html_url
        //         }

        //         const sect = article.section_id;
        //         const sectnameobj = res.data.sections.find(obj => obj.id === sect);
        //         newArticle["Section Name"] = sectnameobj.name.split(',').join('>');
        //         newArticle["Section ID"] = sectnameobj.id;

        //         const catId = sectnameobj.category_id;
        //         const catObj = res.data.categories.find(obj => obj.id === catId);
        //         newArticle["Category Name"] = catObj.name;
        //         newArticle["Category ID"] = catObj.id;

        //         allArticles.push(newArticle)
        //     })
        // })
        // .catch( (error) => {
        //     console.log('Error ' + error.message)
        //     axios.get(axURL, params).then((res) => {
        //         var index = notreturned.indexOf(res.data.page);
        //         if (index > -1) {
        //             notreturned.splice(index, 1);
        //         }
        //         console.log("Page:", res.data.page)
        //         console.log("Not Returned yet: ", notreturned);
        //         res.data.articles.forEach((article) => {
        //             let newArticle = {
        //                 'Article ID': article.id,
        //                 'Article Title': article.name.split(',').join('>'),
        //                 'Article Created': article.created_at,
        //                 'Article Last Updated': article.updated_at,
        //                 'Article URL': article.html_url
        //             }

        //             const sect = article.section_id;
        //             const sectnameobj = res.data.sections.find(obj => obj.id === sect);
        //             newArticle["Section Name"] = sectnameobj.name.split(',').join('>');
        //             newArticle["Section ID"] = sectnameobj.id;

        //             const catId = sectnameobj.category_id;
        //             const catObj = res.data.categories.find(obj => obj.id === catId);
        //             newArticle["Category Name"] = catObj.name;
        //             newArticle["Category ID"] = catObj.id;

        //             allArticles.push(newArticle)
        //         })
        //     })
        // })
        promises.push(req);
    }
    axios.all(promises).then(() => {
        console.log("allArticles", allArticles.length);
    })

})
module.exports = router;

const getArticle = function (axUrl, params) {
    return axios
        .get(axUrl, params)
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
csv()
    .fromFile(csvFilePath)
    .then(jsObj => {
        sites = jsObj;
    })