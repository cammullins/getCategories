$.ajax({ 
    url: '/api/v2/help_center/articles.json?include=categories', 
    type: 'GET',
    headers: {
        'Authorization': 'Basic cmFuZHkubGFtQHlhcGljZW50cmFsLmNvbS90b2tlbjpqbVJGdm5IVUtXaWEwVnpJRnYzQ05BbUNUM3BCbGdHSE1nR3JXSU5N'
    },
    success: (res) => { 
        console.log(res)
    } 
}) 