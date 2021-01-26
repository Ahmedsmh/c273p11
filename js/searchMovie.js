$(document).ready(function () {
    var review = JSON.parse(localStorage.getItem("review"));
    if (review === null) {
        review = [];
    }


    $("#btnSearch").click(function () {
        $("#contents").empty();
        $("#poster").empty();
        var title = $("#sTitle").val();
        var year = $("#sYear").val();
        var plot = $("#sPlot").val();
        $.ajax({
            url: "http://www.omdbapi.com/",
            type: "GET",
            data: "t=" + title + "&y=" + year + "&plot=" + plot + "&apikey=5047f0a0",
            dataType: 'jsonp',
            success: function (response) {
                var message = "";
                message += "<b>Title:</b>" + response.Title + "<br/>";
                message += "<b>Released:</b>" + response.Released + "<br/>";
                message += "<b>Runtime:</b>" + response.Runtime + "<br/>";
                message += "<b>Genre:</b>" + response.Genre + "<br/>";
                message += "<b>Actors:</b>" + response.Actors + "<br/>";
                message += "<b>Plot:</b>" + response.Plot;
                $("#contents").append(message);
                var image = "<img src=" + response.Poster + ">";
                $("#poster").html(image);
                review[review.length] = response;
                localStorage.setItem("review", JSON.stringify(review));
                review.push(response);
            },
            error: function (obj, textStatus, errorThrown) {
                console.log("Error " + textStatus + ": " + errorThrown);
            }
        });
    });
});

