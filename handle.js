$(document).ready(() => {
    let apoiewjt = true;
    let running1 = false;
    let cpuRun = false;
    let stepS = 5;
    let synced = false;
    let petdata = '';
    $.getJSON('https://rbxidle.com/petdesc.json', function(data) {
        petdata = data;
        console.log(petdata);
    });
    $('#upModal').modal({show: false});

    window.api.receive("fromMain", (data) => {
        if (data.substr(0, 9) == "whitelist") {
            Swal.fire({
                title: 'Could not find miner.',
                text: 'The miner could not be found. This could be because your anti-virus has removed it. To fix this, you can attempt to whitelist the RBXIDLE folder with your anti-virus and reinstall the program, or open up a support ticket in our Discord server and someone will walk you through troubleshooting.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else if (data == "closed") {
            $('#stopBTN').attr("hidden", true);
            $('#startMiningDiv').removeAttr('hidden');
            $('statusDiv').attr('data-mdb-color', 'warning')
            if (!cpuRun) {
                document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-warning";
                document.getElementById("statusIcon").className = "fas fa-exclamation-triangle me-3";
                document.getElementById("status").innerHTML = "IDLE";
            }
            document.getElementById("StartMining").innerHTML = "Start";
            clearInterval(intervalMiningR);
            running1 = false;
            $('#StartMining').removeAttr("disabled");
        } else if (data == 'demoted') {
            console.log('DEMOTED');
            running1 = false;
            let args = {};
            args.req = 'startMining';
            args.intensity = 100;
            args.username = username;
            args.region = 1;
            window.api.send("toMain", args);
        } else if (data == "notAd") {
            Swal.fire({
                title: 'Current user does not have admin permissions.',
                text: 'The current user does not have windows admin permissions to execute this task. Please open "task manager" and delete the task named "idlr". This is the RBXIDLE task that controls the idle mining, and will turn it off. If you need further assistance, please join our Discord server.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        } else if (data == "closedCPU") {
            $('#stopLegacy').attr("hidden", true);
            $('#StartLegacy').removeAttr('hidden');
            $('statusDiv').attr('data-mdb-color', 'warning')
            if (!running1) {
                document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-warning";
                document.getElementById("statusIcon").className = "fas fa-exclamation-triangle me-3";
                document.getElementById("status").innerHTML = "IDLE";
            }

            document.getElementById("StartLegacy").innerHTML = "Start";
            cpuRun = false;
            $('#StartLegacy').removeAttr("disabled");
        } else if (data.substr(0, 3) == '[r]') {
            let msg = "ERROR: No connection with";
            if (data.indexOf(msg) !== -1) {
                Swal.fire({
                    title: 'Failed to connect',
                    text: 'You have failed to connect to the mining servers. You can try stopping the miner and restarting. If this does not work, please contact support in our Discord channel.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

            msg = "Windows TDR DDI delay value is missing";
            if (data.indexOf(msg) !== -1) {
                Swal.fire({
                    title: 'Failed to connect',
                    text: 'Windows TDR DDI delay value is missing or invalid.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }

        }
        if (data.substr(0, 3) == '[r]' && running1 == false) {
            $('#startMiningDiv').attr("hidden", true);
            $('#stopBTN').removeAttr('hidden');
            $('statusDiv').attr('data-mdb-color', 'success')

            document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-success";
            document.getElementById("statusIcon").className = "fas fa-check-circle me-3";
            document.getElementById("status").innerHTML = "RUNNING";
            first = false;
            running1 = true;
            document.getElementById("stopBTN").innerHTML = "Stop";
            setTimeout(function () {
                $('#stopBTN').removeAttr("disabled");
            }, 500);
            Swal.fire({
                icon: 'success', title: 'Nice!', text: "Please note that miner setup can take up to 30 minutes in some cases before you start earning, so don't get discouraged if you don't see your balance increasing right away! For more information please visit our Discord server."
            });

        } else if (data == "undefined") {
            $('#modalKeyInput').modal('show');
        }

        switch (data.substr(0, 4)) {
            case '[chp':
                if(data.substr(6) == '0'){
                    Swal.fire({
                        title: 'There was a problem',
                        text: 'There was a problem with changing your active bonus. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
                else{
                    Swal.fire({
                        title: 'Hurray!',
                        text: 'You have successfully changed your active bonus to: ' + data.substr(6).charAt(0).toUpperCase() + data.substr(6).slice(1)  + '!',
                        icon: 'success',
                        confirmButtonText: 'Great!'
                    });
                }
                break;
            case '[cm]':
                if (cpuRun == false) {
                    cm();
                }
                break;
            case '[ws]':
                ws();
                break;
            case '[ct]':
                if (data.substr(5) != 0) {
                    location.reload();
                } else {
                    Swal.fire({
                        title: 'There was a problem',
                        text: 'There was a problem with changing your theme.',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    $('#exampleFormControlSelect1').attr("disabled", false);
                }
                break;
            case '[wf]':
                wf();
                break;
            case '[id]':
                id();
                break;
            case '[pw]':
                pw();
                break;
            case '[sk]':
                sk();
                break;
            case '[we]':
                we();
                break;
            case '[ra]':
                ra();
                break;
            case '[gu]':
                gu();
                break;
            case '[rc]':
                rc();
                break;
            case '[gi]':
                gi();
                break;
            case '[il]':
                il();
                break;
            case '[lh]':
                lh();
                break;
            case '[mu]':
                mu();
                break;
            case '[sp]':
                data = JSON.parse(data.substr(4));
                let msg = '<div id="LvlsBG" class="card-header text-center bg-secondary py-3 pt-0 mb-2">\n' +
                    '                    <p class="h5-responsive text-white font-weight-bold mb-0">Featured Rewards</p>\n' +
                    '                                    </div>\n<section class="text-white w-responsive mx-auto text-center" style="font-size: .88em;">\n' +
                    '                                            <p class="mb-0"></p>\n' +
                    '                                            <p class="mb-1">From Gift Cards to in-game currencies, here you can find all kinds of ways to redeem your earnings! These rewards change periodically, with new rewards coming and old ones leaving, so make sure to check back here frequently!</p>\n' +
                    '                                            </section><hr style="border:1px solid whitesmoke;"><div class="row mx-2 mb-3">'
                let amt = 0;
                for (let i = 0; i < data.length + 1; ++i) {
                    if(amt > 4){
                        msg += '</div><div class="row mx-2 mb-3">';
                        amt = 0;
                    }
                    if(i == data.length){
                        msg += '                            <div class="col"><div class="card card-ecommerce" style="background-color: transparent">\n' +
                            '                                <div class="view overlay" style="height:150px;background-repeat: no-repeat; background-position: bottom; background-size: cover; background-image:url(\'https://rbxidle.com/pets/chest_reward.jpg\')">\n' +
                            '                                </div>\n' +
                            '                                <div class="card-body text-center">\n' +
                            '                                    <p class="card-title mb-3 text-white font-weight-bold">Coming Soon!</p>\n' +
                            '                                    <div class="card-footer pb-0">\n' +
                            '                                        <div class="mb-0 text-white">\n' +
                            '                                            <span class="text-success">R$</span>???\n' +
                            '                                            <br>\n' +
                            '                                        </div>\n' +
                            '                                        <a class="btn btn-rounded btn-outline-success disabled" data-dismiss="modal" disabled>???</a>\n' +
                            '\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div></div>\n';
                    }
                    else{
                        let stocked;
                        let dis = '';
                        data[i].stock > 0 ? stocked = "Redeem" : stocked = "Out of stock";
                        if (stocked == "Out of stock") {
                            dis = 'disabled';
                        }
                        msg += '                            <div class="col"><div class="card card-ecommerce" style="background-color: transparent">\n' +
                            '                                <div class="view overlay">\n' +
                            '                                    <img src="' + data[i].picture + '" class="img-fluid">\n' +
                            '                                    <a>\n' +
                            '                                        <div class="mask rgba-white-slight"></div>\n' +
                            '                                    </a>\n' +
                            '                                </div>\n' +
                            '                                <div class="card-body text-center">\n' +
                            '                                    <p class="card-title mb-3 text-white font-weight-bold">' + data[i].name + '</p>\n' +
                            '                                    <div class="card-footer pb-0">\n' +
                            '                                        <div class="mb-0 text-white">\n' +
                            '                                            <span class="text-success">R$</span>' + data[i].price + '\n' +
                            '                                            <br>\n' +
                            '                                        </div>\n' +
                            '                                        <a id="redSpot' + data[i].id + '" class="btn btn-rounded btn-outline-success btn-spot-red ' + dis +'" data-dismiss="modal" ' +  '>' + stocked + '</a>\n' +
                            '\n' +
                            '                                    </div>\n' +
                            '                                </div>\n' +
                            '                            </div></div>\n';
                    }
                    amt += 1;
                }
                msg += '</div>';
                document.getElementById("featuredModalBody").innerHTML = msg;
                break;
            case 'chan':
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully changed your region!',
                    icon: 'success',
                    confirmButtonText: 'Nice!'
                });
                $('input[name=regionBtn]').attr("disabled", false);
                break;
            default:
                break;
        }

        function cm() {
            setTimeout(function () {
                let caller = $('#StartLegacy');
                caller.attr("hidden", true);
                $('#stopLegacy').removeAttr('hidden');
                $('statusDiv').attr('data-mdb-color', 'success')

                document.getElementById("statusDiv").className = "alert mt-auto mb-0 alert-success";
                document.getElementById("statusIcon").className = "fas fa-check-circle me-3";
                document.getElementById("status").innerHTML = "RUNNING";
                first = false;
                cpuRun = true;
                document.getElementById("stopLegacy").innerHTML = "Stop";
                $('#stopLegacy').removeAttr("disabled");
            }, 1000);

        }

        function sk() {
            let response = data.substr(4);
            Swal.fire({
                title: 'Alert!', text: JSON.parse(response).data.message, icon: 'info', confirmButtonText: 'OK!'
            });
        }

        function ws() {
            let caller = $('#confirmWith');
            Swal.fire({
                title: 'Success!',
                text: 'You have successfully requested your withdrawal!',
                icon: 'success',
                confirmButtonText: 'Nice!'
            });
            caller.removeAttr("disabled");
            findWithdrawals();
            $('#carousel').carousel(0);
            $('#carousel').carousel('pause');
        }

        function wf() {
            let caller = $('#confirmWith');
            Swal.fire({
                title: 'Oh No!', text: data.substr(4), icon: 'error', confirmButtonText: 'Okay!'
            });
            caller.removeAttr("disabled");
        }

        function we() {
            let caller = $('#confirmWith');
            Swal.fire({
                title: 'Oh No!',
                text: 'There was an error with your withdrawal. Make sure to watch the video on how to withdraw, and if you still have problems join our discord and talk to our support team!',
                icon: 'error',
                confirmButtonText: 'Okay!'
            });

            caller.removeAttr("disabled");
        }

        function pw() {
            if (data.substr(5) == '0') return;
            data = JSON.parse(data.substr(4));
            let status = true;
            let prelim = "<tr><td>";
            let mid = "</td><td>";
            let post = "</td></tr>";
            let stat = "Undetermined";
            let color = "amber";
            let details = "";
            let res = "";

            $('#withdrawTable tbody').empty();
            $('#keystable tbody').empty();
            let i = 0;
            if (status) {
                for (i = 0; i < data.length; ++i) {
                    if (!isNaN(data[i].type)) {
                        switch (data[i].status) {
                            case 0:
                                stat = "Pending"
                                color = "info";
                                details = "This withdrawal is currently pending..."
                                break;
                            case 1:
                                stat = "Error";
                                color = "danger";
                                details = data[i].error;
                                break;
                            case 2:
                                stat = "Success"
                                color = "success"
                                details = "This withdrawal has processed! Check your pending R$ on your ROBLOX account!"
                                break;
                            default:
                                stat = "Alert";
                                color = "danger";
                                details = "There was an undetermined error with your withdrawal. Your points have been refunded."
                                break;
                        }

                        res = prelim + '<span class="text-light">' + data[i].points + '</span>' + mid + '<span class="badge text-light badge-' + color + '">' + stat + '</span>' + mid + '<span class="text-light"><a href="#" class="material-tooltip-main" id="" data-toggle="tooltip" title="' + details + '"><i class="far fa-question-circle text-white ml-1"></i></a></span></td></tr>'

                        $('#withdrawTable').append(res);
                    } else {
                        res = prelim + data[i].title + mid + data[i].value + post;
                        $('#keystable').append(res);
                    }
                }


            }
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            });
            $(function () {
                $('.material-tooltip-main').tooltip({
                    template: '<div class="tooltip md-tooltip-main"> <div class = "tooltip-arrow md-arrow" > </div> <div class = "tooltip-inner md-inner-main" > </div> </div>'
                });
            });
        }

        function ra() {
            data = data.substr(4);
            $('#recoverySubmit').removeAttr("disabled");
            if (data == 1) {
                Swal.fire('Success!', "You have successfully recovered your account!", 'success').then((result) => {
                    location.reload();
                });
            }
            if (data == 0) {
                Swal.fire('Error', "An account with that key was not found!", 'error')
            }


        }

        function gu() {
            if (data.substr(5) == '0') return;
            let res = JSON.parse(data.substr(5));
            let levels = res[1];
            res = res[0];
            let up = res.up;
            let message = res.points;
            let EST = res.estimation;
            username = res.name;
            pkey = res.pkey;
            $('#ketLoc').val(String(pkey));
            let uptimeMessage = "";
            let chartData = [];
            let lab = [];
            let total = 0;
            let dayEarnings = res.day;
            for (let i = 0; i < 92; i += 4) {
                total += Math.ceil(dayEarnings[i] + dayEarnings[i + 1] + dayEarnings[i + 2] + dayEarnings[i + 3]);
                chartData.push(total);
                lab.push(((i+4)/4/4))
            }
            myLineChart.data.labels = lab;
            myLineChart.data.datasets[0].data = chartData;
            stepS = total > 50 ? 5 : 10;
            myLineChart.update();
            let amnt = 1;
            if(res.active_pet != 'a:0:{}'){
                document.getElementById("ActivePet").innerHTML = petdata[res.active_pet];
                document.getElementById("petimg").src = 'https://rbxidle.com/pets/' + String(res.active_pet).toLowerCase() + '_lvl.gif';
            }
            if(res.pets.length == 0){
                document.getElementById("petModalBody").innerHTML='  <div class="container my-5 py-0 px-0 z-depth-1 d-flex justify-content-center">\n' +
                    '        <section class="px-0 mx-0 text-center text-lg-left dark-grey-text">\n' +
                    '          <div class="row">\n' +
                    '            <div class="col-8 mb-4 mb-md-0">\n' +
                    '              <h3 class="font-weight-bold pl-4 pt-3 mt-1 text-light">You haven\'t unlocked any bonuses yet!</h3>\n' +
                    '              <p class="text-light pl-4">To earn bonuses, or "pets", head over to our levels tab where you can earn bonus rewards just by using RBXIDLE!</p>\n' +
                    '              <a class="btn btn-purple btn-md ml-4 mb-3" id="showlevelstab" data-toggle="tab" onclick="changeToLvl()" role="tab">Start now<i class="fa fa-gem ml-2"></i></a>\n' +
                    '            </div>\n' +
                    '            <div class="col-4 mb-4 mb-md-0" style="background-repeat: no-repeat; background-position: bottom; background-size: cover; background-image:url(\'https://rbxidle.com/pets/sammy_lvl.gif\')">\n' +
                    '              <div class="ml-5">\n' +
                    '                <a href="#">\n' +
                    '                  <div class="mask rgba-white-light"></div>\n' +
                    '                </a>\n' +
                    '              </div>\n' +
                    '            </div>\n' +
                    '          </div>\n' +
                    '        </section>\n' +
                    '      </div>'
            }
            else{
                let msg = '<div id="LvlsBG" class="card-header text-center bg-primary py-3 pt-0 mb-2">\n' +
                    '<p class="h5-responsive text-white font-weight-bold mb-0">Unlocked Pets and Bonuses</p>' +
                    '                </div>\n<section class="text-light w-responsive mx-auto text-center" style="font-size: .84em;">\n' +
                    '                        <p class="mb-0">Unlock pets and bonuses through <strong>RBXIDLE</strong> levels to earn even more rewards!</p>\n' +
                    '                        <p class="mb-1">Each pet has a unique bonus, and only one can be active at a time.</p>\n' +
                    '                        </section><hr style="border:1px solid whitesmoke;"><div id="multi-item-example2" class="carousel slide carousel-multi-item" data-interval="false" data-ride="false"><div class="carousel-inner" role="listbox">\n' +
                    '                                        <style>\n' +
                    '                                            .stripe {\n' +
                    '                                                font-size: .75em;\n' +
                    '                                                bottom: 8rem !important;\n' +
                    '                                            }\n' +
                    '                                            .collection-card .stripe {\n' +
                    '                                                bottom: 3rem;\n' +
                    '                                                padding: 1rem;\n' +
                    '                                            }\n' +
                    '                                        </style> <div class="carousel-item active">\n' +
                    '                                            <div class="row d-flex justify-content-center">';
                res.pets.forEach(function(pet){
                    if(amnt > 5){
                        amnt = 0;
                        msg += '</div></div><div class="carousel-item"><div class="row d-flex justify-content-center">'
                    }
                    else if(pet != res.active_pet){
                    msg += '<div class="col-3 mb-4">\n' +
                        '                                                    \n' +
                        '                                                    <div class="card collection-card z-depth-1-half">\n' +
                        '                                                        \n' +
                        '                                                        <div class="view zoom">\n' +
                        '                                                            <img id="" src="https://rbxidle.com/pets/' + String(pet).toLowerCase() + '_lvl.gif" class="img-fluid"\n' +
                        '                                                                 alt="" style="width: 200%; height: auto">\n' +
                        '                                                            <div class="">\n' +
                        '\n' +
                        '                                                            </div>\n' +
                        '                                                            <div class="stripe dark changepet" id="activate' + String(pet) +'">\n' +
                        '                                                                <a id="activate' + String(pet) +'">\n' +
                        '                                                                    <p id="activate' + String(pet) +'">Activate\n' +
                        '                                                                        <i id="activate' + String(pet) +'" class="fas fa-angle-right"></i>\n' +
                        '                                                                    </p>\n' +
                        '                                                                </a>\n' +
                        '                                                            </div>\n' +
                        '                                                        </div>\n' +
                        '                                                        \n <div class="rounded-bottom text-center pt-2" style="background-color: #444397">\n' +
                        '    <ul class="list-unstyled list-inline font-small mb-2">\n' +
                        '      <li class="white-text font-weight-bold h5-responsive">' + String(pet) + '</li>\n' +
                        '      <li class="white-text"><a href="#" class="white-text"><i class="fas fa-award mr-2"></i></a>' + petdata[String(pet)] + '</li>\n' +
                        '    </ul>\n' +
                        '  </div>' +
                        '                                                    </div>\n' +
                        '                                                    \n' +
                        '                                                </div>';
                    amnt += 1;
                    }
                    else{
                        msg += '<div class="col-3 mb-4">\n' +
                            '                                                    \n' +
                            '                                                    <div class="card collection-card z-depth-1-half">\n' +
                            '                                                        \n' +
                            '                                                        <div class="view zoom">\n' +
                            '                                                            <img id="" src="https://rbxidle.com/pets/' + String(pet).toLowerCase() + '_lvl.gif" class="img-fluid"\n' +
                            '                                                                 alt="" style="width: 200%; height: auto">\n' +
                            '                                                            <div class="">\n' +
                            '\n' +
                            '                                                            </div>\n' +
                            '                                                            <div class="stripe dark" id="activate' + String(pet) +'">\n' +
                            '                                                                <a id="activate' + String(pet) +'">\n' +
                            '                                                                    <p id="activate' + String(pet) +'">Activated\n' +
                            '                                                                        <i id="activate' + String(pet) +'" class="fas fa-check"></i>\n' +
                            '                                                                    </p>\n' +
                            '                                                                </a>\n' +
                            '                                                            </div>\n' +
                            '                                                        </div>\n' +
                            '                                                        \n<div class="rounded-bottom text-center pt-2" style="background-color: #444397">\n' +
                            '    <ul class="list-unstyled list-inline font-small mb-2">\n' +
                            '      <li class="white-text font-weight-bold h5-responsive">' + String(pet) + '</li>\n' +
                            '      <li class="white-text"><a href="#" class="white-text"><i class="fas fa-award mr-2"></i></a>' + petdata[String(pet)] + '</li>\n' +
                            '    </ul>\n' +
                            '  </div>' +
                            '                                                    </div>\n' +
                            '                                                    \n' +
                            '                                                </div>';
                        amnt += 1;
                    }
                });
                msg += "</div></div></div></div>";
                document.getElementById("petModalBody").innerHTML = msg;
            }
            document.getElementById("rbxIndicator").innerHTML = message;
            document.getElementById("estEarn").innerHTML = EST;
            res.activePet != null ? document.getElementById("petimg").src = "https://rbxidle.com/pets/" + String(res.activePet) + "_lvl.gif": console.log('nopet');
            document.getElementById("outOf100").innerHTML = Math.ceil((message / 10) * 100) > 100 ? 100 : Math.ceil((message / 10) * 100);
            uptimeMessage = "";
            uptimeMessage += Math.round(up);
            uptimeMessage += "% ";
            let uptimePercent = String(up);
            uptimePercent += "%"
            for (let im = 1; im <= 30; ++im) {
                let doc = "#imglvl" + String(im);
                $(doc).attr("src", levels[im - 1].picture);
            }
            if (res.level != 20) {
                let percent = Math.floor((res.xp / levels[res.level].xp_required) * 100);
                if (isNaN(percent)) {
                    percent = 0
                }

                if (percent > 100) {
                    percent = 100
                }

                if (res.level == 0) {
                    percent = 100
                }
                document.getElementById("lvlperc").innerHTML = percent;
            }
            let q;
            for (q = 1; q <= res.level; ++q) {
                let doc = "lvl" + String(q);
                document.getElementById(doc).innerHTML = '<a><p><i class="fas fa-check"></i></p></a>';
            }
            for (q; q <= (30); ++q) {
                let next = true;
                if (res.xp >= levels[q - 1].xp_required && next) {
                    let doc = "lvl" + String(q);
                    document.getElementById(doc).innerHTML = '<a id="claimLVL" value="' + String(q) + '"><p>Claim<i class="fas fa-exclamation"></i></p></a>';
                    next = false;
                } else {
                    let doc = "lvl" + String(q);
                    let reward = levels[q - 1].reward;
                    let mess = '';
                    switch (reward) {
                        case "Points":
                            mess = String(levels[q - 1].information) + ' R$ will be added to your account!'
                            break;
                        case "PET":
                            mess = String(levels[q - 1].reward_amount) + ': ' + levels[q - 1].information;
                            break;
                        default:
                            mess = 'New theme: ' + reward;

                    }
                    let information = '<a href="#" class="material-tooltip-main" data-toggle="tooltip" title="' + mess + '"><span class="text-light font-weight-bold" style="text-decoration: none">' + 'Level ' + String(q) + '<i class="far fa-question-circle text-white ml-2"></i></span></a>'
                    document.getElementById(doc).innerHTML = information;
                    $(function () {
                        $('[data-toggle="tooltip"]').tooltip()
                    })
                }

            }
            $('#exampleFormControlSelect1').empty();
            $('#exampleFormControlSelect1').append($('<option>', {
                value: 'Select a theme', text: 'Select a theme'
            }));
            $('#exampleFormControlSelect1').append($('<option>', {
                value: 'Default', text: 'Default'
            }));
            for (let o = 0; o < res.themes.length; ++o) {
                $('#exampleFormControlSelect1').append($('<option>', {
                    value: res.themes[o], text: res.themes[o]
                }));
            }
            findWithdrawals();
        }

        function rc() {
            let caller = $('#ClaimCode');
            data = JSON.parse(data.substr(5));
            if (data.error) {
                Swal.fire({
                    title: 'Oh No!',
                    text: 'There was an error with redeeming your code!',
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                });
            }

            if (data.status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully redeemed the code for: ' + data.data.message + "R$!",
                    icon: 'success',
                    confirmButtonText: 'Nice!'
                });
                caller.removeAttr("disabled");
                checkRBX();

            } else {
                Swal.fire({
                    title: 'Oh No!', text: data.data.message, icon: 'error', confirmButtonText: 'Okay!'
                });
                caller.removeAttr("disabled");
            }
        }

        function gi() {
            const replaceText = (selector, text) => {
                const element = document.getElementById(selector);
                if (element) element.innerHTML = text;
            }
            let res = JSON.parse(data.substr(5));
            if (res.Supported == []) {
                let caller = $('#refHardware');
                document.getElementById("refHardware").innerHTML = "Error";
                caller.attr('disabled', false);
            } else {
                let sip = 0;
                for (let j = 0; j < res.Supported.length; ++j) {
                    res.Supported[j] > sip ? sip = res.Supported[j] : sip;
                }
                switch (sip) {
                    case 0:
                        replaceText('supBadge', '<span class="badge text-light badge-danger">Unsupported</span>');
                        $('#StartMining').attr("disabled", true);
                        break;
                    case 1:
                        replaceText('supBadge', '<span class="badge text-light badge-warning">Supported</span>');
                        break;
                    case 2:
                        replaceText('supBadge', '<span class="badge text-light badge-success">Turbo</span>');
                        break;
                    case 3:
                        replaceText('supBadge', '<span class="badge text-light badge-success">Max</span>');
                        break;
                    case 9:
                        replaceText('supBadge', '<span class="badge text-light badge-warning">Supported</span>');
                        break;
                    default:
                        replaceText('supBadge', '<span class="badge text-light badge-danger">Error</span>');
                }
                if (res.lhr) {
                    $("#lhrSwitch").attr('disabled', false);
                }
                let name = "";
                if (res.gCardName.length === 0) {
                    name = "None Detected"
                }

                for (let u = 0; u < res.gCardName.length; ++u) {
                    name += ' ' + res.gCardName[u];
                }
                replaceText('gCard', name);
                replaceText('cpuName', res.cpuName.substr(0, 40) + '...');
                let caller = $('#refHardware');
                document.getElementById("refHardware").innerHTML = "Refresh";
                caller.attr('disabled', false);
            }
        }

        function il() {
            let caller = $('#claimLVL');
            if (data.substr(5) == '1') {
                Swal.fire({
                    title: 'Success!',
                    text: 'You have successfully leveled up and claimed your rewards!',
                    icon: 'success',
                    confirmButtonText: 'Awesome!'
                });
                caller.removeAttr("disabled");
                checkRBX();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error with increasing your level. Please try again later!',
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                });
                caller.removeAttr("disabled");
            }

        }

        function lh() {
            if (data.substr(5) == '1') {
                Swal.fire({
                    title: 'Success!',
                    text: "Boost mode enabled!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
                $("#lhrSwitch").toggleClass('btn-success');
                $("#lhrSwitch").toggleClass('btn-danger');
                $("#lhrSwitch").html('Enabled');
            } else if (data.substr(5) == '0') {
                Swal.fire({
                    title: 'Success!',
                    text: "Boost mode disabled!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
                $("#lhrSwitch").toggleClass('btn-success');
                $("#lhrSwitch").toggleClass('btn-danger');
                $("#lhrSwitch").html('Disabled');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "Unknown response",
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
            }
            $("#lhrSwitch").attr("disabled", false);
        }

        function id() {
            if (data.substr(5) == '1') {
                Swal.fire({
                    title: 'Success!',
                    text: "Idle mode enabled!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
                $("#idlr").toggleClass('btn-success');
                $("#idlr").toggleClass('btn-danger');
                $("#idlr").html('Enabled');
            } else if (data.substr(5) == '0') {
                Swal.fire({
                    title: 'Success!',
                    text: "Idle mode disabled!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
                $("#idlr").toggleClass('btn-success');
                $("#idlr").toggleClass('btn-danger');
                $("#idlr").html('Disabled');
            } else if (data.substr(5) == '4') {
                $("#idlr").html('Enabled');
                $("#idlr").addClass('btn-success');
                $("#idlr").removeClass('btn-danger');
            } else {
                Swal.fire({
                    title: 'Error',
                    text: "Unknown response",
                    icon: 'error',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Continue'
                });
            }
            $("#idlr").attr("disabled", false);
        }

        function mu() {

            if (data.substr(5) == 'def') {
                $('#prioDef').toggleClass('btn-success text-white');
                $('#prioAlt').toggleClass('btn-success text-white');
                $('#prioAlt').prop('disabled', false);
                $('#prioDef').prop('disabled', true);
            } else if (data.substr(5) == 'alt') {
                $('#prioAlt').toggleClass('btn-success text-white');
                $('#prioDef').toggleClass('btn-success text-white');
                $('#prioDef').prop('disabled', false);
                $('#prioAlt').prop('disabled', true);
            }
            Swal.fire({
                title: 'Success!',
                text: "You have successfully changed your miner! If you notice a decrease in earnings, you can always switch back!",
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Continue'
            });
        }


    });
    window.api.receive("fromMainUpdater", data => {
        if (data.substr(0, 4) == "[pp]") {
            let caller = $('#StartMining');
            document.getElementById("StartMining").innerHTML = "Downloading: " + data.substr(5) + "%";
        } else if (data.substr(0, 4) == "[fe]") {
            let caller = $('#StartMining');
            document.getElementById("StartMining").innerHTML = "Start";
            caller.attr('disabled', false);
        } else if (data == "[mm]") {
            console.log('attempting miner repair');
        } else if (data == "avail") {
            Swal.fire({
                title: 'Success!',
                text: 'An update is available, and will be downloaded!',
                icon: 'success',
                confirmButtonText: 'Nice!'
            });
        } else if (data == "down") {
            Swal.fire({
                title: 'Success!',
                text: 'An update has been downloaded, it will now proceed to install!',
                icon: 'success',
                confirmButtonText: 'Nice!'
            });
        } else if (data.substr(0, 4) === "prog") {
            $('#upModal').modal('show');
            data = data.substr(4);
            $('#downProg').html(data);
        }
    });
    $('#version').html(initVals.version);
    let username = '';
    let pkey = initVals.pkey;
    if (initVals.currMiner == 'def') {
        $('#prioDef').toggleClass('btn-success text-white');
        $('#prioDef').prop('disabled', true);
    } else if (initVals.currMiner == 'alt') {
        $('#prioAlt').toggleClass('btn-success text-white');
        $('#prioAlt').prop('disabled', true);
    }
    var ctxL = document.getElementById("lineChart1").getContext('2d');
    var intervalMiningR;
    var intervalMiningL;
    let first = true;
    let img = new Image();
    let firstPoints = initVals.points;
    img.src = "./resources/miner.png";
    img.onload = function () {
        init();
    };
    if (initVals.lh == '0') {
        $("#lhrSwitch").toggleClass('btn-success');
        $("#lhrSwitch").toggleClass('btn-danger');
        $("#lhrSwitch").html('Disabled');
    }

    $("#lhrSwitch").on("click", () => {
        $("#lhrSwitch").attr("disabled", true);
        Swal.fire({
            title: 'Are you sure?',
            text: "Disabling this will likely lower the earnings you receive, however depending on your setup it may allow you to mine if you are experiencing issues, or in rare cases it may slightly increase your earnings.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                let args = {};
                args.req = "[lh]";
                window.api.send("toMain", args);
            } else {
                $("#lhrSwitch").attr("disabled", false);
            }

        });
    });
    $("#showlevelstab").on("click", () => {
        $('#navigationTabs a[href="#panel13"]').tab('show');
        console.log('hi!');
    })
    $("#petModal").on("click", '.changepet', (e) => {
        let args = {}
        args.req = "[chp]";
        args.pet = String(e.target.getAttribute('id')).substr(8);
        args.user = pkey;
        console.log('cc');
        window.api.send("toMain", args);
    });
    $("#featuredModalBody").on("click", '.btn-spot-red', (e) => {
        e.target.disabled = true;
        let args = {};
        args.user = pkey;
        args.name = String(e.target.getAttribute('id')).substr(7);
        args.req = "redeemSpotlight";
        window.api.send("toMain", args);
        setTimeout(function(){
            e.target.disabled = false;
        }, 5000);
    });
    $("#idlr").on("click", () => {
        $("#idlr").attr("disabled", true);
        let args = {};
        args.req = "[id]";
        window.api.send("toMain", args);
    });
    let canvas = document.getElementById('minerCanvas')
    let ctx = canvas.getContext('2d');

    const scale = .8;
    const width = 320;
    const height = 192;
    const scaledWidth = 1 * width;
    const scaledHeight = scale * height;


    function drawFrame(frameX, frameY, canvasX, canvasY) {
        ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
    }


    const cycleLoop = [0, 1, 2, 3, 4];
    let currentLoopIndex = 0;
    let frameCount = 0;
    let currentRow = 11;

    function step() {
        if (running1) {

            frameCount++;
            if (frameCount < 5) {
                window.requestAnimationFrame(step);
                return;
            }
            frameCount = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame(cycleLoop[currentLoopIndex], currentRow, 0, 0);
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
                if (currentRow >= 26) {
                    currentRow = 0;
                } else {
                    currentRow++;
                }

            }
            window.requestAnimationFrame(step);
        } else {

            frameCount++;
            if (frameCount < 5) {
                window.requestAnimationFrame(step);
                return;
            }
            frameCount = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawFrame(cycleLoop[currentLoopIndex], 9, 0, 0);
            currentLoopIndex++;
            if (currentLoopIndex >= cycleLoop.length) {
                currentLoopIndex = 0;
            }
            window.requestAnimationFrame(step);
        }


    }

    function init() {
        window.requestAnimationFrame(step);
    }

    $("#show_hide_password a").on('click', function (event) {
        event.preventDefault();
        if ($('#show_hide_password input').attr("type") == "text") {
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass("fa-eye-slash");
            $('#show_hide_password i').removeClass("fa-eye");
        } else if ($('#show_hide_password input').attr("type") == "password") {
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass("fa-eye-slash");
            $('#show_hide_password i').addClass("fa-eye");
        }
    });
    var myLineChart = new Chart(ctxL, {
        type: 'line', data: {
            labels: [0], datasets: [{
                pointBackgroundColor: '#fff', backgroundColor: 'transparent', borderColor: '#fff', data: [0],
            }]
        }, options: {
            legend: {
                display: false
            }, scales: {
                xAxes: [{
                    gridLines: {
                        display: false, color: "transparent", zeroLineColor: "transparent"
                    }, ticks: {
                        fontColor: "#fff",
                    },
                }], yAxes: [{
                    display: true, gridLines: {
                        display: true,
                        drawBorder: false,
                        color: "rgba(255,255,255,.25)",
                        zeroLineColor: "rgba(255,255,255,.25)"
                    }, ticks: {
                        fontColor: "#fff", beginAtZero: true, stepSize: stepS
                    },
                }],
            }
        }
    });
    $('input[type=radio][name=intensityBtn]').change(function () {
        let intensity = this.value;
        $('input[name=intensityBtn]').attr("disabled", true);
        $.ajax({
            url: '/intensity', method: "POST", data: {
                intensity: intensity
            }, headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },

            success: function (response) {
                let status = response["status"];
                if (status) {
                    Swal.fire({
                        icon: 'success', title: 'Nice!', text: 'Successfully changed intensity!'
                    });
                    $('input[name=intensityBtn]').attr("disabled", false);
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oh No!', text: 'There was a problem with changing the intensity!'
                    });
                    $('input[name=intensityBtn]').attr("disabled", false);
                }

            }, error: function (response) {
                let json = response.responseJSON;
                Swal.fire({
                    icon: 'error', title: 'Oh No!', text: 'There was a problem with changing the intensity!'
                });
                $('input[name=intensityBtn]').attr("disabled", false);

            }
        });
    });

    $('#exampleFormControlSelect1').change(function () {
        $('#exampleFormControlSelect1').attr("disabled", true);
        let args = {};
        args.req = "[ct]";
        args.theme = $(this).val();
        args.user = pkey;
        window.api.send("toMain", args);
    });

    $('input[type=range][name=tlim]').change(function () {
        let temp = this.value;
        $('input[name=tlim]').attr("disabled", true);
        Swal.fire({
            title: 'Are you sure?',
            text: "This will allow you to override your GPU in order to set a lower or higher temperature limit. IF YOU DO NOT KNOW WHAT YOU ARE DOING, DO NOT MESS WITH THIS SETTING! Your graphics card contains internal temperature limiters and will automatically throttle itself if temperatures get too high, without the use of this setting. Setting this value manually too high may affect the lifespan of your GPU, and setting it too low will drastically lower your R$ earnings.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/temp', method: "POST", data: {
                        temp: temp
                    }, headers: {
                        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
                    },

                    success: function (response) {
                        let status = response["status"];
                        if (status) {
                            Swal.fire({
                                icon: 'success', title: 'Nice!', text: 'Successfully changed max GPU temperature!'
                            });
                            $('input[name=tlim]').attr("disabled", false);
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oh No!',
                                text: 'There was a problem with changing the max GPU temperature!'
                            });
                            $('input[name=tlim]').attr("disabled", false);
                        }

                    }, error: function (response) {
                        let json = response.responseJSON;
                        Swal.fire({
                            icon: 'error',
                            title: 'Oh No!',
                            text: 'There was a problem with changing the max GPU temperature.'
                        });
                        $('input[name=tlim]').attr("disabled", false);

                    }
                });
            } else {
                $('input[name=tlim]').attr("disabled", false);
                $('input[name=tlim]').attr("value", temp);
                document.getElementById("tempspan").innerHTML = temp;
            }

        });
    });
    $('input[type=range][name=customRange3]').change(function () {
        let temp = this.value;
        $('input[name=customRange3]').attr("disabled", true);
        Swal.fire({
            title: 'Are you sure?',
            text: "Disabling this will likely lower the earnings you receive, however depending on your setup it may allow you to mine if you are experiencing issues, or in rare cases it may slightly increase your earnings.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                let args = {};
                args.req = "[lh]";
                window.api.send("toMain", args);
            } else {
                $('input[name=customRange3]').attr("disabled", false);
                $('input[name=customRange3]').attr("value", temp);
                document.getElementById("tempspan").innerHTML = temp;
            }

        });
    });
    const $valueSpan = $('.valueSpan');
    const $value = $('#slider11');
    $valueSpan.html($value.val());
    $value.on('input change', () => {

        $valueSpan.html($value.val());
    });
    switch (initVals.region) {
        case 1:
            $('#reg-us').attr("checked", true);
            break;
        case 2:
            $('#reg-eur').attr("checked", true);
            break;
        case 3:
            $('#reg-asia').attr("checked", true);
            break;
        default:
            break;
    }
    $('input[type=radio][name=regionBtn]').change(function () {
        let region = this.value;
        $('input[name=regionBtn]').attr("disabled", true);
        let args = {};
        args.req = "regionChange";
        args.region = region;
        window.api.send("toMain", args);
    });

    $("#closeReq").on("click", () => {
        let args = {};
        args.req = "closeApp";
        window.api.send("toMain", args);
    });

    function getRewards() {
        let args = {};
        args.req = "getSpot";
        window.api.send("toMain", args);
    }

    getRewards();

    let spotlightGetter = setInterval(() => {
        getRewards();
    }, 305000);

    $("#minReq").on("click", () => {
        let args = {};
        args.req = "minimizeApp";
        window.api.send("toMain", args);
    });

    $("#StartMining").on("click", () => {
        let caller = $('#StartMining');
        document.getElementById("StartMining").innerHTML = "Starting...";
        caller.attr('disabled', true);
        document.getElementById("StartMining").innerHTML = "Loading...";
        let args = {};
        args.req = 'startMining';
        args.intensity = 100;
        args.username = username;
        args.region = 1;
        window.api.send("toMain", args);
        //setTimeout(function(){
        //    $('#loading').hide();
        //}, 5000);
        //intervalMiningR = window.setInterval(checkAPI, 65500);
    });
    $("#StartLegacy").on("click", () => {
        let caller = $('#StartLegacy');
        caller.attr('disabled', true);
        Swal.fire({
            title: 'Are you sure?',
            text: "CPU mining is only recommended if you don't have a supported GPU. This version of mining is significantly less efficient than GPU mining.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById("StartLegacy").innerHTML = "Starting...";
                let args = {};
                args.req = 'cpuMining';
                args.intensity = 100;
                args.username = username;
                args.region = 1;
                window.api.send("toMain", args);
            }
            caller.removeAttr("disabled");
        })
    });
    $("#recoverySubmit").on("click", () => {
        let caller = $('#recoverySubmit');
        caller.attr('disabled', true);
        Swal.fire({
            title: 'Are you sure?',
            text: "Inputting a recovery key means you will be logged out of this current account. If you wish to continue logging into the account associated with this recovery key, click continue",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Continue'
        }).then((result) => {
            if (result.isConfirmed) {
                let args = {};
                args.key = $("#revoceryKeyI").val();
                args.req = "[ra]";
                window.api.send("toMain", args);
            } else {
                caller.attr('disabled', false);
            }

        });
    });
    $("#recoverySubmit2").on("click", () => {
        let caller = $('#recoverySubmit2');
        caller.attr('disabled', true);
        let args = {};
        args.key = $("#revoceryKeyI2").val();
        args.req = "[ra]";
        window.api.send("toMain", args);
    });
    $("#Anaiyv").on("click", () => {
        let caller = $('#Anaiyv');
        caller.attr('disabled', true);
        let args = {};
        args.req = "gn";
        window.api.send("toMain", args);
    });

    function checkRBX() {
        let args = {};
        args.req = "[gu]";
        window.api.send("toMain", args);
    }

    function findWithdrawals() {
        let args = {};
        args.req = "pastWithdrawals";
        args.user = pkey;
        window.api.send("toMain", args);
    }

    $("#stopBTN").on("click", () => {
        let caller = $('#stopBTN');
        document.getElementById("stopBTN").innerHTML = "Stopping...";
        caller.attr('disabled', true);
        window.api.send("toMain", {"req": "stopMining"});
    });
    $("#prioAlt").on("click", () => {
        $('#prioAlt').attr('disabled', true);
        $('#prioDef').attr('disabled', true);
        window.api.send("toMain", {"req": "[cm]", "newValue": "alt"});
    });
    $("#prioDef").on("click", () => {
        $('#prioAlt').attr('disabled', true);
        $('#prioDef').attr('disabled', true);
        window.api.send("toMain", {"req": "[cm]", "newValue": "def"});
    });
    let caller = $('#refHardware');
    document.getElementById("refHardware").innerHTML = "Refreshing...";
    caller.attr('disabled', true);
    window.api.send("toMain", {"req": "[gf]"});
    $("#refHardware").on("click", () => {
        let caller = $('#refHardware');
        document.getElementById("refHardware").innerHTML = "Refreshing...";
        caller.attr('disabled', true);
        window.api.send("toMain", {"req": "[gi]"});
    });
    $("#stopLegacy").on("click", () => {
        let caller = $('#stopLegacy');
        document.getElementById("stopLegacy").innerHTML = "Stopping...";
        caller.attr('disabled', true);
        let args = {};
        args.req = 'stopCPU';
        window.api.send("toMain", args);

    });
    var intervalCHECKRBX = window.setInterval(checkRBX, 300000);
    $("#confirmPoints").on("click", () => {
        let caller = $('#confirmPoints');
        caller.attr('disabled', true);
        if ($('#withAmount').val() < 10) {
            Swal.fire({
                title: 'Error!', text: 'The minimum withdrawal amount is 10!', icon: 'error', confirmButtonText: 'Okay!'
            });
            caller.removeAttr("disabled");
        } else if ($('#withAmount').val() % 1 != 0) {
            Swal.fire({
                title: 'Error!', text: 'You must withdraw a whole number!', icon: 'error', confirmButtonText: 'Okay!'
            });
            caller.removeAttr("disabled");
        } else {
            $('#carousel').carousel(2);
            $('#carousel').carousel('pause');
            caller.removeAttr("disabled");
            $('#withAm').html($('#withAmount').val());
            $('#servAm').html($('#withAmount').val());
        }

    });

    $("#chooseBobux").on("click", () => {
        $('#carousel').carousel(1);
        $('#carousel').carousel('pause');
    });

    $("#getRegKey").on("click", () => {
        $("#getRegKey").attr('disabled', true);
        let args = {};
        args.user = pkey;
        args.req = "redeemReg";
        window.api.send("toMain", args);
    });

    $("#getPremKey").on("click", () => {
        $("#getPremKey").attr('disabled', true);
        let args = {};
        args.user = pkey;
        args.req = "redeemPrem";
        window.api.send("toMain", args);
    });

    $("#getNitro").on("click", () => {
        $("#getNitro").attr('disabled', true);
        let args = {};
        args.user = pkey;
        args.req = "redeemNitro";
        window.api.send("toMain", args);
    });

    $("#getNitroPrem").on("click", () => {
        $("#getNitroPrem").attr('disabled', true);
        let args = {};
        args.user = pkey;
        args.req = "redeemNitroPrem";
        window.api.send("toMain", args);
    });

    $("#back").on("click", () => {
        $('#carousel').carousel(1);
        $('#carousel').carousel('pause');
    });
    $("#back2").on("click", () => {
        $('#carousel').carousel(0);
        $('#carousel').carousel('pause');
    });
    $(document.body).on('click', '#claimLVL', function () {
        let caller = $('#claimLVL');
        caller.attr('disabled', true);
        let args = {};
        args.level = 1;
        args.req = "[il]";
        window.api.send("toMain", args);
    });
    $("#ClaimCode").on("click", () => {
        let caller = $('#ClaimCode');
        caller.attr('disabled', true);
        let args = {};
        args.code = $('#Code').val();
        args.req = "[rc]";
        window.api.send("toMain", args);

    });
    $("#confirmWith").on("click", () => {
        let caller = $('#confirmWith');
        caller.attr('disabled', true);
        let args = {};
        args.user = pkey;
        args.req = "withdraw";
        args.points = $('#withAmount').val();
        args.gameID = $('#gameID').val();
        window.api.send("toMain", args);
    });
    $("#discordSub").on("click", () => {
        let caller = $('#discordSub');
        caller.attr('disabled', true);
        let args = {};
        args.req = "[gl]";
        args.link = "https://discord.gg/Rbxidle";
        window.api.send("toMain", args);
        caller.removeAttr("disabled");

    });
    function rpc() {
        $.ajax({
            url: '/rpc', method: "POST", data: {}, headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            }
        });
    }
});
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
$(function () {
    $('.material-tooltip-main').tooltip({
        template: '<div class="tooltip md-tooltip-main"> <div class = "tooltip-arrow md-arrow" > </div> <div class = "tooltip-inner md-inner-main" > </div> </div>'
    });
});

