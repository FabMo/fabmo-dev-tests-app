var qrReadOnce = false;

$("#call-c3").click(function(evt) {
	fabmo.runSBP('C#,3');
    fabmo.hideDRO();
});
$("#call-c2").click(function(evt) {
    fabmo.runSBP('C#,2');
});
$("#call-home").click(function(evt) {
    fabmo.runSBP('MH,');
});
$("#call-back").click(function(evt) {
    fabmo.runSBP('C#,79');
});
$("#call-center").click(function(evt) {
    fabmo.runSBP('M2,3,4');
});
$("#call-pull-keypad").click(function(evt) {
    fabmo.showDRO();
});
$("#call-set-z-zero").click(function(evt) {
    fabmo.runSBP('C#,78');
});
$("#call-reset-z-off").click(function(evt) {
    fabmo.runSBP('C#,77');
});
$("#call-DRO-rollout").click(function(evt) {
    fabmo.showDRO();
});
$("#call-DRO-hide").click(function(evt) {
    fabmo.hideDRO();
});

// Specials

$("#run-test").click(function(evt) {
    DoJobFile('jobs/test_carve.sbp');
});
$("#call-movetest").click(function(evt) {
    DoJobFile('jobs/move_test.sbp');
});


$("#get-serialnum").click(function(evt) {
    fabmo.getNetworkIdentity(function(err, data) {
      if (err) {
        console.info('Network not reachable');
        return;
      }
      if(data.id) {
//        $('#input-machine-name').val(data.name);
        console.log('name', data.name);
        document.getElementById("demo").innerHTML = data.name;
  //jQuery('#qrcode').qrcode("this plugin is great");
  // jQuery('#qrcodeTable').qrcode({
  //   render  : "table",
  //   text  : data.name
  // }); 
        if (!qrReadOnce) {
          jQuery('#qrcodeCanvas').qrcode({
            render  : "table",
            text  : data.name
          }); 
          $('#section-machine-name').show();
          qrReadOnce = true;
        }     
      }
    });
});


//$("#call-pull-keypad").click(function(evt) {
//  fabmo.notify('info', 'Heads Up! How extensive can this message be??');
//});

function postToGoogle(){
    //var name = $j('#name').val();
    var date = "5/5/15";
    var custID = "TH222222";
    var cust_name = "Ted Hall";
    var cust_loc = "Durham, NC";
    var ser_num = "test3333333";
    //var ser_num = $('#demo');
    //if ((name !== "") && (email !== "") && ((feed !== ""))) {
        $.ajax({
            url: "https://docs.google.com/spreadsheets/d/1NaIC9WgteQYMHhsBIw_nzC8EzxOaf9f6QwQ9Jcql6uk/formResponse",
            data: {"entry.1" : date, "entry.2" : custID, "entry.3" : cust_name, "entry.4": cust_loc, "entry.5": ser_num},
            type: "POST",
            dataType: "xml",
        });
    console.log("posted");
    //}
    //else {
        //Error message
    //}
}

$("#post-rec").click(function(evt) {
//  postToGoogle();
});

$("#print-rec").click(function(evt) {
//var result = contentWindow.document.execCommand('print', false, null);
var result = iframe.contentWindow.document.execCommand('print', false, null);

if (!result)
contentWindow.print();

});

function printFrame(id) {
            var frm = document.getElementById(id).contentWindow;
//            frm.focus();
            frm.print();
            return false;
}


$("#nav-showdro").click(function(evt) {
  fabmo.showDRO();
});
$("#nav-hidedro").click(function(evt) {
  fabmo.hideDRO();
});
$("#dash-info").click(function(evt) {
  fabmo.notify('info', 'Heads Up!');
});
$("#dash-success").click(function(evt) {
  fabmo.notify('success', 'Great Job!');
});
$("#dash-warning").click(function(evt) {
  fabmo.notify('warning', 'Uh Oh!');
});
$("#dash-error").click(function(evt) {
  fabmo.notify('error', 'Epic Fail!');
});

$("#dash-launch-job-manager").click(function(evt) {
  fabmo.launchApp('job-manager');
});

$("#dash-launch-doc").click(function(evt) {
  fabmo.navigate('http://docs.handibot.com/doc-output/Handibot%202%20MANUAL%20Safe%20Use%20Source_v001.pdf', {target : '_blank'});
});

$("#call-deleteme").click(function(evt) {
  fabmo.deleteApp('fabmo-productionapp');
  frameElement.parentNode.removeChild(frameElement);
  //location.reload();
});


// after tab is shown
$("a[href='#tab-serialnum']").on('shown.bs.tab', function(e) {
  console.log('shown - after the tab has been shown');
  fabmo.hideDRO();
});
// or even this one if we want the earlier event
$("a[href='#tab-serialnum']").on('show.bs.tab', function(e) {
  console.log('show - before the new tab has been shown');
  $("#get-serialnum").click();
});