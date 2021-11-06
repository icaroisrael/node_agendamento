const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars')
const session = require('express-session')
const Usuario = require('./model/usuario');
const Equipamento = require('./model/equipamento')
const { json } = require('body-parser');
const port = process.env.PORT || 3000

app.use(session({secret:'kfjfjfjblwjkjrl'}))
app.use(express.static('public'));
app.engine("handlebars", handlebars({
        defaultLayout: "main",
        runtimeOptions: {allowProtoPropertiesByDefault: true,
                  allowProtoMethodsByDefault: true,},})
);
    
//app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret:'a8d8asd8ga8sd8ga8dnasua'}))

app.get('/', (req, res) =>{
    res.render('login')
})

app.get('/cadastro', (req, res) => {
    res.render('cadastro')
});

app.post('/home', (req, res) =>{
    Usuario.findAll({
        where:{
            cpf:req.body.cpf,
            senha: req.body.senha
        }
    }).then((data) => {
        const cpf = data[0].get('cpf')
        const nome = data[0].get('nome')
        const permissao = data[0].get('permissao')
        req.session.nome = nome;
        if(permissao == 0){           
            res.render('homeUsuario', {dados:data})
        }else{
            req.session.permissao = permissao;
            res.render('homeAdm', {dados:data})
        }
                    
    }).catch(()=>{
        res.render('login', {menssagemErro:true})
    })  
});

app.post('/cadastro', (req, res) =>{
    Usuario.create({
        cpf:req.body.cpf,
        nome:req.body.nome,
        sobreNome:req.body.sobreNome,
        email: req.body.email,
        senha:req.body.senha
    }).then(()=>{
        res.redirect('/usuarios')
    }).catch((error) =>{
        res.send("Erro ao cadastrar" + error)
    })    
})


app.get('/usuarios', (req,res) =>{
    if(req.session.permissao == 1){
        Usuario.findAll().then(function(usuarios){       
            res.render('usuario', {usuarios:usuarios})        
        });
    }else{
        res.redirect('/')
    }    
})

//EQUIPAMENTOS
app.get('/equipamentos', (req,res) =>{
    if(req.session.permissao == 1){
        Equipamento.findAll().then(function(equipamento){       
            res.render('equipamento', {equipamentos:equipamento})        
        });
    }else{
        res.redirect('/')
    }    
})
app.post('/cadEquipamento', (req, res) =>{
    Equipamento.create({
        descricao:req.body.descricao,        
    }).then(()=>{
        res.redirect('/equipamentos')
    }).catch((error) =>{
        res.send("Erro ao cadastrar" + error)
    })    
})

app.listen(port, () => {
    console.log("Servidor rodando");
})