$(document).ready(function () {
    var review = JSON.parse(localStorage.getItem("review"));
    var message = "";
    for (var i = 0; i < review.length; i++) {
        var movie = review[i];
        message += "<div class='card'>"
                + "<div class='card-header'>"
                + movie.Title
                + "</div>"
                + "<div class='card-body'>"
                + "<blockquote class='blockquote mb-0'>"
                + "<p>" + movie.Plot + "</p>"
                + "</blockquote>"
                + "</div>"
                + "</div><br/>";
    }
    $("#contents").html(message);
});
