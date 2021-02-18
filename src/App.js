import './App.css';
import { useState, useEffect } from 'react';
import fondant from '/Users/Emilio/projects/memory-game/src/img/Fondant.png';
import doshuevos from '/Users/Emilio/projects/memory-game/src/img/2 huevos.png';
import cuatrohuevos from '/Users/Emilio/projects/memory-game/src/img/4-huevos.png';
import azucar from '/Users/Emilio/projects/memory-game/src/img/azucar.png';
import harina from '/Users/Emilio/projects/memory-game/src/img/harina.png';
import maizena from '/Users/Emilio/projects/memory-game/src/img/maizena.png';
import mantequilla from '/Users/Emilio/projects/memory-game/src/img/Mantequilla.png';
import nueces from '/Users/Emilio/projects/memory-game/src/img/nueces.png';
import quesocrema from '/Users/Emilio/projects/memory-game/src/img/queso crema.png';
import quesobatido from '/Users/Emilio/projects/memory-game/src/img/Queso-Fresco-Batido.png';
import azucarmoreno from '/Users/Emilio/projects/memory-game/src/img/azucar-moreno.png';
import _ from 'lodash';

function App() {
  const [ingredients, setIngredients] = useState([
    {
      ingredient: '150g. Chocolate Fondant',
      src: fondant,
      id: 0,
      selected: false,
    },
    {
      ingredient: '200g. mantequilla',
      src: mantequilla,
      id: 1,
      selected: false,
    },
    {
      ingredient: '4 Huevos (L)',
      src: cuatrohuevos,
      id: 2,
      selected: false,
    },
    {
      ingredient: '150g. Azúcar Moreno',
      src: azucarmoreno,
      id: 3,
      selected: false,
    },
    {
      ingredient: '70g. Harina',
      src: harina,
      id: 4,
      selected: false,
    },
    {
      ingredient: '50g. Nueces',
      src: nueces,
      id: 5,
      selected: false,
    },
    {
      ingredient: '200g. Queso crema',
      src: quesocrema,
      id: 6,
      selected: false,
    },
    {
      ingredient: '250g. Queso batido',
      src: quesobatido,
      id: 7,
      selected: false,
    },
    {
      ingredient: '2 Huevos (L)',
      src: doshuevos,
      id: 8,
      selected: false,
    },
    {
      ingredient: '30g. Maizena',
      src: maizena,
      id: 9,
      selected: false,
    },
    {
      ingredient: '120g. Azúcar',
      src: azucar,
      id: 10,
      selected: false,
    },
  ]);

  const [shownIngredients, setShownIngredients] = useState([]);

  useEffect(() => {
    let ingredientsToShow = _.sampleSize(ingredients, 3);
    if (ingredients.some((ingredient) => ingredient.selected === false)) {
      while (
        ingredientsToShow.every((ingredient) => ingredient.selected === true)
      ) {
        ingredientsToShow = _.sampleSize(ingredients, 3);
      }
    } else if (
      ingredients.every((ingredient) => ingredient.selected === true)
    ) {
      winLogic(true);
      return;
    }
    setShownIngredients(ingredientsToShow);
  }, [ingredients]);

  const changeIngredientStatus = (e) => {
    addScore();
    ingredients.map((ingredient, index) => {
      if (e.target.alt === ingredient.ingredient) {
        if (ingredient.selected === true) {
          winLogic(false);
          return null;
        }
        const changedIngredients = [...ingredients];
        changedIngredients[index].selected = true;
        setIngredients(changedIngredients);
      }
      return ingredients;
    });
  };

  const [scoreBoard, setScoreBoard] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const addScore = () => {
    setScoreBoard(scoreBoard + 1);
  };

  const highScoreLogic = () => {
    setHighScore(() => (scoreBoard > highScore ? scoreBoard : highScore));
  };

  const gameOver = () => {
    let changedIngredients = [...ingredients];
    changedIngredients.map((ingredient) => {
      ingredient.selected = false;
    });
    setIngredients(changedIngredients);
  };

  const [winStatus, setWinStatus] = useState('');

  const winLogic = (win) => {
    if (win) {
      setWinStatus('🎉 Yeah! Brownie Chessecake for dessert! 🎉');
      highScoreLogic();
      setScoreBoard(0);
      gameOver();
    } else if (win === false) {
      setWinStatus(`😫 It's a total mess. No cake for you 🤢`);
      highScoreLogic();
      setScoreBoard(0);
      gameOver();
    }
  };

  return (
    <div className='App'>
      <h1 className='title'>The 🤎 Brownie Chessecake 🤍 Memory Game</h1>
      <h3>
        🧠 Remember every ingredient of this <s>stateful</s> tasteful dessert 😋
      </h3>
      <div className='scoreBoard'>
        <h4>Current Score: {scoreBoard}</h4>
        <h4>{winStatus}</h4>
        <h4>High Score: {highScore}</h4>
      </div>
      <div className='ingredient-container'>
        {shownIngredients.map((ingredient) => {
          return (
            <img
              key={ingredient.id}
              src={ingredient.src}
              className='imagen'
              alt={ingredient.ingredient}
              onClick={changeIngredientStatus}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
