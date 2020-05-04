/** VUE JS */
var app = new Vue({
    el: '#app',
    data: {
        produto:{
            titulo: "iPhone 11 Pro Prata, com Tela de 5,8\", 4G, 64 GB e Câmera de 12 MP",
            descricao: "Assim nasce um Pro. Revolucionário sistema de câmera tripla que amplia possibilidades sem abrir mão da simplicidade. Um salto sem precedentes em duração de bateria. Chip assustadoramente potente que melhora ainda mais o aprendizado de máquina e redefine o que um smartphone pode fazer. Conheça o primeiro iPhone poderoso o suficiente para ser chamado de Pro.",
            imagens: [],
            categoria: "smatphone",
            caracteristicas: [
                {
                    chave: "Marca",
                    valor: "",
                    readonly: true
                }
            ],
            medidas_produto: {
                comprimento: 0,
                largura: 0,
                altura: 0,
                peso: 0
            },
            medidas_pacote: {
                comprimento: 0,
                largura: 0,
                altura: 0,
                peso: 0
            },
            preco: 0,
            respostas_automaticas:[]
        },
        msg_sucesso: false,

        pergunta: "",
        
        palavras_chave: "",
        resposta_automatica: "",

        perguntas: []
    },
    methods: {
        remove_acentos(str) {
            return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        },
        verificar_pergunta() {

            let pergunta = this.remove_acentos(this.pergunta);

            let resposta = "";

            for (i_r = 0; i_r < this.produto.respostas_automaticas.length; i_r++) {

                let r = this.produto.respostas_automaticas[i_r];

                for (i = 0; i < r.palavras_chave.length; i++) {
                    let p = r.palavras_chave[i];

                    if (pergunta == p || pergunta.includes(" " + p + " ") || pergunta.includes(" " + p + "?") || pergunta.includes(p + " ")) {
                        resposta += r.resposta_automatica;
                        break;
                    }
                }
            };

            if (resposta == "") {
                resposta = "[Aguardando resposta do vendedor]";
            }

            this.perguntas.push({
                pergunta: this.pergunta,
                resposta: resposta
            });

            localStorage.setItem("perguntas", JSON.stringify(this.perguntas) );

            this.pergunta = "";

        },
        adicionar_resposta_automatica() {
            if (this.palavras_chave.trim() == '') return;

            let palavras_chave = this.remove_acentos(this.palavras_chave);
            palavras_chave = palavras_chave.split(' ');

            this.produto.respostas_automaticas.push({
                palavras_chave: palavras_chave,
                resposta_automatica: this.resposta_automatica
            });

            this.palavras_chave = "";
            this.resposta_automatica = "";

        },
        remove_resposta_automatica(index){
            this.produto.respostas_automaticas.splice(index, 1);
        },
        salvar(){
            localStorage.setItem("produto", JSON.stringify(this.produto) );

            this.msg_sucesso = true;
        },
        upload_imagem(event){
            var file = event.target.files[0];
            
            new Promise( (s, e) => {
                var reader = new FileReader();
                reader.onload = function(e) {
                    s( e.target.result );
                };
                reader.onerror = function(error) {
                    alert(error);
                };
                reader.readAsDataURL(file);  
            })
            .then(
                (foto) =>{
                    this.produto.imagens.push( foto );
                }
            );
        },
        remover_imagem(index){
            this.produto.imagens.splice(index, 1);
        }
    },
    beforeMount(){
        let ls = localStorage.getItem('produto');
        if( ls  && ls != ""){
            this.produto = JSON.parse(ls);
        }

        let p = localStorage.getItem('perguntas');
        if( p  && p != ""){
            this.perguntas = JSON.parse(p);
        }
    }
})