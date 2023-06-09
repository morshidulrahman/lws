import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { authSelector } from "../../features/auth/authSlice";
import { ErrorMessage, Loader } from "../ui";
import { usePostAssignmentMarkMutation } from "../../features/assignment/assignmentApi";
import useQuizAndAssignment from "../../hooks/useQuizAndAssignment";

export default function AssignmentModal({ setIsOpen }) {
  const { user } = useSelector(authSelector);
  const { assignment } = useQuizAndAssignment();

  const [postAssignmentMark, { isLoading, isError, isSuccess }] =
    usePostAssignmentMarkMutation();

  const [repositoryLink, setRepositoryLink] = useState("");

  const handleSubmitAssignment = (event) => {
    event.preventDefault();

    if (assignment?.length > 0 && assignment[0]?.video_id) {
      postAssignmentMark({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: assignment[0]?.video_id,
        title: assignment[0]?.title,
        totalMark: assignment[0]?.totalMark,
        repo_link: repositoryLink,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);

  return (
    <form
      action=""
      className="flex justify-center items-center absolute top-0 right-0 bottom-0 left-0"
      onSubmit={handleSubmitAssignment}
    >
      <div className="w-4/5 lg:w-4/5 xl:w-1/3 bg-gray-800 px-16 py-14 rounded-md">
        <h1 className="text-xl mb-4 font-bold text-slate-100">
          Submit your assignment
        </h1>
        <h1 className="text-lg mb-4 font-semibold text-slate-100">
          Assignment:{" "}
          {isLoading ? (
            <Loader />
          ) : (
            assignment?.length > 0 &&
            assignment[0]?.video_id &&
            assignment[0]?.title
          )}
        </h1>

        <div className="w-full">
          <div className="mb-4">
            <label
              className="block text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Github repository link
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              required
              value={repositoryLink}
              onChange={(e) => setRepositoryLink(e.target.value)}
            />
          </div>
        </div>

        {!isLoading && isError && (
          <ErrorMessage message="Failed to submit assignment!" />
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
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : "Submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
