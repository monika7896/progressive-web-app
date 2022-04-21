// var dbPromise = idb.open('flask-form', 2, function(upgradeDb) {
// 	upgradeDb.createObjectStore('post_requests',{keyPath:'pk'});
// });


// // var OpenReq = indexedDB.open( 'flask-form', 2 );
// // OpenReq.onupgradeneeded = function( e )
// // {
// //     let db = e.target.result;
// //     db.objectStoreNames.contains( "post_requests" ) || db.createObjectStore( "post_requests" );
// // }

// 	//retrive data from idb and display on page
// 	var post="";
//   dbPromise.then(function(db){
// 		var tx = db.transaction('post_requests', 'readonly');
//   		var feedsStore = tx.objectStore('post_requests');
//   		return feedsStore.openCursor();
// 	}).then(function logItems(cursor) {
// 		  if (!cursor) {
// 		  	document.getElementById('offlinedata').innerHTML=post;
// 		    return;
// 		  }
		//   for (var field in cursor.value) {
		//     	if(field=='fields'){
		//     		feedsData=cursor.value[field];
		//     		for(var key in feedsData){
		//     			if(key =='title'){
		//     				var title = '<h3>'+feedsData[key]+'</h3>';
		//     			}
		    			
		    			
		//     		}
		//     		post=post+'<br>'+title+'<br>';
		//     	}
		//     }
		//   return cursor.continue().then(logItems);
		// });







// var dbPromise = idb.open('flask-form456', 1, function(upgradeDb) {
// 	upgradeDb.createObjectStore('post_requests',{keyPath:'pk'});
//    });
   
  
  

	//collect latest data from sqllite from server and store in idb.

   // fetch('http://127.0.0.1:8000/todos/getdataapi').then(function(response){
	// return response.json();
   // }).then(function(jsondata){
   //    console.log("serializer",jsondata)
	// dbPromise.then(function(db){
	//  var tx = db.transaction('feeds', 'readwrite');
	//    var feedsStore = tx.objectStore('feeds');
	//    for(var key in jsondata){
	// 	if (jsondata.hasOwnProperty(key)) {
	// 	  feedsStore.put(jsondata[key]); 
	// 	   }
	//    }
	//    });
   // });
  

	//retrive data from idb and display on page


//    var post="";
// 	dbPromise.then(function(db){
// 	var tx = db.transaction('feeds', 'readonly');
// 		var feedsStore = tx.objectStore('feeds');
//     return feedsStore.openCursor();
//  	}).then(function logItems(cursor) {
//     if (!cursor) {
//      document.getElementById('offlinedatas').innerHTML=post;
//       return;
//     }

//     for (var field in cursor.value) {
//        if(field=='fields'){
//         feedsData=cursor.value[field];
//         for(var key in feedsData){
//          if(key =='title'){
//           var title = '<h3>'+feedsData[key]+'</h3>';
//          }           
//         }
//         post=post+'<br>'+title +'<br>' ;
//        }
//       }
//     return cursor.continue().then(logItems);
//   });


 //to store data in indexdb dynamicaly on post form

// document.addEventListener('submit' , (ev) =>{
//     ev.preventDefault(); 

//    dbPromise.then(function adddata(db){
// 	var tx = db.transaction('feeds', 'readwrite');
//    var feedsStore = tx.objectStore('feeds');
//    let title = document.getElementById('title').value; 
//    let pk = document.getElementById('pk').value;
//    console.log(title,"torituer" ,pk ,"pkk")

//       let feed = {
//       pk,
//       title,
//       created: new Date()
//       };
      
//    let request = feedsStore.add(feed); 
//    request.onsuccess = function() { 
//    console.log("feed added to the store", request.result);
//    };

//    request.onerror = function() {
//    console.log("Error", request.error);
//    }});
// });



// document.addEventListener('clikc',function nowadd(e){
//     e.preventDefault();
 

// let formData = document.getElementById('todoForm')

// fetch("http://127.0.0.1:8000/todos/create/", { 

//     method: 'post', 
//     "headers": {  
//       'Content-Type': 'application/json',
      
        
//     },        
//     body: JSON.stringify
// }).then(function (res) { 

//     if (res.status >= 200 && res.status < 400) {             
//         var successMsg = "<div class='alert-success'>Your Request is Submitted Successfully.  <br>Thanks</div>";
//         var target = _d.qs(".content-target");
//         target.innerHTML = successMsg;

//    return res.json(); 
//     } else { 
//   console.log('Status Code: FAILED');      
//      return; 
//     } 
// }).then(function (resp) { 
//     //process the response 
// })

// });






// function add() {
//   var request = our_db.transaction(["post_requests"], "readwrite")
//   .objectStore("post_requests")
//   .add({ title: "monika api" });
  
//   request.onsuccess = function(event) {
//      alert("data has been added to your database.");
//   };
  
//   request.onerror = function(event) {
//      alert("Unable to add data\r\ is already exist in your database! ");
//   }
// }