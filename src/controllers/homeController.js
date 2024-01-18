const connection = require('../config/database')

const getHomepage = (req, res) => {
    //process data...
    //call model...
    let users = [];
    connection.query(
        'select * from Users u',
        function (err, results, fields) {
            users = results;
            console.log(">>>>result: ", results); // results contains rows returned by server

            // console.log(">> check users: ", users);
            res.send(JSON.stringify(users));
        }
    );


}

const getABC = (req, res) => {
    res.send('check ABC');
}

const getHoiDanIt = (req, res) => {
    res.render('sample.ejs');
}
module.exports = {
    getHomepage,
    getABC,
    getHoiDanIt,

}