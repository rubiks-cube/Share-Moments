const functions = require('firebase-functions');
const cors = require('cors')({origin:true});
const fs = require('fs');
const os = require('os');
const path=require('path');
const UUID = require('uuid-v4');

const gcsConfig = {
    projectId:"moments-3393",
    keyFilename:"moments-3.json"
};
const gcs = require('@google-cloud/storage')(gcsConfig);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.storeImage = functions.https.onRequest((request, response) => {
    cors(request,response, ()=>{
        const body = JSON.parse(request.body);
        fs.writeFileSync(path.join(os.tmpdir(),"uploaded-image.jpg"),body.image,"base64");

        const bucket = gcs.bucket("moments-3393.appspot.com");
        const uuid = UUID();
        bucket.upload(path.join(os.tmpdir(),"uploaded-image.jpg"),{
            uploadType:"media",
            destination: "/places/" + uuid +".jpg",
            metadata:{
                metadata:{
                contentType:"image/jpeg",
                firebaseStorageDownloadTokens: uuid
                }
            }
        },(err,file)=>{
            if(!err){
                response.status(201).json({
                    imageUrl:"https://firebasestorage.googleapis.com/v0/b/"+
                    bucket.name+
                    "/o/"+
                    encodeURIComponent(file.name)+
                    "?alt=media&token="+
                    uuid
                });
            }else{
                console.log(err);
                response.status(500).json({err:err});
            }
        });
    })
 
});
