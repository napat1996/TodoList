
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

	if(itemData.length>0){
		itemData.forEach(function(singleItem){
			list.insertAdjacentHTML('beforeend',`<li class="item">
			<div class="row">
				<div class="col-auto mr-auto">
					<span class="item-name text-capitalize">${singleItem}</span>
				</div>
				<div class="icon col-auto ">
					 <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle"></i></a>
					<a href="#" class="edit mx-2 icon"><i class="fa fa-edit"></i></a>
					<a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>
				</div>
			</div>
			</li>`);
			handleItem(singleItem);
		});
	}

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
			localStorage.setItem("listItem",JSON. stringify(itemData));
      //add addEventListener to icon
      handleItem(textValue);
    }
  });

  function addItem(value,input){
    var div = document.createElement('li')
    div.classList.add('item');
    div.innerHTML = `<div class="row">
      <div class="col-auto mr-auto">
        <span class="item-name text-capitalize">${value}</span>
      </div>
      <div class="icon col-auto ">
         <a href="#" class="complete mx-2 icon"><i class="fa fa-check-circle"></i></a>
        <a href="#" class="edit mx-2 icon" data-target="#editBtn" data-toggle="modal" ><i class="fa fa-edit"></i></a>
        <a href="#" class="delete mx-2 icon"><i class="fa fa-trash"></i></a>

				<!-- Modal -->
				<div class="modal" tabindex="-1" role="dialog" id="editBtn">
				  <div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title">Edit Task</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
								<form>
				          <div class="form-group">
				            <input type="text" class="form-control" id="recipient-name"placeholder="new tesk">
				          </div>
				        </form>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-primary">Save changes</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>
				</div>
      </div>
    </div>
		`;
    list.appendChild(div);
  }


  function handleItem(textValue){
    const items = list.querySelectorAll(".item");
    console.log(items);
    items.forEach(function(item){
      if(item.querySelector(".item-name").textContent === textValue){

				//complete addEventListener
        item.querySelector('.complete').addEventListener("click",function(){
          item.querySelector(".item-name").classList.toggle("completed");
					this.classList.toggle("completed")
					localStorage.setItem("listItem",JSON. stringify(itemData));
        });

				//edit addEventListener
				item.querySelector(".edit").addEventListener('click',function(){
					var model = document.createElement("div",'tabindex="-1"','role="dialog"');
					model.classList.add('model');
					model.innerHTML = `<div class="modal-dialog" role="document">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title">Edit Task</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
				          <span aria-hidden="true">&times;</span>
				        </button>
				      </div>
				      <div class="modal-body">
								<form>
				          <div class="form-group">
				            <input type="text" class="form-control" id="recipient-name"placeholder="new tesk">
				          </div>
				        </form>
				      </div>
				      <div class="modal-footer">
				        <button type="button" class="btn btn-primary">Save changes</button>
				        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				      </div>
				    </div>
				  </div>`;
					$("#editModal").modal("toggle");
					// var textValue = prompt("Please enter new task:", "");
					// if (textValue == null || textValue == "") {
					// 	txt = "User cancelled the prompt.";
					// } else {
					// 	txt = "Hello " + person + "! How are you today?";
					// }
					// document.getElementById("demo").innerHTML = txt;
					localStorage.setItem("listItem",JSON. stringify(itemData));
				});

				//delete addEventListener
				item.querySelector('.delete').addEventListener("click",function(){
					list.removeChild(item);
					console.log(items);

					itemData = itemData.filter(function(item){
						return item !==textValue;
					});
					localStorage.setItem("listItem",JSON. stringify(itemData));
					input.value = "";

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
		}
	});
