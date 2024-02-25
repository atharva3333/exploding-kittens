const Howto = () => {
  return (
    <div>
      <div className="text-center pt-8 bg-green-500">
        {/* <h1 className="text-7xl">Exploding Kittens</h1> */}
        <h1 className="text-4xl mt-4">How to Play?</h1>


<div className="bg-white text-black w-[1200px] text-left mx-auto p-16 my-8 rounded-lg">
        <p className="mt-8 text-2xl">
          This will be an online single-player card game that consists of 4
          different types of cards
        </p>
        <p className="mt-8 text-2xl">
          1. Cat card  😼<br/> 2. Defuse card 🙅‍♂️<br/> 3. Shuffle card 🔀<br/> 4. Exploding kitten
          card 💣
        </p>

        <p className="mt-8 text-2xl">
          There will be a button to start the game. When the game is started
          there will be a deck of 5 cards ordered randomly. Each time user
          clicks on the deck a card is revealed and that card is removed from
          the deck. A player wins the game once he draws all 5 cards from the
          deck and there is no card left to draw.{" "}
        </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-16 mt-8">
          <div className="flex gap-16 flex-row-reverse items-center">
            <p className="w-[600px] text-2xl bg-white text-black p-16 rounded-lg">
              If the card is exploding kitten (bomb) then the player loses the
              game.
            </p>
            <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
              <iframe
                src="https://giphy.com/embed/g2YdApKEna2sg"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex gap-16 flex-row-reverse items-center">
            <p className="w-[600px] text-2xl bg-white text-black p-16 rounded-lg">
              If the card drawn from the deck is a cat card, then the card is
              removed from the deck.
            </p>
            <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
              <iframe
                src="https://giphy.com/embed/TWH3IIPuGyxsOpOZin"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex gap-16 flex-row-reverse items-center">
            <p className="w-[600px] text-2xl bg-white text-black p-16 rounded-lg">
              If the card is a defusing card, then the card is removed from the
              deck. This card can be used to defuse one bomb that may come in
              subsequent cards drawn from the deck.
            </p>
            <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
              <iframe
                src="https://giphy.com/embed/26tk0r2dToPoL43CM"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          <div className="flex gap-16 flex-row-reverse items-center">
            <p className="w-[600px] text-2xl bg-white text-black p-16 rounded-lg">
              If the card is a shuffle card, then the game is restarted and the
              deck is filled with 5 cards again.
            </p>
            <div className="w-[200px] h-[300px] bg-gray-200 border-2 border-white flex justify-center items-center text-xl font-bold relative">
              <iframe
                src="https://giphy.com/embed/iCnOabgikYFKK7zRSq"
                width="100%"
                height="100%"
                frameBorder="0"
                className="absolute inset-0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Howto;
