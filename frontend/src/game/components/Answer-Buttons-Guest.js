import React, { useState, useEffect, useRef } from 'react';

const AnswerButtons = (props) => {
  const [outcome, showOutcome] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [mixedAnswers, setMixedAnswers] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(props.randAnswers[0]);
  const selected = React.createRef();
  const ansIsSet = useRef(false);
  const total = useRef(0);
  const score = useRef(0);
  let tempAnswers = [];

  useEffect(() => {
    let tempAnswers = [props.randAnswers[0], props.randAnswers[1], props.randAnswers[2], props.randAnswers[3]];
    setAnswers(tempAnswers);
    showOutcome(false);
    setMixedAnswers([]);
    document.querySelectorAll('button').forEach(button => {
      button.style = 'unset';
    });
  }, [props])

  const MakeMixedAnsArray = () => {
    let mixedUpAnswers = [];
    const arrayOfIndexes = [
      [0, 1, 2, 3],
      [1, 0, 2, 3],
      [1, 2, 0, 3],
      [1, 2, 3, 0]
    ];
    let randomIndex = Math.floor(Math.random() * 4);
    const selectedIndexes = arrayOfIndexes[randomIndex];
    
    for (let i = 0; i < 4; i++) {
      if (answers[selectedIndexes[i]] !== undefined) {
        mixedUpAnswers.push(answers[selectedIndexes[i]]);
      }
    }
    return mixedUpAnswers;
  }

    if (ansIsSet.current === false) {
      console.log('called array scrambler');
      tempAnswers = MakeMixedAnsArray();
    }
    if (tempAnswers.length > 0 && mixedAnswers.length === 0) {
     console.log('set to true');
     setRightAnswer(props.randAnswers[0]);
     ansIsSet.current = true;
     setMixedAnswers(tempAnswers);
    } else if (tempAnswers.length === 0) {
      ansIsSet.current = false;
    }
  

  // onclick show right/wrong answer, prompt for next question
  let possibleAnswers = [];
  const handleClick = (event) => {
    selected.current = event.target;
    if (selected.current.innerHTML === rightAnswer) {
      showOutcome(true);
      selected.current.style.color = "green"; 
      total.current = total.current + 1;
      score.current = score.current + 1;
    } else {
      selected.current.style.color = "red";
      possibleAnswers = event.target.parentNode.childNodes;
      for (let i = 0; i < possibleAnswers.length; i++) {
        if (possibleAnswers[i].innerHTML === rightAnswer) {
          possibleAnswers[i].style.color = "blue";
          break;
        }
      }
      total.current = total.current + 1;
      showOutcome(true);
    }
  }


  return (
      <div className="mega-btn-wrapper">
        <div className="ans-btn-wrapper">
          {console.log('from parent component' + tempAnswers)}
          {console.log(rightAnswer)}
          <div className="keep-score">
            <p className="current-score">Correct <br />{score.current}</p>
            <p className="current-total">Total <br /> {total.current}</p>
          </div>
          <div className="flex-ansbtn">
            <button onClick={handleClick}>
              {mixedAnswers[0] ? mixedAnswers[0] : 'loading...'}
            </button>
            <button onClick={handleClick}>
              {mixedAnswers[1] ? mixedAnswers[1] : 'loading...'}
            </button>
            <button onClick={handleClick}>
              {mixedAnswers[2] ? mixedAnswers[2] : 'loading...'}
            </button>
            <button onClick={handleClick}>
              {mixedAnswers[3] ? mixedAnswers[3] : 'loading...'} 
            </button>
          </div>
        </div>
        <div className="outcome-wrapper">
          { outcome ? <button id="next-question" onClick={props.reload}>next question</button> : null }
        </div>
      </div>
  )
};

export default AnswerButtons;
