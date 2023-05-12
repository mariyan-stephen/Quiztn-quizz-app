import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

function QuizPage() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    // fetch question from your backend
    // this is just a mock question
    const mockQuestion = {
      text: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
    };
    setQuestion(mockQuestion);
  };

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    // handle the selected answer...
  };

  if (!question) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        {question.text}
      </Typography>
      {question.options.map((option, index) => (
        <Box key={index} mb={1}>
          <Button
            variant="contained"
            color={selectedAnswer === index ? 'primary' : 'default'}
            fullWidth
            onClick={() => handleAnswer(index)}
          >
            {option}
          </Button>
        </Box>
      ))}
    </Container>
  );
}

export default QuizPage;
