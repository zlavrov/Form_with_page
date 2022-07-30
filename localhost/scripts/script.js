$('.send_data').on('click', function() {

    let validFname = false;
    let validLname = false;
    let validEmail = false;
    let validPass = false;
    let validCoPass = false;

    $("form").submit(function(event) {

        event.preventDefault();

        let Fname = $('#fname').val();
        let Lname = $('#lname').val();
        let Email = $('#email').val();
        let Pass = $('#pass').val();
        let CoPass = $('#copass').val();

        function validsFalse(idInput, classBlock) {
            $(idInput).parent().removeClass("has-success").addClass("has-error");
            $(classBlock).append('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
            $(` ${classBlock} .glyphicon-ok`).remove();
            return false;
        }

        function validsTrue(idInput, classBlock) {
            $(idInput).parent().removeClass("has-error").addClass("has-success");
            $(classBlock).append('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
            $(` ${classBlock} .glyphicon-remove`).remove();
            return true;
        }


        if (Fname == "") {
            validFname = validsFalse('#fname', ".fnameBlock");
        } else {
            validFname = validsTrue('#fname', ".fnameBlock");
        }


        if (Lname == "") {
            validLname = validsFalse('#lname', ".lnameBlock");
        } else {
            validLname = validsTrue('#lname', ".lnameBlock");
        }


        if (Email == "" && !Email.includes("@")) {
            validEmail = validsFalse('#email', ".emailBlock");
        } else {
            validEmail = validsTrue('#email', ".emailBlock");
        }


        if (Pass == "") {
            validPass = validsFalse('#pass', ".passBlock");
        } else {
            validPass = validsTrue('#pass', ".passBlock");
        }


        if (CoPass == "" || CoPass != Pass) {
            validCoPass = validsFalse('#copass', ".copassBlock");
        } else {
            validCoPass = validsTrue('#copass', ".copassBlock");
        }


        if (validFname == true && validLname == true && validEmail == true && validPass == true && validCoPass == true) {
            $('form').unbind('submit').submit();

            $.ajax({
                type: 'POST',
                cache: false,
                dataType: 'json',
                url: 'php_scripts/back.php',
                data: { Fname: Fname.trim(), Lname: Lname.trim(), Email: Email.trim() },
                success: function(data) {
                    if(data.result == true) {
                        document.getElementById('forms').reset();
                        document.getElementById('warning').hidden = true;
                        document.getElementById("parentform").innerHTML = '<h1 style="color: #3c763d">Registration Successful</h1>';
                    } else {
                        document.getElementById("warning").innerHTML = '<p style="color: #a94442;"><b>Error, Form did not pass validation</b></p>';
                    }
                }
            });
        }
    });
});