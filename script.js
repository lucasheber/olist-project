$(document).ready(function() {

    $('.color-choose input').on('click', function() {
        var headphonesColor = $(this).attr('data-image');

        $('.active').removeClass('active');
        $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
        $(this).addClass('active');
    });

});

function readURL(input) {

    if (input.files && input.files[0]) {
        var filesAmount = input.files.length;

        let images = ""

        for (i = 0; i < filesAmount; i++) {
            var reader = new FileReader();

            reader.onload = function(event) {
                images = `<div class="form-group">
                                <img class="pl-2" src="${event.target.result}" width="70" height="50">
                                <button role="button" class="float-right pr-2 btn-danger btn-sm">Remover Foto</button> 
                                <button role="button" class="float-right btn-primary btn-sm">Foto Capa</button>
                         </div>
                         <hr>`
                $(".div-images").append(images);
            }

            reader.readAsDataURL(input.files[i]);
        }

    }
}