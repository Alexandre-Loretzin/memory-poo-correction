class Game {
    constructor(){
        this.cards = [
            {
                'name': 'bone',
                'icon': 'fa-bone',
            },
            {
                'name': 'gamepad',
                'icon': 'fa-gamepad',
            },
            {
                'name': 'brain',
                'icon': 'fa-brain',
            },
            {
                'name': 'poo',
                'icon': 'fa-poo',
            },
            {
                'name': 'cannabis',
                'icon': 'fa-cannabis',
            },
            {
                'name': 'cat',
                'icon': 'fa-cat',
            },
            {
                'name': 'beer',
                'icon': 'fa-beer',
            },
            {
                'name': 'carrot',
                'icon': 'fa-carrot',
            },
        ];
        this.deck = document.querySelector('#game')
        this.firstChoice = ""
        this.secondChoice = ""
        this.count = 0
        this.matchedCards = 0
        this.previousTarget = null
        this.nbMoves = document.querySelector('.nbMoves')
        this.moveCounts = 0 
        this.maxMoves = document.querySelector('.maxMoves')
        this.maxMovesNumber = 2*(2*(this.cards.length))
        this.setGrid()
    }
    
    setGrid(){
        
        this.grid = document.createElement('section');
        this.grid.setAttribute('class', 'grid');
        this.deck.appendChild(this.grid);
        this.maxMoves.innerHTML = this.maxMovesNumber

        this.cardsGame = this.cards.concat(this.cards).sort(() => 0.5 - Math.random());
        this.createCards();
    }
    createCards(){
        this.cardsGame.forEach(item =>{
            let card = document.createElement('div');
            card.classList.add('card');
 
            card.dataset.name = item.name;
            //création de la div .front
            let front = document.createElement('div');
            front.classList.add('front');
            //création de la div .back
            let back = document.createElement('div');
            back.classList.add('back');
           
            //Création de l'icone dans la div puis ajout de la class appropriée
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fas');
            //Ajout de l'icone à la card et ajout de la class _visuelle_
            icon.classList.add(item.icon);
 
            this.grid.appendChild(card);
            card.appendChild(front);
            card.appendChild(back);
            back.appendChild(icon);
        })
    }

    unmatch() {
        //récupération des class 'selected'
        this.selected = document.querySelectorAll('.selected');
        //Ajout de la class 'unmatch' à chacunes d'elles
        this.selected.forEach(card => {
            card.classList.add('unmatch');
        });
        this.selected.forEach(card => {
            setTimeout(function(){ 
                card.classList.remove('selected', 'unmatch'); 
            }, 1200);
        });
    }

    match() {
        //récupération des class 'selected'
        this.selected = document.querySelectorAll('.selected');
        //Ajout de la class 'unmatch' à chacunes d'elles
        this.selected.forEach(card => {
            card.classList.replace('selected','match');
        });

        this.checkWin()
    }

    checkWin(){
        this.matchedCards ++

        if(this.matchedCards === this.cards.length){
            alert("win !")
        }
    }

    resetChoice(){
         //reset des variables
         this.count = 0;
         this.firstChoice = '';
         this.secondChoice = '';
         this.moveCounts++
         this.nbMoves.innerHTML = this.moveCounts
         if(this.moveCounts == this.maxMovesNumber){
            alert('Nombre de coups maximum atteints!')
            location.reload()
         }
         

        //  this.previousTarget = null

    }
    start(){
        this.grid.addEventListener('click', (event) => {
            let clicked = event.target

            if(clicked.nodeName === "section" || clicked === this.previousTarget){
                return
            }

            this.count ++
            if(this.count === 1){
                clicked.parentNode.classList.add('selected')
                this.firstChoice = clicked.parentNode.dataset.name
                this.previousTarget = clicked
            }else{
                clicked.parentNode.classList.add('selected')
                this.secondChoice = clicked.parentNode.dataset.name
            }

            if(this.count == 2){
                if(this.firstChoice === this.secondChoice){
                    this.match()
                    this.resetChoice()
                }else{
                    this.unmatch()
                    this.resetChoice()
                }
            }
        })
    }
}

let game = new Game()

game.start()
