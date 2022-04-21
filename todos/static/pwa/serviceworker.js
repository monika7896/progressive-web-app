// import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7/+esm';


var staticCacheName = "django-pwa-v" + new Date().getTime();
var filesToCache = [
        '/',
        '/todos/base_layout',
        '/static/pwa/manifest.json',
        '/todos/add/',
        '/todos/',               
        '/static/pwa/idbop.js',       
        '/static/pwa/img/icon-512x512.png',
        "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/1.11.8/semantic.min.css",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",      
        
];

// Cache on install

self.addEventListener("install", event => {
    this.skipWaiting();
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
                            }
                    ))
    });

// Clear cache on activate
self.addEventListener('activate', event => {
    console.log('activated');

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => (cacheName.startsWith("django-pwa-v")))
                    .filter(cacheName => (cacheName !== staticCacheName))
                    .map(cacheName => caches.delete(cacheName))
            );
        })
    );
});



self.addEventListener('fetch', function(event) {
    // every request from our site, passes through the fetch handler // console.log('I am a request with url: ', //  'event.request.clone().url')
       
    if (event.request.clone().method === 'GET') {
      event.respondWith(
      
        caches.match(event.request.clone())//
          .then(function(response) {
            if (response) {
            
              return response;
            }
            // no match in cache, use the network instead
            return fetch(event.request.clone());
          }
        )
      );
    } else if (event.request.clone().method === 'POST') {
      // attempt to send request normally
      event.respondWith(fetch(event.request.clone()).catch(function
      (error) {
        // only save post requests in browser, if an error occurs
        savePostRequests(event.request.clone().url, event.request.clone().json())
        // )
      }))
    }
  });



  self.addEventListener('message', function (event) {
    console.log('form data', event.data)
    if (event.data.hasOwnProperty('form_data')) {
      // receives form data from script.js upon submission
      console.log("ADGAJSDGS")
      form_data = event.data.form_data
    }
  });


  self.addEventListener('sync', function (event) {
    console.log('now online')
    if (event.tag === 'sendFormData') { // event.tag name checked
      // here must be the same as the one used while registering
      // sync
      event.waitUntil(
        // Send our POST request to the server, now that the user is
        // online
        sendPostToServer()
        )
    }
  });


  // document.querySelector('#get-access').addEventListener('click', async function init(e) {
  //   try {
  //  }
  // catch (error) {
  //  }
  // })


//   document.querySelector('#get-access').addEventListener('click', async function init(e) {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: true
//       })
//       const videoTracks = stream.getVideoTracks()
//       const track = videoTracks[0]
//       alert(`Getting video from: ${track.label}`)
//       document.querySelector('video').srcObject = stream
//       document.querySelector('#get-access').setAttribute('hidden', true)
//   //The video stream is stopped by track.stop() after 3 second of playback.
//   setTimeout(() => {console.log("this is the third message")}, 1000)

//       // setTimeout(() =&gt; { track.stop() }, 3 * 1000)
//     } catch (error) {
//       alert(`${error.name}`)
//       console.error(error)
//     }
//   })


//   var grabFrameButton = document.querySelector('button#grabFrame');
// var canvas = document.querySelector('canvas');

// grabFrameButton.onclick = grabFrame;

// function grabFrame() {
//   imageCapture.grabFrame()
//   .then(function(imageBitmap) {
//     console.log('Grabbed frame:', imageBitmap);
//     canvas.width = imageBitmap.width;
//     canvas.height = imageBitmap.height;
//     canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
//     canvas.classList.remove('hidden');
//   })
//   .catch(function(error) {
//     console.log('grabFrame() error: ', error);
//   });
// }


// var takePhotoButton = document.querySelector('button#takePhoto');
// var canvas = document.querySelector('canvas');

// takePhotoButton.onclick = takePhoto;

