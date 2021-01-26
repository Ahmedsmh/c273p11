$(document).ready(function () {
    reload_table();
    $('#add_modal').on('hidden.bs.modal', function () {
        $('#add_form')[0].reset();
    });
    $("#btnAdd").click(function () {
        $("#add_modal").modal('show');
    });
    var add_validator = $("#add_form").validate({
        rules: {
            modulecode: {
                required: true,
                pattern: /^[a-zA-Z][0-9]+$/
            },
            modulename: {
                required: true
            },
        },
        messages: {
            modulecode: {
                required: "Please enter a module code",
                pattern: "First character have to an alphabeth"
            },
            modulename: {
                required: "Please enter a module name."
            },
        },
        submitHandler: function (form) {
            //$('#add_modal').modal('hide');
            var modulecode = $("#add_form [name=modulecode]").val();
            var modulename = $("#add_form [name=modulename]").val();

            $.ajax({
                url: "addModule.php",
                type: "POST",
                data: "modulecode=" + modulecode + "&modulename=" + modulename,
                dataType: "JSON",
                success: function (data) {
                    $('#add_modal').modal('hide');
                    reload_table();
                },
                error: function (obj, textStatus, errorThrown) {
                    $("#addErrorMsg").html("Unable to add record");
                    console.log("Error " + textStatus + ": " + errorThrown);
                    return false;
                }
            });
        }
    });
    $("#edit_form").validate({
        rules: {
            modulename: {
                required: true
            },
        },
        messages: {
            modulename: {
                required: "Please enter a module name."
            },
        },
        submitHandler: function (form) {
            //$('#add_modal').modal('hide');
            var modulecode = $("#edit_form [name=modulecode]").val();
            var modulename = $("#edit_form [name=modulename]").val();

            $.ajax({
                url: "http://localhost/c273/P10/editModule.php",
                type: "POST",
                data: "modulecode=" + modulecode + "&modulename=" + modulename,
                dataType: "JSON",
                success: function (data) {
                    $('#edit_modal').modal('hide');
                    reload_table();
                },
                error: function (obj, textStatus, errorThrown) {
                    $("#editErrorMsg").html("Unable to add record");
                    console.log("Error " + textStatus + ": " + errorThrown);
                    return false;
                }
            });
        }
    });
    $("#defaultTable").on("click", ".btnEdit", function () {
        var id = $(this).val();
        $.ajax({
            type: "GET",
            url: "getModuleDetails.php",
            data: "modulecode=" + id,
            cache: false,
            dataType: "JSON",
            success: function (data) {
                $("#edit_form [name=modulecode]").val(data.module_code);
                $("#edit_form [name=modulename]").val(data.module_name);
                $("#edit_modal").modal("show");
            },
            error: function (obj, textStatus, errorThrown) {
                console.log("Error " + textStatus + ": " + errorThrown);
            }
        });
    });
    $("#defaultTable").on("click", ".btnDelete", function () {
        var id = $(this).val();
        if (confirm("Are you sure you want to delete this student?")) {
            $.ajax({
                type: "GET",
                url: "http://localhost/c273/p10/deleteModule.php",
                data: "modulecode=" + id,
                cache: false,
                dataType: "JSON",
                success: function (data) {
                    reload_table();
                },
                error: function (obj, textStatus, errorThrown) {
                    console.log("Error " + textStatus + ": " + errorThrown);
                }
            });
        }
    });
});

function reload_table() {
    $.ajax({
        type: "GET",
        url: "http://localhost/c273/p10/getModules.php",
        cache: false,
        dataType: "JSON",

        success: function (response) {
            console.log(response.length);
            var message = "";
            for (i = 0; i < response.length; i++) {
                message += "<tr><td>" + response[i].module_code + "</td>"
                        + "<td>" + response[i].module_name + "</td>"
                        + "<td><button class='btnEdit btn btn-primary' value='" + response[i].module_code + "'><i class='fa fa-edit'></i> Edit</button>&nbsp;&nbsp;<button class='btnDelete btn btn-danger' value='" + response[i].module_code + "'>\n\
<i class='fa fa-trash'></i> Delete</button></td></tr>";
            }
            $("#defaultTable tbody").html(message);
        },
        error: function (obj, textStatus, errorThrown) {
            console.log("Error " + textStatus + ": " + errorThrown);
        }
    });
}