import { HourglassOutlined } from "@ant-design/icons";
import "../../App.less";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { Col, Radio, Row } from "antd";
import { Card, Button, Space } from "antd";
import React, { useState } from "react";
import { connect } from "react-redux";
import Loader from "../../Components/Loader/Loader";

const Solve = () => {
  // const { id } = useParams();
  // const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  if (1 < 0) setLoading();
  const [currquestion, setCurrquestion] = useState(1);
  // let permit = false;
  // useEffect(()=>{
  //     setLoading(true);
  //     getQuestions()
  //     .then((res)=>{
  //         setQuestions(res);
  //         setLoading(false);
  //     })
  //     .catch((error)=>{})

  // },[]);

  function QuestionPallete() {
    return (
      <div className="grid grid-cols-5 gap-2">
        {Array(30)
          .fill()
          .map((ele, index) => {
            return (
              <Button
                onClick={() => setCurrquestion(index + 1)}
                className={`rounded-full hover:bg-yellow-50 hover:border-gray-100 hover:text-black 
                
                // current question
                ${
                  currquestion === index + 1
                    ? " bg-yellow-500 "
                    : // solved
                    false
                    ? " bg-green-500 "
                    : // bookmarked
                    false
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

  // function optionClicked(question) {
  //   console.log("option chooses send ");
  // }
  // const Bookmarked = () => {
  //   // set bookmarked state of que to true;
  // };
  // const savenext = () => {
  //   //send request to backend to save current que ans and the  next
  //   setCurrquestion(currquestion + 1);
  // };

  const { sm } = useBreakpoint(); // lg is one of the elements returned if screenwidth exceeds 991
  return (
    <>
      {loading ? (
        <div>
          <Loader></Loader>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#fff" }}
          className="h-max p-4 md:p-8 space-y-4"
        >
          <div className=" flex justify-between">
            <div className=" flex space-x-4 justify-center items-center text-lg border p-2 rounded">
              <HourglassOutlined />
              <div>30:00:00</div>
            </div>
            <Button className=" border border-green-500 hover:border-green-500 hover:bg-green-500 hover:text-white text-base text-green-500 p-0 px-6 h-auto">
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
              <Card
                className="m-0 w-full"
                title={`Q${1}. Question Description`}
              >
                <Radio.Group
                  onChange={() => {}}
                  value={1}
                  className="w-full mb-4"
                >
                  <Space direction={"vertical"}>
                    {Array(4)
                      .fill()
                      .map((ele, index) => (
                        <Radio value={index}>Option: {index}</Radio>
                      ))}
                  </Space>
                </Radio.Group>
                <div className=" float-right space-x-2">
                  <Button type={"primary"} className=" bg-sky-500">
                    Bookmark
                  </Button>
                  <Button danger className=" hover:bg-red-500 hover:text-white">
                    Clear Response
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
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
  return {};
}

export default connect(mapStateToProps)(Solve);
