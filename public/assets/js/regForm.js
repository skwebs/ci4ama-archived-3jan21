"use strict";
var isImageCropped = false;
var croppedImgBlobData = "";
var mimeType = "image/jpeg";
//$("#cropImageModal").modal("show");
$(function() {
	// added height to remove absolute position effect
	$("section.msform-sec").css("min-height", $(".msform").height() + $(".page").height() + 100);
	//jQuery time
	var current_fs, next_fs, previous_fs; //.pages
	var left, opacity, scale; //.page properties which we will animate
	var animating; //flag to prevent quick multi-click glitches
	$(".next").click(function() {
		if(validateForm($(this).parent()[0]) == true) {
			if(animating) return false;
			animating = true;
			current_fs = $(this).parent();
			next_fs = $(this).parent().next();
			//activate next step on progressbar using the index of next_fs
			$(".progressbar li").eq($(".page").index(next_fs)).addClass("active");
			//show the next .page
			next_fs.show();
			//hide the current .page with style
			current_fs.animate({
				opacity: 0
			}, {
				step: function(now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					//2. bring next_fs from the right(50%)
					left = (now * 50) + "%";
					//3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({
						'transform': 'scale(' + scale + ')'
					});
					next_fs.css({
						'left': left,
						'opacity': opacity
					});
				},
				duration: 800,
				complete: function() {
					current_fs.hide();
					animating = false;
				},
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
	});
	$(".previous").click(function() {
		if(animating) return false;
		animating = true;
		current_fs = $(this).parent();
		previous_fs = $(this).parent().prev();
		//de-activate current step on progressbar
		$(".progressbar li").eq($(".page").index(current_fs)).removeClass("active");
		//show the previous .page
		previous_fs.show();
		//hide the current .page with style
		current_fs.animate({
			opacity: 0
		}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale previous_fs from 80% to 100%
				scale = 0.8 + (1 - now) * 0.2;
				//2. take current_fs to the right(50%) - from 0%
				left = ((1 - now) * 50) + "%";
				//3. increase opacity of previous_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
					'left': left
				});
				previous_fs.css({
					'transform': 'scale(' + scale + ')',
					'opacity': opacity
				});
			},
			duration: 800,
			complete: function() {
				current_fs.hide();
				animating = false;
			},
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	});
	$(".submit").click(function(e) {
		e.preventDefault();
		if(isImageCropped == false) {
			$(this).parent().find(".inp").click();
			return false;
		} else {
			let form = document.querySelector("#msform"); //$("#msform"); // $(this).parents("form");
			let fd = new FormData(form);
			fd.append('cropped_image', croppedImgBlobData, 'user.' + mimeType.slice(6));
			$.ajax("action.php", {
				method: "post",
				data: fd,
				processData: false,
				contentType: false,
				success: function(res) {
					$("#user-img").attr('src', "./assets/img/wa-sq-user-img.png")
					alert("success: " + res);
					fd = null;
					isImageCropped = false;
					$('#msform')[0].reset();
					$(".inp").removeClass("is-valid");
				},
				error: function(err) {
					alert("err: " + err)
				},
				complete: function(e) {
					alert("complete: " + JSON.stringify(e));
				}
			});
		}
	})
});

function validateInp(x) {
	if(x.checkValidity() === true) {
		x.classList.remove("is-invalid");
		x.classList.add("is-valid");
		//x.
	} else {
		x.classList.remove("is-valid");
		x.classList.add("is-invalid");
		//x.
	}
}
(function() {
	window.addEventListener('load', function() {
		// datepicker
		$("#dob").datepicker({
			changeMonth: true,
			changeYear: true,
			showAnim: "fadeIn",
			dateFormat: "dd-mm-yy",
			yearRange: "c-15:c+0",
			// defaultDate:"-3",
			showButtonPanel: false
		}).on({
			focus: function() {
				let _this = $(this);
				_this.attr('readonly', 'true');
			},
			blur: function() {
				$(this).removeAttr('readonly', 'false');
			}
		});
		$("#regForm .form-control, #regForm .form-select").on({
			keyup: function() {
				var _this = $(this);
				if(!(new RegExp(_this.attr("pattern")).test(_this.val()))) {
					_this.tooltip("show");
				} else {
					_this.tooltip("hide");
				}
			}
		});
		$('[data-toggle="tooltip"]').tooltip();
	}, false);
})();

