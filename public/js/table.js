jQuery(document).ready(function($) {
	
//Add event cho ô tìm kiếm
$("#search").focus(function() {
	$("#search").css({
		border: '2px solid blue',// #0099ff
		boxShadow: '0px 0px 20px 0px #f2f2f2'
	});
})


$("#search").blur(function() {

	$("#search").css({
		border: '2px solid #aaa',
		boxShadow: 'none'
	});

})


let students;
$.getJSON('http://localhost:3000/students', function(students) {
	function renderContent(array) {
		//xóa hết cái ban đầu, render lại
		$("tbody").empty();
		//Lặp qua object students để đổ dữ liệu
		array.forEach( function(element) {
			$("tbody").append(`
				<tr>
				<td>${element.name}</td>
				<td>${element.gender}</td>
				<td>${element.birthday}</td>
				<td>${element.homeTown}</td>
				<td>

				<button type="button" class="btn btn-danger text-white btn-remove" data-id=${element.id}>Xoá</button>					

				<button type="button" class="btn btn-primary btn-edit" data-toggle="modal" data-target="#exampleModalScrollable" data-id="${element.id}">Sửa</button>
				<div class="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-scrollable" role="document">
				<div class="modal-content">
				<div class="modal-header">
				<h5 class="modal-title" id="exampleModalScrollableTitle">Thông tin học viên</h5>
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<span aria-hidden="true">&times;</span>
				</button>
				</div>
				<div class="modal-body">
				<form class="form-edit">
				<label for="name">Họ tên học viên</label>: <input type="text" id="name" class="form-edit__name"> <br>
				<label for="gender">Giới tính</label>: <input type="text" id="gender" class="form-edit__gender"> <br>
				<label for="birthday">Ngày sinh</label>: <input type="date" id="birthday" class="form-edit__birthday"> <br>
				<label for="homeTown">Quê quán</label>: <input type="text" id="homeTown" class="form-edit__homeTown">
				</form>
				</div>
				<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Huỷ</button>
				<button type="button" class="btn btn-primary btn-save">Lưu lại</button>
				</div>
				</div>
				</div>
				</div>

				</td>
				</tr>
				`);			
		});	
	}

	renderContent(students);

	//Xoá học viên
	$(".btn-remove").click(function(){
		let id = $(this).data('id');
		$.ajax({
			url: 'http://localhost:3000/students/'+id ,
			type: 'DELETE',
			dataType: 'json',
			success: function() {
				alert('Xoá thành công')
				location.reload();
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	})



	// Click nút Sửa Lấy thông tin hiện tại của học viên
	$(".btn-edit").click(function() {
		//Lấy thông tin hiện tại
		let currentName = $(this).parent().parent().children('td:first').text();
		let currentGender = $(this).parent().parent().children('td:nth-child(2)').text();
		let currentBirthday = $(this).parent().parent().children('td:nth-child(3)').text();
		let currentHometown = $(this).parent().parent().children('td:nth-child(4)').text();

		//Gán thông tin vào form chỉnh sửa
		$(".form-edit__name").val(currentName);
		$(".form-edit__gender").val(currentGender);
		$(".form-edit__birthday").val(currentBirthday);
		$(".form-edit__homeTown").val(currentHometown);

		//Lấy id của học viên
		let id = $(this).data('id');

		update(id);


	});

	function update(id) {
		$(".btn-save").click(function() {

		let $name = $(".form-edit__name");
		let $gender = $(".form-edit__gender");
		let $birthday = $(".form-edit__birthday");
		let $homeTown = $(".form-edit__homeTown");
		
		$.ajax({
			url: 'http://localhost:3000/students/'+id,
			type: 'PATCH',
			dataType: 'json',
			data: {
				name: $name.val(),
				gender: $gender.val(),
				birthday: $birthday.val(),
				homeTown: $homeTown.val(),
			},
			success: function() {
				alert('Cập nhật thông tin thành công');
				location.reload();
			}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	});
	}
	
	




})

//Gán sự kiện nút submit trong form Thêm học viên
$(".btn-add .form-add #submit").click(function() {

	let $name = $(".modal-content #name");
	let $gender = $(".modal-content #gender");
	let $birthday = $(".modal-content #birthday");
	let $homeTown = $(".modal-content #homeTown");

	$.ajax({
		url: 'http://localhost:3000/students',
		type: 'POST',
		dataType: 'json',
		data: {
			name: $name.val(),
			gender: $gender.val(),
			birthday: $birthday.val(),
			homeTown: $homeTown.val(),
		},
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});	
	
})









	// let result = [];
	// let compare = {
	// 	name: function(a, b) {
	// 		let fullNameA = a.split(" ");
	// 		let fullNameB = b.split(" ");

	// 		let nameA = fullNameA[fullNameA.length - 1];
	// 		let nameB = fullNameB[fullNameB.length - 1];

	// 		if (nameA < nameB) return 1;
	// 		if (nameA > nameB) return -1;
	// 		return 0; 
	// 	},
	// 	gender: function(a, b) {
	// 		if (a < b) return 1;
	// 		if (a > b) return -1;
	// 		return 0;
	// 	},
	// 	birthday: function(a, b) {
	// 		a = new Date(a);
	// 		b = new Date(b);
	// 		return a - b;
	// 	}
	// };



	// //Sort - Sort cái table đang được show ngoài HTML
	// $('th').on('click', function() {
	// 	let column = $('th').index(this);
	// 	let order = $(this).data('sort');
	// 	let rows = $('tbody tr').toArray(); //lấy các <tr> hiện tại lưu vào 1 mảng

	// 	if ($(this).is('.ascending') || $(this).is('.descending')) {
	// 		$(this).toggleClass('ascending descending');
	// 		$('tbody').append(rows.reverse());
	// 	} else {
	// 		$(this).siblings().attr('class', 'normal'); //Khi sort sang <th> khác thì các <th> còn lại về normal
	// 		$(this).attr('class', 'ascending');

	// 		rows.sort(function(a, b) {
	// 			a = $(a).find('td').eq(column).text();
	// 			b = $(b).find('td').eq(column).text();
	// 			return compare[order](a,b);
	// 		});
	// 		//không cần $('tbody').empty()
	// 		$('tbody').append(rows);
	// 	}
	// });


	// //Search
	// $('[type="search"]').on('input', function() { 
	// 	if ($(this).val() == '') {//Luôn show hết data lên bảng khi input rỗng
	// 		renderContent(students);
	// 		$('#no_result').text('');
	// 		$('th').attr('class', 'normal');
	// 	}
	// });


	// $(document).on('keyup', function(event) {		
	// 		results = [];
	// 		$('th').attr('class', 'normal');

	// 		let input = $('[type="search"]').val().trim().toLowerCase();
	// 		if (input == '') renderContent(students);
	// 		else {
	// 			students.forEach( function(element, index) {
	// 				for (let prop in element) {
	// 					//Nếu data có chứa input
	// 					if (element[prop].toLowerCase().indexOf(input) != -1) {
	// 						results.push(element);
	// 						break; //prop nào chứa input thì push element (object) của prop đó vào array results, sau đó BREAK luôn để thoát khỏi element hiện tại, tiếp tục với element tiếp theo
	// 					}
	// 				}
	// 			});

	// 			if (!results[0]) $('#no_result').text(`Không tìm thấy kết quả`);
	// 			else $('#no_result').text(``);
	// 			renderContent(results);
	// 		}
	// 		console.log(results);
	//});
	
});


