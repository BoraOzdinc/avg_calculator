import React from "react";

export default function Avr_Calc() {
  const [avg, setAvg] = React.useState({
    midterm: "",
    quizPercentage: 10,
    quiz: "",
    final: "",
    makeup: "",
    result: "",
    isQuizPercentageDisabled: true,
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setAvg((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function setResult(text) {
    setAvg((prevFormData) => {
      return {
        ...prevFormData,
        result: text,
      };
    });
  }

  const toggleQuizPercentage = (state) => {
    setAvg((prevState) => ({
      ...prevState,
      isQuizPercentageDisabled: state,
    }));
  };

  React.useEffect(
    function calculateResult() {
      let result = "";
      const midtermPercentage = 40 - avg.quizPercentage;
      if (avg.quiz === "" && avg.makeup === "") {
        result = (avg.midterm * 40) / 100 + (avg.final * 60) / 100;
      } else if (avg.quiz === "") {
        result = (avg.midterm * 40) / 100 + (avg.makeup * 60) / 100;
      } else if (avg.makeup === "") {
        result =
          (avg.midterm * midtermPercentage) / 100 +
          (avg.quiz * avg.quizPercentage) / 100 +
          (avg.final * 60) / 100;
      } else {
        result =
          (avg.midterm * midtermPercentage) / 100 +
          (avg.quiz * avg.quizPercentage) / 100 +
          (avg.makeup * 60) / 100;
      }

      setResult("Your average is " + Math.round(result) + " points.");
    },
    [avg]
  );

  React.useEffect(() => {
    if (
      !(
        isNumber(avg.midterm) ||
        isNumber(avg.quiz) ||
        isNumber(avg.final) ||
        isNumber(avg.makeup)
      )
    ) {
      toggleQuizPercentage(true);
      setResult("You have to enter numbers!");
    }

    if (avg.quiz !== "") {
      toggleQuizPercentage(false);
    } else if (avg.quiz === "") {
      toggleQuizPercentage(true);
    }
    console.log(avg);
    if (
      (avg.midterm !== "" && (avg.midterm < 0 || avg.midterm > 100)) ||
      (avg.quiz !== "" && (avg.quiz < 0 || avg.quiz > 100)) ||
      (avg.final !== "" && (avg.final < 0 || avg.final > 100)) ||
      (avg.makeup !== "" && (avg.makeup < 0 || avg.makeup > 100))
    ) {
      setResult("Error: One or more grades is not between 0 and 100.");
    }
  }, [avg]);

  const a = [];
  for (let i = 10; i <= 30; i++) {
    a.push(i);
  }

  return (
    <div className="avg--container">
      <label className="avg--midtermLabel avg--label" htmlFor="midterm">
        Midterm %{avg.quiz === "" ? 40 : 40 - avg.quizPercentage}
      </label>
      <input
        className="avg--input"
        id="midterm"
        type="text"
        name="midterm"
        placeholder="Midterm"
        value={avg.midterm}
        onChange={handleChange}
      />
      <label className="avg--quizPercLabel avg--label" htmlFor="quizPercentage">
        What is the quiz percentage
      </label>
      <br />
      <select
        className="avg--quizPerc"
        id="quizPercentage"
        value={avg.quizPercentage}
        onChange={handleChange}
        name="quizPercentage"
        disabled={avg.isQuizPercentageDisabled}
      >
        {a.map((i) => {
          return <option value={i}>%{i}</option>;
        })}
      </select>
      <label className="avg--quizLabel avg--label" htmlFor="quiz">
        Quiz
      </label>
      <input
        className="avg--input"
        id="quiz"
        type="text"
        name="quiz"
        placeholder="Quiz"
        value={avg.quiz}
        onChange={handleChange}
      />
      <label className="avg--finalLabel avg--label" htmlFor="final">
        Final %60
      </label>
      <input
        className="avg--input"
        id="final"
        type="text"
        name="final"
        placeholder="Final"
        value={avg.final}
        onChange={handleChange}
      />
      <label className="avg--makeupLabel avg--label" htmlFor="makeup">
        Makeup
      </label>
      <input
        className="avg--input"
        id="makeup"
        type="text"
        name="makeup"
        placeholder="Makeup"
        value={avg.makeup}
        onChange={handleChange}
      />
      <label className="avg--result" name="result" value={avg.result}>
        {avg.result}
      </label>
    </div>
  );
}