// // Get a Blob from the currently selected camera source and
// // display this with an img element.
// function takePhoto() {
//   imageCapture.takePhoto().then(function(blob) {
//     console.log('Took photo:', blob);
//     img.classList.remove('hidden');
//     img.src = URL.createObjectURL(blob);
//   }).catch(function(error) {
//     console.log('takePhoto() error: ', error);
//   });
// };




  function openDatabase () {

  var indexedDBOpenRequest = indexedDB.open('flask-form',  1)
  indexedDBOpenRequest.onerror = function (error) {
    // error creating db
    console.error('IndexedDB error:', error)
  }

  indexedDBOpenRequest.onupgradeneeded = function () {

    this.result.createObjectStore('post_requests', {
     autoIncrement:  true, keyPath: 'id' })
  }
   // This will execute each time the database is opened.
   indexedDBOpenRequest.onsuccess = function () {
     our_db = this.result
  
   }
 }
 var our_db
 openDatabase()


 function getObjectStore (storeName, mode) {
  // retrieve our object store
  return our_db.transaction(storeName,mode
   ).objectStore(storeName)
    }


  function savePostRequests (url, payload) {
    console.log("savePostRequests" )

    // get object_store and save our payload inside it
    var request = getObjectStore('post_requests', 'readwrite').add({
      url: url,
      payload: payload,
      method: 'POST'
    })
    request.onsuccess = function (event) {
      console.log(url,payload,'a new pos_ request has been added to indexedb')

    
    }
    request.onerror = function (error) {
      console.error(error)
    }
  };


 
  function sendPostToServer () {

    var savedRequests = []
    var req = getObjectStore('post_requests', 'readwrite').openCursor() // FOLDERNAME
    // is 'post_requests'
    req.onsuccess = async function (event) {
      var cursor = event.target.result
     if (cursor) {
  
      savedRequests.push(cursor.value)
        cursor.continue()
     } else {
       // At this point, we have collected all the post requests in
       // indexedb.
       for (let savedRequest of savedRequests) {
         // send them to the server one after the other
         console.log('saved request', savedRequest ,"savedRequest.payload")
         var requestUrl = savedRequest.url
         var payload = JSON.stringify(savedRequest.payload)
         var method = savedRequest.method

         
         var headers = {
          //  'Accept': 'application/json',
           'Content-Type': 'application/json',

         } // if you have any other headers put them here
         console.log(payload,"var payload" ,method ,"method",headers,"strt")

         fetch(requestUrl, {
           headers: headers,
           method: method,
           body: payload
         }).then(function (response) {
           console.log('server response', response , response.body,"body")
           if (response.status == 200) {
            
            getObjectStore('post_requests',
               'readwrite').delete(savedRequest.id)
           } 
        }).catch(function (error) {      
         console.error('Send to Server failed:', error)
         
          throw error
        })
       }
      }
    }
  };
  


 function readAll() {
  var objectStore = our_db.transaction("post_requests").objectStore("post_requests");
  var all_offline_values =[]
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    var post = "";
    if (cursor) {
      // const txt = cursor.value   
      // const obj = cursor cursor.key
      console.log("cursor", cursor);

      // document.getElementById("offlinedata").innerHTML = cursor.value.payload.title;
      // console.log(cursor,"cursor.value" ,cursor.value.payload.title , cursor.key ,"fgfg" );

      var all_value = cursor.value.payload.title;
      console.log("array", all_value);
      all_offline_values.push(all_value);
      
      for (var i in all_offline_values) {
		    console.log("i",all_offline_values[i]);
        var title = '<div class="list-group-item" style="background-color:orange;">'+ all_offline_values[i]+'</div>'; 
        console.log("title", title);
        post=post+''+title+'';
        console.log("post", post)
      }
      document.getElementById("offlinedata").innerHTML = post;
    
      // for (let i=0; i < all_offline_values.length; i++){
      //   console.log("i",all_offline_values[i]);
      //   // document.getElementById("offlinedata").innerHTML = all_offline_values[i];
      //   // document.getElementsByClassName("offline-data").innerHTML = all_offline_values[i];

      //   // document.querySelector(".offline-data").innerHTML = all_offline_values[i];
      //   // console.log("html", document.querySelector(".offline-data").innerHTML);


      // }
      // for (let i=0; i < all_value.length; i++){
      //   console.log("allvalue", i);
      // }
      
      // alert("Id is " + cursor.key + " and Title is " + cursor.value.title  );
              
        cursor.continue();
     } else {
        // alert("No more entries!");
     }
  };
  
 }












