import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormRange from 'react-bootstrap/FormRange';
import FormCheck from 'react-bootstrap/FormCheck';
import FormSelect from 'react-bootstrap/FormSelect';
import Button from 'react-bootstrap/Button';

export default class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [5, 5, 5, 5, 'Yes'],
      enabled: [false, false, false, false],
    };

    this.updateAnswers = this.updateAnswers.bind(this);
    this.updateRangesEnabled = this.updateRangesEnabled.bind(this);
    this.generateList = this.generateList.bind(this);
  }

  updateAnswers(question, value) {
    let newAnswers = this.state.answers;
    newAnswers[question] = value;
    this.setState({
      answers: newAnswers,
    });
  }

  updateRangesEnabled(question) {
    let newEnabled = this.state.enabled;
    newEnabled[question] = !newEnabled[question];
    this.setState({
      enabled: newEnabled,
    });
  }

  generateList() {
    let newAnswers = this.state.answers;
    this.state.enabled.forEach((a, ai) => {
      if(a) newAnswers[ai] = -1;
    });
    //TODO: Add error check if all are excluded

    this.setState({
      answers: newAnswers,
    });
    console.log(this.state.answers);
  }

  render() {
    let leftTitle = ['Sad', 'Passive', 'Calm', 'Superficial'];
    let rightTitle = ['Happy', 'Aggressive', 'Upbeat', 'Deep'];
    const questionList = [0, 1, 2, 3].map((a) => (
      <Row className="justify-content-md-center">
        <Col>{leftTitle[a]}</Col>
        <Col>
          <FormRange
            min={0}
            max={10}
            onChange={(e) => this.updateAnswers(a, parseInt(e.target.value))}
            disabled={this.state.enabled[a]}
          ></FormRange>
        </Col>
        <Col>{rightTitle[a]}</Col>
        <Col>
          <FormCheck
            label="Exclude"
            onChange={() => this.updateRangesEnabled(a)}
          ></FormCheck>
        </Col>
      </Row>
    ));

    return (
      <div>
        <Container fluid>
          <Row className="justify-content-md-center">Select Mood</Row>
          {questionList}
          <Row>
            <Col>About Romance?</Col>
            <Col>
              <FormSelect onChange={(e) => this.updateAnswers(4, e.target.value)}>
                <option>Yes</option>
                <option>No</option>
                <option>Both</option>
              </FormSelect>
            </Col>
          </Row>
          <Button onClick={() => this.generateList()}>Generate!</Button>
        </Container>
      </div>
    );
  }
}