function validateForm(x) {
	// This function deals with validation of the form fields
	var y, i, valid = true;
	//x = document.getElementsByClassName("tab");
	y = x.querySelectorAll(".inp");
	// A loop that checks every input field in the current tab:
	for(i = 0; i < y.length; i++) {
		// If a field is empty...
		if(y[i].checkValidity() === false) {
			//if (y[i].value == "") {
			if(y[i].getAttribute("type") == "file") {
				y[i].click();
			} else {
				y[i].focus();
			}
			//alert(JSON.stringify(y[i].getAttribute("type")));
			Swal.fire("Reuired", y[i].getAttribute("data-title"))
				// add an "invalid" class to the field:
			y[i].className += " is-invalid";
			// and set the current valid status to false
			valid = false;
			return false;
		} else {
			y[i].className.replace(" is-invalid", "");
		}
	}
	// If the valid status is true, mark the step as finished and valid:
	if(valid) {
		//	document.getElementsByClassName("step")[currentTab].className += " finish";
	}
	return valid; // return the valid status
}
window.addEventListener('DOMContentLoaded', function() {
	//var $preloader = $('.preloader');
	//var avatar = document.getElementById('avatar');
	var croppableImg = document.getElementById('croppable-img');
	var selectImg = document.getElementById('select-img');
	var cropBtn = document.querySelector("#cropBtn")
	var $cropImgModal = $('#cropImageModal');
	var mimeType = "image/jpeg";
	var cropper;
	//$('[data-toggle="tooltip"]').tooltip();
	selectImg.addEventListener('change', function(e) {
		var files = e.target.files;
		var done = function(url) {
			selectImg.value = '';
			croppableImg.src = url;
			//$preloader.fadeIn();
			//$alert.hide();
			$cropImgModal.modal('show');
		};
		var reader;
		var file;
		var url;
		if(files && files.length > 0) {
			file = files[0];
			if(URL) {
				done(URL.createObjectURL(file));
			} else if(FileReader) {
				reader = new FileReader();
				reader.onload = function(e) {
					done(reader.result);
				};
				reader.readAsDataURL(file);
			}
		}
	});
	$cropImgModal.on('shown.bs.modal', function() {
		cropper = new Cropper(croppableImg, {
			/*aspectRatio: 1,
			viewMode: 3,*/
			aspectRatio: 1,
			dragMode: 'move',
			//preview : '.croppingPreview',
			autoCropArea: 1,
			restore: !1,
			modal: !1,
			highlight: !1,
			fillColor: '#fff',
			cropBoxMovable: !1,
			cropBoxResizable: !1,
			toggleDragModeOnDblclick: !1,
			viewMode: 3,
			ready: function() {
				$cropImgModal.css("visibility", "visible");
				//document.querySelector("[data-crop-tool]").addEventListener("click", function (){
				//  alert(cropper.getData().scaleX)
				//})
				//$preloader.fadeOut();
				// alert('load');
				$("[data-tool]").on("click", function() {
					//cropper.rotate(45);
					let tool = $(this).data("tool");
					//alert(tool.data("tool")
					switch(tool) {
						case "rotateLeft":
							cropper.rotate(-45);
							break;
						case "rotateRight":
							cropper.rotate(45);
							break;
						case "flipX":
							cropper.scaleX(-1);
							break;
						case "flipY":
							cropper.scaleY(-1);
							break;
						case "reset":
							cropper.reset();
							break;
					}
				})
			}
		});
	}).on('hidden.bs.modal', function() {
		cropper.destroy();
		cropper = null;
		$cropImgModal.delay("fast").css("visibility", "hidden");
	});
	cropBtn.addEventListener('click', function() {
		//var initialAvatarURL;
		var canvas;
		$cropImgModal.modal('hide');
		if(cropper) {
			canvas = cropper.getCroppedCanvas({
				width: 600,
				height: 600,
			});
			//initialAvatarURL = avatar.src;
			//avatar.src = canvas.toDataURL();
			$("#user-img").attr('src', canvas.toDataURL())
				//$progress.show();
				//$alert.removeClass('alert-success alert-warning');
			canvas.toBlob(function(blob) {
				isImageCropped = true;
				croppedImgBlobData = blob;
				//fd.append('cropped_image', blob, 'user.'+mimeType.slice(6));
				/*/alert(blob);
        var formData = new FormData();

          formData.append('cropped_image', blob, 'user.'+mimeType.slice(6));
          formData.append('fileExt', mimeType.slice(6));
          formData.append('action', 'blob');
          
	      $.ajax('action.php', {
          method: 'POST',
          data: formData,
          processData: false,
          contentType: false,

          xhr: function () {
            var xhr = new XMLHttpRequest();

            xhr.upload.onprogress = function (e) {
              var percent = '0';
              var percentage = '0%';

              if (e.lengthComputable) {
                percent = Math.round((e.loaded / e.total) * 100);
                percentage = percent + '%';
                //$progressBar.width(percentage).attr('aria-valuenow', percent).text(percentage);
              }
            };

            return xhr;
          },

          success: function (res) {
            //$("#uploadImg").attr("src", res.imgPath);
            cropper = null;
            alert(res);
            //window.location.href = "./welcome";
            //$alert.show().addClass('alert-success').text(JSON.stringify(res));
          },

          error: function () {
            //avatar.src = initialAvatarURL;
            $alert.show().addClass('alert-warning').text('Upload error');
          },

          complete: function () {
            $progress.hide();
          },
        });*/
			}, mimeType);
		}
	});
	$(".select-image").on("click", function() {
		$("#select-img").click();
	});
});