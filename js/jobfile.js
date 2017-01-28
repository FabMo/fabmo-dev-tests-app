// Run Files

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