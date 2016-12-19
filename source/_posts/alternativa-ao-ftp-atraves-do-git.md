title: Alternativa ao FTP atravez do Git @ KiandaHUB
datapost: 14/11/2015
limit: 200
shortdescription: Recentemente me deparei com uma situação enquanto fazia o upload do site do KiandaHUB no servidor (shared host). Tal situação é talvez o maior dilema para qualquer um que usa o protocolo FTP para fazer deployments, seja de um site ou aplicação web.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 2
---

Recentemente me deparei com uma situação enquanto fazia o upload do site do [KiandaHUB](http://www.kiandahub.com) no servidor (shared hosting). Tal situação é talvez o maior dilema para qualquer um que usa o protocolo FTP para fazer deployments, seja de um site ou aplicação web.

No meu caso era um site desenvolvido por cima do [Wordpress](http://wordpress.org), com cerca de 58MB. O servidor era um shared hosing, bem mais limitado em termos de em comparação a um VPS e sem falar que ele apenas suportava o FTP pra transferências de ficheiros.

Com o FileZilla, levei mais de uma hora a transferir os 58MB divididos em inúmeros ficheiros, maior parte vindos do core do Wordpress. Tamanha demora deveu-se também por causa do funcionamento do protocolo FTP em si, visto que o cliente FTP é obrigado a fazer um login toda vez que uma operação for necessita de ser realizada no servicor, tais como transferências e manipulação de ficheiros. E também por causa dos meus 512kbps de upload ([TVCABO](http://www.tvcabo.co.ao)).

<em> Só mais tarde fui descrobrir que para o primeiro upload eu poderia comprimir o site todo em .zip, fazer o upload de um único ficheiro e depois descomprimi-lo no servidor. :p</em>

## A frustração 😡

Os primeiros testes com o site do KiandaHUB no ar foram realmente frustrantes pela demora no deployment, por ter que seleccionar manualmente os ficheiros modificados para actualizar o site no ar. Se estivesse num VPS seria diferente porque teria a liberdade de fazer o deploy usando git, o que iria lidar bem com essa parte dos ficheiros modificados. Mas o que tinha em mão era apenas um servidor partilhado.

## A luz 🙏: O Git

![Bitbucket](/img/posts/git-bitbucket.jpg)

Durante o desenvolvimento do site, nós usamos o [Bitbucket](http://bitbucket.org) para versionamento de código e desenvolvimento colaborativo. Todo o código fonte já estava no Bitbucket, então pus-me a pensar numa estratégia que usei para fazer o deployment do webservice do app Ogirabola: Eu também tinha o código fonte no Bitbucket então instalei o Git no VPS e fazia o pull de modificações que estavam no Bitbucket, ou seja, nunca transferia nada sem passar pelo Bitbucket. Isso me proporcionava maior velocidade na transferência de ficheiros para o servidor, visto que o meu VPS com a sua conexão de Internet super veloz fazia o pull nos servidores do Bitbucket que também têm uma conexão super veloz 🙌, logo grandes quantidade de ficheiros poderiam ser transferidos em segundos.

## FTPloy e a minha estratégia de deployment

![Bitbucket](/img/posts/ftploy.jpg)

Com a ideia de transferir ficheiros directo do Bitbucket, eu procurei no Google por um serviço que transferisse ficheiros de um repositório git para um servidor usando FTP. Surgiram alguns na qual já não me lembro. Mas acabei por usar o [FTPloy](https://ftploy.com). De forma rápida: Ele cópia todos os ficheiros do branch pretendido para um servidor usando FTP. Ele é gratuito mas há uma limitação de um projecto apenas, para estender é necessário desembolsar alguns dólares 💵.

<em>Ele tinha a melhor proposta: fazer o trabalho de escravo.</em>

Realizei alguns testes e o serviço cumpria com o que prometia. Entretanto havia um pequeno problema, a cada push no branch master, ele transferia tudo para o servidor do site. O que não era o pretendido, visto que nem tudo que ia pra Bitbucket estava pronto para a produção.

A solução para este problema foi implementada através da adição de mais um branch no repositório. Este branch, <i>development</i>, seria usado para enquanto desenvolviamos o site e o branch <i>master</i> somente para deployment. Em termos de workflow funcionaria da seguinte forma:

A medida em que desenvolvíamos, fazíamos somente push no branch <i>development</i> e tão logo o código fosse testado e aprovado, fazíamos o merge no branch <i>master</i> e o FTPloy fazia o trabalho sujo: Verificar novos commits no branch <i>master</i> e copiar somente os novos ficheiros usando FTP até ao servidor do site do KiandaHUB. 🎊 🎉 🙌 🙌

## ...

O FTPloy ajudou-nos com a parte de deployments. Depois de o implementarmos, surgiram novos desáfios relacionados a nossa estratégia de branching e merging o que até certo ponto afectou o desenvolvimento colaborativo, mas sobre isso falarei num outro post. Eu recomendo para você que usa FTP para deploy de websites ou aplicações web, e se ainda não tem domínio do Git procure aprender, é uma ferramenta bastante útil. 👋👋👋

<div class="end-quote">Just remember, you can't win the game if you don't even play it — [Robin Sharma](https://www.instagram.com/p/-BcgAFtMXV/?taken-by=robinsharma)</em>