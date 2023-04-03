import React, { useEffect, useState } from "react";
import { ErrorMessage, InputBox, Loader } from "../ui";

import OptionIdentifier from "./OptionIdentifier";
import useQuizManage from "../../hooks/useQuizManage";

export default function AddQuizModal({
  modalTitle,
  setIsOpen,
  isEditing,
  tableData = {},
}) {
  const [question, setQuestion] = useState(tableData?.question || "");
  const [video_id, setVideo_id] = useState(tableData?.video_id || "");
  const [video_title, setVideo_title] = useState(tableData?.video_title || "");
  const [option1, setOption1] = useState(tableData?.options[0]?.option || "");
  const [option2, setOption2] = useState(tableData?.options[1]?.option || "");
  const [option3, setOPtion3] = useState(tableData?.options[2]?.option || "");
  const [option4, setOPtion4] = useState(tableData?.options[3]?.option || "");
  const [option1IsCorrect, setOPtion1IsCorrect] = useState(
    tableData?.options[0]?.isCorrect || false
  );
  const [option2IsCorrect, setOPtion2IsCorrect] = useState(
    tableData?.options[1]?.isCorrect || false
  );
  const [option3IsCorrect, setOPtion3IsCorrect] = useState(
    tableData?.options[2]?.isCorrect || false
  );
  const [option4IsCorrect, setOPtion4IsCorrect] = useState(
    tableData?.options[3]?.isCorrect || false
  );
  const { addQuizzes, editQuiz, quizIsLoading, quizIsError, quizIsSuccess } =
    useQuizManage();

  const resetForm = () => {
    setQuestion("");
    setVideo_id("");
    setVideo_title("");
    setOption1("");
    setOption2("");
    setOPtion3("");
    setOPtion4("");
    setOPtion1IsCorrect(false);
    setOPtion2IsCorrect(false);
    setOPtion3IsCorrect(false);
    setOPtion4IsCorrect(false);
  };

  const handleSubmitQuiz = (event) => {
    event.preventDefault();
    const data = {
      question,
      video_id: video_id * 1,
      video_title,
      option1,
      option1IsCorrect,
      option2,
      option2IsCorrect,
      option3,
      option3IsCorrect,
      option4,
      option4IsCorrect,
    };
    isEditing ? editQuiz({ id: tableData?.id, data }) : addQuizzes(data);
  };

  useEffect(() => {
    if (quizIsSuccess) {
      setIsOpen(false);
      resetForm();
    }
  }, [quizIsSuccess]);

  return (
    <form
      onSubmit={handleSubmitQuiz}
      className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
    >
      <div className="w-4/5 lg:w-4/5 xl:w-1/3 bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">{modalTitle}</h1>
        <div className="w-full">
          <InputBox
            required={true}
            title="Enter question"
            value={question}
            setValue={setQuestion}
          />
          <InputBox
            required={true}
            title="Enter video id"
            value={video_id}
            setValue={setVideo_id}
          />
          <InputBox
            required={true}
            title="Enter video title"
            value={video_title}
            setValue={setVideo_title}
          />
          <div className="flex gap-5">
            <div>
              <InputBox
                required={true}
                title="Enter option 1"
                value={option1}
                setValue={setOption1}
              />
              <OptionIdentifier
                option={option1IsCorrect}
                setOption={setOPtion1IsCorrect}
              />
            </div>
            <div>
              <InputBox
                required={true}
                title="Enter option 2"
                value={option2}
                setValue={setOption2}
              />
              <OptionIdentifier
                option={option2IsCorrect}
                setOption={setOPtion2IsCorrect}
              />
            </div>
            <div>
              <InputBox
                required={true}
                title="Enter option 3"
                value={option3}
                setValue={setOPtion3}
              />{" "}
              <OptionIdentifier
                option={option3IsCorrect}
                setOption={setOPtion3IsCorrect}
              />
            </div>

            <div>
              <InputBox
                required={true}
                title="Enter option 4"
                value={option4}
                setValue={setOPtion4}
              />{" "}
              <OptionIdentifier
                option={option4IsCorrect}
                setOption={setOPtion4IsCorrect}
              />
            </div>
          </div>
        </div>
        {!quizIsLoading && quizIsError && (
          <ErrorMessage
            message={
              isEditing ? "Failed to update quiz!" : "Failed to add quiz!"
            }
          />
        )}
        <div className="flex justify-evenly items-center">
          <button
            className="bg-red-500 px-4 py-2 rounded-md text-md text-white"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-cyan-400 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
            disabled={false}
          >
            {quizIsLoading ? <Loader /> : isEditing ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
