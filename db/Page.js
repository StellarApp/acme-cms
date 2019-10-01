const conn = require('./conn');
const { STRING, UUID, UUIDV4} = require('sequelize');

const Page = conn.define('page', {
    id:{
        type: UUID,
        defaultValue: UUIDV4,
        primaryKey: true
    },
    title: {
        type: STRING,
        allowNULL: false
    }
}, {
    instanceMethods: {
      findChildren: function() {
          return this.title
      }
    }
}
)

//class method
Page.findHomePage = function (){
    return Page.findAll({raw:true, where : {title: 'Home Page'}}).reduce((accum) => {accum})
}

// // instance methods --- defined on the model's .prototype
Page.prototype.findChildren = function () {
    // 'this' in an instance method refers to the instance itself
    return this
    
}

module.exports = Page