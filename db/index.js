const conn = require("./conn");
const Page = require("./page");

Page.belongsTo(Page, {foreignKey: 'parentId'});
// Page.hasMany(Page), {as: 'parent'}; // either one works

const mapAndSave = pages => Promise.all(pages.map(pg => Page.create(pg)));

const syncAndSeed = async () => {
  await conn.sync({ force: true }); // `force: true` will drop the table if it already exists

  const home = await Page.create({ title: "Home Page" });

  const homeChildren = [
    { title: "About", parentId: home.id },
    { title: "Contact", parentId: home.id }
  ];
  const [about, contact] = await mapAndSave(homeChildren);

  const aboutChildren = [
    { title: "About Our Team", parentId: about.id },
    { title: "About Our History", parentId: about.id }
  ];
  const [team, history] = await mapAndSave(aboutChildren);

  const contactChildren = [
    { title: "Phone", parentId: contact.id },
    { title: "Fax", parentId: contact.id }
  ];
  const [phone, fax] = await mapAndSave(contactChildren);
};


// syncAndSeed().then(() =>  console.log('successful!')).catch(ex => console.log(ex));

function hierarchy(pg){

        if(pg.parentId){
            // result.push(hieracy(Page.findOne({raw:true, where:{id:pg.parentId}})))
            const parentNode = Page.findOne({raw:true, where:{id:pg.parentId}})
            return [pg, hierarchy(parentNode)]
        } else if( pg.parenId === null){
            return pg

        }
        
}
syncAndSeed().then(async() => {
    const home = await Page.findHomePage();
    console.log(home.title);

    // const homeChildren = await home.findChildren();
    const homeChildren = await Page.findAll({raw: true}).filter(pg => home.id === pg.parentId)
    console.log(homeChildren.map(pg => pg.title))

    const fax = await Page.findOne({raw: true, where:{title: 'Fax'}});
    console.log(fax)

    // let hier = await hierarchy(fax)
    // console.log(hier)

})