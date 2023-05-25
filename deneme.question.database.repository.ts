import pool from '../../pool';
import { DataHelper } from '../../helpers/data.helper';

class DenemeDatabaseRepository {
  static getQuestion = async (questionId: number) => {
    try {
      const result = await pool.query(
        `
        select id, question_url
        from questions
        where id = $1;
      `,
        [questionId]
      );
      if (!result) {
        return { success: false };
      }
      return { success: true, rows: DataHelper.toCamelCase(result.rows) };
    } catch (error: any) {
      console.log('DenemeDatabaseRepository.getQuestion ERROR: ', error);
      return { success: false };
    }
  };

  static getQuestions = async (questionIds: any) => {
    try {
      const result = await pool.query(
        `
        select id, question_url
        from questions
        where id = any($1::int[]);
      `,
        [questionIds]
      );

      if (!result) {
        return { success: false };
      }
      return { success: true, rows: DataHelper.toCamelCase(result.rows) };
    } catch (error: any) {
      console.log('DenemeDatabaseRepository.getQuestions ERROR: ', error);
      return { success: false };
    }
  };

  static getSubtopics = async (id: number) => {
    try {
      const result = await pool.query(
        `
        select 	qs.subtopic_id, s.name
        from question_subtopics qs, subtopics s
        where
        qs.subtopic_id = s.id
        and qs.question_id = $1;
      `,
        [id]
      );

      if (!result) {
        return { success: false };
      }
      return { success: true, rows: DataHelper.toCamelCase(result.rows) };
    } catch (error: any) {
      console.log('DenemeDatabaseRepository.getSubtopics ERROR: ', error);
      return { success: false };
    }
  };

  static getSubtopicList = async (questionIds: any) => {
    try {
      const result = await pool.query(
        `
        select 	qs.subtopic_id, s.name, qs.question_id
        from question_subtopics qs, subtopics s
        where
        qs.subtopic_id = s.id
        and qs.question_id = any($1::int[]);
      `,
        [questionIds]
      );

      if (!result) {
        return { success: false };
      }
      return { success: true, rows: DataHelper.toCamelCase(result.rows) };
    } catch (error: any) {
      console.log('DenemeDatabaseRepository.getSubtopicList ERROR: ', error);
      return { success: false };
    }
  };

}

export default DenemeDatabaseRepository;
