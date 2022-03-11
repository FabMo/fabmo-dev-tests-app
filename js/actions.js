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
$("#run-movetest").click(function(evt) {
    DoJobFile('jobs/test_motion.sbp');
});
$("#run-shortmovetest").click(function(evt) {
    DoJobFile('jobs/test_shortmotion.sbp');
});
$("#run-sblogo").click(function(evt) {
//    load_SBPfile_run('jobs/sample_shopbot_logo.sbp');
    DoJobFileStay('jobs/sample_shopbot_logo.sbp');    // Note STAY version
});
$("#run-ck-syn-error").click(function(evt) {
    DoJobFile('jobs/test_ck-syn-error.sbp');
});
$("#run-on-pause-off").click(function(evt) {
    DoJobFile('jobs/test_on-pause-off.sbp');
});
$("#run-sim-homing").click(function(evt) {
    fabmo.runMacro(2);
//    fabmo.runSBP('C#,2');                           // Now just running current C2 for simulation
});
$("#run-subs-loops").click(function(evt) {
    DoJobFile('jobs/test_subs-loops.sbp');
});
$("#run-inserted-sk").click(function(evt) {
    DoJobFile('jobs/test_insert-sk.sbp');
});
$("#run-with-macro9").click(function(evt) {
    DoJobFile('jobs/test_gator_cut.sbp');
});

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

$("#dash-launch-rep").click(function(evt) {
    fabmo.navigate('https://docs.google.com/document/d/1CHENZPwwjMrkgTUpJA0-1NUTtqeLM8AsvqM0nvUcP7g/edit?usp=sharing', {target : '_blank'});
  });


// Working with Label Tab
// ... after tab shown 
$("a[href='#tab-serialnum']").on('shown.bs.tab', function(e) {
  console.log('shown - after the tab has been shown');
  fabmo.hideDRO();
});
// ... earlier 
$("a[href='#tab-serialnum']").on('show.bs.tab', function(e) {
  console.log('show - before the new tab has been shown');
  $("#get-serialnum").click();
});

$("#call-deleteme").click(function(evt) {
  fabmo.deleteApp('fabmo-productionapp');
  frameElement.parentNode.removeChild(frameElement);
  //location.reload();
});

$("#get-serialnum").click(function(evt) {
    fabmo.getNetworkIdentity(function(err, data) {
      if (err) {
        console.info('Network not reachable');
        return;
      }
      if(data.id) {
        console.log('name', data.name);
        document.getElementById("demo").innerHTML = data.name;
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

$("#post-rec").click(function(evt) {
  fabmo._download("test this stuff", 'prod_Logfabmo.txt','text/json');
  fabmo.navigate("https://docs.google.com/spreadsheets/d/1LuCzhduFyZ9_erDGJ4pctm_kLWXFcw602IlPcqWchow/edit?usp=sharing",{target : '_blank'});
  console.log("posted");
  //fabmo._download(JSON.stringify(conf), 'fabmo_config_backup.fmc','text/json');
  //postToGoogle();
});
