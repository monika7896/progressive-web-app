// function submitFunction (event) {
//     event.preventDefault()
//     console.log('submitted', event)
//     title = $('#title').val()

//     $('#todoForm').hide()
    
//     // send  to server
//     var data = {
//       title: title,
      
//     }

//     // send message to service worker via postMessage
//     var msg = {
//       'form_data': data
//     }
//     navigator.serviceWorker.controller.postMessage(msg)  // 
//    $.ajax({
//       type: "POST",
//       url: '/todos/',
//       contentType: 'application/json',
//       data: JSON.stringify(data),
//         // data = {
//         // title: ('#title').val(),        
//         // },
//       success: function () {
//         alert("neee" ),

//         console.log('data sent to server successfully')
//       },
//       dataType: 'json'
//     });
    
//     message = 'Your data has been sent to the server'
//     $('#message').append(message)
//     return false
//   }




//   $('#add_submit').on('click', function(e){

//     e.preventDefault();
//     var title      = $("#title").val();   
  
    
//     $.ajax({
//       method:"POST",
//       url:"/todos",
//       data: {
//         title: title,
        
//       },
//       dataType: 'json',
  
//       success:function(resp){
//                 alert("neee" )        
//       }
//     })  
    
//   })
  






// // $('#add_submit').click(function(){
// //     var formdetails=$('#todoForm').serialize();
// //     var url="http://127.0.0.1:8000/todos";

// //     var data = {
// //         title : title
// //     }
// //     // send message to service worker via postMessage
// //     var msg = {
// //       'form_data': data
// //     }
// //     navigator.serviceWorker.controller.postMessage(msg)  // <-This
// //     // line right here sends our data to sw.js
// //     $.ajax({
// //     url:url,
// //     data:formdetails,
// //     method:"POST",
// //     success:function(result){
// //     alert(result);
// //     console.log("sagdfdshjk")
// //     },
// //     error:function(error){
// //     alert(error);
// //     }
// //     })
// //     })





//    $('#add_submit').click(function(){
//     title = $('#title').val()
//   title = $('#title').val();
  
//   console.log('values',title)
//   // send  to server
//   data = {
//     'csrfmiddlewaretoken':"{{ csrf_token }}",
//     title: title,    
//   }

//   console.log("ewtrer".title)
// $.ajax({
//   'csrfmiddlewaretoken':"{{ csrf_token }}",

  
//     type: "POST",
//     url: '/todos/add/',
//     contentType: 'application/json',
//     data: JSON.stringify(data),
//     success: function () {
//       console.log('data sent to server successfully')
//     },
//     dataType: 'json'
//   });
  
//   message = 'Your data has been sent to the server'
//   $('#message').append(message)
//   return false

//    });
   





  
  // $('#add_submit').click(function(){
  //   title = $('#title').val()
  //   console.log(title,"ewvbnr")

  //   // var formdetails=$('#todoForm').serialize();
  //   $.ajax({
  //     type:'POST',
  //     url:'/todos/',
  //     data:{
  //       title: $('#title').val(),
  //       csrfmiddlewaretoken: '{{ csrf_token }}'

  //     },
  //     success:function(result){
  //       alert(result,"result");
  //     },
  //     error:function(error){
  //     alert(error,"aert");
  //     }
  //   });
  // });

  // function submitFunction (event) {
  // event.preventDefault()
  // console.log('submitted', event)
   // $('#add_submit').click(function(){
  //   title = $('#title').val()

