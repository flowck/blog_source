title: "Menu fixo animado com CSS e Javascript"
datapost: 25/07/2016
limit: 270
shortdescription: No acto de desenvolvimento de uma aplicação em algum momento, dependendo do escopo do projecto, poderá ser necessário interagir com uma REST API.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 6
---

Trabalho bastante com css quando estou a fazer a parte front-end de sites ou aplicações web, entretanto nunca escrevi nada sobre. Hoje venho apresentar uma técnica muito famosa em sites "single page". O menu fixo e animado quando feito o scroll para baixo. Podem ver como implementei esta técnica nos seguintes sites: [TEDxLuanda](http://tedxluanda.com/), [KiandaHUB](http://kiandahub.com/).

## Menu fixo

A técnica do menu fixo no topo da página é bastante usada em sites que possuem diversas secções em uma só página que acabam por "estender/esticar/fazer crescer" a barra de rolagem do navegador. Então para facilitar o processo de navegação, o menu/cabeçalho é definido como fixo no topo da página e os links são referênciados para secções da página. UX meus caros!

Neste artigo vou demonstrar como aplicar os estilos css para posicionar o cabeçalho no topo da página e deixar ele fixo enquanto é feito o scroll na página. Podem ver o [demo](https://jsfiddle.net/Lvjrc91r/) para terem uma ideia mais concreta.

## O HTML

O cabeçaho terá o logotipo alinhado a esquerda e o menu a direita, dentro de uma div que está centralizada.
![cabeçalho](/img/posts/cabecalho.png)

    <header class="cabecalho">
      <div class="centro">
        <!-- Logotipo - Esquerda -->
        <div class="logotipo">
          <img src="http://www.menosfios.com/wp-content/uploads/2014/12/logo-retina.png" alt="MenosFios">
        </div>
      
        <!-- Menu - Direita -->
        <nav class="menu">
          <ul>
            <li><a href="#inicio">INICIO</a></li>
            <li><a href="#jogos">JOGOS</a></li>
            <li><a href="#angola">ANGOLA</a></li>
            <li><a href="#apps">APPS</a></li>
            <li><a href="#sobre">SOBRE</a></li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Conteúdo -->
    <section class="capa"></section>

    <section>
      <div class="centro">
        <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi sapiente distinctio id ipsam soluta 
        similique nesciunt inventore error aliquam atque! Fugit, aspernatur unde voluptatibus quo sequi aliquam vero 
        totam consequatur.
        Lorem ipsum dolor
        ... MAIS LOREM IPSUM ;)
        </p>
      </div>
    </section>
