title: "NVM: Instalação e gestão de multiplas versões do Nodejs"
datapost: 04/12/2015
limit: 201
shortdescription: Há uns dias atrás quis actualizar a versão do Nodejs que estava a instalado na minha maquina, era a versão 0.10.x e eu quis actualizar para a tão aclamada versão 4 do Node, ou Node V4 para os mais achegados.
category: portugues
cover: "/img/posts/nodejs-dark1.jpg"
idd: 3
---

Há uns dias atrás quis actualizar a versão do Nodejs que estava a instalado na minha maquina, era a versão 0.10.x e eu quis actualizar para a tão aclamada versão 4 do Node, ou Node V4 para os mais achegados.

Eu uso Ubuntu, e tal como em todas as distribuições Linux, as ferramentas de desenvolvimento são instaladas via terminal. Fiz uma rápida pesquisa para perceber como poderia actualizar o Nodejs para a última versão estável (v4 na altura) sem ter que fazer o download de um arquivo .tar.gz e a solução mais confiável foi provida atravez de uma tal de [NVM](http://nvm.sh).

## NVM e sua necessidade no ambiente de desenvolvimento

NVM ou Node Version Manager é um gestor de versões do Nodejs. Com gestão quer dizer que é possível instalar, actualizar, remover e manter versões diferentes do Nodejs na mesma máquina.
Quem vem do ambiente Ruby provavelmente já deve ter associado o NVM ao RVM. Ambos fazem a mesma coisa, um para Nodejs e o outro para o Ruby.

## Instalação do NVM

O Windows não tem suporte (até o momento) ao NVM, entre tanto há alternativas como o:
* [nvmw](https://github.com/hakobera/nvmw)
* [nvm-windows](https://github.com/coreybutler/nvm-windows)

<em>Viva ao momento open source, Yeah 🙌🙌🙌</em>

Pois bem, seja no MAC OS ou no Linux, abra o terminal e digite uma das linhas:

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
    
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
    
E pronto, instalação completa. Basicamente o script acima faz o clone o [repositório do NVM](https://github.com/creationix/nvm) para a directoria ~/.nvm e modifica os ficheiros ~/.bash_profile, ~/.zshrc ou ~/.profile dependendo do sistema operativo em que é instalado.

## Como usar?

1 - Instalar o Nodejs. Simples, apenas use o comando abaixo sem esquecer de especificar a versão desejada:

    nvm install 5.0 
    // ou
    nvm install 4.0
    // ou
    nvm install 0.10

Com estes comandos o NVM faz o download, compila e instala a versão requisitada do Nodejs na sua maquina. Para desinstalar basta executar: 

    nvm uninstall 5.0

2 - Visualizar as versões instaladas e usar uma delas:

    // Lista as versões do Nodejs disponíveis na máquina
    nvm ls 
    // Seleciona a versão pretendida 
    nvm use 4.0
    // Mostra a versão em uso
    nvm current

Talvez você tenha se perguntado: Como vou saber quais são as versões disponíveis para download? Eis a resposta:

    nvm ls-remote
    
Será retornado no terminal, uma lista com as versões do Nodejs e io.js disponíveis para o download. 

3 -  Executar um script com uma versão especifica do Node. Fácil:

nvm run 0.10 exemplo.js

Vai executar o ficheiro exemplo.js usando o Nodejs 0.10. Esta funcionalidade é bastante útil para rapidamente testar se um determinado script ou projectos irá funcionar ou não numa versão diferente daquela que havia sido no acto do desenvolvimento.

4 - Especificar a versão do Nodejs num projecto. Fácil:

Crie um ficheiro sem nome, apenas com a extensão .nvmrc na raiz do seu projecto e dentro dele apenas especifique a versão pretendida:

    v4.0
    
Basta executar o seu projecto usando o comando nvm run afim de que o ficheiro .nvmrc possa ser lido e só então seleccionado a versão especificada no ficheiro.

Um exemplo bem prático para você testar se realmente o nvm está a usar a versão desejada é o seguinte: Crie um ficheiro .js dentro do seu projecto e insira a seguinte linha de código:

    console.log("Versão do Nodejs no projecto" + process.version);

De seguida execute-o e será mostrada no terminal a versão em uso pelo projecto.

## Necessidade no ambiente de desenvolvimento

O NVM é uma das ferramentas que ajuda a enriquecer o ambiente de desenvolvimento Nodejs e é de extrema importância visto que o Nodejs é open source e em quase todas as semanas há uma  actualização dele. Então o NVM ter permite manter uma versão estável na sua máquina enquanto testas uma outra versão que se calha ainda não é estável. 

<em>Viva ao momento open source, Yeah 🙌🙌🙌</em>

## Recomendações 👌

O NVM é repleto de funcionalidade úteis, podem ler mais sobre elas no [Github](https://github.com/creationix/nvm) claro.

<div class="end-quote">Disciplining yourself to do what you know is right and important, although difficult, is the high road to pride, self-esteem and personal satisfaction. — [Brian Tracy](https://www.linkedin.com/in/briantracyint) </div>