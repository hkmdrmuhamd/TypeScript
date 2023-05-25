import { ResponseStatusTypes } from '../common';
import DenemeDatabaseRepository from '../repositories/database/deneme.database.repository';

class DenemeService {
  static getQuestion = async (questionId: number) => {
    const questionResult = await DenemeDatabaseRepository.getQuestion(
      questionId
    );
    if (questionResult && questionResult.success) {
      console.log('2');
      const subtopicResult = await DenemeDatabaseRepository.getSubtopics(
        questionId
      );
      if (subtopicResult && subtopicResult.success) {
        console.log('3');
        questionResult.rows[0].subtopics = subtopicResult.rows;
      }
      console.log('4');
      return {
        status: ResponseStatusTypes.success,
        data: {
          test: questionResult.rows,
        },
      };
    }
    return {
      status: ResponseStatusTypes.fail,
      data: {},
    };
  };

  static getQuestions = async (questionIds: any) => {
    const questionsResult = await DenemeDatabaseRepository.getQuestions(
      questionIds
    );
    for (const question of questionsResult.rows) {
      const subtopicResult = await DenemeDatabaseRepository.getSubtopics(
        question.id
      );
      question.subtopics = subtopicResult.rows;
    }
    if (questionsResult && questionsResult.success) {
      return {
        status: ResponseStatusTypes.success,
        data: {
          questionIds: questionsResult.rows,
        },
      };
    }
    return {
      status: ResponseStatusTypes.fail,
      data: {},
    };
  };

  static getQuestionsList = async (questionIds: any) => {
    const questionsResult = await DenemeDatabaseRepository.getQuestions(
      questionIds
    );
    const subtopicListResult = await DenemeDatabaseRepository.getSubtopicList(
      questionIds
    )
    questionsResult.rows = questionsResult.rows.map((question: any) => {
      question.subtopics = subtopicListResult.rows.filter(
        (subtopic: any) => subtopic.questionId === question.id
      );
      return question;
    });
    if (questionsResult && questionsResult.success) {
      return {
        status: ResponseStatusTypes.success,
        data: {
          questionIds: questionsResult.rows,
        },
      };
    }
    return {
      status: ResponseStatusTypes.fail,
      data: {},
    };
  };
}



export default DenemeService;
