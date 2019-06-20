const orderModel = require('../models/order');

exports.load_chart_page = async(req, res)=>{
    let y16=0, y17=0, y18=0, y19=0, y20=0;//year 

    let m1=0, m2=0, m3=0, m4=0, m5=0, m6=0, m7=0, m8=0, m9=0, m10=0, m11=0, m12=0;//month

    //year
    let year16= await orderModel.aggregate([ {$project: {Sum: 1, year: {$year: '$Date'}}},{$match: {year: 2016}} ]);
    year16.forEach(element => { y16 = y16 + element.Sum; });

    let year17= await orderModel.aggregate([ {$project: {Sum: 1, year: {$year: '$Date'}}},{$match: {year: 2017}} ]);
    year17.forEach(element => { y17 = y17 + element.Sum; });

    let year18= await orderModel.aggregate([ {$project: {Sum: 1, year: {$year: '$Date'}}},{$match: {year: 2018}} ]);
    year18.forEach(element => { y18 = y18 + element.Sum; });

    let year19= await orderModel.aggregate([ {$project: {Sum: 1, year: {$year: '$Date'}}},{$match: {year: 2019}} ]);
    year19.forEach(element => { y19 = y19 + element.Sum; });

    let year20= await orderModel.aggregate([ {$project: {Sum: 1, year: {$year: '$Date'}}},{$match: {year: 2020}} ]);
    year20.forEach(element => { y20 = y20 + element.Sum; });

    //month
    let month1= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 1}} ]);
    month1.forEach(element => { m1 = m1 + element.Sum; });

    let month2= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 2}} ]);
    month2.forEach(element => { m2 = m2 + element.Sum; });

    let month3= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 3}} ]);
    month3.forEach(element => { m3 = m3 + element.Sum; });

    let month4= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 4}} ]);
    month4.forEach(element => { m4 = m4 + element.Sum; });

    let month5= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 5}} ]);
    month5.forEach(element => { m5 = m5 + element.Sum; });

    let month6= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 6}} ]);
    month6.forEach(element => { m6 = m6 + element.Sum; });

    let month7= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 7}} ]);
    month7.forEach(element => { m7 = m7 + element.Sum; });

    let month8= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 8}} ]);
    month8.forEach(element => { m8 = m8 + element.Sum; });

    let month9= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 9}} ]);
    month9.forEach(element => { m9 = m9 + element.Sum; });

    let month10= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 10}} ]);
    month10.forEach(element => { m10 = m10 + element.Sum; });

    let month11= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 11}} ]);
    month11.forEach(element => { m11 = m11 + element.Sum; });

    let month12= await orderModel.aggregate([ {$project: {Sum: 1, month: {$month: '$Date'}}},{$match: {month: 12}} ]);
    month12.forEach(element => { m12 = m12 + element.Sum; });

    res.render('chart', {title: "Chart", 'user': req.user, y16, y17, y18, y19, y20, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12});
}
