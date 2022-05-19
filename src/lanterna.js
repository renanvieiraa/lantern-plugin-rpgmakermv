//=============================================================================
// lanterna.js
//=============================================================================

/*:
 * @plugindesc Plugin de Lanterna
 * @author Renan Vieira
 *
 * @param tipo de lanterna
 * @desc tipo de lanterna, 1 = tocha, 2 = lanterna, 3 = lanterna com luz envolta
 * @default 3
 *
 *
 *
 * @help Obrigado por utilizar o plugin, não esqueça de sempre por os créditos
 * quando for compartilhar :)
 *
 */


(function() {
    
    var parametros = PluginManager.parameters('lanterna');
    
    //AO INICIAR O MAPA//
    var iniciar_mapa = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function(){
        iniciar_mapa.call(this);
    };
    
    //CRIA OBJETOS NO DISPLAY//
    var criar_objetos = Scene_Map.prototype.createDisplayObjects;
    Scene_Map.prototype.createDisplayObjects = function(){
        //CHAMANDO OS VALORES JÁ HERDADOS DA CLASSE
        criar_objetos.call(this);
        
        //CARREGA A IMAGEM//
        if(parametros['tipo de lanterna'] == 3){
            this.imagem_l = [];
            this.imagem_l[2] = ImageManager.loadPicture('lanterna_22');
            this.imagem_l[4] = ImageManager.loadPicture('lanterna_44');
            this.imagem_l[6] = ImageManager.loadPicture('lanterna_66');
            this.imagem_l[8] = ImageManager.loadPicture('lanterna_88');
        }else if(parametros['tipo de lanterna'] == 2){
            this.imagem_l = [];
            this.imagem_l[2] = ImageManager.loadPicture('lanterna_2');
            this.imagem_l[4] = ImageManager.loadPicture('lanterna_4');
            this.imagem_l[6] = ImageManager.loadPicture('lanterna_6');
            this.imagem_l[8] = ImageManager.loadPicture('lanterna_8');
        }else{
            this.imagem_l = ImageManager.loadPicture('2');
        };
        
        
        //BITMAP DA IMAGEM PRETA COM O BLEND//
        this.imagem = new Bitmap(Graphics.boxWidth, Graphics.boxHeight);
        //SPRITE PARA MOSTRAR O BITMAP ACIMA//
        this.render = new Sprite(this.imagem);
        this.render.opacity = 250;
        
        //ADICIONA O SPRITE NA TELA//
        this.addChild(this.render);
    };
    
    
    
    //AO ATUALIZAR O MAPA//
    var atualizar = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function(){
        atualizar.call(this);
        
        this.imagem.clear();
        this.imagem.fillAll('black');       
        
        //AONDE MOSTRA AS IMAGENS DEPENDENDO DA POSIÇÃO//
        if(parametros['tipo de lanterna'] == 2){
            switch($gamePlayer.direction()){
                case 2:
                    this.imagem.blt(this.imagem_l[2],0,0,300,300,$gamePlayer.screenX() - 150 ,$gamePlayer.screenY() - 60);
                    break;
                case 4:
                    this.imagem.blt(this.imagem_l[4],0,0,300,300,$gamePlayer.screenX() -260 ,$gamePlayer.screenY() - 160);
                    break;
                case 6:
                    this.imagem.blt(this.imagem_l[6],0,0,300,300,$gamePlayer.screenX() - 40,$gamePlayer.screenY() - 160);
                    break;
                case 8:
                    this.imagem.blt(this.imagem_l[8],0,0,300,300,$gamePlayer.screenX() - 150,$gamePlayer.screenY() - 300);
                    break;
            };
        }else if(parametros['tipo de lanterna'] == 3){
            switch($gamePlayer.direction()){
                case 2:
                    this.imagem.blt(this.imagem_l[2],0,0,300,300,$gamePlayer.screenX() - 150 ,$gamePlayer.screenY() - 70);
                    break;
                case 4:
                    this.imagem.blt(this.imagem_l[4],0,0,300,300,$gamePlayer.screenX() -260 ,$gamePlayer.screenY() - 170);
                    break;
                case 6:
                    this.imagem.blt(this.imagem_l[6],0,0,300,300,$gamePlayer.screenX() - 40,$gamePlayer.screenY() - 170);
                    break;
                case 8:
                    this.imagem.blt(this.imagem_l[8],0,0,300,300,$gamePlayer.screenX() - 150,$gamePlayer.screenY() - 280);
                    break;
            };
        }else{
            this.imagem.blt(this.imagem_l,0,0,300,300,$gamePlayer.screenX() - 150,$gamePlayer.screenY() - 150);
        };
        
        //TIPO DE BLEND UTILIZADO PARA APLICAR A TRANSPARÊNCIA NO BRANCO//
        this.render.blendMode = 2;

        //evitar bugs//
        this.render.update();
        
        
        
    };
  
})();
