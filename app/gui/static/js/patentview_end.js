//var elem = document.getElementsByTagName("ep-patent-document")[0];
var elem = document.querySelector('ep-patent-document');
console.log(elem);
var docTitle = elem.getAttribute('id');
document.title = docTitle;

async function addFigrefImage() {
  // let img_name = document.getElementById("actor_name").value;

  // console.log(element);
  let collection = document.getElementsByTagName('figref');


  for (let item of collection) {
    idrefs = item.getAttribute('idref').split(" ");
    console.log(idrefs.length);

    for (let idr of idrefs) {
      filename = "./images/img" + idr + ".png";
      //falls mehrere idrefs, dann mehrere imgs!
      let element = document.createElement('img');
      element.setAttribute("class", "normal");
      element.src = filename;
      element.setAttribute("onclick", "Rotate(this)");
      await item.appendChild(element);
      console.log(item);
    }
  }
}

//addFigrefImage();
