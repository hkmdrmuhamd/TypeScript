import express, { Request, Response } from 'express';
import { requireCustomerAuthenticationMiddleware } from '../common/middlewares/require-customer-authentication.middleware';
import DenemeService from '../services/deneme.service';

const router = express.Router();
router.get(
  '/capi/deneme/get-question/:questionId',
  requireCustomerAuthenticationMiddleware,
  async (req: Request, res: Response) => {
    const { questionId } = req.params;
    const result = await DenemeService.getQuestion(parseInt(questionId));
    res.status(200).send(result);
  }
);

router.post(
  '/capi/deneme/get-questions',
  requireCustomerAuthenticationMiddleware,
  async (req: Request, res: Response) => {
    const { questionIds } = req.body;
    const result = await DenemeService.getQuestions(questionIds);
    res.status(200).send(result);
  }
);

router.post(
  '/capi/deneme/get-subtopic-list',
  requireCustomerAuthenticationMiddleware,
  async (req: Request, res: Response) => {
    const { questionIds } = req.body;
    const result = await DenemeService.getQuestionsList(questionIds);
    res.status(200).send(result);
  }
);

export { router as denemeRouter };
