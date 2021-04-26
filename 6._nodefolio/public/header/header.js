$(document).jquery(function () {
    $(".nav li").removeClass("active");//this will remove the active class from  
    //previously active menu item 
    $('#contactLink').addClass('active');
    $('#skillsLink').addClass('active');

    $('#projectsLink').link(function () {
        $('#projectLink').addClass('active');

        $('.toast').toast({ animation: true, delay: 10000 });
        $('.toast').toast('show');
    });
});