
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btn = document.getElementById("btnAdd");
	var list = document.getElementById("list");
	var btnClr = document.getElementById("btnClr");
	var id = 1;
	// listItem = {item: "todo item", checked: flase}
	var listItem = "";
	var todoList = [];

	let itemData = [];

  form.addEventListener("submit",function(event){
    event.preventDefault();
    var textValue = input.value;

    if(textValue ===""){
      alert("Type somethimg")
    }
    else {
      addItem(textValue);
      input.value = "";
      //add to array
      itemData.push(textValue);
      // console.log(itemData);

      //add addEventListener to icon
      handleItem(textValue);
    }
  });

  function addItem(value){
    var div = document.createElement('li')
    div.classList.add('item');
    div.innerHTML = `<div class="row">
      <div class="col-auto mr-auto">
        <span class="item-name text-capitalize">${value}</span>
      </div>
      <div class="icon col-auto ">
         <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle"></i></a>
        <a href="#" class="edit mx-2 icon"><i class="fa fa-edit"></i></a>
        <a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>
      </div>
    </div>`;
    list.appendChild(div);
  }

  function handleItem(textValue){
    const item = list.querySelectorAll(".item");
    console.log(item);
    item.forEach(function(item){
      if(item.querySelector(".item-name").textContent === textValue){
        item.querySelector('.complete').addEventListener("click",function(){
          this.clssList.toggle("completed");
        });
      }
    });
  }
