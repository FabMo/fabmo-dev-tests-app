// Run Files
////## I have been puttering with several of 4? potential methods for running a file with respect to
//        the file manager. At the moment, I left the logo file running with "stayHere" method.

function DoJobFile (jobPath) {
  var sbp = "";
  var cur_name = "";
  
  jQuery.get(jobPath, function(data) {
      sbp += data;
    })
    .done(function() {
      cur_name = jobPath;
      jobPath = jobPath.replace('jobs/', '');
      jobPath = jobPath.replace('.sbp', '');
      console.log("job submitted");

      fabmo.submitJob({
        file: sbp,
        filename: cur_name,
        name: "test_",
        description: "File: " + jobPath
      });
  });
}  

function DoJobFileStay (jobPath) {
  var sbp = "";
  var cur_name = "";
  
  jQuery.get(jobPath, function(data) {
      sbp += data;
    })
    .done(function() {
      cur_name = jobPath;
      jobPath = jobPath.replace('jobs/', '');
      jobPath = jobPath.replace('.sbp', '');
      console.log("job submitted");

      fabmo.submitJob({
        file: sbp,
        filename: cur_name,
        name: "test_",
        description: "File: " + jobPath
      },

      {stayHere : true}, function(err, result) { 
      if (err){
        console.log(err);
       } else {
          fabmo.runNext(function(err, data) {
             if (err) {
               console.log(err);
             } else {
               console.log('running');
             }
           });
        }          
      });
  });
}  


function load_SBPfile_run (file) {
// #1  get json string of sbp part file and DIRECT run (not leaving app?; no job history)
  var content = "";
  jQuery.get(file, function(data) {
      content += data;
    })
    .done(function() {
        console.log("LOADED - ", file );
        //console.log("With: ", content );
      fabmo.runSBP(content);
  });
}



// TED: see notes on methods for running files in pen-turning ... not quite fully there.

// fabmo.clearJobQueue(function(err,data){
//   if (err){
//     cosole.log(err);
//   } else {
// ///////This is the important part. Use submitJob if the file isn't in history yet.
//     fabmo.resubmitJob(jobId, {stayHere : true}, function(err, result) {
//       if (err){
//         console.log(err);
//        } else {
//           fabmo.runNext(function(err, data) {
//              if (err) {
//                console.log(err);
//              } else {
//                  console.log('running');
//              }
//            });
//          }
//        });
//      }
//   });