function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

function onFormSubmit(){
	if($('#searchusertitle').val() == "" && $('#searchdeaths').val() == ""){
		return getConfirmation();
	}
	else{
		return true;
	}
}

function getConfirmation(){	
   var retVal = confirm("You did not enter any search string. Do you still want to continue ?");
   if(retVal){
      return true;
   }
   else{
      return false;
   }
}

$(window).load(function() {
	$(".se-pre-con").fadeOut("slow");
});

$(document).ready(function(){
	
	$('#divContentView').hide();
	$('#divContentEdit').hide();

	$('#btnViewDetails').on('click',function(){
		var val_id = $('.select_radio:checked').val();
		console.log(val_id);

		if(val_id == undefined){
			swal({
				title: "Attention",
				text: "Please select a document to view.",
				type: "info",
				timer: 10000
			});
		}else{
			$('#divContentView').show();
			$.getJSON('/users/getSingleRecordToView/'+val_id,function(data){
				$('#_unit_id').text(data[0]._unit_id);
				$('#civilians').text(data[0].civilians);
				$('#terrorists').text(data[0].militants_terrorists_insurgents);
				$('#securityGuards').text(data[0].security_forces);
				$('#totalDeaths').text(data[0].total_number_of_people);
				$('#district').text(data[0].districtmatch);
				$('#state_full').text(data[0].state_full);
				$('#sentence').text(data[0].sentence);
				$('#subject').text(data[0].subject);
				$('#eventId').text(data[0].eventid);
				$('#_last_judgment_at').text(data[0]._last_judgment_at);

				if(data[0].comment == undefined || data[0].comment == ""){
					$('#cmntid').hide();
					$('#comment').text("");
				}else{
					$('#cmntid').show();
					$('#comment').text(data[0].comment);
				}

				$('#divContentView').bPopup({
					modal:true,
					modalClose: false,
					escClose: false,
					closeClass: 'b-close'
				});
			});
		}
	});

	$('#btnEditComment').on('click',function(){
		var val_id = $('.select_radio:checked').val();
		if(val_id == undefined){
			swal({
				title: "Attention",
				text: "Please select a document to edit.",
				type: "info",
				timer: 10000
			});
		}else{
			$('#addComment').val("");
			$('#divContentEdit').bPopup({
				modal:true,
				modalClose: false,
				escClose: false,
				closeClass: 'b-close',
				onClose: function(){
					$("#btnOverlaySave").removeClass("b-close");
				}
			});
		}
	});

	$('#btnOverlaySave').on('click',function(){
		var comment = $('#addComment').val();
		var x = {
			'uniqueId': $('.select_radio:checked').val(),
			'comment': comment
		};

		if(comment == ""){
			swal({
				title: "Attention",
				text: "Please enter some text to save.",
				type: "info",
				timer: 10000
			});
		}else{
			$.ajax({
				type: "POST",
				url: "/users/saveComment",
				dataType: "JSON",
				data: x
			}).done(function(){});
			
			swal({
				title: "Hurray",
				text: "Your comment has been saved successfully!",
				type: "success",
				timer: 10000
			});

			$("#btnOverlaySave").addClass("b-close");
			var bPopup = $('divContentEdit').bPopup();
			bPopup.close();
		}
	});

	$('#btnOverlayEditClose').on('click',function(){
		var bPopup = $('divContentEdit').bPopup();
		bPopup.close();
	});

	$("#myTableId").dynatable();
	var dynatable = $('#myTableId').data('dynatable');

// code for google like auto search functionality
	/*$("#searchusertitle").on("keyup",function(){
		var value=$(this).val();
		$.post("/users/livesearch",{string:value}).done(function(data){
			console.log(data);
		});
	});*/

});
