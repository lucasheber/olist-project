$(document).ready(function() {

    $('.color-choose input').on('click', function() {
        var headphonesColor = $(this).attr('data-image');

        $('.active').removeClass('active');
        $('.left-column img[data-image = ' + headphonesColor + ']').addClass('active');
        $(this).addClass('active');
    });

    $(".add-row").click(function() {
        var markup = `<tr><td><input placeholder="preencha o titulo do atributo" class="form-control" type="text" name="" id=""></td>
        <td><input  placeholder="preencha a informação atributo" class="form-control" type="text" name="" id=""></td>
        <td><input onclick="$(this).closest('tr').remove();" type="button" value="Remover"></td></tr>`;
        $("table tbody").append(markup);
    });

    // Find and remove selected table rows
    $(".delete-row").click(function() {
        $(this).parents("tr").remove();
    });

    $("#salvar").on('click', function() {
        var produto = $("form.produto").serializeArray();
        localStorage.setItem("produto", JSON.stringify(produto))
        $(".message").show();

    });

    $("#pergunta").on('click', function() {
        console.log(localStorage.getItem("respostas"));
        console.log(localStorage.getItem("produto"));
    });

    $(".respostas").hide();
    $(".message").hide();
    $(".late").hide();
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
                                <input onclick="$(this).closest('div').remove();" type="button" class="float-right pr-2" value="Remover">
                                <input type="button" class="float-right" value="Foto Capa">
                                <hr>
                         </div>`
                $(".div-images").append(images);
            }

            reader.readAsDataURL(input.files[i]);
        }

    }
}

/** VUE JS */
var app = new Vue({
    el: '#app',
    data: {
        pergunta: "",
        pergunta_r: "",
        resposta: "",
        palavras_chave: "",
        resposta_automatica: "",
        arr_respostas: []
    },
    methods: {
        remove_acentos(str) {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        },
        verificar_pergunta() {

            let pergunta = this.remove_acentos(this.pergunta);

            this.resposta = "";
            this.arr_respostas = JSON.parse(localStorage.getItem("respostas"))

            for (i_r = 0; i_r < this.arr_respostas.length; i_r++) {

                let r = this.arr_respostas[i_r];

                for (i = 0; i < r.palavras_chave.length; i++) {
                    let p = r.palavras_chave[i];

                    if (pergunta == p || pergunta.includes(" " + p + " ") || pergunta.includes(" " + p + "?") || pergunta.includes(p + " ")) {
                        this.resposta += r.resposta;
                        this.pergunta_r = this.pergunta;
                        $(".late").hide();
                        $(".respostas").show();
                        break;
                    }
                }
            };

            if (this.resposta == "") {
                $(".late").show();
                this.pergunta_r = ""
                this.resposta = "[Escreva uma resposta para o cliente]";
            }
        },
        adicionar_resposta_automatica() {
            if (this.palavras_chave.trim() == '') return;

            let palavras_chave = this.remove_acentos(this.palavras_chave);
            palavras_chave = palavras_chave.split(' ');

            this.arr_respostas.push({
                palavras_chave: palavras_chave,
                resposta: this.resposta_automatica
            });

            localStorage.setItem("respostas", JSON.stringify(this.arr_respostas))

            this.palavras_chave = "";
            this.resposta_automatica = ""

        }
    }
})