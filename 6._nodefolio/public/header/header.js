/* 
Wanted to make nav tabs active on click but it didnt work
$(window).load(function () {
    var checkvalue = window.location.pathname;
    console.log(checkvalue);
    $("a").each(function () {
        if ($(this).attr('href') == checkvalue) { $(this).addClass("active"); }
    });

}); */