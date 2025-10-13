import React from 'react';

interface HowToPlayModalProps {
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in font-pixel"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl h-[80vh] bg-blue-300 pixel-border rounded-lg p-6 md:p-8 text-left flex flex-col mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl md:text-4xl text-white mb-4 text-center" style={{textShadow: '3px 3px 0px #000'}}>
          Como Jogar
        </h2>
        <div className="flex-grow bg-blue-900/50 rounded-lg p-4 overflow-y-auto text-white text-sm md:text-base leading-relaxed" style={{textShadow: '1px 1px 0px #000'}}>
          <p className="mb-4">
            O jogo tem como objetivo ajudar os alunos do 3º e 4º ano a aprender a identificar substantivos, adjetivos e verbos dentro de frases, de forma divertida e interativa. O personagem principal é um sapo, que será controlado pelo jogador durante toda a aventura.
          </p>
          <p className="mb-4">
            Ao abrir o jogo, a primeira tela exibida será a inicial, onde haverá o botão “Iniciar”. Ao clicar nesse botão, aparecerão as opções de escolha entre o 3º ano e o 4º ano. Depois de selecionar o ano, o jogador encontrará 10 níveis diferentes, organizados do mais fácil ao mais difícil. Apesar de ser possível escolher qualquer nível, a recomendação é começar pelos mais simples, para se acostumar melhor com a dinâmica do jogo.
          </p>
          <p className="mb-4">
            Dentro de cada nível, o sapo aparecerá no cenário e, no canto da tela, surgirá uma frase com uma palavra em destaque, escrita em negrito. A missão do jogador é identificar se essa palavra é um substantivo, um adjetivo ou um verbo. Para responder, o sapo deverá ser movido até um dos blocos espalhados pelo local. Cada bloco será marcado com uma letra: “S” para substantivo, “A” para adjetivo e “V” para verbo.
          </p>
          <p className="mb-4">
            O sapo será controlado pelas setas do teclado: para cima, para baixo, para a esquerda e para a direita. Porém, o desafio não é tão simples, pois o jogador terá apenas um minuto para completar a fase. O tempo ficará visível no canto da tela e, caso chegue ao fim, o nível será reiniciado. Além disso, mesmo depois de encontrar o bloco correto, será necessário coletar a chave que aparece no cenário e abrir a porta para passar para a próxima fase.
          </p>
          <p className="mb-4">
            Durante o percurso, o jogador também enfrentará obstáculos e inimigos. Se o sapo encostar em um deles, a fase recomeça. Nos níveis mais avançados, a dificuldade aumenta: os inimigos ficam mais rápidos e o tempo disponível se torna ainda mais apertado.
          </p>
          <p className="mb-4">
            Cada fase concluída desbloqueia a seguinte.
          </p>
          <p>
            Para aproveitar melhor o jogo, é recomendável começar pelos níveis fáceis, prestar atenção na palavra em destaque antes de se mover e planejar bem os movimentos, equilibrando rapidez e cuidado. Caso o jogador perca, basta tentar novamente, pois os níveis podem ser jogados quantas vezes forem necessários.
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-red-500 text-white pixel-border rounded-md transform hover:-translate-y-1 transition-transform self-center"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default HowToPlayModal;
