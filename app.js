
	var form = document.getElementById("form");
	var input = document.getElementById("input");
	var btn = document.getElementById("btnAdd");
	var list = document.getElementById("list");
	var btnClr = document.getElementById("btnClr");
	var editInput = document.createElement("input"); // text
	var id = 1;
	// listItem = {item: "todo item", checked: flase}
	var listItem = "";
	var todoList = [];

	let itemData = JSON.parse(localStorage.getItem('listItem')) || [];

	// if(itemData.length>0){
	// 	itemData.forEach(function(singleItem){
	// 		list.insertAdjacentHTML('beforeend',`<li class="item">
	// 		<div class="row">
	// 			<div class="col-auto mr-auto">
	// 				<span class="item-name text-capitalize">${singleItem}</span>
	// 			</div>
	// 			<div class="icon col-auto ">
	// 				 <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle"></i></a>
	// 				<a href="#" class="edit mx-2 icon"><i class="fa fa-edit"></i></a>
	// 				<a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>
	// 			</div>
	// 		</div>
	// 		</li>`);
	// 		handleItem(singleItem);
	// 	});
	// }

  form.addEventListener("submit",function(event){
    event.preventDefault();
    const textValue = input.value;

    if(textValue ===""){
      alert("Type somethimg")
    }
    else {
      addItem(textValue);
      input.value = "";
      //add to array
      itemData.push(textValue);
      // console.log(itemData);
			//locak storage
			localStorage.setItem("listItem",JSON.stringify(itemData));
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

	if(itemData.length>0){
		itemData.forEach(function(singleItem){
			if(singleItem.charAt(singleItem.length-1)!=="C"){

				list.insertAdjacentHTML("beforeend",`<li class="item">
				<div class="row">
					<div class="col-auto mr-auto">
						<span class="item-name text-capitalize imCompleted">${singleItem}</span>
					</div>
					<div class="icon col-auto ">
						 <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle imConpleted"></i></a>
						<a href="#" class="edit mx-2 icon"><i class="fa fa-edit"></i></a>
						<a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>
					</div>
				</div>
				</li>`);

			}else{
				  const items = list.querySelectorAll(".item");
				singleItem = singleItem.slice(0, -1);
				list.insertAdjacentHTML("beforeend",`<li class="item">
				<div class="row">
					<div class="col-auto mr-auto">
						<span class="item-name text-capitalize completed">${singleItem}</span>
					</div>
					<div class="icon col-auto ">
						 <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle visibility"></i></a>
						<a href="#" class="edit mx-2 icon"><i class="fa fa-edit"></i></a>
						<a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>
					</div>
				</div>
				</li>`);
			}
handleItem(singleItem);
		});
	}
  function handleItem(textValue){
    const items = list.querySelectorAll(".item");
    console.log(items);
    items.forEach(function(item){
      if(item.querySelector(".item-name").textContent === textValue){

				//complete addEventListener
        item.querySelector('.complete').addEventListener("click",function(){

					var num = itemData.indexOf(textValue);

					if(textValue.charAt(textValue.length-1)!=="C"){
						item.querySelector(".item-name").classList.toggle("imCompleted");
						textValue = textValue+"C";
						console.log("imCompleted");
					}else{
						// console.log(num);
						// list.removeChild(item);
						item.querySelector(".item-name").classList.toggle("completed");
						textValue = textValue.slice(0, -1);
						console.log("Completed");

						// console.log(textValue);
					}

					itemData[num] = textValue;
					console.log(itemData);
					localStorage.setItem("listItem",JSON.stringify(itemData));
        });

				//delete addEventListener
				item.querySelector('.delete').addEventListener("click",function(){
					list.removeChild(item);
					console.log(items);

					itemData = itemData.filter(function(item){
						return item !==textValue;
					});
					localStorage.setItem("listItem",JSON.stringify(itemData));
					input.value = "";

				});

				//edit addEventListener
				item.querySelector(".edit").addEventListener('click',function(){
					input.value = textValue;
					list.removeChild(item);

					itemData = itemData.filter(function(item){
						return item !==textValue;
					});
					localStorage.setItem("listItem",JSON.stringify(itemData));
				});
      }
    });
  }

//clear All
	btnClr.addEventListener("click",function(){
		itemData = [];
		var items = list.querySelectorAll(".item");

		if(items.length > 0){
			items.forEach(function(item){
				list.removeChild(item);
			});
			localStorage.setItem("listItem",JSON.stringify(itemData));
			input.value = "";
		}
	});
