import { useEffect, useState } from "react";

export default function Surveys() {
  const [surveys, setSurveys] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("active");
  const [editingId, setEditingId] = useState(null);

  // Questions states
  const [selectedSurvey, setSelectedSurvey] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");


  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState({});

  const fetchSurveys = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/projects/surveys`
    );

    const data = await response.json();
    setSurveys(data);
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const createSurvey = async () => {
    if (editingId) {
      await fetch(
        `http://127.0.0.1:62868/projects/surveys/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            status,
          }),
        }
      );

      setEditingId(null);
    } else {
      await fetch(
        `${import.meta.env.VITE_API_URL}/projects/surveys`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            status,
          }),
        }
      );
    }

    setName("");
    setStatus("active");

    fetchSurveys();
  };

  const editSurvey = (survey) => {
    setEditingId(survey.id);
    setName(survey.name);
    setStatus(survey.status);
  };

  const deleteSurvey = async (id) => {
    await fetch(
      `http://127.0.0.1:62868/projects/surveys/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchSurveys();
  };

  const fetchQuestions = async (survey) => {
  setSelectedSurvey(survey);

  const response = await fetch(
    `http://127.0.0.1:62868/projects/questions/${survey.id}`
  );

  const data = await response.json();

  setQuestions(data);

  const optionsData = {};

  for (const question of data) {
    const optionsResponse = await fetch(
      `http://127.0.0.1:62868/projects/options/${question.id}`
    );

    optionsData[question.id] =
      await optionsResponse.json();
  }

  setOptions(optionsData);
};

  const createQuestion = async () => {
  try {
    const questionResponse = await fetch(
      `http://127.0.0.1:62868/projects/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          survey_id: selectedSurvey.id,
          text: questionText,
        }),
      }
    );

    const question = await questionResponse.json();

    const options = [option1, option2, option3, option4];

    for (const option of options) {
      if (option.trim() !== "") {
        await fetch(
          `http://127.0.0.1:62868/projects/options`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              question_id: question.id,
              text: option,
            }),
          }
        );
      }
    }

    setQuestionText("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");

    alert("Question added successfully!");
  } catch (error) {
    console.error(error);
    alert("Error creating question");
  }
};

return (
  <div style={{ padding: "30px" }}>
    <h1>Surveys</h1>

    {/* Create Form */}
    <div
      style={{
        width: "350px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <input
        placeholder="Survey Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: "#1e1e2f",
          color: "white",
        }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: "#1e1e2f",
          color: "white",
        }}
      >
        <option value="active">Active</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>

      <button
        onClick={createSurvey}
        style={{
          background: "#ff4d4f",
          color: "white",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {editingId
          ? "UPDATE SURVEY"
          : "CREATE SURVEY"}
      </button>
    </div>

    {/* Survey Cards */}
    <div style={{ marginTop: "30px" }}>
      {surveys.map((survey) => (
        <div
          key={survey.id}
          style={{
            border: "1px solid #ff4d4f",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "20px",
            background: "#1e1e2f",
          }}
        >
          <h2>{survey.name}</h2>

          <p>
            Status: <b>{survey.status}</b>
          </p>

          <button
            onClick={() => editSurvey(survey)}
            style={{
              background: "#faad14",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            EDIT
          </button>

          <button
            onClick={() => fetchQuestions(survey)}
            style={{
              background: "#1677ff",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            QUESTIONS
          </button>

          <button
            onClick={() => deleteSurvey(survey.id)}
            style={{
              background: "#ff4d4f",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            DELETE
          </button>
        </div>
      ))}
    </div>

    {/* Questions Section */}
    {selectedSurvey && (
      <div
        style={{
          marginTop: "40px",
          border: "1px solid #1677ff",
          borderRadius: "12px",
          padding: "20px",
          background: "#1e1e2f",
        }}
      >
        <h2>
          Questions for: {selectedSurvey.name}
        </h2>

        {questions.map((question) => (
  <div
    key={question.id}
    style={{
      marginBottom: "20px",
      padding: "15px",
      border: "1px solid #333",
      borderRadius: "8px",
      background: "#2a2a3d",
    }}
  >
    <h3>{question.text}</h3>

    {options[question.id]?.map((option) => (
      <div
        key={option.id}
        style={{
          marginTop: "5px",
          color: "#ddd",
        }}
      >
        ○ {option.text}
      </div>
    ))}
  </div>
))}

        <input
          placeholder="Question text"
          value={questionText}
          onChange={(e) =>
            setQuestionText(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "10px",
          }}
        />

        <input
          placeholder="Option 1"
          value={option1}
          onChange={(e) =>
            setOption1(e.target.value)
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="Option 2"
          value={option2}
          onChange={(e) =>
            setOption2(e.target.value)
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="Option 3"
          value={option3}
          onChange={(e) =>
            setOption3(e.target.value)
          }
          style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
        />

        <input
          placeholder="Option 4"
          value={option4}
          onChange={(e) =>
            setOption4(e.target.value)
          }
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
        />

        <button
          onClick={createQuestion}
          style={{
            background: "#1677ff",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          ADD QUESTION
        </button>
      </div>
    )}
  </div>
);
}