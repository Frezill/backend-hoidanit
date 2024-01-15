
const getHomepage = (req, res) => {
    //process data...
    //call model...
    res.send('Hello World with Phat!');
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