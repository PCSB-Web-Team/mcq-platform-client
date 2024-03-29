import { HourglassOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Col, Row } from "antd";
import {Button } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { startLoading, stopLoading } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../../Components/QuestionCard";
import Countdown from "../../Components/Countdown";
import { Requests } from "../../utils";

const Solve = (props) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currquestion, setCurrquestion] = useState(0);
  const [contestDetails, setContestDetails] = useState({});

  async function  fetchQuestions () {
    props.registeredEvents?.forEach((element) => {
      if (element.contestId === id) {
        setQuestions(element.questions);
      }
    });
  }

  const navigate = useNavigate();

  function handleSubmit() {
    const isConfirmed = window.confirm('Are you sure you want to submit the test?');
    if (isConfirmed) {
      // If user confirms, proceed with submitting the test
   
    Requests.submitTest({ contestId: id, userId: props.userData._id })
      .then((res) => {
        res = res.data;
        if (res.success) {
          navigate("/");
          window.location.reload();
        } else alert(res.error);
      })
      .catch((err) => {
        alert("err: " + err);
        console.log(err);
      });
     
    }
  }

  useEffect(() => {
    props.startLoading("Loading your questions");
    Requests.getContestById(id)
      .then(({ data: { success, data, error } }) => {
        if (success) {
          setContestDetails(data);
          if (data?.status?.description !== "RUNNING") navigate("/");
        }
      })
      .catch((err) => {});
      // 
    fetchQuestions().then(() =>{
      // to stop loading. 
      props.stopLoading();
    });
    props.stopLoading();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.registeredEvents]);

  function QuestionPallete() {
    return (
      <div className="grid grid-cols-5 gap-2">
        {questions?.map((ele, index) => {
          return (
            <Button
              onClick={() => setCurrquestion(index)}
              className={`rounded-full hover:bg-yellow-50 hover:border-gray-100 hover:text-black
                
                // current question
                ${
                  currquestion === index
                    ? " bg-yellow-500 "
                    : // solved
                    ele.attempted
                    ? " bg-green-500 "
                    : // bookmarked
                    ele.bookmark
                    ? " bg-blue-500"
                    : ""
                }
                `}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    );
  }

  const { sm } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  return (
    <div
      style={{ backgroundColor: "#fff" }}
      className="p-4 md:p-8 space-y-4 min-h-screen select-none"
    >
      <div className=" flex justify-between">
        <div className=" flex space-x-4 justify-center items-center text-lg border p-2 rounded">
          <HourglassOutlined />
          {contestDetails?.status?.time && (
            <Countdown seconds={contestDetails?.status?.time} />
          )}
        </div>
        <Button
          onClick={handleSubmit}
          className=" border border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white text-base text-green-500 p-0 px-6 h-auto"
        >
          Submit
        </Button>
      </div>
      <Row gutter={32}>
        <Col span={sm ? 6 : 24} className="space-y-4">
          <div className="text-lg">Question Pallete</div>
          <QuestionPallete />
          <hr />
          <CommandPalleteDescription />
        </Col>
        <Col span={sm ? 18 : 24} className="space-y-2">
          <div className="text-lg">Question Description</div>
          <QuestionCard
            details={questions[currquestion]}
            questionNumber={currquestion}
          ></QuestionCard>
          <Button
            onClick={() => setCurrquestion(currquestion - 1)}
            disabled={currquestion === 0}
          >
            Prev
          </Button>
          <Button
            disabled={currquestion === questions.length - 1}
            onClick={() => setCurrquestion(currquestion + 1)}
          >
            Next
          </Button>
        </Col>
      </Row>
    </div>
  );
};

const CommandPalleteDescription = () => {
  return (
    <div className="space-y-2">
      <div className="flex space-x-2 items-center">
        <Button className=" bg-sky-500">Q</Button>
        <div>Bookmarked</div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button className=" bg-green-400">Q</Button>
        <div>Attempted</div>
      </div>
      <div className="flex space-x-2 items-center">
        <Button className="">Q</Button>
        <div>Unattempted</div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    userData: state.userData,
    registeredEvents: state.registeredEvents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    startLoading: (message) => dispatch(startLoading(message)),
    stopLoading: () => dispatch(stopLoading()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Solve);
